---
id: verification3
title: How to write formal specification?
sidebar_label: Formal Specification
slug: /verification/specification
hide_title: false
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Let's start by stating that unfortunately there is no algorithm to generate from the code the perfect specification with all the properties that need to be verified. Basically the reason is that the information about the fonctional intention of a program is not in the code: it needs to be figured out and formalized in the specification. Another way to phrase this is that the *how* (the code) does not say the *what* (the specification)...

Fortunaltely there are guidelines to follow and ideas to implement. The scope of the guidelines presented here is the one of the <Link to='/docs/verification/tools#archetype'>Archetype</Link> language, for entrypoints's postconditions, fail conditions, and contract invariants.

## Postconditions

An entrypoint's postcondition says what the execution of the entrypoint changes in the contract storage when it does not fail.

Say the contract storage is made of *S* items (int, string, map, list, ...) and that the contract code is made of *E* entrypoints. There is *S* postconditions to describe the effect of one entrpoint on the *S* storage items, which is a total number of postconditions of *E* * *S* for the entire contract.
### Basics

Consider the basic contract with one storage item `value` and one entrypoint `set`:

```archetype
archetype trivial
variable value : string = ""
entry set(v : string) { value := v }
```

There needs only one postcondition to describe the effect of the entrypoint on the storage:

```archetype
specification entry set(v : string) {
  postcondition p {
    value = v
  }
}
```

If the entrypoint can only be called by the `owner` address, the postcondition becomes:

<Tabs
  defaultValue="specification"
  values={[
    { label: 'Specification', value: 'specification', },
    { label: 'Entrypoint', value: 'archetype', },
  ]}>

<TabItem value="specification">


```archetype
caller = owner -> value = v
```

</TabItem>

<TabItem value="archetype">

```archetype {2}
entry set(v : string) {
  called by owner
  effect {
    value := v
  }
}
```

</TabItem>
</Tabs>

The form of the postcondition above is:

```archetype
<CONDITION> -> <CHANGE>
```
which reads *If* `CONDITION` holds, *then* `CHANGE` *occurs*, or `CONDITION` *implies* `CHANGE`.

### No change

When an entrypoint does not change a storage item, it is stated with the following postcondition:

```archetype
 <ITEM> = before.<ITEM>
```

The prefix keyword `before` is used to refer to the state of the storage item `ITEM` *before* entrypoint execution. The storage item without prefix refers to the storage item *after* entrypoint execution.

For example, below is the postcondition for the entrypoint `transfer` of the <Link to=''>FA 1.2</Link> fungible token contract regarding the `ledger` storage item. It states that this storage item does not change if the parameter address `%from` is equal to the parameter address `%to`:

<Tabs
  defaultValue="specification"
  values={[
    { label: 'Specification', value: 'specification', },
    { label: 'Entrypoint', value: 'archetype', },
  ]}>

<TabItem value="specification">

```archetype
%from = %to -> ledger = before.ledger
```

</TabItem>

<TabItem value="archetype">

```archetype {11,12}
entry %transfer (%from : address, %to : address, value : nat) {
  require {
    r1 otherwise "NotEnoughBalance" : ledger[%from].tokens >= value;
  }
  effect {
    if caller <> %from then (
      var current = allowance[(%from, caller)].amount;
      dofailif(current < value, ("NotEnoughAllowance", ((value, current))));
      allowance.update((%from, caller), { amount -=  value });
    );
    ledger.update(%from, { tokens -= value });
    ledger.addupdate(%to, { tokens += value });
  }
}
```
The postcondition is not trivial since the code explicitely states how it changes the `ledger` asset, as highlighted in the code above. However, if `%from` equals `%to`, then there is no final change in the `ledger` item since `value` is subtracted and then added back to the address entry.

</TabItem>

</Tabs>

### Branches

To be complete, the postcondition above must say what changes when `%from` is different from `%to`.

A general form of the postcondition is actually:

```archetype
<CONDITION1> -> <CHANGE1> and
<CONDITION2> -> <CHANGE2> and
...
<CONDITIONn> -> <CHANGEn>
```

where conditions 1 to n are such that they cover all branches of execution. More formally, conditions are such that the following statement is true:

```archetype
<CONDITION1> or <CONDITION2> or ... <CONDITIONn>
```

The postcondition for the `tranfer` entrypoint regarding the `ledger` item is then:

```archetype
%from =  %to ->  ledger = before.ledger and
%from <> %to ->  <CHANGE>
```

Note that it is equivalent either to declare one postcondition formed as the conjunction of n implication statements, or to declare n postconditions of the form of an implication:

```archetype
postcondition p {
  <CONDITION1> -> <CHANGE1> and <CONDITION2> -> <CHANGE2>
}
```
is equivalent to:

```archetype
postcondition p1 {
  <CONDITION1> -> <CHANGE1>
}

postcondition p2 {
  <CONDITION2> -> <CHANGE2>
}
```

The later form is preferred since it attributes an id to each implication statement, making the output from the formal system in charge of proving them more explicit.

### Collections

This section deals with collections of pairs of key and value. Archetype provides 3 types of collections: Michelson *map* and *big_map*, and <Link to='/docs/contract/tuto/archetype-assets'>asset</Link> used in examples below.

Conversly to code language, retrieving an asset with key `k` from an asset collection `c` does not fail and the non existence is managed with the keyword `otherwise`:

```archetype
let some a = c[k] in
  <EXISTSk>   (* there is an asset with key 'k' *)
otherwise
  <NOTEXISTk> (* there is no asset with key 'k' *)
```

#### Single object

The postcondition to state a change of a single object `a` with key `k` in a collection `c` has the following structure:

```archetype
let some a = c[k] in
  let some ba = before.c[k] in
	  <CHANGE>
  otherwise
	  <NOTEXISTkBEFORE>
otherwise
  <NOTEXISTkAFTER>
```
where:
* `a` is the object associated to `k` *after* entrypoint execution
* `ba` is the object associated to `k` *before* execution
* `CHANGE` is the change in object a statement
* `NOTEXISTkBEFORE` is the statement when `a` does not exist *before*
* `NOTEXISTkAFTER` is the statement when `a` does not exist *after*

For example, below is the postcondition `p3_approve` for the entrypoint `approve` of the <Link to=''>FA 1.2</Link> fungible token contract regarding the `allowance` asset with key `(caller,spender)`. It corresponds to the `addupdate` code instruction.

<Tabs
  defaultValue="specification"
  values={[
    { label: 'Specification', value: 'specification', },
    { label: 'Entrypoint', value: 'archetype', },
  ]}>

<TabItem value="specification">


```archetype
let some a = allowance[(caller,spender)] in
  let some ba = before.allowance[(caller,spender)] in
    (* object is updated when object exists before *)
    a = { ba with amount = value }
  otherwise
  	(* object is added when it does not exist before *)
    a = { addr_owner = caller; addr_spender = spender; amount = value }
otherwise
  false
```

</TabItem>

<TabItem value="archetype">

```archetype {7}
entry approve(spender : address, value : nat) {
  var k = (caller, spender);
  if allowance.contains(k) then (
    var previous = allowance[k].amount;
    dofailif(previous > 0 and value > 0, (("UnsafeAllowanceChange", previous)));
  );
  allowance.addupdate( k, { amount = value });
}
```

</TabItem>

</Tabs>

The `false` statement means there is a logical contradiction. In the case above, it is not possible that the object with key `(caller,spender)` does not exist, as it is the semantic of the `addupdate` instruction (see code above in 'entrypoint' tab).

The `otherwise` statements are presented below for instructions `add`, `remove`, `update` and `addupdate`:

<Tabs
  defaultValue="add"
  values={[
    { label: 'Add', value: 'add', },
    { label: 'Remove', value: 'remove', },
    { label: 'Update', value: 'update', },
    { label: 'Addupdate', value: 'addupdate', },
  ]}>

<TabItem value="add">


```archetype
let some a = c[k] in
  let some ba = before.c[k] in
    false (* add fails if key already exists *)
  otherwise
    a = <ADDEDOBJECT>
otherwise
  false (* object should exist after *)
```

</TabItem>

<TabItem value="remove">

```archetype
let some a = c[k] in
  false (* object should not exist after *)
otherwise
  let some ba = before.c[k] in
    <REMOVED> (* say something about removed object *)
  otherwise
    false (* remove fails if key not found *)
```

</TabItem>

<TabItem value="update">

```archetype
let some a = c[k] in
  let some ba = before.c[k] in
    a = { ba with <CHANGES> }
  otherwise
    false (* update fails if key not found *)
otherwise
  false (* update does not remove object *)
```

</TabItem>

<TabItem value="addupdate">

```archetype
let some a = c[k] in
  let some ba = before.c[k] in
    a = { ba with <CHANGES> }
  otherwise
    a = <ADDEDOBJECT>
otherwise
  false (* update does not remove object *)
```

</TabItem>

</Tabs>

Postconditions above must also say that objects with a key different from `k` do not change:

```archetype
forall a in c,
  a.id <> k ->
  let some ba = before.c[k] in
    a = ba
  otherwise
    false
```

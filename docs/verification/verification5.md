---
id: verification5
title: Postcondition
sidebar_label: Postcondition
slug: /verification/postcondition
hide_title: false
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


An entrypoint's postcondition says what the execution of the entrypoint changes in the contract storage when it does not fail.

Say the contract storage is made of *S* items (int, string, map, list, ...) and that the contract code is made of *E* entrypoints. There is *S* postconditions to describe the effect of one entrpoint on the *S* storage items, which is a total number of postconditions of *E* * *S* for the entire contract.

## Basics

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

## No change

When an entrypoint does not change a storage item, it is stated with the following postcondition:

```archetype
 <ITEM> = before.<ITEM>
```

The prefix keyword `before` is used to refer to the state of the storage item `ITEM` *before* entrypoint execution. The storage item without prefix refers to the storage item *after* entrypoint execution.

For example, below is the postcondition for the entrypoint `transfer` of the <Link to='/docs/templates/fa12'>FA 1.2</Link> fungible token contract regarding the `ledger` storage item. It states that this storage item does not change if the parameter address `%from` is equal to the parameter address `%to`:

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

## Branches

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

## Collections

This section deals with collections of pairs of key and value. Archetype provides 3 types of collections: Michelson *map* and *big_map*, and <Link to='/docs/contract/tuto/archetype-assets'>asset</Link> used in examples below.

Conversly to code language, retrieving an asset with key `k` from an asset collection `c` does not fail and the non existence is managed with the keyword `otherwise`:

```archetype
let some a = c[k] in
  <EXISTSk>   (* there is an asset with key 'k' *)
otherwise
  <NOTEXISTk> (* there is no asset with key 'k' *)
```

### Identified object

When an object `a` with known id `k`  in a collection `c` is changed, the postcondition has the following structure:

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

For example, below is the postcondition `p3_approve` for the entrypoint `approve` of the <Link to='/docs/templates/fa12'>FA 1.2</Link> fungible token contract regarding the `allowance` asset with key `(caller,spender)`. It corresponds to the `addupdate` code instruction.

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

### No change

Postconditions say which objects are **not** changed with a statement of the following form:

```archetype
forall a in c,
  <NOTCHANGED> ->
  let some ba = before.c[k] in
    a = ba
  otherwise
    false
```

where `CHANGED` is the statement to say that object `a` is not a changed object.

When object with key `k` is the only object changed, the postcondition is:

```archetype
forall a in c,
  a.<KEY> <> k ->
  let some ba = before.c[k] in
    a = ba
  otherwise
    false
```

where `KEY` is the key field of the asset.

### Unknown ids

When changed objects are not known by their ids, but rather by a business rule based on object data, the goal is to state the effect of the change on the collection.

For example, below is the postcondition `p2` for the entrypoint `consume` of the <Link to='/docs/templates/miles'>Miles</Link> contract. It states that the entrypoint reduces by parameter value `quantity` the total number of miles, which is the business intent of the entrypoint:

<Tabs
  defaultValue="specification"
  values={[
    { label: 'Specification', value: 'specification', },
    { label: 'Entrypoint', value: 'archetype', },
  ]}>

<TabItem value="specification">


```archetype
 mile.sum(the.amount) = before.mile.sum(the.amount) - quantity
```

The total number of miles is obtained by summing the field `amount` because miles are stored per bunch associated to an expiration date.

</TabItem>

<TabItem value="archetype">

```archetype
entry consume (ow : address, quantity : nat) {
  called by admin
  effect {
    var lview = owner[ow].miles.sort(expiration).select(the.expiration >= now);
    dorequire (lview.sum(the.amount) >= quantity, "NotEnoughMiles");
    var remainder = quantity;
    for : loop m in lview do
      if remainder > 0 then begin
        if mile[m].amount > remainder then begin
          mile.update(m, { amount -= remainder });
          remainder := 0
        end else if mile[m].amount = remainder then begin
          remainder := 0;
          owner[ow].miles.remove(m)
        end else begin
          remainder -= mile[m].amount;
          owner[ow].miles.remove(m)
        end
      end
    done;
    assert p1
  }
}
```

</TabItem>

</Tabs>

Note that in this case, it is more complex to state exactly which miles are changed or not changed, as it is the result of an iteration process over a sorted and filtered set of miles.

It is interesting though to make sure that only not expired miles are consumed (removed), since it is another key functional element of the contract:

```archetype
forall m in removed.mile, m.expiration > now
```

Note that Archetype specification language provides convenient handlers for removed or added assets. Another way to phrase this property is:

```archetype
forall bm in before.mile,
 let some m = mile[bm.id] in
  false (* no mile is added by the entrypoint *)
 otherwise
  m.expiration > now
```

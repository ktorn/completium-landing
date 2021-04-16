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

Let's start by stating that unfortunately there is no algorithm to generate from the code the perfect specification with all the properties that need to be verified. Basically the reason is that there is information about the fonctional intention of a program that is not in the code, and that needs to be figured out and formalized in the specification. Another way to phrase this is that the *how* (the code) does not say the *what* (the specification)...

Fortunaltely there are guidelines to follow and ideas to implement. The scope of the guidelines presented here is the one of the <Link to='/docs/verification/tools#archetype'>Archetype</Link> language, that is entrypoints's postconditions and fail conditions, as well as contract invariants.

## Postconditions

An entrypoint's postcondition says what the execution of the entrypoint changes in the contract storage when it does not fail.

Say the contract storage is made of *S* items (int, string, map, list, ...) and the number of entrypoints is *E*. Then you can describe the impact of an entrypoint on the *S* storage items with *S* postconditions. If *E* is the number of entrypoints, then the total number of postconditions is *E* * *S*.
### Basics

Consider the basic entrypoint `set`:
```archetype
entry set(v : string) {
  value := v
}
```

It just sets `value` to the parameter `v`. The postcondition of `set` says the state of the storage after execution; it is then:

```archetype
specification entry set(v : string) {
  postcondition p {
    value = v
  }
}
```

If the entrypoint can only be called by the `owner` address, the code and postconditions become:

```archetype
entry set(v : string) {
  called by owner
  effect {
    value := v
  }
}

specification entrypoint set(v : string) {
  postcondition p {
    caller = owner -> value = v
  }
}
```

The form of the postcondition above is:

```archetype
<CONDITION> -> <CHANGE>
```
which reads *If* `CONDITION` holds, *then* `CHANGE` *occurs*, or `CONDITION` *implies* `CHANGE`.

### No change

It is as important to state what does **not** change as what does change.

For example, below is the postcondition for the entrypoint `transfer` of the <Link to=''>FA 1.2</Link> fungible token contract regarding the `ledger` storage item. It states that this storage item does not change if the parameter address `%from` is equal to the parameter address `%to`:

<Tabs
  defaultValue="specification"
  values={[
    { label: 'Specification', value: 'specification', },
    { label: 'Entrypoint code', value: 'archetype', },
  ]}>

<TabItem value="specification">

```archetype
%from = %to -> ledger = before.ledger
```

The prefix keyword `before` is used to refer to the state of the storage item *before* entrypoint execution. The storage item without prefix refers to the storage item *after* entrypoint execution.

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
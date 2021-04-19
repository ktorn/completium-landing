---
id: verification6
title: Failure
sidebar_label: Failure
slug: /verification/fail
hide_title: false
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A <Link to='/docs/verification/postcondition'>postcondition</Link> says something about the effect of an entrypoint when the entrypoint does not fail. It is possible to specify situations when the entrypoint fails.

The goal is to generate one failure specification for every case the entrypoint fails.

## Basics

For example, the entrypoint `set` fails when the parameter value `v` is greater than 10, and fails with the pair `v` and the message `"v must be below 10"`:

<Tabs
  defaultValue="specification"
  values={[
    { label: 'Specification', value: 'specification', },
    { label: 'Entrypoint', value: 'archetype', },
  ]}>

<TabItem value="specification">

```archetype
specification entry set(v : nat)
  fails {
    f1 with ((a, msg) : nat * string):
      (* specify failure object *)
      a   = v and
      msg = "v must be below 10" and
      (* specify failure condition *)
      v >= 10
  }
}
```

</TabItem>

<TabItem value="archetype">

```archetype
archetype simple

variable value : nat = 0

entry set(v : nat) {
  if v < 10 then
    value := v
  else
    fail (v, "v must be below 10")
}
```

</TabItem>
</Tabs>

Keyword `fails` introduces the section to declare specification of fail situations. In the example above the fail statment, is identified with id `f1`.

As illustrated above, the failure statement is the conjunction of:
1. a statement to describe the object the entrypoint fails with
2. a statement to specify the conditions that makes the entrypoint fail

The object the entrypoint fails with is usually a string message, but it can be more complex like for example a pair with the string message and a computed value used in the failure decision.

 ## Archetype builtins

:::note
This section describes specification features available from version 1.2.4 of Archetype.
:::

The Archetype language provides several high-level syntaxes and builtins that may fail. This section presents how to specify their failure behavior.

### Execution conditions

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Code', value: 'archetype', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="specification">

```archetype
f1 with InvalidCaller(msg : string) :
  msg = "InvalidCaller" and
  caller <> <ADDRESS>
```

</TabItem>

<TabItem value="archetype">

```archetype
called by <ADDRESS>
```

</TabItem>
</Tabs>

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Code', value: 'archetype', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="specification">

```archetype
f1 with InvalidCondition(msg : string) :
  msg = "InvalidCondition: r1" and
  not <CONDITION>
```

</TabItem>

<TabItem value="archetype">

```archetype
require {
  r1 : <CONDITION>
}
```

</TabItem>
</Tabs>

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Code', value: 'archetype', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="specification">

```archetype
f1 with InvalidCondition(msg : string) :
  msg = "InvalidCondition: f1" and
  <CONDITION>
```

</TabItem>

<TabItem value="archetype">

```archetype
failif {
  f1 : <CONDITION>
}
```

</TabItem>
</Tabs>

### Not found

In the following, `c` is an asset collection, `k` is a key value and `i` is a nat.

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Code', value: 'archetype', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="specification">

```archetype
f with NotFound(msg, v : string * <KEYTYPE>) :
  msg = "NotFound" and
  v = k and
  not c.contains(k)
```

</TabItem>

<TabItem value="archetype">

```archetype
c[k]
```

```archetype
c.remove(k)
```

```archetype
c.update(k, ...)
```

</TabItem>
</Tabs>

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Code', value: 'archetype', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="specification">

```archetype
f with NotFound((msg, v): string * nat) :
  msg = "NotFound" and
  v   = i and
  c.count() < i
```

</TabItem>

<TabItem value="archetype">

```archetype
c.nth(i)
```

</TabItem>
</Tabs>

### Key exists

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Code', value: 'archetype', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="specification">

```archetype
f with KeyExists((msg, v) : string * <KEYTYPE>) :
  msg = "KeyExists" and
  v   = k and
  c.contains(k)
```

</TabItem>

<TabItem value="archetype">

```archetype
c.add({ <ID> = k; ... })
```

</TabItem>
</Tabs>

### Misc.

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Code', value: 'archetype', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="specification">

```archetype
f with NatAssign(msg : string) :
  msg = "NatAssign" and
  n < v
```

</TabItem>

<TabItem value="archetype">

```archetype
n -= v
```

</TabItem>
</Tabs>

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Code', value: 'archetype', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="specification">

```archetype
f with DivByZero(msg : string) :
  msg = "DivByZero" and
  b = 0
```

</TabItem>

<TabItem value="archetype">

```archetype
a / b
```

```archetype
a div b
```

```archetype
a % b
```

</TabItem>
</Tabs>

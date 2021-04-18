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
      (* specify fail value *)
      a   = v and
      msg = "v must be below 10" and
      (* specify fail condition *)
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

As illustrated above, the failure statement


 ## Asset API

 ## Completeness


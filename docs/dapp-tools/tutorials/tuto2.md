---
id: tuto2
title: Execution Conditions
sidebar_label: 2. Execution conditions
slug: /dapp-tools/tutorials/archetype-execcond
---


import Link from '@docusaurus/Link';

One of the key requirements of a smart contract's entry point is to establish execution conditions:
* Who can call the contract?
* Under which logical conditions?

Archetype provides dedicated syntax to make execution conditions very explicit and non ambiguous.

## Code

In the following example, the entry point may only be called by the `admin` address; it also requires that the argument value `v` be between 10 (included) and 20 (strictly) and be even otherwise; if not even, it must be failed with this following message : `Expected even value`:

```archetype {8,10,11}
archetype exec_condition

variable value : nat = 0

constant admin : address = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw

entry main(v : nat) {
  called by admin
  require {
      r1: 10 <= v < 20;
      r2 otherwise "EXPECTED EVEN VALUE": value % 2 = 0
  }
  effect {
     value := v;
  }
}
```

It is also possible to establish execution conditions with a `failif` section.
Execution conditions have identifiers (here `r1` and `r2`) used for fail message when no `otherwise` is established, and to name the property in contract formal verification.

## Deploy

The following <Link to='/docs/dapp-tools/completium-cli'>Completium CLI</Link> command deploys the contract on the Tezos network:

```
completium-cli deploy 2-exec_condition.arl
```

## Call entry point

The following command calls the unique entry point with the argument `14` using the `--with` option:

```
completium-cli call 2-exec-condition.arl --with '14'
```


## View contract

The following command generates the URL to view the contract in Better call Dev:

```
completium-cli show url
```



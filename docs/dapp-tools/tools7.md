---
id: tools7
title: Presentation
sidebar_label: Presentation
slug: /dapp-tools/archetype
---

import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

<DappFigure img='archetype.svg' width='50%'/>

## Language

<a href="https://archetype-lang.org" target="_blank">Archetype</a> is a domain-specific language to develop Smart Contracts on the Tezos blockchain, with all Michelson features, plus exclusive features (new types, state machine design, ...) to ease development, tests and formal verification.


## Try Archetype

Discover Archetype with a ten steps online tutorial.

<DappButton url="https://gitpod.io/#https://github.com/edukera/try-archetype" txt="try archetype"/>

It requires a <Link to="/docs/dapp-tools/gitpod">Gitpod</Link> account.

## Exclusive features

### Easy Business Logic

```archetype
archetype blogic_demo(holder : address, value : tez, deadline : date)

entry pay () {
  transfer ((1 + 7% * (now - deadline) / 1d) * value) to holder
}
```

The `pay` entrypoint applies a penalty fee of 7% per day beyond deadline. Archetype language provides exlcusive types to easily implement readable business rules: rationals, dates, durations ...

### Explicit execution conditions

```archetype
archetype exec_cond_demo(admin : address, value : nat)

entry setvalue (v : nat) {
  called by admin
  require {
    r1: transferred > value;
    r2: now < 2022-01-01;
  }
  effect {
    value := v;
  }
  ```

  The `setvalue` entrypoint executes if the sender is the admin, if the transferred amount is greater than value and if it is called before 2022. Archetype provides specific syntax to establish execution conditions so that the contract is easy to read and check.

  ### Clear State Machine

```archetype
archetype state_machine_demo(value : tez, holder : address)

states =
| Created initial
| Intialized
| Terminated

transition initialize () {
  from Created to Intialized
  when { transferred > value }
}

transition terminate () {
  from Initialized Terminated
  effect { transfer balance to holder }
}
```

It is possible with Archetype to design the contract as a state machine. Transitions may have guard conditions (like `initialize`) and effect on the storage (like `terminate`). State machines are convenient to make the overall process clear and transparent.

### Smart Storage API

```archetype
archetype asset_demo

asset vehicle {
  vin          : string;
  nbrepairs    : nat  = 0;
  dateofrepair : date = now;
}

entry repair_oldest () {
  for v in vehicle.sort(dateofrepair).select(the.nbrepairs = 0).head(3) do
    vehicle.update(v, { nbrepairs += 1; dateofrepair = now })
  done
}
```

The `repair_oldest` entrypoint increments the nbrepairs field of the 3 vehicles with oldest date of repair, and with a number of repairs above zero. An asset collection provides a rich API to read/write data (add, remove, update, addupdate, ...), and to iterate over the collection (select, sort, sum, head, tail, ...).

### Formal Specification

```archetype
specification entry repair_oldest () {
  postcondition p1 {
    0 <= vehicle.sum(nbrepairs) - before.vehicle.sum(nbrepairs) <= 3
  }
}
```

The postcondition `p1` of `repair_oldest` entry point specifies that the difference between the total number of repairs after the entry point's execution and before, is less or equal to 3. Archetype provides a full-featured specification language for contract invariants and entry point postconditions.


## Command line

### Compile to Michelson

```
$ archetype contract.arl
```

### Generate javascript

for contract origination (deployment) from a js DApp:

```
$ archeype contract.arl
```

### Generate Why3 language

In order to verify the contract with <a href='http://why3.lri.fr/' target='_blank'>Why3</a>:

```
$ archetype
```

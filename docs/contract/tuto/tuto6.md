---
id: tuto6
title: State Machine
sidebar_label: 6. State Machine
slug: /contract/tuto/archetype-statem
hide_title: true
---
import DappFigure from '../../DappFigure';
import Link from '@docusaurus/Link';

## State machine

It is possible to design the smart contract as a state machine which is convenient for ease of read.


In this exercise, the machine has 4 states and 3 transitions as illustrated in the shcema below:

<DappFigure img='tuto_statem.svg' width='60%'/>

Transitions have conditions:
* goes in InProgress state if balance is greater than 3tz
* complete if internal `value` is strictly greater than 1 (requires calls to `inc_value`)

```archetype title="6-state_machine.arl"
archetype state_machine

states =
| Created initial
| InProgress
| Interrupted
| Completed

variable value : nat = 0

entry inc_value () {
  value += 1
}

transition init () {
  from Created to InProgress
  when { transferred > 3tz }
  with effect { () /* nothing */}
}

transition complete () {
  from InProgress to Completed
  when { value > 1 }
  with effect { transfer balance to caller }
}

transition interrupt () {
  from InProgress to Interrupted
  with effect { transfer (50% * balance) to caller }
}
```

Each transition is a contract entry point.

### Deploy

The following <Link to='/docs/cli'>Completium CLI</Link> command deploys the contract on the Tezos network:

```
completium-cli deploy 6-state_machine.arl
```

### Call entry points

In this example it is necessary to call specific entry points. A contract's entrypoints may be listed with:

```
completium-cli show entries 6-state_machine
```

The goal here is to set the state machine to `Completed` state. Use the following commands to transit the machine:

```
completium-cli call 6-state_machine --entry init --amount 5tz
```

```
completium-cli call 6-state_machine --entry inc_value
```

```
completium-cli call 6-state_machine --entry inc_value
```

At this stage, `value` is `2`, which allows transiting to `Completed`.

```
completium-cli call 6-state_machine --entry complete
```

This last call may be replaced by the following command to go to `Interrupted` state:

```
completium-cli call 6-state_machine --entry interrupt
```

### Next

Open '7-assets.arl' and click on "Next: Assets" below.


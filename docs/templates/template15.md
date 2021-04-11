---
id: template15
title: Connected Object
sidebar_label: Connected Object
slug: /templates/iot
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DeployIOT from './DeployIOT';

## Introduction

A connected object reads this contract to decide whether to switch on or off.

It reads the contract on a regular basis (typically every 5 second):
* it switches on if the *end of service* date is in the futur
* it switches off if the *end of service* date is in the past

The object is connected to the internet and executes an HTTP GET request to the Tezos blockchain on a regular basis, and reads the resulting Json answer.

Any user can transfer tezies to the contract to switch on the object for a duration determined by an exhange rate (tez to duration).

See this contract in action in the <Link to='/docs/dapp-iot/'>Connected Object</Link> DApp example.

## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `owner` | `adddress` | Object owner can change exchange `rate` and collect payments. |
| `rate` | `rational` | Exchange rate between tez and duration: `rate` `time_unit` in exchange for `tez_unit` amount of payment. |
| `endofservice` | `date` | Date of end of service. Read by object to decide whether to switch on or off. |
| `startofservice` | `date` | Date of start of service. For information only. |
| `time_unit` | `duration` | Time unit used in service duration computation. |
| `tez_unit` | `tez` | Tez unit used in service duration computation. |
| `user` | `option<address>` | <ul><li>some address of the current user to switch on object</li><li> none otherwise</li></ul> |
| `read_interval` | `duration` | Frequency of read by object. |

### Entrypoints

| Name | Type | Description |
| -- | -- | -- |
| `start` | | Starts service. The duration *d* of service is computed as: <p />*d* = `rate` * *transferred* |
| `interrupt` | | User who started service can interrupt it. <p />It pays back the user so that only the effective duration of service is paid. |
| `collect` | | Owner collects payments. |
| `setunits` | `d`, `t` | Owner can set time unit to `d` and tez unit to `t` when computing duration of service. |

## Originate

Originate a switch contract with the widget below.

Click "Connect to Wallet" button, fill the fields "Owner" and "Rate", and click "Originate".

<DeployIOT />

### Command line

Originate the contract from <a href='https://archetype-lang.org/'>Archetype</a> code below with the following <Link to='/docs/cli'>Completium CLI</Link> example command:

```
completium-cli deploy switch.arl --init '(@tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG, 2,5)'
```

The command sets:
* `owner` constant to `tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG`
* `rate` variable to 2.5


## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
  ]}>

<TabItem value="archetype">

```archetype title="switch.arl"
archetype switch(
  owner : address,
  rate  : rational
)

variable endofservice    : date = now
variable startofservice  : date = now

variable time_unit : duration = 1m
variable tez_unit : tez = 1tz

variable user : option<address> = none

variable read_interval : duration = 5s

function get_rate_in_s_by_utz () : rational {
  var d : int = time_unit;
  var t : nat = tez_unit;
  return (rate * d / t)
}

function get_return_tz () : tez {
  var res : int = 1 / get_rate_in_s_by_utz() * (endofservice - now);
  return (res * 1utz)
}

entry start () {
  require { r1: now > endofservice }
  effect {
    var t : nat = transferred;
    var dur : duration = (get_rate_in_s_by_utz() * t)*1s;
    if dur > read_interval then begin
      endofservice   := now + dur + read_interval;
      startofservice := now;
      user := some(caller)
    end
  }
}

entry interrupt () {
  require { r2: caller = opt_get(user) and now < endofservice }
  effect {
    transfer (get_return_tz()) to caller;
    endofservice   := now - read_interval;
    startofservice := now - read_interval;
  }
}

entry collect () {
  called by owner
  effect {
    var keep = 0tz;
    if now < endofservice then
      keep := get_return_tz();
    if balance - keep > 0tz then
      transfer (balance - keep) to owner
  }
}

entry setunits (dunit : duration, tunit : tez) {
  called by owner
  effect {
    time_unit := dunit;
    tez_unit  := tunit;
  }
}
```

</TabItem>

<TabItem value="michelson">

```js

```

</TabItem>

</Tabs>
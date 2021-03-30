---
id: tuto4
title: Dates and durations
sidebar_label: 4. Dates & Durations
slug: /dapp-tools/tutorials/archetype-datedur
---


import Link from '@docusaurus/Link';

The `date` and `duration` types are convenient to establish time related business logic.

## Code

In the following example, the call to the entry point succeeds if the contract was created more than 5 minutes and 10 seconds ago; the contract balance must be transferred to caller:

```archetype {6-11}
archetype time_window

variable creation : date = now

entry payback_after_period () {
  require {
      r1: now > creation + 5m10s
  }
  effect {
      transfer balance to caller
  }
}
```

We note that durations may be added or subtracted to dates, and can be compared.

There are several ways to initialize dates and durations:

```archetype
var d : duration = 3w8d4h34m18s; (* 3 weeks 8 days 4 hours 34 minutes 18 seconds *)
var date0 : date = 2019-01-01;                (* iso 8601 *)
var date1 : date = 2019-01-01T01:02:03;       (* iso 8601 *)
var date2 : date = 2019-01-01T01:02:03Z;      (* iso 8601 *)
var date3 : date = 2019-01-01T00:00:00+01:00; (* iso 8601 *)
var date4 : date = 2019-01-01T00:00:00-05:30; (* iso 8601 *)
```


## Deploy

The following <Link to='/docs/dapp-tools/completium-cli'>Completium CLI</Link> command deploys the contract on the Tezos network:

```
completium-cli deploy 4-time_window.arl --amount 5tz
```

Note here that the contract's balance is intialized to 5tz.

## Call entry point

The following command calls the unique entry point:

```
completium-cli call 4-time_window
```

If you try this command before valid timelapse of 5 minutes and 10 seconds, it returns an error displayed below:

```
 completium-cli call 4-time_window
? Confirm call to entrypoint default of contract 4-time_window by 'admin' with 0 ꜩ and argument {"prim":"Unit"} on edo? Yes
Account 'tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw' is calling default of KT1GKryAWodQmVPQV4fMsW9FHBmWNgpEu7fF with 0 ꜩ...
{
  errors: '...',
  name: 'TezosOperationError',
  id: 'proto.008-PtEdo2Zk.michelson_v1.script_rejected',
  kind: 'temporary',
  message: 'InvalidCondition: r1'
}
```

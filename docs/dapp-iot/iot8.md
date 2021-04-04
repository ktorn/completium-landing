---
id: iot8
title: Interface
sidebar_label: Interface
slug: /dapp-iot/interface
---

import Link from '@docusaurus/Link';

The smart contract is developed with the <a href='https://archetype-lang.org/'>Archetype</a> language.

## Storage

Address of the contract owner only capable of collecting payments and setting parameters:

```archetype
variable owner : address = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw
```

Start date of service:

```archetype
variable dateofstop   : date = now
```

End date of service (the service is off if in the past, on otherwize):

```archetype
variable dateofstart  : date = now
```

Number of minutes of service mimutes par XTZ sent:

```archetype
variable rate : rational = 1.2 // in time_unit / tez_unit
```

Time unit:

```archetype
variable time_unit : duration = 1m
```

Tez unit:

```archetype
variable tez_unit : tez = 1tz
```

Last/current customer address:

```archetype
variable user : option<address> = none
```

Duration between two state lookups by the connected object:

```archetype
variable read_interval : duration = 5s
```

## Entry points

### start

```archetype
entry start () {
    require {
        r1: now > dateofstop;
    }
    effect {
        ...
    }
}
```

### interrupt

It is possible to interrupt the service before its planned end of service date by calling this entry point. In that case, the smart contract pays the caller back in proportion of the service duration without any penalty.

```archetype
entry interrupt () {
    require {
        r2: caller = opt_get(user) and now < dateofstop
    }
    effect {
        ...
    }
}
```

### collect

Called by `owner` to collect service payments:

```archetype
entry collect () {
    called by owner
    effect {
        ...
    }
}
```

### set unit

```archetype
entry setunits (dunit : duration, tunit : tez) {
    called by owner
    effect {
        ...
    }
}
```
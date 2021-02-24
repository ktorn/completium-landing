---
id: iot9
title: Implementation
sidebar_label: Implementation
slug: /dapp-iot/implementation
---

import Link from '@docusaurus/Link';

## Start

```archetype {7,9,10}
entry start () {
    require {
        r1: now > dateofstop;
    }
    effect {
        var t : nat = transferred;
        var dur : duration = (get_rate_in_s_by_utz() * t) * 1s;
        if dur > read_interval then (
            dateofstop := now + dur + read_interval;
            dateofstart := now;
            user := some(caller)
        )
    }
}
```

Duration is computed by multiplying the amount of `transferred` XTZ by the price rate. The price rate is converted to mutz (one millionth of tez) per second with the `get_rate_in_s_by_utz` function:

```archetype
function get_rate_in_s_by_utz () : rational {
    var d : int = time_unit;
    var t : nat = tez_unit;
    return (rate * d / t)
}
```

`dateofstop` is computed with the following simple formula `now + dur + read_interval`.

We note that the <Link to='/docs/dapp-tools/archetype'>Archetype</Link> makes it very simple to manipulate durations.

## Interrupt

The `interrupt` entry point pays back the caller so that the caller pays only for the effective duration of service.

```archetype {6}
entry interrupt () {
    require {
        r2: caller = opt_get(user) and now < dateofstop
    }
    effect {
        transfer (get_return_tz()) to caller;
        dateofstop  := now - read_interval;
        dateofstart := now - read_interval;
    }
}
```

The `get_return_tz` function computes the number of XTZ to return to the caller:

```archetype {2}
function get_return_tz () : tez {
    var res : int = 1 / get_rate_in_s_by_utz() * (dateofstop - now);
    return (res * 1utz)
}
```

`dateofstop - now` is the duration from `now` to the initially planned date of end of service.

## Collect

```archetype
entry collect () {
    called by owner
    effect {
        var keep = 0tz;
        if now < dateofstop then
            keep := get_return_tz();
        if balance - keep > 0tz then
            transfer (balance - keep) to owner
    }
}
```

## Set Unit

```archetype
entry setunits (dunit : duration, tunit : tez) {
    called by owner
    effect {
        time_unit := dunit;
        tez_unit := tunit;
    }
}
```


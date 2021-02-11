---
id: iot9
title: Implementation
sidebar_label: Implementation
slug: /dapp-iot/implementation
---

## Start

```archetype
entry start () {
    require {
        r1: now > dateofstop;
    }
    effect {
        var t : nat = transferred;
        var dur : duration = (get_rate_in_s_by_utz() * t)*1s;
        if dur > read_interval then (
            dateofstop := now + dur + read_interval;
            dateofstart := now;
            user := some(caller)
        )
    }
}
```

## Interrupt

```archetype
function get_return_tz () : tez {
    var res : int = 1 / get_rate_in_s_by_utz() * (dateofstop - now);
    return (res * 1utz)
}
```

```archetype
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


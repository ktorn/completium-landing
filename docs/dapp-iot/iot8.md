---
id: iot8
title: Interface
sidebar_label: Interface
slug: /dapp-iot/interface
---

## Storage

```archetype
variable owner : address = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw
```

```archetype
variable dateofstop   : date = now
```

```archetype
variable dateofstart  : date = now
```

```archetype
variable rate : rational = 1.2 // in time_unit / tez_unit
```

```archetype
variable time_unit : duration = 1m
```

```archetype
variable tez_unit : tez = 1tz
```

```archetype
variable user : option<address> = none
```

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
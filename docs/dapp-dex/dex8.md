---
id: dex8
title: Interface
sidebar_label: Interface
slug: /dapp-dex/interface
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';


## Storage

```archetype
constant gamma         : rational = 1 - 0.003
```

```archetype
constant epsilon       : nat = 1
```

```archetype
constant initialminted : nat = 1_000_000
```

```archetype
variable admin : address = @tz1Lc2qBKEWCBeDU8npG6zCeCqpmaegRi6Jg
```


```archetype
asset token {
  id       : string;      /* token label identifier  */
  addr     : address;     /* FA 1.2 contract address */
  name     : string;      /* FA 1.2 name             */
  iconurl  : string;      /* Icon                    */
  poolvalue: nat = 0;     /* XTZ value in pool       */
  totalqty : nat = 0;     /* total number of tokens  */
  totallqt : nat = 0;     /* total LTQ tokens        */
}
```

```archetype
asset liquidity identified by tokenid owner {
  tokenid  : string;      /* token id                */
  owner    : address;     /* LQT owner               */
  lqt      : nat = 0;     /* LQT quantity            */
}
```

## Entry points

### Register/Delete token

```archetype
entry registertoken (i : string, a : address, n : string, u : string) {
  called by admin
  ...
}
```

```archetype
entry deletetoken (i : string) {
  called by admin
  ...
}
```

### Exchange

```archetype
entry exchange(tA : string, aA: nat, tB : string, aB : nat) {
    ...
}
```

### Add liquidity

```archetype
entry addLiquidity(tL : string, qL : nat) {
    ...
}
```

### Remove liquidity

```archetype
entry removeLiquidity(qL : nat, tA : string) {
    ...
}
```
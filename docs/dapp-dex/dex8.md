---
id: dex8
title: Interface
sidebar_label: Interface
slug: /dapp-dex/interface
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

## Storage

The fee rate is set to 0.3%:

```archetype
constant gamma         : rational = 1 - 0.003
```

The difference between the expected exchanged quantitiy and the actual quantitiy must be less than espsilon (in XTZ, see <Link  to='/docs/dapp-dex/implementation#exchange'>exchange</Link> entry point implementation):

```archetype
constant epsilon       : nat = 1
```

Initial number of minted liquidity tokens (see <Link  to='/docs/dapp-dex/implementation#add-liquidity'>addLiquidity</Link> entry point implementation):

```archetype
constant initialminted : nat = 1_000_000
```

Admin account:

```archetype
variable admin : address = @tz1Lc2qBKEWCBeDU8npG6zCeCqpmaegRi6Jg
```

Token asset:
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

Unique exchange entry point:
* tA: name of token to exchange from
* aA: quantity of tA to exchange
* tB: name of the token to exchange to
* aB: quantitiy of tB to get

Names are those specified in the `token` asset.

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
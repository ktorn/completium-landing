---
id: nonfungible8
title: Interface
sidebar_label: Interface
slug: /dapp-nonfungible/interface
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

The smart contract is a `FA2` contract.

## Storage

```archetype
asset token {
  tid        : nat;
  tprice     : tez;
} initialized by {
  { 973012;  1.3tz };
  { 973013;  2.2tz };
  { 973014;  1.4tz };
  { 973015;  3.4tz };
  { 973016;  2.8tz };
  { 973017;  1.0tz };
  { 973018;  2.4tz };
  { 973019;  4.1tz };
  { 973020; 12.4tz };
  ...
  { 973113;  1.4tz }
}
```

```archetype
asset ledger identified by ltoken {
  ltoken     : nat;
  lowner     : address;
} initialized by {
  { 973012; caller };
  { 973013; caller };
  { 973014; caller };
  { 973015; caller };
  { 973016; caller };
  { 973017; caller };
  { 973018; caller };
  { 973019; caller };
  { 973020; caller };
  ...
  { 973113; caller }
}
```

```archetype
asset operator identified by oaddr otoken oowner {
  oaddr       : address;
  otoken      : nat;
  oowner      : address;
}
```

## Entry points

### Update operators

```archetype
record operator_param {
  opp_owner    : address;
  opp_operator : address;
  opp_token_id : nat
} as ((owner, (operator, token_id)))

entry update_operators (upl : list<or<operator_param, operator_param>>) {
  ...
}
```

### Transfer

```archetype
record transfer_destination {
  to_dest           : address;
  token_id_dest     : nat;
  token_amount_dest : nat
} as ((to_, (token_id, amount)))
```

```archetype
entry %transfer (txs : list<address * list<transfer_destination>>) {
  ...
}
```

### Balance of

```archetype
record balance_of_request {
  bo_owner : address;
  btoken_id : nat;
} as ((owner, token_id))

record balance_of_response {
  request : balance_of_request;
  balance_ : nat;
} as ((request, balance))
```

```archetype
getter balance_of (requests : list<balance_of_request>) : list<balance_of_response> {
    ...
}
```

### Buy

```archetype
entry buy (tokenids : list<nat>) {
 ...
}
```

### Sell

```archetype
entry sell (tokenid : nat) {
  ...
}
```

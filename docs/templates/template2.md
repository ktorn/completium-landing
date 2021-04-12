---
id: template2
title: ERC20
sidebar_label: ERC20
slug: /templates/erc20
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

:::caution
It is strongly suggested to use the <Link to='/docs/templates/fa12'>FA 1.2</Link> norm for fungible token.
:::

## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `total` | `nat` | total number of unit tokens. |
| `onetoken` | `nat` | number of units for one token. |
| `ledger` | `collection` | Association between token holder and number of tokens. |
| `allowance` | `collection` | Association between the pair owner and spender and the allowed amount. |
### Entrypoints

| Name | Parameters | Description |
| -- | -- | -- |
| `transfer` | `to`, `value` | Transfers `value` tokens from *caller* to `to`. |
| `approve` | `spender`, `value` | Approves `spender` to transfer `value` tokens from *caller*. |
| `transferFrom` | `from`, `to`, `value`| Transfers `value` tokens from `from` to `to`. It requires that *caller* have been allowed by `from` to transfer this amount to `to`.  |


## Originate

Deploy the contract from <a href='https://archetype-lang.org/'>Archetype</a> code below with the following <Link to='/docs/cli'>Completium CLI</Link> example command:

```
completium-cli deploy erc20.arl --init '(1_000_000_000_000_000, 1_000_000, @tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG)'
```

The command sets:
* `total` variable to 10 millions
* `onetoken` variable to 1 million
* `initialholder` constant to `tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG`
## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
  ]}>

<TabItem value="archetype">

```archetype title="erc20.arl"
archetype erc20(total : nat, onetoken: nat, const initialowner : address)

asset allowance identified by owner spender {
  owner     : address;
  spender     : address;
  amount      : nat;
}

asset ledger identified by holder {
  holder     : address;
  tokens     : nat = 0;
} initialized by {
  { holder = initialowner; tokens = total }
}

entry %transfer (%to : pkey<ledger>, value : nat) {
  require {
    d0 : ledger[caller].tokens >= value
  }
  effect {
    ledger.addupdate(%to,  { tokens += value });
    ledger.update(caller, { tokens -= value })
  }
}

entry approve(ispender : address, value : nat) {
  require {
    d1 : ledger[caller].tokens >= value;
  }
  effect {
    allowance.addupdate((caller, ispender), { amount = value });
  }
}

entry transferFrom(%from : address, %to : address, value : nat) {
  require {
    d3: allowance[(%from,caller)].amount >= value;
    d4: ledger[%from].tokens >= value
  }
  effect {
    (* update allowance *)
    allowance.update((%from,caller), { amount -=  value });
    (* update token *)
    ledger.addupdate(%to, { tokens += value });
    ledger.update(%from,  { tokens -= value });
  }
}
```

</TabItem>

<TabItem value="michelson">

The <Link to='/docs/contract/programming-language#micheslon'>Michelson</Link> code is generated with version 1.2.3 of Archetype.

```js
# (Pair 1000000000000000 (Pair 1000000 (Pair {  } { Elt "tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG" 1000000000000000 })))
{
  storage (pair (nat %total) (pair (nat %onetoken) (pair (map %allowance (pair address address) nat) (map %ledger address nat))));
  parameter (or (pair %transfer (address %to) (nat %value)) (or (pair %approve (address %ispender) (nat %value)) (pair %transferFrom (address %from) (pair (address %to) (nat %value)))));
  code { UNPAIR;
         DIP { UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP };
         IF_LEFT
           { UNPAIR;
             SWAP;
             DUP;
             DIG 3;
             DUP;
             DUG 4;
             SENDER;
             GET;
             IF_NONE
               { PUSH string "GetNoneValue";
                 FAILWITH }
               {  };
             COMPARE;
             GE;
             NOT;
             IF
               { PUSH string "InvalidCondition: d0";
                 FAILWITH }
               {  };
             DIG 2;
             DUP;
             DUG 3;
             DIG 2;
             DUP;
             DUG 3;
             MEM;
             IF
               { DIG 2;
                 DUP;
                 DUG 3;
                 DIG 2;
                 DUP;
                 DUG 3;
                 GET;
                 IF_NONE
                   { PUSH string "GetNoneValue";
                     FAILWITH }
                   {  };
                 DIG 3;
                 DUP;
                 DUG 4;
                 DIG 2;
                 DUP;
                 DUG 3;
                 DIG 2;
                 DUP;
                 DUG 3;
                 ADD;
                 SOME;
                 DIG 4;
                 DUP;
                 DUG 5;
                 UPDATE;
                 DIP { DIG 3; DROP };
                 DUG 3;
                 DROP }
               { DIG 2;
                 DUP;
                 DUG 3;
                 DIG 2;
                 DUP;
                 DUG 3;
                 MEM;
                 IF
                   { PUSH string "KeyAlreadyExists";
                     FAILWITH }
                   { DIG 2;
                     DUP;
                     DUG 3;
                     DIG 1;
                     DUP;
                     DUG 2;
                     PUSH nat 0;
                     ADD;
                     SOME;
                     DIG 3;
                     DUP;
                     DUG 4;
                     UPDATE;
                     DIP { DIG 2; DROP };
                     DUG 2 } };
             DIG 2;
             DUP;
             DUG 3;
             SENDER;
             GET;
             IF_NONE
               { PUSH string "GetNoneValue";
                 FAILWITH }
               {  };
             DIG 3;
             DUP;
             DUG 4;
             PUSH int 0;
             DIG 3;
             DUP;
             DUG 4;
             INT;
             DIG 3;
             DUP;
             DUG 4;
             SUB;
             COMPARE;
             GE;
             IF
               { DIG 2;
                 DUP;
                 DUG 3;
                 INT;
                 DIG 2;
                 DUP;
                 DUG 3;
                 SUB;
                 ABS }
               { PUSH string "AssignNat";
                 FAILWITH };
             SOME;
             SENDER;
             UPDATE;
             DIP { DIG 3; DROP };
             DUG 3;
             DROP 3;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             NIL operation;
             PAIR }
           { IF_LEFT
               { UNPAIR;
                 SWAP;
                 DUP;
                 DIG 3;
                 DUP;
                 DUG 4;
                 SENDER;
                 GET;
                 IF_NONE
                   { PUSH string "GetNoneValue";
                     FAILWITH }
                   {  };
                 COMPARE;
                 GE;
                 NOT;
                 IF
                   { PUSH string "InvalidCondition: d1";
                     FAILWITH }
                   {  };
                 DIG 3;
                 DUP;
                 DUG 4;
                 DIG 1;
                 DUP;
                 DUG 2;
                 SOME;
                 DIG 3;
                 DUP;
                 DUG 4;
                 SENDER;
                 PAIR;
                 UPDATE;
                 DIP { DIG 3; DROP };
                 DUG 3;
                 DROP 2;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 NIL operation;
                 PAIR }
               { UNPAIR;
                 SWAP;
                 UNPAIR;
                 SWAP;
                 DUP;
                 DIG 5;
                 DUP;
                 DUG 6;
                 SENDER;
                 DIG 5;
                 DUP;
                 DUG 6;
                 PAIR;
                 GET;
                 IF_NONE
                   { PUSH string "GetNoneValue";
                     FAILWITH }
                   {  };
                 COMPARE;
                 GE;
                 NOT;
                 IF
                   { PUSH string "InvalidCondition: d3";
                     FAILWITH }
                   {  };
                 DUP;
                 DIG 4;
                 DUP;
                 DUG 5;
                 DIG 4;
                 DUP;
                 DUG 5;
                 GET;
                 IF_NONE
                   { PUSH string "GetNoneValue";
                     FAILWITH }
                   {  };
                 COMPARE;
                 GE;
                 NOT;
                 IF
                   { PUSH string "InvalidCondition: d4";
                     FAILWITH }
                   {  };
                 DIG 4;
                 DUP;
                 DUG 5;
                 SENDER;
                 DIG 4;
                 DUP;
                 DUG 5;
                 PAIR;
                 GET;
                 IF_NONE
                   { PUSH string "GetNoneValue";
                     FAILWITH }
                   {  };
                 DIG 5;
                 DUP;
                 DUG 6;
                 PUSH int 0;
                 DIG 3;
                 DUP;
                 DUG 4;
                 INT;
                 DIG 3;
                 DUP;
                 DUG 4;
                 SUB;
                 COMPARE;
                 GE;
                 IF
                   { DIG 2;
                     DUP;
                     DUG 3;
                     INT;
                     DIG 2;
                     DUP;
                     DUG 3;
                     SUB;
                     ABS }
                   { PUSH string "AssignNat";
                     FAILWITH };
                 SOME;
                 SENDER;
                 DIG 6;
                 DUP;
                 DUG 7;
                 PAIR;
                 UPDATE;
                 DIP { DIG 5; DROP };
                 DUG 5;
                 DROP;
                 DIG 3;
                 DUP;
                 DUG 4;
                 DIG 2;
                 DUP;
                 DUG 3;
                 MEM;
                 IF
                   { DIG 3;
                     DUP;
                     DUG 4;
                     DIG 2;
                     DUP;
                     DUG 3;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     DIG 4;
                     DUP;
                     DUG 5;
                     DIG 2;
                     DUP;
                     DUG 3;
                     DIG 2;
                     DUP;
                     DUG 3;
                     ADD;
                     SOME;
                     DIG 4;
                     DUP;
                     DUG 5;
                     UPDATE;
                     DIP { DIG 4; DROP };
                     DUG 4;
                     DROP }
                   { DIG 3;
                     DUP;
                     DUG 4;
                     DIG 2;
                     DUP;
                     DUG 3;
                     MEM;
                     IF
                       { PUSH string "KeyAlreadyExists";
                         FAILWITH }
                       { DIG 3;
                         DUP;
                         DUG 4;
                         DIG 1;
                         DUP;
                         DUG 2;
                         PUSH nat 0;
                         ADD;
                         SOME;
                         DIG 3;
                         DUP;
                         DUG 4;
                         UPDATE;
                         DIP { DIG 3; DROP };
                         DUG 3 } };
                 DIG 3;
                 DUP;
                 DUG 4;
                 DIG 3;
                 DUP;
                 DUG 4;
                 GET;
                 IF_NONE
                   { PUSH string "GetNoneValue";
                     FAILWITH }
                   {  };
                 DIG 4;
                 DUP;
                 DUG 5;
                 PUSH int 0;
                 DIG 3;
                 DUP;
                 DUG 4;
                 INT;
                 DIG 3;
                 DUP;
                 DUG 4;
                 SUB;
                 COMPARE;
                 GE;
                 IF
                   { DIG 2;
                     DUP;
                     DUG 3;
                     INT;
                     DIG 2;
                     DUP;
                     DUG 3;
                     SUB;
                     ABS }
                   { PUSH string "AssignNat";
                     FAILWITH };
                 SOME;
                 DIG 5;
                 DUP;
                 DUG 6;
                 UPDATE;
                 DIP { DIG 4; DROP };
                 DUG 4;
                 DROP 4;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 NIL operation;
                 PAIR } } };
}
```

</TabItem>

</Tabs>
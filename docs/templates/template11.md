---
id: template11
title: Escrow
sidebar_label: Escrow
slug: /templates/escrow
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

The escrow smart contract establishes a decentralized purchase process between the seller and buyer. The principle is that the price amount is escrowed in the smart contract and released when the purchased item is received by buyer.

The critical point of the process is that it requires actions from the buyer and the seller to complete the process:
* if the seller does not send the item, buyer's fund are locked in the escrow
* if the buyer does not complete the process, even if the item is received, then the seller does not reveive payment

In order to motivate both the seller and the buyer to execute the process, the basic idea is that they fund the escrow with *security deposits* that are transferred back only if the process is complete. In the escrow presented here, security deposits are a proportion of the price of the item.

## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `seller` | `address` | Seller's address. |
| `buyer` | `address` | Buyer's address. |
| `taxcollecter` | `address` | Tax collector's address. |
| `price` | `tez` | Amount of transaction. |
| `taxrate` | `rational`| Tax rate applied to `price` |
| `securityrate` | `rational` | Security rate applied to `price` for security deposit. |
| `_state` | `states` | Escrow state, one of `Create`, `Aborted`, `Funded`, `Completed` |
### Entrypoints

| Name | Parameters | Description |
| -- | -- | -- |
| `abort` | | `buyer` and `seller` can abort escrow in `Created` state. |
| `toFunded` | | Internally called by escrow to go to `Funded` state. |
| `fund` | | Called by `buyer` and `seller` to provide funds:<ul><li>`buyer` must transfer price, security deposit and taxes </li><li>`seller` must transfer security deposit.</li></ul> |
| `complete` | | Called by `buyer` when purchased item is received. This transfers:<ul><li>item price and security deposit to `seller`</li><li>security deposit to `buyer`</li><li>tax to `taxcollector`</li></ul> |

## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
  ]}>

<TabItem value="archetype">

```archetype title="escrow.arl"
archetype escrow(
seller       : role,
buyer        : role,
taxcollector : role,
price        : tez,
taxrate      : rational,
securityrate : rational,
)

variable buyer_funded  : bool = false
variable seller_funded : bool = false

(* states *)
states =
 | Created initial
 | Aborted
 | Funded
 | Completed

transition abort () {
  called by buyer or seller
  from Created to Aborted
}

transition toFunded () {
  called by selfaddress
  from Created to Funded
}

entry fund () {
  called by buyer or seller
  effect {
    if caller = buyer then begin
      dorequire(transferred >= (1 + taxrate + securityrate) * price, "NOT_ENOUGH_FUND");
      buyer_funded := true
    end else if caller = seller then begin
      dorequire(transferred >= securityrate * price, "NOT_ENOUGH_FUND");
      seller_funded := true
    end;
    if buyer_funded and seller_funded then
      transfer 0tz to entry self.toFunded()
  }
}

transition complete () {
  called by buyer
  from Funded to Completed
  with effect {
    transfer ((1 + securityrate) * price) to seller;
    transfer (securityrate * price)       to buyer;
    if taxrate > 0 then
      transfer (taxrate * price)          to taxcollector;
  }
}
```

</TabItem>

<TabItem value="michelson">

```js
# (Pair seller (Pair buyer (Pair taxcollector (Pair price (Pair taxrate (Pair securityrate (Pair False (Pair False 0))))))))
{
  storage (pair (address %seller) (pair (address %buyer) (pair (address %taxcollector) (pair (mutez %price) (pair (pair %taxrate int nat) (pair (pair %securityrate int nat) (pair (bool %buyer_funded) (pair (bool %seller_funded) (nat %_state)))))))));
  parameter (or (unit %abort) (or (unit %toFunded) (or (unit %fund) (unit %complete))));
  code { LAMBDA
           (pair (pair (pair int nat) (pair int nat)) (or unit (or (or unit unit) (or unit unit))))
           bool
           { UNPAIR;
             UNPAIR;
             DIP { UNPAIR };
             UNPAIR;
             DUG 3;
             MUL;
             DIP { MUL };
             SWAP;
             COMPARE;
             SWAP;
             IF_LEFT
               { DROP;
                 EQ }
               { IF_LEFT
                   { IF_LEFT
                       { DROP;
                         LT }
                       { DROP;
                         LE } }
                   { IF_LEFT
                       { DROP;
                         GT }
                       { DROP;
                         GE } } } };
         NIL operation;
         DIG 2;
         UNPAIR;
         DIP { UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP };
         IF_LEFT
           { DROP;
             DIG 8;
             DUP;
             DUG 9;
             SENDER;
             COMPARE;
             EQ;
             DIG 8;
             DUP;
             DUG 9;
             SENDER;
             COMPARE;
             EQ;
             OR;
             NOT;
             IF
               { PUSH string "InvalidCaller";
                 FAILWITH }
               {  };
             DUP;
             DUP;
             PUSH nat 0;
             COMPARE;
             EQ;
             IF
               { PUSH nat 1;
                 DIP { DIG 1; DROP };
                 DUG 1 }
               { PUSH string "InvalidState";
                 FAILWITH };
             DROP;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             DIG 1;
             PAIR }
           { IF_LEFT
               { DROP;
                 SELF;
                 ADDRESS;
                 SENDER;
                 COMPARE;
                 EQ;
                 NOT;
                 IF
                   { PUSH string "InvalidCaller";
                     FAILWITH }
                   {  };
                 DUP;
                 DUP;
                 PUSH nat 0;
                 COMPARE;
                 EQ;
                 IF
                   { PUSH nat 2;
                     DIP { DIG 1; DROP };
                     DUG 1 }
                   { PUSH string "InvalidState";
                     FAILWITH };
                 DROP;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 DIG 1;
                 PAIR }
               { IF_LEFT
                   { DROP;
                     DIG 8;
                     DUP;
                     DUG 9;
                     SENDER;
                     COMPARE;
                     EQ;
                     DIG 8;
                     DUP;
                     DUG 9;
                     SENDER;
                     COMPARE;
                     EQ;
                     OR;
                     NOT;
                     IF
                       { PUSH string "InvalidCaller";
                         FAILWITH }
                       {  };
                     DIG 7;
                     DUP;
                     DUG 8;
                     SENDER;
                     COMPARE;
                     EQ;
                     IF
                       { DIG 5;
                         DUP;
                         DUG 6;
                         UNIT;
                         LEFT unit;
                         DIG 5;
                         DUP;
                         DUG 6;
                         UNIT;
                         LEFT unit;
                         DIG 8;
                         DUP;
                         DUG 9;
                         PUSH nat 1;
                         PUSH nat 1;
                         INT;
                         PAIR;
                         PAIR;
                         PAIR;
                         UNPAIR;
                         UNPAIR;
                         DIP { UNPAIR; SWAP; DUP };
                         UNPAIR;
                         SWAP;
                         DUP;
                         DIG 3;
                         MUL;
                         DUG 4;
                         DIG 3;
                         MUL;
                         DIP { MUL };
                         DIG 3;
                         IF_LEFT
                           { DROP;
                             ADD }
                           { DROP;
                             SWAP;
                             SUB };
                         PAIR;
                         PAIR;
                         PAIR;
                         UNPAIR;
                         UNPAIR;
                         DIP { UNPAIR; SWAP; DUP };
                         UNPAIR;
                         SWAP;
                         DUP;
                         DIG 3;
                         MUL;
                         DUG 4;
                         DIG 3;
                         MUL;
                         DIP { MUL };
                         DIG 3;
                         IF_LEFT
                           { DROP;
                             ADD }
                           { DROP;
                             SWAP;
                             SUB };
                         PAIR;
                         PAIR;
                         UNPAIR;
                         UNPAIR;
                         ABS;
                         DIG 2;
                         MUL;
                         EDIV;
                         IF_NONE
                           { PUSH string "DivByZero";
                             FAILWITH }
                           {  };
                         CAR;
                         AMOUNT;
                         COMPARE;
                         GE;
                         NOT;
                         IF
                           { PUSH string "NOT_ENOUGH_FUND";
                             FAILWITH }
                           {  };
                         PUSH bool True;
                         DIP { DIG 2; DROP };
                         DUG 2 }
                       { DIG 8;
                         DUP;
                         DUG 9;
                         SENDER;
                         COMPARE;
                         EQ;
                         IF
                           { DIG 5;
                             DUP;
                             DUG 6;
                             DIG 4;
                             DUP;
                             DUG 5;
                             PAIR;
                             UNPAIR;
                             UNPAIR;
                             ABS;
                             DIG 2;
                             MUL;
                             EDIV;
                             IF_NONE
                               { PUSH string "DivByZero";
                                 FAILWITH }
                               {  };
                             CAR;
                             AMOUNT;
                             COMPARE;
                             GE;
                             NOT;
                             IF
                               { PUSH string "NOT_ENOUGH_FUND";
                                 FAILWITH }
                               {  };
                             PUSH bool True;
                             DIP { DIG 1; DROP };
                             DUG 1 }
                           {  } };
                     DIG 1;
                     DUP;
                     DUG 2;
                     DIG 3;
                     DUP;
                     DUG 4;
                     AND;
                     IF
                       { DIG 9;
                         DUP;
                         DUG 10;
                         SELF;
                         ADDRESS;
                         CONTRACT %toFunded unit;
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         PUSH mutez 0;
                         UNIT;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 9; DROP };
                         DUG 9 }
                       {  };
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     DIG 1;
                     PAIR }
                   { DROP;
                     DIG 7;
                     DUP;
                     DUG 8;
                     SENDER;
                     COMPARE;
                     EQ;
                     NOT;
                     IF
                       { PUSH string "InvalidCaller";
                         FAILWITH }
                       {  };
                     DUP;
                     DUP;
                     PUSH nat 2;
                     COMPARE;
                     EQ;
                     IF
                       { DIG 10;
                         DUP;
                         DUG 11;
                         DIG 10;
                         DUP;
                         DUG 11;
                         CONTRACT unit;
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         DIG 8;
                         DUP;
                         DUG 9;
                         UNIT;
                         LEFT unit;
                         DIG 8;
                         DUP;
                         DUG 9;
                         PUSH nat 1;
                         PUSH nat 1;
                         INT;
                         PAIR;
                         PAIR;
                         PAIR;
                         UNPAIR;
                         UNPAIR;
                         DIP { UNPAIR; SWAP; DUP };
                         UNPAIR;
                         SWAP;
                         DUP;
                         DIG 3;
                         MUL;
                         DUG 4;
                         DIG 3;
                         MUL;
                         DIP { MUL };
                         DIG 3;
                         IF_LEFT
                           { DROP;
                             ADD }
                           { DROP;
                             SWAP;
                             SUB };
                         PAIR;
                         PAIR;
                         UNPAIR;
                         UNPAIR;
                         ABS;
                         DIG 2;
                         MUL;
                         EDIV;
                         IF_NONE
                           { PUSH string "DivByZero";
                             FAILWITH }
                           {  };
                         CAR;
                         UNIT;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 10; DROP };
                         DUG 10;
                         DIG 10;
                         DUP;
                         DUG 11;
                         DIG 9;
                         DUP;
                         DUG 10;
                         CONTRACT unit;
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         DIG 8;
                         DUP;
                         DUG 9;
                         DIG 7;
                         DUP;
                         DUG 8;
                         PAIR;
                         UNPAIR;
                         UNPAIR;
                         ABS;
                         DIG 2;
                         MUL;
                         EDIV;
                         IF_NONE
                           { PUSH string "DivByZero";
                             FAILWITH }
                           {  };
                         CAR;
                         UNIT;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 10; DROP };
                         DUG 10;
                         DIG 11;
                         DUP;
                         DUG 12;
                         UNIT;
                         LEFT unit;
                         RIGHT (or unit unit);
                         RIGHT unit;
                         PUSH nat 1;
                         PUSH int 0;
                         PAIR;
                         DIG 8;
                         DUP;
                         DUG 9;
                         PAIR;
                         PAIR;
                         EXEC;
                         IF
                           { DIG 10;
                             DUP;
                             DUG 11;
                             DIG 8;
                             DUP;
                             DUG 9;
                             CONTRACT unit;
                             IF_NONE
                               { PUSH string "BadContract";
                                 FAILWITH }
                               {  };
                             DIG 8;
                             DUP;
                             DUG 9;
                             DIG 8;
                             DUP;
                             DUG 9;
                             PAIR;
                             UNPAIR;
                             UNPAIR;
                             ABS;
                             DIG 2;
                             MUL;
                             EDIV;
                             IF_NONE
                               { PUSH string "DivByZero";
                                 FAILWITH }
                               {  };
                             CAR;
                             UNIT;
                             TRANSFER_TOKENS;
                             CONS;
                             DIP { DIG 10; DROP };
                             DUG 10 }
                           {  };
                         PUSH nat 3;
                         DIP { DIG 1; DROP };
                         DUG 1 }
                       { PUSH string "InvalidState";
                         FAILWITH };
                     DROP;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     DIG 1;
                     PAIR } } };
         DIP { DROP } };
}
```

</TabItem>

</Tabs>
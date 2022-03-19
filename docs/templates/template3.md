---
id: template3
title: FA 2
sidebar_label: FA 2
slug: /templates/nft
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

This contract follows the Financial Asset 2 (FA 2) <a href='https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-12/tzip-12.md'>TZIP 12</a> specification for non-fungible token on Tezos.

:::info
The version presented below is a simple minimal version. A full-featured version (with mint, burn, feeless transfer, royalties, ...) is available [here](https://github.com/rarible/tezos-protocol-contracts/tree/main/tokens).
:::

## API

FA 2 introduces the concept of *operator*, which is an account that can transfer a token on behalf of the owner. The delegation is done by the owner with the `update_operators` entrypoint.

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `token` | `collection` | Token data, like price. |
| `ledger` | `collection` | Association between token id and its owner. |
| `operator` | `collection` | Delegation data: which operator can transfer which token owned by which owner? |
| `token_metadata` | `collection` | Token metadata. |

### Entrypoints

| Name | Parameters | Description  |
| -- | -- | -- |
| `update_operators` | `upl` | `upl` is a list of delegation data (named `operator_param` with token, owner and operator), either to add or remove an operator to a token and owner. It fails if the *caller* is not the declared owner in `upl`.  |
| `transfer` | `txs` | Transfers token ownerships specified in `txs`, a list of `transfer_param` (from, to, token). If *caller* is not the token owner, it must be declared in `operator` to be able to transfer, otherwise it fails. |
| `balance_of` | `requests` | Returns the list a token balance for each token id in `requests`. |

## Originate


Deploy the contract from <a href='https://archetype-lang.org/'>Archetype</a> code below with the following <Link to='/docs/cli'>Completium CLI</Link> example command:

```
completium-cli deploy nft.arl
```

## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
  ]}>

<TabItem value="archetype">

```archetype nft

asset ledger identified by ltoken to big_map {
  ltoken     : nat;
  lowner     : address;
}

asset operator identified by oaddr otoken oowner {
  oaddr       : address;
  otoken      : nat;
  oowner      : address;
}

asset token_metadata to big_map {
  key_token_id   : nat;
  token_id       : nat;
  symbol         : string;
  name           : string;
  decimals       : nat;
  extras         : map<string, string>;
}

record operator_param {
  opp_owner    : address;
  opp_operator : address;
  opp_token_id : nat
} as ((owner, (operator, token_id)))

entry update_operators (upl : list<or<operator_param, operator_param>>) {
  for up in upl do
    match up with
    | left(param)  -> (* add *)
      dorequire(ledger[param.opp_token_id].lowner = caller, "CALLER NOT OWNER");
      operator.add({param.opp_operator; param.opp_token_id; param.opp_owner})
    | right(param) -> (* remove *)
      dorequire(ledger[param.opp_token_id].lowner = caller, "CALLER NOT OWNER");
      operator.remove((param.opp_operator, param.opp_token_id, param.opp_owner))
    end;
  done;
}

record transfer_destination {
  to_dest           : address;
  token_id_dest     : nat;
  token_amount_dest : nat
} as ((to_, (token_id, amount)))

record transfer_item {
  from_: address;
  txs: list<transfer_destination>;
}

entry %transfer (itxs : list<transfer_item>) {
  for tx in itxs do
    for td in tx.txs do begin
      if caller <> tx.from_ then begin
        (* check operator *)
        dorequire(operator.contains((caller,td.token_id_dest,tx.from_)),"FA2_NOT_OPERATOR");
      end;
      (* set token ownership *)
      ledger.addupdate(td.token_id_dest,{ lowner = td.to_dest });
    end done;
  done
}

record balance_of_request {
  bo_owner : address;
  btoken_id : nat;
} as ((owner, token_id))

record balance_of_response {
  request : balance_of_request;
  balance_ : nat;
} as ((request, balance))

getter balance_of (requests : list<balance_of_request>) : list<balance_of_response> {
  return map(requests, br -> {
    request = br;
    balance_ = (if ledger[br.btoken_id].lowner = br.bo_owner
                then 1
                else 0)
  })
}

entry token_metadata_registry (c : contract<address>) {
  transfer 0tz to entry c(selfaddress);
}
```

</TabItem>

<TabItem value="michelson">

The <Link to='/docs/contract/programming-language#micheslon'>Michelson</Link> code is generated with version 1.2.3 of Archetype.


```js
# (Pair { } (Pair { } { }))
{
  storage (pair (big_map %ledger nat address) (pair (set %operator (pair address (pair nat address))) (big_map %token_metadata nat (pair (nat %token_id) (pair (string %symbol) (pair (string %name) (pair (nat %decimals) (map %extras string string))))))));
  parameter (or (or (pair %balance_of (list %requests (pair (address %owner) (nat %token_id))) (contract (list (pair (pair %request (address %owner) (nat %token_id)) (nat %balance))))) (list %update_operators (or (pair %add_operator (address %owner) (pair (address %operator) (nat %token_id))) (pair %remove_operator (address %owner) (pair (address %operator) (nat %token_id)))))) (or (list %transfer (pair (address %from_) (list %txs (pair (address %to_) (pair (nat %token_id) (nat %amount)))))) (contract %token_metadata_registry address)));
  code { NIL operation;
         DIG 1;
         UNPAIR;
         DIP { UNPAIR 3 };
         IF_LEFT
           { IF_LEFT
               { UNPAIR;
                 DUP 6;
                 DUP 3;
                 AMOUNT;
                 DUP 4;
                 MAP { DUP;
                       CAR;
                       DUP 8;
                       DUP 3;
                       CDR;
                       GET;
                       IF_NONE
                         { PUSH string "ledger";
                           PUSH string "AssetNotFound";
                           PAIR;
                           FAILWITH }
                         {  };
                       COMPARE;
                       EQ;
                       IF
                         { PUSH nat 1 }
                         { PUSH nat 0 };
                       DUP 2;
                       PAIR;
                       SWAP;
                       DROP };
                 TRANSFER_TOKENS;
                 CONS;
                 DIP { DIG 5; DROP };
                 DUG 5;
                 DROP 2;
                 PAIR 3;
                 DIG 1;
                 PAIR }
               { DUP;
                 ITER { DUP;
                        IF_LEFT
                          { SENDER;
                            DUP 5;
                            DUP 3;
                            CDR;
                            CDR;
                            GET;
                            IF_NONE
                              { PUSH string "ledger";
                                PUSH string "AssetNotFound";
                                PAIR;
                                FAILWITH }
                              {  };
                            COMPARE;
                            EQ;
                            NOT;
                            IF
                              { PUSH string "CALLER NOT OWNER";
                                FAILWITH }
                              {  };
                            DUP 5;
                            DUP 2;
                            CAR;
                            DUP 3;
                            CDR;
                            CDR;
                            PAIR;
                            DUP 3;
                            CDR;
                            CAR;
                            PAIR;
                            MEM;
                            IF
                              { PUSH string "operator";
                                PUSH string "KeyExists";
                                PAIR;
                                FAILWITH }
                              { DUP 5;
                                PUSH bool True;
                                DUP 3;
                                CAR;
                                DUP 4;
                                CDR;
                                CDR;
                                PAIR;
                                DUP 4;
                                CDR;
                                CAR;
                                PAIR;
                                UPDATE;
                                DIP { DIG 4; DROP };
                                DUG 4 };
                            DROP }
                          { SENDER;
                            DUP 5;
                            DUP 3;
                            CDR;
                            CDR;
                            GET;
                            IF_NONE
                              { PUSH string "ledger";
                                PUSH string "AssetNotFound";
                                PAIR;
                                FAILWITH }
                              {  };
                            COMPARE;
                            EQ;
                            NOT;
                            IF
                              { PUSH string "CALLER NOT OWNER";
                                FAILWITH }
                              {  };
                            DUP 5;
                            PUSH bool False;
                            DUP 3;
                            CAR;
                            DUP 4;
                            CDR;
                            CDR;
                            PAIR;
                            DUP 4;
                            CDR;
                            CAR;
                            PAIR;
                            UPDATE;
                            DIP { DIG 4; DROP };
                            DUG 4;
                            DROP };
                        DROP };
                 DROP;
                 PAIR 3;
                 DIG 1;
                 PAIR } }
           { IF_LEFT
               { DUP;
                 ITER { DUP;
                        CDR;
                        ITER { DUP 2;
                               CAR;
                               SENDER;
                               COMPARE;
                               NEQ;
                               IF
                                 { DUP 5;
                                   DUP 3;
                                   CAR;
                                   DUP 3;
                                   CDR;
                                   CAR;
                                   PAIR;
                                   SENDER;
                                   PAIR;
                                   MEM;
                                   NOT;
                                   IF
                                     { PUSH string "FA2_NOT_OPERATOR";
                                       FAILWITH }
                                     {  } }
                                 {  };
                               DUP 4;
                               DUP 2;
                               CDR;
                               CAR;
                               MEM;
                               IF
                                 { DUP 4;
                                   DUP 2;
                                   CAR;
                                   SOME;
                                   DUP 3;
                                   CDR;
                                   CAR;
                                   UPDATE;
                                   DIP { DIG 3; DROP };
                                   DUG 3 }
                                 { DUP 4;
                                   DUP 2;
                                   CDR;
                                   CAR;
                                   MEM;
                                   IF
                                     { PUSH string "ledger";
                                       PUSH string "KeyExists";
                                       PAIR;
                                       FAILWITH }
                                     { DUP 4;
                                       DUP 2;
                                       CAR;
                                       SOME;
                                       DUP 3;
                                       CDR;
                                       CAR;
                                       UPDATE;
                                       DIP { DIG 3; DROP };
                                       DUG 3 } };
                               DROP };
                        DROP };
                 DROP;
                 PAIR 3;
                 DIG 1;
                 PAIR }
               { DUP 5;
                 DUP 2;
                 PUSH mutez 0;
                 SELF_ADDRESS;
                 TRANSFER_TOKENS;
                 CONS;
                 DIP { DIG 4; DROP };
                 DUG 4;
                 DROP;
                 PAIR 3;
                 DIG 1;
                 PAIR } } };
}
```

</TabItem>

</Tabs>
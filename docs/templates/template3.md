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

It is a simple implementation of the FA 2 norm, to buy and sell NFTs at fixed price. It could easily be enhanced with a bid-based process for ownership transfer.

You can observe the contract in action in the <Link to='/docs/dapp-nonfungible/'>Collectible cards</Link> DApp example.

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

On top of the one specified by the FA 2 norm, this contract provides 2 extra entrypoints on top: `buy` and `sell`.

These 2 entrypoints make the contract itself be the NFT operator: `sell` declares the contract as the token operator, and `buy` asks the contract to transfer the required token(s) to the *caller*.

| Name | Parameters | Description  |
| -- | -- | -- |
| `update_operators` | `upl` | `upl` is a list of delegation data (named `operator_param` with token, owner and operator), either to add or remove an operator to a token and owner. It fails if the *caller* is not the declared owner in `upl`.  |
| `transfer` | `txs` | Transfers token ownerships specified in `txs`, a list of `transfer_param` (from, to, token). If *caller* is not the token owner, it must be declared in `operator` to be able to transfer, otherwise it fails. |
| `balance_of` | `requests` | Returns the list a token balance for each token id in `requests`. |
| `buy` | `tokenids` | Internall calls `transfer` to transfer ownership of `tokenids` tokens to *caller*. Token price is transferred to token owner. It fails if a token is not up for sale, that is if a token has not been delegated to the contract by `sell`. It also fails if the transferred amount does not exceed the sum of purchased tokens. |
| `sell` | `tokenid` | Declares the contract as the operator of the token `tokenid`; it internally calls the `update_operators` with `selfaddress` as operator address. As a result, the token `tokenid` is up for sale (transfer). |

## Code

Deploy the contract from <a href='https://archetype-lang.org/'>Archetype</a> code below with the following <Link to='/docs/cli'>Completium CLI</Link> example command:

```
completium-cli deploy nft.arl
```

In order to initialise the `token` and `ledger` collections, edit the code below with `initialized by` instructions; for example:

```archetype {4-14}
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
}
```

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
  ]}>

<TabItem value="archetype">

```archetype
archetype nft

(* STORAGE --------------------------------------------------------------------*)

asset token {
  tid        : nat;
  tprice     : tez;
}

asset ledger identified by ltoken {
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

(* FA2 INTERFACE -------------------------------------------------------------*)

record operator_param {
  opp_owner    : address;
  opp_operator : address;
  opp_token_id : nat
} as ((owner, (operator, token_id)))

entry update_operators (upl : list<or<operator_param, operator_param>>) {
  for up in upl do
    match up with
    | left(param)  -> (* add *)
      dorequire(ledger[param.opp_token_id].lowner = source, "CALLER NOT OWNER");
      operator.addupdate((param.opp_operator, param.opp_token_id, param.opp_owner), {})
    | right(param) -> (* remove *)
      dorequire(ledger[param.opp_token_id].lowner = source, "CALLER NOT OWNER");
      operator.remove((param.opp_operator, param.opp_token_id, param.opp_owner))
    end;
  done;
}

record transfer_destination {
  to_dest           : address;
  token_id_dest     : nat;
  token_amount_dest : nat
} as ((to_, (token_id, amount)))

entry %transfer (txs : list<address * list<transfer_destination>>) {
  for tx in txs do
    var %from = tx[0];
    var tds = tx[1];
    for td in tds do begin
      if caller <> %from then begin
        (* check operator *)
        dorequire(operator.contains((caller,td.token_id_dest,%from)),"FA2_NOT_OPERATOR");
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

(* TOKEN EXCHANGE INTERFACE ---------------------------------------------------*)

entry buy (tokenids : list<nat>) {
  var total = 0;
  for tokenid in tokenids do begin
    var price = token[tokenid].tprice;
    var owner = ledger[tokenid].lowner;
    transfer price to owner;
    (* transfer ownership *)
    transfer 0tz to entry self.%transfer([(owner,[{
      to_dest = caller;
      token_id_dest = tokenid;
      token_amount_dest = 1
    }])]);
    (* reset permission *)
    transfer 0tz to entry self.update_operators([right<operator_param>({
        opp_owner = owner;
        opp_operator = selfaddress;
        opp_token_id = tokenid
      })]);
    total += price;
  end done;
  dorequire(transferred >= total, "INSUFFICIENT_TRANSFERRED");
  operations := reverse(operations);
}

entry sell (tokenid : nat) {
  transfer 0tz to entry self.update_operators([left<operator_param>({
    opp_owner = caller;
    opp_operator = selfaddress;
    opp_token_id = tokenid
  })])
}
```

</TabItem>

<TabItem value="michelson">

```js

```

</TabItem>

</Tabs>
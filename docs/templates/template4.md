---
id: template4
title: DEX
sidebar_label: DEX
slug: /templates/dex
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `admin` | `address` | Address that can register and unregister tokens in the DEX. |
| `token` | `collection` | Token data: <ul><li>token identifier (key)</li><li>FA 1.2 contract address</li><li>token name</li><li>XTZ value in pool</li><li>total number of tokens in pool</li><li>total number of liquidity tokens</li></ul>|
|  `liquidity` | `collection` | Number of liquidity tokens per owner and token: <ul><li>token id (key)</li><li>owner (key)</li><li>number of liquidity tokens</li></ul>|

### Entrypoints

| Name | Parameters | |
| -- | -- | -- |
| `registertoken` |  `i`, `a`, `n` | Admin adds token `{ i; a; n; 0; 0; 0 }` to DEX. |
| `deletetoken` | `i` | Admin removes token `i` from DEX. |
| `exchange` | `tA`, `aA`, `tB`, `aB` |  *Caller* exchanges `aA` tokens `tA` for `bB` tokens `tB`. |
| `addLiquidity` | `tL`, `qL` | *Caller* sends XTZ and `destqty` of `dst` tokens so that the value of *transferred* (just approved so far) dst tokens is equal to the value of transferred XTZ.<p/>LQT tokens are minted so that it reflects the proportion of the *transferred* value towards the pool. |
| `removeLiquidity` | `qL`, `tA` | *Caller* redeems its LTQ tokens; 2 transactions are generated : <ul><li>transfer of XTZ in proportion of the token pool</li><li>transfer of src tokens in proportion of the token pool</li></ul> |


## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
  ]}>

<TabItem value="archetype">

```archetype
archetype dex(admin : address, const initialminted)

constant gamma   : rational = 1 - 0.003
constant epsilon : nat      = 1

asset token {
  id        : string ;
  addr      : address;
  name      : string ;
  poolvalue : nat = 0;
  totalqty  : nat = 0;
  totallqt  : nat = 0;
}

asset liquidity identified by tokenid owner {
  tokenid  : string ;
  owner    : address;
  lqt      : nat = 0;
}

entry registertoken (i : string, a : address, n : string) {
  called by admin
  effect {
    token.addupdate(i, { addr = a; name = n }); }
}

entry deletetoken (i : string) {
  called by admin
  effect { token.remove(i) }
}

function compute_exchanged(aA : nat, qA : nat, qB : nat) : rational {
  return (qB * gamma * aA / (qA + gamma * aA))
}

entry exchange(tA : string, aA: nat, tB : string, aB : nat) {
  require {
    r0 otherwise "SRC_EQ_DST" : tA <> tB;
  }
  effect {
    if tA = "XTZ" then begin
      var qA = token[tB].poolvalue;
      var qB = token[tB].totalqty;
      var expectedB = compute_exchanged(aA,qA,qB);
      if (abs(expectedB - aB) > epsilon) then fail(("INVALID_B_AMOUNT", expectedB));
      var xtzin : nat = transferred;
      if aA <> xtzin then fail(("INVALID_A_AMOUNT", xtzin));
      match entrypoint<(address * address * nat)>("%transfer",token[tB].addr) with
      | some(transferB) ->
        transfer 0tz to entry transferB((selfaddress, caller, aB))
      | none -> fail("INVALID_B_ENTRY")
      end;
      token.update(tB, { poolvalue += xtzin; totalqty -= aB });
    end else if tB = "XTZ" then begin
      var qA = token[tA].totalqty;
      var qB = token[tA].poolvalue;
      var expectedB = compute_exchanged(aA,qA,qB);
      if (abs(expectedB - aB) > epsilon) then fail(("INVALID_B_AMOUNT", expectedB));
      match entrypoint<(address * address * nat)>("%transfer", token[tA].addr) with
      | some(transferA) ->
        transfer 0tz to entry transferA((caller, selfaddress, aA))
      | none -> fail("INVALID_A_ENTRY")
      end;
      transfer (aB * 1utz) to caller;
      token.update(tA, { poolvalue -= aB; totalqty += aA });
    end else begin
      var qA  = token[tA].totalqty;
      var qTA = token[tA].poolvalue;
      var aT  = abs(floor(compute_exchanged(aA, qA, qTA)));
      var qTB = token[tB].poolvalue;
      var qB  = token[tB].totalqty;
      var expectedB = compute_exchanged(aT, qTB, qB);
      if (abs(expectedB - aB) > epsilon) then fail(("INVALID_B_AMOUNT",expectedB));
      match entrypoint<(address * address * nat)>("%transfer", token[tA].addr) with
      | some(transferA) ->
        transfer 0tz to entry transferA((caller, selfaddress, aA))
      | none -> fail("INVALID_A_ENTRY")
      end;
      match entrypoint<(address * address * nat)>("%transfer", token[tB].addr) with
      | some(transferA) ->
        transfer 0tz to entry transferA((selfaddress, caller, aB))
      | none -> fail("INVALID_B_ENTRY")
      end;
      token.update(tA, { poolvalue -= aT; totalqty += aA });
      token.update(tB, { poolvalue += aT; totalqty -= aB });
    end
  }
}

entry addLiquidity(tL : string, qL : nat) {
  match entrypoint<(address * address * nat)>("%transfer", token[tL].addr) with
   | some(transfer_src) ->
    transfer 0tz to entry transfer_src((caller, selfaddress, qL))
   | none -> fail("INVALID_DST_ENTRY")
  end;
  var xtzin : nat = transferred;
  var mintedLTQ =
    if token[tL].poolvalue = 0 then initialminted
    else abs(floor(token[tL].totallqt * xtzin / token[tL].poolvalue));
  liquidity.addupdate((tL, caller), { lqt += mintedLTQ });
  token.update(tL, { poolvalue += xtzin; totalqty += qL; totallqt += mintedLTQ })
}

entry removeLiquidity(qL : nat, tA : string) {
  require {
    r1 otherwise "NOT_ENOUGHT_LQT": qL <= liquidity[(tA, caller)].lqt
  }
  effect {
    var lqtratio = qL / token[tA].totallqt;
    var xtzout = abs(floor(lqtratio * token[tA].poolvalue));
    transfer (xtzout * 1utz) to caller;
    match entrypoint<(address * address * nat)>("%transfer",token[tA].addr) with
    | some(transfer_src) ->
      var qty = abs(floor(lqtratio * token[tA].totalqty));
      transfer 0tz to entry transfer_src((selfaddress, caller, qty));
      liquidity.addupdate((tA, caller), { lqt -= qL });
      token.update(tA, { poolvalue -= xtzout; totalqty -= qty; totallqt -= qL })
    | none -> fail("INVALID_DST_ENTRY")
    end;
  }

}
```

</TabItem>

<TabItem value="michelson">

```js

```

</TabItem>

</Tabs>
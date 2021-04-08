---
id: template4
title: DEX
sidebar_label: DEX
slug: /templates/dex
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MathJax from 'react-mathjax';

## Introduction

This Decentralized Exchange (DEX) presented here is based on the Uniswap-like exchange presented in this <a href='https://web.stanford.edu/~guillean/papers/uniswap_analysis.pdf' target='_blank'>paper</a>. The principle is the one of automated market maker (AMM), that is that the exchange rate from token A to token B is computed automatically.

To exchange *qA* tokens A against *qB* tokens B, the DEX establishes a pool of tokens A and a pool of tokens B, from which tokens are withdrawn or credited; if *pA* and *pB* are the numbers of tokens A and B in the pools, then the quantity *qB* of token B received in exchange of a quantity *qA* of token A is given by the following formula:

<MathJax.Provider>
<MathJax.Node formula={`qB = pB * \\frac{(1-f)*qA}{pA+(1-f)*qA}`} />
</MathJax.Provider>

This principle is explained in more detailed in the <Link to='/docs/dapp-dex'>DEX DApp</Link> example.

## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `admin` | `address` | Address that can register and unregister tokens in the DEX. |
| `token` | `collection` | Token data: <ul><li>token identifier (key)</li><li>FA 1.2 contract address</li><li>token name</li><li>XTZ value in pool</li><li>number of tokens in pool</li><li>number of liquidity tokens</li></ul>|
|  `liquidity` | `collection` | Number of liquidity tokens per owner and token: <ul><li>token id (key)</li><li>owner (key)</li><li>number of liquidity tokens</li></ul>|

### Entrypoints

| Name | Parameters | |
| -- | -- | -- |
| `registertoken` |  `i`, `a`, `n` | Admin adds token `{ i; a; n; 0; 0; 0 }` to DEX. |
| `deletetoken` | `i` | Admin removes token `i` from DEX. |
| `exchange` | `tA`, `qA`, `tB`, `qB` |  *Caller* exchanges `qA` tokens `tA` for `qB` tokens `tB`. |
| `addLiquidity` | `tA`, `qA` | *Caller* provides `qA` tokens `tA` and the corresponding amount of XTZ is transferred.<p/>Liquidity tokens are minted and affected to  *caller* so that it reflects the proportion of *transferred* XTZ towards the XTZ pool. |
| `removeLiquidity` | `tA`, `qL` | *Caller* redeems `qL` liquidity token for token `tA`; 2 transactions are generated : <ul><li>transfer of XTZ in proportion of the token XTZ pool</li><li>transfer of `tA` tokens in proportion of the token pool</li></ul> |

## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
  ]}>

<TabItem value="archetype">

```archetype
archetype dex(admin : address, initialminted : nat)

constant fee     : rational = 0.003
constant epsilon : nat      = 1

asset token {
  id        : string ;
  addr      : address;
  name      : string ;
  xtzpool   : nat = 0;
  tokpool   : nat = 0;
  liqpool   : nat = 0;
}

asset liquidity identified by tokenid owner {
  tokenid  : string ;
  owner    : address;
  liqt     : nat = 0;
}

entry registertoken (i : string, a : address, n : string) {
  called by admin
  effect { token.addupdate(i, { addr = a; name = n }); }
}

entry deletetoken (i : string) {
  called by admin
  effect { token.remove(i) }
}

function compute_qB(qA : nat, pA : nat, pB : nat) : rational {
  var feeqA = (1 - fee) * qA;
  return (pB * feeqA / (pA + feeqA))
}

entry exchange(tA : string, qA : nat, tB : string, qB : nat) {
  require {
    r0 otherwise "SRC_EQ_DST" : tA <> tB;
  }
  effect {
    (* DEX receives *)
    if tA = "XTZ" then begin
      var pA = token[tB].xtzpool;
      var pB = token[tB].tokpool;
      var expected_qB = compute_qB(qA, pA, pB);
      dorequire(abs(expected_qB - qB) <= epsilon, ("INVALID_B_AMOUNT", expected_qB));
      var xtzin : nat = transferred;
      dorequire(qA = xtzin, ("INVALID_A_AMOUNT", xtzin));
      match entrypoint<(address * address * nat)>("%transfer", token[tB].addr) with
      | some(transferB) ->
        transfer 0tz to entry transferB((selfaddress, caller, qB))
      | none -> fail("INVALID_B_ENTRY")
      end;
      token.update(tB, { xtzpool += xtzin; tokpool -= qB });
    end else if tB = "XTZ" then begin
      var pA = token[tA].tokpool;
      var pB = token[tA].xtzpool;
      var expected_qB = compute_qB(qA, pA, pB);
      dorequire(abs(expected_qB - qB) <= epsilon, ("INVALID_B_AMOUNT", expected_qB));
      match entrypoint<(address * address * nat)>("%transfer", token[tA].addr) with
      | some(transferA) ->
        transfer 0tz to entry transferA((caller, selfaddress, qA))
      | none -> fail("INVALID_A_ENTRY")
      end;
      transfer (qB * 1utz) to caller;
      token.update(tA, { xtzpool -= qB; tokpool += qA });
    end else begin
      var pA      = token[tA].tokpool;
      var pXTZA   = token[tA].xtzpool;
      var qXTZ    = abs(floor(compute_qB(qA, pA, pXTZA)));
      var pXTZB   = token[tB].xtzpool;
      var pB      = token[tB].tokpool;
      var expected_qB = compute_qB(qXTZ, pXTZB, pB);
      dorequire(abs(expected_qB - qB) <= epsilon, ("INVALID_B_AMOUNT", expected_qB));
      match entrypoint<(address * address * nat)>("%transfer", token[tA].addr) with
      | some(transferA) ->
        transfer 0tz to entry transferA((caller, selfaddress, qA))
      | none -> fail("INVALID_A_ENTRY")
      end;
      match entrypoint<(address * address * nat)>("%transfer", token[tB].addr) with
      | some(transferB) ->
        transfer 0tz to entry transferB((selfaddress, caller, qB))
      | none -> fail("INVALID_B_ENTRY")
      end;
      token.update(tA, { xtzpool -= qXTZ; tokpool += qA });
      token.update(tB, { xtzpool += qXTZ; tokpool -= qB });
    end
  }
}

entry addLiquidity(tA : string, qA : nat) {
  (* transfer qA tokens tA to dex contract *)
  match entrypoint<(address * address * nat)>("%transfer", token[tA].addr) with
   | some(transfer_src) ->
    transfer 0tz to entry transfer_src((caller, selfaddress, qA))
   | none -> fail("INVALID_DST_ENTRY")
  end;
  var xtzin : nat = transferred;
  (* does qA tokens exchange for xtzin XTZ ? *)
  var pA = token[tA].tokpool;
  var pB = token[tA].xtzpool;
  var expected_qB = compute_qB(qA, pA, pB);
  dorequire(abs(expected_qB - xtzin) <= epsilon, ("INVALID_B_AMOUNT", expected_qB));
  var mintedLiqT =
    if token[tA].tokpool = 0 then initialminted
    else abs(floor(token[tA].liqpool * xtzin / token[tA].xtzpool));
  liquidity.addupdate((tA, caller), { liqt += mintedLiqT });
  token.update(tA, { xtzpool += xtzin; tokpool += qA; liqpool += mintedLiqT })
}

entry removeLiquidity(tA : string, qL : nat) {
  require {
    r1 otherwise "NOT_ENOUGHT_LQT": qL <= liquidity[(tA, caller)].liqt
  }
  effect {
    var liqratio = qL / token[tA].liqpool;
    var xtzout = abs(floor(liqratio * token[tA].xtzpool));
    transfer (xtzout * 1utz) to caller;
    match entrypoint<(address * address * nat)>("%transfer", token[tA].addr) with
    | some(transfer_src) ->
      var qA = abs(floor(liqratio * token[tA].tokpool));
      transfer 0tz to entry transfer_src((selfaddress, caller, qA));
      liquidity.addupdate((tA, caller), { liqt -= qL });
      token.update(tA, { xtzpool -= xtzout; tokpool -= qA; liqpool -= qL })
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
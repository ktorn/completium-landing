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

This principle is explained in more details in the <Link to='/docs/dapp-dex'>DEX DApp</Link> example.

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

```archetype title="dex.arl"
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
  failif { f1: i = "XTZ" }
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
      transfer 0tz to token[tB].addr
        call %transfer<address * address * nat>((selfaddress, caller, qB));
      token.update(tB, { xtzpool += xtzin; tokpool -= qB });
    end else if tB = "XTZ" then begin
      var pA = token[tA].tokpool;
      var pB = token[tA].xtzpool;
      var expected_qB = compute_qB(qA, pA, pB);
      dorequire(abs(expected_qB - qB) <= epsilon, ("INVALID_B_AMOUNT", expected_qB));
      transfer 0tz to token[tA].addr
        call %transfer<address * address * nat>((caller, selfaddress, qA));
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
      transfer 0tz to token[tA].addr
        call %transfer<address * address * nat>((caller, selfaddress, qA));
      transfer 0tz to token[tB].addr
        call %transfer<address * address * nat>((selfaddress, caller, qB));
      token.update(tA, { xtzpool -= qXTZ; tokpool += qA });
      token.update(tB, { xtzpool += qXTZ; tokpool -= qB });
    end
  }
}

entry addLiquidity(tA : string, qA : nat) {
  (* transfer qA tokens tA to dex contract *)
  transfer 0tz to token[tA].addr
    call %transfer<address * address * nat>((caller, selfaddress, qA));
  var xtzin : nat = transferred;
  (* does qA tokens exchange for xtzin XTZ ? *)
  var pA = token[tA].tokpool;
  var pB = token[tA].xtzpool;
  var expected_qB = compute_qB(qA, pA, pB);
  dorequire(abs(expected_qB - xtzin) <= epsilon, ("INVALID_B_AMOUNT", expected_qB));
  var mintedLiqT =
    if token[tA].tokpool = 0
    then initialminted
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
    var qA = abs(floor(liqratio * token[tA].tokpool));
    transfer 0tz to token[tA].addr
      call %transfer<address * address * nat>((selfaddress, caller, qA));
    liquidity.addupdate((tA, caller), { liqt -= qL });
    token.update(tA, { xtzpool -= xtzout; tokpool -= qA; liqpool -= qL })
  }
}
```

</TabItem>

<TabItem value="michelson">

```js
# (Pair admin (Pair initialminted (Pair {  } {  })))
{
  storage (pair (address %admin) (pair (nat %initialminted) (pair (map %token string (pair (address %addr) (pair (string %name) (pair (nat %xtzpool) (pair (nat %tokpool) (nat %liqpool)))))) (map %liquidity (pair string address) nat))));
  parameter (or (pair %registertoken (string %i) (pair (address %a) (string %n))) (or (string %deletetoken) (or (pair %exchange (string %tA) (pair (nat %qA) (pair (string %tB) (nat %qB)))) (or (pair %addLiquidity (string %tA) (nat %qA)) (pair %removeLiquidity (string %tA) (nat %qL))))));
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
         LAMBDA
           (pair (pair int nat) (pair nat (pair nat nat)))
           (pair int nat)
           { UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             PUSH unit Unit;
             PUSH nat 1;
             DIG 4;
             DUP;
             DUG 5;
             INT;
             PAIR;
             UNIT;
             RIGHT unit;
             PUSH nat 1000;
             PUSH int 3;
             PAIR;
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
             DIP { UNPAIR };
             UNPAIR;
             DIP { SWAP };
             MUL;
             DIP { MUL };
             PAIR;
             UNIT;
             LEFT unit;
             DIG 1;
             DUP;
             DUG 2;
             PUSH nat 1;
             DIG 6;
             DUP;
             DUG 7;
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
             DIG 1;
             DUP;
             DUG 2;
             PUSH nat 1;
             DIG 5;
             DUP;
             DUG 6;
             INT;
             PAIR;
             PAIR;
             UNPAIR;
             DIP { UNPAIR };
             UNPAIR;
             DIP { SWAP };
             MUL;
             DIP { MUL };
             PAIR;
             PAIR;
             UNPAIR;
             DIP { UNPAIR };
             UNPAIR;
             DIG 3;
             PUSH int 0;
             DIG 4;
             DUP;
             DUG 5;
             COMPARE;
             GE;
             IF
               { INT }
               { NEG };
             MUL;
             DIP { MUL; ABS };
             PAIR;
             DIP { DIG 1; DROP };
             DUG 1;
             DROP;
             DUG 4;
             DROP 4 };
         NIL operation;
         DIG 3;
         UNPAIR;
         DIP { UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP };
         IF_LEFT
           { UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             DIG 6;
             DUP;
             DUG 7;
             SENDER;
             COMPARE;
             EQ;
             NOT;
             IF
               { PUSH string "InvalidCaller";
                 FAILWITH }
               {  };
             PUSH string "XTZ";
             DIG 3;
             DUP;
             DUG 4;
             COMPARE;
             EQ;
             IF
               { PUSH string "InvalidCondition: f1";
                 FAILWITH }
               {  };
             DIG 4;
             DUP;
             DUG 5;
             PUSH nat 0;
             PUSH nat 0;
             PAIR;
             PUSH nat 0;
             PAIR;
             DIG 2;
             DUP;
             DUG 3;
             PAIR;
             DIG 3;
             DUP;
             DUG 4;
             PAIR;
             SOME;
             DIG 4;
             DUP;
             DUG 5;
             UPDATE;
             DIP { DIG 4; DROP };
             DUG 4;
             DROP 3;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             DIG 1;
             PAIR }
           { IF_LEFT
               { DIG 4;
                 DUP;
                 DUG 5;
                 SENDER;
                 COMPARE;
                 EQ;
                 NOT;
                 IF
                   { PUSH string "InvalidCaller";
                     FAILWITH }
                   {  };
                 DIG 2;
                 DUP;
                 DUG 3;
                 NONE (pair address (pair string (pair nat (pair nat nat))));
                 DIG 2;
                 DUP;
                 DUG 3;
                 UPDATE;
                 DIP { DIG 2; DROP };
                 DUG 2;
                 DROP;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 DIG 1;
                 PAIR }
               { IF_LEFT
                   { UNPAIR;
                     SWAP;
                     UNPAIR;
                     SWAP;
                     UNPAIR;
                     SWAP;
                     DIG 1;
                     DUP;
                     DUG 2;
                     DIG 4;
                     DUP;
                     DUG 5;
                     COMPARE;
                     NEQ;
                     NOT;
                     IF
                       { PUSH string "SRC_EQ_DST";
                         FAILWITH }
                       {  };
                     PUSH string "XTZ";
                     DIG 4;
                     DUP;
                     DUG 5;
                     COMPARE;
                     EQ;
                     IF
                       { DIG 5;
                         DUP;
                         DUG 6;
                         DIG 2;
                         DUP;
                         DUG 3;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CDR;
                         CDR;
                         CAR;
                         DIG 6;
                         DUP;
                         DUG 7;
                         DIG 3;
                         DUP;
                         DUG 4;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CDR;
                         CDR;
                         CDR;
                         CAR;
                         DIG 11;
                         DUP;
                         DUG 12;
                         DIG 1;
                         DUP;
                         DUG 2;
                         DIG 3;
                         DUP;
                         DUG 4;
                         PAIR;
                         DIG 6;
                         DUP;
                         DUG 7;
                         PAIR;
                         PUSH nat 1000;
                         PUSH int 3;
                         PAIR;
                         PAIR;
                         EXEC;
                         DIG 13;
                         DUP;
                         DUG 14;
                         UNIT;
                         RIGHT unit;
                         LEFT (or unit unit);
                         RIGHT unit;
                         PUSH nat 1;
                         PUSH nat 1;
                         INT;
                         PAIR;
                         UNIT;
                         RIGHT unit;
                         PUSH nat 1;
                         DIG 8;
                         DUP;
                         DUG 9;
                         INT;
                         PAIR;
                         DIG 5;
                         DUP;
                         DUG 6;
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
                         UNPAIR;
                         ABS;
                         INT;
                         PAIR;
                         PAIR;
                         PAIR;
                         EXEC;
                         NOT;
                         IF
                           { DUP;
                             PUSH string "INVALID_B_AMOUNT";
                             PAIR;
                             FAILWITH }
                           {  };
                         PUSH mutez 1;
                         AMOUNT;
                         EDIV;
                         IF_NONE
                           { PUSH string "DivByZero";
                             FAILWITH }
                           { DUP;
                             CAR;
                             SWAP;
                             DROP };
                         DUP;
                         DIG 7;
                         DUP;
                         DUG 8;
                         COMPARE;
                         EQ;
                         NOT;
                         IF
                           { DUP;
                             PUSH string "INVALID_A_AMOUNT";
                             PAIR;
                             FAILWITH }
                           {  };
                         DIG 12;
                         DUP;
                         DUG 13;
                         DIG 10;
                         DUP;
                         DUG 11;
                         DIG 7;
                         DUP;
                         DUG 8;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CAR;
                         CONTRACT %transfer (pair address (pair address nat));
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         PUSH mutez 0;
                         DIG 7;
                         DUP;
                         DUG 8;
                         SENDER;
                         PAIR;
                         SELF;
                         ADDRESS;
                         PAIR;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 12; DROP };
                         DUG 12;
                         DIG 9;
                         DUP;
                         DUG 10;
                         DIG 6;
                         DUP;
                         DUG 7;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         DIG 10;
                         DUP;
                         DUG 11;
                         DIG 11;
                         DUP;
                         DUG 12;
                         DIG 8;
                         DUP;
                         DUG 9;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         UNPAIR;
                         SWAP;
                         UNPAIR;
                         SWAP;
                         UNPAIR;
                         DROP;
                         DIG 5;
                         DUP;
                         DUG 6;
                         DIG 5;
                         DUP;
                         DUG 6;
                         CDR;
                         CDR;
                         CAR;
                         ADD;
                         SWAP;
                         UNPAIR;
                         DROP;
                         PUSH int 0;
                         DIG 11;
                         DUP;
                         DUG 12;
                         INT;
                         DIG 7;
                         DUP;
                         DUG 8;
                         CDR;
                         CDR;
                         CDR;
                         CAR;
                         SUB;
                         COMPARE;
                         GE;
                         IF
                           { DIG 10;
                             DUP;
                             DUG 11;
                             INT;
                             DIG 6;
                             DUP;
                             DUG 7;
                             CDR;
                             CDR;
                             CDR;
                             CAR;
                             SUB;
                             ABS }
                           { PUSH string "AssignNat";
                             FAILWITH };
                         PAIR;
                         SWAP;
                         PAIR;
                         SWAP;
                         PAIR;
                         SWAP;
                         PAIR;
                         SOME;
                         DIG 8;
                         DUP;
                         DUG 9;
                         UPDATE;
                         DIP { DIG 10; DROP };
                         DUG 10;
                         DROP 5 }
                       { PUSH string "XTZ";
                         DIG 2;
                         DUP;
                         DUG 3;
                         COMPARE;
                         EQ;
                         IF
                           { DIG 5;
                             DUP;
                             DUG 6;
                             DIG 4;
                             DUP;
                             DUG 5;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             CDR;
                             CDR;
                             CDR;
                             CAR;
                             DIG 6;
                             DUP;
                             DUG 7;
                             DIG 5;
                             DUP;
                             DUG 6;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             CDR;
                             CDR;
                             CAR;
                             DIG 11;
                             DUP;
                             DUG 12;
                             DIG 1;
                             DUP;
                             DUG 2;
                             DIG 3;
                             DUP;
                             DUG 4;
                             PAIR;
                             DIG 6;
                             DUP;
                             DUG 7;
                             PAIR;
                             PUSH nat 1000;
                             PUSH int 3;
                             PAIR;
                             PAIR;
                             EXEC;
                             DIG 13;
                             DUP;
                             DUG 14;
                             UNIT;
                             RIGHT unit;
                             LEFT (or unit unit);
                             RIGHT unit;
                             PUSH nat 1;
                             PUSH nat 1;
                             INT;
                             PAIR;
                             UNIT;
                             RIGHT unit;
                             PUSH nat 1;
                             DIG 8;
                             DUP;
                             DUG 9;
                             INT;
                             PAIR;
                             DIG 5;
                             DUP;
                             DUG 6;
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
                             UNPAIR;
                             ABS;
                             INT;
                             PAIR;
                             PAIR;
                             PAIR;
                             EXEC;
                             NOT;
                             IF
                               { DUP;
                                 PUSH string "INVALID_B_AMOUNT";
                                 PAIR;
                                 FAILWITH }
                               {  };
                             DIG 11;
                             DUP;
                             DUG 12;
                             DIG 9;
                             DUP;
                             DUG 10;
                             DIG 8;
                             DUP;
                             DUG 9;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             CAR;
                             CONTRACT %transfer (pair address (pair address nat));
                             IF_NONE
                               { PUSH string "BadContract";
                                 FAILWITH }
                               {  };
                             PUSH mutez 0;
                             DIG 8;
                             DUP;
                             DUG 9;
                             SELF;
                             ADDRESS;
                             PAIR;
                             SENDER;
                             PAIR;
                             TRANSFER_TOKENS;
                             CONS;
                             DIP { DIG 11; DROP };
                             DUG 11;
                             DIG 11;
                             DUP;
                             DUG 12;
                             SENDER;
                             CONTRACT unit;
                             IF_NONE
                               { PUSH string "BadContract";
                                 FAILWITH }
                               {  };
                             PUSH mutez 1;
                             PUSH nat 1;
                             DIG 7;
                             DUP;
                             DUG 8;
                             INT;
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
                             DIP { DIG 11; DROP };
                             DUG 11;
                             DIG 8;
                             DUP;
                             DUG 9;
                             DIG 7;
                             DUP;
                             DUG 8;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             DIG 9;
                             DUP;
                             DUG 10;
                             DIG 10;
                             DUP;
                             DUG 11;
                             DIG 9;
                             DUP;
                             DUG 10;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             UNPAIR;
                             SWAP;
                             UNPAIR;
                             SWAP;
                             UNPAIR;
                             DROP;
                             PUSH int 0;
                             DIG 9;
                             DUP;
                             DUG 10;
                             INT;
                             DIG 6;
                             DUP;
                             DUG 7;
                             CDR;
                             CDR;
                             CAR;
                             SUB;
                             COMPARE;
                             GE;
                             IF
                               { DIG 8;
                                 DUP;
                                 DUG 9;
                                 INT;
                                 DIG 5;
                                 DUP;
                                 DUG 6;
                                 CDR;
                                 CDR;
                                 CAR;
                                 SUB;
                                 ABS }
                               { PUSH string "AssignNat";
                                 FAILWITH };
                             SWAP;
                             UNPAIR;
                             DROP;
                             DIG 11;
                             DUP;
                             DUG 12;
                             DIG 6;
                             DUP;
                             DUG 7;
                             CDR;
                             CDR;
                             CDR;
                             CAR;
                             ADD;
                             PAIR;
                             SWAP;
                             PAIR;
                             SWAP;
                             PAIR;
                             SWAP;
                             PAIR;
                             SOME;
                             DIG 9;
                             DUP;
                             DUG 10;
                             UPDATE;
                             DIP { DIG 9; DROP };
                             DUG 9;
                             DROP 4 }
                           { DIG 5;
                             DUP;
                             DUG 6;
                             DIG 4;
                             DUP;
                             DUG 5;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             CDR;
                             CDR;
                             CDR;
                             CAR;
                             DIG 6;
                             DUP;
                             DUG 7;
                             DIG 5;
                             DUP;
                             DUG 6;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             CDR;
                             CDR;
                             CAR;
                             DIG 11;
                             DUP;
                             DUG 12;
                             DIG 1;
                             DUP;
                             DUG 2;
                             DIG 3;
                             DUP;
                             DUG 4;
                             PAIR;
                             DIG 6;
                             DUP;
                             DUG 7;
                             PAIR;
                             PUSH nat 1000;
                             PUSH int 3;
                             PAIR;
                             PAIR;
                             EXEC;
                             UNPAIR;
                             EDIV;
                             IF_NONE
                               { PUSH string "DivByZero";
                                 FAILWITH }
                               { CAR };
                             ABS;
                             DIG 8;
                             DUP;
                             DUG 9;
                             DIG 5;
                             DUP;
                             DUG 6;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             CDR;
                             CDR;
                             CAR;
                             DIG 9;
                             DUP;
                             DUG 10;
                             DIG 6;
                             DUP;
                             DUG 7;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             CDR;
                             CDR;
                             CDR;
                             CAR;
                             DIG 14;
                             DUP;
                             DUG 15;
                             DIG 1;
                             DUP;
                             DUG 2;
                             DIG 3;
                             DUP;
                             DUG 4;
                             PAIR;
                             DIG 4;
                             DUP;
                             DUG 5;
                             PAIR;
                             PUSH nat 1000;
                             PUSH int 3;
                             PAIR;
                             PAIR;
                             EXEC;
                             DIG 16;
                             DUP;
                             DUG 17;
                             UNIT;
                             RIGHT unit;
                             LEFT (or unit unit);
                             RIGHT unit;
                             PUSH nat 1;
                             PUSH nat 1;
                             INT;
                             PAIR;
                             UNIT;
                             RIGHT unit;
                             PUSH nat 1;
                             DIG 11;
                             DUP;
                             DUG 12;
                             INT;
                             PAIR;
                             DIG 5;
                             DUP;
                             DUG 6;
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
                             UNPAIR;
                             ABS;
                             INT;
                             PAIR;
                             PAIR;
                             PAIR;
                             EXEC;
                             NOT;
                             IF
                               { DUP;
                                 PUSH string "INVALID_B_AMOUNT";
                                 PAIR;
                                 FAILWITH }
                               {  };
                             DIG 14;
                             DUP;
                             DUG 15;
                             DIG 12;
                             DUP;
                             DUG 13;
                             DIG 11;
                             DUP;
                             DUG 12;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             CAR;
                             CONTRACT %transfer (pair address (pair address nat));
                             IF_NONE
                               { PUSH string "BadContract";
                                 FAILWITH }
                               {  };
                             PUSH mutez 0;
                             DIG 11;
                             DUP;
                             DUG 12;
                             SELF;
                             ADDRESS;
                             PAIR;
                             SENDER;
                             PAIR;
                             TRANSFER_TOKENS;
                             CONS;
                             DIP { DIG 14; DROP };
                             DUG 14;
                             DIG 14;
                             DUP;
                             DUG 15;
                             DIG 12;
                             DUP;
                             DUG 13;
                             DIG 9;
                             DUP;
                             DUG 10;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             CAR;
                             CONTRACT %transfer (pair address (pair address nat));
                             IF_NONE
                               { PUSH string "BadContract";
                                 FAILWITH }
                               {  };
                             PUSH mutez 0;
                             DIG 9;
                             DUP;
                             DUG 10;
                             SENDER;
                             PAIR;
                             SELF;
                             ADDRESS;
                             PAIR;
                             TRANSFER_TOKENS;
                             CONS;
                             DIP { DIG 14; DROP };
                             DUG 14;
                             DIG 11;
                             DUP;
                             DUG 12;
                             DIG 10;
                             DUP;
                             DUG 11;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             DIG 12;
                             DUP;
                             DUG 13;
                             DIG 13;
                             DUP;
                             DUG 14;
                             DIG 12;
                             DUP;
                             DUG 13;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             UNPAIR;
                             SWAP;
                             UNPAIR;
                             SWAP;
                             UNPAIR;
                             DROP;
                             PUSH int 0;
                             DIG 9;
                             DUP;
                             DUG 10;
                             INT;
                             DIG 6;
                             DUP;
                             DUG 7;
                             CDR;
                             CDR;
                             CAR;
                             SUB;
                             COMPARE;
                             GE;
                             IF
                               { DIG 8;
                                 DUP;
                                 DUG 9;
                                 INT;
                                 DIG 5;
                                 DUP;
                                 DUG 6;
                                 CDR;
                                 CDR;
                                 CAR;
                                 SUB;
                                 ABS }
                               { PUSH string "AssignNat";
                                 FAILWITH };
                             SWAP;
                             UNPAIR;
                             DROP;
                             DIG 14;
                             DUP;
                             DUG 15;
                             DIG 6;
                             DUP;
                             DUG 7;
                             CDR;
                             CDR;
                             CDR;
                             CAR;
                             ADD;
                             PAIR;
                             SWAP;
                             PAIR;
                             SWAP;
                             PAIR;
                             SWAP;
                             PAIR;
                             SOME;
                             DIG 12;
                             DUP;
                             DUG 13;
                             UPDATE;
                             DIP { DIG 12; DROP };
                             DUG 12;
                             DROP;
                             DIG 11;
                             DUP;
                             DUG 12;
                             DIG 8;
                             DUP;
                             DUG 9;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             DIG 12;
                             DUP;
                             DUG 13;
                             DIG 13;
                             DUP;
                             DUG 14;
                             DIG 10;
                             DUP;
                             DUG 11;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             UNPAIR;
                             SWAP;
                             UNPAIR;
                             SWAP;
                             UNPAIR;
                             DROP;
                             DIG 8;
                             DUP;
                             DUG 9;
                             DIG 5;
                             DUP;
                             DUG 6;
                             CDR;
                             CDR;
                             CAR;
                             ADD;
                             SWAP;
                             UNPAIR;
                             DROP;
                             PUSH int 0;
                             DIG 13;
                             DUP;
                             DUG 14;
                             INT;
                             DIG 7;
                             DUP;
                             DUG 8;
                             CDR;
                             CDR;
                             CDR;
                             CAR;
                             SUB;
                             COMPARE;
                             GE;
                             IF
                               { DIG 12;
                                 DUP;
                                 DUG 13;
                                 INT;
                                 DIG 6;
                                 DUP;
                                 DUG 7;
                                 CDR;
                                 CDR;
                                 CDR;
                                 CAR;
                                 SUB;
                                 ABS }
                               { PUSH string "AssignNat";
                                 FAILWITH };
                             PAIR;
                             SWAP;
                             PAIR;
                             SWAP;
                             PAIR;
                             SWAP;
                             PAIR;
                             SOME;
                             DIG 10;
                             DUP;
                             DUG 11;
                             UPDATE;
                             DIP { DIG 12; DROP };
                             DUG 12;
                             DROP 7 } };
                     DROP 4;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     DIG 1;
                     PAIR }
                   { IF_LEFT
                       { UNPAIR;
                         SWAP;
                         DIG 6;
                         DUP;
                         DUG 7;
                         DIG 4;
                         DUP;
                         DUG 5;
                         DIG 3;
                         DUP;
                         DUG 4;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CAR;
                         CONTRACT %transfer (pair address (pair address nat));
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         PUSH mutez 0;
                         DIG 3;
                         DUP;
                         DUG 4;
                         SELF;
                         ADDRESS;
                         PAIR;
                         SENDER;
                         PAIR;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 6; DROP };
                         DUG 6;
                         PUSH mutez 1;
                         AMOUNT;
                         EDIV;
                         IF_NONE
                           { PUSH string "DivByZero";
                             FAILWITH }
                           { DUP;
                             CAR;
                             SWAP;
                             DROP };
                         DIG 4;
                         DUP;
                         DUG 5;
                         DIG 3;
                         DUP;
                         DUG 4;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CDR;
                         CDR;
                         CDR;
                         CAR;
                         DIG 5;
                         DUP;
                         DUG 6;
                         DIG 4;
                         DUP;
                         DUG 5;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CDR;
                         CDR;
                         CAR;
                         DIG 10;
                         DUP;
                         DUG 11;
                         DIG 1;
                         DUP;
                         DUG 2;
                         DIG 3;
                         DUP;
                         DUG 4;
                         PAIR;
                         DIG 5;
                         DUP;
                         DUG 6;
                         PAIR;
                         PUSH nat 1000;
                         PUSH int 3;
                         PAIR;
                         PAIR;
                         EXEC;
                         DIG 12;
                         DUP;
                         DUG 13;
                         UNIT;
                         RIGHT unit;
                         LEFT (or unit unit);
                         RIGHT unit;
                         PUSH nat 1;
                         PUSH nat 1;
                         INT;
                         PAIR;
                         UNIT;
                         RIGHT unit;
                         PUSH nat 1;
                         DIG 8;
                         DUP;
                         DUG 9;
                         INT;
                         PAIR;
                         DIG 5;
                         DUP;
                         DUG 6;
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
                         UNPAIR;
                         ABS;
                         INT;
                         PAIR;
                         PAIR;
                         PAIR;
                         EXEC;
                         NOT;
                         IF
                           { DUP;
                             PUSH string "INVALID_B_AMOUNT";
                             PAIR;
                             FAILWITH }
                           {  };
                         PUSH nat 0;
                         DIG 8;
                         DUP;
                         DUG 9;
                         DIG 7;
                         DUP;
                         DUG 8;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CDR;
                         CDR;
                         CDR;
                         CAR;
                         COMPARE;
                         EQ;
                         IF
                           { DIG 8;
                             DUP;
                             DUG 9 }
                           { PUSH nat 1;
                             DIG 8;
                             DUP;
                             DUG 9;
                             DIG 7;
                             DUP;
                             DUG 8;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             CDR;
                             CDR;
                             CAR;
                             INT;
                             PAIR;
                             PUSH nat 1;
                             DIG 5;
                             DUP;
                             DUG 6;
                             DIG 10;
                             DUP;
                             DUG 11;
                             DIG 9;
                             DUP;
                             DUG 10;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             CDR;
                             CDR;
                             CDR;
                             CDR;
                             MUL;
                             INT;
                             PAIR;
                             PAIR;
                             UNPAIR;
                             DIP { UNPAIR };
                             UNPAIR;
                             DIG 3;
                             PUSH int 0;
                             DIG 4;
                             DUP;
                             DUG 5;
                             COMPARE;
                             GE;
                             IF
                               { INT }
                               { NEG };
                             MUL;
                             DIP { MUL; ABS };
                             PAIR;
                             UNPAIR;
                             EDIV;
                             IF_NONE
                               { PUSH string "DivByZero";
                                 FAILWITH }
                               { CAR };
                             ABS };
                         DIG 7;
                         DUP;
                         DUG 8;
                         SENDER;
                         DIG 8;
                         DUP;
                         DUG 9;
                         PAIR;
                         MEM;
                         IF
                           { DIG 7;
                             DUP;
                             DUG 8;
                             SENDER;
                             DIG 8;
                             DUP;
                             DUG 9;
                             PAIR;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             DIG 8;
                             DUP;
                             DUG 9;
                             DIG 2;
                             DUP;
                             DUG 3;
                             DIG 2;
                             DUP;
                             DUG 3;
                             ADD;
                             SOME;
                             SENDER;
                             DIG 10;
                             DUP;
                             DUG 11;
                             PAIR;
                             UPDATE;
                             DIP { DIG 8; DROP };
                             DUG 8;
                             DROP }
                           { DIG 7;
                             DUP;
                             DUG 8;
                             SENDER;
                             DIG 8;
                             DUP;
                             DUG 9;
                             PAIR;
                             MEM;
                             IF
                               { PUSH string "KeyAlreadyExists";
                                 FAILWITH }
                               { DIG 7;
                                 DUP;
                                 DUG 8;
                                 DIG 1;
                                 DUP;
                                 DUG 2;
                                 PUSH nat 0;
                                 ADD;
                                 SOME;
                                 SENDER;
                                 DIG 9;
                                 DUP;
                                 DUG 10;
                                 PAIR;
                                 UPDATE;
                                 DIP { DIG 7; DROP };
                                 DUG 7 } };
                         DIG 8;
                         DUP;
                         DUG 9;
                         DIG 7;
                         DUP;
                         DUG 8;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         DIG 9;
                         DUP;
                         DUG 10;
                         DIG 10;
                         DUP;
                         DUG 11;
                         DIG 9;
                         DUP;
                         DUG 10;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         UNPAIR;
                         SWAP;
                         UNPAIR;
                         SWAP;
                         UNPAIR;
                         DROP;
                         DIG 9;
                         DUP;
                         DUG 10;
                         DIG 5;
                         DUP;
                         DUG 6;
                         CDR;
                         CDR;
                         CAR;
                         ADD;
                         SWAP;
                         UNPAIR;
                         DROP;
                         DIG 11;
                         DUP;
                         DUG 12;
                         DIG 6;
                         DUP;
                         DUG 7;
                         CDR;
                         CDR;
                         CDR;
                         CAR;
                         ADD;
                         SWAP;
                         DROP;
                         DIG 6;
                         DUP;
                         DUG 7;
                         DIG 6;
                         DUP;
                         DUG 7;
                         CDR;
                         CDR;
                         CDR;
                         CDR;
                         ADD;
                         SWAP;
                         PAIR;
                         SWAP;
                         PAIR;
                         SWAP;
                         PAIR;
                         SWAP;
                         PAIR;
                         SOME;
                         DIG 9;
                         DUP;
                         DUG 10;
                         UPDATE;
                         DIP { DIG 9; DROP };
                         DUG 9;
                         DROP 8;
                         SWAP;
                         PAIR;
                         SWAP;
                         PAIR;
                         SWAP;
                         PAIR;
                         DIG 1;
                         PAIR }
                       { UNPAIR;
                         SWAP;
                         DIG 2;
                         DUP;
                         DUG 3;
                         SENDER;
                         DIG 3;
                         DUP;
                         DUG 4;
                         PAIR;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         DIG 1;
                         DUP;
                         DUG 2;
                         COMPARE;
                         LE;
                         NOT;
                         IF
                           { PUSH string "NOT_ENOUGHT_LQT";
                             FAILWITH }
                           {  };
                         PUSH nat 1;
                         DIG 4;
                         DUP;
                         DUG 5;
                         DIG 3;
                         DUP;
                         DUG 4;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CDR;
                         CDR;
                         CDR;
                         CDR;
                         INT;
                         PAIR;
                         PUSH nat 1;
                         DIG 2;
                         DUP;
                         DUG 3;
                         INT;
                         PAIR;
                         PAIR;
                         UNPAIR;
                         DIP { UNPAIR };
                         UNPAIR;
                         DIG 3;
                         PUSH int 0;
                         DIG 4;
                         DUP;
                         DUG 5;
                         COMPARE;
                         GE;
                         IF
                           { INT }
                           { NEG };
                         MUL;
                         DIP { MUL; ABS };
                         PAIR;
                         PUSH nat 1;
                         DIG 5;
                         DUP;
                         DUG 6;
                         DIG 4;
                         DUP;
                         DUG 5;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CDR;
                         CDR;
                         CAR;
                         INT;
                         PAIR;
                         DIG 1;
                         DUP;
                         DUG 2;
                         PAIR;
                         UNPAIR;
                         DIP { UNPAIR };
                         UNPAIR;
                         DIP { SWAP };
                         MUL;
                         DIP { MUL };
                         PAIR;
                         UNPAIR;
                         EDIV;
                         IF_NONE
                           { PUSH string "DivByZero";
                             FAILWITH }
                           { CAR };
                         ABS;
                         DIG 8;
                         DUP;
                         DUG 9;
                         SENDER;
                         CONTRACT unit;
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         PUSH mutez 1;
                         PUSH nat 1;
                         DIG 4;
                         DUP;
                         DUG 5;
                         INT;
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
                         DIP { DIG 8; DROP };
                         DUG 8;
                         PUSH nat 1;
                         DIG 6;
                         DUP;
                         DUG 7;
                         DIG 5;
                         DUP;
                         DUG 6;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CDR;
                         CDR;
                         CDR;
                         CAR;
                         INT;
                         PAIR;
                         DIG 2;
                         DUP;
                         DUG 3;
                         PAIR;
                         UNPAIR;
                         DIP { UNPAIR };
                         UNPAIR;
                         DIP { SWAP };
                         MUL;
                         DIP { MUL };
                         PAIR;
                         UNPAIR;
                         EDIV;
                         IF_NONE
                           { PUSH string "DivByZero";
                             FAILWITH }
                           { CAR };
                         ABS;
                         DIG 9;
                         DUP;
                         DUG 10;
                         DIG 7;
                         DUP;
                         DUG 8;
                         DIG 6;
                         DUP;
                         DUG 7;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CAR;
                         CONTRACT %transfer (pair address (pair address nat));
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         PUSH mutez 0;
                         DIG 3;
                         DUP;
                         DUG 4;
                         SENDER;
                         PAIR;
                         SELF;
                         ADDRESS;
                         PAIR;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 9; DROP };
                         DUG 9;
                         DIG 5;
                         DUP;
                         DUG 6;
                         SENDER;
                         DIG 6;
                         DUP;
                         DUG 7;
                         PAIR;
                         MEM;
                         IF
                           { DIG 5;
                             DUP;
                             DUG 6;
                             SENDER;
                             DIG 6;
                             DUP;
                             DUG 7;
                             PAIR;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             DIG 6;
                             DUP;
                             DUG 7;
                             PUSH int 0;
                             DIG 6;
                             DUP;
                             DUG 7;
                             INT;
                             DIG 3;
                             DUP;
                             DUG 4;
                             SUB;
                             COMPARE;
                             GE;
                             IF
                               { DIG 5;
                                 DUP;
                                 DUG 6;
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
                             DIG 8;
                             DUP;
                             DUG 9;
                             PAIR;
                             UPDATE;
                             DIP { DIG 6; DROP };
                             DUG 6;
                             DROP }
                           { DIG 5;
                             DUP;
                             DUG 6;
                             SENDER;
                             DIG 6;
                             DUP;
                             DUG 7;
                             PAIR;
                             MEM;
                             IF
                               { PUSH string "KeyAlreadyExists";
                                 FAILWITH }
                               { DIG 5;
                                 DUP;
                                 DUG 6;
                                 PUSH int 0;
                                 DIG 5;
                                 DUP;
                                 DUG 6;
                                 INT;
                                 PUSH nat 0;
                                 SUB;
                                 COMPARE;
                                 GE;
                                 IF
                                   { DIG 4;
                                     DUP;
                                     DUG 5;
                                     INT;
                                     PUSH nat 0;
                                     SUB;
                                     ABS }
                                   { PUSH string "AssignNat";
                                     FAILWITH };
                                 SOME;
                                 SENDER;
                                 DIG 7;
                                 DUP;
                                 DUG 8;
                                 PAIR;
                                 UPDATE;
                                 DIP { DIG 5; DROP };
                                 DUG 5 } };
                         DIG 6;
                         DUP;
                         DUG 7;
                         DIG 5;
                         DUP;
                         DUG 6;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         DIG 7;
                         DUP;
                         DUG 8;
                         DIG 8;
                         DUP;
                         DUG 9;
                         DIG 7;
                         DUP;
                         DUG 8;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         UNPAIR;
                         SWAP;
                         UNPAIR;
                         SWAP;
                         UNPAIR;
                         DROP;
                         PUSH int 0;
                         DIG 7;
                         DUP;
                         DUG 8;
                         INT;
                         DIG 6;
                         DUP;
                         DUG 7;
                         CDR;
                         CDR;
                         CAR;
                         SUB;
                         COMPARE;
                         GE;
                         IF
                           { DIG 6;
                             DUP;
                             DUG 7;
                             INT;
                             DIG 5;
                             DUP;
                             DUG 6;
                             CDR;
                             CDR;
                             CAR;
                             SUB;
                             ABS }
                           { PUSH string "AssignNat";
                             FAILWITH };
                         SWAP;
                         UNPAIR;
                         DROP;
                         PUSH int 0;
                         DIG 7;
                         DUP;
                         DUG 8;
                         INT;
                         DIG 7;
                         DUP;
                         DUG 8;
                         CDR;
                         CDR;
                         CDR;
                         CAR;
                         SUB;
                         COMPARE;
                         GE;
                         IF
                           { DIG 6;
                             DUP;
                             DUG 7;
                             INT;
                             DIG 6;
                             DUP;
                             DUG 7;
                             CDR;
                             CDR;
                             CDR;
                             CAR;
                             SUB;
                             ABS }
                           { PUSH string "AssignNat";
                             FAILWITH };
                         SWAP;
                         DROP;
                         PUSH int 0;
                         DIG 10;
                         DUP;
                         DUG 11;
                         INT;
                         DIG 7;
                         DUP;
                         DUG 8;
                         CDR;
                         CDR;
                         CDR;
                         CDR;
                         SUB;
                         COMPARE;
                         GE;
                         IF
                           { DIG 9;
                             DUP;
                             DUG 10;
                             INT;
                             DIG 6;
                             DUP;
                             DUG 7;
                             CDR;
                             CDR;
                             CDR;
                             CDR;
                             SUB;
                             ABS }
                           { PUSH string "AssignNat";
                             FAILWITH };
                         SWAP;
                         PAIR;
                         SWAP;
                         PAIR;
                         SWAP;
                         PAIR;
                         SWAP;
                         PAIR;
                         SOME;
                         DIG 7;
                         DUP;
                         DUG 8;
                         UPDATE;
                         DIP { DIG 7; DROP };
                         DUG 7;
                         DROP 6;
                         SWAP;
                         PAIR;
                         SWAP;
                         PAIR;
                         SWAP;
                         PAIR;
                         DIG 1;
                         PAIR } } } };
         DIP { DROP 2 } };
}
```

</TabItem>

</Tabs>
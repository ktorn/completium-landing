---
id: template5
title: ICO
sidebar_label: ICO
slug: /templates/ico
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

This ICO process is inspired by the 2018 BCDiploma's ICO described in this <a href='https://github.com/VinceBCD/BCDiploma/tree/master/sources/BCDT/contracts/BCDToken'>document</a>.

Contributors are whitlisted with their address to participate in the ICO. Two whitelists are available:
* A *silver* whitelist, with a contribution limit of 10 XTZ maximum
* A *gold* whitelist, without contribution limit

The minimum transaction is 0.1 XTZ. 100,000,000 tokens go on sale. The ICO takes place in 3 rounds, with a contribution limit for each, and gives rise to different bonuses:
* *Presale*, limited to 1800 XTZ, grant 20% more tokens at the time of the contribution
* *Round 1*, limited to the presale cap + 1800 XTZ, grant 10% more tokens during the contribution
* *Round 2* does not give rise to a bonus, limited to the 100 000 000 tokens put up for sale. The XTZ/TOKEN rate is set at 80.

If the cap is reached for each of these rounds, the round is automatically completed. Otherwise, the round can be completed manually by the owner of the smartcontract.

Token ownership is handled by a <Link to='/docs/templates/fa12'>FA 1.2 fungible token</Link> smart contract. Initial tokens are owned by the ICO contract owner.
## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `owner` | `address` | Address of the contract and intital tokens owner. |
| `token` | `address` | Address of the FA 1.2 fungible token. |
| `min_contribution` | `tez` | Minimum contribution |
| `max_contribution_silver` | `tez` | Maximum contribution for *Silver* contributors |
| `max_token_to_sell` | `nat` | Number of tokens to sell. |
| `exchange_rate_tez_tok` | `nat` | Number of tokens to receive for 1 tez |
| `presale_cap` | `tez` | Number of tezies raised at the end of *presale* phase |
| `round1_cap` | `tez` | Number of tezies raised at the end of *Round 1* phase |
| `nb_tok_sold` | `nat` | Number of tokens sold. |
| `nb_tez_raised` | `tez` | Number of tezis raised. |
|  `contributor`| `collection` | A contributor is defined by:<ul><li>address</li><li>type *Silver* or *Gold*</li><li>Contribution in tezis</li></ul> |
| `vstate` | `gstate` | Contract state |

### Entrypoints

| Name | Parameters | Description |
| -- | -- | -- |
| `register` | `a`, `t` | Registers address `a` as contributor in whitelist type `t`. |
| `startpresale` | | `owner` can start *Presale* phase. |
| `startround1` | | `owner` can start *Round 1* phase. |
| `startround2` | | `owner` can start *Round 2* phase. |
| `finishphase` | | `owner` can finish ICO phase. |
| `contribute` | | A registered contributor tranfers tezies to this entrypoint and receive tokens in exchange. |
| `collectraised` | | `owner` can collect contract balance. |

## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
  ]}>

<TabItem value="archetype">

```archetype title="ico.arl"
archetype ico(owner : address, token : address)

variable min_contribution : tez        = 0.1tz
variable max_contribution_silver : tez = 10tz

variable max_token_to_sell     : nat = 100_000_000
variable exchange_rate_tez_tok : nat = 80 (* one tez is 80 tokens *)

variable presales_cap : tez = 1800tz
variable round1_cap   : tez = 3600tz

variable nb_tok_sold   : nat = 0
variable nb_tez_raised : tez = 0tz

enum whitelist =
| Silver
| Gold

asset contributor identified by id {
   id           : address;
   typ          : whitelist;
   contribution : tez = 0tz;
}

enum gstate =
| Init initial
| PresaleRunning
| PresaleFinished
| Round1Running
| Round1Finished
| Round2Running
| Round2Finished

variable vstate : gstate = Init


function is_running () : bool {
  return
    match vstate with
    | PresaleRunning | Round1Running | Round2Running -> true
    | _ -> false
    end
}

function get_rate () : rational {
  var coeff : rational =
    match vstate with
    | PresaleRunning  -> 1.2
    | Round1Running   -> 1.1
    | _               -> 1
    end;
  return (coeff * exchange_rate_tez_tok)
}

function get_remaining_tez_to_raise () : tez {
  return
    match vstate with
    | PresaleRunning | PresaleFinished -> presales_cap - nb_tez_raised
    | Round1Running  | Round1Finished  -> round1_cap - nb_tez_raised
    | _ -> (((max_token_to_sell - nb_tok_sold) / exchange_rate_tez_tok) * 1tz)
    end
}

function transition_to_finished () : gstate {
  return
    match vstate with
    | PresaleRunning -> PresaleFinished
    | Round1Running  -> Round1Finished
    | Round1Finished -> Round2Running
    | _              -> Round2Finished
    end
}

entry register(a : address, t : whitelist) {
  called by owner
  require { r0 : vstate = Init }
  effect { contributor.add({ id = a; typ = t }) }
}

entry startpresales() {
  called by owner
  require { r1 : vstate = Init }
  effect { vstate := PresaleRunning }
}

entry startround1() {
    called by owner
    require { r2: vstate = PresaleFinished }
    effect { vstate := Round1Running }
}

entry startround2() {
    called by owner
    require { r3: vstate = Round1Finished }
    effect { vstate := Round2Running }
}

entry finishphase () {
  called by owner
  require { r4: is_running() }
  effect { vstate := transition_to_finished() }
}

entry contribute () {
  require {
     c1 : contributor.contains(caller);
     c2 : is_running ();
     c3 : transferred >= min_contribution;
  }
  effect {
    (* cap contribution to max_contrib if necessary *)
    var contrib = transferred;
    if    contributor[caller].typ = Silver
      and contributor[caller].contribution + contrib >= max_contribution_silver
    then contrib := max_contribution_silver - contributor[caller].contribution;
    (* cap contribution to round cap if necessary *)
    var remaining_tez : tez = get_remaining_tez_to_raise ();
    if remaining_tez <= contrib
    then (
      contrib := remaining_tez;
      vstate := transition_to_finished ()
    );
    (* convert contribution to nb of bcd tokens *)
    var nb_tokens : nat = get_rate() * contrib;
    (* transfer tokens to contributor *)
    transfer 0tz to token
        call %transfer<address * address * nat>((owner, caller, nb_tokens));
    (* update ico stats *)
    nb_tok_sold   += nb_tokens;
    nb_tez_raised += contrib;
    (* update caller's contribution *)
    contributor[caller].contribution += contrib;
    if contrib <= transferred
    then transfer (transferred - contrib) to caller
  }
}

entry collectraised () {
    called by owner
    require { r5: vstate = Round2Finished }
    effect { transfer balance to owner }
}
```

</TabItem>

<TabItem value="michelson">

```js
# (Pair owner (Pair token (Pair 100000 (Pair 10000000 (Pair 100000000 (Pair 80 (Pair 1800000000 (Pair 3600000000 (Pair 0 (Pair 0 (Pair 0 {  })))))))))))
{
  storage (pair (address %owner) (pair (address %token) (pair (mutez %min_contribution) (pair (mutez %max_contribution_silver) (pair (nat %max_token_to_sell) (pair (nat %exchange_rate_tez_tok) (pair (mutez %presales_cap) (pair (mutez %round1_cap) (pair (nat %nb_tok_sold) (pair (mutez %nb_tez_raised) (pair (nat %vstate) (map %contributor address (pair (nat %typ) (mutez %contribution))))))))))))));
  parameter (or (pair %register (address %a) (nat %t)) (or (unit %startpresales) (or (unit %startround1) (or (unit %startround2) (or (unit %finishphase) (or (unit %contribute) (unit %collectraised)))))));
  code { LAMBDA
           nat
           bool
           { PUSH unit Unit;
             DIG 1;
             DUP;
             DUG 2;
             DUP;
             PUSH nat 1;
             COMPARE;
             EQ;
             IF
               { PUSH bool True }
               { DUP;
                 PUSH nat 3;
                 COMPARE;
                 EQ;
                 IF
                   { PUSH bool True }
                   { DUP;
                     PUSH nat 5;
                     COMPARE;
                     EQ;
                     IF
                       { PUSH bool True }
                       { PUSH bool False } } };
             DIP { DROP };
             SWAP;
             DROP;
             DUG 1;
             DROP };
         LAMBDA
           (pair nat nat)
           (pair int nat)
           { UNPAIR;
             SWAP;
             PUSH unit Unit;
             DIG 1;
             DUP;
             DUG 2;
             DUP;
             PUSH nat 1;
             COMPARE;
             EQ;
             IF
               { PUSH nat 5;
                 PUSH int 6;
                 PAIR }
               { DUP;
                 PUSH nat 3;
                 COMPARE;
                 EQ;
                 IF
                   { PUSH nat 10;
                     PUSH int 11;
                     PAIR }
                   { PUSH nat 1;
                     PUSH int 1;
                     PAIR } };
             DIP { DROP };
             PUSH nat 1;
             DIG 4;
             DUP;
             DUG 5;
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
             DIP { DIG 1; DROP };
             DUG 1;
             DROP;
             DUG 2;
             DROP 2 };
         LAMBDA
           (pair nat (pair nat (pair nat (pair mutez (pair mutez (pair mutez nat))))))
           mutez
           { UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             PUSH unit Unit;
             DIG 1;
             DUP;
             DUG 2;
             DUP;
             PUSH nat 1;
             COMPARE;
             EQ;
             IF
               { DIG 4;
                 DUP;
                 DUG 5;
                 DIG 4;
                 DUP;
                 DUG 5;
                 SUB }
               { DUP;
                 PUSH nat 2;
                 COMPARE;
                 EQ;
                 IF
                   { DIG 4;
                     DUP;
                     DUG 5;
                     DIG 4;
                     DUP;
                     DUG 5;
                     SUB }
                   { DUP;
                     PUSH nat 3;
                     COMPARE;
                     EQ;
                     IF
                       { DIG 4;
                         DUP;
                         DUG 5;
                         DIG 6;
                         DUP;
                         DUG 7;
                         SUB }
                       { DUP;
                         PUSH nat 4;
                         COMPARE;
                         EQ;
                         IF
                           { DIG 4;
                             DUP;
                             DUG 5;
                             DIG 6;
                             DUP;
                             DUG 7;
                             SUB }
                           { PUSH mutez 1000000;
                             PUSH nat 1;
                             DIG 10;
                             DUP;
                             DUG 11;
                             INT;
                             PAIR;
                             PUSH nat 1;
                             DIG 10;
                             DUP;
                             DUG 11;
                             INT;
                             DIG 10;
                             DUP;
                             DUG 11;
                             INT;
                             SUB;
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
                             CAR } } } };
             DIP { DROP };
             SWAP;
             DROP;
             DUG 7;
             DROP 7 };
         LAMBDA
           nat
           nat
           { PUSH unit Unit;
             DIG 1;
             DUP;
             DUG 2;
             DUP;
             PUSH nat 1;
             COMPARE;
             EQ;
             IF
               { PUSH nat 2 }
               { DUP;
                 PUSH nat 3;
                 COMPARE;
                 EQ;
                 IF
                   { PUSH nat 4 }
                   { DUP;
                     PUSH nat 4;
                     COMPARE;
                     EQ;
                     IF
                       { PUSH nat 5 }
                       { PUSH nat 6 } } };
             DIP { DROP };
             SWAP;
             DROP;
             DUG 1;
             DROP };
         NIL operation;
         DIG 5;
         UNPAIR;
         DIP { UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP };
         IF_LEFT
           { UNPAIR;
             SWAP;
             DIG 13;
             DUP;
             DUG 14;
             SENDER;
             COMPARE;
             EQ;
             NOT;
             IF
               { PUSH string "InvalidCaller";
                 FAILWITH }
               {  };
             PUSH nat 0;
             DIG 4;
             DUP;
             DUG 5;
             COMPARE;
             EQ;
             NOT;
             IF
               { PUSH string "InvalidCondition: r0";
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
               { PUSH string "KeyAlreadyExists";
                 FAILWITH }
               { DIG 2;
                 DUP;
                 DUG 3;
                 PUSH mutez 0;
                 DIG 2;
                 DUP;
                 DUG 3;
                 PAIR;
                 SOME;
                 DIG 3;
                 DUP;
                 DUG 4;
                 UPDATE;
                 DIP { DIG 2; DROP };
                 DUG 2 };
             DROP 2;
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
                 DIG 11;
                 DUP;
                 DUG 12;
                 SENDER;
                 COMPARE;
                 EQ;
                 NOT;
                 IF
                   { PUSH string "InvalidCaller";
                     FAILWITH }
                   {  };
                 PUSH nat 0;
                 DIG 2;
                 DUP;
                 DUG 3;
                 COMPARE;
                 EQ;
                 NOT;
                 IF
                   { PUSH string "InvalidCondition: r1";
                     FAILWITH }
                   {  };
                 PUSH nat 1;
                 DIP { DIG 1; DROP };
                 DUG 1;
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
                     DIG 11;
                     DUP;
                     DUG 12;
                     SENDER;
                     COMPARE;
                     EQ;
                     NOT;
                     IF
                       { PUSH string "InvalidCaller";
                         FAILWITH }
                       {  };
                     PUSH nat 2;
                     DIG 2;
                     DUP;
                     DUG 3;
                     COMPARE;
                     EQ;
                     NOT;
                     IF
                       { PUSH string "InvalidCondition: r2";
                         FAILWITH }
                       {  };
                     PUSH nat 3;
                     DIP { DIG 1; DROP };
                     DUG 1;
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
                         DIG 11;
                         DUP;
                         DUG 12;
                         SENDER;
                         COMPARE;
                         EQ;
                         NOT;
                         IF
                           { PUSH string "InvalidCaller";
                             FAILWITH }
                           {  };
                         PUSH nat 4;
                         DIG 2;
                         DUP;
                         DUG 3;
                         COMPARE;
                         EQ;
                         NOT;
                         IF
                           { PUSH string "InvalidCondition: r3";
                             FAILWITH }
                           {  };
                         PUSH nat 5;
                         DIP { DIG 1; DROP };
                         DUG 1;
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
                             DIG 11;
                             DUP;
                             DUG 12;
                             SENDER;
                             COMPARE;
                             EQ;
                             NOT;
                             IF
                               { PUSH string "InvalidCaller";
                                 FAILWITH }
                               {  };
                             DIG 16;
                             DUP;
                             DUG 17;
                             DIG 2;
                             DUP;
                             DUG 3;
                             EXEC;
                             NOT;
                             IF
                               { PUSH string "InvalidCondition: r4";
                                 FAILWITH }
                               {  };
                             DIG 13;
                             DUP;
                             DUG 14;
                             DIG 2;
                             DUP;
                             DUG 3;
                             EXEC;
                             DIP { DIG 1; DROP };
                             DUG 1;
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
                                 DUP;
                                 SENDER;
                                 MEM;
                                 NOT;
                                 IF
                                   { PUSH string "InvalidCondition: c1";
                                     FAILWITH }
                                   {  };
                                 DIG 16;
                                 DUP;
                                 DUG 17;
                                 DIG 2;
                                 DUP;
                                 DUG 3;
                                 EXEC;
                                 NOT;
                                 IF
                                   { PUSH string "InvalidCondition: c2";
                                     FAILWITH }
                                   {  };
                                 DIG 9;
                                 DUP;
                                 DUG 10;
                                 AMOUNT;
                                 COMPARE;
                                 GE;
                                 NOT;
                                 IF
                                   { PUSH string "InvalidCondition: c3";
                                     FAILWITH }
                                   {  };
                                 AMOUNT;
                                 DIG 9;
                                 DUP;
                                 DUG 10;
                                 DIG 1;
                                 DUP;
                                 DUG 2;
                                 DIG 3;
                                 DUP;
                                 DUG 4;
                                 SENDER;
                                 GET;
                                 IF_NONE
                                   { PUSH string "GetNoneValue";
                                     FAILWITH }
                                   {  };
                                 CDR;
                                 ADD;
                                 COMPARE;
                                 GE;
                                 PUSH nat 0;
                                 DIG 3;
                                 DUP;
                                 DUG 4;
                                 SENDER;
                                 GET;
                                 IF_NONE
                                   { PUSH string "GetNoneValue";
                                     FAILWITH }
                                   {  };
                                 CAR;
                                 COMPARE;
                                 EQ;
                                 AND;
                                 IF
                                   { DIG 1;
                                     DUP;
                                     DUG 2;
                                     SENDER;
                                     GET;
                                     IF_NONE
                                       { PUSH string "GetNoneValue";
                                         FAILWITH }
                                       {  };
                                     CDR;
                                     DIG 10;
                                     DUP;
                                     DUG 11;
                                     SUB;
                                     SWAP;
                                     DROP }
                                   {  };
                                 DIG 15;
                                 DUP;
                                 DUG 16;
                                 DIG 3;
                                 DUP;
                                 DUG 4;
                                 DIG 8;
                                 DUP;
                                 DUG 9;
                                 PAIR;
                                 DIG 5;
                                 DUP;
                                 DUG 6;
                                 PAIR;
                                 DIG 7;
                                 DUP;
                                 DUG 8;
                                 PAIR;
                                 DIG 10;
                                 DUP;
                                 DUG 11;
                                 PAIR;
                                 DIG 6;
                                 DUP;
                                 DUG 7;
                                 PAIR;
                                 DIG 9;
                                 DUP;
                                 DUG 10;
                                 PAIR;
                                 EXEC;
                                 DIG 1;
                                 DUP;
                                 DUG 2;
                                 DIG 1;
                                 DUP;
                                 DUG 2;
                                 COMPARE;
                                 LE;
                                 IF
                                   { DUP;
                                     DIP { DIG 1; DROP };
                                     DUG 1;
                                     DIG 15;
                                     DUP;
                                     DUG 16;
                                     DIG 4;
                                     DUP;
                                     DUG 5;
                                     EXEC;
                                     DIP { DIG 3; DROP };
                                     DUG 3 }
                                   {  };
                                 PUSH mutez 1;
                                 DIG 2;
                                 DUP;
                                 DUG 3;
                                 DIG 19;
                                 DUP;
                                 DUG 20;
                                 DIG 6;
                                 DUP;
                                 DUG 7;
                                 DIG 12;
                                 DUP;
                                 DUG 13;
                                 PAIR;
                                 EXEC;
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
                                 EDIV;
                                 IF_NONE
                                   { PUSH string "DivByZero";
                                     FAILWITH }
                                   { DUP;
                                     CAR;
                                     SWAP;
                                     DROP };
                                 DIG 15;
                                 DUP;
                                 DUG 16;
                                 DIG 14;
                                 DUP;
                                 DUG 15;
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
                                 DIG 18;
                                 DUP;
                                 DUG 19;
                                 PAIR;
                                 TRANSFER_TOKENS;
                                 CONS;
                                 DIP { DIG 15; DROP };
                                 DUG 15;
                                 DUP;
                                 DIG 7;
                                 DUP;
                                 DUG 8;
                                 ADD;
                                 DIP { DIG 6; DROP };
                                 DUG 6;
                                 DIG 2;
                                 DUP;
                                 DUG 3;
                                 DIG 6;
                                 DUP;
                                 DUG 7;
                                 ADD;
                                 DIP { DIG 5; DROP };
                                 DUG 5;
                                 DIG 3;
                                 DUP;
                                 DUG 4;
                                 SENDER;
                                 GET;
                                 IF_NONE
                                   { PUSH string "GetNoneValue";
                                     FAILWITH }
                                   {  };
                                 DIG 4;
                                 DUP;
                                 DUG 5;
                                 DIG 5;
                                 DUP;
                                 DUG 6;
                                 SENDER;
                                 GET;
                                 IF_NONE
                                   { PUSH string "GetNoneValue";
                                     FAILWITH }
                                   {  };
                                 UNPAIR;
                                 SWAP;
                                 DROP;
                                 DIG 5;
                                 DUP;
                                 DUG 6;
                                 DIG 3;
                                 DUP;
                                 DUG 4;
                                 CDR;
                                 ADD;
                                 SWAP;
                                 PAIR;
                                 SOME;
                                 SENDER;
                                 UPDATE;
                                 DIP { DIG 4; DROP };
                                 DUG 4;
                                 DROP;
                                 AMOUNT;
                                 DIG 3;
                                 DUP;
                                 DUG 4;
                                 COMPARE;
                                 LE;
                                 IF
                                   { DIG 15;
                                     DUP;
                                     DUG 16;
                                     SENDER;
                                     CONTRACT unit;
                                     IF_NONE
                                       { PUSH string "BadContract";
                                         FAILWITH }
                                       {  };
                                     DIG 4;
                                     DUP;
                                     DUG 5;
                                     AMOUNT;
                                     SUB;
                                     UNIT;
                                     TRANSFER_TOKENS;
                                     CONS;
                                     DIP { DIG 15; DROP };
                                     DUG 15 }
                                   {  };
                                 DROP 3;
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
                                 SWAP;
                                 PAIR;
                                 SWAP;
                                 PAIR;
                                 SWAP;
                                 PAIR;
                                 DIG 1;
                                 PAIR }
                               { DROP;
                                 DIG 11;
                                 DUP;
                                 DUG 12;
                                 SENDER;
                                 COMPARE;
                                 EQ;
                                 NOT;
                                 IF
                                   { PUSH string "InvalidCaller";
                                     FAILWITH }
                                   {  };
                                 PUSH nat 6;
                                 DIG 2;
                                 DUP;
                                 DUG 3;
                                 COMPARE;
                                 EQ;
                                 NOT;
                                 IF
                                   { PUSH string "InvalidCondition: r5";
                                     FAILWITH }
                                   {  };
                                 DIG 12;
                                 DUP;
                                 DUG 13;
                                 DIG 12;
                                 DUP;
                                 DUG 13;
                                 CONTRACT unit;
                                 IF_NONE
                                   { PUSH string "BadContract";
                                     FAILWITH }
                                   {  };
                                 BALANCE;
                                 UNIT;
                                 TRANSFER_TOKENS;
                                 CONS;
                                 DIP { DIG 12; DROP };
                                 DUG 12;
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
                                 SWAP;
                                 PAIR;
                                 SWAP;
                                 PAIR;
                                 SWAP;
                                 PAIR;
                                 DIG 1;
                                 PAIR } } } } } };
         DIP { DROP 4 } };
}
```

</TabItem>

</Tabs>
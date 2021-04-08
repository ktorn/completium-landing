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

```archetype
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
    match entrypoint<(address * address * nat)>("%transfer", token) with
      | some(transferTok) ->
        transfer 0tz to entry transferTok((owner, caller, nb_tokens))
      | none -> fail("INVALID_ENTRY")
    end;
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

```

</TabItem>

</Tabs>
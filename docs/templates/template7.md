---
id: template7
title: Autocallable note
sidebar_label: Autocallable note
slug: /templates/acn
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

This contract is the adaptation to the <Link to='/docs/dapp-tools/tezos'>Tezos</Link> blockchain of an <Link to='https://drive.google.com/file/d/0B64p1w9JOO-QQlhFQWEzMVl0cmRRVk5Td3d6czR5ZDRsWTRN/view'>autocallable note</Link> issued by Goldman Sachs.

AutoCallable notes are short-term market-linked investments offering an above-market coupon if automatically matured prior to the scheduled maturity date. The product is automatically matured (“auto-called”) if the reference asset is at or above its initial level on a predetermined observation date. If called, the investor will receive their initial principal investment plus an above-market coupon.

Because of the passive nature of the blockchain, the contract here is an escrow of the issuer's payments (interests and redeem amounts in due time). At any time, the holder can check whether the escrowed amount is equal to what was initially planned by the contract, by calling the `check` entrypoint. If the balance is not equal to the expected amount, the contract goes to state `Defaulted`. The holder may then turn to a dispute resolution mecanism to recover the due amount, the contract state being the proof of the default in payment.

Fixing values are provided to the contract by the `oracle` address. Knowing that these data are licensed by market places to their customers, it is an open question to know whether the publically available blockchain data is a no-go. The challenge for the DeFi is to find business models not based on fixing values, but rather on the operation of such contracts.

> Thank you to Alain Frisch, CTO at <Link to='https://www.lexifi.com/'>Lexifi</Link>, for this example contract and his help to adapt it. Lexifi provides financial services with a DSL (Domain Specific Language) to execute and simulate financial contracts. Alain Frish also provided the corresponding Lexifi code, automatically extracted by Lexifi drivers from the above document.

## API

The contract relies on the 3 underlyings: Bank of America, Société Générale and Union des Banques Suisses.

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `issuer` | `address` | Issuer address, transfers note payments. |
| `holder` | `address` | Holder address, checks the contract balance. |
| `oracle` | `address` | Oracle address, provides fixing values. |
| `nominal` | `tez` | Nominal value transfered by holder to confirm start of contract. |
| `trade` | `date` | Trade date. |
| `final` | `date` | Final Fixing date. |
| `gredemption` | `date` | Redemption date. |
| `bac_initial` | `rational` | Initial Bank of America Fixing rate. |
| `sg_initial` | `rational` | Initial Société Générale rate. |
| `ubs_initial` | `rational` | Initial Union des Banques Suisses rate. |
| `bac_strike` | `rational` | Bank of America strike rate. |
| `sg_strike` | `rational` | Société Générale strike rate. |
| `ubs_strike` | `rational` | Union des Banques Suisses strike rate. |
| `early` | `collection` | Early redemption, defined by:<ul><li>Observation date</li><li>Early redemption date</li><li>Trigger percentage</li><li>Early redemption value</li></ul><p />If on one of the Observation dates, the Fixing of each Underlying is equal to or above its respective Trigger Percentage multiplied by the Fixing (Initial), the Note will be redeemed and the Investor will receive on the respective Early Redemption Date an amount equal to the relevant Early Redemption Value multiplied by the Nominal. |
| `interest` | `collection`| Interest, defined by:<ul><li>Interest Observation Date</li><li>Interest Payment Date</li><li>Interest Barrier Percent</li><li>Interest Rate</li></ul><p />If on one of the Interest Observation Dates, the Fixing of each Underlying is equal to or above its respective Interest Barrier Percent multiplied by the Fixing (Initial) , the Investor will receive on the respective Interest Payment Date an amount equal to the relevant Interest Rate multiplied by the Nominal. |
| `fixing` | `collection` | Fixing value defined by:<ul><li>Observation Date</li><li>Bank of America Fixing</li><li>Société Générale Fixing</li><li>Union des banques Suisses</li></ul><p />Fixing values are provided by `oracle`. |
| `actual_payment` | `tez`| Total payment by issuer. |
| `state_` | `states` | One of:<ul><li>`Created` (intial state)</li><li>`Canceled` (holder or issuer has canceled the contract)</li><li>`Defaulted`</li><li>`Terminated`</li></ul> |

### Entrypoints

| Name | Parameters | Description |
| -- | -- | -- |
| `add_fixing` | `ffobservation`, `fbac`, `fsg`, `fubs` | Called by `oracle` to provide Fixing values for underlyings. |
| `pay_note` | | Called by `issuer` to transfer payment notes. |
| `confirm` | | Called by `holder` who transfers `nominal` amount to `issuer` via contract. Sets contract state to `Confirmed`. |
| `cancel` | | Called by `holder` or `issuer` to cancel contract. |
| `check` | | Called by `holder` to compare actual payments with expected payments. If different, sets the contract to `Defaulted` state. |
| `terminate` | | Called by `holder` to terminate contract. |
## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Storage', value: 'storage', },
    { label: 'Michelson', value: 'michelson', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="archetype">

```archetype title="autocallable.arl"
archetype autocallable(
  issuer  : role,
  holder  : role,
  oracle  : role,
  nominal : tez,
  trade   : date,
  final   : date,
  gredemption : date,
  (* UNDERLYINGS *)
  bac_initial : rational,
  sg_initial  : rational,
  ubs_initial : rational,
  bac_strike  : rational,
  sg_strike   : rational,
  ubs_strike  : rational
)

asset early {
  eobservation : date;
  redemption   : date;
  trigger      : rational;
  value        : rational;
}

asset interest {
  iobservation : date;
  payment     : date;
  barrier     : rational;
  rate        : rational;
}

asset fixing {
  fobservation : date;
  bac : rational;  (* Bank of America Corporation *)
  sg  : rational;  (* Societe Generale *)
  ubs : rational;  (* Union des Banques Suisses *)
}

(* EXPECTED PAYMENT COMPUTATION *)
function compute_expected (d : date) : tez {
  var expected = 0tz;
  var terminated = false;
  var redeem_date = final;
  (* early redemption *)
  for e in early do
    if early[e].redemption <= d then begin
      (* is there early redemption ? *)
      var ee = early[e].eobservation;
      if     fixing[ee].bac >= early[e].trigger * bac_initial
         and fixing[ee].sg  >= early[e].trigger * sg_initial
         and fixing[ee].ubs >= early[e].trigger * ubs_initial
      then begin
         expected += early[e].value * nominal;
         redeem_date := early[e].eobservation;
         terminated := true
      end
    end
  done;
  (* redemption *)
  if not terminated and gredemption <= d then
    if     fixing[gredemption].bac >= bac_strike
       and fixing[gredemption].sg  >= sg_strike
       and fixing[gredemption].ubs >= ubs_strike
    then
       expected += nominal
    else begin
       var bac_trigger = fixing[gredemption].bac / bac_strike;
       var sg_trigger  = fixing[gredemption].sg  / sg_strike;
       var ubs_trigger = fixing[gredemption].ubs / ubs_strike;
       var worst = min ((min (bac_trigger, sg_trigger)), ubs_trigger);
       expected += worst * nominal
    end;
  (* expected interests *)
  var exp_interests = 0tz;
  for i in interest do
    if interest[i].iobservation <= redeem_date and interest[i].payment <= d
    then begin
      var ii = interest[i].iobservation;
      if     fixing[ii].bac >= interest[i].barrier * bac_initial
         and fixing[ii].sg  >= interest[i].barrier * sg_initial
         and fixing[ii].ubs >= interest[i].barrier * ubs_initial
      then exp_interests := interest[i].rate * nominal
    end
  done;
  expected += exp_interests;
  return expected
}

(* PAYMENT action *)
variable actual_payment : tez = 0tz

entry pay_note () {
   called by issuer
   effect {
      actual_payment += transferred
   }
}

entry add_fixing (
  ffobservation : date,
  fbac          : rational,
  fsg           : rational,
  fubs          : rational) {
  fixing.add({ffobservation; fbac; fsg; fubs})
}

(* STATE MACHINE *)
states =
 | Created initial (* doc initial state. *)
 | Canceled        (* holder or issuer has canceled the transaction. *)
 | Confirmed       (* holder has confirmed. *)
 | Defaulted
 | Terminated

(* Used by holder to confirm transaction.
   It transfers the price of contract (nominal) *)
transition confirm () {
  called by holder
  from Created
  to Confirmed when { transferred = nominal }
  effect { transfer transferred to issuer }
}

transition cancel () {
  called by holder or issuer
  from Created
  to Canceled
}

transition check () {
  called by holder
  from Confirmed
  to Defaulted when { actual_payment < compute_expected(now) }
}

transition terminate () {
  called by issuer
  from Confirmed
  to Terminated when { actual_payment >= compute_expected(now) }
}
```

</TabItem>

<TabItem value="storage">

Code snippet to set initial storage to values specified in contract.

```archetype

constant issuer : role = @tz1bfVgcJC4ukaQSHUe1EbrUd5SekXeP9CWk
constant owner  : role = @tz1Lc2qBKEWCBeDU8npG6zCeCqpmaegRi6Jg
constant oracle : role = @tz1iawHeddgggn6P5r5jtq2wDRqcJVksGVSa (* exchange *)

constant nominal : tez = 1000tz

constant trade       : date = 2017-03-14T00:00:00
constant init        : date = 2017-03-14T00:00:00
constant issue       : date = 2017-03-28T00:00:00
constant final       : date = 2020-03-16T00:00:00
constant gredemption : date = 2020-03-30T00:00:00

(* UNDERLYINGS *)
constant bac_initial : rational = 25.32
constant sg_initial  : rational = 46.945
constant ubs_initial : rational = 15.98

constant bac_strike : rational = 12.66   (* ~ 0.5 * bac_initial *)
constant sg_strike  : rational = 23.4725 (* ~ 0.5 * sg_initial  *)
constant ubs_strike : rational = 15.98   (* ~ 0.5 * ubs_initial *)

(* CONTRACT DATA *)
asset early identified by eobservation {
  eobservation : date;
  redemption   : date;
  trigger      : rational;
  value        : rational;
} with {
  i1 : 0 <= trigger <= 1;
  i2 : 0 <= value   <= 1;
} initialized by {
  { 2018-03-14T00:00:00; 2018-03-28T00:00:00; 0.95; 1 };
  { 2018-06-14T00:00:00; 2018-06-28T00:00:00; 0.95; 1 };
  { 2018-09-14T00:00:00; 2018-09-28T00:00:00; 0.95; 1 };
  { 2018-12-14T00:00:00; 2019-01-02T00:00:00; 0.95; 1 };
  { 2019-03-14T00:00:00; 2019-03-28T00:00:00; 0.80; 1 };
  { 2019-06-14T00:00:00; 2019-06-28T00:00:00; 0.80; 1 };
  { 2019-09-16T00:00:00; 2020-09-30T00:00:00; 0.70; 1 };
  { 2019-12-16T00:00:00; 2020-01-02T00:00:00; 0.70; 1 };
  { 2020-03-16T00:00:00; 2020-03-30T00:00:00; 0.70; 1 }
}

asset interest identified by iobservation {
  iobservation : date;
  payment     : date;
  barrier     : rational;
  rate        : rational;
} with {
  i3 : 0 <= barrier <= 1;
} initialized by {
  { 2017-06-14T00:00:00; 2017-06-28T00:00:00; 0.5; 2.025  };
  { 2017-09-14T00:00:00; 2017-09-28T00:00:00; 0.5; 4.05   };
  { 2017-12-14T00:00:00; 2018-01-02T00:00:00; 0.5; 6.075  };
  { 2018-03-14T00:00:00; 2018-03-28T00:00:00; 0.5; 8.1    };
  { 2018-06-14T00:00:00; 2018-06-28T00:00:00; 0.5; 10.125 };
  { 2018-09-14T00:00:00; 2018-09-28T00:00:00; 0.5; 12.15  };
  { 2018-12-14T00:00:00; 2019-01-02T00:00:00; 0.5; 14.175 };
  { 2019-03-14T00:00:00; 2019-03-28T00:00:00; 0.5; 16.2   };
  { 2019-06-14T00:00:00; 2019-06-28T00:00:00; 0.5; 18.225 };
  { 2019-09-16T00:00:00; 2019-09-30T00:00:00; 0.5; 20.25  };
  { 2019-12-16T00:00:00; 2020-01-02T00:00:00; 0.5; 22.275 };
  { 2020-03-16T00:00:00; 2020-03-30T00:00:00; 0.5; 24.3   }
}
```

</TabItem>

<TabItem value="michelson">

```js

```

</TabItem>

<TabItem value="specification">

```archetype
specification function compute_expected (d : date) {

  (** etrigger is defined as the set of early assets for which
      the trigger condition is true *)
  definition etrigger { e : early |
    forall f in fixing,
      if e.eobservation = f.fobservation
      then (* trigger condition *)
            f.bac >= e.trigger * bac_initial
        and f.sg  >= e.trigger * sg_initial
        and f.ubs >= e.trigger * ubs_initial
      else false
  }
  (** ibarrier is defined as the set of interest assets for which
      the barrier condition is true *)
  definition ibarrier { i : interest |
    forall f in fixing,
      (* retrieving the first element of etrigger *)
      let some key_efirst = etrigger.nth(0) in
      let some efirst = etrigger[key_efirst] in
        if i.iobservation = f.fobservation and i.iobservation <= efirst.eobservation
        then (* barrier condition *)
                  f.bac >= bac_strike
              and f.sg  >= sg_strike
              and f.ubs >= ubs_strike
        else false
      otherwise false
      otherwise false
  }

  (** expected is the sum of redemption nominal and interests *)
  postcondition p_expected {
      let expected : tez =
        let some ftrigger_key = etrigger.nth(0) in
        let some ftrigger = early[ftrigger_key] in
        (* early redemption *)
        ftrigger.value * nominal
        otherwise
        (* redemption *)
        (let some f = fixing[gredemption] in
        if     f.bac >= bac_strike
           and f.sg  >= sg_strike
           and f.ubs >= ubs_strike
        then
           nominal
        else
          let bac_trigger = f.bac / bac_strike in
          let sg_trigger  = f.sg  / sg_strike  in
          let ubs_trigger = f.ubs / ubs_strike in
          let worst = min ((min (bac_trigger, sg_trigger)), ubs_trigger) in
          worst * nominal
        otherwise 0tz)
        otherwise
        (* redemption *)
        let some f = fixing[gredemption] in
        if     f.bac >= bac_strike
           and f.sg  >= sg_strike
           and f.ubs >= ubs_strike
        then
           nominal
        else
          let bac_trigger = f.bac / bac_strike in
          let sg_trigger  = f.sg  / sg_strike  in
          let ubs_trigger = f.ubs / ubs_strike in
          let worst = min ((min (bac_trigger, sg_trigger)), ubs_trigger) in
          worst * nominal
        otherwise 0tz
      in
      (* interests *)
      let interests =
      if expected = 0tz then 0tz else
        (let some lbarrier_key = ibarrier.nth(abs(ibarrier.count() - 1)) in
        let some lbarrier = interest[lbarrier_key] in
          let some v = fixing[lbarrier.iobservation] in
          if    v.bac >= lbarrier.barrier * bac_initial
            and v.sg  >= lbarrier.barrier * sg_initial
            and v.ubs >= lbarrier.barrier * ubs_initial
          then lbarrier.rate * nominal
          else 0tz
        otherwise 0tz
        otherwise 0tz
        otherwise 0tz)
      in
       result = expected + interests
  }
}
```

</TabItem>

</Tabs>
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

This contract is the adaptation to the <Link to='/docs/dapp-tools/tezos'>Tezos</Link> blockchain of an autocallable note issued by Goldman Sachs presented in <Link to='https://drive.google.com/file/d/0B64p1w9JOO-QQlhFQWEzMVl0cmRRVk5Td3d6czR5ZDRsWTRN/view'>this document</Link>.

An autocallable collect

## API

### Storage

### Entrypoints

## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
  ]}>

<TabItem value="archetype">

```archetype
archetype autocallable(
  issuer  : role,
  owner   : role,
  oracle  : role,
  nominal : tez,
  trade   : date,
  init    : date,
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

(* CONTRACT DATA *)
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

(* underlyings values *)
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
 | Canceled        (* owner or issuer has canceled the transaction. *)
 | Confirmed       (* owner has confirmed. *)
 | Defaulted
 | Terminated

(* Used by owner to confirm transaction.
   It transfers the price of contract (nominal) *)
transition confirm () {
  called by owner
  from Created
  to Confirmed when { transferred = nominal }
}

transition cancel () {
  called by owner or issuer
  from Created
  to Canceled
}

transition check () {
  called by owner
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

<TabItem value="michelson">

```js

```

</TabItem>

</Tabs>
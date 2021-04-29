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
  issuer  : address,
  holder  : address,
  oracle  : address,
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
  with effect { transfer transferred to issuer }
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

Code snippet to set initial storage according to values specified in contract.

```archetype
variable nominal : tez = 1000tz

variable trade       : date = 2017-03-14T00:00:00
variable init        : date = 2017-03-14T00:00:00
variable issue       : date = 2017-03-28T00:00:00
variable final       : date = 2020-03-16T00:00:00
variable gredemption : date = 2020-03-30T00:00:00

(* UNDERLYINGS *)
variable bac_initial : rational = 25.32
variable sg_initial  : rational = 46.945
variable ubs_initial : rational = 15.98

variable bac_strike : rational = 12.66   (* ~ 0.5 * bac_initial *)
variable sg_strike  : rational = 23.4725 (* ~ 0.5 * sg_initial  *)
variable ubs_strike : rational = 15.98   (* ~ 0.5 * ubs_initial *)

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
# (Pair issuer (Pair holder (Pair oracle (Pair nominal (Pair trade (Pair final (Pair gredemption (Pair bac_initial (Pair sg_initial (Pair ubs_initial (Pair bac_strike (Pair sg_strike (Pair ubs_strike (Pair 0 (Pair 0 (Pair {  } (Pair {  } {  })))))))))))))))))
{
  storage (pair (address %issuer) (pair (address %holder) (pair (address %oracle) (pair (mutez %nominal) (pair (timestamp %trade) (pair (timestamp %final) (pair (timestamp %gredemption) (pair (pair %bac_initial int nat) (pair (pair %sg_initial int nat) (pair (pair %ubs_initial int nat) (pair (pair %bac_strike int nat) (pair (pair %sg_strike int nat) (pair (pair %ubs_strike int nat) (pair (mutez %actual_payment) (pair (nat %_state) (pair (map %early timestamp (pair (timestamp %redemption) (pair (pair %trigger int nat) (pair %value int nat)))) (pair (map %interest timestamp (pair (timestamp %payment) (pair (pair %barrier int nat) (pair %rate int nat)))) (map %fixing timestamp (pair (pair %bac int nat) (pair (pair %sg int nat) (pair %ubs int nat)))))))))))))))))))));
  parameter (or (unit %pay_note) (or (pair %add_fixing (timestamp %ffobservation) (pair (pair %fbac int nat) (pair (pair %fsg int nat) (pair %fubs int nat)))) (or (unit %confirm) (or (unit %cancel) (or (unit %check) (unit %terminate))))));
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
           (pair (map timestamp (pair (timestamp %payment) (pair (pair %barrier int nat) (pair %rate int nat)))) (pair (pair int nat) (pair (pair int nat) (pair (pair int nat) (pair timestamp (pair mutez (pair (pair int nat) (pair (pair int nat) (pair (pair int nat) (pair (map timestamp (pair (pair %bac int nat) (pair (pair %sg int nat) (pair %ubs int nat)))) (pair (map timestamp (pair (timestamp %redemption) (pair (pair %trigger int nat) (pair %value int nat)))) (pair timestamp (pair timestamp (lambda (pair (pair (pair int nat) (pair int nat)) (or unit (or (or unit unit) (or unit unit)))) bool))))))))))))))
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
             UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             PUSH unit Unit;
             PUSH mutez 0;
             PUSH bool False;
             DIG 5;
             DUP;
             DUG 6;
             DIG 7;
             DUP;
             DUG 8;
             ITER { UNPAIR;
                    DIG 7;
                    DUP;
                    DUG 8;
                    DIG 10;
                    DUP;
                    DUG 11;
                    DIG 2;
                    DUP;
                    DUG 3;
                    GET;
                    IF_NONE
                      { PUSH string "GetNoneValue";
                        FAILWITH }
                      {  };
                    CAR;
                    COMPARE;
                    LE;
                    IF
                      { DUP;
                        DIG 7;
                        DUP;
                        DUG 8;
                        UNIT;
                        RIGHT unit;
                        RIGHT (or unit unit);
                        RIGHT unit;
                        DIG 16;
                        DUP;
                        DUG 17;
                        DIG 13;
                        DUP;
                        DUG 14;
                        DIG 5;
                        DUP;
                        DUG 6;
                        GET;
                        IF_NONE
                          { PUSH string "GetNoneValue";
                            FAILWITH }
                          {  };
                        CDR;
                        CAR;
                        PAIR;
                        UNPAIR;
                        DIP { UNPAIR };
                        UNPAIR;
                        DIP { SWAP };
                        MUL;
                        DIP { MUL };
                        PAIR;
                        DIG 14;
                        DUP;
                        DUG 15;
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
                        PAIR;
                        PAIR;
                        EXEC;
                        DIG 8;
                        DUP;
                        DUG 9;
                        UNIT;
                        RIGHT unit;
                        RIGHT (or unit unit);
                        RIGHT unit;
                        DIG 16;
                        DUP;
                        DUG 17;
                        DIG 14;
                        DUP;
                        DUG 15;
                        DIG 6;
                        DUP;
                        DUG 7;
                        GET;
                        IF_NONE
                          { PUSH string "GetNoneValue";
                            FAILWITH }
                          {  };
                        CDR;
                        CAR;
                        PAIR;
                        UNPAIR;
                        DIP { UNPAIR };
                        UNPAIR;
                        DIP { SWAP };
                        MUL;
                        DIP { MUL };
                        PAIR;
                        DIG 15;
                        DUP;
                        DUG 16;
                        DIG 5;
                        DUP;
                        DUG 6;
                        GET;
                        IF_NONE
                          { PUSH string "GetNoneValue";
                            FAILWITH }
                          {  };
                        CDR;
                        CAR;
                        PAIR;
                        PAIR;
                        EXEC;
                        DIG 9;
                        DUP;
                        DUG 10;
                        UNIT;
                        RIGHT unit;
                        RIGHT (or unit unit);
                        RIGHT unit;
                        DIG 16;
                        DUP;
                        DUG 17;
                        DIG 15;
                        DUP;
                        DUG 16;
                        DIG 7;
                        DUP;
                        DUG 8;
                        GET;
                        IF_NONE
                          { PUSH string "GetNoneValue";
                            FAILWITH }
                          {  };
                        CDR;
                        CAR;
                        PAIR;
                        UNPAIR;
                        DIP { UNPAIR };
                        UNPAIR;
                        DIP { SWAP };
                        MUL;
                        DIP { MUL };
                        PAIR;
                        DIG 16;
                        DUP;
                        DUG 17;
                        DIG 6;
                        DUP;
                        DUG 7;
                        GET;
                        IF_NONE
                          { PUSH string "GetNoneValue";
                            FAILWITH }
                          {  };
                        CAR;
                        PAIR;
                        PAIR;
                        EXEC;
                        AND;
                        AND;
                        IF
                          { DIG 15;
                            DUP;
                            DUG 16;
                            DIG 11;
                            DUP;
                            DUG 12;
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
                            DIG 6;
                            DUP;
                            DUG 7;
                            ADD;
                            DIP { DIG 5; DROP };
                            DUG 5;
                            DIG 1;
                            DUP;
                            DUG 2;
                            DIP { DIG 3; DROP };
                            DUG 3;
                            PUSH bool True;
                            DIP { DIG 4; DROP };
                            DUG 4 }
                          {  };
                        DROP }
                      {  };
                    DROP 2 };
             DIG 5;
             DUP;
             DUG 6;
             DIG 14;
             DUP;
             DUG 15;
             COMPARE;
             LE;
             DIG 2;
             DUP;
             DUG 3;
             NOT;
             AND;
             IF
               { DIG 4;
                 DUP;
                 DUG 5;
                 UNIT;
                 RIGHT unit;
                 RIGHT (or unit unit);
                 RIGHT unit;
                 DIG 18;
                 DUP;
                 DUG 19;
                 DIG 11;
                 DUP;
                 DUG 12;
                 DIG 17;
                 DUP;
                 DUG 18;
                 GET;
                 IF_NONE
                   { PUSH string "GetNoneValue";
                     FAILWITH }
                   {  };
                 CDR;
                 CDR;
                 PAIR;
                 PAIR;
                 EXEC;
                 DIG 5;
                 DUP;
                 DUG 6;
                 UNIT;
                 RIGHT unit;
                 RIGHT (or unit unit);
                 RIGHT unit;
                 DIG 18;
                 DUP;
                 DUG 19;
                 DIG 12;
                 DUP;
                 DUG 13;
                 DIG 18;
                 DUP;
                 DUG 19;
                 GET;
                 IF_NONE
                   { PUSH string "GetNoneValue";
                     FAILWITH }
                   {  };
                 CDR;
                 CAR;
                 PAIR;
                 PAIR;
                 EXEC;
                 DIG 6;
                 DUP;
                 DUG 7;
                 UNIT;
                 RIGHT unit;
                 RIGHT (or unit unit);
                 RIGHT unit;
                 DIG 18;
                 DUP;
                 DUG 19;
                 DIG 13;
                 DUP;
                 DUG 14;
                 DIG 19;
                 DUP;
                 DUG 20;
                 GET;
                 IF_NONE
                   { PUSH string "GetNoneValue";
                     FAILWITH }
                   {  };
                 CAR;
                 PAIR;
                 PAIR;
                 EXEC;
                 AND;
                 AND;
                 IF
                   { DIG 12;
                     DUP;
                     DUG 13;
                     DIG 3;
                     DUP;
                     DUG 4;
                     ADD;
                     DIP { DIG 2; DROP };
                     DUG 2 }
                   { DIG 14;
                     DUP;
                     DUG 15;
                     DIG 9;
                     DUP;
                     DUG 10;
                     DIG 15;
                     DUP;
                     DUG 16;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     CAR;
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
                     DIG 16;
                     DUP;
                     DUG 17;
                     DIG 10;
                     DUP;
                     DUG 11;
                     DIG 16;
                     DUP;
                     DUG 17;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     CDR;
                     CAR;
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
                     DIG 18;
                     DUP;
                     DUG 19;
                     DIG 11;
                     DUP;
                     DUG 12;
                     DIG 17;
                     DUP;
                     DUG 18;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     CDR;
                     CDR;
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
                     DUP;
                     DIG 2;
                     DUP;
                     DUG 3;
                     DIG 4;
                     DUP;
                     DUG 5;
                     PAIR;
                     DUP;
                     UNPAIR;
                     COMPARE;
                     LT;
                     IF
                       { CAR }
                       { CDR };
                     PAIR;
                     DUP;
                     UNPAIR;
                     COMPARE;
                     LT;
                     IF
                       { CAR }
                       { CDR };
                     DIG 16;
                     DUP;
                     DUG 17;
                     DIG 1;
                     DUP;
                     DUG 2;
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
                     DIG 7;
                     DUP;
                     DUG 8;
                     ADD;
                     DIP { DIG 6; DROP };
                     DUG 6;
                     DROP 4 } }
               {  };
             PUSH mutez 0;
             DIG 18;
             DUP;
             DUG 19;
             ITER { UNPAIR;
                    DIG 8;
                    DUP;
                    DUG 9;
                    DIG 21;
                    DUP;
                    DUG 22;
                    DIG 2;
                    DUP;
                    DUG 3;
                    GET;
                    IF_NONE
                      { PUSH string "GetNoneValue";
                        FAILWITH }
                      {  };
                    CAR;
                    COMPARE;
                    LE;
                    DIG 4;
                    DUP;
                    DUG 5;
                    DIG 2;
                    DUP;
                    DUG 3;
                    COMPARE;
                    LE;
                    AND;
                    IF
                      { DUP;
                        DIG 8;
                        DUP;
                        DUG 9;
                        UNIT;
                        RIGHT unit;
                        RIGHT (or unit unit);
                        RIGHT unit;
                        DIG 17;
                        DUP;
                        DUG 18;
                        DIG 24;
                        DUP;
                        DUG 25;
                        DIG 5;
                        DUP;
                        DUG 6;
                        GET;
                        IF_NONE
                          { PUSH string "GetNoneValue";
                            FAILWITH }
                          {  };
                        CDR;
                        CAR;
                        PAIR;
                        UNPAIR;
                        DIP { UNPAIR };
                        UNPAIR;
                        DIP { SWAP };
                        MUL;
                        DIP { MUL };
                        PAIR;
                        DIG 15;
                        DUP;
                        DUG 16;
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
                        PAIR;
                        PAIR;
                        EXEC;
                        DIG 9;
                        DUP;
                        DUG 10;
                        UNIT;
                        RIGHT unit;
                        RIGHT (or unit unit);
                        RIGHT unit;
                        DIG 17;
                        DUP;
                        DUG 18;
                        DIG 25;
                        DUP;
                        DUG 26;
                        DIG 6;
                        DUP;
                        DUG 7;
                        GET;
                        IF_NONE
                          { PUSH string "GetNoneValue";
                            FAILWITH }
                          {  };
                        CDR;
                        CAR;
                        PAIR;
                        UNPAIR;
                        DIP { UNPAIR };
                        UNPAIR;
                        DIP { SWAP };
                        MUL;
                        DIP { MUL };
                        PAIR;
                        DIG 16;
                        DUP;
                        DUG 17;
                        DIG 5;
                        DUP;
                        DUG 6;
                        GET;
                        IF_NONE
                          { PUSH string "GetNoneValue";
                            FAILWITH }
                          {  };
                        CDR;
                        CAR;
                        PAIR;
                        PAIR;
                        EXEC;
                        DIG 10;
                        DUP;
                        DUG 11;
                        UNIT;
                        RIGHT unit;
                        RIGHT (or unit unit);
                        RIGHT unit;
                        DIG 17;
                        DUP;
                        DUG 18;
                        DIG 26;
                        DUP;
                        DUG 27;
                        DIG 7;
                        DUP;
                        DUG 8;
                        GET;
                        IF_NONE
                          { PUSH string "GetNoneValue";
                            FAILWITH }
                          {  };
                        CDR;
                        CAR;
                        PAIR;
                        UNPAIR;
                        DIP { UNPAIR };
                        UNPAIR;
                        DIP { SWAP };
                        MUL;
                        DIP { MUL };
                        PAIR;
                        DIG 17;
                        DUP;
                        DUG 18;
                        DIG 6;
                        DUP;
                        DUG 7;
                        GET;
                        IF_NONE
                          { PUSH string "GetNoneValue";
                            FAILWITH }
                          {  };
                        CAR;
                        PAIR;
                        PAIR;
                        EXEC;
                        AND;
                        AND;
                        IF
                          { DIG 16;
                            DUP;
                            DUG 17;
                            DIG 22;
                            DUP;
                            DUG 23;
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
                            DIP { DIG 3; DROP };
                            DUG 3 }
                          {  };
                        DROP }
                      {  };
                    DROP 2 };
             DUP;
             DIG 4;
             DUP;
             DUG 5;
             ADD;
             DIP { DIG 3; DROP };
             DUG 3;
             DIG 3;
             DUP;
             DUG 4;
             DIP { DIG 4; DROP };
             DUG 4;
             DROP 4;
             DUG 14;
             DROP 14 };
         NIL operation;
         DIG 3;
         UNPAIR;
         DIP { UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP };
         IF_LEFT
           { DROP;
             DIG 17;
             DUP;
             DUG 18;
             SENDER;
             COMPARE;
             EQ;
             NOT;
             IF
               { PUSH string "InvalidCaller";
                 FAILWITH }
               {  };
             AMOUNT;
             DIG 5;
             DUP;
             DUG 6;
             ADD;
             DIP { DIG 4; DROP };
             DUG 4;
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
               { UNPAIR;
                 SWAP;
                 UNPAIR;
                 SWAP;
                 UNPAIR;
                 SWAP;
                 DIG 4;
                 DUP;
                 DUG 5;
                 DIG 4;
                 DUP;
                 DUG 5;
                 MEM;
                 IF
                   { PUSH string "KeyAlreadyExists";
                     FAILWITH }
                   { DIG 4;
                     DUP;
                     DUG 5;
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
                     SOME;
                     DIG 5;
                     DUP;
                     DUG 6;
                     UPDATE;
                     DIP { DIG 4; DROP };
                     DUG 4 };
                 DROP 4;
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
                     DIG 16;
                     DUP;
                     DUG 17;
                     SENDER;
                     COMPARE;
                     EQ;
                     NOT;
                     IF
                       { PUSH string "InvalidCaller";
                         FAILWITH }
                       {  };
                     DIG 3;
                     DUP;
                     DUG 4;
                     DUP;
                     PUSH nat 0;
                     COMPARE;
                     EQ;
                     IF
                       { DIG 15;
                         DUP;
                         DUG 16;
                         AMOUNT;
                         COMPARE;
                         EQ;
                         IF
                           { DIG 19;
                             DUP;
                             DUG 20;
                             DIG 19;
                             DUP;
                             DUG 20;
                             CONTRACT unit;
                             IF_NONE
                               { PUSH string "BadContract";
                                 FAILWITH }
                               {  };
                             AMOUNT;
                             UNIT;
                             TRANSFER_TOKENS;
                             CONS;
                             DIP { DIG 19; DROP };
                             DUG 19;
                             PUSH nat 2;
                             DIP { DIG 4; DROP };
                             DUG 4 }
                           {  } }
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
                         DIG 17;
                         DUP;
                         DUG 18;
                         SENDER;
                         COMPARE;
                         EQ;
                         DIG 17;
                         DUP;
                         DUG 18;
                         SENDER;
                         COMPARE;
                         EQ;
                         OR;
                         NOT;
                         IF
                           { PUSH string "InvalidCaller";
                             FAILWITH }
                           {  };
                         DIG 3;
                         DUP;
                         DUG 4;
                         DUP;
                         PUSH nat 0;
                         COMPARE;
                         EQ;
                         IF
                           { PUSH nat 1;
                             DIP { DIG 4; DROP };
                             DUG 4 }
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
                             DIG 16;
                             DUP;
                             DUG 17;
                             SENDER;
                             COMPARE;
                             EQ;
                             NOT;
                             IF
                               { PUSH string "InvalidCaller";
                                 FAILWITH }
                               {  };
                             DIG 3;
                             DUP;
                             DUG 4;
                             DUP;
                             PUSH nat 2;
                             COMPARE;
                             EQ;
                             IF
                               { DIG 20;
                                 DUP;
                                 DUG 21;
                                 DIG 22;
                                 DUP;
                                 DUG 23;
                                 NOW;
                                 PAIR;
                                 DIG 15;
                                 DUP;
                                 DUG 16;
                                 PAIR;
                                 DIG 5;
                                 DUP;
                                 DUG 6;
                                 PAIR;
                                 DIG 3;
                                 DUP;
                                 DUG 4;
                                 PAIR;
                                 DIG 13;
                                 DUP;
                                 DUG 14;
                                 PAIR;
                                 DIG 12;
                                 DUP;
                                 DUG 13;
                                 PAIR;
                                 DIG 11;
                                 DUP;
                                 DUG 12;
                                 PAIR;
                                 DIG 17;
                                 DUP;
                                 DUG 18;
                                 PAIR;
                                 DIG 14;
                                 DUP;
                                 DUG 15;
                                 PAIR;
                                 DIG 10;
                                 DUP;
                                 DUG 11;
                                 PAIR;
                                 DIG 9;
                                 DUP;
                                 DUG 10;
                                 PAIR;
                                 DIG 8;
                                 DUP;
                                 DUG 9;
                                 PAIR;
                                 DIG 4;
                                 DUP;
                                 DUG 5;
                                 PAIR;
                                 EXEC;
                                 DIG 6;
                                 DUP;
                                 DUG 7;
                                 COMPARE;
                                 LT;
                                 IF
                                   { PUSH nat 3;
                                     DIP { DIG 4; DROP };
                                     DUG 4 }
                                   {  } }
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
                             DIG 17;
                             DUP;
                             DUG 18;
                             SENDER;
                             COMPARE;
                             EQ;
                             NOT;
                             IF
                               { PUSH string "InvalidCaller";
                                 FAILWITH }
                               {  };
                             DIG 3;
                             DUP;
                             DUG 4;
                             DUP;
                             PUSH nat 2;
                             COMPARE;
                             EQ;
                             IF
                               { DIG 20;
                                 DUP;
                                 DUG 21;
                                 DIG 22;
                                 DUP;
                                 DUG 23;
                                 NOW;
                                 PAIR;
                                 DIG 15;
                                 DUP;
                                 DUG 16;
                                 PAIR;
                                 DIG 5;
                                 DUP;
                                 DUG 6;
                                 PAIR;
                                 DIG 3;
                                 DUP;
                                 DUG 4;
                                 PAIR;
                                 DIG 13;
                                 DUP;
                                 DUG 14;
                                 PAIR;
                                 DIG 12;
                                 DUP;
                                 DUG 13;
                                 PAIR;
                                 DIG 11;
                                 DUP;
                                 DUG 12;
                                 PAIR;
                                 DIG 17;
                                 DUP;
                                 DUG 18;
                                 PAIR;
                                 DIG 14;
                                 DUP;
                                 DUG 15;
                                 PAIR;
                                 DIG 10;
                                 DUP;
                                 DUG 11;
                                 PAIR;
                                 DIG 9;
                                 DUP;
                                 DUG 10;
                                 PAIR;
                                 DIG 8;
                                 DUP;
                                 DUG 9;
                                 PAIR;
                                 DIG 4;
                                 DUP;
                                 DUG 5;
                                 PAIR;
                                 EXEC;
                                 DIG 6;
                                 DUP;
                                 DUG 7;
                                 COMPARE;
                                 GE;
                                 IF
                                   { PUSH nat 4;
                                     DIP { DIG 4; DROP };
                                     DUG 4 }
                                   {  } }
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
                             PAIR } } } } };
         DIP { DROP 2 } };
}
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
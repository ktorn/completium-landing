---
id: template6
title: Zero-Coupon bond
sidebar_label: Zero-Coupon bond
slug: /templates/zcb
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

A <a href='https://en.wikipedia.org/wiki/Zero-coupon_bond' target='_blank'>Zero-Coupon</a> bond is a bond in which the face value is repaid some predefined time after it has been released (maturity time).

In this contract, the present value of the bond (value at which the bond is traded) is computed as the face value (value at which the bond is redeemed at maturity time) minus a discount percent of face value.

A detailed presentation of the process is available in the <Link to='/docs/dapp-zcb/'>Zero-Coupon Bond</Link> DApp example.
## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `issuer` | `address` | Bond issuer's address. |
| `subscriber` | `address` | Bond subscriber's address. |
| `facevalue` | `tez` | Value at which the bond is redeemed at maturity time. |
| `discout` | `rational` | Discount applied to `facevalue` to compute present value (at emission) |
| `maturityduration` | `duration` | Duration before maturity time. |
| `paybackduration` | `duration` | Duration of payback period after maturity date |
| `issuersigned` | `bool` | `true` is issuer has signed, `false` otherwise. |
| `subscribersigned` | `bool` | `true` is subscriber has signed, `false` otherwise. |
| `_state` | `states` | One of `Created`, `Signed`, `Terminated`, `Disputed` |
### Entrypoints

| Name | Parameters | Description |
| -- | -- | -- |
| `toSigned` | | Called by `sign` to set contract's state to `Signed`.  |
| `sign` | | Called by `issuer` or `subscriber`. `subscriber` must transfer the present value to the contract. |
|  `terminate` | | Called by `issuer` during payback period, to transfer the face value to `subscriber`. |
| `dispute` | | Called by `subscriber` if `issuer` has not terminated the contract in the payback period. |
## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
  ]}>

<TabItem value="archetype">

```archetype title="zcb.arl"
archetype zero_coupon_bond (
  issuer : address,
  subscriber : address,
  facevalue : tez,
  discount : rational,
  maturityduration : duration,
  paybackduration  : duration,
  issuersigned : bool,
  subscribersigned : bool
)

variable signaturedate    : option<date> = none

states =
  | Created initial
  | Signed
  | Terminated
  | Disputed

transition toSigned() {
  called by selfaddress
  from Created to Signed with effect {
    signaturedate := some(now)
  }
}

entry sign () {
  if caller = issuer then
    issuersigned := true
  else if caller = subscriber then begin
    subscribersigned := true;
    var presentvalue = discount * facevalue;
    dorequire(transferred >= presentvalue, "SUBSCRIBER_INVALID_TRANSFERRED");
    transfer presentvalue to issuer;
  end
  else fail("CALLER_NOT_A_SIGNER");
  if issuersigned and subscribersigned then
    transfer 0tz to entry self.toSigned();
}

transition terminate () {
  called by issuer
  from Signed to Terminated when {
    match signaturedate with
    | some(d) ->
      d + maturityduration <=  now <= d + maturityduration + paybackduration and
      transferred >= facevalue
    | none -> false
    end
  } with effect {
    transfer facevalue to subscriber
  }
}

transition dispute () {
  called by subscriber
  from Signed to Disputed when {
    match signaturedate with
    | some(d) ->
      d + maturityduration + paybackduration <=  now
    | none -> false
    end
  }
}
```

</TabItem>

<TabItem value="michelson">

```js
# (Pair issuer (Pair subscriber (Pair facevalue (Pair discount (Pair maturityduration (Pair paybackduration (Pair issuersigned (Pair subscribersigned (Pair None 0)))))))))
{
  storage (pair (address %issuer) (pair (address %subscriber) (pair (mutez %facevalue) (pair (pair %discount int nat) (pair (int %maturityduration) (pair (int %paybackduration) (pair (bool %issuersigned) (pair (bool %subscribersigned) (pair (option %signaturedate timestamp) (nat %_state))))))))));
  parameter (or (unit %toSigned) (or (unit %sign) (or (unit %terminate) (unit %dispute))));
  code { NIL operation;
         DIG 1;
         UNPAIR;
         DIP { UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP };
         IF_LEFT
           { DROP;
             SELF;
             ADDRESS;
             SENDER;
             COMPARE;
             EQ;
             NOT;
             IF
               { PUSH string "InvalidCaller";
                 FAILWITH }
               {  };
             DUP;
             DUP;
             PUSH nat 0;
             COMPARE;
             EQ;
             IF
               { NOW;
                 SOME;
                 DIP { DIG 2; DROP };
                 DUG 2;
                 PUSH nat 1;
                 DIP { DIG 1; DROP };
                 DUG 1 }
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
             DIG 1;
             PAIR }
           { IF_LEFT
               { DROP;
                 DIG 9;
                 DUP;
                 DUG 10;
                 SENDER;
                 COMPARE;
                 EQ;
                 IF
                   { PUSH bool True;
                     DIP { DIG 3; DROP };
                     DUG 3 }
                   { DIG 8;
                     DUP;
                     DUG 9;
                     SENDER;
                     COMPARE;
                     EQ;
                     IF
                       { PUSH bool True;
                         DIP { DIG 2; DROP };
                         DUG 2;
                         DIG 7;
                         DUP;
                         DUG 8;
                         DIG 7;
                         DUP;
                         DUG 8;
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
                         DUP;
                         AMOUNT;
                         COMPARE;
                         GE;
                         NOT;
                         IF
                           { PUSH string "SUBSCRIBER_INVALID_TRANSFERRED";
                             FAILWITH }
                           {  };
                         DIG 11;
                         DUP;
                         DUG 12;
                         DIG 11;
                         DUP;
                         DUG 12;
                         CONTRACT unit;
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         DIG 2;
                         DUP;
                         DUG 3;
                         UNIT;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 11; DROP };
                         DUG 11;
                         DROP }
                       { PUSH string "CALLER_NOT_A_SIGNER";
                         FAILWITH } };
                 DIG 2;
                 DUP;
                 DUG 3;
                 DIG 4;
                 DUP;
                 DUG 5;
                 AND;
                 IF
                   { DIG 10;
                     DUP;
                     DUG 11;
                     SELF;
                     ADDRESS;
                     CONTRACT %toSigned unit;
                     IF_NONE
                       { PUSH string "BadContract";
                         FAILWITH }
                       {  };
                     PUSH mutez 0;
                     UNIT;
                     TRANSFER_TOKENS;
                     CONS;
                     DIP { DIG 10; DROP };
                     DUG 10 }
                   {  };
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
                     DIG 9;
                     DUP;
                     DUG 10;
                     SENDER;
                     COMPARE;
                     EQ;
                     NOT;
                     IF
                       { PUSH string "InvalidCaller";
                         FAILWITH }
                       {  };
                     DUP;
                     DUP;
                     PUSH nat 1;
                     COMPARE;
                     EQ;
                     IF
                       { DIG 2;
                         DUP;
                         DUG 3;
                         IF_NONE
                           { PUSH bool False }
                           { DIG 9;
                             DUP;
                             DUG 10;
                             AMOUNT;
                             COMPARE;
                             GE;
                             DIG 7;
                             DUP;
                             DUG 8;
                             DIG 9;
                             DUP;
                             DUG 10;
                             DIG 3;
                             DUP;
                             DUG 4;
                             ADD;
                             ADD;
                             NOW;
                             COMPARE;
                             LE;
                             NOW;
                             DIG 10;
                             DUP;
                             DUG 11;
                             DIG 4;
                             DUP;
                             DUG 5;
                             ADD;
                             COMPARE;
                             LE;
                             AND;
                             AND;
                             SWAP;
                             DROP };
                         IF
                           { DIG 11;
                             DUP;
                             DUG 12;
                             DIG 10;
                             DUP;
                             DUG 11;
                             CONTRACT unit;
                             IF_NONE
                               { PUSH string "BadContract";
                                 FAILWITH }
                               {  };
                             DIG 10;
                             DUP;
                             DUG 11;
                             UNIT;
                             TRANSFER_TOKENS;
                             CONS;
                             DIP { DIG 11; DROP };
                             DUG 11;
                             PUSH nat 2;
                             DIP { DIG 1; DROP };
                             DUG 1 }
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
                     DIG 1;
                     PAIR }
                   { DROP;
                     DIG 8;
                     DUP;
                     DUG 9;
                     SENDER;
                     COMPARE;
                     EQ;
                     NOT;
                     IF
                       { PUSH string "InvalidCaller";
                         FAILWITH }
                       {  };
                     DUP;
                     DUP;
                     PUSH nat 1;
                     COMPARE;
                     EQ;
                     IF
                       { DIG 2;
                         DUP;
                         DUG 3;
                         IF_NONE
                           { PUSH bool False }
                           { NOW;
                             DIG 7;
                             DUP;
                             DUG 8;
                             DIG 9;
                             DUP;
                             DUG 10;
                             DIG 3;
                             DUP;
                             DUG 4;
                             ADD;
                             ADD;
                             COMPARE;
                             LE;
                             SWAP;
                             DROP };
                         IF
                           { PUSH nat 3;
                             DIP { DIG 1; DROP };
                             DUG 1 }
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
                     DIG 1;
                     PAIR } } } };
}
```

</TabItem>

</Tabs>
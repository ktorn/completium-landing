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
  issuer : role,
  subscriber : role,
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

```

</TabItem>

</Tabs>
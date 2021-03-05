---
id: zcb9
title: Implementation
sidebar_label: Implementation
slug: /dapp-zcb/implementation
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';


## Sign

The `sign` entry point tests whether the caller is a signer:

```archetype {2,4,11}
entry sign () {
  if caller = issuer then
    issuersigned := true
  else if caller = subscriber then begin
    subscribersigned := true;
    var presentvalue = (1 - discount) * facevalue;
    dorequire(transferred >= presentvalue, "SUBSCRIBER_INVALID_TRANSFERRED");
    transfer presentvalue to issuer;
  end else fail("CALLER_NOT_A_SIGNER");
  if issuersigned and subscribersigned then
    transfer 0tz to entry self.toSigned();
}
```

If parties have signed, the transition to *Signed* is triggered with an internal call to `toSigned` (line 12).

## Terminate

Transition to *Terminated* is validated if transferred amount and date are valid:

```archetype {6,7}
transition terminate () {
  called by issuer
  from Signed to Terminated when {
    match_option signaturedate with
    | some(d) ->
      d + maturityduration <=  now <= d + maturityduration + paybackduration and
      transferred >= facevalue
    | none -> false
    end
  } with effect {
    transfer facevalue to subscriber
  }
}
```

## Dispute

Transition to 'Disputed' is possible if in *Signed* state after payback period:

```archetype {6}
transition dispute () {
  called by subscriber
  from Signed to Disputed when {
    match_option signaturedate with
    | some(d) ->
      d + maturityduration + paybackduration <=  now
    | none -> false
    end
  }
}
```
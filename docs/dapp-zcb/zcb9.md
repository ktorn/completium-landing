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

```archetype
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
```

## Terminate

```archetype
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

```archetype
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
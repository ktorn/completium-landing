---
id: escrow9
title: Implementation
sidebar_label: Implementation
slug: /dapp-escrow/implementation
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

## Complete

```archetype
transition complete () {
  called by buyer
  from Funded
  to Completed
  with effect {
    transfer price                  to seller;
    transfer (taxrate * price)      to taxcollector;
    transfer (securityrate * price) to buyer;
  }
}
```
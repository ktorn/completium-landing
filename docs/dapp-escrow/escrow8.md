---
id: escrow8
title: Interface
sidebar_label: Interface
slug: /dapp-escrow/interface
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';


## Storage

```archetype
variable seller       : role = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw
```

```archetype
variable buyer        : role = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw
```

```archetype
variable taxcollector : role = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw
```

```archetype
variable price        : tez = 0tz
```

```archetype
constant taxrate      : rational = 20%
```

```archetype
constant securityrate : rational = 110%
```

```archetype
constant deadline     : date = now + 1d
```

```archetype
states =
 | Created initial
 | Aborted
 | Funded
 | InTransit
 | Completed
```

## Entry points

```archetype
transition abortCreated () {
  called by buyer
  from Created
  to Aborted
}
```

```archetype
transition abortFunded () {
  called by buyer
  from Funded
  to Aborted
}
```

```archetype
transition abort () {
  from any
  to Aborted when { now > deadline }
}
```

```archetype
transition fund () {
  called by buyer
  from Created
  to Funded when { transferred >= (100% + taxrate + securityrate) * price }
}
```

```archetype
transition complete () {
  called by buyer
  from Funded
  to Completed
  with effect {
    ...
  }
}
```

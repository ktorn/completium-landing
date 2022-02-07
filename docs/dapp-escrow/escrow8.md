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
variable seller       : address = @tz1h4CiqWxNe4UxSpkwXy617RM6DaK6NU76P
```

```archetype
variable buyer        : address = @tz1h4CiqWxNe4UxSpkwXy617RM6DaK6NU76P
```

```archetype
variable taxcollector : address = @tz1h4CiqWxNe4UxSpkwXy617RM6DaK6NU76P
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

### Transitions

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

### Fund

```archetype
transition fund () {
  called by buyer
  from Created
  to Funded when { transferred >= (100% + taxrate + securityrate) * price }
}
```

### Complete

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

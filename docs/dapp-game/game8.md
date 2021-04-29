---
id: game8
title: Interface
sidebar_label: Interface
slug: /dapp-game/interface
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

## Storage

```archetype
variable organizer : address = @tz1NUKyDbQtSu4g1bgpwgvwqTeggbtKrNkdv
```

```archetype
variable prize : tez = 10tz
```

```archetype
constant oracle : key = "edpkv9k8WZNMyEMuLLVwQfGDqm4pfxSEkTmvgq5DakPUnNbNnQuB14"
```

```archetype
constant noncelength : nat = 8
```

```archetype
asset submission {
  competitor : address;
  score      : nat;
  timestamp  : date;
}
```

```
states =
 | Created     initial
 | InProgress
 | Done
 | Closed
```

## Entry points

### Confirm

```archetype
transition confirm () {
  called by organizer
  from Created
  to InProgress when { transferred = prize }
}
```

### Submit

```archetype
entry submit (packed_score : bytes, signed_score : signature) {
    ...
}
```

### Decide

```archetype
transition decide () {
  called by organizer
  from InProgress
  to Done
  with effect {
      ...
  }
}
```


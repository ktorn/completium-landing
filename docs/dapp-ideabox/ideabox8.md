---
id: ideabox8
title: Interface
sidebar_label: Interface
slug: /dapp-ideabox/interface
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

## Storage

```archetype
constant chairman : address = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw
```


```archetype
states =
| Activated initial
| Terminated
```

```archetype
asset idea {
  id       : nat;
  title    : bytes;
  desc     : bytes;
  nbvotes  : nat = 0;
  creation : date;
  author   : address;
}
```

```archetype
asset voter {
  addr      : address;
  remaining : nat = 5;
}
```


```archetype
asset selected {
  sid : nat;
}
```

## Entry points

### Register

```archetype
entry register (a_voter : address) {
  called by chairman
  ...
}
```

### Add idea

```archetype
entry add_idea(ititle : bytes, description : bytes) {
    ...
}
```

### Vote

```archetype
entry vote(n : nat, weight : nat) {
    ...
}
```

### Terminate

```archetype
 transition terminate () {
  called by chairman
  from Activated
  to Terminated
  with effect {
    ...
  }
 }
```
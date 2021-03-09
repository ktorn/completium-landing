---
id: ideabox9
title: Implementation
sidebar_label: Implementation
slug: /dapp-ideabox/implementation
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

## Register

```archetype
entry register (a_voter : address) {
  called by chairman
  require {
    r0 : state = Activated;
  }
  effect { voter.add({ addr = a_voter }) }
}
```

## Add idea

```archetype
entry add_idea(ititle : bytes, description : bytes) {
  require {
    r1 : state = Activated;
  }
  effect {
    idea.add({
      id = idea.count();
      title = ititle;
      desc = description;
      creation = now;
      author = caller
    })
  }
}
```

## Vote

```archetype
entry vote(n : nat, weight : nat) {
  require {
    r2 : voter.contains(caller);
    r3 : voter[caller].remaining >= weight;
    r4 : state = Activated;
  }
  effect {
    voter[caller].remaining -= weight;
    idea[n].nbvotes += weight;
  }
}
```

## Terminate

```archetype
transition terminate () {
  called by chairman
  from Activated
  to Terminated
  with effect {
    for i in idea.select(the.nbvotes >= 5).sort(desc(nbvotes)).head(3) do
        selected.add({i})
    done
  }
}
```


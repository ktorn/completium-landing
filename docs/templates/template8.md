---
id: template8
title: Idea box
sidebar_label: Idea box
slug: /templates/ideabox
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

This contract is a process to propose ideas and to select the best ones. You can see this contract in action in the <Link to='/docs/dapp-ideabox/'>Idea Box</Link> DApp example.
## API

### Storage

Ideas data (title and description) are stored as `bytes`.

| Name | Type | Description |
| -- | -- | -- |
| `chairman` | `address` | Address of the box's chairman |
| `maxvotes` | `nat` | Maximum number of votes per voter. |
| `idea` | `collection` | An idea is defined by:<ul><li>an identifier (key)</li><li>a title</li><li>a description</li><li>a number of votes</li><li>a creation date</li><li>the author's address</li></ul>
| `voter` | `collection` | A voter is defined by:<ul><li>an address (key)</li><li>a number of remaining votes</li></ul>
| `selected` | `collecter` | This is the collection of selected ideas. |
| `_state` | `states` | Box state, one of `Activated`, `Terminated`. |

### Entrypoints

| Name | Parameters | Description |
| -- | -- | -- |
| `register` | `a` | Called by `chairman` to register a new voter at address `a` and remaining votes at `maxvotes`. |
| `add_idea` | `ititle`, `description` | Adds an idea in the box if box not terminated (*anyone* can add an idea). |
| `vote` | `n`, `weight` | Called by a voter to increment by `weight` the number of votes of idea `n`. It fails if box is terminated. |
| `terminate` | | Called by `chairman` to close the box and select the top 3 best ideas with numbers of votes above `maxvotes`. |

## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="archetype">

```archetype title="ideabox.arl"
archetype ideasbox(chairman : address, maxvotes : nat)

states =
| Activated initial
| Terminated

asset idea {
  id       : nat;
  title    : bytes;
  desc     : bytes;
  nbvotes  : nat = 0;
  creation : date;
  author   : address;
}

asset voter {
  addr      : address;
  remaining : nat = maxvotes;
}

asset selected {
  sid : nat;
}

entry register (a_voter : address) {
  called by chairman
  require {
    r0 : state = Activated;
  }
  effect { voter.add({ addr = a_voter }) }
}

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

transition terminate () {
  called by chairman
  from Activated
  to Terminated
  with effect {
    for i in idea.select(the.nbvotes > maxvotes).sort(desc(nbvotes)).head(3) do
        selected.add({i})
    done
  }
}
```

</TabItem>

<TabItem value="michelson">

```js

```

</TabItem>


<TabItem value="specification">

```archetype
specification entry vote (n : nat, weight : nat) {
  postcondition p1 {
    let some v = voter[caller] in
    let some bv = before.voter[caller] in
      v.remaining = bv.remaining - weight
    otherwise true otherwise true
  }
}

specification {
  i1 : 5 * voter.count() = idea.sum(nbvotes) + voter.sum(remaining)
}
```

</TabItem>

</Tabs>
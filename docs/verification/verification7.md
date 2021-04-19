---
id: verification7
title: Invariant
sidebar_label: Invariant
slug: /verification/invariant
hide_title: false
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An invariant is a property of the contract state (storage, balance) that is always true, regardless of the history of calls to the contract.

If there are *E* entrypoints in the contract, <Link to='http://why3.lri.fr/'>Why3</Link> will automatically generate *E+1* proof obligations out of one invariant:
* one for the initial storage value: the invariant is true at the contract origination
* one per entrypoint to prove the invariant as a postcondition, assuming the property holds before entrypoint execution

There is no systemic method to establish contract invariants. You need to figure them out case by case by aksing "what do entrypoints preserve?" or "which relations hold between storage variables?" Below is a presentation of two principles you can use to figure out invariants.

## Conservation

In these examples, the invariant comes from the fact that information is transfered by entrypoints from one place to the other in the contract storage. It is then possible to write a global conservation equation.

The invariant of the <Link to='/docs/templates/fa12'>FA 1.2</Link> contract states that the total number of tokens is a constant. Indeed tokens are transferred from one account to the other, but the total number of tokens is conserved, no token is minted or lost:

```archetype
specification {
  i: ledger.sum(tokens) = totalsupply;
}
```

The invariant of the <Link to='/docs/templates/ideabox'>Idea Box</Link> contract is a conservation equation between maximum number of votes per voter, the actual number of votes received by ideas, and the remaining number of votes per voter.

```archetype
specification {
  i1 : maxvotes * voter.count() = idea.sum(nbvotes) + voter.sum(remaining)
}
```

Note that the invariant is global and that it is not possible in this case to state the conservation principle at the voter level, because the contract does not store the information of which voter voted for which idea.

## Accumulation

### Example
In this example, the invariant comes from the fact that an information is the accumulation of other information as a result of calls to entrypoints. It is then possible to write an accumulation equation.

Say the contract is selling non fungible tokens, and each time a token is sold, the balance is increased by a percent of the token fixed price, the fee. Say the information is stored in an asset collection `ledger` defined as:

```archetype
variable fee : rational = 0.003

asset ledger {
  id        : string,
  price     : tez,
  sellcount : nat = 0
}
```

`sellcount` is the number of times the token has been sold.

The contract invariant is then the formula for the balance:

```archetype
balance = fee * ledger.sum(sellcount * price)
```

### Shadow variables

If an information is missing to express the invariant, it is possible to use *shadow variables*: they do not appear in the final contract storage or code, while they are available in specification.

Typically the `sellcount` field in the above example is a pure accumulation variable only used the invariant formula. It is then better not to have it as a real field and pay for its storage, and turn it into a shadow field.

The following shows how to declare `sellcount` as a shadow field:

```archetype
asset ledger {
  id        : string,
  price     : tez
} shadow {
  sellcount : int = 0;
}
```

Shadow variables cannot be used in entrypoints' effect. It can only be used in dedicated shadow effect sections. Shadow effects are virtually executed *after* the entrypoint section.

In this case, the `sell` entrypoint declares such a section to accumulate the number of times a card is sold:

```archetype
entry sell(i : string) {
  specification {
    shadow effect {
      ledger[i].sellcount += 1
    }
  }
  effect {
    ...
  }
}
```

With shadow variables it is possible to accumulate what is necessary to formulate the invariant. In the Box Idea contract presented above, it would be possible to add an field in the `voter` asset that stores the sum of weights:

```archetype
asset voter {
  addr        : address;
  remaining   : nat = maxvotes;
} shadow {
  totalweight : nat = 0;
}
```

The `vote` entrypoint would have a shadow effect to store the idea's id:

```archetype
entry vote(n : nat, weight : nat) {
  specification {
    shadow effect {
      voter[caller].totalweight += weight
    }
  }
  effect {
    ...
  }
}
```

The invariant may then use this shadow information to express maximum vote conservation at voter's level:

```archetype
forall v in voter,
  v.maxvotes = v.totalweight + v.remaining
```

---
id: template12
title: Miles
sidebar_label: Miles
slug: /templates/miles
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `admin` | `address` | Admin address to call `add` entrypoint. |
| `mile` | `collection` | A mile is defined by:<ul><li>id</li><li>amount</li><li>expiration date</li></ul> |
| `owner` | `collection` | A mile owner is defined by:<ul><li>an address</li><li>a collection of `mile`</li></ul><p />A mile is owned by one and only one owner: this is ensured by the use of `partition` collection type (see <Link to='/docs/templates/miles#code'>code</Link> below). |

### Entrypoints

| Name | Parameters | Description |
| -- | -- | -- |
| `add` | `ow`, `nm_id`, `nm_amount`, `nm_exp` | Called by `admin` to grant owner `ow` with `nm_amount` miles that expire on `nm_exp`. |
| `consume` | `ow`, `quantity` | Called by `admin` to consume `quantity` valid miles (ie. miles with expiration date in the future) from owner `ow`.
| `clear_expired` | | Removes expired miles. |

## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="archetype">

```archetype title="miles.arl"
archetype miles(admin : address)

asset mile identified by id {
   id         : string;
   amount     : nat;
   expiration : date
}

asset owner identified by addr {
  addr  : role;
  miles : partition<mile> = []
}

entry add (
  ow        : address,
  nm_id     : string,
  nm_amount : nat,
  nm_exp    : date) {
   called by admin
   failif {
     c2 : mile.contains(newmile_id);
   }
   effect {
     owner.addupdate (ow, { miles += [{
       id         = nm_id;
       amount     = nm_amount;
       expiration = nm_exp
      }] })
   }
}

entry consume (ow : address, quantity : nat) {
  called by admin
  effect {
    var view = owner[ow].miles.sort(expiration).select(the.expiration >= now);
    dorequire (view.sum(the.amount) >= quantity, "NotEnoughMiles");
    var remainder = quantity;
    for : loop m in view do
      if remainder > 0 then begin
        if mile[m].amount > remainder then begin
          mile.update(m, { amount -= remainder });
          remainder := 0
        end else if mile[m].amount = remainder then begin
          remainder := 0;
          owner[ow].miles.remove(m)
        end else begin
          remainder -= mile[m].amount;
          owner[ow].miles.remove(m)
        end
      end
    done;
    assert p1
  }
}

entry clear_expired () {
  for : loop2 o in owner do
    owner[o].miles.removeif(the.expiration < now)
  done
}
```

</TabItem>

<TabItem value="michelson">

```js

```

</TabItem>


<TabItem value="specification">

```archetype title="miles.arl"
specification asset mile {
  m1: amount > 0;
}

specification entry consume (quantity : int) {
  assert p1 {
      remainder = 0
  }
  postcondition p2 {
    mile.sum(the.amount) = before.mile.sum(the.amount) - quantity
    invariant for loop {
      0 <= remainder <= toiterate.sum(the.amount);
        before.mile.sum(the.amount) = mile.sum(the.amount) + quantity - remainder
    }
  }
  postcondition p3 {
    forall m in removed.mile, m.expiration >= now
    invariant for loop {
      removed.mile.subsetof(by_expiration)
    }
  }
  postcondition p4 {
    added.mile.isempty()
  }
}

specification entry clear_expired () {
  postcondition s3 {
    forall m in removed.mile, m.expiration < now
    invariant for loop2 {
      forall m in removed.mile, m.expiration < now
    }
  }
}
```

</TabItem>

</Tabs>
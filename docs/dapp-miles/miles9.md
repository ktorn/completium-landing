---
id: miles9
title: Implementation
sidebar_label: Implementation
slug: /dapp-miles/miles-contract-implementation
---

### Add

```archetype
entry add (
    ow                 : address,
    newmile_id         : string,
    newmile_amount     : nat,
    newmile_expiration : date) {
   called by admin
   failif {
     c2 : mile.contains(newmile_id);
   }
   effect {
    owner.addupdate (ow, { miles += [{
         id = newmile_id;
         amount = newmile_amount;
         expiration = newmile_expiration
        }]
    })
   }
}

```
### Consume

```archetype
entry consume (quantity : nat) {
  effect {
    var miles = owner[caller].miles.sort(expiration).select(the.expiration >= now);
    dorequire (miles.sum(the.amount) >= quantity, "NotEnoughMiles");
    var remainder = quantity;
    for : loop m in miles do
      if remainder > 0 then begin
        if mile[m].amount > remainder then begin
          mile.update(m, { amount -= remainder });
          remainder := 0
        end else if mile[m].amount = remainder then begin
          remainder := 0;
          owner[caller].miles.remove(m)
        end else begin
          remainder -= mile[m].amount;
          owner[caller].miles.remove(m)
        end
      end
    done;
    assert p1
  }
}
```

### Clear expired

```archetype
entry clear_expired () {
  called by admin
  effect {
    for : loop2 o in owner do
      owner[o].miles.removeif(the.expiration < now)
    done
  }
}
```
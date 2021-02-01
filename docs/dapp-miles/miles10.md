---
id: miles10
title: Interface
sidebar_label: Interface
slug: /dapp-miles/miles-contract-interface
---

## Storage

```archetype
variable admin : role = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw
```

```archetype
asset mile identified by id {
   id         : string;
   amount     : nat;
   expiration : date
}
```

```archetype
asset owner identified by addr {
  addr  : role;
  miles : partition<mile> = []
}
```

## Entry points

### add

```archetype
entry add (
          ow                 : address,
          newmile_id         : string,
          newmile_amount     : nat,
          newmile_expiration : date) {
  called by admin
  effect { ... }
}
```
### consume

```archetype
entry consume (quantity : nat) {
  ...
}
```

### clear expired

```archetype
entry clear_expired () {
  called by admin
  effect {
    ...
  }
}
```
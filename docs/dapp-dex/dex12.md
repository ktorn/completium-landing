---
id: dex12
title: Implementation
sidebar_label: Implementation
slug: /dapp-dex/fa12implementation
---

## Transfer

```archetype
entry %transfer (%from : address, %to : address, value : nat) {
  require {
    r1 otherwise "NotEnoughBalance" : ledger[%from].tokens >= value;
  }
  effect {
    if caller <> %from then (
      var current = allowance[(%from, caller)].amount;
      dofailif(current < value, ("NotEnoughAllowance", ((value, current))));
      allowance.update((%from, caller), { amount -=  value });
    );
    ledger.update(%from, { tokens -= value });
    ledger.addupdate(%to, { tokens += value });
  }
}
```

## Approve

```archetype
entry approve(spender : address, value : nat) {
  var k = (caller, spender);
  if allowance.contains(k) then (
    var previous = allowance[k].amount;
    dofailif(previous > 0 and value > 0, (("UnsafeAllowanceChange", previous)));
  );
  allowance.addupdate( k, { amount = value });
}
```

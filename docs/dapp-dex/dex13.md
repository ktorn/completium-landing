---
id: dex13
title: Specification
sidebar_label: Specification
slug: /dapp-dex/specification
---

## Invariant

```archetype
ledger.sum(tokens) = totalsupply
```

No token is minted: the total number of tokens is equal to the initial totalsupply number of tokens, regardless of the state of the storage.

## Transfer

When the `%to` address is different from the `%from` address, the number of tokens `%to` possesses is decread by value.

### Effect on `ledger`

#### Effect on `%from` token holder

```archetype
%from <> %to ->
let some before_ledger_from = before.ledger[%from] in
let some after_ledger_from  = ledger[%from] in
  after_ledger_from = { before_ledger_from with
    tokens = abs (before_ledger_from.tokens - value)
  }
otherwise false
otherwise false
```

#### Effect on `%to` token holder

```archetype
%from <> %to ->
let some after_ledger_to = ledger[%to] in
let some before_ledger_to = before.ledger[%to] in
  after_ledger_to = { before_ledger_to with
    tokens = (before_ledger_to.tokens + value)
  }
otherwise
  after_ledger_to = { holder = %to; tokens = value }
otherwise false
```

When the `%to` address is different from the `%from` address, the number of tokens `%to` possesses is increased by value when `%to` is already registered in the ledger, and set to value otherwise. Anyway, `%to` is registered in ledger.

#### No effect on `ledger`

```archetype
%from = %to -> ledger = before.ledger
```

No effect on ledger when `%from` is equal to `%to`.

#### Unchanged `ledger` records

```archetype
forall tokenholder in ledger,
tokenholder.holder <> %from ->
tokenholder.holder <> %to ->
before.ledger[tokenholder.holder] = some(tokenholder)
```

Tokenholders other than `%from` and `%to`, are not modified nor added to ledger.

#### Removed `ledger` records

```archetype
removed.ledger.isempty()
```

No record is removed from ledger.

#### Added `ledger` records

```archetype
let some before_to = before.ledger[%to] in
  added.ledger.isempty()
otherwise
  added.ledger = [ { holder = %to; tokens = value } ]
```

The added record in 'ledger', if any, is the %to record.

### Effect on `allowance`

#### Effect on `(%from,caller)` allowance record

```archetype
caller <> %from ->
let some before_from_caller = before.allowance[(%from,caller)] in
let some after_from_caller = allowance[(%from,caller)] in
  before_from_caller.amount > value ->
  after_from_caller = { before_from_caller with
    amount = abs (before_from_caller.amount - value)
  }
otherwise false
otherwise true
```

When caller is different from `%from`, the amount caller is authorised to spend on the behalf of `%from` is decreased by value if value is striclty greated than the authorized amount.

#### No effect on allowance

```archetype
caller = %from -> allowance = before.allowance
```

No effect on allowance when caller is equal to `%from`.

#### Unchanged allowance records

```archetype
forall a in allowance,
a.addr_owner <> %from and a.addr_spender <> caller ->
before.allowance[(a.addr_owner,a.addr_spender)] = some(a)
```

Allowed amounts other than those associated to `%from` and caller are identical.

#### Added and removed allowance records

```archetype
removed.allowance.isempty() and added.allowance.isempty()
```

No allowance record is added or removed.

### Explicit fail

#### Not Enough Balance

```archetype
fails with (msg : string) :
  let some after_ledger_from = ledger[%from] in
    msg = "NotEnoughBalance" and
    after_ledger_from.tokens < value
  otherwise true
```

When the entry fails with message "NotEnoughBalance", value is stricly greater than the number of tokens of `%to`. Cannot spend more than you own.

#### Not Enough Allowance

```archetype
fails with (msg : string * (nat * nat)) :
  let some after_allowance_from_caller = allowance[(%from,caller)] in
    msg = ("NotEnoughAllowance", (value, after_allowance_from_caller.amount)) and
    caller <> %from and
    after_allowance_from_caller.amount < value
  otherwise false
```

When the entry fails with message "NotEnoughAllowance", caller is different from `%from` and value is stricly greater than the allowed amount for `%from` and caller. A spender cannot spend more than allowed.

### Effect on operations

```archetype
length (operations) = 0
```

No operation generated.

## Approve

### Effect on `ledger`

```archetype
ledger = before.ledger
```

No effect on ledger.

### Effect on `allowance`

#### Effect on `(caller,spender)` allowance record

```archetype
let some after_allowance_caller_spender = allowance[(caller,spender)] in
let some before_allowance_caller_spender = before.allowance[(caller,spender)] in
  after_allowance_caller_spender = { before_allowance_caller_spender with
    amount = value
  }
otherwise
  after_allowance_caller_spender = {
    addr_owner = caller;
    addr_spender = spender;
    amount = value
  }
otherwise false
```

Allowed amount of tokens spendable by spender on the behalf of caller is set to value.

#### Unchanged allowance records

```archetype
forall a in allowance,
(a.addr_owner, a.addr_spender) <> (caller, spender) ->
before.allowance[(a.addr_owner, a.addr_spender)] = some(a)
```

Other allowed amounts than the allowed amount of tokens spendable by spender on the behalf of caller, are unchanged.

#### Added allowance records

```archetype
let some allowance_caller_spender = before.allowance[(caller, spender)] in
  added.allowance.isempty()
otherwise
  added.allowance = [ { addr_owner = caller; addr_spender = spender; amount = value } ]
The added allowance record, if any, is the caller and spender one.
```

#### Removed allowance records

```archetype
removed.allowance.isempty()
```

No record is removed from allowance.

### Explicit fail

```archetype
fails with (msg : (string * nat)) :
let some allowance_caller_spender = allowance[(caller,spender)] in
  msg = ("UnsafeAllowanceChange", allowance_caller_spender.amount) and
  value > 0 and
  allowance_caller_spender.amount > 0
otherwise false
```

When the entry fails with message "UnsafeAllowanceChange", value is strictly greater than 0 and the allowed amount of tokens spendable by spender on the behalf of caller is not equal to zero.
Note that in that case, it may be set back to 0 by having spender call the transfer entry to transfer a number of tokens equal to the remaining allowed amount, from the approver address (ie caller above) to the approver address (ie to itself).
Indeed, according to properties 1.3 and 2.1 of the transfer entry, this has no effect on ledger and sets allowance record to 0.

### Effect on operations

```archetype
length (operations) = 0
```

No operation generated.

## Get allowance

### Effect on `ledger`

```archetype
ledger = before.ledger
```

No effect on ledger.

### Effect on `allowance`

```archetype
allowance = before.allowance
```

No effect on allowance.

### Explicit fail

No explicit fail. The entry implicitely fails though if the provided callback is invalid.

### Effect on operations

```archetype
length (operations) = 1
```

Creates one callback operation.

## Get balance

### Effect on `ledger`

```archetype
ledger = before.ledger
```

No effect on ledger.

### Effect on `allowance`

```archetype
allowance = before.allowance
```

No effect on allowance.

### Explicit fail

No explicit fail. The entry implicitely fails though if the provided callback is invalid.

### Effect on operations

```archetype
length (operations) = 1
```

Creates one callback operation.


## Get total supply

### Effect on `ledger`

```archetype
ledger = before.ledger
```

No effect on ledger.

### Effect on `allowance`

```archetype
allowance = before.allowance
```

No effect on allowance.

### Explicit fail

No explicit fail. The entry implicitely fails though if the provided callback is invalid.

### Effect on operations

```archetype
length (operations) = 1
```

Creates one callback operation.

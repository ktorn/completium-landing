---
id: dex11
title: Interface
sidebar_label: Interface
slug: /dapp-dex/fa12interface
---


## Storage

The contract declares two [assets](https://docs.archetype-lang.org/archetype-language/data-model):

```archetype
asset ledger identified by holder to big_map {
  holder     : address;
  tokens     : nat = 0;
} initialized by {
  { holder = caller; tokens = totalsupply }
}
```
The `ledger` asset is the cap table: it holds the number of tokens for each token holder.
`totalsupply` is the initial number of tokens held by the originator of the contract.

```archetype
asset allowance identified by addr_owner addr_spender to big_map {
  addr_owner       : address;
  addr_spender     : address;
  amount           : nat;
}
```
The `allowance` asset stores the amount of tokens that can be spent by `addr_spender` on the behalf of `addr_owner`.

## Entry points

### Transfer

```archetype
entry %transfer (%from : address, %to : address, value : nat) {
  ...
}
```

### Approve

```archetype
entry approve() {
    ...
}
```

### Get balance

```archetype
getter getAllowance (owner : address, spender : address) : nat {
  return (allowance[(owner, spender)].amount)
}
```

### Get allowance

```archetype
getter getBalance (owner : address) : nat {
  return (ledger[owner].tokens)
}
```

### Get total supply

```archetype
getter getTotalSupply () : nat {
  return totalsupply
}
```

---
id: tuto3
title: Rationals and transfers
sidebar_label: 3. Rationals & Transfers
slug: /dapp-tools/tutorials/archetype-rattrans
---

import Link from '@docusaurus/Link';

The `rational` type is very convenient to implement business formulas.

## Code

In this example, transfer back to the caller 70% of the transferred amount:

```archetype {4}
archetype rat_transfer

entry payback () {
  transfer (70% * transferred) to caller
}
```

`caller` refers to the account address that is calling the entry point, and `transferred` refers to the amount of tez sent to call the entry point.

There are many ways to specify a rational value:

```archetype
var f : rational = 1.1;
var g : rational = -1.1;
var r : rational = 2 / 6;
var t : rational = -2 / 6;
var u : rational = 80%;
var v : rational = 4.2%;
```

## Deploy

The following <Link to='/docs/dapp-tools/completium-cli'>Completium CLI</Link> command deploys the contract on the Tezos network:

```
completium-cli deploy 3-rat_transfer.arl
```

## Call entry point

The following command calls the unique entry point and sends *10tz* to the contract with the `--amount` option:

```
completium-cli call 3-rat_transfer --amount 10
```

## View contract

The following command generates the URL to view the contract in Better call Dev:

```
completium-cli show contract 3-rat_transfer
```

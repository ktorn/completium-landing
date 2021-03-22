---
id: tuto8
title: Calling another Contract
sidebar_label: 8. Calling contract
slug: /dapp-tools/tutorials/archetype-callcontr
---

import DappFigure from '../../DappFigure';
import Link from '@docusaurus/Link';

Can a contract read another contract's storage?

No, not directly. However it is possible to call another contract with the `transfer` instruction we have seen in <Link to='/docs/dapp-tools/tutorials/archetype-datedur'>previous</Link> examples.

It is then possible to setup a mechanism for a smart contract to retrieve a data from another smart contracts, under certain conditions and constraints:
* the smart contract you want to retrieve data from must provide an dedicated entry point to provide the data
* this entry point must accept an argument which is call-back to the calling contract; this call-back is an entry point to be called with the desired data as argument)
* the calling contract must provide a call-back entry point to handle the retreived data

It is indeed possible in Michelson to wrap an entrypoint address in a value and send it to an entry point with the `contract` type.

Archetype provides a high-level syntax for this pattern: the keyword `getter` generates the required entry point and arguments.

## Code

The *called* contract provides a `getter` entry point:

```archetype {9}
archetype contract_called

variable n : nat = 42

getter get_n () { return n }

```

The smart contract uses a variation of the `transfer` instruction to call the `get_n` entry point. The address of the called contract is passed as parameter:

```archetype
archetype contract_caller

variable r : nat = 0

entry set_n(p : nat) {
  r := p
}

entry inspect(addr : address) {
  transfer 0tz to addr call get_n<contract<nat>>(self.set_n)
}
```

A detailed presentation of the `getter` keyword may be found <a href='https://docs.archetype-lang.org/archetype-language/transfers#getter-and-contract' target='_blank'>here</a>.

## Deploy

The following <Link to='/docs/dapp-tools/completium-cli'>Completium CLI</Link> command deploys the contract on the Tezos network:

```
completium-cli deploy 1-hello.arl
```

## Call entry point

The following command calls the unique entry point:

```
completium call 1-hello
```

---
id: miles7
title: Contract origination
sidebar_label: Contract Origination
slug: /dapp-miles/miles-tg-contract
---

import DappFigure from '../DappFigure';

The smart contract is at this location:

`~/completium-dapp-miles/contract/miles_with_expiration.arl`

The contract is written in Archetype language. Go to the Smart contract section for a detailed presentation.

The command line to originate (deploy) the smart contract is:

```bash
$ completium-cli originate ./contract/miles_with_expiration.arl
```

This command triggers two operations:
* the contract compilation to Michelson with archetype compiler
* the Michelson contract origination with Tezos client


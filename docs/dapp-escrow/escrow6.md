---
id: escrow6
title: Contract Compilation
sidebar_label: Contract Compilation
slug: /dapp-escrow/compilation
---

import DappButton from '../DappButton';
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

The smart contract is written in <Link to="/docs/dapp-tools/archetype">Archetype</Link> language. Go to the <Link to="">Smart contract</Link> section for a detailed presentation.


In order to generate the javascript, used in the dapp, here is the <Link to='/docs/dapp-tools/completium-cli#generate-javascript'>command</Link>:

```bash
completium-cli generate javascript ./contract/escrow.arl > ./src/contract.js
```

you can now use contract as below:

```js
import { code, getStorage } from '../contract';
...
tezos.wallet.originate({
      code: code,
      init: getStorage(
        seller,                                // seller
        account,                               // buyer
        taxCollector,                          // taxcollector
        (parseInt(price) * 1000000).toString() // price
      )
    }).send().then(op => {
...

```

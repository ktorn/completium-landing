---
id: zcb6
title: Contract Compilation
sidebar_label: Contract compilation
slug: /dapp-zcb/compilation
---

import DappButton from '../DappButton';
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

The smart contract is written in <a href='https://archetype-lang.org/'>Archetype</a> language. Go to the <Link to="">Smart contract</Link> section for a detailed presentation.


In order to generate the javascript, used in the dapp, here is the <Link to='/docs/cli/contract#generate-javascript'>command</Link>:

```bash
completium-cli generate javascript ./contract/zero_coupon_bond.arl > ./src/contract.js
```

you can now use contract as below:

```js
import { code, getStorage } from '../contract';
...
tezos.wallet.originate({
      code: code,
      init: getStorage(
        zcbState.contractInfo.issueraccount,                         // issuer           : address,
        zcbState.contractInfo.subscriberaccount,                     // subscriber       : address,
        zcbState.contractInfo.faceprice * 1000000,                   // facevalue        : tez,
        mk_rational (parseInt(zcbState.contractInfo.discount), 100), // discount         : rational,
        zcbState.contractInfo.duration * 60,                         // maturityduration : duration,
        zcbState.contractInfo.period * 60,                           // paybackduration  : duration,
        false,                                                       // issuersigned     : bool,
        false                                                        // subscribersigned : bool
        )},
        ).send().then(op => {
...

```

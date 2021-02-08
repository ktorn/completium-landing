---
id: zcb7
title: Interactions
sidebar_label: Interactions
slug: /dapp-zcb/interactions
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';


## Contract origination

`src/components/EditorBar.js` line 42

```js
const handleClick = () => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // Origination 'contract'
    ///////////////////////////////////////////////////////////////////////////
}
```

```js
tezos.wallet.originate({
  code: ZCBContractCode,
  init: getStorage(
    zcbState.contractInfo.issueraccount,
    zcbState.contractInfo.subscriberaccount,
    (parseInt(zcbState.contractInfo.faceprice)*1000000).toString(),
    zcbState.contractInfo.discount,
    "100",
    (parseInt(zcbState.contractInfo.duration)*60).toString(),
    (parseInt(zcbState.contractInfo.period)*60).toString())
}).send().then(op => {
  console.log(`Waiting for confirmation of origination...`);
  props.openSnack();
  return op.contract()
}).then (contract => {
  props.closeSnack();
  setContractAddress(contract.address);
  console.log(`Origination completed for ${contract.address}.`);
}).catch(error => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
```

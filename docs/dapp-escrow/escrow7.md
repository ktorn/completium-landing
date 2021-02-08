---
id: escrow7
title: Interactions
sidebar_label: Interactions
slug: /dapp-escrow/interactions
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';


## Contract origination

`./src/components/escrow.js` line 49

```js
 const handleNext = () => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // Origination 'contract'
    ///////////////////////////////////////////////////////////////////////////
  }
```

```js
tezos.wallet.originate({
  code: EscrowContractCode,
  storage: {
    seller       : seller,
    buyer        : account,
    taxcollector : taxCollector,
    price        : (parseInt(price)*1000000).toString(),
    _state       : "0"
  }
}).send().then(op => {
  console.log(`Waiting for confirmation of origination...`);
  props.openSnack();
  return op.contract()
}).then (contract => {
  props.closeSnack();
  setAddress(contract.address);
  props.handleNext();
  console.log(`Origination completed for ${contract.address}.`);
}).catch(error => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
```


## Fund transaction

`./src/components/escrow.js` line 123

```js
const handleNext = () => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // Call 'fund' entry point
    ///////////////////////////////////////////////////////////////////////////
  }
```

```js
tezos.wallet.at(escrowState.address).then(contract => {
  contract.methods.fund(UnitValue).send({ amount: total.toString() }).then(op => {
    props.openSnack();
    op.receipt().then(() => {
      props.closeSnack();
      setBalance(total.toString());
      props.handleNext();
    })
  })
});
```
## Complete transaction

`./src/components/escrow.js` line 123

```js
const handleNext = () => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // Call 'complete' entry points
    ///////////////////////////////////////////////////////////////////////////
}
```

```js
tezos.wallet.at(escrowState.address).then(contract => {
  contract.methods.complete(UnitValue).send().then(op => {
    props.openSnack();
    op.receipt().then(() => {
      props.closeSnack();
      setBalance(0);
      props.handleNext();
    })
  })
});
```


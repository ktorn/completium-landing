---
id: escrow7
title: Interactions
sidebar_label: Interactions
slug: /dapp-escrow/interactions
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

## Contract origination

`./src/components/escrow.js` line 49

The `HandleNext` component <Link to='/docs/dapp-tools/taquito#contract-origination'>originates</Link> the escrow contract with taquito.

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
  code: code,
  storage: getStorage(
    seller,                              // seller
    account,                             // buyer
    taxCollector,                        // taxcollector
    (parseInt(price)*1000000).toString() // price
  )}
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

Note here that the constants `taxrate`, `securityrate` and `deadline` declared in contract's storage are actually not part of the storage since they are declared as `constant` and inlined in the contract code. Hence they are not required as parameters of `getStorage`.


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


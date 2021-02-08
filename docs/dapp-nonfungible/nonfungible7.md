---
id: nonfungible7
title: Interactions
sidebar_label: Interactions
slug: /dapp-nonfungible/interactions
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';


## Read storage

`src/Apps.js` line 62

```js
if (!isReady()) {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // Read conract storage:
    // * forsales : the list of item for sales
    // * botwallet : list of purchased items
    // call 'setNonFungibleState' to set UI state
    ///////////////////////////////////////////////////////////////////////////
}
```

```js
Tezos.contract
.at(contractAddress)
.then(contract => {
  contract.storage().then(storage => {
    var forsales = [];
    var botwallet = [];
    // operator is an array
    storage.operator.forEach(element => {
      forsales.push(element[1].toString());
    });
    // ledger is a map
    // read ledger for ownership information
    if (ready) {
      storage.ledger.forEach((l,k,m) => {
        if(l === accountAddress) {
          botwallet.push(k);
        }
      })
    }
    setNonFungibleState({
      forsales  : forsales,
      botwallet : botwallet,
      basket    : nonFungibleState.basket,
      ready     : true
    });
  })
})
.catch(error => console.log(`Error: ${error}`));
```

## Sell transacation

`src/components/Robots.js` line

```js
const handleSell = () => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // Call 'sell' entry point
    ///////////////////////////////////////////////////////////////////////////
}
```

```js
tezos.wallet.at(contractAddress).then(contract => {
      contract.methods.sell(props.data.id).send().then(op => {
        props.openSnack();
        op.receipt().then(() => {
          props.closeSnack();
          setNotReady();
        })
      })
});
```
## Buy transaction

`src/components/Account.js` line 76

```js
const handleBuy = () => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // Call 'buy' entry point
    ///////////////////////////////////////////////////////////////////////////
    setOpen(false);
}
```

```js
tezos.wallet.at(contractAddress).then(contract => {
    var amount = getTotal(robotributes, nonFungibleState.basket).toFixed(1);
    contract.methods.buy(nonFungibleState.basket).send({ amount: amount, mutez: false }).then(op => {
      props.openSnack();
      op.receipt().then(() => {
        props.closeSnack();
        setNotReady();
      })
    })
});
```


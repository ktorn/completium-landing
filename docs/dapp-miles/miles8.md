---
id: miles8
title: Interactions with contract
sidebar_label: Interactions
slug: /dapp-miles/miles-tg-interactions
---

import Link from '@docusaurus/Link';

This page presents how to implement the DApp's interactions with the smart contract.

## Connect to wallet utilities

The `src/dapp.js` file defines the necessary utilities to connect the DApp to the blockchain via the Temple wallet:
* check whether wallet is connected
* get the Taquito's object
* ...

In order to make it available accross the React project, these methods are managed with a <a href="https://www.npmjs.com/package/constate">Constate</a> storage. Constate provides a local centralized storage for React project with minimum effort.

`dapp.js` defines a node `DAppProvider` that needs to be wrap the App node. The *FIX ME* section is to be found line 53 in   `src/DApp.js` file:

```js
function App() {
  return (
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // Wrap the App's body with <DAppProvider> tag/function in order to benefit
    // from wallet's service as defined in dapp.js
    ///////////////////////////////////////////////////////////////////////////
    <React.Suspense fallback={null}>
      <PageRouter />
    </React.Suspense>
  );
}
```
The code below shows how to declare the `DAppProvider` so that it makes the Thanos utilities available to the DApp:

```js
function App() {
  return (
    <DAppProvider appName={appName}>
      <React.Suspense fallback={null}>
        <PageRouter />
      </React.Suspense>
    </DAppProvider>
  );
}
```

Copy-paste the code above.

## Read contract storage

The `Miles` component defined in `src/components/Miles.js` displays the time before next expiration date. The first step defines a React `useEffect` <a href="https://reactjs.org/docs/hooks-reference.html#useeffect">hook</a> to read the miles's data for the connected account:

```js
const Miles = (props) => {

  /////////////////////////////////////////////////////////////////////////////
  // The 'account' variable retrieved from 'dapp.js' is the connected account
  // address
  /////////////////////////////////////////////////////////////////////////////
  const account = useAccountPkh();
  /////////////////////////////////////////////////////////////////////////////
  // The 'tezos' variable retrieved from 'dapp.js' is used to interact with the
  // blockchain
  /////////////////////////////////////////////////////////////////////////////
  const tezos = useTezos();

  useEffect(() => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME:
    // the goal here is to read the contract storage to extract miles' info
    // for the connected 'account' and invoke the 'props.handleMiles' function
    // defined in App.js; it takes 2 arguments:
    // * contract object itself
    // * list of miles data { id; amount; expration } for the account 'address'
    ///////////////////////////////////////////////////////////////////////////
  }, [props.nbMiles]);

  return (
    <Container style={{ height: '300px'}}>
    ...
    </Container>);
}
```

The goal of the hook is to build an array of objects providing *for the current connected account*:
* miles' id
* amount of miles
* expiration date of the miles

The role of the <Link to="/docs/dapp-tools/taquito">Taquito</Link> library is to retrieve the contract data and provide it as a plain javascript object that is straightforward to read.

Here the javascript object of the smart contract's storage provides the following members:
* `owner` is the list of miles' owners providing:
    * address
    * list of miles'ids
* `mile` is the list of miles providing:
    * miles id
    * amount
    * expiration

The code below tests if the connected account `account` is present in the storage. If it exists, miles' data is retrieved in `mile` member for each of the `account`'s miles'id:

```js
 useEffect(() => {
    tezos.wallet.at(contractAddress).then(contract => {
      contract.storage().then(storage => {
        var dappMiles = [];
        if (storage.owner.has(account)) {
          storage.owner.get(account).forEach(mid => {
            var mile = storage.mile.get(mid);
            dappMiles.push({
              id         : mid,
              amount     : mile.amount,
              expiration : mile.expiration
            });
          });
        }
        props.handleMiles(contract, dappMiles);
      })
    });
  }, [props.nbMiles]);
```

Copy-paste the code above for the DApp to read the contract storage.

The Taquito's contract object is retrieved with the following code:

```js
tezos.wallet.at(contractAddress).then(contract => {
    ...
});
```

The Taquito's contract's storage object is retrieved with the following code:
```js
contract.storage().then(storage => {
    ...
}
```


## Call entry point

The `ProductButton` component defined in `/src/components/Products.js` is the 'Get it' button at the bottom of the product item.
When clicked, the `handleClick` method is executed.

```js
function ProductButton(props) {

  const handleClick = () => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // The goal is to call the 'consume' contract's entry point. The number of
    // miles to consume is 'props.nbmiles'.
    // On the UI front, the snack bar should be opened whith 'props.openSnack()'
    // while the transaction is confirmed, and closed when confirmed with
    // 'props.closeSnack()'.
    // The 'receipt()' method of the operation is used to know when the
    // transaction is confirmed.
    ///////////////////////////////////////////////////////////////////////////
  }
  return (
      ...
  );
}
```

The `consume` entry point must be invoked by the connected account; it takes one parameter that is the number of miles to subtract or delete.

The <Link to="/docs/dapp-tools/taquito">Taquito</Link> library provides methods named as the contract's entry points to make it very simple to call the contract. These methods/entry point take the same arguments as the contract's.

The code below calls the `consume` entry point:

```js
const handleClick = () => {
    props.contract.methods.consume(props.nbmiles).send().then(op => {
      console.log(`waiting for ${op.opHash} to be confirmed`);
      props.openSnack();
      op.receipt().then(() => {
        props.handleReceipt();
      });
    })
}
```

Copy-paste the code above to call the contract.

Note that calling the `consume` entry point returns an *Operation* object. This object provides the `receipt` method which returns when the operation is confirmed.

The `openSnack` and `closeSnack` methods open and close (via `handleReceipt`) the snack popup to inform the user that a confirmation is waited for.
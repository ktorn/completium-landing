---
id: iot7
title: Contract Interactions
sidebar_label: Contract Interactions
slug: /dapp-iot/interactions
---

import DappButton from '../DappButton';
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

## Connect to Thanos Wallet

The `src/dapp.js` file defines the necessary utilities to connect the DApp to the blockchain via the Thanos wallet:

* check whether wallet is connected
* get the Taquito's object
* ...

In order to make it available accross the React project, these methods are managed with a Constate storage. Constate provides a local centralized storage for React project with minimum effort.

`src/App.js` defines a node `DAppProvider` that needs to be wrap the App node. The FIX ME section is to be found line 18 in 'src/DApp.js' file:

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

## Read Connected Object parameters

The DApp needs to read the smart contract's storage to know about the connected object data:
* price (nb. per minute)
* date of stop service
* ...

The `loadSwitchContent` line 66 of `Dapp.js` file is called to read and store the connected object parameters:

```js
async function loadSwitchContent () {
    try {
      ///////////////////////////////////////////////////////////////////////////
      // FIX ME:
      // Read contract storage:
      // * rate
      // * date of start
      // * date of stop
      // * user
      ///////////////////////////////////////////////////////////////////////////
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
```

The code blow reads the contract storage:

```js {2,6}
    const Tezos = new TezosToolkit('https://delphinet-tezos.giganode.io');
    var contract  = await Tezos.contract.at(contractAddress);
    var cstorage   = await contract.storage();
    var dateofstart = new Date(cstorage.dateofstart);
    var dateofstop = new Date(cstorage.dateofstop);
    var rate = parseInt(0+cstorage.rate[4])/parseInt(0+cstorage.rate[3]);
    var user = cstorage.user;
    setBCSwitch({
      dateofstart: dateofstart,
      dateofstop : dateofstop,
      rate: rate,
      user: user,
    });
```

`rate` is of `rational` type in the contract. In <a href='https://archetype-lang.org/'>Archetype</a> language, rational are encoded as a pair of `int` and `nat`. That's why you need to retrieve numerator and denominator from Taquito's transcoded value (line 6).


## Read account

Account balance is quite straightforward to retrieve.

Implement the `loadBalance` function line 22 of `src/components/Account.js` file:

```js
const loadBalance = React.useCallback(async () => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // RETRIEVE ACCOUNT BALANCE
    // Method props.setBalance(string) is passed the account's balance
    ///////////////////////////////////////////////////////////////////////////
}, [tezos, account, props.setBalance]);
```

The code below retrieves the balance and converts it from mutez to tz:

```js
const loadBalance = React.useCallback(async () => {
    const bal = await tezos.tz.getBalance(address);
    props.setBalance(tezos.format('mutez', 'tz', bal).toString());
}, [tezos, address, props.setBalance]);
```

## Start service

The <Link to="/docs/dapp-iot/implementation#start">start</Link> entry point needs to be called with the current amount of tez in the `handleStart` method line 30 in `src/components/Switch.js` file:

```js
const handleStart = (event) => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME:
    // Invode contract's 'start' entry point and provide the
    // amount of tezos corresponding to the requested duration
    ///////////////////////////////////////////////////////////////////////////
}
```

Copy-paste the code below to implement `handleStart`:

```js {4}
tezos.wallet.at(contractAddress).then(contract => {
    var price = (props.switch.rate * duration).toFixed(6);
    console.log(`calling start with ${price} XTZ`);
    contract.methods.start(UnitValue).send({ amount : price, fee : '0.1' }).then( op => {
      var start = Date.now();
      console.log(`waiting for ${op.opHash} to be confirmed`);
      setDisable(true);
      props.openSnack();
      op.receipt().then(() => {
        setDisable(false);
        props.closeSnack();
        props.resetBalance();
        props.loadSwitchContent();
      });
    })
});
```

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

## Interrupt service

The <Link to="/docs/dapp-iot/implementation#interrupt">interrupt</Link> entry point needs to be called with the current amount of tez in the `handleInterrupt` method line 129 in `src/components/Switch.js` file:

```js
const handleInterrupt = () => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME:
    // Invode contract's 'interrupt' entry point
    ///////////////////////////////////////////////////////////////////////////
}
```

Copy-paste the code below to implement `handleInterrupt`:

```js
tezos.wallet.at(contractAddress).then(contract => {
    contract.methods.interrupt(UnitValue).send().then( op => {
      var d = Date.now();
      console.log(`waiting for ${op.opHash} to be confirmed`);
      setDisable(true);
      props.openSnack();
      op.receipt().then(() => {
        setDisable(false);
        props.closeSnack();
        props.resetBalance();
        props.setBCSwitch({
          dateofstart: d,
          dateofstop: d,
          rate: props.switch.rate,
          user: props.switch.user
        });
      });
    })
});
```
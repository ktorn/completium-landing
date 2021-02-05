---
id: iot7
title: Contract Interactions
sidebar_label: Contract Interactions
slug: /dapp-iot/interactions
---

## Connect to Thanos Wallet

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

```js
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

## Read account

```js
const loadBalance = React.useCallback(async () => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // RETRIEVE ACCOUNT BALANCE
    // Method props.setBalance(string) is passed the account's balance
    ///////////////////////////////////////////////////////////////////////////
}, [tezos, account, props.setBalance]);
```

```js
const loadBalance = React.useCallback(async () => {
    const bal = await tezos.tz.getBalance(address);
    props.setBalance(tezos.format('mutez', 'tz', bal).toString());
}, [tezos, address, props.setBalance]);
```

## Start service

```js
const handleStart = (event) => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME:
    // Invode contract's 'start' entry point and provide the
    // amount of tezos corresponding to the requested duration
    ///////////////////////////////////////////////////////////////////////////
}
```

```js
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

## Interrupt service

```js
const handleInterrupt = () => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME:
    // Invode contract's 'interrupt' entry point
    ///////////////////////////////////////////////////////////////////////////
}
```

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
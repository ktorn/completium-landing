---
id: dex7
title: Interactions
sidebar_label: Interactions
slug: /dapp-dex/interactions
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';


## Exchange

`src/components/Dex.js` line 230

```js
if (lcoin === 'XTZ') {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // call 'approve' & tranfer entry points
    ///////////////////////////////////////////////////////////////////////////
  } else {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // call 'exchange' entry point
    ///////////////////////////////////////////////////////////////////////////
  }
}
```
### from city coin

```js
const dex = await tezos.wallet.at(dexContract);
const op = await dex.methods.exchange(
  dexState.left.coin,
  dexState.left.amount * 1000000,
  dexState.right.coin,
  dexState.right.amount).send({ amount: dexState.left.amount });
props.openSnack();
resetDexCoins();
op.receipt().then(() => {
  props.closeSnack();
  loadDexTokens();
  forceRetrieveTokenBalance(rcoin);
  Tezos.tz
  .getBalance(account)
  .then((balance) => { setBalance(balance / 1000000) })
  .catch((error) => console.log(JSON.stringify(error)));
})
```

### from XTZ

```js
const fa12 = await tezos.wallet.at(dexState.token[lcoin].addr);
const fa12params = fa12.methods.approve(dexContract,dexState.left.amount).toTransferParams();
fa12params.kind = OpKind.TRANSACTION;
const dexparams = dex.methods.exchange(
  dexState.left.coin,
  dexState.left.amount,
  dexState.right.coin,
  dexState.right.amount).toTransferParams();
dexparams.kind = OpKind.TRANSACTION;
const batch = await tezos.wallet.batch([fa12params, dexparams]);
const op = await batch.send();
props.openSnack();
resetDexCoins();
op.receipt().then(() => {
  props.closeSnack();
  loadDexTokens();
  forceRetrieveTokenBalance(lcoin);
  if (rcoin != 'XTZ') {
    forceRetrieveTokenBalance(rcoin);
  }
  Tezos.tz
  .getBalance(account)
  .then((balance) => { setBalance(balance / 1000000) })
  .catch((error) => console.log(JSON.stringify(error)));
})
```

## Provide liquidity

`src/components/Provider.js` line 191

```js
async function handleProvide() {
    const fa12 = await tezos.wallet.at(dexState.token[coin].addr);
    const dex = await tezos.wallet.at(dexContract);
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // call 'approve' & 'addLiquidity' entry points
    ///////////////////////////////////////////////////////////////////////////
};
```

```js
const fa12params = fa12.methods.approve(dexContract,dexState.provider.amount).toTransferParams();
fa12params.kind = OpKind.TRANSACTION;
const dexparams = dex.methods.addLiquidity(coin,dexState.provider.amount).toTransferParams();
dexparams.kind = OpKind.TRANSACTION;
dexparams.amount = dexState.provider.xtzamount;
const batch = await tezos.wallet.batch([fa12params, dexparams]);
const op = await batch.send();
props.openSnack();
resetProvider();
op.receipt().then(() => {
    props.closeSnack();
    loadDexTokens();
    loadLiquidity();
    Tezos.tz
    .getBalance(account)
    .then((balance) => { setBalance(balance / 1000000) })
    .catch((error) => console.log(JSON.stringify(error)));
})
```

## Redeem liquidity

`src/components/Redeemer.js` line 165

```js
async function handleRedeem() {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // call 'removeLiquidity' entry point
    ///////////////////////////////////////////////////////////////////////////
};
```

```js
const dex = await tezos.wallet.at(dexContract);
const op = await dex.methods.removeLiquidity(coin,dexState.redeemer.amount).send();
props.openSnack();
resetRedeemer();
op.receipt().then(() => {
    props.closeSnack();
    loadDexTokens();
    loadLiquidity();
    Tezos.tz
    .getBalance(account)
    .then((balance) => { setBalance(balance / 1000000) })
    .catch((error) => console.log(JSON.stringify(error)));
})
```
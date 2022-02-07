---
id: game7
title: Interactions
sidebar_label: Interactions
slug: /dapp-game/interactions
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

## Load records

```js
async function loadRecords() {
  try {
   ///////////////////////////////////////////////////////////////////////////
   // FIX ME
   // read contract storage, mainly submission and call DApp's 'setRecords'
   ///////////////////////////////////////////////////////////////////////////
  } catch (error) {
   console.log(`Error: ${error}`);
  }
}
```

```js
const Tezos = new TezosToolkit('https://hangzhounet-tezos.giganode.io');
console.log(contractAddress);
var contract  = await Tezos.contract.at(contractAddress);
var cstorage  = await contract.storage();
var recs      = [];
cstorage.submission.forEach((s, k, m) => {
  recs.push({
    score: parseInt('0'+s.score),
    account: k
  });
});
setRecords(sortByScore(recs));
setStatus(parseInt('0'+cstorage._state));
```

## Encrypt

`src/components/Competition.js` line 25

```js
const handleEncrypt = () => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // Encrypt score:
    // * invoke RPC call 'packData'
    // * sign with Oracle's private key
    // NB: this should be done via game server
    ///////////////////////////////////////////////////////////////////////////
  }
```

```js
var oracle = new InMemorySigner('edsk3eFocAKYDy2GfkFXFnj19ocDFwJ4M4cvrPURgaeyWp19LFzvHE');
var nonce = new Uint8Array(8);
window.crypto.getRandomValues(nonce);
console.log(`score: ${props.score.score}`);
const Tezos = new TezosToolkit('https://hangzhounet-tezos.giganode.io');
Tezos.rpc.packData({
  data: {
    prim: "Pair",
    args: [
      { string: accountAddress },
      { int: props.score.score.toString() }
    ]
  }, type: {
    prim: "pair",
    args: [
      { prim: "address" },
      { prim: "nat" }
    ]
  }
}).then(wrappedPacked => {
  const hexScore = wrappedPacked.packed;
  oracle.sign(hexScore).then(s => {
    console.log(`score: ${props.score.score.toString(16)}`);
    console.log(`signed: ${s.sbytes}`);
    console.log(`sig: ${s.sig}`);
    console.log(`prefix: ${s.prefixSig}`);
    props.setSigned({ packed: wrappedPacked.packed, value: s.prefixSig });
  });
})
```

## Submit score

`src/components/Competition.js` line 34

```js
const submit = () => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // Submit score:
    ///////////////////////////////////////////////////////////////////////////
  }
```

```js
tezos.wallet.at(contractAddress).then(contract => {
    contract.methods.submit(props.signed.packed, props.signed.value).send().then(op => {
      props.openSnack();
      op.receipt().then(() => {
        props.closeSnack();
        props.loadRecords();
      });
    }).catch(e => console.log(e));
});
```
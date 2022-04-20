---
id: ideabox7
title: Interactions
sidebar_label: Interactions
slug: /dapp-ideabox/interactions
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

## Read contract storage

```js
async function loadIdeaxBoxContent () {
    try {
      ///////////////////////////////////////////////////////////////////////////
      // FIX ME
      // Read contract's storage to fill the following local variables:
      // var winners = [];
      // var ids = [];
      // var votes = [];
      // var state = 0;
      // Invoke 'setStorage' method
      // setStorage({
      //  status: state,
      //  ideas: ids,
      //  votes: votes,
      // });
      ///////////////////////////////////////////////////////////////////////////
    } catch (error) {
      console.log(`Error: ${error}`);
    }
}
```

```js {5,7,19}
const Tezos = new TezosToolkit('https://testnet-tezos.giganode.io');
var contract  = await Tezos.contract.at(contractAddress);
var cstorage   = await contract.storage();
var winners = [];
cstorage.selected.forEach(w => winners.push(parseInt(0+w)));
var ids = [];
cstorage.idea.forEach((i, k, m) => {
  ids.push({
    id:       k,
    title:    decompressFromUint8Array(fromHexString(i.title)),
    desc:     decompressFromUint8Array(fromHexString(i.desc)),
    author:   i.author,
    nbvotes:  parseInt(0+i.nbvotes,10),
    creation: (i.creation+'').substring(0,10),
    winner:   winners.includes(parseInt(k))
  });
});
var votes = [];
cstorage.voter.forEach((v,k,m) => {
    votes[k] = parseInt(0+v,10)
});
ids = SortIdeas(ids,'sort by creation');
console.log(ids);
setStorage({
  status: (0+cstorage._state === '00'),
  ideas: ids,
  votes: votes,
});
```



## Add an Idea

`src/components/IdeaForm.js` line 65

```js
  const handleSubmit = () => {
    console.info(state);
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // Invoke 'add_idea' method with title and description arguments
    // title is stored in `state.title` variable and description in `state.desc`
    // These parameters must be compressed and Hex-encoded with:
    // x => toHexString(compressToUint8Array(x)) function
    ///////////////////////////////////////////////////////////////////////////
    props.onclose();
  }
```

```js {1,4}
tezos.wallet.at(contractAddress).then(contract => {
  var t = toHexString(compressToUint8Array(state.title));
  var d = toHexString(compressToUint8Array(state.desc));
  contract.methods.add_idea(t, d).send().then(op => {
    console.log(`waiting for ${op.opHash} to be confirmed`);
    props.openSnack();
    op.receipt().then(() => {
      props.handleReceipt();
    }).catch(error => console.log(`Error: ${error}`));
  }).catch(error => console.log(`Error: ${error}`))
});
```

## Vote

`src/components/Idea.js` line 17

```js
  const handleVote = () => {
    ///////////////////////////////////////////////////////////////////////////
    // FIX ME
    // Invoke 'vote' method with:
    // * idea identifier
    // * vote weight (set to 1)
    ///////////////////////////////////////////////////////////////////////////
  }
```

```js {1,2}
  tezos.wallet.at(contractAddress).then(contract => {
      contract.methods.vote(props.id, 1).send().then( op => {
        console.log(`waiting for ${op.opHash} to be confirmed`);
        props.openSnack();
        op.receipt().then(() => {
          props.handleReceipt();
        });
      })
  });
```
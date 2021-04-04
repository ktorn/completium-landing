---
id: tuto9
title: Testing a contract
sidebar_label: 9. Testing a contract
slug: /contract/tuto/archetype-test
---

import Link from '@docusaurus/Link';

In this exercise, a test is written to test the <Link to='/docs/contract/tuto/archetype-assets'>asset</Link> contract (step 7).

The test is written in javascript with the <Link to='/docs/dapp-tools/taquito'>Taquito</Link> library and executed with node.

## Code

The goal is to originate the contract from archetype source and to call the entry points in order to check the resulating contract storage. The test succeeds if the storage has in a specific state.

```js
const { TezosToolkit } = require('@taquito/taquito');
const tezos = new TezosToolkit('https://api.tez.ie/rpc/edonet');

tezos.tz
  .getBalance('tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY')
  .then((balance) => console.log(`${balance.toNumber() / 1000000} ꜩ`))
  .catch((error) => console.log(JSON.stringify(error)));
```

## Excute

```
```
---
id: first3
title: Display contract data
sidebar_label: 3. Display contract data
slug: /dapp-first/display-storage
---
import Link from '@docusaurus/Link';
import DappFigure from '../DappFigure';

The goal is to display some data retrieved from the ownership contract storage.

## React pattern
:::note
This section is for information only, no action is required.
:::

We want to display the data `assetid`, `owner` and `status` from the deployed contract.

Reading contract data is done asynchronously with RPC calls to the blockchain. The following code is a standard React pattern to load  remote data, and refresh component when data is received.

It defines a component named `OwnershipData` whose role is to retrieve and display contract data:

```js
const OwnershipData = (props) => {
  const [{ assetid, owner, forsale }, setData] = React.useState(() => ({
      assetid : "",
      owner   : "",
      forsale : "",
    }));
  const loadStorage = React.useCallback(async () => {
    /* Retrieve data and store them with setData(...) */
  }, [assetid, owner, forsale]);
  if (assetid === "") loadStorage();
  return (
    /* Render Component */
  );
}
```

The function `loadstorage` is called when `assetid` is not yet initialized. When it returns, the call to `setData` triggers the refresh of the component with loaded data.

## Taquito

:::note
This section is for information only, no action is required.
:::
The <a href='https://tezostaquito.io/' target='_blank'>Taquito</a> library provides easy integration of blockchain features in javascript applications. It is pre-installed in the Gitpod environment.

The following code shows how to retrieve data from the contract when in an asynchronous function. This code is to be inserted in the function passed to `useCallback` above:

```js {5-7}
const tezos     = new TezosToolkit(endpoint);
const contract  = await tezos.contract.at(contractAddress);
const storage   = await contract.storage();
setData({
  assetid : storage.assetid,
  owner   : storage.owner,
  forsale : storage._state.toNumber() > 0 ? "For Sale" : "Not For Sale",
});
```

The `endpoint` constant is the endpoint URL to the Tezos test network.

The `contractAddress` constant is the address of the conctract that has been deployed in previous step.

## Set contract address

It is required to set the ownership contract address in `~/src/settings.js`.

To display the contract address, **run** the command:

```
completium-cli show contract ownership
```

For example in `~/src/settings.js`:
```js
export const contractAddress = "KT1BAVw4WhU7BAs2jiakDv4VrR9CNzQK32rd";
```

## Storage display code

The code below synthesizes the sections above.
**Copy** the code and **insert** it line 16 of `~/src/App.js`:

```js {6-10,30-36}
import { TezosToolkit } from '@taquito/taquito';
import { endpoint, contractAddress, courier } from './settings.js';
import { useState } from 'react';

const Cell = (props) => {
  return (<Grid item xs={6}><Typography align="left" variant="subtitle2"
    style={ props.data ? { fontFamily: courier } : { } }> { props.val }
  </Typography></Grid>)
}

const OwnershipData = (props) => {
  const [{ assetid, owner, forsale }, setData] = useState(() => ({
      assetid : "",
      owner   : "",
      forsale : "",
    }));
  const loadStorage = React.useCallback(async () => {
    const tezos     = new TezosToolkit(endpoint);
    const contract  = await tezos.contract.at(contractAddress);
    const storage   = await contract.storage();
    setData({
      assetid : storage.assetid,
      owner   : storage.owner,
      forsale : storage._state.toNumber() > 0 ? "For Sale" : "Not For Sale",
    });
  }, [assetid, owner, forsale]);
  if (assetid === "") loadStorage();
  return (
    <Container maxWidth='xs'>
    <Grid container direction="row" alignItems="center" spacing={1}>
      <Cell val="Asset Id"/><Cell val={ assetid.substring(0, 20) + "..."} data/>
      <Cell val="Owner"   /><Cell val={ owner.substring(0, 20) + "..."} data/>
      <Cell val="Status"  /><Cell val={ forsale }/>
    </Grid>
    </Container>
  );
}
```

The interface code to display contract data is highlighted above.

Now **replace** lines 72 to 92 of `~/src/App.js` (remove all default UI components):

```js
<Grid item xs={12}>
  <Typography variant="h2" style={{ fontFamily : alegreya }}>
    Completium
  </Typography>
</Grid>
<Grid item xs={12}>
  <Typography variant="h6">
    Edit <code>src/App.js</code> and save to reload.
  </Typography>
</Grid>
<Grid item xs={12}>
  <Link
    href="https://completium.com/dapps"
    target="_blank" rel="noopener noreferrer"
    style={{ color: theme.palette.primary.light }}
  >
    <Typography variant="h6">
      Learn everything about DApps
    </Typography>
  </Link>
</Grid>
```

with the call to the `OwnershipData` component:

```js
<Grid item xs={12}>
  <OwnershipData />
</Grid>
```

The result should look something like:

<DappFigure img="ownership1.png" width='60%'/>

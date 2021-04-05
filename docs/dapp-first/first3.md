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

**Replace** in `~/src/App.js` the comment:

```js
/* FIXME: Step 3.1 */
```

with the code below (click 'copy' in the upper-right-hand corner):

```js
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

Now **replace** in `~/src/App.js` the code between the comments:

```js
{ /* FIXME: Step 3.2 Start --*/ }
...
{ /* FIXME: Step 3.2 End --*/ }
```

with the code below (click 'copy' in the upper-right-hand corner):

```html
<Grid item xs={12}>
  <OwnershipData />
</Grid>
```

The result should look something like:

<DappFigure img="ownership1.png" width='60%'/>

## `App.js` code

:::note
This section is for information only, no action is required.
:::

This section presents the code of `~/src/App.js` at the end of this step:

```js {26-58,82-84}
import './App.css';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { DAppProvider } from './dappstate';
import { SnackProvider } from './snackstate';
import { appName, alegreya } from './settings';
import Snack from './components/Snack';
import WalletButton from './components/WalletButton';

import { TezosToolkit } from '@taquito/taquito';
import { endpoint, contractAddress, courier } from './settings.js';
import { useState } from 'react';

import Button from '@material-ui/core/Button';
import { useTezos, useAccountPkh } from './dappstate';
import { useSnackContext } from './snackstate';
import { UnitValue } from '@taquito/taquito';

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
/* FIXME: step 4.1 */

/* FIXME: Step 6.1 */

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <DAppProvider appName={ appName }>
      <SnackProvider>
      <ThemeProvider theme={ theme }>
      <CssBaseline />
      <div className="App">
        <Container style={{ marginTop: 50 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <OwnershipData />
            </Grid>

            { /* FIXME: Step 4.2 */ }

            { /* FIXME: Step 6.2 */ }

            { /* FIXME: Step 4.3 */ }
          </Grid>
        </Container>
      </div>
      <Snack />
      </ThemeProvider>
      </SnackProvider>
    </DAppProvider>
  );
}

export default App;
```
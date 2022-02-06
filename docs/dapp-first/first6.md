---
id: first6
title: Claim ownership
sidebar_label: 6. Claim ownership
slug: /dapp-first/claim
---
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

The goal is to add a *Claim* button and claim the ownership.

## Claim button

**Replace** in `~/src/App.js` the comment below:

```js
/* FIXME: Step 6.1 */
```

with the code below (click 'copy' in the upper-right-hand corner):

```js {9}
const ClaimButton = () => {
  const { settings } = useSettingsContext();
  const tezos = useTezos();
  const account = useAccountPkh();
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const claim = async () => {
    try {
      const contract  = await tezos.wallet.at(settings.contract);
      const operation = await contract.methods.claim(UnitValue).send();
      const shorthash = operation.opHash.substring(0, 10) + "...";
      setInfoSnack(`waiting for ${ shorthash } to be confirmed ...`);
      await operation.receipt();
      hideSnack();
    } catch (error) {
      setErrorSnack(error.message);
    }
  }
  return (
    <Button onClick={ claim } variant="outlined" disabled={ account === null }>
      Claim
    </Button>);
}
```
The implementation is very similar to the one of the <Link to='/docs/dapp-first/bid-button#buttons-code'>Bid</Link> button. The differences are:
* it does not require any transfer of tezies, hence the `send` method does not have any argument
* the <Link to='/docs/dapp-first/contract#entrypoints'>contract</Link>'s `claim` method is called

**Replace** in `~/src/App.js` the comment below:

```js
{ /* FIXME: Step 6.2 */ }
```

with the code below:

```html
<Grid item xs={12}>
  <ClaimButton />
</Grid>
```

## Claim

**Click** the *Claim* button and confirm the wallet popup. When operation is confirmed (snack message disappears), refresh the Better Call Dev <Link to='/docs/dapp-first/make-bid#set-asset-up-for-sale'>contract page</Link> and check the effect on the contract (click on the `claim` operation):

<DappFigure img='ownership_bcd3.png' width='100%' />

Notes:
* `Owner` has been set to the account in your walletn, which means you are now the owner of the asset!
*  Contract state is back to `0` which is "Not For Sale".

The internal transaction (at the bottom in the screenshot above) is the transfer of the contract balance (10 tezies) to the previous owner, as per the <Link to='/docs/dapp-first/contract#entrypoints'>contract</Link> entrypoint `claim`:

```archetype {5}
transition claim () {
  ...
  with effect {
    ...
    transfer balance to owner;
    ...
  }
}
```

## `App.js` code

:::note
This section is for information only, no action is required.
:::

This section presents the code of `~/src/App.js` at the end of this step:

```js {85-106,134-136}
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
  const { settings } = useSettingsContext();
  const [{ assetid, owner, forsale }, setData] = useState(() => ({
      assetid : "",
      owner   : "",
      forsale : "",
    }));
  const loadStorage = React.useCallback(async () => {
    const tezos     = new TezosToolkit(settings.endpoint);
    const contract  = await tezos.contract.at(settings.contract);
    const storage   = await contract.storage();
    console.log(storage);
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
      <Cell val="Asset Id"/><Cell val={ assetid.substring(0, 20) + "..." } data/>
      <Cell val="Owner"   /><Cell val={ owner.substring(0, 20) + "..." } data/>
      <Cell val="Status"  /><Cell val={ forsale }/>
    </Grid>
    </Container>
  );
}

const BidButton = () => {
  const tezos = useTezos();
  const account = useAccountPkh();
  const { settings } = useSettingsContext();
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const bid = async () => {
    try {
      const contract  = await tezos.wallet.at(settings.contract);
      const operation = await contract.methods.bid(UnitValue).send({ amount: 10 });
      const shorthash = operation.opHash.substring(0, 10) + "...";
      setInfoSnack(`waiting for ${ shorthash } to be confirmed ...`);
      await operation.receipt();
      hideSnack();
    } catch (error) {
      setErrorSnack(error.message);
    }
  }
  return (
    <Button onClick={ bid } variant="outlined" disabled={ account === null }>
      post bid
    </Button>);
}

const ClaimButton = () => {
  const { settings } = useSettingsContext();
  const tezos = useTezos();
  const account = useAccountPkh();
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const claim = async () => {
    try {
      const contract  = await tezos.wallet.at(settings.contract);
      const operation = await contract.methods.claim(UnitValue).send();
      const shorthash = operation.opHash.substring(0, 10) + "...";
      setInfoSnack(`waiting for ${ shorthash } to be confirmed ...`);
      await operation.receipt();
      hideSnack();
    } catch (error) {
      setErrorSnack(error.message);
    }
  }
  return (
    <Button onClick={ claim } variant="outlined" disabled={ account === null }>
      Claim
    </Button>);
}

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
      <SettingsProvider>
      <SnackProvider>
      <ThemeProvider theme={ theme }>
      <CssBaseline />
      <div className="App">
        <Container style={{ marginTop: 50 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <OwnershipData />
            </Grid>
            <Grid item xs={12}>
                <BidButton />
            </Grid>
            <Grid item xs={12}>
                <ClaimButton />
            </Grid>
            <Grid item xs={12}>
                <WalletButton />
            </Grid>
          </Grid>
        </Container>
      </div>
      <SettingsPanel/>
      <Snack />
      </ThemeProvider>
      </SnackProvider>
      </SettingsProvider>
    </DAppProvider>
  );
}

export default App;
```
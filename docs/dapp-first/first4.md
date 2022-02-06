---
id: first4
title: Bid button
sidebar_label: 4. Bid button
slug: /dapp-first/bid-button
---
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

The goal is to add a *Post Bid* button to call the contract.
## Button's code

**Replace** in `~/src/App.js` the comment below:

```js
/* FIXME: Step 4.1 */
```

with the code below (click 'copy' in the upper-right-hand corner):

```js {8-9,12}
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
```

The highlighted lines above show the interactions with the wallet:
* the contract is retrieved through the `Tezos` object provided by the wallet
* the `bid` method defined in the <Link to='/docs/dapp-first/contract#entrypoints'>contract</Link>, is invoked to forge and sign the operation, which is posted to the blockchain with `send`
* the operation handler returns a `receipt` when the transaction is confirmed

Note that the contract's `bid` method does not take any argument, and that its javascript counterpart takes the default `UnitValue` value.

Note that 10 tezies are sent to the contract with the `send` argument `{ amount: 10 }`. It is the value of the bid. This amount is refered to with the <a href='https://archetype-lang.org/'>Archetype</a> keyword `transferred` in the contract <Link to='/docs/dapp-first/contract#copy-contract-code'>code</Link>.

Now **replace** in `~/src/App.js` the comment below:

```js
{ /* FIXME: Step 4.2 */ }
```

with the code below (click 'copy' in the upper-right-hand corner):

```html
<Grid item xs={12}>
  <BidButton />
</Grid>
```

## Wallet button

The *Bid* button is disabled if the DApp is not connected to the <Link to='/docs/dapp-tools/thanos'>Temple wallet</Link> (see `disabled={account === null}` above).

The project provides a utility button `WalletButton` to connect to the wallet. It is defined in `~/src/components/WalletButton.js`.

**Replace** in `~/src/App.js` the comment below:

```js
{ /* FIXME: Step 4.3 */ }
```

with the code below (click 'copy' in the upper-right-hand corner):

```html
<Grid item xs={12}>
  <WalletButton />
</Grid>
```

If the <Link to='/docs/dapp-tools/thanos'>Temple wallet</Link> is not installed, the button displays as below:

<DappFigure img='wallet_button1.png' width='50%'/>

Click the button to go to the install page.

When/If the <Link to='/docs/dapp-tools/thanos'>Temple wallet</Link> is installed, the button displays as below:

<DappFigure img='wallet_button2.png' width='50%'/>

## `App.js` code

:::note
This section is for information only, no action is required.
:::

This section presents the code of `~/src/App.js` at the end of this step:

```js {62-83,111-113,117-119}
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

            { /* FIXME: Step 6.2 */ }

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

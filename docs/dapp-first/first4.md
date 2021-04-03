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

**Copy** the code below and **insert** it line 17 of `~/src/App.js` to define the `BidButton`:

```js {12-13,16}
import Button from '@material-ui/core/Button';
import { useTezos, useAccountPkh } from './dappstate';
import { useSnackContext } from './snackstate';
import { UnitValue } from '@taquito/taquito';

const BidButton = () => {
  const tezos = useTezos();
  const account = useAccountPkh();
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const bid = async () => {
    try {
      const contract  = await tezos.wallet.at(contractAddress);
      const operation = await contract.methods.bid(UnitValue).send({ amount: 10 });
      const shorthash = operation.opHash.substring(0, 10) + "...";
      setInfoSnack(`waiting for ${ shorthash } to be confirmed ...`);
      await operation.receipt();
      hideSnack();
    } catch (error) {
      setErrorSnack(error.message);
      setTimeout(hideSnack, 4000);
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

Note that 10 tezies are sent to the contract with the `send` argument `{ amount: 10 }`. It is the value of the bid. This amount is refered to with the <Link to='/docs/dapp-tools/archetype'>Archetype</Link> keyword `transferred` in the contract <Link to='/docs/dapp-first/contract#source-code'>code</Link>.

**Insert** the code below line 112 of `~/src/App.js` to add the `BidButton`:

```html
<Grid item xs={12}>
  <BidButton />
</Grid>
```

## Wallet button

The *Bid* button is disabled if the DApp is not connected to the <Link to='/docs/dapp-tools/thanos'>Temple wallet</Link> (see `disabled={account === null}` above).

The project provides a utility button `WalletButton` to connect to the wallet. It is defined in `~/src/components/WalletButton.js`.

**Insert** the code below line 115 of `~/src/App.js`:

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

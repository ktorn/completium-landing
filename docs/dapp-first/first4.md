---
id: first4
title: Bid button
sidebar_label: 4. Bid button
slug: /dapp-first/bid-button
---
import DappFigure from '../DappFigure';

## Add button

line 16

```js {12-13}
import Button from '@material-ui/core/Button';
import { useTezos, useAccountPkh } from './dappstate';
import { useSnackContext } from './snackstate';
import { UnitValue } from '@taquito/taquito';

const BidButton = () => {
  const Tezos = useTezos();
  const account = useAccountPkh();
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const handlebid = async () => {
    try {
      var contract  = await Tezos.wallet.at(contractAddress);
      var operation = await contract.methods.bid(UnitValue).send({ amount: 10 });
      setInfoSnack(`waiting for ${operation.opHash} to be confirmed ...`);
      await operation.receipt();
      hideSnack();
    } catch (error) {
      setErrorSnack(error.message);
      setTimeout(hideSnack,4000);
    }
  }
  return (
    <Button onClick={handlebid} variant="outlined" disabled={account === null}>
      post bid
    </Button>);
}
```

insert line 111

```html
<Grid item xs={12}>
  <BidButton />
</Grid>
```

## Wallet button

insert line 114

```html
<Grid item xs={12}>
  <WalletButton />
</Grid>
```

<DappFigure img='wallet_button1.png' width='50%'/>
<DappFigure img='wallet_button2.png' width='50%'/>


## Connection to wallet



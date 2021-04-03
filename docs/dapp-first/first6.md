---
id: first6
title: Claim ownership
sidebar_label: 6. Claim ownership
slug: /dapp-first/claim
---
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

## Claim button

**Copy** the code below and **insert** it line 17 of `~/src/App.js` to define the ClaimButton:

```js {8}
const ClaimButton = () => {
  const tezos = useTezos();
  const account = useAccountPkh();
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const claim = async () => {
    try {
      const contract  = await tezos.wallet.at(contractAddress);
      const operation = await contract.methods.claim(UnitValue).send();
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
    <Button onClick={ claim } variant="outlined" disabled={ account === null }>
      Claim
    </Button>);
}
```
This principle is the same as the one of the <Link to='/docs/dapp-first/bid-button#buttons-code'>Bid</Link> button. The differences are:
* it does not require any transfer of tezis, hence the `send` method does not have any argument
* the <Link to='/docs/dapp-first/contract#entrypoints'>contract</Link>'s `claim` method is called

**Insert** the code below line 112 of `~/src/App.js` to add the `ClaimButton`:

```html
<Grid item xs={12}>
  <ClaimButton />
</Grid>
```

## Claim

<DappFigure img='ownership_bcd3.png' width='100%' />

Internal transaction
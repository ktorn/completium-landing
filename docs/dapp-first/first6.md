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

**Copy** the code below and **insert** it line 23 of `~/src/App.js` to define the ClaimButton:

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
The implementation is very similar to the one of the <Link to='/docs/dapp-first/bid-button#buttons-code'>Bid</Link> button. The differences are:
* it does not require any transfer of tezis, hence the `send` method does not have any argument
* the <Link to='/docs/dapp-first/contract#entrypoints'>contract</Link>'s `claim` method is called

**Insert** the code below line 125 of `~/src/App.js` to add the `ClaimButton`:

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

The internal transaction (at the bottom in the screenshot above) is the transfer of the contract balance (10 tezis) to the previous owner, as per the <Link to='/docs/dapp-first/contract#entrypoints'>contract</Link> entrypoint `claim`:

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


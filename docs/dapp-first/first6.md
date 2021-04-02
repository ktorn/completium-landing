---
id: first6
title: Claim ownership
sidebar_label: 6. Claim ownership
slug: /dapp-first/claim
---
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

## Add button

```js {7-8,11}
const ClaimButton = () => {
  const tezos = useTezos();
  const account = useAccountPkh();
  const { setInfoSnack, setErrorSnack, hideSnack } = useSnackContext();
  const handleclaim = async () => {
    try {
      const contract  = await tezos.wallet.at(contractAddress);
      const operation = await contract.methods.claim(UnitValue).send();
      const shorthash = operation.opHash.substring(0,10)+"...";
      setInfoSnack(`waiting for ${shorthash} to be confirmed ...`);
      await operation.receipt();
      hideSnack();
    } catch (error) {
      setErrorSnack(error.message);
      setTimeout(hideSnack,4000);
    }
  }
  return (
    <Button onClick={handleclaim} variant="outlined" disabled={account === null}>
      Claim
    </Button>);
}
```

```html
<Grid item xs={12}>
  <ClaimButton />
</Grid>
```

## Claim

<DappFigure img='ownership_bcd3.png' width='100%' />

Internal transaction
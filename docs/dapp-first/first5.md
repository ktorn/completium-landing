---
id: first5
title: Make a bid
sidebar_label: 5. Make a bid
slug: /dapp-first/make-bid
---
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

## Connect to wallet

**Click** the *Connect to Wallet* button; it opens a popup window to select an account:

<DappFigure img='connect_dapp.png' width='40%'/>

**Click** on the account you want to connect with, and **click** *Connect*. Once connected the *Connect to Wallet* button is not diplayed.

If you've just installed the wallet, there is no account registered yet and you need to import a faucet account. To do so:
 1. **Download** a faucet account file from the <a href='https://faucet.tzalpha.net/' target='_blank'>faucet</a> (instructions <Link to='/docs/dapp-tools/faucet#downlaod-test-account'>here</Link>)
 2. **Import** the faucet file in Temple wallet (instructions <Link to='/docs/dapp-tools/thanos#import-faucet-file'>here</Link>)

:::info
Faucet accounts are credited with *fake* tezies on the Tezos testnet in order to interact with test contracts.
:::

## Initial attempt

**Click** the *Post Bid* button to make a bid of 10 tezies. The wallet generates a popup window for you to confirm the transaction:

<DappFigure img='confirm_wallet.png' width='40%'/>

For information, the raw transaction parameter is displayed below:

```json
[{
  "destination": "KT1LyBhUUP6vnqwAyJTrZ3y2iA6BeZtSSnbk",
  "kind": "transaction",
  "amount": 10000000,
  "parameters": {
    "entrypoint": "bid",
    "value": { "prim": "Unit" }
  }
}]
```

**Click** *Confirm*; the following message is displayed for 4 seconds:

<DappFigure img='bid_attempt.png' width='40%'/>

This message is defined in the `bid` entrypoint of the <Link to='/docs/dapp-first/contract#entrypoints'>contract</Link>:

```archetype
entry bid () {
  require {
    r1 otherwise "Asset Not For Sale" : state = ForSale;
    ...
  }
  effect { ... }
}

```

The asset has not been set up for sale by the owner.

## Set asset up for sale

Say the owner requires a minimum price of 7 tezies.

**Enter** the following <Link to='/docs/cli'>Completium CLI</Link> command to invoke the entrypoint `upforsale`:

```bash
completium-cli call ownership --as owner --entry upforsale --arg '{ "price" : "7tz" }'
```

Check and confirm the transaction parameter: type 'Y' and press enter.

When prompt returns, you can check the transaction detail in the contract indexer <a href='https://better-call.dev/' target='_blank'>Better Call Dev</a>. You can display the contract's URL with the command:

```bash
completium-cli show contract ownership
```

On the contract page in <a href='https://better-call.dev/' target='_blank'>Better Call Dev</a>, in the 'Operations' tab, click on the `upforsale` transaction to display the detail:

<DappFigure img='ownership_bcd1.png' width='100%'/>


Better Call Dev highlights in yellow the effect of the transaction on the storage.

## Second attempt

Now the asset is up for sale, **click** the *Post Bid* button again. Now a waiting message is displayed:

<DappFigure img="make_bid.png" width='60%' />

Check the effect on the contract storage:

<DappFigure img='ownership_bcd2.png' width='100%'/>

Notes:
* `bestbid` and `bestbidder` variables have been updated
* `endofbid` has been incremented by 2 minutes
* transferred amount is 10 tezies

### Bid period is over

If the time window (5 minutes) to make a bid has expired, the error message below is displayed:

<DappFigure img="make_bid2.png" width='30%' />

Id `r2` is defined in the <Link to='/docs/dapp-first/contract#copy-contract-code'>smart contract</Link> as the id of the execution condition of the `bid` entrypoint:

```archetype
entry bid() {
   require {
     ...
      r2: now < endofbid otherwise "Bid Period is Over";
     ...
   }
  ...
}
```

The solution is to set back the contract state to `Owned` by calling the `claim` from `admin` account. This is done with the following command:

```
completium-cli call ownership --entry claim --as owner
```

Once confirmed, you may proceed to <Link to='/docs/dapp-first/make-bid#set-asset-up-for-sale'>Set asset up for sale</Link> step above.

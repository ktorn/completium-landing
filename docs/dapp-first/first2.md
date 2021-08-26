---
id: first2
title: Deploy Smart Contract
sidebar_label: 2. Deploy Smart contract
slug: /dapp-first/contract
---
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

The first step is to originate (deploy) the ownership <Link to='/docs/dapp-tools/tezos#smart-contract'>Smart Contract</Link> with <Link to='/docs/cli'>completium CLI</Link>.

Before anything, follow these <Link to='/docs/dapp-tools/gitpod#check-admin-account'>instructions</Link> to import a new account :
* copy paste (or upload to gitpod) in `faucet.json` file a test account retrieved from <Link to='https://faucet.tzalpha.net/'>faucet.tzalpha.net</Link>
* in order to import the faucet account with `completium-cli`, enter the following command in a VS code <Link to='/docs/dapp-tools/gitpod#open-terminal'>Terminal</Link> tab:

```
completium-cli import faucet faucet.json as admin --force
```

## Smart contract code

:::note
This section is for information only, no action is required.
:::

The contract is written in <Link to='http://archetype-lang.org/'>Archetype</Link> language. The source code is available in the `contract` folder.

```archetype
archetype asset_ownership (owner : address)

variable assetid : bytes =
  0x68746ecbcd72793aefda48f1b67a3190fc380a7633055d2336fb90cd990582a2

variable bestbidder : address = owner
variable bestbid    : tez = 0tz

variable endofbid   : date = now

states =
| Owned initial
| ForSale

transition upforsale (price : tez) {
   called by owner
   from Owned to ForSale
   with effect {
      bestbid := price;
      endofbid := now + 5m;
   }
}

entry bid() {
   require {
      r1 otherwise "Asset Not For Sale": state = ForSale;
      r2: now < endofbid;
      r3: caller <> bestbidder;
      r4: transferred > bestbid;
   }
   effect {
     if balance <> transferred then
       transfer bestbid to bestbidder;
     bestbidder := caller;
     bestbid := transferred;
     endofbid += 2m;
   }
}

transition claim () {
  require { r5 otherwise "Bid Period Is Still On": now > endofbid }
  from ForSale to Owned
  with effect {
     if balance > 0tz then
         transfer balance to owner;
     owner := bestbidder;
  }
}
```

## Originate contract

### From Archetype
Enter this command in the <Link to='/docs/dapp-tools/gitpod#open-terminal'>Terminal</Link>:

```
completium-cli deploy ./contract/ownership.arl --init 'tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw'
```

Replace address `tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw` by the faucet address you imported
(run `completium-cli show account` to display the address - Public Key hash).

It displays the main origination parameters and asks for confirmation. Enter `Y` and press enter.

The output should look like:
```bash
$ gitpod /workspace/completium-dapp-first $ completium-cli deploy ownership.arl
? Confirm contract ownership.arl origination by 'admin' with 0 ꜩ on edo? Yes
Waiting for confirmation of origination for KT1BAVw4WhU7BAs2jiakDv4VrR9CNzQK32rd ...
Origination completed for KT1BAVw4WhU7BAs2jiakDv4VrR9CNzQK32rd named ownership.arl.
https://better-call.dev/edo2net/KT1BAVw4WhU7BAs2jiakDv4VrR9CNzQK32rd
```

Click on the generated link to display the contract in <Link to='/docs/dapp-tools/bcd'>Better Call Dev</Link> indexer (it may take up to a dozen of seconds for BCD to synchronize with the blockchain). It shows the origination cost of 0.39ꜩ.

### From Michelson

In order to originate from the Michelson version (available in `contract` folder), enter the following command :

```
completium-cli originate ./contract/ownership.tz --init '(Pair "tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw" (Pair 0x68746ecbcd72793aefda48f1b67a3190fc380a7633055d2336fb90cd990582a2 (Pair "tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw" (Pair 0 (Pair 1624952132 0)))))'
```

Replace *twice* address `tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw` by the faucet address you imported
(run `completium-cli show account` to display the address - Public Key hash).

## Contract API

:::note
This section is for information only, no action is required.
:::

This section presents the <Link to='/docs/dapp-first/contract#copy-contract-code'>contract</Link> API.

### Storage

The contract stores the asset id and the owner address:

| Name | Type | Description | Initial Value |
| -- | :-- | -- | -- |
| `assetId` | bytes | Hash code of the asset. | `0x68746e...` (see below) |
| `owner` | address | Address of the current asset owner. | `tz1M...ACw` (see below) |

It stores 4 extra variables used to implement the transfer of ownership process:

| Name | Type | Description | Initial Value |
| -- | :-- | -- | -- |
| `bestbidder` | address | Address of the best bidder; it is equal to the owner address when asset is not for sale. | `owner` |
| `bestbid` | tez | Best bid amount. | `0tz` |
| `endofbid` | date | Date of the end of bid. | `now` (date of origination) |
| `_state` | int | Value is either 0 (not for sale) or 1 (for sale). | `0` (not for sale) |

### Entrypoints

The ownership contract provides three entrypoints:

| Name | Parameter(s) | Description |
| -- | -- | :-- |
| `upforsale` | minimum selling price | Called by current owner to open bid process. Resulting contract state is `ForSale`. |
| `bid` | | Called by anyone. It requires: <ul> <li>the asset to be up for sale</li><li>the bid period is not over</li><li>the transferred amount is above the current best bid amount</li></ul> If these conditions are met, it transfers back the previous best bid amount to the previous best bidder, and updates the `bestbidder` and `bestbid` variables with new values; `endofbid` is incremented by 2 minutes.  |
| `claim`| | Called by anyone. It requires: <ul><li>the asset to be up for sale</li><li>the bid period to be over</li></ul>If these condidions are met, it transfers the best bid value to the previous owner, and sets the `owner` variable to the best bidder address. Contract state is set back to "not for sale".|


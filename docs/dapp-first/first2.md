---
id: first2
title: Deploy Smart Contract
sidebar_label: 2. Deploy Smart contract
slug: /dapp-first/contract
---
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

The first step is to originate (deploy) the ownership <Link to='/docs/dapp-tools/tezos#smart-contract'>Smart Contract</Link> with the *admin* test account that comes preconfigured with <Link to='/docs/dapp-tools/completium-cli'>completium CLI</Link>.

Before anything, check the *admin* account balance with the following command in the <Link to='/docs/dapp-tools/gitpod#open-terminal'>Terminal</Link>:

```
completium-cli show account
```

If the balance is below 3 tez, then follow these <Link to='/docs/dapp-tools/gitpod#check-admin-account'>instructions</Link> to import a new account (or transfer some tez to the admin account).

## Create smart contract file

Create a file named `ownership.arl` by right clicking in the left-hand panel:

<DappFigure img='new_file.png' width='50%'/>

Copy-paste the source code available <Link to='/docs/dapp-first/contract#source-code'>below</Link> and *save* the file (with ctrl/cmd + s).

## Originate contract

Enter this command in the <Link to='/docs/dapp-tools/gitpod#open-terminal'>Terminal</Link>:

```
completium-cli deploy ownership.arl
```

It displays the main origination parameters and asks for confirmation. Enter `Y` and press enter.

The output should look like:
```bash
$ gitpod /workspace/completium-dapp-first $ completium-cli deploy ownership.arl
? Confirm contract ownership.arl origination by 'admin' with 0 ꜩ on edo? Yes
Waiting for confirmation of origination for KT1BAVw4WhU7BAs2jiakDv4VrR9CNzQK32rd ...
Origination completed for KT1BAVw4WhU7BAs2jiakDv4VrR9CNzQK32rd named ownership.arl.
https://better-call.dev/edo2net/KT1BAVw4WhU7BAs2jiakDv4VrR9CNzQK32rd
```

Click on the generated link to display the contract in <Link to=''>Better Call Dev</Link> indexer. It shows the origination cost of 0.34ꜩ.

## Contract API

This section presents the <Link to='/docs/dapp-first/contract#source-code'>contract</Link> API for information only, and does not require any action from your side.

### Storage

The contract stores the asset id and the owner address:

| Name | Type | Description | Initial Value |
| -- | :-- | -- | -- |
| `assetId` | bytes | Hash code of the asset. | `0x68746e...` (see below) |
| `owner` | address | Address of the current asset owner. | `tz1M...ACw` (see below) |

It stores 4 extra variables used to implement the transfer of ownership process:

| Name | Type | Description | Initial Value |
| -- | :-- | -- | -- |
| `bestBidder` | address | Address of the best bidder; it is equal to the owner address when asset is not for sale. | `owner` |
| `bestbid` | tez | Best bid amount. | `0tz` |
| `endofBid` | date | Date of the end of bid. | `now` (date of origination) |
| `_state` | int | Value is either 0 (not for sale) or 1 (for sale). | `0` (not for sale) |

### Entrypoints

The ownership contract provides three entrypoints:

| Name | Parameter(s) | Description |
| -- | -- | :-- |
| `openAuction` | minimum selling price | Called by current owner to open bid process. Contract state is to "for sale". |
| `bid` | | Called by anyone. It requires: <ul> <li>the asset to be up for sale</li><li>the bid period is not over</li><li>the transferred amount is above the current best bid amount</li></ul> If these conditions are met, it transfers back the previous best bid amount to the previous best bidder, and updates the `bestbidder` and `bestbid` variables with new values; `endofbid` is incremented by 2 minutes.  |
| `claim`| | Called by anyone. It requires: <ul><li>the asset to be up for sale</li><li>the bid period to be over</li></ul>If these condidions are met, it transfers the best bid value to the previous owner, and sets the `owner` variable to the best bidder address. Contract state is set back to "not for sale".|

### Source code

(Click 'copy' in the upper-right-hand corner of the area below)

```archetype
archetype asset_ownership

variable assetId : bytes =
  0x68746ecbcd72793aefda48f1b67a3190fc380a7633055d2336fb90cd990582a2

variable owner : address = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw

variable bestbidder : address = owner
variable bestbid    : tez = 0tz

variable endofbid   : date = now

states =
| Owned initial
| ForSale

transition openAuction (price : tez) {
   called by owner
   from Owned to ForSale
   with effect {
      bestbid := price;
      endofbid := now + 5m;
   }
}

entry bid() {
   require {
      r1 otherwise "Asset not for sale" : state = ForSale;
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
  from ForSale to Owned
  when { now > endofbid }
  with effect {
     if balance > 0tz then
         transfer balance to owner;
     owner := bestbidder;
  }
}
```
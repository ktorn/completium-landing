---
id: escrow4
title: Purchase process
sidebar_label: Purchase process
slug: /dapp-escrow/usecase
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

The payment process requires a <a href='https://en.wikipedia.org/wiki/Escrow'>escrow</a> contract to be originated.

## Connect to wallet

Connect to the wallet by clicking the "Connect to wallet" button:

<DappFigure img='escrow-connect1.png' width='35%'/>

Then select the user account. If you don't have a dedicated user account, go to the <Link to="/docs/dapp-game/presentation#create-a-user-account">Presentation</Link> page.

Once connected, the account address is displayed in the purchase panel:

<DappFigure img='escrow-connect2.png' width='80%'/>

If the Thanos wallet is not installed (as a browser extension), then the "Install Thanos" button is displayed.

## Escrow origination

A payment contract is originated by the purchaser to start the purchase process. It supposes the seller is equipped with a contract indexer to be notified when a new purchase contract is originated.

Click the "Create escrow" button to trigger the contract creation (aka origination):

<DappFigure img='escrow-origination.png' width='100%'/>

In this example, the following parameters are hardcoded in the contract:
* seller address
* tax collector address
* tax rate
* security deposit (equal to 110% of the face value of the item)

The contract code is embedded in origination transaction's json parameter in the `script` section, split in `code` and `storage` sections.

This json format of the <Link to='/docs/dapp-tools/tezos#micheslon'>Michelson</Link> contract code (called *Micheline*) is <Link to='/docs/dapp-escrow/compilation'>generated</Link> by the <Link to='/docs/dapp-tools/archetype'>Archetype</Link> compiler.

```json
[
    {
        "kind":"origination"
        "balance":"0"
        "script":{
            "code":[...]
            "storage":{...}
        }
    }
]
```

Once created, the new contract address is displayed and links to the <Link to='docs/dapp-tools/bcd'>Better Call Dev</Link> indexer for inspection. For example:

<DappFigure img='escrow-origination2.png' width='100%'/>

## Fund escrow

The newly created escrow contract needs to be funded for the purchase query to be completed. Click the 'Fund escrow' button:

<DappFigure img='escrow-fund.png' width='100%'/>

The json's transaction parameter is displayed by clicking the `Raw` button:

```json
[{
    "kind":"transaction"
    "to":"KT1Ta6tPZiY7299CRtEEoSByW56pz4jCc9vj"
    "amount":195500000
    "mutez":true
    "parameter":{
        "entrypoint":"fund"
        "value":{
            "prim":"Unit"
        }
    }
}]
```

Note that the amount transeferred `195500000` is in mutez unit, which is 195.5ꜩ as expected.

Once validated, the balance of the escrow is displayed:

<DappFigure img='escrow-fund2.png' width='100%'/>

## Finalize purchase

When the escrow is funded, the seller may send the item to the buyer's address.

:::info
Note that only the buyer may transfer the fund to the seller. The incentive for the buyer to do so is to get back the security deposit. This may be done when the item is received.
:::

In this example, the transit process is materialized with the following popup:

<DappFigure img='escrow-transfer.png' width='50%'/>

Fill in the buyer address and click on 'Set Address'. When the address is set, the transit takes a about 20 seconds for the sake of the demonstration.

When the transit is complete, you may click on the 'Transfer fund' button in order to:
1. transfer 85ꜩ to the sellet
2. transfer back the security deposit of 85ꜩ back to you
3. transfer the tax to the tax collector

<DappFigure img='escrow-transfer2.png' width='100%'/>

The <Link to='/docs/dapp-escrow/interface#complete'>complete</Link> entry point of the escrow contract is called. Below is an example of the 3 generated internal transactions as shown in <Link to='docs/dapp-tools/bcd'>Better call Dev</Link> indexer:

<DappFigure img='escrow-transfer3.png' width='100%'/>

<DappButton url='https://better-call.dev/delphinet/opg/ooBNEg5t2UeoHcBkC32GgNjUVvbracxnhGvD5nmyBuL1efFgDMQ/contents' txt="open in BCD" />







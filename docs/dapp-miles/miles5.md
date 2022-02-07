---
id: miles5
title: Consume Miles
sidebar_label: Consume Miles
slug: /dapp-miles/consume-miles
---
import DappButton from '../DappButton';
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

Miles are consumed on the DApp user interface. Click the button below to open the DApp:

<DappButton url="https://edukera.github.io/completium-dapp-miles/" txt="open dapp"/>

## Connect to the Dapp

Connect to the DApp by clicking the "Connect" button:

<DappFigure img='miles-connect1.png' width='35%'/>

Then select the user account. If you don't have a dedicated user account, go to the <Link to="/docs/dapp-miles/usecase-presentation#create-a-user-account">Presentation</Link> page.

Once connected, the number of valid miles (ie. with expiration date in the future) is displayed:

<DappFigure img='miles-connect3.png' width='100%'/>

If the Thanos wallet is not installed (as a browser extension), then the "Install Thanos" button is displayed.

## Pick reward item

When the connected account has enough miles, the "Get it!" button of the reward item is enabled. Clicking this button generates the miles's consumption transaction to the smart contract.

For example, clicking the "Get it!" button on the 'Tezos phone case' item generates the transaction popup issued by the Thanos wallet.

<DappFigure img='miles-consume.png' width='70%'/>

You may check the transaction parameters in the "Operations" section:

```json
[
    {
        "kind":"transaction"
        "to":"KT1XpM1f6cq8cy8m8WV9xSsE5nBix2DzTYmx"
        "amount":0
        "mutez":true
        "parameter":{
            "entrypoint":"consume"
            "value":{
                "int":"5"
            }
        }
    }
]
```

Once the transaction is confirmed, you can verify the transaction online with the "Better Call Dev" indexer:

<DappButton url="https://better-call.dev/hangzhounet/KT1XpM1f6cq8cy8m8WV9xSsE5nBix2DzTYmx/operations" txt="open smart contract"/>



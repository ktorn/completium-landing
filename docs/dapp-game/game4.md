---
id: game4
title: Sign & Submit score
sidebar_label: Sign&Submit
slug: /dapp-game/usecase
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

## Connect to wallet

Connect to the wallet by clicking the "Connect to wallet" button:

<DappFigure img='game-connect1.png' width='35%'/>

Then select the user account. If you don't have a dedicated user account, go to the <Link to="/docs/dapp-game/presentation#create-a-user-account">Presentation</Link> page.

Once connected, the account address and a unique game session id are displayed:

<DappFigure img='game-connect2.png' width='50%'/>

If the Thanos wallet is not installed (as a browser extension), then the "Install Thanos" button is displayed.

## Sign score

Click the "Compute & sign score" button.

The Orcale recieves the list played actions (direction keys) and the session id.

On the Oracle side, the session id is associated to the initial board configuration. With the list of actions, the oracle is able to compute the score, sign it with its private key and send it back to the DApp's user interface.

When received, the signed score value and actions is displayed abve the "Submit" button:

<DappFigure img='game-send.png' width='100%'/>

## Submit score

Click the submit button to send it to the smart contract. The transaction information pops up:

<DappFigure img='game-send2.png' width='60%'/>

```json {11,13}
[{
    "kind":"transaction"
    "to":"KT1WXMx4kQmDpPTCFEqgtthRuQR6udy7965k"
    "amount":0
    "mutez":true
    "parameter":{
        "entrypoint":"submit"
        "value":{
        "prim":"Pair"
        "args":[{
            "bytes":"0507070a000000160000c4ae0cdc2736e665..."
        }{
            "string":"edsigtn1sDfLLjeifhqWoGLyQmkpoLN9Fmf4..."
        }]
        }
    }
}]
```

Note that 2 arguments are passed to the <Link to="/docs/dapp-game/interface#submit">submit</Link> entry point:
1. encoded data
2. signed data (by the Oracle)

The smart contract checks that the signed data is the encoded data signed by the Oracle.
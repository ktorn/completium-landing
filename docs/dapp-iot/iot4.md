---
id: iot4
title: Switch on
sidebar_label: Switch on
slug: /dapp-iot/switchon
---

import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

## Connect to wallet

<Link to="/docs/dapp-tools/thanos#connect-to-a-dapp">Connect</Link> to the DApp by clicking the "Connect to wallet" button:

<DappFigure img='iot-connect.png' width='40%'/>

Then select the user account. If you don't have a dedicated user account, go to the <Link to="/docs/dapp-tools/accounts#create-test-account">help</Link> page.

Once connected, the address and balance of the connected account is displayed:

<DappFigure img='iot-account.png' width='100%'/>

## Display bulb on mobile device

Click on the QR code area to display the QR code:

<DappFigure img='iot-qr.png' width='60%'/>

Scan the QR code and open encoded link. It is likely that the bulb is off, unless someone has already switched it on. Below is the display of the builb in off state:

<DappFigure img='iot-off.jpg' width='30%'/>

It is also possible to display the bulb <Link to="/docs/dapp-iot/switchon#display-bulb-in-a-browser">in a browser</Link>.

## Select service duration

Use the slider to select the duration. The corresponding price is displayed. It is basically computed as the duration multiplied by the price per minute:

*Session Price* = *Session Duration* * *Price per Minute*

In the DApp the *Price per Minute* is 0.82ꜩ. Hence for a duration of 4 minutes, the session price is 4*0.82 = 3.32ꜩ:

<DappFigure img='iot-price.png' width='60%'/>

## Start Service

Once connected Click the "SWITCH ON" button. The

<DappFigure img='iot-start.png' width='50%'/>

The transaction parameter may be displayed by clicking "Raw":

```json {4,9}
[{
    "kind":"transaction"
    "to":"KT1CxHBiCSvmXn9kXCbhPfdGDAggGG9ktQEX"
    "amount":3333333
    "mutez":true
    "parameter":{
        "entrypoint":"start"
        "value":{
            "prim":"Unit"
        }
    }
}]
```

We note that:
* the amount sent to the contract is `3333333` in *mutez* (a mutez is 1 million tez)
* `Unit` is the parameter value when no argument is required.

The bulb switches on when the transaction is validated:

<DappFigure img='bulb.jpg' width='30%'/>

The DApp displays the remaining time before the service stops:

<DappFigure img='iot-duration.png' width='60%'/>

## Display bulb in a browser

If you don't have a mobile phone to display the bulb, it is still possible to display it in a browser:
1. duplicate the DApp tab
2. open 'More Tools/Development tools'
3. switch on 'Mobile Device' menu

The bulb is then displayed:

<DappFigure img='iot-bulbbrowser.png' width='60%'/>


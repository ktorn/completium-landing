---
id: ideabox10
title: Add an Idea or Vote
sidebar_label: Add idea or vote
slug: /dapp-ideabox/addidea
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';


Vote for or add a new idea in the DApp web interface:

<DappButton url="https://edukera.github.io/completium-dapp-ideabox/" txt="open dapp"/>

## Connect to wallet

Connect to the wallet by clicking the "Connect" button:

<DappFigure img='ideabox-connect1.png' width='35%'/>

Then select the user account. If you don't have a dedicated user account, go to the <Link to="/docs/dapp-ideabox/presentation#create-a-user-account">Presentation</Link> page.

Once connected, the account address and the number of remmaining votes (max. is 5) is displayed:

<DappFigure img='ideabox-connect2.png' width='100%'/>

If the Thanos wallet is not installed (as a browser extension), then the "Install Thanos" button is displayed.


## Vote

We first want to check ideas with the highest number of votes. Click on the "Sort by votes" button to do so:

<DappFigure img='ideabox-sort.png' width='20%'/>

The idea with highest number of votes (at the time of writing) is "Huge gigantic banner". Click on the blue thumb-up icon to vote for it:

<DappFigure img='ideabox-top.png' width='60%'/>

You may check the json parameters, the first parameter of the <Link to="/docs/dapp-ideabox/interface#vote">vote</Link> entry point is the idea's id (7):

```json {12}
[
    {
        "kind":"transaction"
        "to":"KT1QMowNVCUngertU7bAeoZmU7XYm3gphE69"
        "amount":0
        "mutez":true
        "parameter":{
            "entrypoint":"vote"
            "value":{
            "prim":"Pair"
            "args":[{
                    "int":"7"
                }, {
                    "int":"1"
                }
            ]
            }
        }
    }
]
```

## Add an Idea

You may add a new idea and you don't need to be regsitered for that.

Click the "+" button at the bottom of the DApp:

<DappFigure img='ideabox-add.png' width='30%'/>

This displays the form to create an idea:

<DappFigure img='ideabox-form.png' width='80%'/>

Click the "Submit" button to add the idea. You may check the json parameters, the first parameter of the <Link to="/docs/dapp-ideabox/implementation#add-idea">add-idea</Link> entry point is the idea's title and the second is the idea's body :

```json {11,13}
[{
    "kind":"transaction"
    "to":"KT1QMowNVCUngertU7bAeoZmU7XYm3gphE69"
    "amount":0
    "mutez":true
    "parameter":{
    "entrypoint":"add_idea"
    "value":{
        "prim":"Pair"
        "args":[{
            "bytes":"20813100810dc01d21cc0a6e01981ec04eb0..."
        } {
            "bytes":"248170040ee0f60ae0360133008c0a660398..."
        }]
    }
    }
}]
```

Note that the idea's title and body are are sent to the contract in zipped and encoded format.
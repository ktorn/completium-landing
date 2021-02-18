---
id: nonfungible4
title: Exchange cards
sidebar_label: Exchange cards
slug: /dapp-nonfungible/usecase
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

## Buy cards


<DappFigure img='nft-buy.png' width='50%'/>

<DappFigure img='nft-buy2.png' width='50%'/>

<DappFigure img='nft-buy3.png' width='50%'/>

```json
[{
    "kind":"transaction"
    "to":"KT1GV6Z3xQ6xCdY2yzqkSBdL415mDP5SUsRc"
    "amount":600000
    "mutez":true
    "parameter":{
        "entrypoint":"buy"
        "value":[{
            "int":"973033"
        } {
            "int":"973032"
        }
        ]
    }
}]
```

<DappFigure img='nft-buy4.png' width='50%'/>

## Sell a card

<DappFigure img='nft-sell.png' width='100%'/>

```json
[{
    "kind":"transaction"
    "to":"KT1GV6Z3xQ6xCdY2yzqkSBdL415mDP5SUsRc"
    "amount":0
    "mutez":true
    "parameter":{
        "entrypoint":"sell"
        "value":{
            "int":"973033"
        }
    }
}]
```
---
id: dex10
title: Liquidity
sidebar_label: Liquidity
slug: /dapp-dex/liquidity
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

## Provide liquidity

London is hosting next year a major worldwide sport event show. You want to invest in the exchange activity of the XLD token.

Click on the 'Provide Liquidity' tab:
1. Select 'XLD'
2. Enter the number XTZ OR the quantity of XLD to provide

<DappFigure img='dex-provide1.png' width='100%'/>

Click on the 'Provide' button':

<DappFigure img='dex-provide2.png' width='50%'/>

This specifies two transactions :

1. a call to the `approve` entry point of the XLD FA 1.2 smart contract to authorize the DEX to transfer XLD ownership
2. a call to the `addLiquidity` entry point of the DEX smart contract

```json
[{
    "kind":"transaction"
    "to":"KT1H8JUiFbvEMycCuG5sZfCGHkN7vgfLAs3n"
    "amount":0
    "mutez":true
    "parameter":{
        "entrypoint":"approve"
        "value":{
            "prim":"Pair"
            "args":[{
                "string":"KT1J48AfBi8NwNaFQM1AXTvordRgSRJxK313"
            } {
                "int":"6"
            }]
        }
    }
} {
    "kind":"transaction"
    "to":"KT1J48AfBi8NwNaFQM1AXTvordRgSRJxK313"
    "amount":1487780
    "mutez":true
    "parameter":{
        "entrypoint":"addLiquidity"
        "value":{
            "prim":"Pair"
            "args":[{
                "string":"XLD"
            } {
                "int":"6"
            }]
        }
    }
}]
```

## Redeem liquidity

The sport event is now over. A lot of exchange activity accoured due to a high touristic activity. It is time to collect the fees in proportion of the quantity of liquidity tokens you own:

<DappFigure img='dex-redeem1.png' width='100%'/>
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

<DappFigure img='dex-provide1.png' width='100%'/>

<DappFigure img='dex-provide2.png' width='50%'/>

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

<DappFigure img='dex-redeem1.png' width='100%'/>
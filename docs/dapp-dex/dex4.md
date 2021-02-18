---
id: dex4
title: Exchange
sidebar_label: Exchange
slug: /dapp-dex/exchange
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

## From XTZ to city coin

<DappFigure img='dex-exchange1.png' width='100%'/>

<DappFigure img='dex-exchange2.png' width='50%'/>

```json
[{
    "kind":"transaction"
    "to":"KT1J48AfBi8NwNaFQM1AXTvordRgSRJxK313"
    "amount":144000000
    "mutez":true
    "parameter":{
        "entrypoint":"exchange"
        "value":{
            "prim":"Pair"
            "args":[{
                "string":"XTZ"
            } {
                "prim":"Pair"
                "args":[{
                    "int":"144000000"
                } {
                    "prim":"Pair"
                    "args":[{
                        "string":"XLD"
                    } {
                        "int":"661"
                    }]
                }]
            }]
        }
    }
}]
```

## From city coin to city coin

<DappFigure img='dex-exchange3.png' width='100%'/>

<DappFigure img='dex-exchange4.png' width='50%'/>

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
    "amount":0
    "mutez":true
    "parameter":{
        "entrypoint":"exchange"
        "value":{
        "prim":"Pair"
        "args":[{
            "string":"XLD"
        } {
            "prim":"Pair"
            "args":[{
                "int":"6"
            } {
                "prim":"Pair"
                "args":[{
                    "string":"XPA"
                } {
                    "int":"16"
                }]
            }]
        }]
        }
    }
}]
```


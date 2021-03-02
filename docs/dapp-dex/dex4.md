---
id: dex4
title: Exchange
sidebar_label: Exchange
slug: /dapp-dex/exchange
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

## From XTZ to city coin

Your are going to London during the week end. You need to buy some London City Coin with XTZ (Tezos currency) to visit museums:
1. Select 'XTZ' currency
2. Enter the amount of XTZ to spend
3. Select 'XLD' token
4. Quantity of XLD to get in exchange of the XTZ amount

<DappFigure img='dex-exchange1.png' width='100%'/>

Click on the 'Exchange button'; the temple wallet popup is displayed:

<DappFigure img='dex-exchange2.png' width='50%'/>

The transaction parameter specifies a call to the smart contract's entry point `exchange`:

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

This will generate a sub-transaction from the DEX contract to XLD FA 1.2 contract (see <Link to='/docs/dapp-dex'>DApp presentation</Link>).

## From city coin to city coin

It is time to come back to Paris. Exchange the XLD tokens you have not spent to XPA tokens:

1. Select 'XLD' token
2. Enter the quantity of XLD tokens
3. Select 'XPA' token
4. Quantity of XPA to get in exchange of the XLD amount

<DappFigure img='dex-exchange3.png' width='100%'/>

Click on the 'Exchange button'; the temple wallet popup is displayed:

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

We note that two transactions are generated:
1. a call to the `approve` entry point of the XLD FA 1.2 smart contract to authorize the DEX to transfer XLD ownership
1. a call to the `exchange` entry point of the DEX smart contract

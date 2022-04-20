---
id: iot40
title: Interrupt
sidebar_label: Interrupt
slug: /dapp-iot/interrupt
---

import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

It is possible to interrupt the service by clicking the "Interrupt" button:

<DappFigure img='iot-duration.png' width='60%'/>


It generates the following transaction parameter:

```json
[{
    "kind":"transaction"
    "to":"KT1CxHBiCSvmXn9kXCbhPfdGDAggGG9ktQEX"
    "amount":0
    "mutez":true
    "parameter":{
        "entrypoint":"interrupt"
        "value":{
            "prim":"Unit"
        }
    }
}]
```

It is possible to check the corresponding transactions in the <Link to="/docs/dapp-tools/bcd">Better Call Dev</Link> indexer:

<DappFigure img='iot-bcd.png' width='100%'/>

We note in the screenshot above that the smart contract pays back to the *caller* an amount in prorata of the session duration, as formulated in the smart contract <Link to="/docs/dapp-iot/implementation#interrupt">interrupt</Link> entry point:

```archetype {2,11}
function get_return_tz () : tez {
    var res : int = 1 / get_rate_in_s_by_utz() * (dateofstop - now);
    return (res * 1utz)
}

entry interrupt () {
    require {
        r2: caller = opt_get(user) and now < dateofstop
    }
    effect {
        transfer (get_return_tz()) to caller;
        dateofstop  := now - read_interval;
        dateofstart := now - read_interval;
    }
}
```


<DappButton url="https://better-call.dev/ithacanet/KT1CxHBiCSvmXn9kXCbhPfdGDAggGG9ktQEX/operations" txt="open contract"/>
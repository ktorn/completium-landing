---
id: miles3
title: Create Miles
sidebar_label: Create Miles
slug: /dapp-miles/miles-use-case2
---

import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

The first step is to provide the user account with some miles to spend on reward items in the user interface.

To do so, invoke the `add` entry point of the smart contract. In a real life production situation, miles are created by the application off-chain server which creates miles according to user activity.

In this DApp example, the off-chain server is not provided and the creation operation is done manually by invoking the smart contract's `add` entry point:

## `add` entry point

The entry point to create miles and associate to a user address is presented below:

``` archetype
entry add (ow : address,
           newmile_id : string,
           newmile_amount : int,
           newmile_expiration : date) {
   called by admin
   require {
     c1 : newmile_amount > 0;
   }
   failif {
     c2 : mile.contains(newmile_id);
   }
   effect {
     ...
   }
}
```

The `called by admin` instruction line 5 specifies that only the admin address can call the entry point.

Hence it is necessary to invoke this entry point <u>with the admin address</u>. If you have not registered the admin address in the wallet, go to the <u><Link to="/docs/dapp-miles/miles-use-case1">Prerequisites</Link></u> page.

## Miles creation transaction

The smart contract is available at the following address:

```
KT1F5DqPwKJC9qeEjTgdEQKGGBZpcAv5DX86
```

This section presents how to invoke the `add` entry point with the smart contract indexer 'Better Call Dev'; click the button blow to open the smart contract:

<DappButton url="https://better-call.dev/delphinet/KT1F5DqPwKJC9qeEjTgdEQKGGBZpcAv5DX86/operations" txt="open smart contract"/>

Click on the "Interact" tab and enter the parameters as presented below:

| Parameter | Value | Description |
| ------------- |: -------------: | ---------: |
| ow | YOUR USER ADDRESS |  address of the created miles' owner |
| newmile_id       | "USER_ADDRESS_0" | a unique for the created miles  |
| newmile_amount   | 20 | number of miles to create  |
| newmile_expiration | TOMORROW'S DATE | date beyond which miles are expired |

where:
* "YOUR USER ADDRESS" is replaced by the DApp user account to receive the miles
* TOMORROW'S DATE is replaced by a date in the future, for example tomorrow

Below is an example screenshot (with USER ADDRESS set to 'tz1dZydwVDuz6SH5jCUfCQjqV8YCQimL9GCp') of the interact panel:

<DappFigure img='bcd-miles-2.png' width='100%'/>

Once settings are set, click on the "Execute" button and select "Thanos":

<DappFigure img='bcd-miles-3.png' width='60%'/>

Once sent, the transaction should take a minute to be confirmed. When confirmed, you may click on the transaction to visualize the evolution of the contract storage. On the screenshot below, check create miles (highlighted in green):

<DappFigure img='bcd-miles-4.png' width='100%'/>

Next step is to go to the user interface to spend these 20 miles on reward items!








---
id: miles2
title: Overview
sidebar_label: Overview
slug: /dapp-miles/miles-use-case1
---

import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

The Use Case scenario is two-steps:

* Create miles associated to a user account (as the smart contract's admin)
* Consume Miles in the Dapp user interface (as a user)


## User Interface

Below is a screenshot of the user interface once the wallet's account connected:

<DappFigure img='miles_screenshot_help.png' width='80%'/>

① User's Miles information:
 * Total number of owned miles
 * Time left til next miles' expiration

② Button to see the list of miles and their expiration date

③ Reward item data:
* overview photo
* cost in miles
* title

Click on "Get it!" button to order it. This is calling the smart contract's 'consume' entrypoint.

## Prerequisites

### Smart contract's admin account
In order to create miles, it is required that you have the smart contract's admin account registered in the wallet. Since dealing with testnet accounts, the admin account is created from a faucet file. Click the button below for the import instructions:

<DappButton url="dapp-tools/thanos" txt="go to import instructions" internal={true}/>

### User account

In order to consume miles, it is strongly adviced that you use a dedicated test user account.

Instructions to create such a an account are available here.
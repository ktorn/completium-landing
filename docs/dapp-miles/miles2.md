---
id: miles2
title: Use Case Presentation
sidebar_label: Presentation
slug: /dapp-miles/usecase-presentation
---

import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

The Use Case scenario of the <Link to="/docs/dapp-miles">Fidelity program</Link> DApp is two-steps:

1. <Link to="/docs/dapp-miles/create-miles">Create miles</Link> associated to a user account (as the smart contract's admin)
2. <Link to="/docs/dapp-miles/consume-miles">Consume Miles</Link> in the Dapp <Link to="docs/dapp-miles/usecase-presentation#user-interface">user interface</Link> (as a user)

In order to consume miles, you need a *dedicated test user account*. Go to <Link to="/docs/dapp-miles/usecase-presentation#create-a-user-account">section below</Link> for instructions to create one.
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

## Create a user account

The process to create a new user account is two-steps:
1. download a new faucet file from faucet site (<Link to="/docs/dapp-tools/accounts#create-test-account">instructions</Link>)
2. import it in wallet (<Link to="/docs/dapp-tools/thanos#import-faucet-file">instructions</Link>)

It is suggested that you name the account "Completium Dapp user" for example.

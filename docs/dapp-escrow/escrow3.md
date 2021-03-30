---
id: escrow3
title: Use Case Presentation
sidebar_label: Presentation
slug: /dapp-escrow/Presentation
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

import Link from '@docusaurus/Link';

The Use Case scenario of the <Link to="/docs/dapp-escrow">Online Purchase</Link> DApp consists in executing the purchase steps:
* deploy a payment contract
* fund the contract
* terminate when delivered

You need a <Link to="/docs/dapp-escrow/Presentation#create-a-user-account">user account</Link> to interact with the smart contract.

## User Interface

Below is a screenshot of the user interface once the wallet's account connected:

<DappFigure img='escrow-help.png' width='80%'/>

① Item description

② Purchase action area

## Create a user account

The process to create a new user account is two-steps:
1. download a new faucet file from faucet site (<Link to="/docs/dapp-tools/faucet#create-test-account">instructions</Link>)
2. import it in wallet (<Link to="/docs/dapp-tools/thanos#import-faucet-file">instructions</Link>)

It is suggested that you name the account "Completium Dapp user" for example.
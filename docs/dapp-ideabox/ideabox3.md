---
id: ideabox3
title: Use Case Presentation
sidebar_label: Presentation
slug: /dapp-ideabox/presentation
---

import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

The Use Case scenario of the <Link to="/docs/dapp-ideabox">Idea box</Link> DApp is two-steps:

1. <Link to="/docs/dapp-ideabox/register">Register</Link> your user account (as the smart contract's admin) to be able to vote for or add a new idea
2. <Link to="/docs/dapp-ideabox/addidea">Vote</Link> for an idea or <Link to="/docs/dapp-ideabox/addidea">add</Link> a new one

In order to interact with the contract, you need a *user account*. Go to <Link to="/docs/dapp-ideabox/presentation#create-a-user-account">section below</Link> for instructions to create one.
## User Interface

Below is a screenshot of the user interface once the wallet's account connected:

<DappFigure img='ideabox-help.png' width='80%'/>

① Connected account address and number of votes left

② Sort ideas by:
* date of creation
* number of votes
* id

③ Idea item with:
* title
* text
* vote button (blue thumb up)
* number of votes

④ Create new Idea button

## Create a user account

The process to create a new user account is two-steps:
1. download a new faucet file from faucet site (<Link to="/docs/dapp-tools/accounts#create-test-account">instructions</Link>)
2. import it in wallet (<Link to="/docs/dapp-tools/thanos#import-faucet-file">instructions</Link>)

It is suggested that you name the account "Completium Dapp user" for example.
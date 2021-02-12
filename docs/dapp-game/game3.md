---
id: game3
title: Use Case Presentation
sidebar_label: Presentation
slug: /dapp-game/Presentation
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

The Use Case scenario of the <Link to="/docs/dapp-game">2048 Competition</Link> DApp consists in playing a 2048 game and <Link to="">sending the score</Link> to a smart contract to decide who the winner is.

You need a <Link to="/docs/dapp-game/Presentation#create-a-user-account">user account</Link> to interact with the smart contract.

## User Interface

Below is a screenshot of the user interface once the wallet's account connected:

<DappFigure img='2048-help.png' width='80%'/>

① 2048 game area: use up/right/down/left keys to move squares to the desired direction and accumulate scores

② Account data:
* address
* session id
* session actions

③ Compute / Send button
1. first recompute score from actions and get it signed from Orcale
2. store it in smart contract

④ Leader Board

## Create a user account

The process to create a new user account is two-steps:
1. download a new faucet file from faucet site (<Link to="/docs/dapp-tools/accounts#create-test-account">instructions</Link>)
2. import it in wallet (<Link to="/docs/dapp-tools/thanos#import-faucet-file">instructions</Link>)

It is suggested that you name the account "Completium Dapp user" for example.

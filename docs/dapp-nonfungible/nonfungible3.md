---
id: nonfungible3
title: Use Case Presentation
sidebar_label: Presentation
slug: /dapp-nonfungible/presentation
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

import Link from '@docusaurus/Link';

The Use Case scenario of the <Link to="/docs/dapp-nonfungible">Collectible cards</Link> DApp consists in the exchange (buy & sell) of *cryptobots* cards.

You need a <Link to="/docs/dapp-escrow/Presentation#create-a-user-account">user account</Link> to interact with the smart contract.

## User Interface

Below is a screenshot of the user interface once the wallet's account connected:

<DappFigure img='nft-help.png' width='80%'/>

① Buy basket: click to display the list of to be purchased cards

② Action area:
* Display catalog of cards to be purchased / Your deck of cards
* Sort card button (by name, by id, ...)

③ Cards deck

## Create a user account

The process to create a new user account is two-steps:
1. download a new faucet file from faucet site (<Link to="/docs/dapp-tools/faucet#create-test-account">instructions</Link>)
2. import it in wallet (<Link to="/docs/dapp-tools/thanos#import-faucet-file">instructions</Link>)

It is suggested that you name the account "Completium Dapp user" for example.
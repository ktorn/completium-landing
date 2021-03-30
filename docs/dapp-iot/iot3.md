---
id: iot3
title: Use Case Presentation
sidebar_label: Presentation
slug: /dapp-iot/presentation
---

import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

The Use Case scenario of the <Link to="/docs/dapp-iot">Connected Object</Link> DApp is two-steps:

1. <Link to="/docs/dapp-iot/switchon">Switch on</Link> the online bulb and check it on your mobile phone
2. Optionally <Link to="/docs/dapp-iot/interrupt">interrupt</Link> the session, and get your tez back in prorata of the its duration

In order to switch on the online bulb, you need a *dedicated test user account*. Go to <Link to="/docs/dapp-iot/presentation#create-a-user-account">section below</Link> for instructions to create one.
## User Interface

Below is a screenshot of the user interface once the wallet's account connected:

<DappFigure img='iot-help.png' width='80%'/>

① Connected account information (address, balance)

② Slider to specify session duration (in minutes). Price and displayed below.

③ "Switch on" button to start session

④ Bulb's QR code: click to display

The "Switch on" button calls the smart contract's <Link to="/docs/dapp-iot/interface#start">start</Link> entrypoint.

## Create a user account

The process to create a new user account is two-steps:
1. download a new faucet file from faucet site (<Link to="/docs/dapp-tools/faucet#create-test-account">instructions</Link>)
2. import it in wallet (<Link to="/docs/dapp-tools/thanos#import-faucet-file">instructions</Link>)

It is suggested that you name the account "Completium Dapp user" for example.
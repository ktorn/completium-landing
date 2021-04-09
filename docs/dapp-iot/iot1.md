---
id: iot1
title: Connected Object
sidebar_label: Introduction
slug: /dapp-iot
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

<DappFigure img='iot-screen.png' width='100%'/>

<DappButton url="https://edukera.github.io/completium-dapp-iot/" txt="open dapp"/>

## Introduction

 A public connected object is activated for a certain duration against payment. Such an object can be:
 * an electric vehicle supply equipment
 * an advertising display equipment (online or IRL)
 * a jukebox in a public place (café, street urban equipment, ...)
 * ...

## DApp

In this DApp example, the connected object is a simple online bulb accessible on mobile device:
<DappFigure img='bulb.jpg' width='30%'/>

You may switch it on and off via the DApp's web interface by sending XTZ to the object's <Link to="/docs/dapp-tools/tezos#smart-contract">smart contract</Link>.

### Architecture

The connected object is permanently reading its state and service information in its associated smart contract.

<DappFigure img='iot-archi.svg' width='80%'/>

0. The customer interacts with the smart contract through the DApp's <Link to="/docs/dapp-iot/presentation">web interface</Link>. The <Link to='/docs/dapp-iot/interface'>smart contract</Link> provides two entry points:
  * `start` to start the service
  * `interrupt` to interrupt the service

1. the connected object reads its state on a regular basis (typically every 5 seconds)
2. the connected object may retrieve content to broadcast from a content server

Inspect the smart contract transactions in <Link to='/docs/dapp-tools/bcd'>Better Call Dev</Link>:

<DappButton url="https://better-call.dev/edo2net/KT19ZQUnVrDT5xnfvPqYhn1DeM489875oWGU/operations" txt="inspect smart contract"/>


:::info
In this DApp example, there is no need for a content server because of the simple nature of the on/off bulb service. With more sophisticated objects like advertising display equipment, the content to display is retrieved from a dedicated off-chain content server.
:::

### Benefits

The use of the Tezos blockchain *tremendously* reduces the setup and exploitation costs, as it provides the following services:
1. secured payment system
2. auditable and persistent transaction system
3. public and verifiable business logic

The setup effort is minimal:
* the smart contract is 30 lines long and simple to deploy
* the business logic on the connected object side basically consists in an infinite reading loop and the capacity to perform standard HTTP GET connection to read the contract's storage

The cost per transaction is the fee to call the contract, which is 0.002109 ꜩ per transaction!


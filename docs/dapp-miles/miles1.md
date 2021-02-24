---
id: miles1
title: Fidelity program
sidebar_label: Fidelity program
slug: /dapp-miles
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

<DappFigure img='miles_screenshot.png' width='100%'/>

<DappButton url="https://edukera.github.io/completium-dapp-miles/" txt="open dapp"/>

## Introduction

Customers of a service (transport, gaming, grocery, ...) receive miles in reward for their activity with the service: miles are received for examples, for each travel in proportion of the distance traveled; or when completing an achievement in a game; or when achieving a certain amount of purchase; and so on. Miles may then for example be traded in for gifts or cash-back, or any kind of reward.

Such miles rewarding program are put in place by Marketing departments to retain customers.
## DApp

This Dapp example provides the Tezos's <Link to='/docs/dapp-tools/tezos#smart-contract'>smart contract</Link> for miles management, and a web interface to interact with the contract.

In this example, each mile has an *expiration date* beyond which it cannot be consumed. The smart contract guarantees that only valid miles can be consumed.

A smart contract on the Tezos blockchain is used to store and manage customers' miles lifecycle, namely miles creation and consumption operations.

### Architecure

The Dapp architecture is 3-tier:
* Tezos' smart contract (to store and manage miles' lifecycle)
* User web interface for customer to exchange miles (consume) for rewards
* Standard application server to create miles according to customer activity

Interactions between these three elements are illustrated in the schema below:

<DappFigure img='miles-dapp-architecture.svg' width='60%'/>

The User Interface straightforwardly interacts with the smart contract to consume miles. The resulting blockchain's hash operation is sent to the App Server with other operation informations (selected product(s) id(s)).

It uses a wallet technology (hardware or sofware) to forge, sign and send the operations to the blockchain.

The Application Server interacts with the blockchain through a dedicated library that provides a high level API. It is <u>not provided</u> in this example Dapp though.
### Benefits

The benefits of the on-chain miles' lifecycle management are:
* reliability of miles' management: the consumption rule is publically available to the customer in the smart contract code
* the quantity of miles a customer has acquired may be used to prove activity to any other third party

A blockchain based miles registry is especially suited for mutualising activity accross mulitple brands and services since it solves miles ownership and miles management issues.


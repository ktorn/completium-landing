---
id: escrow1
title: Online Purchase
sidebar_label: Online Purchase
slug: /dapp-escrow
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

<DappFigure img='escrow-screen.png' width='100%'/>

<DappButton url="https://edukera.github.io/completium-dapp-escrow/" txt="open dapp"/>

## Introduction

An online retailer provides a centralized payment process: the payment (or an authorization to withdraw) is first received from the buyer and then is transferred (or is withdrawn from the buyer account) to the seller via the retailer when the purchased item is delivered.

How to decentralize the payment process with the blockchain technology? That is how to replace the centralized retailer organization which serves as a trusted third party to transfer the payment from the buyer to the seller?

The challenges to address are:
* how to ensure the seller that the buyer is willing to purchase?
* who is responsible for transferring the payment to the seller?
* how to manage item delivery failures?
* ...

## DApp

In this example DApp a <Link to='/docs/dapp-tools/tezos#smart-contract'>smart contract</Link>, called an <a href='https://en.wikipedia.org/wiki/Escrow' target='_blank'>escrow</a> contract, is used to implement the payment transfer process.

The basic principle of an escrow contract is to hold the payment transferred by the buyer and to relase it to the seller when the delivering process is achieved.

The purchase process starts when the buyer creates the escrow contract and transfers or the payment to it (ie. *funds* it). The seller is notified thanks to a dedicated *contract indexer*. A contract indexer is an off-chain permanent process that monitors and analyses newly created contracts.

At this stage the seller may *abort* the contract for any reason, typically when the retailing web page is not synchronized with the seller's reality (out of stock situation, change in price, and so on):
* if *aborted* by the seller, the escrow contract transfers the payment back to the buyer
* if *accepted* by the seller, then transit of the purchased item may occur

The next step is be to transfer the payment to the seller when the item is delivered. For simplicity purpose, we consider the item is properly delivered. The situation of delivery failure is addressed in the <Link to='/docs/dapp-escrow#discussion'>discussion</Link> section below.

Ideally the buyer transfers the payment to the seller when the item is delivered. However what does prevent the buyer from not transferring the payment?

In order to address this issue, the idea is to create a <u>security deposit</u> that is transferred at contract creation. In this DApp the security deposit is *110%* of the item price. That is that in order to purchase a 100ꜩ item, a total transfer of 210ꜩ is required. In order to get back the security deposit, the buyer has to transfer the payment to the seller.

The figure below illustrates the main payment process:

<DappFigure img='escrow-schema.svg' width='60%'/>

1. contract origination and funding with payment and security deposit
2. seller accepts the contract (with `accept` contract entry point)
3. buyer finalizes the contract (with `finalize` contract entry point):
   1. payment is transferred to seller
   2. security deposit is transferred back to buyer

### Architecture

The DApp architecture is 4-tier:
1. escrow smart contract
2. off-chain retailing web pages and content servers
3. off-chain contract indexer
4. off-chain seller's back office

<DappFigure img='escrow-archi.svg' width='70%'/>

For simplicity purpose, the contract indexer and seller back office interface are not provided in this DApp example.

### Benefits



### Discussion
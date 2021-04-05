---
id: first0
title: Transfer of Ownership
sidebar_label: 0. Introduction
slug: /dapp-first
---
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

<DappFigure img="ownership_logo.svg" width='30%' />

The decentralized application you are about to develop allows the purchase of an asset whose title of ownership is a <Link to='/docs/contract'>Smart Contract</Link> on the <Link to='/docs/dapp-tools/tezos'>Tezos</Link> blockchain.

The DApp enables the *transfer of ownership* of the asset based on a bid process:
1. the current owner puts the asset up for sale, which enables anyone to bid during a period
2. bids are placed and the best bid is escrowed by the contract
3. best bidder claims ownership when bid period is over, previous owner receives best bid amount

The DApp's user interface enables a bidder to *bid* and *claim* ownership. Follow the process step by step and in ten minutes you are claiming the ownership of the asset!
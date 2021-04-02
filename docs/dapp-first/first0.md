---
id: first0
title: Transfer of Ownership
sidebar_label: 0. First DApp
slug: /dapp-first
---
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

The decentralized application you are about to developp allows the purchase of an asset whose title of ownership is a <Link to='/docs/dapp-tools/tezos#smart-contract'>Smart Contract</Link> on the Tezos blockchain.

The DApp enables the *transfer of ownership* of the asset based on a bid process:
1. the current owner puts the asset up for sale, which enables anyone to bid during a period
2. bids are placed and the best best bid is escrowed by the contract
3. best bidder claims ownership when bid period is over, previous owner receives best bid amount

The DApp's user interface enables a bidder to bid and claim ownership. The schema below illustrates the DApp architecture:

<DappFigure img="ownership.svg" width='50%'/>

Follow the process step by step and in ten minutes you are claiming the ownership of the asset!
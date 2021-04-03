---
id: first7
title: To go further
sidebar_label: 7. To go further
slug: /dapp-first/further
---
import Link from '@docusaurus/Link';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

<DappFigure img="rocket.svg" width='30%' />

Obviously there is plenty of room for improvement of the UI.

First, the bid process could display the <Link to='/docs/dapp-first/contract#storage'> best bid</Link> amount when the asset is for sale. However, instead of storing contract data locally in the `OwnershipData` component with the React hook `usesState`, it should rather be managed with a global storage facility like <a href='https://www.npmjs.com/package/constate' target='_blank'>constate</a>. This would make the contract data easily available in other components.

Then, the bid amount shouldn't be hard-coded to 10 tezis obviously, but rater be set with an input field. This input field could for example check whether the bid amount is above the current best bid and below the account balance, and display an error message if not.

Then, it would be convenient to refresh the best bid data automatically. This can be done by setting a timer to reload contract data on a regular basis. An example of such a refresh feature may be found in the <Link to='/docs/dapp-zcb/'>Zero-Coupon Bond</Link> DApp example: in this DApp, the contract history tab is automatically updated when a transaction is sent to the smart contract. (link to <a href='https://github.com/edukera/completium-dapp-zerocouponbond/blob/master/src/indexer.js' target='_blank'>source code</a>). You may use the *Better Call Dev* <a href='https://better-call.dev/docs#operation/get-contract-operations' target='_blank'>Web API</a> to retrieve contract operations in raw Json format.

## Other Ownership DApps

Try to create a DApp that creates ownership contracts. It is indeed possible to deploy a smart contract with Taquito as explained in this <Link to='/docs/dapp-tools/taquito#contract-origination'>section</Link>. A template to start from is again the <Link to='/docs/dapp-zcb/'>Zero-Coupon Bond</Link> DApp example.

Another nice DApp would be an ownership contracts indexer, which notifies when a new contract is deployed on the blockchain, when an asset is up fo sale, when an ownership has been transferred, and so on.

## Smart Contracts

Write your own smart contract with <Link to=''>Archetype</Link>, a high-level domain-specific language with all Michelson features, plus exclusive features (new types, state machine design, ...) to ease development, tests and formal verification.

Archetype comes with a convenient set of <a href='https://github.com/edukera/try-archetype#smart-contracts-base' target='_blank'>contract examples</a> to start with. Scan it, select the one to start from, and adapt it to your needs. Learn the Archetype language with a eight steps online tutorial:

<DappButton url="https://gitpod.io/#https://github.com/edukera/try-archetype" txt="try archetype"/>

## Explore DApp examples

Dapps presented <Link to='/dapps#dapp_examples'>here</Link> are potential real-life applications that illustrate how to leverage the Tezos blockchain technology to create a new generation of game-changing applications. Explore them to figure out everything about DApps!






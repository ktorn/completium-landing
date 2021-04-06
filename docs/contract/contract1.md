---
id: contract1
title: Introduction
sidebar_label: Introduction
slug: /contract
---

import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

A smart contract is a program that is executed by the blockchain.

<DappFigure img='smart-contract.svg' width='35%'/>

Smart contracts unleash the full potential of the blockchain because they enable the development of a new class of applications, called *Decentralized Applications* (DApps), which benefit from blockchain's strengths (decentralization, trust-less, immutability, governance by consensus in <Link to='/docs/dapp-tools/tezos'>Tezos</Link> case, ...).

A smart contract is similar to a stored procedure on a public distributed database. As such, it must ensure the **logical consistency** and integrity of the data.

## Structure

A smart contract possesses:
1. an *address*
2. a *balance* of currency
3. a *storage* of data
4. a *code* to implement the contract's *business logic*, structured as *entrypoints* to call

Contract storage, code and transactions (incoming and outcoming) are all *publically* available.

## Business logic

Besides the storage data, the following information is available to the contract's business logic:
* **when** the contract is called
* **who** the contract is called by
* **how much** currency is **transferred** to the contract
* **how much** currency the contract **owns** (balance)

The contract can be programmed to send currency to an account or to another contract.

## Cost

Originating (deploying) a smart contract has a cost which depends on the size of the code and the size of the initial storage.

Calling a smart contract has a cost which depends on:
* the complexity of the execution (number and nature of instructions executed by the program)
* the size of additional data it creates
* a constant fee

Currently on <Link to='/docs/dapp-tools/tezos'>Tezos</Link>, the cost of origination is 0.000250 ꜩ per byte of data. The constant fee is the *baker fee* equal to 0.001189 ꜩ (it may be increased to increase transaction priority).

Note that once data storage is allocated to the contract, it does not decrease; if data has been removed by the contract, additional data does not require payment while total data size remains below allocated storage size.

## Limits

The *gas* is the unit to measure code execution and storage allocation for any kind of transactions (origination, call to an entrypoint).

Currently on <Link to='/docs/dapp-tools/tezos'>Tezos</Link>, the gas per transaction is limited to 1040000.


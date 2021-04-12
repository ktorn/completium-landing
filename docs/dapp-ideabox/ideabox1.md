---
id: ideabox1
title: Idea Box
sidebar_label: Introduction
slug: /dapp-ideabox
---
import Link from '@docusaurus/Link';
import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

<DappFigure img='ideabox-screen.png' width='100%'/>

<DappButton url="https://edukera.github.io/completium-dapp-ideabox/" txt="open dapp"/>

## Introduction

An online retail company wants to improve customer experience by setting up an ideabox for customers and/or employees to post improvement ideas. After a voting period, the top 3 ideas are selected. Voters must be registered by the ideabox's chairman.

## DApp

This DApp example provides the Tezos' smart contract to store ideas and votes, and a web interface to display, add and vote for ideas.

Voters must be registered to be able to vote for or add ideas to the box. Each voter is assigned a maximum number of 5 votes.

The DApp *chairman* registers voters, and decides when the voting period starts and ends. Ending the vote process triggers the selection of top ideas.

### Architecture

The DApp is made of a <Link to='/docs/templates/ideabox'>smart contract</Link> and a web interface for voters to interact with the smart contract:

<DappFigure img='ideabox-archi.svg' width='80%'/>

An idea is made of a title and a body. Ideas are stored in the contract's storage in *zipped* format to reduce the contract size and reduce transaction costs. The positive side effect is that ideas are not on-chain readable as such.

Inspect the smart contract transactions in <Link to='/docs/dapp-tools/bcd'>Better Call Dev</Link>:

<DappButton url="https://better-call.dev/edo2net/KT1QNURPMuFJSmTLRttRutb4gfJ6NS4BfsM6/operations" txt="inspect smart contract"/>

### Benefits

The use of the Tezos blockchain makes it easy to setup a robust and auditable application because the blockchain serves as the server with just a 50 lines long smart contract.

### Discussion

Are votes anonymous?

The publically available information is the account address that voted for/added an idea. If the association between the address and the person the address belongs to is unknown, then the process may be considered as *anonymized*.

As a consequence, it is advised that the voter uses a *dedicated* address for the DApp.

Note that all the information about the address is available though: when did it vote, for which idea and so on.

The `register` entry point requires that the DApp chairman knows the identity that goes with the address in order to decide whether to register the address. The off-chain register process may consist for example in sending the chairmain an email with the address to register.

:::info
If voters use dedicated addresses, voters identity is only known by the DApp chairmain
:::


---
id: nonfungible1
title: Collectible Cards
sidebar_label: Collectible Cards
slug: /dapp-nonfungible
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

<DappFigure img='nft-screen.png' width='100%'/>

<DappButton url="https://edukera.github.io/completium-dapp-nonfungible/" txt="open dapp"/>

## Introduction

The *cryptobot* company is issuing a hundred collectible robot cards. Build your optimal card deck by buying and selling them online!

## DApp

This example DApp is using a <a href='https://en.wikipedia.org/wiki/Non-fungible_token' target='_blank'>Non Fungible Token</a> smart contract (NFT) to manage cards ownership.

Conversely to fungible token, a non-fungible token represents a unique asset and cannot be combined to another token.

The <Link to='/docs/templates/nft'>smart contract</Link> used in this DApp implements the official Tezos <a>Financial Asset 2.0</a> specification.

In a nutshell it specifies that a NFT has the following entry points:
* `update_operators` is used to authorize third party to transfer tokens
* `transfer` is used to actually transfer ownership
* `balance_of` is used to retrieve ownership information


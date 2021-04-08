---
id: dex1
title: Decentralised Exchange
sidebar_label: Decentralised Exchange
slug: /dapp-dex
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

import MathJax from 'react-mathjax';

<DappFigure img='dex-screen.png' width='100%'/>

<DappButton url="https://edukera.github.io/completium-dapp-dex/" txt="open dapp"/>

## Introduction

Year 2038. FIAT currencies have collapsed under nations' huge public debts, and a great reset in the economy has favorised the raise of City Coins: each main city is now emitting its own token for citizens and tourists to pay for public services (transport, museums, ...) and some affiliated retail shops.

When moving or traveling from one city to another, you need to exchange from one City Token to another.

Nine prestigious cities have decided to get together and propose a Decentralized EXchange (DEX) system on the Tezos blockchain: Athens, London, New York, Moscow, Paris, Rio de Janeiro, Rome, Tokyo and Sydney.

Buy and sell City Tokens with the DEX!

## DApp

### Exchange principle

A <a href='https://en.wikipedia.org/wiki/Decentralized_exchange' target='_blank'>Decentralized Exchange</a> (DEX) is a business that allows customers to trade cryptocurrencies or digital currencies for other assets in a decentralized way, that is without the need for an intermediary.

The automated market maker's (AMM) principle of the DEX presented in this example DApp is the one of *Uniswap*, as presented in <a href='https://web.stanford.edu/~guillean/papers/uniswap_analysis.pdf' target='_blank'>this paper</a>.

There is a *pool* for each each token from which tokens are withdrawn from and credited to. The quantity of tokens in the pool is noted p.

Say a user wants to exchange a quantity *qA* of Token A against a quantity *qB* of token B. In that case, the user credits the pool of Token A with *qA* tokens, and *qB* tokens from pool of Token B are sent to the user, as illustrated below:
<DappFigure img='dex-principle.svg' width='70%'/>

How to compute *qB* as a function of *qA*?

The principle is to consider that the product of *pA* and *pB* is constant; it is named *constant product markets*. Formally there exists a constant value *k* such that:

<MathJax.Provider>
<MathJax.Node formula={`pB*pA=k`} />
</MathJax.Provider>

The quantities *qB* of Token B and *qA* of Token A are such that they keep the resulting pool quantities equal to this constant, which writes:

<MathJax.Provider>
<MathJax.Node formula={`(pB - qB)*(pA + qA)=k`} />
</MathJax.Provider>

Each exchange transaction is subject to a fee. Let *f* be the percentage of *qA* that are subject to a fee, so that <MathComponent tex={String.raw`(1-f)*qA`} /> is the quantity left to increment the pool. The constant product market equation then writes:

<MathJax.Provider>
<MathJax.Node formula={`(pB - qB)*(pA + (1-f)*qA)=k`} />
</MathJax.Provider>

Which simplifies to:

<MathJax.Provider>
<MathJax.Node formula={`qB = pB * \\frac{(1-f)*qA}{pA+(1-f)*qA}`} />
</MathJax.Provider>

At the beginning, pools A and B are empty and must then be initialized by providing liquidity to both of them, thus setting the initial exchange rate.

It is also possible to provide liquidity to the pair of of pool any time according to exchange rate. Transaction fees are transferred to liquidity providers in proportion to their liquidity ownership.

### Architecture

The section above presents the exchange principle between two tokens A and B. In the example DApp you can exchange between XTZ and the City Coins: each city coin's pool is associated to a dedicated XTZ (Tezos currency) pool:

<DappFigure img='dex-principle2.svg' width='30%'/>

Tokens ownership is managed with a <Link to='/docs/templates/fa12'>FA 1.2 smart contract</Link> per Token. FA 1.2 is a specification of Fungible Token ownership for the Tezos blockchain; a FA 1.2 contract provides the following entry points:
* `allow` to authorize a third party to transfer a given quantity of token
* `transfer` to transfer a quantity of tokens from one account to another according to transfer authorizations
* `get_balance` enable to retrieve account balance

A detailed presentation of the <a href='https://archetype-lang.org/'>Archetype</a> implementation is available <a href='' target='_blank'>here</a>.

The <Link to='/docs/templates/dex'>DEX smart contract</Link> manages the XTZ pools, the interactions to the FA 1.2 contracts, and the liquidity ownership data:

<DappFigure img='dex-principle3.svg' width='80%'/>

* `exchange` is the unique entry point to exchange
  * from XTZ to a token
  * from a token to XTZ
  * from a token to another token
* `provide liquidity` to provide liquidity the XTZ pool and the token pool against *liquidity tokens*
* `redeem liquidity` to redeem liquidity tokens for XTZ

When exchanging from one city token A to another B, the DEX actually generates two exchanges:
1. exchange from A to XTZ
2. exchange from XTZ to B

Note that:
* when exchanging city token for XTZ, the token ownership is transferred from the user's account to the DEX account as a FA 1.2 does not allow token destruction; in that case the user needs to allow the DEX for transferring ownership by calling ``
* when exchanging XTZ for city token, the token ownership is transferred from the DEX's account to the user's account


---
id: game1
title: 2048 Competition
sidebar_label: 2048 Competition
slug: /dapp-game
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

<DappFigure img='2048-screen.png' width='100%'/>

<DappButton url="https://edukera.github.io/completium-dapp-2048/" txt="open dapp"/>

## Introduction

Win the competion of the famous <a href="https://en.wikipedia.org/wiki/2048_(video_game)" target="_blank">2048</a> game by obtaining the highest score.

The 2048 game consists in sliding numbered tiles that pops up at *random* position on the grid after each sliding move. Sliding a tile on top of another make the tiles merge and increases the value of the resulting tile. The goal is to obtain a 2048 valued tile.

The challenge is to guarantee contestants that the competition is fair, that is that the highest submitted score gets the prize, and that scores cannot be artificially manufactured.

## DApp

This example DApp illustrates how to organize a fair competition with the help of the Tezos blockchain.

A new score is stored in the DApp's <Link to='/docs/dapp-tools/tezos#smart-contract'>smart contract</Link> storage by invoking the <Link to='/docs/dapp-game/interface#submit'>submit</Link> entry point. How to prevent anyone from storing any arbitrary score ?

A standard solution is to use an *Oracle* which is an off-chain process whose role is to guaranty the validity of the data stored in the smart contract by <Link to='/docs/dapp-tools/tezos#signing-data'>signing</Link> the data.

In order to accept a score, the smart contract verifies that the score is signed by the Oracle.

How does the *Oracle* guarantee that the score is correct?

<DappFigure img='game-oracle.png' width='60%'/>

For that, the Oracle needs to get the list of moves to compute the score and sign it. However what does prevent anyone to build an artificial session with highest score and have it signed?

The solution is that the Oracle generates the random tiles positions from a <a href='https://en.wikipedia.org/wiki/Random_seed' target='_blank'>seeded</a> Random Number Generator: the request to sign a score requires to provide the oracle with:
* a unique session id
* the list of moves

The unique session id is internally associated with a seed for the Oracle to regenerate the session and compute score with the gamer's moves.

As a consequence each game is associated to a unique session id provided by the Oracle. It is displayed in the upper right hand corner of the DApp's web interface:

<DappFigure img='game-sessionid.png' width='60%'/>

Note that the random seed is not (and must no be) known by the player. Note also this implies that the Orcale is solicited at each player move for the next tile position.

### Architecture

The Dapp architecture is 3-tier:

* Tezos' smart contract (to store Oracle-signed scores)
* User web interface for customer to exchange miles (consume) for rewards
* Game *oracle* that:
  * provides a new unique session id at each new game session
  * provides with random tile position
  * sign score from list of moves

Interactions between these three elements are illustrated in the schema below:

<DappFigure img='game-archi.svg' width='100%'/>

The smart contract provides other entry points for administration purpose. The complete interface is presented <Link to='/docs/dapp-game/interface'>here</Link>.

In this DApp example, for simplicity purpose, the Oracle server is <u>not provided</u> as a separate entity, but rather embedded in the web interface. You are invited to implement a stand alone operational version of the Oracle.

### Benefits

The DApp architecture provides out a the box a high level of security and an auditable process to figure out the origin of a score.

Beside the blockchain security features (immutability, transparent business logic), the remaining security challenges are on the Oracle part:
* keep Oracle's private key private
* keep the random seeds private
* provide activity log and code source for anyone to be able to reproduce score computation

Indeed:
* anyone with the private key could sign any score in place of the Oracle
* anyone with the random seed could build a game session with arbitrary high score

### Discussion

Could the score computation process be performed by the smart contract?

Why not? Indeed this would almost remove the need for an Oracle to sign the score.

However this does not remove the need for a secure Random Number Generator that is kept secret. Moreover, due to its highly replicated nature, a blockchain is not designed for intensive CPU/storage tasks: indeed each node runs the call to smart contracts; that's why such tasks are controlled in several ways:
* smart contract storage (including execution code) is limited
* transaction cost is proportional to execution complexity

:::info
The blockchain is not designed for CPU/storage intensive tasks. Such tasks are handled by off-chain *Oracle* process.
:::
---
id: zcb1
title: Zero Coupon Bond
sidebar_label: Zero Coupon Bond
slug: /dapp-zcb/
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

<DappFigure img='zcb-screen.png' width='100%'/>

<DappButton url="https://edukera.github.io/completium-dapp-zerocouponbond/" txt="open dapp"/>

## Introduction

You work in the business department of a law company which uses an online solution to deploy DeFi contracts on the Tezos blockchain.

Today you are deploying a Zero-Coupon Bond contract from the tailord template. Fill in the contract parameters and deploy the smart contract.


The holder (or subscriber) of a <a href='https://en.wikipedia.org/wiki/Zero-coupon_bond' target='_blank'>Zero-Coupon bond</a> provides the bond's present value to the issuer and gets redeemed at maturity date of its face value.

In this example DApp, the *present* value of the bond (value at which the bond is traded) is computed as the face value (value at which the bond is redeemed at maturity date) minus a *discount* percent of face value.

The schema below illustrates the two steps of the bond:

<DappFigure img='zcb-schema.svg' width='60%'/>

## DApp

## Smart contract

The Zero-coupon bond's business logic is anchored in the Tezos blockchain with a <Link to='/docs/dapp-tools/tezos#smart-contract'>smart contract</Link> implemented the bond's logic.

The smart contract is designed with the <Link to='/docs/dapp-tools/archetype'>Archetype</Link> language as a simple state machine for clarity purpose toward involved parties:

<DappFigure img='zcb-schema2.svg' width='60%'/>

The smart contract's entry points are the state machine's transitions:
* <u>sign</u>: called by parties, transitions from *Created* to *Signed* when both parties have signed; holder must transfer *present value*
* <u>terminate</u>: transition is validated when called by issuer after maturity date and before end of payback perdiod
* <u>dispute</u>: transition is validated when called by holder after end of payback period

Dates and periods are illustrated in the schema below:

<DappFigure img='zcb-schema3.svg' width='80%'/>

The smart contract's implementation is presented in this <Link to='/docs/dapp-zcb/interface'>section</Link>.

## Architecture

The DApp is made of:
* an online editor and its content servers
* deployed smart contracts

<DappFigure img='zcb-schema4.svg' width='40%'/>




---
id: dex3
title: Use Case Presentation
sidebar_label: Presentation
slug: /dapp-dex/presentation
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

import Link from '@docusaurus/Link';

The Use Case scenario of the <Link to="/docs/dapp-dex">Dex</Link> DApp consists in the exchange city coins.

You need a <Link to="/docs/dapp-escrow/Presentation#create-a-user-account">user account</Link> to interact with the smart contract.

## User Interface

### Exchange

Below is a screenshot of the 'Exchange' tab once the wallet's account connected:

<DappFigure img='dex-help1.png' width='100%'/>

① Select City Token or XTZ to exchange

② Enter quantity of City token or XTZ to exchange

③ Select City Token or XTZ to obtain

④ Exchanged quantity of City Token or XTZ to get

⑤ Click button to exchange

### Provide liquidity

Below is a screenshot of the 'Provide liquidity' tab once the wallet's account connected:

<DappFigure img='dex-help2.png' width='100%'/>

① Select City Token to provide liquidity to; basic liquidity pool data are displayed:
  * Pool Token balance: quantity of token in Token pool
  * Pool XTZ balance: quantity of XTZ in Token's XTZ pool
  * Total liquidity balance: quantity of liquidity tokens

② Enter quantity of City token to provide

③ Enter quantity of XTZ to provide

④ Quantity of liquidity token to get

⑤ Click button to provide liquidity

### Redeem liquidiy

Below is a screenshot of the 'Redeem liquidity' tab once the wallet's account connected:

<DappFigure img='dex-help3.png' width='100%'/>

① Select City Token to redeem liquidity from; basic liquidity pool data are displayed:
  * Pool Token balance: quantity of token in Token pool
  * Pool XTZ balance: quantity of XTZ in Token's XTZ pool
  * Total liquidity balance: quantity of liquidity tokens

② Enter quantity of liquidity token to exchange

③ Quantity of City token to get

④ Quantity of XTZ to get

⑤ Click button to redeem

## Create a user account

The process to create a new user account is two-steps:
1. download a new faucet file from faucet site (<Link to="/docs/dapp-tools/accounts#create-test-account">instructions</Link>)
2. import it in wallet (<Link to="/docs/dapp-tools/thanos#import-faucet-file">instructions</Link>)

It is suggested that you name the account "Completium Dapp user" for example.
---
id: miles6
title: Presentation
sidebar_label: Presentation
slug: /dapp-miles/miles-tg-overview
---

import DappButton from '../DappButton';
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';


This guide presents how to implement the interactions between the DApp's web interface and the smart contrat.

The first step is to deploy the smart contract with the completium CLI.

Then the goal is to complete the web interface so that it interacts with the smart contract:
* read contract's storage
* call the 'consume' entry point

The DApp project is a react project (javascript) available on the `technical-guide` branch of the <a href="https://github.com/edukera/completium-dapp-miles/tree/technical-guide" target="_blank">github repository</a>.

You may open a Gitpod environement to complete the tasks. It comes with completium-cli installed in order to originate the smart contract.

You need a <Link to="/docs/dapp-tools/gitpod#create-account">Gitpod account</Link> to access the project. Click the button below:

<DappButton url="https://gitpod.io/#https://github.com/edukera/completium-dapp-miles/tree/technical-guide" txt="open in gitpod"/>

The screenshot below illustrates the gitpod interface:

<DappFigure img='miles-gitpod.png' width='100%'/>

You may also clone the repository on your device with the following command:

```bash
$ git clone --branch technical-guide https://github.com/edukera/completium-dapp-miles.git
```


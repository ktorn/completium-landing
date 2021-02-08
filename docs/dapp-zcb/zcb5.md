---
id: zcb5
title: Technical guide
sidebar_label: Technical guide
slug: /dapp-zcb/tg-presentation
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

In this section you will learn how the DApp's web interface interacts with the smart contract.

The DApp project is provided as an open source <Link to="/docs/dapp-tools/react">React</Link> project (javascript) available on the `technical-guide` branch of the <a href="https://github.com/edukera/completium-dapp-zerocouponbond/tree/technical-guide" target="_blank">github repository</a>. It contains several *FIX ME* sections to implement and complete so that the web interface interacts with the smart contract.

The first task is to setup the smart contract (deploy and add miles). The second task is to complete the web interface so that it interacts with the smart contract:
* read contract's storage
* call the 'consume' entry point


You may open a <Link to="/docs/dapp-tools/gitpod">Gitpod environement</Link> to complete these tasks. If using Gitpod for the first time, you need a <Link to="/docs/dapp-tools/gitpod#create-account">Gitpod account</Link> to access the project.

Click the button below to open the project in Gitpod:

<DappButton url="https://gitpod.io/#https://github.com/edukera/completium-dapp-zerocouponbond/tree/technical-guide" txt="open in gitpod"/>

The screenshot below illustrates the gitpod interface:

<DappFigure img='zcb-gitpod.png' width='100%'/>

You may also clone the repository on your device with the following command:

```bash
git clone --branch technical-guide https://github.com/edukera/completium-dapp-zerocouponbond.git
```

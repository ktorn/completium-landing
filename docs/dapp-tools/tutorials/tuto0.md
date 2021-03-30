---
id: tuto0
title: Settings
sidebar_label: 0. Settings
slug: /dapp-tools/tutorials/archetype-settings
---

import Link from '@docusaurus/Link';
import DappFigure from '../../DappFigure';

The Gitpod environement of Try-archetype comes with:
* <Link to='/docs/dapp-tools/'>Archetype</Link>
* <Link to='/docs/dapp-tools/completium-cli'>Completium CLI</Link> to interact with archetype smart contracts on the Tezos blockchain (deploy, call, ...)

An account is required to interact with the blockchain.

The Gitpod environement provides a configured account named `admin` with the following address:

```
tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw
```

The following command shows the current account used and the balance associated to it:

```
$ completium-cli show account
Current account: admin
Public key hash: tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw
Balance on edo: 10644.084359 ꜩ
```

If the balance is below 50 ꜩ, it is not enough to do the tutorial and you need to import a new faucet account.

Follow these <Link to='/docs/dapp-tools/accounts#downlaod-test-account'>instructions</Link> to download a faucet file.

Right click on the `tutorial` directory in the left-hand panel to create a new file as illustrated below:

<DappFigure img="new_file.png" with='70%'/>

Create a new file `account.js` and copy-paste the content of the faucet in it. Save it with ctrl+s (or cmd+s).

In the <Link to='/docs/dapp-tools/gitpod#open-terminal'>Gitpod Terminal</Link>, change directory to the tutorial directory:
```
cd /workspace/try-archetype/tutorial
```

Import the faucet file with the following command:

```
completium-cli import faucet account.js as admin
```

A prompt asks if you want to overwrite the current amount. Answer 'Yes'.

Note that it is possible to register several accounts and switch from one account to another.

By default, completium-cli uses the testnet. The following command displays the endpoint's URL:

```
completium-cli show endpoint
```

Use the following command to switch to another endpoint:

```
completium-cli switch endpoint
```



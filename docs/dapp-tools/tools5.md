---
id: tools5
title: Gitpod
sidebar_label: Gitpod
slug: /dapp-tools/gitpod
---

import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

[Gitpod](https://www.gitpod.io/docs/) is an open source platform for automated and ready-to-code development environments. It is bascially a <a href="https://code.visualstudio.com/" target="_blank">VS Code</a> development interface in a browser, connected to a Git (Github, Gitlab, Bitbucket) repository.

## Create account

Opening DApp project in Gitpod requires to create a Gitpod account. Creating a Gitpod account requires an existing account on github, gitlab or bitbucket as illustrated below:

<DappFigure img="gitpod-login.png" width='100%'/>

<DappButton url="https://gitpod.io/workspaces/" txt="go to gitpod" />

The free plan allows the use of 30 hours per month, which largely covers the need for these DApps projects.

## User interface

Below is a screenshot of the gitpod user interface (for the <Link to='/docs/dapp-miles/'>Fidelity Program</Link> DApp):

<DappFigure img="gitpod-screen.png" width='100%'/>

① Files tree (navigate down to a file and click on it to display)

② Terminal

③ File view

④ Menu bar

⑤ Project preview

## Open terminal

VS Code provides a full featured terminal. It is used in Dapps' technical guides to trigger completium-cli commands to deploy and interact with smart contracts.

To open the terminal, click on the "New Terminal" in the "Terminal" menu, illustrated below:

<DappFigure img="open-vscode-terminal.png" width='100%'/>

## Check `admin` account

The Gitpod environement comes with:
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

Follow these <Link to='/docs/dapp-tools/faucet#downlaod-test-account'>instructions</Link> to download a faucet file.

Right click on the left-hand panel to create a new file as illustrated below:

<DappFigure img="new_file.png" width='80%'/>

Create a new file `account.json` and copy-paste the content of the faucet in it. Save it with ctrl+s (or cmd+s).

In the <Link to='/docs/dapp-tools/gitpod#open-terminal'>Gitpod Terminal</Link>, import the faucet file with the following command:

```
completium-cli import faucet account.json as admin
```

A prompt asks if you want to overwrite the current amount. Answer 'Yes' or give it another alias of your choice.

Note that it is possible to register several accounts and switch from one account to another:

```
completium-cli switch account
```

By default, completium-cli uses the testnet. The following command displays the endpoint's URL:

```
completium-cli show endpoint
```

Use the following command to switch to another endpoint:

```
completium-cli switch endpoint
```

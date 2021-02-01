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

The terminal is available

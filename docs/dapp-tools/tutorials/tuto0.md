---
id: tuto0
title: Settings
sidebar_label: 0. Settings
slug: /dapp-tools/tutorials/archetype-settings
---

import Link from '@docusaurus/Link';

The Gitpod environement of Try-archetype comes with:
* Archetype (version 1.2.2)
* Completium CLI to interact with archetype smart contracts on the Tezos blockchain (deploy, call, ...)

An account is required to interact with the blockchain. The Gitpod environement provides a configured account named `admin` with the following address:

```
tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw
```

The following command shows the current account used:

```
completium-cli show account
```

It is possible to register several accounts and switch from one account to another.

To add a new account from a <a href='https://faucet.tzalpha.net/'>faucet</a> file:

```
completium-cli generate account <ACCOUNT_NAME> --from-faucet <FAUCET_FILE>
```




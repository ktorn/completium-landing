---
id: cli0
title: Getting Started
sidebar_label: Getting Started
slug: /cli
---
import Link from '@docusaurus/Link';
import DappButton from '../DappButton';

`$completium-cli` is a command line interface to interact (orginate, call, ...) with <a href='https://archetype-lang.org/'>Archetype</a> smart contracts on the <Link to='/docs/dapp-tools/tezos'>Tezos</Link> blockchain.

The list of available commands is displayed with:

```bash
completium-cli help
```

## Install

It is distributed as a npm [package](https://www.npmjs.com/package/@completium/completium-cli). Install it with the following command:

```bash
npm i @completium/completium-cli -g
```

Once installed, run the `init` command:

```bash
completium-cli init
```

## Archetype

`$completium-cli` can install (or update) <a href='https://archetype-lang.org/'>Archetype</a> compiler with the following command:

```
completium-cli install bin archetype
```

If Archetype binary is already installed, you can just set the path with:

```
completium-cli set bin archetype <PATH_TO_ARCHETYPE_BIN>
```





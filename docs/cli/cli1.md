---
id: cli1
title: Network
sidebar_label: Network
slug: /cli/network
---
import Link from '@docusaurus/Link';

The Tezos blockchain provides serveral networks:
* a main network which is the real operating network where *real* cryptocurrency are exchanged
* several test networks:
  * one in the same version (to test current network)
  * one(s) in the future main net version(s) (to test/preprare future version of smart contracts)
  * optionally several in older versions

Each version of the blockchain is given a name (..., Carthage, Edo, Florence, ...).

An endpoint is an entry node to the network. You interact with the blockchain through an endpoint. You need to specify the endpoint's URL when interacting with the blockchain.

`$completium-cli` offers a convenient network management system to register, show and switch networks.

## Show current endpoint

Display the endpoint completium is currently using:

```bash
completium-cli show endpoint
```

For example:

```bash
$ completium-cli show endpoint
Current network: edo
Current endpoint: https://edonet-tezos.giganode.io
```
## Switch endpoint

Select the current endpoint with the following command:

```
completium-cli switch endpoint
```

`$completium-cli` comes with a set of pre-configured endpoints:

```bash
$ completium-cli switch endpoint
Current network: edo
Current endpoint: https://edonet-tezos.giganode.io
? Switch endpoint …
❯ main       https://mainnet-tezos.giganode.io
  edo        https://edonet-tezos.giganode.io
  florence   https://florence-tezos.giganode.io

```

## Add endpoint

```bash
completium-cli add endpoint (main|edo|florence) <ENDPOINT_URL>
```

## Remove endpoint

```bash
completium-cli remove endpoint <ENDPOINT_URL>
```

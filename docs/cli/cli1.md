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

Each version of the blockchain is given a name (..., Florence, Granada, ...).

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
Current network: granada
Current endpoint: https://testnet-tezos.giganode.io
```
## Switch endpoint

Select the current endpoint with the following command:

```
completium-cli switch endpoint
```

`$completium-cli` comes with a set of pre-configured endpoints:

```bash
$ completium-cli switch endpoint
Current network: granada
Current endpoint: https://testnet-tezos.giganode.io
? Switch endpoint …
❯ main       https://mainnet-tezos.giganode.io
  granada    https://testnet-tezos.giganode.io
  florence   https://florence-tezos.giganode.io

```

## Add endpoint

```bash
completium-cli add endpoint (main|granada|florence) <ENDPOINT_URL>
```

## Remove endpoint

```bash
completium-cli remove endpoint <ENDPOINT_URL>
```

## Mockup

## Sandbox

`$completium-cli` provides utility commands to install and run the <Link to='https://gitlab.com/tezos/flextesa'>Flextesa</Link> sandbox locally, a presentation of which is available <Link to='https://assets.tqtezos.com/docs/setup/2-sandbox/'>here</Link>.

To install and start the sandbox, run the following command:

```
completium-cli start sandbox
```

This command assumes you have <Link to='https://www.docker.com/'>docker</Link> installed and running. The container is downloaded the first time you run this command; it may then take some time.

Check the container is running with the following docker command:

```
$ docker container ls
CONTAINER ID   IMAGE                       COMMAND          CREATED        STATUS        PORTS                      NAMES
719c8f02f119   tqtezos/flextesa:20210316   "granabox start"   14 hours ago   Up 14 hours   0.0.0.0:20000->20000/tcp   my-sandbox
```

The following command stops the sandbox:

```bash
completium-cli stop sandbox
```

### Endpoint

The sandbox endpoint is already available in the list of known endpoints. You need to switch to the `sandbox` endpoint with:

```bash
$ completium-cli switch endpoint
Current network: sandbox
Current endpoint: http://localhost:20000
? Switch endpoint …
  main       https://mainnet-tezos.giganode.io
  main       https://mainnet.smartpy.io
  main       https://rpc.tzbeta.net
  main       https://api.tez.ie/rpc/mainnet
  granada    https://testnet-tezos.giganode.io
  granada    https://granadanet.smartpy.io
  florence   https://florence-tezos.giganode.io
❯ sandbox    http://localhost:20000
```

### Accounts

The sandbox comes with two accounts, 'alice' and 'bob':

```bash
$ completium-cli switch account
Current account: alice
? Switch account …
❯ alice                                       tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb
  bob                                         tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6
```

You can import a faucet account as explained <Link to='/docs/cli/account#faucet'>here</Link>, but in the sandbox the faucet account does not come with any tezies. You then need to transfer some from Alice or Bob account:

```bash
$ completium-cli import faucet admin.json as admin
$ completium-cli transfer 10000tz from alice to admin
```

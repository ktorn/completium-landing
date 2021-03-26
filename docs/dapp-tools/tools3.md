---
id: tools3
title: Completium CLI
sidebar_label: Completium CLI
slug: /dapp-tools/completium-cli
---

import Link from '@docusaurus/Link';
import DappButton from '../DappButton';

`$completium-cli` is a command line interface to interact (orginate, call, ...) with Archetype smart contracts on the Tezos blockchain.

## Getting started

The CLI is distributed as a npm [package](https://www.npmjs.com/package/@completium/completium-cli). Install it with the following command:

```bash
npm i @completium/completium-cli -g
```

Once installed, run the `init` command:

```bash
completium-cli init
```

This will download and install (or update) the Archetype binary.

The list of available commands is displayed with:

```bash
archetype-cli help
```

## Network

The Tezos blockchain provides serveral networks:
* a main network which is the real operating network where *real* cryptocurrency are exchanged
* several test networks:
  * one in the same version (to test current network)
  * one(s) in the future main net version(s) (to test/preprare future version of smart contracts)
  * optionally several in older versions

Each version of the blockchain is given a name (..., Carthage, Edo, Florence, ...).

An endpoint is an entry node to the network. You interact with the blockchain through an endpoint. You need to specify the endpoint's URL when interacting with the blockchain.

`$completium-cli` offers a convenient network management system to register, show and switch networks.

### Show current endpoint

Display the endpoint completium is currently using:

```bash
completium-cli show endpoint
```

For example:

```bash
$ completium-cli show endpoint
Current network: edo
Current endpoint: https://edonet-tezos.giganode.io:443
```
### Switch endpoint

Select the current endpoint with the following command:

```
completium-cli switch endpoint
```

`$completium-cli` comes with a set of pre-configured endpoints:

```bash
$ completium-cli switch endpoint
Current network: edo
Current endpoint: https://edonet-tezos.giganode.io:443
? Switch endpoint …
❯ main       https://mainnet-tezos.giganode.io:443
  edo        https://edonet-tezos.giganode.io:443
  florence   https://florence-tezos.giganode.io:443

```

### Add endpoint

```bash
completium add endpoint (main|edo|florence) <ENDPOINT_URL>
```

### Remove endpoint

```bash
completium-cli remove endpoint [<ENDPOINT_URL>]
```

## Account

Interacting with a contract requires a Tezos account to sign the transactions. An account is identified by an account address starting by `tz1`, like for example `tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw`.

`$completium-cli` provides a convenient account management system to register, list and switch account. Each account is associated with an alias.

### Import account

#### Faucet

When working with the test network, you need *fake* currencies to interact and test the contracts. There exists a faucet from which you can <Link to='/docs/dapp-tools/accounts#create-test-account'>download</Link> a faucet file to generate a test account from.

<DappButton url="https://faucet.tzalpha.net/" txt="open faucet"/>

Once the faucet file (a `.json` file) downloaded, the following command generates the account from it:

```bash
completium-cli import faucet <FAUCET_FILE> as <ACCOUNT_ALIAS>
```

#### Private key

```bash
completium-cli import privatekey <PRIVATE_KEY> as <ACCOUNT_ALIAS>
```

#### Mnemonic

```bash
completium-cli import mnemonic <MNEMONIC> as <ACCOUNT_ALIAS>
```

The mnemonic is a string where words are separated by a space. For example:

```bash
$ completium-cli import mnemonic 'opinion predict army liquid then search shift manual slender bronze patrol cool garlic grape merry' as admin
```

### Show current account

The following command displays the account `$completium-cli` is currently using:

```
completium-cli show account
```

### Switch account

```
completium-cli switch account
```

### Transfer

The following command transfers tez from one account to another:

```
completium-cli transfer <AMOUNT> from <ACCOUNT_ALIAS> to <ACCOUNT_ALIAS|CONTRACT_ALIAS>
```

### Remove account

```
completium-cli remove <ACCOUNT_ALIAS|CONTRACT_ALIAS>
```

## Contract

### Deploy / originate

```
$ completium-cli deploy <FILE.arl> \
    [--as <ACCOUNT_ALIAS>] \
    [--named <CONTRACT_ALIAS>] \
    [--amount <AMOUNT>] \
    [--burn-cap <BURN_CAP>] \
    [--force]
```

desc


### Call

```
$ completium-cli call <CONTRACT_ALIAS> as <ACCOUNT_ALIAS> \
  [--entry <ENTRYALIAS>] \
  [--with <ARG>] \
  [--amount <AMOUNT>] \
  [--dry]
```

desc


### Generate json

```
completium-cli generate json <FILE.arl>
```

desc

### Show entries

```
completium-cli show entries of <CONTRACT_ID|CONTRACT_ALIAS>
```

Show entries from contract adress


```
$ completium-cli show entries of KT1KyjCqnPEqdEZcRzTsmECpoBM9ndv1rBBk
%confirm (_ : unit)
%submit (%packed_score : bytes, %signed_score : signature)
%decide (_ : unit)
```

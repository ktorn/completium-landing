---
id: tools3
title: Completium CLI
sidebar_label: Completium CLI
slug: /dapp-tools/completium-cli
---

## Getting started

`completium-cli` is a command line interface, which facilitate interaction between archetype compiler and tezos client.

## Commands

### init

```
$ completium-cli init
```

desc


### generate account

```
$ completium-cli generate account <ACCOUNT_NAME> [--from-faucet <FAUCET_FILE>]
```

### transfer

```
$ completium-cli transfer <AMOUNT> from <ACCOUNT_NAME> \
  to <ACCOUNT_NAME|CONTRACT_NAME>
```

desc


### remove account or contract

```
$ completium-cli remove <ACCOUNT_NAME|CONTRACT_NAME>
```

desc


### show account

```
$ completium-cli show account <ACCOUNT_NAME> [-with--secret]
```

desc


### list accounts

```
$ completium-cli list accounts
```

desc


### deploy

```
$ completium-cli deploy <FILE.arl> [--as <ACCOUNT_NAME>] \
  [--named <CONTRACT_NAME>] [--amount <AMOUNT>] [--burn-cap <BURN_CAP>] [--force]
```

desc


### call

```
$ completium-cli call <CONTRACT_NAME> as <ACCOUNT_NAME> [--entry <ENTRYNAME>] \
  [--with <ARG>] [--amount <AMOUNT>] [--dry]
```

desc


### generate json

```
$ completium-cli generate json <FILE.arl>
```

desc


### config set

```
$ completium-cli config set <property> <value>
```

desc


### show entries

```
$ completium-cli show entries of <CONTRACT_ID>
```

Show entries from contract adress


```
$ completium-cli show entries of KT1KyjCqnPEqdEZcRzTsmECpoBM9ndv1rBBk
%confirm (_ : unit)
%submit (%packed_score : bytes, %signed_score : signature)
%decide (_ : unit)
```

### show network

```
$ completium-cli show network
```

Show current network


### switch network

```
$ completium-cli switch network
```

Switch network


---
id: tuto1
title: Hello Tezos world
sidebar_label: 1. Hello Tezos world
slug: /contract/tuto/archetype-hello
hide_title: true
---
import Link from '@docusaurus/Link';


## Welcome!

In this first exercise, the storage is a single string value, initialised to `""`; the unique entry point is called to set the value:

```archetype {6} title="1-hello.arl"
archetype hello

variable value : string = ""

entry main () {
  value := "Hello Tezos world!"
}
```

:::info
Do not forget to save the file with Ctrl+s (or Cmd+s)
:::

Use the `:=` operator to assign value to storage variable.

### Deploy

First, check whether the test account has enough balance to run the tutorial; entrer this command in the <Link to='/docs/dapp-tools/gitpod#user-interface'>Terminal</Link>:

```
completium-cli show account
```

It displays the balance of the account named 'admin'.

If this balance is below 10 ꜩ, then follow these <Link to='/docs/dapp-tools/gitpod#check-admin-account'>instructions</Link> to import a new account (or transfer 100 ꜩ to the admin address on testnet).

The following <Link to='/docs/cli'>Completium CLI</Link> command deploys the contract on the Tezos network:

```
completium-cli deploy 1-hello.arl
```

This command must be run in the `tutorial` directory, so enter this command first:

```
cd tutorial
```

### Call entry point

The following command calls the unique entry point:

```
completium-cli call 1-hello --entry main
```

### View contract

The following command generates the URL to view the contract in Better call Dev:

```
completium-cli show contract 1-hello
```

### Next

Open '2-exec-condition.arl' and click on "Next: Executions conditions" below.
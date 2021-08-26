---
id: contract3
title: Test Scenario
sidebar_label: Test Scenario
slug: /contract/test-scenario
hide_title: false
---
import Link from '@docusaurus/Link';


Test scenario is the current industry standard to ensure a contract has the expected behavior. Basically a test is a program that originates the contract(s), calls them and checks the storage value(s) and account(s) balances.

This article presents how to write and execute tests with Completium.

## Completium JS library

Completium provides a Javascript <Link to='/docs/cli/jslibrary'>programming library</Link> to program interactions with contracts. It benefits from the configuration of endpoints and accounts established with the <Link to='/docs/cli'>CLI</Link>.

Before using `$completium-cli` as a programming library, <Link to='/docs/cli'>install</Link> the CLI to configure <Link to='/docs/cli/network'>endpoint</Link> and <Link to='/docs/cli/account'>account(s)</Link>.

## Create test project

Follow the standard npm process to create a javascript project and install `completium-cli`:

```bash
$ mkdir test
$ cd test
$ npm init -y
$ npm i @completium/completium-cli
```

## Example

The following example illustrates how to test the <Link to='/docs/contract/tuto/archetype-statem'>State machine</Link> contract of the Archetype <Link to='/docs/contract/programming-language#archetype'>tutorial</Link>.

The goal is to check whether the contract is in the right state after a series of calls to `init`, `inc_value` twice and `complete` entrypoints, and to check whether the caller's balance is unchanged while transferring 5tz to `init` (within cost of transactions).

```js title="test.js"
const assert     = require('assert');
const { deploy, getBalance } = require('@completium/completium-cli');

const test = async () => {
  // Scenario
  const balance_before = (await getBalance()).toNumber();
  var cost = 0;
  var [state_machine, op] = await deploy('state_machine.arl');
  cost += op.cost.toNumber();
  // send 5tz to contract
  var op = await state_machine.init({ amount: "5tz" });
  cost += op.cost.toNumber();
  var op = await state_machine.inc_value();
  cost += op.cost.toNumber();
  var op = await state_machine.inc_value();
  cost += op.cost.toNumber();
  // Should return the 5tz sent with `init`
  var op = await state_machine.complete();
  cost += op.cost.toNumber();
  // Test final state and balance
  const storage = await state_machine.getStorage();
  const balance   = (await getBalance()).toNumber();
  assert(storage._state == 3, "Invalid contract state");
  assert(balance == balance_before - cost, "Invalid caller balance");
}

test();
```

The cost of transactions is accumulated in the local `cost` variable. It is used to test that the caller has got back the 5 tezies send to `init` entrypoint.

The script is using the current account and endpoint, shown with the Completium <Link to='/docs/cli'>CLI</Link> commands:

```bash {1,4}
$ completium-cli show endpoint
Current network: edo
Current endpoint: https://edonet-tezos.giganode.io
$ completium-cli show account
Current account: admin
Public key hash: tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb
Balance on sandbox: 9998.466387 ꜩ
```

This means the script is using the `edo` network with the account `admin`. It is possible to programmatically switch account and endpoint from within the test scenario.

## Run test

Edit the package file to set the test command:

```json {7} title="package.json"
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "test.js",
  "scripts": {
    "test": "node test.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@completium/completium-cli": "^0.1.8"
  }
}
```

Launch the test with:

```
npm test
```

## Sandbox

`$completium-cli` provides the possibility to run the scenario on a local <Link to='/docs/cli/network#sandbox'>sandbox</Link> network.

In order to launch the test in a sandbox, run the following script:

```sh
completium-cli start sandbox
completium-cli set endpoint http://localhost:20000
npm test
completium-cli stop sandbox
```
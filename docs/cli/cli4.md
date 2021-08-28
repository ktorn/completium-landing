---
id: cli4
title: JS library
sidebar_label: JS library
slug: /cli/jslibrary
---
import Link from '@docusaurus/Link';

`$completium-cli` also comes as a Javascript library to implement test scenarios.

It provides a subset of commands as programming fnuctions. The benefit is that you can use endpoints and accounts already configured with the CLI, which simplifies the writing of scenarios.

An example of test scenario is available <Link to='/docs/contract/test-scenario#example'>here</Link>.

## deploy / originate

```js
const { deploy } = require('@completium/completium-cli')
```

Example:
```js
const [mycontract, op] = await deploy('./mycontract.arl', {
  as: 'admin',
  parameters: {
    n: 0,
    s: 'hello'
  }
});
```

`mycontract` is the contract object to call entrypoints (see below).<p/>
`op` is the operation object from which to retrieve operation costs for example.

The second argument object may have the following entries:

| Entry | JS type | Description |
| -- | -- | -- |
| `as` | `string` | Deploys with specified account. Default account is the one returned by command `completium-cli show account`. |
| `name` | `string` | Names deployed contract with specified logical name. Logical name is used to refer to contract when calling or displaying contract. |
| `parameters` | `object` | Specifies archetype parameter values (only with archetype contract) |
| `amount` | `string` | Amount of XTZ to sent when deploying contract.  |
| `metadata-storage`| `string` | Adds metadata to contract from json file (only with archetype contract). |
| `metadata-uri`| `string` | Adds metadata to contract from uri (only with archetype contract). |
| `init`| `string` | Overwrites contract initial storage with Michelson value. |
| `test-mode` | `bool` | Generates entrypoint `_set_now` to set `now` value (only with archetype contract, to be used only on testnet) |

## call

Suppose the `escrow.arl` has several entrypoints among wich the `deposit` entrypoint.

```js
const { deploy } = require('@completium/completium-cli');
const [escrow, op] = await deploy('./escrow.arl');
const op = await escrow.deposit({ amount: '50tz', as: 'admin' });
```

The parameter object may have the following entries:

| Entry | JS type | Description |
| -- | -- | -- |
| `as` | `string` | Deploys with specified account. Default account is the one returned by command `completium-cli show account`. |
| `arg` | `object` | Specifies entrypoints parameter values (see example below). |
| `arg-michelson` | `string`| Specifies entrypoints parameter values in Michelson format. |
| `amount` | `string` | Amount of XTZ to sent when calling contract.  |

:::info
Note that when there is only one entrypoint, it is named `default`.
:::

 For example:
```js
const { deploy, call } = require('@completium/completium-cli');
const [escrow, op] = await deploy('./escrow.arl');
const op = await escrow.default({ amount: '50tz', as: 'admin' });
```

## transfer

```js
const { transfer } = require('@completium/completium-cli')
```

Example:
```js
await transfer('alice', 'bob', '5tz');
```

## getBalance
```js
const { getBalance } = require('@completium/completium-cli')
```

Example:
```js
const balance_alice = await getBalance('alice');
console.log(balance_alice.toNumber());
```

`balance_alice` is a <Link to="https://www.npmjs.com/package/bignumber.js">big number</Link>.

## getStorage

```js
const { getStorage } = require('@completium/completium-cli')
```

Example:
```js
const storage = await getStorage('escrow');
```

## getContract

```js
const { getContract } = require('@completium/completium-cli')
```

Example:
```js
const escrow = await getContract('escrow');
```

## setAccount

```js
const { setAccount } = require('@completium/completium-cli')
```

Example:
```js
const escrow = await setAccount('alice');
```

Set default account.

## setEndpoint
```js
const { setEndpoint } = require('@completium/completium-cli')
```

Example:
```js
await setEndpoint('https://testnet-tezos.giganode.io');
```

Set the endpoint rpc. Endpoint must be registered in completium.

## getAddress
```js
const { getAddress } = require('@completium/completium-cli')
```

Example:
```js
const pkh_alice = await getAddress('alice');
console.log(pkh_alice); // tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb

const addr_escrow = await getAddress('escrow');
console.log(addr_escrow); // KT1Tt4d4Hq2wA6ZAo54KrSXtHnKsPZArixu2
```

## pack

## packTyped

## blake2b
## setNow

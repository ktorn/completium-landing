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

## transfer

## getBalance
## call

## getStorage
## getContract

## setAccount

## setEndpoint

## getAddress

## pack

## packTyped

## blake2b
## setNow

| Function | Argument(s) | Description |
| -- | -- | -- |
| `originate` | `path`, `params` | Originates Archetype contract with source code at `path`.<p/> `params` is an *optional* object to specify originate parameters: <ul><li>`as` : contract alias (defaulted to source file without *.arl*)</li><li>`amount`</li><li>`parameters`</li><li>`metadatastorage`</li><li>`metadatauri`</li></ul> |
| `call` | `alias`, `params` | Calls the contract with alias `alias`.<p /> `params` is an *optional* object to specify call parameters:<ul><li>`as` : account to use (defaulted to current one)</li><li>`entry`</li><li>`with`: entrypoint arguments</li><li>`amount`</li></ul><p />Returns the <Link to='/docs/dapp-tools/taquito'>Taquito</Link> operation object, augmented with a `cost` field, the total cost of the transaction. |
| `getStorage` | `alias` | Returns the <Link to='/docs/dapp-tools/taquito#read-contract-storage'>Taquito</Link> storage object of the contract with alias `alias`. |
| `getAddress` | `alias` | Returns the address of the account or contract associated to `alias`. |
| `setAccount` | `alias` | Changes the current account used to interact with contracts. |
| `setEndpoint` | `alias` | Changes the current endpoint. |


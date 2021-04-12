---
id: cli4
title: JS library
sidebar_label: JS library
slug: /cli/jslibrary
---
import Link from '@docusaurus/Link';

`$completium-cli` also comes as a Javascript library to implement test scenarios.

It provides a subset of commands as programming fnuctions. The benefit is that you can use endpoints and accounts already configured with the CLI, which simplifies the writing of scenarios.

Once installed locally, import the library with the following instruction;

```js
const Completium = require('@completium/completium-cli');
```

Then create the completium object:

```js
const completium = new Completium ();
```

An example of test scenario is available <Link to='/docs/contract/test-scenario#example'>here</Link>.

## API

| Function | Argument(s) | Description |
| -- | -- | -- |
| `originate` | `path`, `params` | Originates Archetype contract with source code at `path`.<p/> `params` is an *optional* object to specify originate parameters: <ul><li>`as` : contract alias (defaulted to source file without *.arl*)</li><li>`amount`</li><li>`burncap`</li><li>`metadatastorage`</li><li>`metadatauri`</li></ul> |
| `call` | `alias`, `params` | Calls the contract with alias `alias`.<p /> `params` is an *optional* object to specify call parameters:<ul><li>`as` : account to use (defaulted to current one)</li><li>`entry`</li><li>`with`: entrypoint arguments</li><li>`amount`</li></ul><p />Returns the <Link to='/docs/dapp-tools/taquito'>Taquito</Link> operation object, augmented with a `cost` field, the total cost of the transaction. |
| `getStorage` | `alias` | Returns the <Link to='/docs/dapp-tools/taquito#read-contract-storage'>Taquito</Link> storage object of the contract with alias `alias`. |
| `getAddress` | `alias` | Returns the address of the account or contract associated to `alias`. |
| `setAccount` | `alias` | Changes the current account used to interact with contracts. |
| `setEndpoint` | `alias` | Changes the current endpoint. |


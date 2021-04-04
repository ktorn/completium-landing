---
id: tools9
title: Taquito
sidebar_label: Taquito
slug: /dapp-tools/taquito
---


import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';


<a href="https://tezostaquito.io/">Taquito</a> is a TypeScript library suite for development on the Tezos blockchain.

<DappFigure img="taquito-logo.png" width='50%'/>

## Integration in DApps

The <Link to='/docs/dapp-tools/thanos'>Temple</Link> wallet, used in the <Link to='/dapps'>DApps</Link>, integrates Taquito which is then used to interact with the smart contract.

The Taquito object is retrieved with a mecanism defined in the file `/src/dapps.js`. All DApps use a global state managed with the <a href='https://www.npmjs.com/package/constate' target='_blank'>constate</a> library.

`dapp.js` registers in the constate global state an accessor `useTezos`, so that any module can retrieve it easily, without passing it down from root <Link to='/docs/dapp-tools/react'>React</Link> element:

```js {4}
import { useTezos } from '../dapp';

const ReactComponent = (props) => {
  const tezos = useTezos();
  ...
}
```

As a side note, here is the way to retrieve the account address (public key) the user has signed in with:

```js {4}
import { useAccountPkh } from '../dapp';

const ReactComponent = (props) => {
  const account = useAccountPkh();
  ...
}
```

Note that the user account is managed by the <Link to='/docs/dapp-tools/thanos'>Temple</Link> wallet, not by Taquito. The wallet internally passes the account's private key to Taquito to sign transactions.

## Contract origination

Taquito originates contracts provided in the Micheline format, a json version of <Link to='/docs/dapp-tools/tezos#micheslon'>Michelson</Link>.

The <Link to='/docs/cli'>Completium CLI</Link> command to generate Micheline from `contract.arl`:

```bash
$ completium-cli generate javascript contract.arl > contract.js
```

The generated `contract.js` file exports:
* the Micheline/Json `code` of the contract
* the `getStorage` methode to build the initial storage

These two elements are passed to the Taquito's originate method:

```js {4-6}
import { code, getStorage } from 'contract.js';

try {
  const operation = await tezos.wallet.originate({
    code: code,
    storage: getStorage(...)
  });
  console.log(`Waiting for confirmation of origination...`);
  const contract = await operation.contract();
  console.log(`Origination completed for ${contract.address}.`);
} catch (error) {
  console.log(`Error: ${JSON.stringify(error, null, 2)}`);
}
```

Examples of contract origination are found is the following DApps:

| DApp | Origination description |
| -- | :-- |
| <Link to='/docs/dapp-escrow/interactions#contract-origination'>Online purchase</Link> | The escrow contract for payment is originated when customers decides to purchase. |
| <Link to='/docs/dapp-zcb/interactions#contract-origination'>Zero-coupon-bond</Link> | The Zero-coupon bond contract is originated when contract parameters are set in the editor. |

## Call contract

It is very straightforward to call contracts entry points with Taquito.

### Basics

For example, the <Link to='/docs/dapp-ideabox/'>Idea Box</Link> DApp's smart contract, developed in <a href='https://archetype-lang.org/'>Archetype</a> language, defines an entry point `vote` to vote for an idea:

```archetype
entry vote(n : nat, weight : nat) {
  require {
    r2 : voter.contains(caller);
    r3 : voter[caller].remaining >= weight;
    r4 : state = Activated;
  }
  effect {
    voter[caller].remaining -= weight;
    idea[n].nbvotes += weight;
  }
}
```

The entry point requires two natural integer parameters:
* the idea identifier
* the weight the user wishes to associate to the vote (max. 5)

The following code calls the `vote` entry point:

```js {2}
const contract  = await tezos.wallet.at(contractAddress);
const operation = await contract.methods.vote(id, weight).send();
console.log(`waiting for ${operation.opHash} to be confirmed`);
await operation.receipt();
```

Note that while the contract defines parameters as `nat` (natural integers), the javascript type is simply `integer`; Taquito emits an error if the conversion to Michelson type is not possible.

Typically here an error is emitted if `-1` is passed as argument for example.

### Transfer amount

Some entry points require to send an amount of tez for the contract to execute properly according to the business logic.

For example, the `start` entry point of the <Link to='/docs/dapp-iot/'>Connected Object</Link> DApp requires to transfer some Tez to switch on the bulb. The amount is passed as argument of the `send` method:

```js {4}
import { UnitValue } from '@taquito/taquito';

const contract  = await tezos.wallet.at(contractAddress);
const operation = await contract.methods.start(UnitValue).send({ amount : price });
console.log(`waiting for ${operation.opHash} to be confirmed`);
await operation.receipt();
```

Note that `UnitValue` is necessary to pass when the entry point does not have any argument.

The default amount unit is Tez. It is possible to pass Mutez (1 Tez = 10^6 Mutez) by adding `mutez: true` to the `send` argument.

### Several Transactions

It is possible to execute several transactions in one operation.

For example in the <Link to='/docs/dapp-dex/'>DEX</Link> DApp, the exchange process requires calling two contracts: the *FA 1.2* and the *DEX*. The following code illustrates how to execute that:

```js
// FA 1.2 transaction definition
const fa12 = await tezos.wallet.at(fa12address);
const fa12params = fa12.methods.approve(UnitValue).toTransferParams();
fa12params.kind = OpKind.TRANSACTION;

// DEX transaction definition
const dex = await tezos.wallet.at(dexaddress);
const dexparams = dex.methods.exchange(UnitValue).toTransferParams();
dexparams.kind = OpKind.TRANSACTION;

// Group them in a batch operation and send
const batch     = await tezos.wallet.batch([fa12params, dexparams]);
const operation = await batch.send();
await operation.receipt();
```

The parameters of `approve` and `exchange` have been simplified to `UnitValue` for demo purpose.

## Read contract storage

### Variables

For example in the <Link to='/docs/dapp-iot/'>Connected Object</Link> DApp, it is necessary to read the dates of service to know whether the object is currently in use.

These variables are declared in the smart contract with the <a href='https://archetype-lang.org/'>Archetype</a> language:

```archetype
variable dateofstop   : date = now

variable dateofstart  : date = now

variable value : int = 0tz
```

These values are stored in the contract storage (click <a href='https://better-call.dev/edo2net/KT19ZQUnVrDT5xnfvPqYhn1DeM489875oWGU/storage' target='_blank'>here</a> to view an instance in <Link to=''>Better Call dev</Link> indexer).

Taquito provides the contract storage as a *POJO* for direct access to the contract data:

```js {4-6}
var contract  = await tezos.contract.at(contractAddress);
var storage   = await contract.storage();

const dateofstart = new Date(storage.dateofstart);
const dateofstop  = new Date(storage.dateofstop);
const value       = storage.value.toNumber();
```

Since Tezos can store arbitrary large number values, Taquito provides the number values as <a href='https://mikemcl.github.io/bignumber.js/' target='_blank'>bignumber</a> objects to be converted with `toNumber`.

### Collection of assets

For example in the the <Link to='/docs/dapp-ideabox/'>Idea Box</Link> DApp, the smart contract stores the idea and the votes.

The collection of ideas is declared in <a href='https://archetype-lang.org/'>Archetype</a> language the following way:

```archetype
asset idea {
  id       : nat;
  title    : bytes;
  desc     : bytes;
  nbvotes  : nat = 0;
  creation : date;
  author   : address;
}
```

The asset collection is compiled to a (Michelson) map from `id` to a 'record' `{ title; desc; nbvotes; creation; author }`. It is possible to iterate over the map with the <a href='https://tezostaquito.io/docs/michelsonmap/#the-keyvalue-methods' target='_blank'>forEach</a> operator:

```js
var contract  = await Tezos.contract.at(contractAddress);
var storage   = await contract.storage();

storage.idea.forEach((i, k, _) => {
  ids.push({
    id:       k,
    title:    fromHexString(i.title),
    desc:     fromHexString(i.desc),
    author:   i.author,
    nbvotes:  parseInt(i.nbvotes,10),
    creation: (i.creation+'').substring(0,10),
    winner:   false
  });
});
```

The code above stores each id in a local javascript list of records `ids`. `k` is the idea identifier (named `id` in the Archetype contract).

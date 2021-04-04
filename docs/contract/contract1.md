---
id: contract
title: Introduction
sidebar_label: Introduction
slug: /contract
---

import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

A smart contract is a program that is executed by the blockchain. It possesses:
1. an *address*
2. a *balance* of currency
3. a *storage* of data
4. *entrypoints* to call and execute the contract's business logic and read/write data

The following information is available to the contract's business logic:
* **when** the contract is called
* **who** the contract is called by
* **how much** currency is **transferred** to the contract
* **how much** currency the contract **owns**

An amount of currency can by transferred to the contract when calling an entrypoint. The contract can be programmed to send currency to an account or to another contract.

Interacting with a smart contract has an exectution cost which depends on:
* the complexity of the contract's program
* the size of data it creates
* a constant fee

This cost is automatically taken from your account when invoking a contract.

Note that contract storage, code and transactions (incoming and outcoming) are all *publically* available.

## Micheslon

Michelson is the default language to write smart contracts on the Tezos blockchain. You can find the language reference <a href='https://tezos.gitlab.io/michelson-reference/'>here</a>.

Michelson is a <a href='https://en.wikipedia.org/wiki/Stack_machine#:~:text=In%20computer%20science%2C%20computer%20engineering,buffer%2C%20known%20as%20a%20stack%2C' target='_blank'>stack machine</a> language. Here is an example of a Michelson contract deployed on the mainnet:

```css
parameter (pair (option %admin (list address))
                (pair (string %oldhash) (string %newhash)));
storage (pair (list %admin address) (string %hash));
code { { UNPAIR ;
         UNPAIR ;
         DIP { UNPAIR @oldhash @newhash } ;
         DIP { DIP { DIP { UNPAIR @storedadmin @storedhash } } } } ;
       SWAP ;
       { DIP { DIP { DIP { SWAP } } } } ;
       { DIP { DIP { SWAP } } } ;
       DIP { SWAP } ;
       { DIP { DIP { DIP { SWAP } } } } ;
       { DIP { DIP { SWAP ; DUP ; DIP { SWAP } } } } ;
       ASSERT_CMPEQ ;
       SENDER ;
       SWAP ;
       { DIP { DIP { PUSH @admin bool False } } } ;
       ITER { DIP { DUP } ; CMPEQ ; SWAP ; DIP { OR @admin } } ;
       DROP ;
       ASSERT ;
       IF_NONE {} { DIP { DROP } } ;
       NIL operation ;
       { DIP { PAIR %admin %hash } ; PAIR %op } }
```

The contract is available at the address [KT1Gbu1Gm2U47Pmq9VP7ZMy3ZLKecodquAh4](https://better-call.dev/mainnet/KT1Gbu1Gm2U47Pmq9VP7ZMy3ZLKecodquAh4/code)

## Register languages

A smart contract is a public object, and as such is required to convey confidence in the business process it implements. It is then suggested to use register languages which make the code easier to read, write and <Link to='/docs/dapp-tools/tezos#formal-verification'>verify</Link>.

Several register languages are available and listed <a href='https://tezos.com/developer-portal/#2-write-a-smart-contract'>here</a>. They compile contracts to Michelson.
## Archetype

In the DApps presented here we are using <a href='https://archetype-lang.org/'>Archetype</a>, a high-level language to develop Smart Contracts on the Tezos blockchain, with all Michelson features, plus exclusive features (new types, state machine design, ...) to ease development, tests and formal verification.

For example, below is the <a href='https://archetype-lang.org/'>Archetype</a> version of the above contract:

```archetype
archetype c3n(admins : list<address>, hash : bytes)

entry register (newadmins : option<list<address>>,
                oldhash : bytes,
                newhash : bytes) {
   require {
       r1: oldhash = hash;
       r2: contains(admins, caller);
   }
   effect {
       hash := newhash;
       match newadmins with
        | some(nadmins) -> admins := nadmins
        | none -> ()
       end
   }
}
```

Archetype comes with a convenient set of <a href='https://github.com/edukera/try-archetype#smart-contracts-base' target='_blank'>contract examples</a> to start your project from. Learn the Archetype language with a eight steps online tutorial:

<DappButton url="https://gitpod.io/#https://github.com/edukera/try-archetype" txt="try archetype"/>


## Formal verification

Formal verification is the act of proving or disproving the correctness of intended algorithms underlying a system with respect to a certain formal specification or property, using formal methods of mathematics.

Formal verification provides maximum decentralized confidence that the smart contract behaves as described in the formal specification.

The Tezos community provides a rich technical and human eco-system regarding formal verification:

| Tools | Description |
| -- | :-- |
| <a href='https://gitlab.com/nomadic-labs/mi-cho-coq/' target='_blank'>Michocoq</a> | A specification of Michelson in <a href='https://coq.inria.fr/' target='_blank'>Coq</a> to prove properties about smart contracts in Tezos. |
| <a href='https://archetype-lang.org/'>Archetype</a> | Archetype provides a specification language for contract invariant and entry point postconditions. It generates the contract in the <a href='http://why3.lri.fr/' target='_blank'>Why3</a> language for verification |



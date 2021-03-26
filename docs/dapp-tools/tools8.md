---
id: tools8
title: Tezos
sidebar_label: Tezos
slug: /dapp-tools/tezos
---

import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';


Tezos is an open-source platform for assets and applications backed by a global community of validators, researchers, and builders.

<DappFigure img="tezos-logo.svg" width='50%'/>


## Resources
This section provides links to the main ressources.

| Site | Description |
| -- | :-- |
| [tezos.com](https://tezos.com) | Main portal to the Tezos community |
| [Developper portal](https://tezos.com/developer-portal) |  This is the place to start to get an overview of the technical eco system (install, smart contract languages, libraries, indexers ...) |
| [TQ portal](https://tqtezos.com) | TQ Tezos Powers Assets & Applications in the Tezos Ecosystem |
| [Slack](https://tezos.slack.com) | This is the place to interact with the community |
| [Reddit](https://www.reddit.com/r/tezos) | This is another place |

## Smart contract

A smart contract is a program that is executed by the blockchain. It possesses:
* an address you can send currency to and you can program the contract to generate transactions (send currency or call another contract)
* a balance of currency
* a storage: you can program it to store any type of data; note however that it is limited in size
* entry points you can call to execute some operation

Interacting with the blockchain has an exectution cost which depends on:
* the complexity of the procedure
* the size of data it creates
* a baker fee

This cost is automatically taken from your account when invoking a contract.

Note that contract storage, code and transactions (incoming and outcoming) are all *publically* available.

### Micheslon

Michelson is the default language to write smart contracts. You can find the language reference <a href='https://tezos.gitlab.io/michelson-reference/'>here</a>.

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

### Register languages

A smart contract is a public object, and as such is required to convey confidence in the business process it implements. It is then suggested to use register languages which make the code easy to read and write.

Several register languages are available and listed <a href='https://tezos.com/developer-portal/#2-write-a-smart-contract'>here</a>.

In the DApps presented here we are naturally using <Link to='/docs/dapp-tools/archetype'>Archetype</Link> as the creators of the language. We believe it provides key high-level features that reduce the development cost and provide easy-to-read high-level contracts.

For example, below is the Archtype version of the above contract:

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

### Formal verification

Formal verification is the act of proving or disproving the correctness of intended algorithms underlying a system with respect to a certain formal specification or property, using formal methods of mathematics.

Formal verification provides maximum decentralized confidence that the smart contract behaves as described in the formal specification.

The Tezos community provides a rich technical and human eco-system regarding formal verification:

| Tools | Description |
| -- | :-- |
| <a href='https://gitlab.com/nomadic-labs/mi-cho-coq/' target='_blank'>Michocoq</a> | A specification of Michelson in <a href='https://coq.inria.fr/' target='_blank'>Coq</a> to prove properties about smart contracts in Tezos. |
| <Link to='/docs/dapp-tools/archetype'>Archetype</Link> | Archetype provides a specification language for contract invariant and entry point postconditions. It generates the contract in the <a href='http://why3.lri.fr/' target='_blank'>Why3</a> language for verification |
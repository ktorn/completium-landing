---
id: contract4
title: Formal Verification
sidebar_label: Formal Verification
slug: /contract/formal-verification
hide_title: false
---
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

## Introduction

Formal verification is the act of proving or disproving the correctness of a program with respect to a certain formal specification, using formal methods of mathematics.

A formal specification uses a formal language to describe what the program is supposed to do. A formal language is defined by a grammar (a set of rules that define how sentences are formed) such that it is possible to decide programmatically whether sentences are correctly formed or not.

Formal specification makes it possible to automatically analyze whether a program verifies it or not.

A fundamental result of computer science is that it is not possible to decide automatically whether any program verifies any specification, that is that there is no single program that can decide whether a program verifies a specification. However, there is a wide range of verification problems (simpler ones) that can be solved automatically.

When automatic approaches fail, it is then possible to interact with formal method systems to manually (yet formally) solve the problem. The standard verification process is then semi-automatic.

## Benefit

Consider the following function:

```archetype
function sum(n : int) = if n > 0 then n + sum(n - 1) else 0
```

And the formal property *P*:

```archetype
forall n, n >= 0 -> sum(n) = n * (n + 1) / 2
```

which reads: for every integer n, if n is above 0, then `sum(n)` is equal to n multiplied by n plus 1, divided by 2.

How to make sure that `sum` verifies *P*?

You can either write a test program that computes the `sum` function for a large range of values, say for `n` from 0 to 1000000, and checks the formula; or you can *mathematically* prove the property (with inductive reasoning for example) in a few reasoning steps.

While you may be reasonably confident in the test program, and by transtion in the `run` function, the property however is tested only on a limited set of values, and the test program may itself contain bugs. The question to decide whether the test is correct is stil not decidable on a systemic level.

With mathematic reasoning, properties are proven for any parameter value, and the confidence just relies on whether the proof is correct or not.

Another fundamental result is that it *is* possible to automatically decide whether a proof is correct or not, as long as it is formalized. Hence the confidence you get with formal methods does not rely on the confidence you may give the developper of the program and tests, but it relies on the *existence* of a correct formal proof.

As such, formal verification provides *trust-less* confidence. That's why it is a key point for the development of smart contracts: with smart contracts, blockchains lost their trust-less execution feature; they claim it back with formal verification...

## Limits

Formal verification is relative to the specification. It is possible that a verified program does not behave as expected if this expectation has not been formalized in the specification.

Another caveat of formal verification is the difficulty to read specification. What confidence can you have in a verified program if you do not understand its specification?

That's why writing specification is a key step of the verification process.

## Tools

The <Link to='/docs/dapp-tools/tezos'>Tezos</Link> community provides a rich technical and human eco-system regarding formal verification:

| Tools | Description |
| -- | :-- |
| <a href='https://gitlab.com/nomadic-labs/mi-cho-coq/' target='_blank'>Michocoq</a> | A specification of Michelson in <a href='https://coq.inria.fr/' target='_blank'>Coq</a> to prove properties about smart contracts in Tezos. |
| <a href='https://archetype-lang.org/'>Archetype</a> | Archetype provides a specification language for contract invariant and entry point postconditions. It generates the contract in the <a href='http://why3.lri.fr/' target='_blank'>Why3</a> language for verification |

## Archetype

Some Completium <Link to='/docs/templates'>contract templates</Link> have been formally specified with Archetype and verified with Why3 : <Link to='/docs/templates/fa12'>FA 1.2</Link>, <Link to='/docs/templates/miles'>Miles</Link>, ...

### Specification language

What can you specify with the Archetype <Link to='https://docs.archetype-lang.org/archetype-language/contract-specification'>specification language</Link>?

Mainly contract *invariants*, and entrypoint *postconditions*:
* a contract *invariant* is a property of the contract's storage that is always true, regardless of the transactions history.
* an entrypoint *postcondition* is a property about what changes in the contract's storage with the execution of the entrypoint.

An invariant of the <Link to='/docs/templates/fa12'>FA 1.2</Link> contract states that the total number of tokens is a constant (no token is minted):

```archetype
specification {
  i: ledger.sum(tokens) = totalsupply;
}
```

A postcondition of the `consume` entrypoint of the <Link to='/docs/templates/miles'>Miles</Link> contract states that the number of miles is decreased by `quantity`:

```archetype
specification entry consume (quantity : int) {
  postcondition p {
    mile.sum(the.amount) = before.mile.sum(the.amount) - quantity
  }
}
```

Note that postconditions say something about the contract's storage when the endpoint does *not fail*.

### Whyml

Archetype generates the contract's code and specification in whyml, the <a href='http://why3.lri.fr/' target='_blank'>Why3</a> language.

The following <Link to='/docs/cli'>Completium CLI</Link> command:

```bash
completium-cli generate whyml elementary.arl
```

generates the whyml version of the elementary archetype example contract:

```archetype title="elementary.arl"
archetype js

variable str : string = ""

entry default(v : string) { str := v }

specification entry default(v :string) {
    postcondition p {
        str = v
    }
}
```

The generated whyml program has two modules: `Elementary_storage` and `Elementary`:

```ocaml {6,37-42} title="elementary.mlw"
module Elementary_storage
  use archetype.Lib
  use list.List as L

  type _storage = {
    mutable str : arstring;
    mutable _ops : L.list operation;
    mutable _balance : tez;
    _transferred : tez;
    _caller : address;
    _source : address;
    _now : date;
    _chainid : chain_id;
    _selfaddress : address;
  } by {
    str = "";
    _ops = L.Nil;
    _balance = 0;
    _transferred = 0;
    _caller = "";
    _source = "";
    _now = 0;
    _chainid = 0;
    _selfaddress = "";
    _entry = None;
    _tr = L.Nil
  }

  val ref _s : _storage

end

module Elementary
  use archetype.Lib
  use Js_storage

  let default (v : arstring) : unit
  ensures {
    [@expl:p]
    _s.str = v
  }
  = _s.str <- v

end
```

`Elementary_storage` defines the contract storage and all variables available to entrypoints (`caller`, `transferred`, ...). `Elementary` defines entrypoints and their postconditions.

The postcondition `p` is declared in whyml with the `ensures` keyword.


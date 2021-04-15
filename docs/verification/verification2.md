---
id: verification2
title: Tools
sidebar_label: Tools
slug: /verification/tools
hide_title: false
---
import Link from '@docusaurus/Link';

The <Link to='/docs/dapp-tools/tezos'>Tezos</Link> community provides a rich technical and human eco-system regarding formal verification:

| Tools | Description |
| -- | :-- |
| <a href='https://gitlab.com/nomadic-labs/mi-cho-coq/' target='_blank'>Michocoq</a> | A specification of Michelson in <Link to='https://coq.inria.fr/'>Coq</Link> to prove properties about smart contracts in Tezos. |
| <a href='https://archetype-lang.org/'>Archetype</a> | Archetype provides a specification language for contract invariant and entry point postconditions. It generates the contract in the <Link to='http://why3.lri.fr/'>Why3</Link> language for verification |

<Link to='https://coq.inria.fr/'>Coq</Link> is an interactive proof assistant. The user sends instructions to the proof engine to build up the proof step by step: apply a theorem to justify a proposition, rewrite a term by another and so on. It is possible to program macros for automation purpose. Proving a program in Coq requires first the language semantic to be described in Coq theory (provided by Michocoq for Michelson); it is then used to prove the correctness of the program step by step.
<p/>
<Link to='http://why3.lri.fr/'>Why3</Link> is a plateform dedicated to program verification: it translates the program and specification into SMT problems (called proof obligation) for <Link to='https://en.wikipedia.org/wiki/Satisfiability_modulo_theories#Solver_approaches'>SMT solvers</Link> to solve. When solvers succeed, the verification is automatic. When solvers fail, it is necessary to help them by providing intermediate properties about the program, that they can solve, and that they can use to solve the problem.

## Archetype

The Completium <Link to='/docs/templates'>contract templates</Link> have been formally specified with Archetype and some have been verified with Why3.

### Specification language

The Archetype specification language documentation is available <Link to='https://docs.archetype-lang.org/archetype-language/contract-specification'>here</Link>.

In a nutshell, what can you specify with it? Mainly contract *invariants*, and entrypoint *postconditions*:
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


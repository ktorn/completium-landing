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

Formal language makes it possible to automatically analyze whether a program has the properties stated by a formal specification, that is whether the program verifies a (formal) specification.

A fundamental result of computer science is that it is not possible to decide automatically whether any program verifies any specification, that is that there is no single program that can decide whether a program verifies a specification. However, there is a wide range of verification problems (simpler ones) that can be solved automatically.

When automatic approaches fail, it is then possible to interact with formal method systems to formally solve the problem. The standard verification process is then semi-automatic.

## Benefit

Consider the following function:

```archetype
function sum(n : int) =  if n > 0 then  n + sum(n - 1) else 0
```

And the formal property *P*:

```archetype
forall n, n >=0 => sum(n) = n * (n + 1) / 2
```

which reads: for every integer n, if n is above 0, then `sum(n)` is equal to n multiplied by n plus 1, devided by 2.

How to make sure that `sum` verifies P?

You can either write a test program that computes the `sum` function for a wide range of n values, say from 0 to 1000000, and checks the formula; or you can *mathematically* prove the property (with inductive reasoning for example).

With the test approach, you may be reasonably confident in the test program, and by transtion in the `run` function; however the property is tested only on a limited set of values, and the test program may itself contain bugs.

With mathematic reasoning, properties are proven for any parameter value; the confidence is then stronger. It just relies on whether the proof is correct or not.

Another fundamental result is that it is possible to automatically decide whether any proof is correct or not, as long as it is formalized. Hence the confidence you get with formal methods does not rely on the confidence you may give the developper of the program and tests, but it relies on the *existence* of a correct formal proof.

As such, formal verification provides *trust-less* confidence that a program verifies a formal specfication. That's why it is a key point for the development of smart contracts: with smart contracts, blockchains lose their trust-less execution feature, which they can claim back with formal verification...

## Limits

Formal verification is relative to the specification. It is possible that a verified program does not behave as expected if this expectation has not been formalized in the specification.

Another caveat of formal verification is the difficulty to read specification. Which confidence can you have in a verified program if you do not understand the specification?

That's why writing specification is a key step of the process.

## Tools

The <Link to='/docs/dapp-tools/tezos'>Tezos</Link> community provides a rich technical and human eco-system regarding formal verification:

| Tools | Description |
| -- | :-- |
| <a href='https://gitlab.com/nomadic-labs/mi-cho-coq/' target='_blank'>Michocoq</a> | A specification of Michelson in <a href='https://coq.inria.fr/' target='_blank'>Coq</a> to prove properties about smart contracts in Tezos. |
| <a href='https://archetype-lang.org/'>Archetype</a> | Archetype provides a specification language for contract invariant and entry point postconditions. It generates the contract in the <a href='http://why3.lri.fr/' target='_blank'>Why3</a> language for verification |

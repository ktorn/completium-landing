---
id: verification1
title: Formal Verification
sidebar_label: Introduction
slug: /verification
hide_title: true
---
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

<DappFigure img='verification.svg' width='30%'/>

Formal verification is the act of proving or disproving the correctness of a program with respect to a certain formal specification, using formal methods of mathematics.

A formal specification uses a formal language to describe *what* the program is supposed to do. A formal language is defined by a grammar (a set of rules that define how sentences are formed) such that it is possible to decide programmatically whether sentences are correctly formed or not. Programming languages are also formal languages, but they say something about *how* the program does what it does.

The formal aspect of the specification makes it possible to automatically analyze whether the program verifies it or not. A fundamental result of computer science is that it is *not* possible to decide automatically whether any program verifies any specification: there is no single program that can decide whether a program verifies a specification.


However, there is a wide range of verification problems (simpler ones) that can be solved automatically. When automatic approaches fail, it is then possible to interact with formal method systems to manually (yet formally) solve the problem. The standard verification process is then semi-automatic.

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

## Process

The formal verification process is two steps:
1. write the formal specification of the contract
2. prove the contract verifies the specification with formal method systems

Writing formal specification is a key step of the verification process because it defines the perimeter of the verification. This task requires to know the technical and business context of the contract execution, in order to describe accurately the contract's behavior.

It also requires to know the formal specification language, which is equivalent to knowing a programming language. While there is no systemic method to write formal specification, it may follow some basic principles, presented in this <Link to='/docs/verification/specification'>guide</Link>.

Proving the contract verifies the specification is a more technical taks. It requires to know the basics of <Link to='/docs/verification/logic'>formal logic</Link>, a formal method <Link to='/docs/verification/tools'>tool</Link>, and some training.

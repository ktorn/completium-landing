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

Formal verification is the act of proving or disproving that a program, like a smart contract, respects its formal specification, using formal methods of mathematics.

A formal specification uses a formal language to describe *what* the program is supposed to do. A formal language is defined by a grammar (a set of rules that define how sentences are formed). Programming languages are also formal languages, but they say something about *how* the program does what it does.

The formal aspect of the specification makes it possible to automatically analyze whether the program verifies it or not. A fundamental result of computer science is that it is *not* possible to decide automatically whether any program verifies any specification.

The verification process is thus a mixture of automatic and manual *formal* proving steps.

## Benefit

Consider the following program:

```archetype
function sum(n : int) = if n > 0 then n + sum(n - 1) else 0
```

And the formal specification *P*:

```archetype
forall n, n >= 0 -> sum(n) = n * (n + 1) / 2
```

which reads: for every integer n, if n is above 0, then `sum(n)` is equal to n multiplied by n plus 1, divided by 2.

How to make sure that `sum` verifies *P*?

You can either write a test program that computes the `sum` function for a large range of values, say for `n` from 0 to 1000000, and checks the formula; or you can *mathematically* prove the property (with inductive reasoning for example) in a few reasoning steps.

While you may be reasonably confident in the test program, and by transtion in the `sum` function, the property is only tested on a limited set of values, and the test program may itself contain bugs. The question to decide whether the test is correct is stil not decidable on a systemic level.

With mathematic reasoning, properties are proven for any parameter value, and the confidence in the proof relies on whether it is correct or not.

Another fundamental result is that it *is* possible to automatically decide whether a proof is correct or not, as long as it is formalized. Hence the confidence you get with formal methods does not rely on the confidence you may give the developper of the program and tests, but it relies on the *existence* of a correct formal proof.

As such, formal verification provides *trust-less* confidence. That's why it is a key point for the development of smart contracts bacuse, with smart contracts, blockchains had lost their trust-less execution feature; they claim it back with formal verification.

## Limits

Formal verification is relative to the specification. It is possible that a verified program does not behave as expected if this expectation has not been formalized in the specification.

Another caveat of formal verification is the difficulty to read specification. What confidence can you have in a verified program if you do not understand its specification?

At least, the trust in the verification relies on the trust in the <Link to='/docs/verification/tools'>tools</Link> used to build and check the proof. The set of tools that the process relies on is called the <Link to='https://en.wikipedia.org/wiki/Trusted_computing_base'>Trusted Computing Base</Link>.

That's why it is suggested to *complement* the verification approach with standard <Link to='/docs/contract/test-scenario'>tests</Link>, especially to cover specification areas that are harder to formalize or verify.

## Process

The formal verification process is two steps:
1. write the formal specification of the contract
2. prove the contract verifies the specification with formal method systems

Writing formal specification is a key step of the verification process because it defines the perimeter of the verification. This task requires knowing the technical and business context of the contract execution, in order to describe accurately the contract's behavior.

It also requires knowing a formal specification language, which is equivalent to knowing a programming language. While there is no systemic method to write formal specification, it may follow some basic principles, presented in this <Link to='/docs/verification/specification'>guide</Link>.

Proving that the contract verifies the specification is a technical task that requires training and skills in <Link to='/docs/verification/logic'>formal logic</Link> and formal method <Link to='/docs/verification/tools'>tools</Link>.

---
id: verification3
title: Introduction
sidebar_label: Introduction
slug: /verification/specification
hide_title: false
---
import Link from '@docusaurus/Link';
import DappFigure from '../DappFigure';

How to write formal specification?

There is no algorithm to generate from the code the perfect specification with all the properties that need to be verified. Basically the reason is that the information about the fonctional intention of a program is not in the code: it needs to be figured out and formalized in the specification. Another way to phrase this is that the *how* (the code) does not say the *what* (the specification)...

Fortunately there are guidelines to follow. The scope of the guidelines presented here is the one of the <Link to='/docs/verification/tools#archetype'>Archetype</Link> language, for entrypoints's postconditions and failures, and contract invariants.

<DappFigure img='specification.svg' width='30%' />

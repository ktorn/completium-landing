---
id: verification8
title: Conclusion
sidebar_label: Conclusion
slug: /verification/conclusion
hide_title: false
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Writing specification is about describing the effect of entrypoints on the contract storage, and giving global relations between storage items. It is a verbose description, so much so that it is very likely that the specification requires more code than the specified code itself.

Writing loop invariants is not covered in these guidelines at it belongs to the verification phase. Loops are what makes verification not decidable and thus complex. A loop invariant is a property created by the loop process: it is a property true at each loop iteration, which says something useful to prove the postcondition.

At last, we note that postconditions and invariants are made to describe the code correctness of entrypoints considered separately, but they cannot capture the effect of a *sequence* of calls, and sequence invariants, on the contract. This is still a topic for research to provide more powerful formal method approach.
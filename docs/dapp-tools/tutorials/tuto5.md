---
id: tuto5
title: Date arithmetic
sidebar_label: 5. Dates arithmetic
slug: /dapp-tools/tutorials/archetype-datearith
---

import Link from '@docusaurus/Link';

Standard arithmetic operations are available on dates.

## Code

In this example, convert a date to a day of week, so that:
* 0 if sunday
* 1 if monday
* 2 if tuesday
* 3 if wednesday
* 4 if thursday
* 5 if friday
* 6 if saturday

```archetype
archetype weekday

variable n : nat = 0

entry weekday (d : date) {

}
```

## Deploy

The following <Link to='/docs/dapp-tools/completium-cli'>Completium CLI</Link> command deploys the contract on the Tezos network:

```
completium-cli deploy 1-hello.arl
```

## Call entry point

The following command calls the unique entry point:

```
completium call 1-hello
```

---
id: tuto5
title: Date arithmetic
sidebar_label: 5. Dates arithmetic
slug: /dapp-tools/tutorials/archetype-datearith
---

import Link from '@docusaurus/Link';

import MathJax from 'react-mathjax';


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

The formula to implement is:

<MathJax.Provider>
<MathJax.Node formula={`n = \\lfloor\\frac{(d + 4d) \\mod 7d}{1d}\\rfloor`} />
</MathJax.Provider>

where:
* *d* is the date to compute the day of
* *4d* is the duration of four days
* *mod* is the modulo operator: it translates to `%` operator
* ⌊ X ⌋ is the floor function

The euclidean division `div` will efficiently implement the floor and division operations.
The `date_of_timestamp` function returns a date from a timestamp. The convertion from date to timestamp is done manually by subtracting two dates.

```archetype
archetype weekday

variable n : int = 0

entry weekday (d : date) {
    n := (((d0 - date_from_timestamp(0)) + 4d) % 7d) div 1d
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

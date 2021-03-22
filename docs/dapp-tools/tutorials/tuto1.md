---
id: tuto1
title: Hello Tezos world
sidebar_label: 1. Hello Tezos world
slug: /dapp-tools/tutorials/archetype-hello
---

import Link from '@docusaurus/Link';


## Code

In this first example the storage is a single string value, initialised to `""`; the unique entry point is called to set the value:

```archetype {6}
archetype hello

variable value : string = ""

entry main () {
  value := "Hello Tezos world!"
}
```

Use the `:=` operator to assign value to storage variable.

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

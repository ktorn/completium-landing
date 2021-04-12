---
id: cli3
title: Contract
sidebar_label: Contract
slug: /cli/contract
---
import Link from '@docusaurus/Link';

## Deploy / originate

```
$ completium-cli deploy <FILE.arl> \
    [--as <ACCOUNT_ALIAS>] \
    [--named <CONTRACT_ALIAS>] \
    [--amount <AMOUNT>(tz|utz)] \
    [--metadata-storage <PATH_TO_JSON> | --metadata-uri <VALUE_URI>]
    [--force]
```

For example:

```
$ completium-cli deploy mycontract.arl --amount 15.5tz
```

This creates a contract alias `mycontract`.

One way to set *metadata* is to provide a json file as the `--metadata-storage` argument.

For example the following metadata file:

```bash
$ cat fa12_metadata.json
{
  "symbol": "MTK",
  "name": "MyToken",
  "decimals": "1",
  "description": "description of MyToken",
  "thumbnailUri": "https://completium.com/img/logo_completium_128.png"
}
```

Then the command to deploy the FA 1.2 contract:

```
$ completium-cli deploy fa12.arl --metadata-storage fa12_metadata.json
```

## Show

### Info

It is possible to show data related to a contract alias:

```
$ completium-cli show contract <CONTRACT_ALIAS>
```

For example:

```bash
$ completium-cli show contract demo
Name:     demo
Network:  edo
Address:  KT1CQmaCLLdEQ3X9PmxoqEAy3Xusvs1J5wW1
Source:   /home/dev/.completium/sources/demo.arl
Language: archetype
Version:  1.2.2
Url:      https://better-call.dev/edo2net/KT1CQmaCLLdEQ3X9PmxoqEAy3Xusvs1J5wW1
```

### All contracts

The following command lists all contracts managed by `$completium-cli`:

```
completium-cli show contracts
```

### Source

It is possible to show the contract source with:

```
$ completium-cli show source <CONTRACT_ALIAS>
```
### Entries

```
completium-cli show entries <CONTRACT_ADDRESS|CONTRACT_ALIAS>
```

The command also works with a remote contract address:

```
completium-cli show entries KT1EFgRdrT4r6QLx2riZiPNHjo7gcQM8n7f7
%confirm (_ : unit)
%submit (%ckey : address, %pscore : int)
%decide (_ : unit)
```

## Call

```
$ completium-cli call <CONTRACT_ADDRESS|CONTRACT_ALIAS> \
  [--as <ACCOUNT_ALIAS>] \
  [--entry <ENTRYPOINT>] \
  [--with <ARG>] \
  [--amount <AMOUNT>(tz|utz)]
```

For example, if `mycontract.arl` defines an entry point `payback`:

```archetype
entry payback (n : int) {
  // ...
}
```

The command to call the entry is:

```
$ completium-cli call mycontract --entry payback --with 5
```

## Generate javascript

The javascript verion of the contract is required when a DApp is originating the contract using <Link to='/docs/dapp-tools/taquito'>Taquito</Link>.

The command to generate the javascript version is:

```
completium-cli generate javascript <FILE.arl|CONTRACT_ALIAS>
```

For example:

```
$ completium-cli generate javascript mycontract.arl > mycontract.js
```

The generated `mycontract.js` file exports:
* the Micheline/Json `code` of the contract
* the `getStorage` method to build the initial storage

See <Link to='/docs/dapp-tools/taquito#contract-origination'>here</Link> an example of how to use in a DApp.

## Generate whyml

The whyml version of the contract is required to formally verify the contract with <Link to='http://why3.lri.fr/'>Why3</Link>.

The command to generate the whyml version is:

```
completium-cli generate whyml <FILE.arl|CONTRACT_ALIAS>
```

For example:

```
$ completium-cli generate whyml mycontract.arl > mycontract.mlw
```

The generated `mycontract.mlw` file defines 2 modules:
* `Mycontract_storage` that defines the storage
* `Mycontract` that defines entrypoints
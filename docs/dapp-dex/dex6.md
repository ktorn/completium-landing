---
id: dex6
title: Contract Origination
sidebar_label: Contract Origination
slug: /dapp-dex/origination
---

import DappButton from '../DappButton';
import DappFigure from '../DappFigure';
import Link from '@docusaurus/Link';

The smart contract is written in <Link to="/docs/dapp-tools/archetype">Archetype</Link> language. Go to the <Link to="">Smart contract</Link> section for a detailed presentation.

In VSCode, open the <Link to="/docs/dapp-tools/gitpod#open-terminal">terminal</Link> and enter the following command line to originate (deploy) the smart contract is:

```bash
./contracts/deploy.sh
```

```bash
cat ./contracts/deploy.sh
#! /bin/bash

COINS="XPA XLD XNY XRO XTK XAT XMO XSD XRI"

addrs=()
for coin in $COINS; do
  completium-cli deploy coin_fa12.arl --named $coin > /dev/null
  addr=`completium-cli show contract $coin | sed 's/ *$//g'`
  addrs+=(@$addr)
  echo $coin "deployed: " $addr
done
printf -v params '%s,' "${addrs[@]}"

completium-cli deploy dex.arl --init "(${params%,})" --named dex > /dev/null
echo "dex deployed, done"
```

The <Link to="/docs/dapp-tools/completium-cli#deploy">originate command</Link> triggers two operations:
* the contract compilation to Michelson with archetype compiler
* the Michelson contract origination with Tezos client

The contract may then be referred to as `dex` in future interactions.

If you are using the preset <Link to="/docs/dapp-tools/gitpod">Gitpod</Link> environement, note that <Link to="/docs/dapp-tools/completium-cli">completium-cli</Link> is pre-installed with the <Link to="/docs/dapp-tools/faucet#admin-account">admin</Link> account. See this section for more information.

The address of the newly originated contract is visible with this command:

```bash
completium-cli show contract dex
```

A smart contract address starts with `KT1`. In the situation above, the new contract's address is `KT1UTJoUXgyXPW34wca92dGfiP4tjQyrG64f`.

You may got to <Link to="/docs/dapp-tools/bcd">Better call dev</Link> contract explorer to check it:

<DappButton url="https://better-call.dev/" txt="go to better call dev"/>

The new contract address needs to be set in the DApp's `src/settings.js` file, like for example:

```js
export const dexContract = "KT1MNgjnJg7c2WmnCwCAkhmcAGbrrPMoxcSa"
```

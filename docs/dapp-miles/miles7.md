---
id: miles7
title: Contract setup
sidebar_label: Contract setup
slug: /dapp-miles/miles-tg-contract
---

import Link from '@docusaurus/Link';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

The smart contract is at this location:

`~/completium-dapp-miles/contract/miles_with_expiration.arl`

The contract is written in <a href='https://archetype-lang.org/'>Archetype</a> language. Go to the Smart contract section for a detailed presentation.

The setup consists in deploying the contract and adding mile to the user account.

## Origination

Open the <Link to="/docs/dapp-tools/gitpod#open-terminal">terminal</Link> and enter the following command line to originate (deploy) the smart contract is:

```bash
completium-cli deploy ./contract/miles_with_expiration.arl --named miles --parameters '{ "admin" : "tz1h4CiqWxNe4UxSpkwXy617RM6DaK6NU76P" }'
```

The <Link to="/docs/cli/contract#deploy--originate">originate command</Link> triggers two operations:
* the contract compilation to Michelson with archetype compiler
* the Michelson contract origination with Tezos client

The contract may then be referred to as `miles` in future interactions.

If you are using the preset <Link to="/docs/dapp-tools/gitpod">Gitpod</Link> environement, note that <Link to="/docs/cli">completium-cli</Link> is pre-installed with the <Link to="/docs/dapp-tools/faucet#admin-account">admin</Link> account. See this section for more information.

The address of the newly originated contract is visible in the command output, as illustrated below:

<DappFigure img="miles-newcontract.png"/>

You may got to <Link to="/docs/dapp-tools/bcd">Better call dev</Link> contract explorer to check it:

<DappButton url="https://better-call.dev/" txt="go to better call dev"/>

The new contract address needs to be set in the DApp's `src/settings.js` file:

```js
/////////////////////////////////////////////////////////////////////////////
// FIX ME
// set new contract address
/////////////////////////////////////////////////////////////////////////////
export const  contractAddress = "KT1XpM1f6cq8cy8m8WV9xSsE5nBix2DzTYmx"
```


## Add miles

In order to provide miles to a user, the amdin must call the 'add' entry point of the contract.

If you don't have a user account, follow these <Link to="/docs/dapp-tools/faucet#create-test-account">instructions</Link> to get one.

The entry point signature is presented below:

```archetype
entry add (ow                 : address,
           newmile_id         : string,
           newmile_amount     : int,
           newmile_expiration : date) {
   called by admin
   effect {
     ...
   }
}
```

Parameters are presented below:

| Parameter | Value | Description |
| ------------- |: -------------: | ---------: |
| ow | USER_ADDRESS |  address of the miles' owner, for example '@tz1h4CiqWxNe4UxSpkwXy617RM6DaK6NU76P' |
| newmile_id       | USER_ADDRESS + "_0" | a unique identifier for the created miles, for example 'tz1h4CiqWxNe4UxSpkwXy617RM6DaK6NU76P_0'  |
| newmile_amount   | 20 | number of miles to create  |
| newmile_expiration | TOMORROW | date beyond which miles are expired, for example '2021-06-28' |

where:
* USER_ADDRESS is replaced by the DApp user account to receive the miles
* TOMORROW is replaced by a date in the future, for example tomorrow

In the <Link to="/docs/dapp-tools/gitpod#open-terminal">terminal</Link> enter the following command:

```bash
completium-cli call miles --entry add --arg '{ "ow":"tz1hyc1CRQpjskJUUaGrh85UZXPi6kU4JuGd", "newmile_id":"id1", "newmile_expiration":"2022-12-25"  }'
```

:::warning
Replace `tz1hyc1CRQpjskJUUaGrh85UZXPi6kU4JuGd` in the command above with your user account address.
:::

## Skip this step?

It is possible to skip this phase and use the contract already deployed for the demo, and available at the following address:

```
KT1XpM1f6cq8cy8m8WV9xSsE5nBix2DzTYmx
```

<DappButton url="https://better-call.dev/hangzhounet/KT1XpM1f6cq8cy8m8WV9xSsE5nBix2DzTYmx/operations" txt="open in better call dev"/>

Go to the <Link to="/docs/dapp-miles/create-miles#miles-creation-transaction">use case</Link> section to know how to add miles for your user account.


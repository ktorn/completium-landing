---
id: tools4
title: Faucet
sidebar_label: Faucet
slug: /dapp-tools/faucet
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

A Dapp require an admin account and one (or several) user accounts to be tested. This page explains how to retrieve the admin faucet file, and how to download a faucet account for test.

## Admin account

Some Dapps' use cases require to interact with the smart contract as the admin role (declared by the contract). Every Dapp's admin uses the same account.

Follow the instructions below to get the admin faucet file:
* click the button below to open the admin faucet file in a new tab
* save the admin faucet file as "admin.json"

<DappButton url="https://raw.githubusercontent.com/edukera/completium-dapp-utils/master/admin.json" txt="open admin faucet file"/>

Instructions to import a faucet account in the wallet is available in the section below.

Below is a copy of the admin faucet file:

```json
{
  "mnemonic": [
    "auto",
    "hamster",
    "ability",
    "wall",
    "betray",
    "heavy",
    "fortune",
    "disorder",
    "quantum",
    "hawk",
    "nothing",
    "parrot",
    "step",
    "lobster",
    "chimney"
  ],
  "secret": "fd93647b67ebc3acc81715ea51ef3dc42ad0441f",
  "amount": "10764356903",
  "pkh": "tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw",
  "password": "pp8rpZEV2X",
  "email": "bikgsgvf.gwfeefll@tezos.example.org"
}
```

You may also copy-paste the json above in a "admin.json" file.

Follow <u><Link to="/docs/dapp-tools/thanos">this link</Link></u> for instructions to import the admin account in the Thanos wallet.

## Create a test account

This section describes how to download and import in Completium-cli a test account from the faucet.

<DappButton url="https://teztnets.xyz/hangzhounet-faucet" txt="open faucet"/>

Follow the instructions below to donwload a new test account file:
* click the "open faucet" button above to open the faucet web page
* on the faucet page:
    * solve the CAPTCHA
    * click on the "Get Hagzhounet Tz" button
    * click the "Copy to clipboard" button
* Create a file `faucet.json` and paste the faucet data in this file
* Run the following command to use the account with Completium-cli :

```bash
completium-cli import faucet faucet.json as <ACCOUNT_ALIAS>
```

where `<ACCOUNT_ALIAS>` is replaced by the logical name of the account (for example 'owner', 'admin', ...).

Instructions to import the faucet file in the temple wallet are available in this <Link to='/docs/dapp-tools/thanos#import-faucet-file'>section</Link>.

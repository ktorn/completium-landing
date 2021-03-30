---
id: ideabox4
title: Register Voter
sidebar_label: Register voter
slug: /dapp-ideabox/registervoter
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';


In order to vote for an idea, it is first required that the contract's admin account registers the voter address. Indeed the <Link to="/docs/dapp-ideabox/implementation#vote">vote</Link> entry point checks that the `caller` is registered, otherwise it fails.

To do so, it is necessary to call the <Link to="/docs/dapp-ideabox/interface#register">register</Link> entry point of the smart contract. This entry point may only be called by the contract's admin account at address `tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw`. The section below presents how to import this account in the wallet.

## Import admin account

The process to is two-steps:
1. download the admin faucet file (<Link to="/docs/dapp-tools/faucet#admin-account">instructions</Link>)
2. import it in wallet (<Link to="/docs/dapp-tools/thanos#import-faucet-file">instructions</Link>)

It is suggested that you name that account "Admin" for ease of use.

## Register transaction

The `register` entry point, called by the admin account, takes the voter account address as parameter.

The contract is available at this address:
```
KT1QMowNVCUngertU7bAeoZmU7XYm3gphE69
```

This section presents how to invoke the `register` entry point with the smart contract indexer <Link to="/docs/dapp-tools/bcd">Better Call Dev</Link>. Click the button blow to open the smart contract:

<DappButton url="https://better-call.dev/delphinet/KT1QMowNVCUngertU7bAeoZmU7XYm3gphE69/operations" txt="open smart contract"/>

Click on the "Interact" tab and enter the parameters as presented above.

Below is an example screenshot (with parameter set to `tz1dZydwVDuz6SH5jCUfCQjqV8YCQimL9GCp`) of the interact panel:

<DappFigure img='bcd-ideabox.png' width='100%'/>

If you don't have a dedicated user account, go to this <Link to="/docs/dapp-ideabox/presentation#create-a-user-account">previous section</Link>.

Once user address set, click on the "Execute" button and select "Thanos". A confirm popup should be displayed:

<DappFigure img='bcd-ideabox2.png' width='60%'/>

You may check the transation parameters in the "Operations" section:

```json
[{
    "kind":"transaction"
    "to":"KT1QMowNVCUngertU7bAeoZmU7XYm3gphE69"
    "amount":0
    "mutez":true
    "parameter":{
        "entrypoint":"register"
        "value":{
            "string":"tz1dZydwVDuz6SH5jCUfCQjqV8YCQimL9GCp"
        }
    }
}]
```

Once sent, the transaction should take a minute to be confirmed. When confirmed, you may click on 'storage' tab to visualize the contract storage and check that your user account is in the voters' list:

<DappFigure img='bcd-ideabox3.png' width='100%'/>

Next step is to go to the user interface to vote for or add a new idea!


---
id: zcb4
title: Issue & Sign
sidebar_label: Issue & Sign
slug: /dapp-zcb/usecase
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';
import Link from '@docusaurus/Link';

import MathJax from 'react-mathjax';

## Set contract parameters

The first step is to fill the Zero-Coupon bond's parameters:
* Issuer name
* Issuer Tezos address
* Subscriber name (or bond holder)
* Subscriber Tezos address
* Face value (redeem value)
* Discount rate (to compute value at trade time)
* Bond duration before maturity
* Payback period during which redeem is possible

Below is an example parameters setting:

<DappFigure img='zcb-set.png' width='40%'/>

Check that the contract text is updated accordingly:

<DappFigure img='zcb-set2.png' width='80%'/>

## Issue Contract (Origination)

Once parameters are set, connect to the <Link to='/docs/dapp-tools/thanos'>Temple wallet</Link> and click on the "originate" button:

<DappFigure img='zcb-issue.png' width='50%'/>

The following popup is displayed; it is an 'origination' transaction with the smart contract's <Link to='/docs/dapp-tools/tezos#micheslon'>Michelson</Link> code:

<DappFigure img='zcb-set3.png' width='50%'/>

Once originated, the smart contract address is displayed; click on it to open it <Link to='/docs/dapp-tools/bcd'>Better Call Dev</Link>:

<DappFigure img='zcb-set4.png' width='90%'/>

## Sign contract

Now the contract is issued, issuer and holder must sign it; go to <Link to='/docs/dapp-tools/bcd'>Better Call Dev</Link> (see above) in the 'INTERACT' tab:

<DappFigure img='zcb-bcd1.png' width='100%'/>

If signing with the holder address, you need to tranfer the present value (pv):

<MathJax.Provider>
<MathJax.Node formula={`pv = (1 - dr) * fv`} />
</MathJax.Provider>

where:
* fv: face value
* dr: discount rate

You can follow contract events in the *Timeline* tab of the DApp interface:

<DappFigure img='zcb-sign1.png' width='40%'/>

When the 'Sign' transaction is validated, the event appears in the contract timeline:

<DappFigure img='zcb-sign2.png' width='40%'/>

Signatures also appear at the bottom of the contract:

<DappFigure img='zcb-sign3.png' width='90%'/>
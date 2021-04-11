---
id: template10
title: Auction
sidebar_label: Auction
slug: /templates/auction
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DeployIOT from './DeployIOT';

## Introduction

Simple auction process to transfer <Link to='/docs/templates/nft'>FA2 NFT</Link> ownership to best bidder.

The best bid is escrowed by the contract til ownership is claimed. Previous best bidder gets its bid back. When asset ownership claimed, it is transfered to asset owner.

Learn to developp a user interface on top of this contract with the <Link to=''>First DApp</Link> tutorial.
## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `assetid` | `bytes` | Id of sold item. |
| `owner` | `address` | Address to collect best bid. |
| `auction_dur` | `duration` | Auction duration. |
| `dur_incr` | `duration` | Increment of auction duration when a bid is placed. |
| `bestbidder` | `address` | Address of best bidder. |
| `bestbid` | `tez` | Value of best bid. |
| `endofbid` | `date` | Date of end of bid. |
| `_state` | `states` | One of `Open`, `Closed` |

### Entrypoints

| Name | Parameters | Description |
| -- | -- | -- |
| `upforsale` | `price` | Owner sets the item up for sale. <p /> Sets date of end of bid to `now + auction_dur`.|
| `bid` | | Places a bid. Bid amount is transferred. <p />If this is best bid, previous best bid amount is transferred back to previous bet bidder. |
| `claim` | | Transfers escrowed bid amount to `owner` if auction is over. New `owner` value is set to `bestbidder`. |

## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
  ]}>

<TabItem value="archetype">


```archetype title="auction.arl"
archetype auction(
  assetid     : bytes,
  owner       : address,
  auction_dur : duration,
  dur_incr    : duration
)

variable bestbidder : address = owner
variable bestbid    : tez = 0tz

variable endofbid   : date = now

states =
| Closed initial
| Open

transition upforsale (price : tez) {
   called by owner
   from Closed to Open
   with effect {
      bestbid := price;
      endofbid := now + auction_dur;
   }
}

entry bid() {
   require {
      r1 otherwise "Auction Closed": state = Open;
      r2: now < endofbid;
      r3: caller <> bestbidder;
      r4: transferred > bestbid;
   }
   effect {
     if balance <> transferred then
       transfer bestbid to bestbidder;
     bestbidder := caller;
     bestbid := transferred;
     endofbid += dur_incr;
   }
}

transition claim () {
  require { r5 otherwise "Auction Is Still On": now > endofbid }
  from Open to Closed
  with effect {
     if balance > 0tz then
         transfer balance to owner;
     owner := bestbidder;
  }
}
```

</TabItem>

<TabItem value="michelson">

```js

```

</TabItem>

</Tabs>
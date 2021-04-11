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
  nftoken     : address,
  auction_dur : duration,
  dur_incr    : duration
)

asset nft {
  nftid      : nat;
  owner      : address;
  bestbidder : option<address>;
  best       : tez;
  endofbid   : date;
}

record balance_of_request {
  bo_owner : address;
  btoken_id : nat;
} as ((owner, token_id))

record balance_of_response {
  request : balance_of_request;
  balance_ : nat;
} as ((request, balance))

entry check_ownership(brl : list<balance_of_response>) {
  match brl with
  | hd::tl -> dorequire(hd.balance_ = 1, "Caller Is Not Owner")
  | []     -> fail("Empty Response")
  end
}

entry upforsale (id : nat, price : tez) {
  require {
    r1: if nft.contains(id) then nft[id].endofbid < now else true
  }
  effect {
    nft.addupdate(id, {
      owner = caller;
      bestbidder = none;
      best = 0tz;
      endofbid = (now + 1h)
    });
    (* check ownership with FA2 balance_of *)
    transfer 0tz to nftoken
       call balance_of<
              list<balance_of_request> *
              contract<list<balance_of_response>>
       >(([ { bo_owner = caller; btoken_id = id } ], self.check_ownership));
  }
}

entry bid (id : nat) {
  require {
    r2 otherwise "No Auction"   : now < nft[id].endofbid;
    r3 otherwise "Not Best Bid" : transferred > nft[id].best;
  }
  effect {
    match nft[id].bestbidder with
    | none -> ()
    | some bidder -> transfer nft[id].best to bidder
    end;
    nft.update(id, {
      bestbidder = some(caller);
      best       = transferred;
      endofbid  += dur_incr
    })
  }
}

record transfer_destination {
  to_dest           : address;
  token_id_dest     : nat;
  token_amount_dest : nat
} as ((to_, (token_id, amount)))

function get_transfer_param(
  %from : address,
  %to   : address,
  id    : nat) : list<address * list<transfer_destination>> {
  return ([
    (%from, [{
      to_dest           = %to;
      token_id_dest     = id;
      token_amount_dest = 1
    }])
  ])
}

entry claim (id : nat) {
  require {
    r4 otherwise "Auction Is Still On" : nft[id].endofbid < now
  }
  effect {
    match nft[id].bestbidder with
    | none -> ()
    | some bidder -> begin
        transfer nft[id].best to nft[id].owner;
        transfer 0tz to nftoken
          call %transfer<list<address * list<transfer_destination>>>(
            get_transfer_param(nft[id].owner, bidder, id))
      end
    end;
    nft.remove(id);
  }
}
```

</TabItem>

<TabItem value="michelson">

```js

```

</TabItem>

</Tabs>
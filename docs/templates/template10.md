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

Auction process to transfer a <Link to='/docs/templates/nft'>FA2 NFT</Link> to best bidder.

The best bid is escrowed by the contract til ownership is claimed. Previous best bidder gets its bid back. When asset ownership claimed, it is transfered to asset owner.

The contract calls the FA2 contract to check NFT ownership, and transfer ownership when auction is over.

The benefit of splitting the auction process from the FA2 ledger is that it makes it possible to change or select the appropriate auction process, while keeping the ledger intact.
## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `assetid` | `bytes` | Id of sold item. |
| `owner` | `address` | Address to collect best bid. |
| `auction_dur` | `duration` | Auction duration. |
| `dur_incr` | `duration` | Increment of auction duration when a bid is placed. |
| `nft` | `collection` | An NFT auction is defined by:<ul><li>nft id</li><li>`owner` of the NFT</li><li>`bestbidder` option of address of best bidder</li><li>`best` best bid amount</li><li>`endofbid` date of the end of bid</li></ul> |

### Entrypoints

The transfer of ownership performed by `calim` supposes that the NFT owner calls the `update_operators` entrypoint of the <Link to='/docs/templates/nft'>FA2 contract</Link>.

| Name | Parameters | Description |
| -- | -- | -- |
| `upforsale` | `id`, `price` | Owner sets the NFT `id` up for sale. <p />Sets date of end of bid to `now + auction_dur`. <p />FA2 NFT contract entrypoint `balance_of` is called to check that caller is the owner of NFT `id`. |
| `bid` | `id` | Places a bid for NFT `id`. Bid amount is transferred. <p />If this is best bid, previous best bid amount is transferred back to previous bet bidder. |
| `claim` | `id`| Transfers escrowed bid amount to `owner` if auction is over for NFT `id`. New `owner` value is set to `bestbidder`.<p />FA2 NFT contract entrypoint `transfer` is called to transfer ownership to best bidder. |

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
      owner      = caller;
      bestbidder = none;
      best       = price;
      endofbid   = (now + auction_dur)
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
    r3 otherwise "Not Best Bid" :
      if issome(nft[id].bestbidder)
      then transferred >  nft[id].best
      else transferred >= nft[id].best;
  }
  effect {
    match nft[id].bestbidder with
    | none -> ()
    | some bidder -> transfer nft[id].best to bidder
    end;
    nft.update(id, {
      bestbidder = some(caller);
      best       = transferred;
      endofbid  +=
        (if nft[id].endofbid - now < dur_incr
         then dur_incr
         else 0)
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

record operator_param {
  opp_owner    : address;
  opp_operator : address;
  opp_token_id : nat
} as ((owner, (operator, token_id)))

function get_update_operators_param(
  powner : address,
  popp   : address,
  pid    : nat
) : list<or<operator_param, operator_param>> {
  return ([
    right<operator_param>({
      opp_owner    = powner;
      opp_operator = popp;
      opp_token_id = pid
    })
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
          call update_operators<list<or<operator_param, operator_param>>>(
            get_update_operators_param(bidder, selfaddress, id));
        transfer 0tz to nftoken
          call %transfer<list<address * list<transfer_destination>>>(
            get_transfer_param(nft[id].owner, bidder, id));
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
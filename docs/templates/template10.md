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

record operator_param {
  opp_owner    : address;
  opp_operator : address;
  opp_token_id : nat
} as ((owner, (operator, token_id)))

record balance_of_request {
  bo_owner : address;
  btoken_id : nat;
} as ((owner, token_id))

record balance_of_response {
  request : balance_of_request;
  balance_ : nat;
} as ((request, balance))

function get_addop_param(
  powner : address,
  popp   : address,
  pid    : nat
) : list<or<operator_param, operator_param>> {
  return ([
    left<operator_param>({
      opp_owner    = powner;
      opp_operator = popp;
      opp_token_id = pid
    })
  ])
}

entry check_ownership(brl : list<balance_of_response>) {
  called by nftoken
  effect {
    match brl with
    | hd::tl -> begin
      dorequire(hd.balance_ = 1, "Caller Is Not Owner");
      transfer 0tz to nftoken
        call update_operators<list<or<operator_param, operator_param>>>(
          get_addop_param(hd.request.bo_owner, selfaddress, hd.request.btoken_id));
    end
    | []     -> fail("Empty Response")
    end
  }
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
         else 0s)
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

function get_rmop_param(
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
    transfer 0tz to nftoken
      call update_operators<list<or<operator_param, operator_param>>>(
        get_rmop_param(nft[id].owner, selfaddress, id));
    match nft[id].bestbidder with
    | none -> ()
    | some bidder -> begin
        transfer 0tz to nftoken
          call %transfer<list<address * list<transfer_destination>>>(
            get_transfer_param(nft[id].owner, bidder, id));
        transfer nft[id].best to nft[id].owner;
      end
    end;
    nft.remove(id);
  }
}
```

</TabItem>

<TabItem value="michelson">

```js
# (Pair nftoken (Pair auction_dur (Pair dur_incr {  })))
{
  storage (pair (address %nftoken) (pair (int %auction_dur) (pair (int %dur_incr) (map %nft nat (pair (address %owner) (pair (option %bestbidder address) (pair (mutez %best) (timestamp %endofbid))))))));
  parameter (or (list %check_ownership (pair (pair (address %owner) (nat %token_id)) (nat %balance))) (or (pair %upforsale (nat %id) (mutez %price)) (or (nat %bid) (nat %claim))));
  code { LAMBDA
           (pair address (pair address nat))
           (list (or (pair (address %owner) (pair (address %operator) (nat %token_id))) (pair (address %owner) (pair (address %operator) (nat %token_id)))))
           { UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             PUSH unit Unit;
             NIL (or (pair (address %owner) (pair (address %operator) (nat %token_id))) (pair (address %owner) (pair (address %operator) (nat %token_id))));
             DIG 2;
             DUP;
             DUG 3;
             DIG 4;
             DUP;
             DUG 5;
             PAIR;
             DIG 5;
             DUP;
             DUG 6;
             PAIR;
             LEFT (pair address (pair address nat));
             CONS;
             SWAP;
             DROP;
             DUG 3;
             DROP 3 };
         LAMBDA
           (pair address (pair address nat))
           (list (pair address (list (pair (address %to_) (pair (nat %token_id) (nat %amount))))))
           { UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             PUSH unit Unit;
             NIL (pair address (list (pair (address %to_) (pair (nat %token_id) (nat %amount)))));
             NIL (pair (address %to_) (pair (nat %token_id) (nat %amount)));
             PUSH nat 1;
             DIG 4;
             DUP;
             DUG 5;
             PAIR;
             DIG 5;
             DUP;
             DUG 6;
             PAIR;
             CONS;
             DIG 5;
             DUP;
             DUG 6;
             PAIR;
             CONS;
             SWAP;
             DROP;
             DUG 3;
             DROP 3 };
         LAMBDA
           (pair address (pair address nat))
           (list (or (pair (address %owner) (pair (address %operator) (nat %token_id))) (pair (address %owner) (pair (address %operator) (nat %token_id)))))
           { UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             PUSH unit Unit;
             NIL (or (pair (address %owner) (pair (address %operator) (nat %token_id))) (pair (address %owner) (pair (address %operator) (nat %token_id))));
             DIG 2;
             DUP;
             DUG 3;
             DIG 4;
             DUP;
             DUG 5;
             PAIR;
             DIG 5;
             DUP;
             DUG 6;
             PAIR;
             RIGHT (pair address (pair address nat));
             CONS;
             SWAP;
             DROP;
             DUG 3;
             DROP 3 };
         NIL operation;
         DIG 4;
         UNPAIR;
         DIP { UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP };
         IF_LEFT
           { DIG 4;
             DUP;
             DUG 5;
             SENDER;
             COMPARE;
             EQ;
             NOT;
             IF
               { PUSH string "InvalidCaller";
                 FAILWITH }
               {  };
             DUP;
             IF_CONS
               { PUSH nat 1;
                 DIG 1;
                 DUP;
                 DUG 2;
                 CDR;
                 COMPARE;
                 EQ;
                 NOT;
                 IF
                   { PUSH string "Caller Is Not Owner";
                     FAILWITH }
                   {  };
                 DIG 7;
                 DUP;
                 DUG 8;
                 DIG 7;
                 DUP;
                 DUG 8;
                 CONTRACT %update_operators (list (or (pair address (pair address nat)) (pair address (pair address nat))));
                 IF_NONE
                   { PUSH string "BadContract";
                     FAILWITH }
                   {  };
                 PUSH mutez 0;
                 DIG 13;
                 DUP;
                 DUG 14;
                 DIG 4;
                 DUP;
                 DUG 5;
                 CAR;
                 CDR;
                 SELF;
                 ADDRESS;
                 PAIR;
                 DIG 5;
                 DUP;
                 DUG 6;
                 CAR;
                 CAR;
                 PAIR;
                 EXEC;
                 TRANSFER_TOKENS;
                 CONS;
                 DIP { DIG 7; DROP };
                 DUG 7;
                 DROP 2 }
               { PUSH string "Empty Response";
                 FAILWITH };
             DROP;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             DIG 1;
             PAIR }
           { IF_LEFT
               { UNPAIR;
                 SWAP;
                 DIG 2;
                 DUP;
                 DUG 3;
                 DIG 2;
                 DUP;
                 DUG 3;
                 MEM;
                 IF
                   { NOW;
                     DIG 3;
                     DUP;
                     DUG 4;
                     DIG 3;
                     DUP;
                     DUG 4;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     CDR;
                     CDR;
                     CDR;
                     COMPARE;
                     LT }
                   { PUSH bool True };
                 NOT;
                 IF
                   { PUSH string "InvalidCondition: r1";
                     FAILWITH }
                   {  };
                 DIG 2;
                 DUP;
                 DUG 3;
                 DIG 5;
                 DUP;
                 DUG 6;
                 NOW;
                 ADD;
                 DIG 2;
                 DUP;
                 DUG 3;
                 PAIR;
                 NONE address;
                 PAIR;
                 SENDER;
                 PAIR;
                 SOME;
                 DIG 3;
                 DUP;
                 DUG 4;
                 UPDATE;
                 DIP { DIG 2; DROP };
                 DUG 2;
                 DIG 6;
                 DUP;
                 DUG 7;
                 DIG 6;
                 DUP;
                 DUG 7;
                 CONTRACT %balance_of (pair (list (pair address nat)) (contract (list (pair (pair address nat) nat))));
                 IF_NONE
                   { PUSH string "BadContract";
                     FAILWITH }
                   {  };
                 PUSH mutez 0;
                 SELF;
                 ADDRESS;
                 CONTRACT %check_ownership (list (pair (pair address nat) nat));
                 IF_NONE
                   { PUSH string "BadContract";
                     FAILWITH }
                   {  };
                 NIL (pair (address %owner) (nat %token_id));
                 DIG 6;
                 DUP;
                 DUG 7;
                 SENDER;
                 PAIR;
                 CONS;
                 PAIR;
                 TRANSFER_TOKENS;
                 CONS;
                 DIP { DIG 6; DROP };
                 DUG 6;
                 DROP 2;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 DIG 1;
                 PAIR }
               { IF_LEFT
                   { DIG 1;
                     DUP;
                     DUG 2;
                     DIG 1;
                     DUP;
                     DUG 2;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     CDR;
                     CDR;
                     CDR;
                     NOW;
                     COMPARE;
                     LT;
                     NOT;
                     IF
                       { PUSH string "No Auction";
                         FAILWITH }
                       {  };
                     DIG 1;
                     DUP;
                     DUG 2;
                     DIG 1;
                     DUP;
                     DUG 2;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     CDR;
                     CAR;
                     IF_NONE
                       { PUSH bool False }
                       { PUSH bool True;
                         SWAP;
                         DROP };
                     IF
                       { DIG 1;
                         DUP;
                         DUG 2;
                         DIG 1;
                         DUP;
                         DUG 2;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CDR;
                         CDR;
                         CAR;
                         AMOUNT;
                         COMPARE;
                         GT }
                       { DIG 1;
                         DUP;
                         DUG 2;
                         DIG 1;
                         DUP;
                         DUG 2;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CDR;
                         CDR;
                         CAR;
                         AMOUNT;
                         COMPARE;
                         GE };
                     NOT;
                     IF
                       { PUSH string "Not Best Bid";
                         FAILWITH }
                       {  };
                     DIG 1;
                     DUP;
                     DUG 2;
                     DIG 1;
                     DUP;
                     DUG 2;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     CDR;
                     CAR;
                     IF_NONE
                       {  }
                       { DIG 6;
                         DUP;
                         DUG 7;
                         DIG 1;
                         DUP;
                         DUG 2;
                         CONTRACT unit;
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         DIG 4;
                         DUP;
                         DUG 5;
                         DIG 4;
                         DUP;
                         DUG 5;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CDR;
                         CDR;
                         CAR;
                         UNIT;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 6; DROP };
                         DUG 6;
                         DROP };
                     DIG 1;
                     DUP;
                     DUG 2;
                     DIG 1;
                     DUP;
                     DUG 2;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     DIG 2;
                     DUP;
                     DUG 3;
                     DIG 3;
                     DUP;
                     DUG 4;
                     DIG 3;
                     DUP;
                     DUG 4;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     UNPAIR;
                     SWAP;
                     UNPAIR;
                     DROP;
                     SENDER;
                     SOME;
                     SWAP;
                     UNPAIR;
                     DROP;
                     AMOUNT;
                     SWAP;
                     DROP;
                     DIG 7;
                     DUP;
                     DUG 8;
                     NOW;
                     DIG 8;
                     DUP;
                     DUG 9;
                     DIG 8;
                     DUP;
                     DUG 9;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     CDR;
                     CDR;
                     CDR;
                     SUB;
                     COMPARE;
                     LT;
                     IF
                       { DIG 7;
                         DUP;
                         DUG 8 }
                       { PUSH int 0 };
                     DIG 5;
                     DUP;
                     DUG 6;
                     CDR;
                     CDR;
                     CDR;
                     ADD;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SOME;
                     DIG 3;
                     DUP;
                     DUG 4;
                     UPDATE;
                     DIP { DIG 2; DROP };
                     DUG 2;
                     DROP 2;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     DIG 1;
                     PAIR }
                   { NOW;
                     DIG 2;
                     DUP;
                     DUG 3;
                     DIG 2;
                     DUP;
                     DUG 3;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     CDR;
                     CDR;
                     CDR;
                     COMPARE;
                     LT;
                     NOT;
                     IF
                       { PUSH string "Auction Is Still On";
                         FAILWITH }
                       {  };
                     DIG 5;
                     DUP;
                     DUG 6;
                     DIG 5;
                     DUP;
                     DUG 6;
                     CONTRACT %update_operators (list (or (pair address (pair address nat)) (pair address (pair address nat))));
                     IF_NONE
                       { PUSH string "BadContract";
                         FAILWITH }
                       {  };
                     PUSH mutez 0;
                     DIG 9;
                     DUP;
                     DUG 10;
                     DIG 4;
                     DUP;
                     DUG 5;
                     SELF;
                     ADDRESS;
                     PAIR;
                     DIG 6;
                     DUP;
                     DUG 7;
                     DIG 6;
                     DUP;
                     DUG 7;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     CAR;
                     PAIR;
                     EXEC;
                     TRANSFER_TOKENS;
                     CONS;
                     DIP { DIG 5; DROP };
                     DUG 5;
                     DIG 1;
                     DUP;
                     DUG 2;
                     DIG 1;
                     DUP;
                     DUG 2;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     CDR;
                     CAR;
                     IF_NONE
                       {  }
                       { DIG 6;
                         DUP;
                         DUG 7;
                         DIG 6;
                         DUP;
                         DUG 7;
                         CONTRACT %transfer (list (pair address (list (pair address (pair nat nat)))));
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         PUSH mutez 0;
                         DIG 11;
                         DUP;
                         DUG 12;
                         DIG 5;
                         DUP;
                         DUG 6;
                         DIG 5;
                         DUP;
                         DUG 6;
                         PAIR;
                         DIG 7;
                         DUP;
                         DUG 8;
                         DIG 7;
                         DUP;
                         DUG 8;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CAR;
                         PAIR;
                         EXEC;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 6; DROP };
                         DUG 6;
                         DIG 6;
                         DUP;
                         DUG 7;
                         DIG 3;
                         DUP;
                         DUG 4;
                         DIG 3;
                         DUP;
                         DUG 4;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CAR;
                         CONTRACT unit;
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         DIG 4;
                         DUP;
                         DUG 5;
                         DIG 4;
                         DUP;
                         DUG 5;
                         GET;
                         IF_NONE
                           { PUSH string "GetNoneValue";
                             FAILWITH }
                           {  };
                         CDR;
                         CDR;
                         CAR;
                         UNIT;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 6; DROP };
                         DUG 6;
                         DROP };
                     DIG 1;
                     DUP;
                     DUG 2;
                     NONE (pair address (pair (option address) (pair mutez timestamp)));
                     DIG 2;
                     DUP;
                     DUG 3;
                     UPDATE;
                     DIP { DIG 1; DROP };
                     DUG 1;
                     DROP;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     DIG 1;
                     PAIR } } };
         DIP { DROP 3 } };
}
```

</TabItem>

</Tabs>
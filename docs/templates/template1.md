---
id: template1
title: FA 1.2
sidebar_label: FA 1.2
slug: /templates/fa12
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Deploy from './Deploy';

## Introduction

A fungible token is basically an association table between the token owner (the account address) and the amount of tokens (a natural integer). It is possible to allow another account to transfer tokens on your behalf.

This contract follows the <a href='https://assets.tqtezos.com/docs/token-contracts/fa12/1-fa12-intro/'>Financial Asset 1.2</a> (FA 1.2) <a href='https://gitlab.com/tzip/tzip/blob/master/proposals/tzip-7/tzip-7.md'>TZIP 7</a> specification for fungible token on Tezos.

## API

### Storage


| Name | Type | Desc |
| -- | -- | -- |
| `totalsupply` | `nat` | Total number of tokens. |
| `ledger` | `collection` | Association between token holder and number of tokens. |
| `allowance` | `collection` | Association between the pair owner and spender and the allowed amount.  |
### Entrypoints

| Name | Parameters | Desc |
| -- | -- | -- |
| `transfer` | `from`, `to`, `value` | Transfers `value` tokens from `from` to `to`. If the *caller* is not equal to `from`, then *caller* must have been allowed by `from` to transfer this amount to `to`. |
| `approve` | `spender`, `value` | Approves `spender` to transfer `value` tokens from *caller*. |
| `getAllowance` | `owner`, `spender` | Getter for the allowed value for `owner` and `spender`. |
| `getBalance` | `owner` | Getter for the number of tokens owned by `owner`. |
| `getTotalSupply` | | Getter for `totalsupply` |

## Originate

Originate a FA 1.2 contract with the widget below.

Click "Connect to Wallet" button, fill the fields "Initial Holder" and "Total Supply", and click "Originate".

<Deploy/>

Originate the contract from <a href='https://archetype-lang.org/'>Archetype</a> code below with the following <Link to='/docs/cli'>Completium CLI</Link> example command:

```
completium-cli deploy fa12.arl --init '(@tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG, 10_000_000)'
```

The command sets:
* `initialholder` constant to `tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG`
* `totalsupply` variable to 10 millions

## Code

The <Link to='/docs/contract/programming-language#micheslon'>Michelson</Link> code is generated with version 1.2.3 of Archetype.

:::info
The Archetype FA 1.2 code has been <Link to='https://assets.tqtezos.com/docs/token-contracts/fa12/4-fa12-archetype/'>verified</Link> towards the formal specification presented below.
:::

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="archetype">

```archetype
archetype fa12(const initialholder: address, totalsupply : nat)

asset allowance identified by addr_owner addr_spender to big_map {
  addr_owner       : address;
  addr_spender     : address;
  amount           : nat;
}

asset ledger identified by holder to big_map {
  holder     : address;
  tokens     : nat = 0;
} initialized by {
  { holder = initialholder; tokens = totalsupply }
}

entry %transfer (%from : address, %to : address, value : nat) {
  require {
    r1 otherwise "NotEnoughBalance" : ledger[%from].tokens >= value;
  }
  effect {
    if caller <> %from then (
      var current = allowance[(%from, caller)].amount;
      dofailif(current < value, ("NotEnoughAllowance", ((value, current))));
      allowance.update((%from, caller), { amount -=  value });
    );
    ledger.update(%from, { tokens -= value });
    ledger.addupdate(%to, { tokens += value });
  }
}

entry approve(spender : address, value : nat) {
  var k = (caller, spender);
  if allowance.contains(k) then (
    var previous = allowance[k].amount;
    dofailif(previous > 0 and value > 0, (("UnsafeAllowanceChange", previous)));
  );
  allowance.addupdate( k, { amount = value });
}

getter getAllowance (owner : address, spender : address) : nat {
  return (allowance[(owner, spender)].amount)
}

getter getBalance (owner : address) : nat {
  return (if (ledger.contains(owner)) then ledger[owner].tokens else 0)
}

getter getTotalSupply () : nat {
  return totalsupply
}
```

</TabItem>

<TabItem value="michelson">

```js
# (Pair 10000000 (Pair {  } { Elt "tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG" 10000000 }))
{
  storage (pair (nat %totalsupply) (pair (big_map %allowance (pair address address) nat) (big_map %ledger address nat)));
  parameter (or (pair %getAllowance (pair (address %owner) (address %spender)) (contract nat)) (or (pair %getBalance (address %owner) (contract nat)) (or (pair %getTotalSupply unit (contract nat)) (or (pair %transfer (address %from) (pair (address %to) (nat %value))) (pair %approve (address %spender) (nat %value))))));
  code { NIL operation;
         DIG 1;
         UNPAIR;
         DIP { UNPAIR; SWAP; UNPAIR; SWAP };
         IF_LEFT
           { UNPAIR;
             UNPAIR;
             SWAP;
             DIG 6;
             DUP;
             DUG 7;
             DIG 3;
             DUP;
             DUG 4;
             AMOUNT;
             DIG 7;
             DUP;
             DUG 8;
             DIG 4;
             DUP;
             DUG 5;
             DIG 6;
             DUP;
             DUG 7;
             PAIR;
             GET;
             IF_NONE
               { PUSH string "GetNoneValue";
                 FAILWITH }
               {  };
             TRANSFER_TOKENS;
             CONS;
             DIP { DIG 6; DROP };
             DUG 6;
             DROP 3;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             DIG 1;
             PAIR }
           { IF_LEFT
               { UNPAIR;
                 DIG 5;
                 DUP;
                 DUG 6;
                 DIG 2;
                 DUP;
                 DUG 3;
                 AMOUNT;
                 DIG 5;
                 DUP;
                 DUG 6;
                 DIG 4;
                 DUP;
                 DUG 5;
                 MEM;
                 IF
                   { DIG 5;
                     DUP;
                     DUG 6;
                     DIG 4;
                     DUP;
                     DUG 5;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  } }
                   { PUSH nat 0 };
                 TRANSFER_TOKENS;
                 CONS;
                 DIP { DIG 5; DROP };
                 DUG 5;
                 DROP 2;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 DIG 1;
                 PAIR }
               { IF_LEFT
                   { UNPAIR;
                     DROP;
                     DIG 4;
                     DUP;
                     DUG 5;
                     DIG 1;
                     DUP;
                     DUG 2;
                     AMOUNT;
                     DIG 6;
                     DUP;
                     DUG 7;
                     TRANSFER_TOKENS;
                     CONS;
                     DIP { DIG 4; DROP };
                     DUG 4;
                     DROP;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     DIG 1;
                     PAIR }
                   { IF_LEFT
                       { UNPAIR;
                         SWAP;
                         UNPAIR;
                         SWAP;
                         DUP;
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
                         COMPARE;
                         GE;
                         NOT;
                         IF
                           { PUSH string "NotEnoughBalance";
                             FAILWITH }
                           {  };
                         DIG 2;
                         DUP;
                         DUG 3;
                         SENDER;
                         COMPARE;
                         NEQ;
                         IF
                           { DIG 4;
                             DUP;
                             DUG 5;
                             SENDER;
                             DIG 4;
                             DUP;
                             DUG 5;
                             PAIR;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             DIG 1;
                             DUP;
                             DUG 2;
                             DIG 1;
                             DUP;
                             DUG 2;
                             COMPARE;
                             LT;
                             IF
                               { DUP;
                                 DIG 2;
                                 DUP;
                                 DUG 3;
                                 PAIR;
                                 PUSH string "NotEnoughAllowance";
                                 PAIR;
                                 FAILWITH }
                               {  };
                             DIG 5;
                             DUP;
                             DUG 6;
                             SENDER;
                             DIG 5;
                             DUP;
                             DUG 6;
                             PAIR;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             DIG 6;
                             DUP;
                             DUG 7;
                             PUSH int 0;
                             DIG 4;
                             DUP;
                             DUG 5;
                             INT;
                             DIG 3;
                             DUP;
                             DUG 4;
                             SUB;
                             COMPARE;
                             GE;
                             IF
                               { DIG 3;
                                 DUP;
                                 DUG 4;
                                 INT;
                                 DIG 2;
                                 DUP;
                                 DUG 3;
                                 SUB;
                                 ABS }
                               { PUSH string "AssignNat";
                                 FAILWITH };
                             SOME;
                             SENDER;
                             DIG 7;
                             DUP;
                             DUG 8;
                             PAIR;
                             UPDATE;
                             DIP { DIG 6; DROP };
                             DUG 6;
                             DROP 2 }
                           {  };
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
                         DIG 4;
                         DUP;
                         DUG 5;
                         PUSH int 0;
                         DIG 3;
                         DUP;
                         DUG 4;
                         INT;
                         DIG 3;
                         DUP;
                         DUG 4;
                         SUB;
                         COMPARE;
                         GE;
                         IF
                           { DIG 2;
                             DUP;
                             DUG 3;
                             INT;
                             DIG 2;
                             DUP;
                             DUG 3;
                             SUB;
                             ABS }
                           { PUSH string "AssignNat";
                             FAILWITH };
                         SOME;
                         DIG 5;
                         DUP;
                         DUG 6;
                         UPDATE;
                         DIP { DIG 4; DROP };
                         DUG 4;
                         DROP;
                         DIG 3;
                         DUP;
                         DUG 4;
                         DIG 2;
                         DUP;
                         DUG 3;
                         MEM;
                         IF
                           { DIG 3;
                             DUP;
                             DUG 4;
                             DIG 2;
                             DUP;
                             DUG 3;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             DIG 4;
                             DUP;
                             DUG 5;
                             DIG 2;
                             DUP;
                             DUG 3;
                             DIG 2;
                             DUP;
                             DUG 3;
                             ADD;
                             SOME;
                             DIG 4;
                             DUP;
                             DUG 5;
                             UPDATE;
                             DIP { DIG 4; DROP };
                             DUG 4;
                             DROP }
                           { DIG 3;
                             DUP;
                             DUG 4;
                             DIG 2;
                             DUP;
                             DUG 3;
                             MEM;
                             IF
                               { PUSH string "KeyAlreadyExists";
                                 FAILWITH }
                               { DIG 3;
                                 DUP;
                                 DUG 4;
                                 DIG 1;
                                 DUP;
                                 DUG 2;
                                 PUSH nat 0;
                                 ADD;
                                 SOME;
                                 DIG 3;
                                 DUP;
                                 DUG 4;
                                 UPDATE;
                                 DIP { DIG 3; DROP };
                                 DUG 3 } };
                         DROP 3;
                         SWAP;
                         PAIR;
                         SWAP;
                         PAIR;
                         DIG 1;
                         PAIR }
                       { UNPAIR;
                         SWAP;
                         DIG 1;
                         DUP;
                         DUG 2;
                         SENDER;
                         PAIR;
                         DIG 4;
                         DUP;
                         DUG 5;
                         DIG 1;
                         DUP;
                         DUG 2;
                         MEM;
                         IF
                           { DIG 4;
                             DUP;
                             DUG 5;
                             DIG 1;
                             DUP;
                             DUG 2;
                             GET;
                             IF_NONE
                               { PUSH string "GetNoneValue";
                                 FAILWITH }
                               {  };
                             PUSH nat 0;
                             DIG 3;
                             DUP;
                             DUG 4;
                             COMPARE;
                             GT;
                             PUSH nat 0;
                             DIG 2;
                             DUP;
                             DUG 3;
                             COMPARE;
                             GT;
                             AND;
                             IF
                               { DUP;
                                 PUSH string "UnsafeAllowanceChange";
                                 PAIR;
                                 FAILWITH }
                               {  };
                             DROP }
                           {  };
                         DIG 4;
                         DUP;
                         DUG 5;
                         DIG 2;
                         DUP;
                         DUG 3;
                         SOME;
                         DIG 2;
                         DUP;
                         DUG 3;
                         UPDATE;
                         DIP { DIG 4; DROP };
                         DUG 4;
                         DROP 3;
                         SWAP;
                         PAIR;
                         SWAP;
                         PAIR;
                         DIG 1;
                         PAIR } } } } };
}
```

</TabItem>

<TabItem value="specification">

```archetype
specification {
  s1: ledger.sum(tokens) = totalsupply;
}

specification entry %transfer (%from : address, %to : address, value : nat) {
  fails {
    f0 with (msg : string) :
      let some after_ledger_from = ledger[%from] in
        msg = "NotEnoughBalance" and
        after_ledger_from.tokens < value
      otherwise true;
    f1 with (msg : string * (nat * nat)) :
      let some after_allowance_from_caller = allowance[(%from,caller)] in
        msg = ("NotEnoughAllowance", ((value, after_allowance_from_caller.amount))) and
        caller <> %from and
        after_allowance_from_caller.amount < value
      otherwise false;
  }

  (* LEDGER ASSET *)
  postcondition transfer_p1 { (* effect on %from nbtokens *)
    %from <> %to ->
    let some before_ledger_from = before.ledger[%from] in
    let some after_ledger_from  = ledger[%from] in
    after_ledger_from = { before_ledger_from with
      tokens = abs (before_ledger_from.tokens - value)
    }
    otherwise false otherwise false
  }

  postcondition transfer_p2 { (* effect on %to nbtokens *)
    %from <> %to ->
    let some after_ledger_to = ledger[%to] in
    let some before_ledger_to = before.ledger[%to] in
      after_ledger_to = { before_ledger_to with
        tokens = (before_ledger_to.tokens + value)
      }
    otherwise
      after_ledger_to = { holder = %to; tokens = value }
    otherwise false (* %to ledger asset exists after transfer *) r
  }

  postcondition transfer_p3 {
    %from = %to -> ledger = before.ledger
  }

  postcondition transfer_p4 { (* other ledger assets are unchanged *)
    forall tokenholder in ledger,
      tokenholder.holder <> %from ->
      tokenholder.holder <> %to ->
      before.ledger[tokenholder.holder] = some(tokenholder)
  }

  postcondition transfer_p5 { (* no ledger asset is removed *)
    removed.ledger.isempty()
  }

  postcondition transfer_p6 { (* number of added asset may be one *)
    let some before_to = before.ledger[%to] in
      added.ledger.isempty()
    otherwise
      added.ledger = [ { holder = %to; tokens = value } ]
  }

  (* ALLOWANCE ASSET *)
  postcondition transfer_p7 { (* effect on allowance *)
    caller <> %from ->
    let some before_from_caller = before.allowance[(%from,caller)] in
    let some after_from_caller = allowance[(%from,caller)] in
      before_from_caller.amount > value ->
      after_from_caller = { before_from_caller with
        amount = abs (before_from_caller.amount - value)
      }
    otherwise false
    otherwise true
  }

  postcondition transfer_p8 { (* effect on allowance *)
    caller = %from -> allowance = before.allowance
  }

  postcondition transfer_p9 { (* other allowance assets are unchanged *)
    forall a in allowance,
      a.addr_owner <> %from and a.addr_spender <> caller ->
      before.allowance[(a.addr_owner, a.addr_spender)] = some(a)
  }

  postcondition transfer_p10 { (* no allowance is added or removed *)
    removed.allowance.isempty() and added.allowance.isempty()
  }

  postcondition transfer_p11 { (* no operation generated *)
    length (operations) = 0
  }
}

specification entry approve(spender : address, value : nat) {
  fails {
    f2 with (msg : (string * nat)) :
      let some allowance_caller_spender = allowance[(caller, spender)] in
        msg = ("UnsafeAllowanceChange", allowance_caller_spender.amount) and
        value > 0 and
        allowance_caller_spender.amount > 0
      otherwise false;
  }

  postcondition approve_p1 { (* effect on allowance asset *)
    let some after_allowance_caller_spender = allowance[(caller,spender)] in
    let some before_allowance_caller_spender = before.allowance[(caller,spender)] in
      after_allowance_caller_spender = { before_allowance_caller_spender with
        amount = value
      }
    otherwise
      after_allowance_caller_spender = { addr_owner = caller; addr_spender = spender; amount = value }
    otherwise false
  }

  postcondition approve_p2 { (* other allowance assets are unchanged *)
    forall a in allowance,
      (a.addr_owner, a.addr_spender) <> (caller, spender) ->
      before.allowance[(a.addr_owner, a.addr_spender)] = some(a)
  }

  postcondition approve_p3 { (* added allowance *)
    let some allowance_caller_spender = before.allowance[(caller, spender)] in
      added.allowance.isempty()
    otherwise
      added.allowance = [ { addr_owner = caller; addr_spender = spender; amount = value } ]
  }

  postcondition approve_p4 { (* no allowance asset is removed *)
    removed.allowance.isempty()
  }

  postcondition approve_p5 {
    ledger = before.ledger
  }

  postcondition approve_p6 { (*  no operation generated *)
    length (operations) = 0
  }
}

specification getter getAllowance (owner : address, spender : address) {
  postcondition getallowance_p1 { (* creates one op *)
    length (operations) = 1
  }

  postcondition getallowance_p2 { (* assets are unchanged *)
    ledger = before.ledger and allowance = before.allowance
  }
}

specification getter getBalance (owner : address) {
  postcondition getbalance_p1 { (* creates one op *)
    length (operations) = 1
  }

  postcondition getbalance_p2 { (* assets are unchanged *)
    ledger = before.ledger and allowance = before.allowance
  }
}

specification getter getTotalSupply () {
  postcondition gettotalsupply_p1 { (* creates one op *)
    length (operations) = 1
  }

  postcondition gettotalsupply_p2 { (* assets are unchanged *)
    ledger = before.ledger and allowance = before.allowance
  }
}
```

</TabItem>

</Tabs>
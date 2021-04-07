---
id: template1
title: FA 1.2
sidebar_label: FA 1.2
slug: /templates/fa12
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


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

## Code

Deploy the contract from <a href='https://archetype-lang.org/'>Archetype</a> code below with the following <Link to='/docs/cli'>Completium CLI</Link> example command:

```
completium-cli deploy fa12.arl --init '(@tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG, 10_000_000)'
```

The command sets:
* `initialholder` constant to `tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG`
* `totalsupply` variable to 10 millions

<Link to='/docs/contract/programming-language#micheslon'>Michelson</Link> code is generated with version 1.2.3 of Archetype.

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
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
# (Pair {  } { Elt "tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG" 10000000 })
{
  storage (pair (big_map %allowance (pair address address) nat) (big_map %ledger address nat));
  parameter (or (pair %getAllowance (pair (address %owner) (address %spender)) (contract nat)) (or (pair %getBalance (address %owner) (contract nat)) (or (pair %getTotalSupply unit (contract nat)) (or (pair %transfer (address %from) (pair (address %to) (nat %value))) (pair %approve (address %spender) (nat %value))))));
  code { NIL operation;
         DIG 1;
         UNPAIR;
         DIP { UNPAIR; SWAP };
         IF_LEFT
           { UNPAIR;
             UNPAIR;
             SWAP;
             DIG 5;
             DUP;
             DUG 6;
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
             DIP { DIG 5; DROP };
             DUG 5;
             DROP 3;
             SWAP;
             PAIR;
             DIG 1;
             PAIR }
           { IF_LEFT
               { UNPAIR;
                 DIG 4;
                 DUP;
                 DUG 5;
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
                 DIP { DIG 4; DROP };
                 DUG 4;
                 DROP 2;
                 SWAP;
                 PAIR;
                 DIG 1;
                 PAIR }
               { IF_LEFT
                   { UNPAIR;
                     DROP;
                     DIG 3;
                     DUP;
                     DUG 4;
                     DIG 1;
                     DUP;
                     DUG 2;
                     AMOUNT;
                     PUSH nat 10000000;
                     TRANSFER_TOKENS;
                     CONS;
                     DIP { DIG 3; DROP };
                     DUG 3;
                     DROP;
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
                         DIG 1;
                         PAIR } } } } };
}
```

</TabItem>
</Tabs>
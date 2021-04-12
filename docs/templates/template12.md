---
id: template12
title: Miles
sidebar_label: Miles
slug: /templates/miles
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

This contract stores miles per owners. Miles have an expiration date and valid miles can be consumed.

See this contract in action in the <Link to='/docs/dapp-miles/'>Fidelity Program</Link> Dapp example.

## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `admin` | `address` | Admin address to call `add` entrypoint. |
| `mile` | `collection` | A mile is defined by:<ul><li>id</li><li>amount</li><li>expiration date</li></ul> |
| `owner` | `collection` | A mile owner is defined by:<ul><li>an address</li><li>a collection of `mile`</li></ul><p />A mile is owned by one and only one owner: this is ensured by the use of `partition` collection type (see <Link to='/docs/templates/miles#code'>code</Link> below). |

### Entrypoints

| Name | Parameters | Description |
| -- | -- | -- |
| `add` | `ow`, `nm_id`, `nm_amount`, `nm_exp` | Called by `admin` to grant owner `ow` with `nm_amount` miles that expire on `nm_exp`. |
| `consume` | `ow`, `quantity` | Called by `admin` to consume `quantity` valid miles (ie. miles with expiration date in the future) from owner `ow`.
| `clear_expired` | | Removes expired miles. |

## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="archetype">

```archetype title="miles.arl"
archetype miles(admin : address)

asset mile identified by id {
   id         : string;
   amount     : nat;
   expiration : date
}

asset owner identified by addr {
  addr  : role;
  miles : partition<mile> = []
}

entry add (
  ow        : address,
  nm_id     : string,
  nm_amount : nat,
  nm_exp    : date) {
   called by admin
   failif {
     c2 : mile.contains(nm_id);
   }
   effect {
     owner.addupdate (ow, { miles += [{
       id         = nm_id;
       amount     = nm_amount;
       expiration = nm_exp
      }] })
   }
}

entry consume (ow : address, quantity : nat) {
  called by admin
  effect {
    var lview = owner[ow].miles.sort(expiration).select(the.expiration >= now);
    dorequire (lview.sum(the.amount) >= quantity, "NotEnoughMiles");
    var remainder = quantity;
    for : loop m in lview do
      if remainder > 0 then begin
        if mile[m].amount > remainder then begin
          mile.update(m, { amount -= remainder });
          remainder := 0
        end else if mile[m].amount = remainder then begin
          remainder := 0;
          owner[ow].miles.remove(m)
        end else begin
          remainder -= mile[m].amount;
          owner[ow].miles.remove(m)
        end
      end
    done;
    assert p1
  }
}

entry clear_expired () {
  for : loop2 o in owner do
    owner[o].miles.removeif(the.expiration < now)
  done
}
```

</TabItem>

<TabItem value="michelson">

```js
# (Pair admin (Pair {  } {  }))
{
  storage (pair (address %admin) (pair (map %mile string (pair (nat %amount) (timestamp %expiration))) (map %owner address (set string))));
  parameter (or (pair %add (address %ow) (pair (string %nm_id) (pair (nat %nm_amount) (timestamp %nm_exp)))) (or (pair %consume (address %ow) (nat %quantity)) (unit %clear_expired)));
  code { UNPAIR;
         DIP { UNPAIR; SWAP; UNPAIR; SWAP };
         IF_LEFT
           { UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             DIG 6;
             DUP;
             DUG 7;
             SENDER;
             COMPARE;
             EQ;
             NOT;
             IF
               { PUSH string "InvalidCaller";
                 FAILWITH }
               {  };
             DIG 5;
             DUP;
             DUG 6;
             DIG 3;
             DUP;
             DUG 4;
             MEM;
             IF
               { PUSH string "InvalidCondition: c2";
                 FAILWITH }
               {  };
             DIG 4;
             DUP;
             DUG 5;
             DIG 4;
             DUP;
             DUG 5;
             MEM;
             IF
               { DIG 5;
                 DUP;
                 DUG 6;
                 DIG 3;
                 DUP;
                 DUG 4;
                 MEM;
                 NOT;
                 IF
                   { DIG 4;
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
                     DIG 5;
                     DUP;
                     DUG 6;
                     DIG 1;
                     DUP;
                     DUG 2;
                     PUSH bool True;
                     DIG 6;
                     DUP;
                     DUG 7;
                     UPDATE;
                     SOME;
                     DIG 6;
                     DUP;
                     DUG 7;
                     UPDATE;
                     DIP { DIG 5; DROP };
                     DUG 5;
                     DIG 6;
                     DUP;
                     DUG 7;
                     DIG 2;
                     DUP;
                     DUG 3;
                     DIG 4;
                     DUP;
                     DUG 5;
                     PAIR;
                     SOME;
                     DIG 5;
                     DUP;
                     DUG 6;
                     UPDATE;
                     DIP { DIG 6; DROP };
                     DUG 6;
                     DROP }
                   { PUSH string "KeyAlreadyExists";
                     FAILWITH } }
               { DIG 4;
                 DUP;
                 DUG 5;
                 DIG 4;
                 DUP;
                 DUG 5;
                 MEM;
                 IF
                   { PUSH string "KeyAlreadyExists";
                     FAILWITH }
                   { DIG 5;
                     DUP;
                     DUG 6;
                     DIG 3;
                     DUP;
                     DUG 4;
                     MEM;
                     IF
                       { PUSH string "KeyAlreadyExists";
                         FAILWITH }
                       { DIG 4;
                         DUP;
                         DUG 5;
                         EMPTY_SET string;
                         PUSH bool True;
                         DIG 5;
                         DUP;
                         DUG 6;
                         UPDATE;
                         SOME;
                         DIG 5;
                         DUP;
                         DUG 6;
                         UPDATE;
                         DIP { DIG 4; DROP };
                         DUG 4;
                         DIG 5;
                         DUP;
                         DUG 6;
                         DIG 1;
                         DUP;
                         DUG 2;
                         DIG 3;
                         DUP;
                         DUG 4;
                         PAIR;
                         SOME;
                         DIG 4;
                         DUP;
                         DUG 5;
                         UPDATE;
                         DIP { DIG 5; DROP };
                         DUG 5 } } };
             DROP 4;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             NIL operation;
             PAIR }
           { IF_LEFT
               { UNPAIR;
                 SWAP;
                 DIG 4;
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
                 NIL string;
                 NIL string;
                 NIL string;
                 DIG 5;
                 DUP;
                 DUG 6;
                 DIG 5;
                 DUP;
                 DUG 6;
                 GET;
                 IF_NONE
                   { PUSH string "GetNoneValue";
                     FAILWITH }
                   {  };
                 ITER { DIG 7;
                        DUP;
                        DUG 8;
                        DIG 1;
                        DUP;
                        DUG 2;
                        GET;
                        IF_NONE
                          { PUSH string "GetNoneValue";
                            FAILWITH }
                          {  };
                        NIL string;
                        DIG 2;
                        DUP;
                        DUG 3;
                        SOME;
                        PAIR;
                        DIG 3;
                        DUP;
                        DUG 4;
                        ITER { DIG 1;
                               DUP;
                               DUG 2;
                               CAR;
                               DIG 2;
                               DUP;
                               DUG 3;
                               CDR;
                               DIG 1;
                               DUP;
                               DUG 2;
                               IF_NONE
                                 { DUP;
                                   DIG 3;
                                   DUP;
                                   DUG 4;
                                   CONS;
                                   DIG 2;
                                   DUP;
                                   DUG 3;
                                   PAIR }
                                 { PUSH int 0;
                                   DIG 14;
                                   DUP;
                                   DUG 15;
                                   DIG 5;
                                   DUP;
                                   DUG 6;
                                   GET;
                                   IF_NONE
                                     { PUSH string "GetNoneValue";
                                       FAILWITH }
                                     {  };
                                   DIG 7;
                                   DUP;
                                   DUG 8;
                                   CDR;
                                   DIG 1;
                                   DUP;
                                   DUG 2;
                                   CDR;
                                   COMPARE;
                                   GT;
                                   IF
                                     { PUSH int 1 }
                                     { PUSH int 0 };
                                   DIP { DROP };
                                   COMPARE;
                                   GT;
                                   IF
                                     { DIG 1;
                                       DUP;
                                       DUG 2;
                                       DIG 7;
                                       DUP;
                                       DUG 8;
                                       CONS;
                                       DIG 4;
                                       DUP;
                                       DUG 5;
                                       CONS;
                                       NONE string;
                                       PAIR }
                                     { DIG 1;
                                       DUP;
                                       DUG 2;
                                       DIG 4;
                                       DUP;
                                       DUG 5;
                                       CONS;
                                       DIG 3;
                                       DUP;
                                       DUG 4;
                                       PAIR };
                                   SWAP;
                                   DROP };
                               DIP { DROP };
                               DIP { DROP };
                               DIP { DIG 1; DROP };
                               DUG 1;
                               DROP };
                        DUP;
                        CAR;
                        DIG 1;
                        DUP;
                        DUG 2;
                        CDR;
                        NIL string;
                        DIG 2;
                        DUP;
                        DUG 3;
                        IF_NONE
                          { DIG 1;
                            DUP;
                            DUG 2 }
                          { DIG 2;
                            DUP;
                            DUG 3;
                            DIG 7;
                            DUP;
                            DUG 8;
                            CONS;
                            SWAP;
                            DROP };
                        ITER { DIG 1;
                               DUP;
                               DUG 2;
                               DIG 1;
                               DUP;
                               DUG 2;
                               CONS;
                               DIP { DIG 1; DROP };
                               DUG 1;
                               DROP };
                        DIP { DROP };
                        DIP { DROP };
                        DIP { DROP };
                        DIP { DROP };
                        DIP { DIG 1; DROP };
                        DUG 1;
                        DROP };
                 ITER { DIG 6;
                        DUP;
                        DUG 7;
                        DIG 1;
                        DUP;
                        DUG 2;
                        GET;
                        IF_NONE
                          { PUSH string "GetNoneValue";
                            FAILWITH }
                          {  };
                        NOW;
                        DIG 1;
                        DUP;
                        DUG 2;
                        CDR;
                        COMPARE;
                        GE;
                        IF
                          { DIG 2;
                            DUP;
                            DUG 3;
                            DIG 2;
                            DUP;
                            DUG 3;
                            CONS }
                          { DIG 2;
                            DUP;
                            DUG 3 };
                        DIP { DROP };
                        DIP { DIG 1; DROP };
                        DUG 1;
                        DROP };
                 ITER { DIG 1;
                        DUP;
                        DUG 2;
                        DIG 1;
                        DUP;
                        DUG 2;
                        CONS;
                        DIP { DIG 1; DROP };
                        DUG 1;
                        DROP };
                 DIG 1;
                 DUP;
                 DUG 2;
                 PUSH nat 0;
                 DIG 2;
                 DUP;
                 DUG 3;
                 ITER { DIG 7;
                        DUP;
                        DUG 8;
                        DIG 1;
                        DUP;
                        DUG 2;
                        GET;
                        IF_NONE
                          { PUSH string "GetNoneValue";
                            FAILWITH }
                          {  };
                        DUP;
                        CAR;
                        DIG 3;
                        DUP;
                        DUG 4;
                        ADD;
                        DIP { DROP };
                        DIP { DIG 1; DROP };
                        DUG 1;
                        DROP };
                 COMPARE;
                 GE;
                 NOT;
                 IF
                   { PUSH string "NotEnoughMiles";
                     FAILWITH }
                   {  };
                 DIG 1;
                 DUP;
                 DUG 2;
                 DIG 1;
                 DUP;
                 DUG 2;
                 ITER { PUSH nat 0;
                        DIG 2;
                        DUP;
                        DUG 3;
                        COMPARE;
                        GT;
                        IF
                          { DIG 1;
                            DUP;
                            DUG 2;
                            DIG 7;
                            DUP;
                            DUG 8;
                            DIG 2;
                            DUP;
                            DUG 3;
                            GET;
                            IF_NONE
                              { PUSH string "GetNoneValue";
                                FAILWITH }
                              {  };
                            CAR;
                            COMPARE;
                            GT;
                            IF
                              { DIG 6;
                                DUP;
                                DUG 7;
                                DIG 1;
                                DUP;
                                DUG 2;
                                GET;
                                IF_NONE
                                  { PUSH string "GetNoneValue";
                                    FAILWITH }
                                  {  };
                                DIG 7;
                                DUP;
                                DUG 8;
                                DIG 8;
                                DUP;
                                DUG 9;
                                DIG 3;
                                DUP;
                                DUG 4;
                                GET;
                                IF_NONE
                                  { PUSH string "GetNoneValue";
                                    FAILWITH }
                                  {  };
                                UNPAIR;
                                DROP;
                                PUSH int 0;
                                DIG 5;
                                DUP;
                                DUG 6;
                                INT;
                                DIG 4;
                                DUP;
                                DUG 5;
                                CAR;
                                SUB;
                                COMPARE;
                                GE;
                                IF
                                  { DIG 4;
                                    DUP;
                                    DUG 5;
                                    INT;
                                    DIG 3;
                                    DUP;
                                    DUG 4;
                                    CAR;
                                    SUB;
                                    ABS }
                                  { PUSH string "AssignNat";
                                    FAILWITH };
                                PAIR;
                                SOME;
                                DIG 3;
                                DUP;
                                DUG 4;
                                UPDATE;
                                DIP { DIG 7; DROP };
                                DUG 7;
                                DROP;
                                PUSH nat 0;
                                DIP { DIG 1; DROP };
                                DUG 1 }
                              { DIG 1;
                                DUP;
                                DUG 2;
                                DIG 7;
                                DUP;
                                DUG 8;
                                DIG 2;
                                DUP;
                                DUG 3;
                                GET;
                                IF_NONE
                                  { PUSH string "GetNoneValue";
                                    FAILWITH }
                                  {  };
                                CAR;
                                COMPARE;
                                EQ;
                                IF
                                  { PUSH nat 0;
                                    DIP { DIG 1; DROP };
                                    DUG 1;
                                    DIG 6;
                                    DUP;
                                    DUG 7;
                                    NONE (pair nat timestamp);
                                    DIG 2;
                                    DUP;
                                    DUG 3;
                                    UPDATE;
                                    DIP { DIG 6; DROP };
                                    DUG 6;
                                    DIG 5;
                                    DUP;
                                    DUG 6;
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
                                    PUSH bool False;
                                    DIG 3;
                                    DUP;
                                    DUG 4;
                                    UPDATE;
                                    SOME;
                                    DIG 6;
                                    DUP;
                                    DUG 7;
                                    UPDATE;
                                    DIP { DIG 5; DROP };
                                    DUG 5 }
                                  { PUSH int 0;
                                    DIG 7;
                                    DUP;
                                    DUG 8;
                                    DIG 2;
                                    DUP;
                                    DUG 3;
                                    GET;
                                    IF_NONE
                                      { PUSH string "GetNoneValue";
                                        FAILWITH }
                                      {  };
                                    CAR;
                                    INT;
                                    DIG 3;
                                    DUP;
                                    DUG 4;
                                    SUB;
                                    COMPARE;
                                    GE;
                                    IF
                                      { DIG 6;
                                        DUP;
                                        DUG 7;
                                        DIG 1;
                                        DUP;
                                        DUG 2;
                                        GET;
                                        IF_NONE
                                          { PUSH string "GetNoneValue";
                                            FAILWITH }
                                          {  };
                                        CAR;
                                        INT;
                                        DIG 2;
                                        DUP;
                                        DUG 3;
                                        SUB;
                                        ABS }
                                      { PUSH string "AssignNat";
                                        FAILWITH };
                                    DIP { DIG 1; DROP };
                                    DUG 1;
                                    DIG 6;
                                    DUP;
                                    DUG 7;
                                    NONE (pair nat timestamp);
                                    DIG 2;
                                    DUP;
                                    DUG 3;
                                    UPDATE;
                                    DIP { DIG 6; DROP };
                                    DUG 6;
                                    DIG 5;
                                    DUP;
                                    DUG 6;
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
                                    PUSH bool False;
                                    DIG 3;
                                    DUP;
                                    DUG 4;
                                    UPDATE;
                                    SOME;
                                    DIG 6;
                                    DUP;
                                    DUG 7;
                                    UPDATE;
                                    DIP { DIG 5; DROP };
                                    DUG 5 } } }
                          {  };
                        DROP };
                 DROP 4;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 NIL operation;
                 PAIR }
               { DROP;
                 DUP;
                 ITER { UNPAIR;
                        DIG 2;
                        DUP;
                        DUG 3;
                        DIG 1;
                        DUP;
                        DUG 2;
                        GET;
                        IF_NONE
                          { PUSH string "GetNoneValue";
                            FAILWITH }
                          {  };
                        ITER { DIG 4;
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
                               NOW;
                               DIG 1;
                               DUP;
                               DUG 2;
                               CDR;
                               COMPARE;
                               LT;
                               IF
                                 { DIG 5;
                                   DUP;
                                   DUG 6;
                                   NONE (pair nat timestamp);
                                   DIG 3;
                                   DUP;
                                   DUG 4;
                                   UPDATE;
                                   DIP { DIG 5; DROP };
                                   DUG 5;
                                   DIG 4;
                                   DUP;
                                   DUG 5;
                                   DIG 5;
                                   DUP;
                                   DUG 6;
                                   DIG 4;
                                   DUP;
                                   DUG 5;
                                   GET;
                                   IF_NONE
                                     { PUSH string "GetNoneValue";
                                       FAILWITH }
                                     {  };
                                   PUSH bool False;
                                   DIG 4;
                                   DUP;
                                   DUG 5;
                                   UPDATE;
                                   SOME;
                                   DIG 4;
                                   DUP;
                                   DUG 5;
                                   UPDATE;
                                   DIP { DIG 4; DROP };
                                   DUG 4 }
                                 {  };
                               DROP 2 };
                        DROP 2 };
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 NIL operation;
                 PAIR } } };
}
```

</TabItem>


<TabItem value="specification">

```archetype title="miles.arl"
specification asset mile {
  m1: amount > 0;
}

specification entry consume (quantity : int) {
  assert p1 {
      remainder = 0
  }
  postcondition p2 {
    mile.sum(the.amount) = before.mile.sum(the.amount) - quantity
    invariant for loop {
      0 <= remainder <= toiterate.sum(the.amount);
        before.mile.sum(the.amount) = mile.sum(the.amount) + quantity - remainder
    }
  }
  postcondition p3 {
    forall m in removed.mile, m.expiration >= now
    invariant for loop {
      removed.mile.subsetof(by_expiration)
    }
  }
  postcondition p4 {
    added.mile.isempty()
  }
}

specification entry clear_expired () {
  postcondition s3 {
    forall m in removed.mile, m.expiration < now
    invariant for loop2 {
      forall m in removed.mile, m.expiration < now
    }
  }
}
```

</TabItem>

</Tabs>
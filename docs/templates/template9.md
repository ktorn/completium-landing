---
id: template9
title: Competition
sidebar_label: Competition
slug: /templates/competition
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

This contract collects competitors' scores, and distribute prize to top scores. Submitted scores must be signed by an external oracle to be registered.

You may see this contract in action in the <Link to='/docs/dapp-game/'>2048 competition</Link> DApp example.

## API

### Storage


| Name | Type | Description |
| -- | -- | -- |
| `organizer` | `address` | Address of the organizer. |
| `prize` | `tez` | Prize value in tez. |
| `oracle` | `key` | Key of the score oracle. |
| `submission` | `collection` | A submission is defined by:<ul><li>a competitor address</li><li>a score</li><li>a timestamp</li></ul>
| `_state` | `states` | Contract state, one of `Created`, `InProgress`, `Closed`. |

### Entrypoints

| Name | Parameters | Description |
| -- | -- | -- |
| `confirmed` |  | Called by `organizer` to open the competition. Prize must be transferred. |
| `submit` | `packed_score`, `signed_score` | Adds a submission; `packed_score` is packed version of the pair *competitor address* and *score*; `signed_score` is this packed data signed by `oracle`. <p/>It fails if the data is not signed by `oracle`; it updates the score of the competitor if score already exists.
| `close` | | Sets contract state to `Closed` and distribute prize to top scores: <ul><li>*50%*, *30%*, *20%* if more than 3 submissions</li><li>*60%*, *40%* if 2 submissions</li><li>*100%* if only one submission</li></ul> |

## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
  ]}>

<TabItem value="archetype">

```archetype title="competition.arl"
archetype competition(
  organizer   : address,
  prize       : tez,
  oracle      : key,
)

asset submission {
  competitor : address;
  score      : nat;
  timestamp  : date;
}

(* state machine *)
states =
 | Created     initial
 | InProgress
 | Closed

transition confirm () {
  called by organizer
  from Created to InProgress
  when { transferred = prize }
}

entry submit (packed_score : bytes, signed_score : signature) {
  require {
    c1 : state = InProgress;
  }
  effect {
    if check_signature(oracle, signed_score, packed_score) then (
      match unpack<address * nat>(packed_score) with
      | some(s) ->
        submission.addupdate(s[0], {
          score = s[1];
          timestamp = now
        })
      | none -> fail("CANNOT_UNPACK_SCORE")
      end
    ) else fail("NOT_SIGNED_BY_ORACLE");
  }
}

transition close () {
  called by organizer
  from InProgress to Closed
  with effect {
    var submissions = submission.sort(desc(score), timestamp);
    if submissions.count() >= 3 then begin
      var first  = submissions.nth(0);
      var second = submissions.nth(1);
      var third  = submissions.nth(2);
      var q1 = 50% * prize;
      var q2 = 30% * prize;
      var q3 = 20% * prize;
      transfer q1 to first;
      transfer q2 to second;
      transfer q3 to third;
      transfer (prize - q1 - q2 - q3) to organizer
    end else if submissions.count() >= 2 then begin
      var first  = submissions.nth(0);
      var second = submissions.nth(1);
      var q1 = 60% * prize;
      var q2 = 40% * prize;
      transfer q1 to first;
      transfer q2 to second;
      transfer (prize - q1 - q2) to organizer
    end else if submissions.count() >= 1 then begin
      var first = submissions.nth(0);
      transfer prize to first
    end else transfer prize to organizer
  }
}
```

</TabItem>

<TabItem value="michelson">

```js
# (Pair organizer (Pair prize (Pair oracle (Pair 0 {  }))))
{
  storage (pair (address %organizer) (pair (mutez %prize) (pair (key %oracle) (pair (nat %_state) (map %submission address (pair (nat %score) (timestamp %timestamp)))))));
  parameter (or (unit %confirm) (or (pair %submit (bytes %packed_score) (signature %signed_score)) (unit %close)));
  code { NIL operation;
         DIG 1;
         UNPAIR;
         DIP { UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP };
         IF_LEFT
           { DROP;
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
             DIG 1;
             DUP;
             DUG 2;
             DUP;
             PUSH nat 0;
             COMPARE;
             EQ;
             IF
               { DIG 4;
                 DUP;
                 DUG 5;
                 AMOUNT;
                 COMPARE;
                 EQ;
                 IF
                   { PUSH nat 1;
                     DIP { DIG 2; DROP };
                     DUG 2 }
                   {  } }
               { PUSH string "InvalidState";
                 FAILWITH };
             DROP;
             SWAP;
             PAIR;
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
                 PUSH nat 1;
                 DIG 4;
                 DUP;
                 DUG 5;
                 COMPARE;
                 EQ;
                 NOT;
                 IF
                   { PUSH string "InvalidCondition: c1";
                     FAILWITH }
                   {  };
                 DIG 1;
                 DUP;
                 DUG 2;
                 DIG 1;
                 DUP;
                 DUG 2;
                 DIG 6;
                 DUP;
                 DUG 7;
                 CHECK_SIGNATURE;
                 IF
                   { DIG 1;
                     DUP;
                     DUG 2;
                     UNPACK (pair address nat);
                     IF_NONE
                       { PUSH string "CANNOT_UNPACK_SCORE";
                         FAILWITH }
                       { DIG 3;
                         DUP;
                         DUG 4;
                         NOW;
                         DIG 2;
                         DUP;
                         DUG 3;
                         CDR;
                         PAIR;
                         SOME;
                         DIG 2;
                         DUP;
                         DUG 3;
                         CAR;
                         UPDATE;
                         DIP { DIG 3; DROP };
                         DUG 3;
                         DROP } }
                   { PUSH string "NOT_SIGNED_BY_ORACLE";
                     FAILWITH };
                 DROP 2;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 DIG 1;
                 PAIR }
               { DROP;
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
                 DIG 1;
                 DUP;
                 DUG 2;
                 DUP;
                 PUSH nat 1;
                 COMPARE;
                 EQ;
                 IF
                   { NIL address;
                     DIG 2;
                     DUP;
                     DUG 3;
                     ITER { UNPAIR;
                            NIL address;
                            DIG 1;
                            DUP;
                            DUG 2;
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
                                       DIG 10;
                                       DUP;
                                       DUG 11;
                                       DIG 5;
                                       DUP;
                                       DUG 6;
                                       GET;
                                       IF_NONE
                                         { PUSH string "GetNoneValue";
                                           FAILWITH }
                                         {  };
                                       DIG 8;
                                       DUP;
                                       DUG 9;
                                       CAR;
                                       DIG 1;
                                       DUP;
                                       DUG 2;
                                       CAR;
                                       COMPARE;
                                       LT;
                                       IF
                                         { PUSH int 1 }
                                         { DIG 8;
                                           DUP;
                                           DUG 9;
                                           CDR;
                                           DIG 1;
                                           DUP;
                                           DUG 2;
                                           CDR;
                                           COMPARE;
                                           GT;
                                           IF
                                             { PUSH int 1 }
                                             { PUSH int 0 } };
                                       DIP { DROP };
                                       COMPARE;
                                       GT;
                                       IF
                                         { DIG 1;
                                           DUP;
                                           DUG 2;
                                           DIG 6;
                                           DUP;
                                           DUG 7;
                                           CONS;
                                           DIG 4;
                                           DUP;
                                           DUG 5;
                                           CONS;
                                           NONE address;
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
                            NIL address;
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
                                DIG 6;
                                DUP;
                                DUG 7;
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
                            DIP { DIG 2; DROP };
                            DUG 2;
                            DROP 2 };
                     PUSH nat 3;
                     DIG 1;
                     DUP;
                     DUG 2;
                     SIZE;
                     COMPARE;
                     GE;
                     IF
                       { NONE address;
                         PUSH nat 0;
                         PAIR;
                         DIG 1;
                         DUP;
                         DUG 2;
                         ITER { PUSH nat 0;
                                DIG 2;
                                DUP;
                                DUG 3;
                                CAR;
                                COMPARE;
                                EQ;
                                IF
                                  { DUP;
                                    SOME;
                                    PUSH nat 1;
                                    DIG 3;
                                    DUP;
                                    DUG 4;
                                    CAR;
                                    ADD;
                                    PAIR }
                                  { DIG 1;
                                    DUP;
                                    DUG 2;
                                    CDR;
                                    PUSH nat 1;
                                    DIG 3;
                                    DUP;
                                    DUG 4;
                                    CAR;
                                    ADD;
                                    PAIR };
                                DIP { DIG 1; DROP };
                                DUG 1;
                                DROP };
                         CDR;
                         IF_NONE
                           { PUSH string "NoneValue";
                             FAILWITH }
                           {  };
                         NONE address;
                         PUSH nat 0;
                         PAIR;
                         DIG 2;
                         DUP;
                         DUG 3;
                         ITER { PUSH nat 1;
                                DIG 2;
                                DUP;
                                DUG 3;
                                CAR;
                                COMPARE;
                                EQ;
                                IF
                                  { DUP;
                                    SOME;
                                    PUSH nat 1;
                                    DIG 3;
                                    DUP;
                                    DUG 4;
                                    CAR;
                                    ADD;
                                    PAIR }
                                  { DIG 1;
                                    DUP;
                                    DUG 2;
                                    CDR;
                                    PUSH nat 1;
                                    DIG 3;
                                    DUP;
                                    DUG 4;
                                    CAR;
                                    ADD;
                                    PAIR };
                                DIP { DIG 1; DROP };
                                DUG 1;
                                DROP };
                         CDR;
                         IF_NONE
                           { PUSH string "NoneValue";
                             FAILWITH }
                           {  };
                         NONE address;
                         PUSH nat 0;
                         PAIR;
                         DIG 3;
                         DUP;
                         DUG 4;
                         ITER { PUSH nat 2;
                                DIG 2;
                                DUP;
                                DUG 3;
                                CAR;
                                COMPARE;
                                EQ;
                                IF
                                  { DUP;
                                    SOME;
                                    PUSH nat 1;
                                    DIG 3;
                                    DUP;
                                    DUG 4;
                                    CAR;
                                    ADD;
                                    PAIR }
                                  { DIG 1;
                                    DUP;
                                    DUG 2;
                                    CDR;
                                    PUSH nat 1;
                                    DIG 3;
                                    DUP;
                                    DUG 4;
                                    CAR;
                                    ADD;
                                    PAIR };
                                DIP { DIG 1; DROP };
                                DUG 1;
                                DROP };
                         CDR;
                         IF_NONE
                           { PUSH string "NoneValue";
                             FAILWITH }
                           {  };
                         DIG 8;
                         DUP;
                         DUG 9;
                         PUSH nat 2;
                         PUSH int 1;
                         PAIR;
                         PAIR;
                         UNPAIR;
                         UNPAIR;
                         ABS;
                         DIG 2;
                         MUL;
                         EDIV;
                         IF_NONE
                           { PUSH string "DivByZero";
                             FAILWITH }
                           {  };
                         CAR;
                         DIG 9;
                         DUP;
                         DUG 10;
                         PUSH nat 10;
                         PUSH int 3;
                         PAIR;
                         PAIR;
                         UNPAIR;
                         UNPAIR;
                         ABS;
                         DIG 2;
                         MUL;
                         EDIV;
                         IF_NONE
                           { PUSH string "DivByZero";
                             FAILWITH }
                           {  };
                         CAR;
                         DIG 10;
                         DUP;
                         DUG 11;
                         PUSH nat 5;
                         PUSH int 1;
                         PAIR;
                         PAIR;
                         UNPAIR;
                         UNPAIR;
                         ABS;
                         DIG 2;
                         MUL;
                         EDIV;
                         IF_NONE
                           { PUSH string "DivByZero";
                             FAILWITH }
                           {  };
                         CAR;
                         DIG 13;
                         DUP;
                         DUG 14;
                         DIG 6;
                         DUP;
                         DUG 7;
                         CONTRACT unit;
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         DIG 4;
                         DUP;
                         DUG 5;
                         UNIT;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 13; DROP };
                         DUG 13;
                         DIG 13;
                         DUP;
                         DUG 14;
                         DIG 5;
                         DUP;
                         DUG 6;
                         CONTRACT unit;
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         DIG 3;
                         DUP;
                         DUG 4;
                         UNIT;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 13; DROP };
                         DUG 13;
                         DIG 13;
                         DUP;
                         DUG 14;
                         DIG 4;
                         DUP;
                         DUG 5;
                         CONTRACT unit;
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         DIG 2;
                         DUP;
                         DUG 3;
                         UNIT;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 13; DROP };
                         DUG 13;
                         DIG 13;
                         DUP;
                         DUG 14;
                         DIG 13;
                         DUP;
                         DUG 14;
                         CONTRACT unit;
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         DIG 2;
                         DUP;
                         DUG 3;
                         DIG 4;
                         DUP;
                         DUG 5;
                         DIG 6;
                         DUP;
                         DUG 7;
                         DIG 16;
                         DUP;
                         DUG 17;
                         SUB;
                         SUB;
                         SUB;
                         UNIT;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 13; DROP };
                         DUG 13;
                         DROP 6 }
                       { PUSH nat 2;
                         DIG 1;
                         DUP;
                         DUG 2;
                         SIZE;
                         COMPARE;
                         GE;
                         IF
                           { NONE address;
                             PUSH nat 0;
                             PAIR;
                             DIG 1;
                             DUP;
                             DUG 2;
                             ITER { PUSH nat 0;
                                    DIG 2;
                                    DUP;
                                    DUG 3;
                                    CAR;
                                    COMPARE;
                                    EQ;
                                    IF
                                      { DUP;
                                        SOME;
                                        PUSH nat 1;
                                        DIG 3;
                                        DUP;
                                        DUG 4;
                                        CAR;
                                        ADD;
                                        PAIR }
                                      { DIG 1;
                                        DUP;
                                        DUG 2;
                                        CDR;
                                        PUSH nat 1;
                                        DIG 3;
                                        DUP;
                                        DUG 4;
                                        CAR;
                                        ADD;
                                        PAIR };
                                    DIP { DIG 1; DROP };
                                    DUG 1;
                                    DROP };
                             CDR;
                             IF_NONE
                               { PUSH string "NoneValue";
                                 FAILWITH }
                               {  };
                             NONE address;
                             PUSH nat 0;
                             PAIR;
                             DIG 2;
                             DUP;
                             DUG 3;
                             ITER { PUSH nat 1;
                                    DIG 2;
                                    DUP;
                                    DUG 3;
                                    CAR;
                                    COMPARE;
                                    EQ;
                                    IF
                                      { DUP;
                                        SOME;
                                        PUSH nat 1;
                                        DIG 3;
                                        DUP;
                                        DUG 4;
                                        CAR;
                                        ADD;
                                        PAIR }
                                      { DIG 1;
                                        DUP;
                                        DUG 2;
                                        CDR;
                                        PUSH nat 1;
                                        DIG 3;
                                        DUP;
                                        DUG 4;
                                        CAR;
                                        ADD;
                                        PAIR };
                                    DIP { DIG 1; DROP };
                                    DUG 1;
                                    DROP };
                             CDR;
                             IF_NONE
                               { PUSH string "NoneValue";
                                 FAILWITH }
                               {  };
                             DIG 7;
                             DUP;
                             DUG 8;
                             PUSH nat 5;
                             PUSH int 3;
                             PAIR;
                             PAIR;
                             UNPAIR;
                             UNPAIR;
                             ABS;
                             DIG 2;
                             MUL;
                             EDIV;
                             IF_NONE
                               { PUSH string "DivByZero";
                                 FAILWITH }
                               {  };
                             CAR;
                             DIG 8;
                             DUP;
                             DUG 9;
                             PUSH nat 5;
                             PUSH int 2;
                             PAIR;
                             PAIR;
                             UNPAIR;
                             UNPAIR;
                             ABS;
                             DIG 2;
                             MUL;
                             EDIV;
                             IF_NONE
                               { PUSH string "DivByZero";
                                 FAILWITH }
                               {  };
                             CAR;
                             DIG 11;
                             DUP;
                             DUG 12;
                             DIG 4;
                             DUP;
                             DUG 5;
                             CONTRACT unit;
                             IF_NONE
                               { PUSH string "BadContract";
                                 FAILWITH }
                               {  };
                             DIG 3;
                             DUP;
                             DUG 4;
                             UNIT;
                             TRANSFER_TOKENS;
                             CONS;
                             DIP { DIG 11; DROP };
                             DUG 11;
                             DIG 11;
                             DUP;
                             DUG 12;
                             DIG 3;
                             DUP;
                             DUG 4;
                             CONTRACT unit;
                             IF_NONE
                               { PUSH string "BadContract";
                                 FAILWITH }
                               {  };
                             DIG 2;
                             DUP;
                             DUG 3;
                             UNIT;
                             TRANSFER_TOKENS;
                             CONS;
                             DIP { DIG 11; DROP };
                             DUG 11;
                             DIG 11;
                             DUP;
                             DUG 12;
                             DIG 11;
                             DUP;
                             DUG 12;
                             CONTRACT unit;
                             IF_NONE
                               { PUSH string "BadContract";
                                 FAILWITH }
                               {  };
                             DIG 2;
                             DUP;
                             DUG 3;
                             DIG 4;
                             DUP;
                             DUG 5;
                             DIG 13;
                             DUP;
                             DUG 14;
                             SUB;
                             SUB;
                             UNIT;
                             TRANSFER_TOKENS;
                             CONS;
                             DIP { DIG 11; DROP };
                             DUG 11;
                             DROP 4 }
                           { PUSH nat 1;
                             DIG 1;
                             DUP;
                             DUG 2;
                             SIZE;
                             COMPARE;
                             GE;
                             IF
                               { NONE address;
                                 PUSH nat 0;
                                 PAIR;
                                 DIG 1;
                                 DUP;
                                 DUG 2;
                                 ITER { PUSH nat 0;
                                        DIG 2;
                                        DUP;
                                        DUG 3;
                                        CAR;
                                        COMPARE;
                                        EQ;
                                        IF
                                          { DUP;
                                            SOME;
                                            PUSH nat 1;
                                            DIG 3;
                                            DUP;
                                            DUG 4;
                                            CAR;
                                            ADD;
                                            PAIR }
                                          { DIG 1;
                                            DUP;
                                            DUG 2;
                                            CDR;
                                            PUSH nat 1;
                                            DIG 3;
                                            DUP;
                                            DUG 4;
                                            CAR;
                                            ADD;
                                            PAIR };
                                        DIP { DIG 1; DROP };
                                        DUG 1;
                                        DROP };
                                 CDR;
                                 IF_NONE
                                   { PUSH string "NoneValue";
                                     FAILWITH }
                                   {  };
                                 DIG 8;
                                 DUP;
                                 DUG 9;
                                 DIG 1;
                                 DUP;
                                 DUG 2;
                                 CONTRACT unit;
                                 IF_NONE
                                   { PUSH string "BadContract";
                                     FAILWITH }
                                   {  };
                                 DIG 8;
                                 DUP;
                                 DUG 9;
                                 UNIT;
                                 TRANSFER_TOKENS;
                                 CONS;
                                 DIP { DIG 8; DROP };
                                 DUG 8;
                                 DROP }
                               { DIG 7;
                                 DUP;
                                 DUG 8;
                                 DIG 7;
                                 DUP;
                                 DUG 8;
                                 CONTRACT unit;
                                 IF_NONE
                                   { PUSH string "BadContract";
                                     FAILWITH }
                                   {  };
                                 DIG 7;
                                 DUP;
                                 DUG 8;
                                 UNIT;
                                 TRANSFER_TOKENS;
                                 CONS;
                                 DIP { DIG 7; DROP };
                                 DUG 7 } } };
                     DROP;
                     PUSH nat 2;
                     DIP { DIG 2; DROP };
                     DUG 2 }
                   { PUSH string "InvalidState";
                     FAILWITH };
                 DROP;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 DIG 1;
                 PAIR } } };
}
```

</TabItem>

</Tabs>
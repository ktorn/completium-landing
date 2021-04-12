---
id: template8
title: Idea box
sidebar_label: Idea box
slug: /templates/ideabox
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

This contract is a process to propose ideas and to select the best ones. You can see this contract in action in the <Link to='/docs/dapp-ideabox/'>Idea Box</Link> DApp example.
## API

### Storage

Ideas data (title and description) are stored as `bytes`.

| Name | Type | Description |
| -- | -- | -- |
| `chairman` | `address` | Address of the box's chairman |
| `maxvotes` | `nat` | Maximum number of votes per voter. |
| `idea` | `collection` | An idea is defined by:<ul><li>an identifier (key)</li><li>a title</li><li>a description</li><li>a number of votes</li><li>a creation date</li><li>the author's address</li></ul>
| `voter` | `collection` | A voter is defined by:<ul><li>an address (key)</li><li>a number of remaining votes</li></ul>
| `selected` | `collecter` | This is the collection of selected ideas. |
| `_state` | `states` | Box state, one of `Activated`, `Terminated`. |

### Entrypoints

| Name | Parameters | Description |
| -- | -- | -- |
| `register` | `a` | Called by `chairman` to register a new voter at address `a` and remaining votes at `maxvotes`. |
| `add_idea` | `ititle`, `description` | Adds an idea in the box if box not terminated (*anyone* can add an idea). |
| `vote` | `n`, `weight` | Called by a voter to increment by `weight` the number of votes of idea `n`. It fails if box is terminated. |
| `terminate` | | Called by `chairman` to close the box and select the top 3 best ideas with numbers of votes above `maxvotes`. |

## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="archetype">

```archetype title="ideabox.arl"
archetype ideasbox(chairman : address, maxvotes : nat)

states =
| Activated initial
| Terminated

asset idea {
  id       : nat;
  title    : bytes;
  desc     : bytes;
  nbvotes  : nat = 0;
  creation : date;
  author   : address;
}

asset voter {
  addr      : address;
  remaining : nat = maxvotes;
}

asset selected {
  sid : nat;
}

entry register (a_voter : address) {
  called by chairman
  require {
    r0 : state = Activated;
  }
  effect { voter.add({ addr = a_voter }) }
}

entry add_idea(ititle : bytes, description : bytes) {
  require {
    r1 : state = Activated;
  }
  effect {
    idea.add({
			id = idea.count();
      title = ititle;
			desc = description;
			creation = now;
			author = caller
		})
  }
}

entry vote(n : nat, weight : nat) {
  require {
    r2 : voter.contains(caller);
    r3 : voter[caller].remaining >= weight;
    r4 : state = Activated;
  }
  effect {
    voter[caller].remaining -= weight;
    idea[n].nbvotes += weight;
  }
}

transition terminate () {
  called by chairman
  from Activated
  to Terminated
  with effect {
    for i in idea.select(the.nbvotes > maxvotes).sort(desc(nbvotes)).head(3) do
        selected.add({i})
    done
  }
}
```

</TabItem>

<TabItem value="michelson">

```js
# (Pair chairman (Pair maxvotes (Pair 0 (Pair {  } (Pair {  } {  })))))
{
  storage (pair (address %chairman) (pair (nat %maxvotes) (pair (nat %_state) (pair (map %idea nat (pair (bytes %title) (pair (bytes %desc) (pair (nat %nbvotes) (pair (timestamp %creation) (address %author)))))) (pair (map %voter address nat) (set %selected nat))))));
  parameter (or (address %register) (or (pair %add_idea (bytes %ititle) (bytes %description)) (or (pair %vote (nat %n) (nat %weight)) (unit %terminate))));
  code { UNPAIR;
         DIP { UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP };
         IF_LEFT
           { DIG 6;
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
             PUSH nat 0;
             DIG 5;
             DUP;
             DUG 6;
             COMPARE;
             EQ;
             NOT;
             IF
               { PUSH string "InvalidCondition: r0";
                 FAILWITH }
               {  };
             DIG 2;
             DUP;
             DUG 3;
             DIG 1;
             DUP;
             DUG 2;
             MEM;
             IF
               { PUSH string "KeyAlreadyExists";
                 FAILWITH }
               { DIG 2;
                 DUP;
                 DUG 3;
                 DIG 6;
                 DUP;
                 DUG 7;
                 SOME;
                 DIG 2;
                 DUP;
                 DUG 3;
                 UPDATE;
                 DIP { DIG 2; DROP };
                 DUG 2 };
             DROP;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             NIL operation;
             PAIR }
           { IF_LEFT
               { UNPAIR;
                 SWAP;
                 PUSH nat 0;
                 DIG 6;
                 DUP;
                 DUG 7;
                 COMPARE;
                 EQ;
                 NOT;
                 IF
                   { PUSH string "InvalidCondition: r1";
                     FAILWITH }
                   {  };
                 DIG 4;
                 DUP;
                 DUG 5;
                 DIG 5;
                 DUP;
                 DUG 6;
                 SIZE;
                 MEM;
                 IF
                   { PUSH string "KeyAlreadyExists";
                     FAILWITH }
                   { DIG 4;
                     DUP;
                     DUG 5;
                     SENDER;
                     NOW;
                     PAIR;
                     PUSH nat 0;
                     PAIR;
                     DIG 2;
                     DUP;
                     DUG 3;
                     PAIR;
                     DIG 3;
                     DUP;
                     DUG 4;
                     PAIR;
                     SOME;
                     DIG 6;
                     DUP;
                     DUG 7;
                     SIZE;
                     UPDATE;
                     DIP { DIG 4; DROP };
                     DUG 4 };
                 DROP 2;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 NIL operation;
                 PAIR }
               { IF_LEFT
                   { UNPAIR;
                     SWAP;
                     DIG 3;
                     DUP;
                     DUG 4;
                     SENDER;
                     MEM;
                     NOT;
                     IF
                       { PUSH string "InvalidCondition: r2";
                         FAILWITH }
                       {  };
                     DUP;
                     DIG 4;
                     DUP;
                     DUG 5;
                     SENDER;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     COMPARE;
                     GE;
                     NOT;
                     IF
                       { PUSH string "InvalidCondition: r3";
                         FAILWITH }
                       {  };
                     PUSH nat 0;
                     DIG 6;
                     DUP;
                     DUG 7;
                     COMPARE;
                     EQ;
                     NOT;
                     IF
                       { PUSH string "InvalidCondition: r4";
                         FAILWITH }
                       {  };
                     DIG 3;
                     DUP;
                     DUG 4;
                     SENDER;
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
                     SENDER;
                     UPDATE;
                     DIP { DIG 4; DROP };
                     DUG 4;
                     DROP;
                     DIG 4;
                     DUP;
                     DUG 5;
                     DIG 2;
                     DUP;
                     DUG 3;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     DIG 5;
                     DUP;
                     DUG 6;
                     DIG 6;
                     DUP;
                     DUG 7;
                     DIG 4;
                     DUP;
                     DUG 5;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     UNPAIR;
                     SWAP;
                     UNPAIR;
                     SWAP;
                     UNPAIR;
                     DROP;
                     DIG 5;
                     DUP;
                     DUG 6;
                     DIG 5;
                     DUP;
                     DUG 6;
                     CDR;
                     CDR;
                     CAR;
                     ADD;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SOME;
                     DIG 4;
                     DUP;
                     DUG 5;
                     UPDATE;
                     DIP { DIG 5; DROP };
                     DUG 5;
                     DROP 3;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     NIL operation;
                     PAIR }
                   { DROP;
                     DIG 5;
                     DUP;
                     DUG 6;
                     SENDER;
                     COMPARE;
                     EQ;
                     NOT;
                     IF
                       { PUSH string "InvalidCaller";
                         FAILWITH }
                       {  };
                     DIG 3;
                     DUP;
                     DUG 4;
                     DUP;
                     PUSH nat 0;
                     COMPARE;
                     EQ;
                     IF
                       { NIL nat;
                         NIL nat;
                         PUSH nat 0;
                         PAIR;
                         NIL nat;
                         NIL nat;
                         NIL nat;
                         DIG 8;
                         DUP;
                         DUG 9;
                         ITER { UNPAIR;
                                DIG 12;
                                DUP;
                                DUG 13;
                                DIG 2;
                                DUP;
                                DUG 3;
                                CDR;
                                CDR;
                                CAR;
                                COMPARE;
                                GT;
                                IF
                                  { DIG 2;
                                    DUP;
                                    DUG 3;
                                    DIG 1;
                                    DUP;
                                    DUG 2;
                                    CONS }
                                  { DIG 2;
                                    DUP;
                                    DUG 3 };
                                DIP { DIG 2; DROP };
                                DUG 2;
                                DROP 2 };
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
                                NIL nat;
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
                                           CDR;
                                           CAR;
                                           DIG 1;
                                           DUP;
                                           DUG 2;
                                           CDR;
                                           CDR;
                                           CAR;
                                           COMPARE;
                                           LT;
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
                                               NONE nat;
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
                                NIL nat;
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
                         ITER { PUSH nat 3;
                                DIG 2;
                                DUP;
                                DUG 3;
                                CAR;
                                COMPARE;
                                LT;
                                IF
                                  { DIG 1;
                                    DUP;
                                    DUG 2;
                                    CDR;
                                    DIG 1;
                                    DUP;
                                    DUG 2;
                                    CONS;
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
                         ITER { DIG 2;
                                DUP;
                                DUG 3;
                                DIG 1;
                                DUP;
                                DUG 2;
                                MEM;
                                IF
                                  { PUSH string "KeyAlreadyExists";
                                    FAILWITH }
                                  { DIG 2;
                                    DUP;
                                    DUG 3;
                                    PUSH bool True;
                                    DIG 2;
                                    DUP;
                                    DUG 3;
                                    UPDATE;
                                    DIP { DIG 2; DROP };
                                    DUG 2 };
                                DROP };
                         PUSH nat 1;
                         DIP { DIG 4; DROP };
                         DUG 4 }
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
                     SWAP;
                     PAIR;
                     NIL operation;
                     PAIR } } } };
}
```

</TabItem>


<TabItem value="specification">

```archetype
specification entry vote (n : nat, weight : nat) {
  postcondition p1 {
    let some v = voter[caller] in
    let some bv = before.voter[caller] in
      v.remaining = bv.remaining - weight
    otherwise true otherwise true
  }
}

specification {
  i1 : 5 * voter.count() = idea.sum(nbvotes) + voter.sum(remaining)
}
```

</TabItem>

</Tabs>
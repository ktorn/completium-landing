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

```

</TabItem>

</Tabs>
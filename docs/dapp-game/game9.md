---
id: game9
title: Implementation
sidebar_label: Implementation
slug: /dapp-game/implementation
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

## Submit

```archetype
entry submit (packed_score : bytes, signed_score : signature) {
  require {
    c1 : state = InProgress;
  }

  effect {
    if check_signature(oracle, signed_score, packed_score) then (
      match_option unpack<address * nat>(packed_score) with
      | some(s) ->
        if (s[0] <> caller) then fail ("bad caller");
        submission.addupdate(caller, {
          score = s[1];
          timestamp = now
        })
      | none -> fail("cannot unpack score")
      end
    ) else fail("not signed by oracle");
  }
}
```

## Decide

```archetype
transition decide () {
  called by organizer
  from InProgress
  to Done
  with effect {
    var submissions = submission.sort(desc(score), timestamp);
      if submissions.count() >= 3
      then (
        var first  = submissions.nth(0);
        var second = submissions.nth(1);
        var third  = submissions.nth(2);
        var q1 = 0.5 * prize;
        var q2 = 0.3 * prize;
        var q3 = 0.2 * prize;
        transfer q1 to first;
        transfer q2 to second;
        transfer q3 to third;
        transfer (prize - q1 - q2 - q3) to organizer)
        else if (submissions.count() >= 2)
             then (
               var first  = submissions.nth(0);
               var second = submissions.nth(1);
               var q1 = 0.6 * prize;
               var q2 = 0.4 * prize;
               transfer q1 to first;
               transfer q2 to second;
               transfer (prize - q1 - q2) to organizer)
             else if (submissions.count() >= 1)
               then (
                 var first = submissions.nth(0);
                 transfer prize to first)
               else transfer prize to organizer
  }
}
```
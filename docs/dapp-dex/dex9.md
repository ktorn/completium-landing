---
id: dex9
title: Implementation
sidebar_label: Implementation
slug: /dapp-dex/implementation
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';


## Add/Remove token

```archetype
entry registertoken (i : string, a : address, n : string, u : string) {
  called by admin
  effect {
    token.addupdate(i, { addr = a; name = n; iconurl = u }); }
}
```

```archetype
entry deletetoken (i : string) {
  called by admin
  effect { token.remove(i) }
}
```

## Exchange

```archetype
function compute_exchanged(aA : nat, qA : nat, qB : nat) : rational {
  return (qB * gamma * aA / (qA + gamma * aA))
}
```

```archetype {6,19,31}
entry exchange(tA : string, aA: nat, tB : string, aB : nat) {
  require {
    r0 otherwise "SRC_EQ_DST" : tA <> tB;
  }
  effect {
    if tA = "XTZ" then begin
      var qA = token[tB].poolvalue;
      var qB = token[tB].totalqty;
      var expectedB = compute_exchanged(aA,qA,qB);
      if (abs(expectedB - aB) > epsilon) then fail(("INVALID_B_AMOUNT",expectedB));
      var xtzin : nat = transferred;
      if aA <> xtzin then fail(("INVALID_A_AMOUNT",xtzin));
      match entrypoint<(address * address * nat)>("%transfer",token[tB].addr) with
      | some(transferB) ->
        transfer 0tz to entry transferB((selfaddress, caller, aB))
      | none -> fail("INVALID_B_ENTRY")
      end;
      token.update(tB, { poolvalue += xtzin; totalqty -= aB });
    end else if tB = "XTZ" then begin
      var qA = token[tA].totalqty;
      var qB = token[tA].poolvalue;
      var expectedB = compute_exchanged(aA,qA,qB);
      if (abs(expectedB - aB) > epsilon) then fail(("INVALID_B_AMOUNT",expectedB));
      match entrypoint<(address * address * nat)>("%transfer",token[tA].addr) with
      | some(transferA) ->
        transfer 0tz to entry transferA((caller, selfaddress, aA))
      | none -> fail("INVALID_A_ENTRY")
      end;
      transfer (aB * 1utz) to caller;
      token.update(tA, { poolvalue -= aB; totalqty += aA });
    end else begin
      var qA  = token[tA].totalqty;
      var qTA = token[tA].poolvalue;
      var aT  = abs(floor(compute_exchanged(aA,qA,qTA)));
      var qTB = token[tB].poolvalue;
      var qB  = token[tB].totalqty;
      var expectedB = compute_exchanged(aT,qTB,qB);
      if (abs(expectedB - aB) > epsilon) then fail(("INVALID_B_AMOUNT",expectedB));
      match entrypoint<(address * address * nat)>("%transfer",token[tA].addr) with
      | some(transferA) ->
        transfer 0tz to entry transferA((caller, selfaddress, aA))
      | none -> fail("INVALID_A_ENTRY")
      end;
      match entrypoint<(address * address * nat)>("%transfer",token[tB].addr) with
      | some(transferA) ->
        transfer 0tz to entry transferA((selfaddress, caller, aB))
      | none -> fail("INVALID_B_ENTRY")
      end;
      token.update(tA, { poolvalue -= aT; totalqty += aA });
      token.update(tB, { poolvalue += aT; totalqty -= aB });
    end
  }
}
```

## Add liquidity

```archetype
entry addLiquidity(tL : string, qL : nat) {
  match entrypoint<(address * address * nat)>("%transfer",token[tL].addr) with
   | some(transfer_src) ->
     transfer 0tz to entry transfer_src((caller, selfaddress, qL))
   | none -> fail("INVALID_DST_ENTRY")
  end;
  /* mint LQT tokens */
  var xtzin : nat = transferred;
  var mintedLTQ =
    if token[tL].poolvalue = 0 then initialminted
    else abs(floor(token[tL].totallqt * xtzin / token[tL].poolvalue));
  liquidity.addupdate((tL, caller), { lqt += mintedLTQ });
  token.update(tL, { poolvalue += xtzin; totalqty += qL; totallqt += mintedLTQ })
}
```

## Remove liquidity

```archetype
entry removeLiquidity(qL : nat, tA : string) {
  require {
    r1 otherwise "NOT_ENOUGHT_LQT": qL <= liquidity[(tA, caller)].lqt
  }
  effect {
    var lqtratio = qL / token[tA].totallqt;
    var xtzout = abs(floor(lqtratio * token[tA].poolvalue));
    transfer (xtzout * 1utz) to caller;
    match entrypoint<(address * address * nat)>("%transfer",token[tA].addr) with
    | some(transfer_src) ->
      var qty = abs(floor(lqtratio * token[tA].totalqty));
      transfer 0tz to entry transfer_src((selfaddress, caller, qty));
      liquidity.addupdate((tA, caller), { lqt -= qL });
      token.update(tA, { poolvalue -= xtzout; totalqty -= qty; totallqt -= qL })
    | none -> fail("INVALID_DST_ENTRY")
    end;
  }
}
```
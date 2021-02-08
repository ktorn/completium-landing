---
id: nonfungible9
title: Implementation
sidebar_label: Implementation
slug: /dapp-nonfungible/implementation
---

import DappIcon from '../DappIcon';
import DappFigure from '../DappFigure';
import DappButton from '../DappButton';

## Update operators

```archetype
entry update_operators (upl : list<or<operator_param, operator_param>>) {
  for up in upl do
    match_or up with
    | left(param)  -> // add
      dorequire(ledger[param.opp_token_id].lowner = source, "CALLER NOT OWNER");
      operator.addupdate((param.opp_operator, param.opp_token_id, param.opp_owner), {})
    | right(param) -> // remove
      dorequire(ledger[param.opp_token_id].lowner = source, "CALLER NOT OWNER");
      operator.remove((param.opp_operator, param.opp_token_id, param.opp_owner))
    end;
  done;
}
```

## Transfer

```archetype
entry %transfer (txs : list<address * list<transfer_destination>>) {
  for tx in txs do
    var %from = tx[0];
    var tds = tx[1];
    for td in tds do begin
      if caller <> %from then begin
        // check operator
        dorequire(operator.contains((caller,td.token_id_dest,%from)),"FA2_NOT_OPERATOR");
      end;
      // set token ownership
      ledger.addupdate(td.token_id_dest,{ lowner = td.to_dest });
    end done;
  done
}
```

## Get balance

```archetype
getter balance_of (requests : list<balance_of_request>) : list<balance_of_response> {
  return map(requests, br -> {
    request = br;
    balance_ = (if ledger[br.btoken_id].lowner = br.bo_owner
                then 1
                else 0)
  })
}
```

## Buy

```archetype
entry buy (tokenids : list<nat>) {
  var total = 0;
  for tokenid in tokenids do begin
    var price = token[tokenid].tprice;
    var owner = ledger[tokenid].lowner;
    transfer price to owner;
    /* transfer ownership */
    transfer 0tz to entry self.%transfer([(owner,[{
      to_dest = caller;
      token_id_dest = tokenid;
      token_amount_dest = 1
    }])]);
    /* reset permission */
    transfer 0tz to entry self.update_operators([right<operator_param>({
        opp_owner = owner;
        opp_operator = selfaddress;
        opp_token_id = tokenid
      })]);
    total += price;
  end done;
  dorequire(transferred >= total, "INSUFFICIENT_TRANSFERRED");
  operations := reverse(operations);
}
```

## Sell

```archetype
entry sell (tokenid : nat) {
  transfer 0tz to entry self.update_operators([left<operator_param>({
    opp_owner = caller;
    opp_operator = selfaddress;
    opp_token_id = tokenid
  })])
}
```
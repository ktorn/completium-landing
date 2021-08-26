(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[3989],{807:function(e,n,t){"use strict";t(7294),t(4996)},7985:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return i},contentTitle:function(){return l},metadata:function(){return d},toc:function(){return s},default:function(){return c}});var r=t(2122),o=t(9756),a=(t(7294),t(3905)),p=(t(807),t(7134),t(3079),["components"]),i={id:"nonfungible9",title:"Implementation",sidebar_label:"Implementation",slug:"/dapp-nonfungible/implementation"},l=void 0,d={unversionedId:"dapp-nonfungible/nonfungible9",id:"dapp-nonfungible/nonfungible9",isDocsHomePage:!1,title:"Implementation",description:"Update operators",source:"@site/docs/dapp-nonfungible/nonfungible9.md",sourceDirName:"dapp-nonfungible",slug:"/dapp-nonfungible/implementation",permalink:"/docs/dapp-nonfungible/implementation",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-nonfungible/nonfungible9.md",version:"current",frontMatter:{id:"nonfungible9",title:"Implementation",sidebar_label:"Implementation",slug:"/dapp-nonfungible/implementation"}},s=[{value:"Update operators",id:"update-operators",children:[]},{value:"Transfer",id:"transfer",children:[]},{value:"Get balance",id:"get-balance",children:[]},{value:"Buy",id:"buy",children:[]},{value:"Sell",id:"sell",children:[]}],u={toc:s};function c(e){var n=e.components,t=(0,o.Z)(e,p);return(0,a.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"update-operators"},"Update operators"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-archetype"},'entry update_operators (upl : list<or<operator_param, operator_param>>) {\n  for up in upl do\n    match_or up with\n    | left(param)  -> // add\n      dorequire(ledger[param.opp_token_id].lowner = source, "CALLER NOT OWNER");\n      operator.addupdate((param.opp_operator, param.opp_token_id, param.opp_owner), {})\n    | right(param) -> // remove\n      dorequire(ledger[param.opp_token_id].lowner = source, "CALLER NOT OWNER");\n      operator.remove((param.opp_operator, param.opp_token_id, param.opp_owner))\n    end;\n  done;\n}\n')),(0,a.kt)("h2",{id:"transfer"},"Transfer"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-archetype"},'entry %transfer (txs : list<address * list<transfer_destination>>) {\n  for tx in txs do\n    var %from = tx[0];\n    var tds = tx[1];\n    for td in tds do begin\n      if caller <> %from then begin\n        // check operator\n        dorequire(operator.contains((caller,td.token_id_dest,%from)),"FA2_NOT_OPERATOR");\n      end;\n      // set token ownership\n      ledger.addupdate(td.token_id_dest,{ lowner = td.to_dest });\n    end done;\n  done\n}\n')),(0,a.kt)("h2",{id:"get-balance"},"Get balance"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-archetype"},"getter balance_of (requests : list<balance_of_request>) : list<balance_of_response> {\n  return map(requests, br -> {\n    request = br;\n    balance_ = (if ledger[br.btoken_id].lowner = br.bo_owner\n                then 1\n                else 0)\n  })\n}\n")),(0,a.kt)("h2",{id:"buy"},"Buy"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-archetype"},'entry buy (tokenids : list<nat>) {\n  var total = 0;\n  for tokenid in tokenids do begin\n    var price = token[tokenid].tprice;\n    var owner = ledger[tokenid].lowner;\n    transfer price to owner;\n    /* transfer ownership */\n    transfer 0tz to entry self.%transfer([(owner,[{\n      to_dest = caller;\n      token_id_dest = tokenid;\n      token_amount_dest = 1\n    }])]);\n    /* reset permission */\n    transfer 0tz to entry self.update_operators([right<operator_param>({\n        opp_owner = owner;\n        opp_operator = selfaddress;\n        opp_token_id = tokenid\n      })]);\n    total += price;\n  end done;\n  dorequire(transferred >= total, "INSUFFICIENT_TRANSFERRED");\n  operations := reverse(operations);\n}\n')),(0,a.kt)("h2",{id:"sell"},"Sell"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-archetype"},"entry sell (tokenid : nat) {\n  transfer 0tz to entry self.update_operators([left<operator_param>({\n    opp_owner = caller;\n    opp_operator = selfaddress;\n    opp_token_id = tokenid\n  })])\n}\n")))}c.isMDXComponent=!0}}]);
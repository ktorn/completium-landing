(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{108:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return p})),t.d(n,"metadata",(function(){return d})),t.d(n,"toc",(function(){return i})),t.d(n,"default",(function(){return s}));var r=t(3),o=t(7),a=(t(0),t(227)),p=(t(229),t(230),t(231),{id:"nonfungible9",title:"Implementation",sidebar_label:"Implementation",slug:"/dapp-nonfungible/implementation"}),d={unversionedId:"dapp-nonfungible/nonfungible9",id:"dapp-nonfungible/nonfungible9",isDocsHomePage:!1,title:"Implementation",description:"Update operators",source:"@site/docs/dapp-nonfungible/nonfungible9.md",slug:"/dapp-nonfungible/implementation",permalink:"/docs/dapp-nonfungible/implementation",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-nonfungible/nonfungible9.md",version:"current",sidebar_label:"Implementation"},i=[{value:"Update operators",id:"update-operators",children:[]},{value:"Transfer",id:"transfer",children:[]},{value:"Get balance",id:"get-balance",children:[]},{value:"Buy",id:"buy",children:[]},{value:"Sell",id:"sell",children:[]}],l={toc:i};function s(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"update-operators"},"Update operators"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-archetype"}),'entry update_operators (upl : list<or<operator_param, operator_param>>) {\n  for up in upl do\n    match_or up with\n    | left(param)  -> // add\n      dorequire(ledger[param.opp_token_id].lowner = source, "CALLER NOT OWNER");\n      operator.addupdate((param.opp_operator, param.opp_token_id, param.opp_owner), {})\n    | right(param) -> // remove\n      dorequire(ledger[param.opp_token_id].lowner = source, "CALLER NOT OWNER");\n      operator.remove((param.opp_operator, param.opp_token_id, param.opp_owner))\n    end;\n  done;\n}\n')),Object(a.b)("h2",{id:"transfer"},"Transfer"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-archetype"}),'entry %transfer (txs : list<address * list<transfer_destination>>) {\n  for tx in txs do\n    var %from = tx[0];\n    var tds = tx[1];\n    for td in tds do begin\n      if caller <> %from then begin\n        // check operator\n        dorequire(operator.contains((caller,td.token_id_dest,%from)),"FA2_NOT_OPERATOR");\n      end;\n      // set token ownership\n      ledger.addupdate(td.token_id_dest,{ lowner = td.to_dest });\n    end done;\n  done\n}\n')),Object(a.b)("h2",{id:"get-balance"},"Get balance"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-archetype"}),"getter balance_of (requests : list<balance_of_request>) : list<balance_of_response> {\n  return map(requests, br -> {\n    request = br;\n    balance_ = (if ledger[br.btoken_id].lowner = br.bo_owner\n                then 1\n                else 0)\n  })\n}\n")),Object(a.b)("h2",{id:"buy"},"Buy"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-archetype"}),'entry buy (tokenids : list<nat>) {\n  var total = 0;\n  for tokenid in tokenids do begin\n    var price = token[tokenid].tprice;\n    var owner = ledger[tokenid].lowner;\n    transfer price to owner;\n    /* transfer ownership */\n    transfer 0tz to entry self.%transfer([(owner,[{\n      to_dest = caller;\n      token_id_dest = tokenid;\n      token_amount_dest = 1\n    }])]);\n    /* reset permission */\n    transfer 0tz to entry self.update_operators([right<operator_param>({\n        opp_owner = owner;\n        opp_operator = selfaddress;\n        opp_token_id = tokenid\n      })]);\n    total += price;\n  end done;\n  dorequire(transferred >= total, "INSUFFICIENT_TRANSFERRED");\n  operations := reverse(operations);\n}\n')),Object(a.b)("h2",{id:"sell"},"Sell"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-archetype"}),"entry sell (tokenid : nat) {\n  transfer 0tz to entry self.update_operators([left<operator_param>({\n    opp_owner = caller;\n    opp_operator = selfaddress;\n    opp_token_id = tokenid\n  })])\n}\n")))}s.isMDXComponent=!0},229:function(e,n,t){"use strict";t(0),t(233)}}]);
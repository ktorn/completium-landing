(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{119:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return b})),n.d(t,"metadata",(function(){return d})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return m}));var a=n(3),r=n(7),o=(n(0),n(224)),l=n(225),i=n(245),c=n(246),b={id:"template3",title:"FA 2",sidebar_label:"FA 2",slug:"/templates/nft"},d={unversionedId:"templates/template3",id:"templates/template3",isDocsHomePage:!1,title:"FA 2",description:"Introduction",source:"@site/docs/templates/template3.md",slug:"/templates/nft",permalink:"/docs/templates/nft",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/templates/template3.md",version:"current",sidebar_label:"FA 2",sidebar:"templates",previous:{title:"ERC20",permalink:"/docs/templates/erc20"},next:{title:"DEX",permalink:"/docs/templates/dex"}},s=[{value:"Introduction",id:"introduction",children:[]},{value:"API",id:"api",children:[{value:"Storage",id:"storage",children:[]},{value:"Entrypoints",id:"entrypoints",children:[]}]},{value:"Code",id:"code",children:[]}],p={toc:s};function m(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"introduction"},"Introduction"),Object(o.b)("p",null,"This contract follows the Financial Asset 2 (FA 2) ",Object(o.b)("a",{href:"https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-12/tzip-12.md"},"TZIP 12")," specification for non-fungible token on Tezos."),Object(o.b)("p",null,"It is a simple implementation of the FA 2 norm, to buy and sell NFTs at fixed price. It could easily be enhanced with a bid-based process for ownership transfer."),Object(o.b)("p",null,"You can observe the contract in action in the ",Object(o.b)(l.a,{to:"/docs/dapp-nonfungible/",mdxType:"Link"},"Collectible cards")," DApp example."),Object(o.b)("h2",{id:"api"},"API"),Object(o.b)("p",null,"FA 2 introduces the concept of ",Object(o.b)("em",{parentName:"p"},"operator"),", which is an account that can transfer a token on behalf of the owner. The delegation is done by the owner with the ",Object(o.b)("inlineCode",{parentName:"p"},"update_operators")," entrypoint."),Object(o.b)("h3",{id:"storage"},"Storage"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"token")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"collection")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Token data, like price.")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"ledger")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"collection")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Association between token id and its owner.")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"operator")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"collection")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Delegation data: which operator can transfer which token owned by which owner?")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"token_metadata")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"collection")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Token metadata.")))),Object(o.b)("h3",{id:"entrypoints"},"Entrypoints"),Object(o.b)("p",null,"On top of the one specified by the FA 2 norm, this contract provides 2 extra entrypoints on top: ",Object(o.b)("inlineCode",{parentName:"p"},"buy")," and ",Object(o.b)("inlineCode",{parentName:"p"},"sell"),"."),Object(o.b)("p",null,"These 2 entrypoints make the contract itself be the NFT operator: ",Object(o.b)("inlineCode",{parentName:"p"},"sell")," declares the contract as the token operator, and ",Object(o.b)("inlineCode",{parentName:"p"},"buy")," asks the contract to transfer the required token(s) to the ",Object(o.b)("em",{parentName:"p"},"caller"),"."),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Parameters"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"update_operators")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"upl")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"upl")," is a list of delegation data (named ",Object(o.b)("inlineCode",{parentName:"td"},"operator_param")," with token, owner and operator), either to add or remove an operator to a token and owner. It fails if the ",Object(o.b)("em",{parentName:"td"},"caller")," is not the declared owner in ",Object(o.b)("inlineCode",{parentName:"td"},"upl"),".")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"transfer")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"txs")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Transfers token ownerships specified in ",Object(o.b)("inlineCode",{parentName:"td"},"txs"),", a list of ",Object(o.b)("inlineCode",{parentName:"td"},"transfer_param")," (from, to, token). If ",Object(o.b)("em",{parentName:"td"},"caller")," is not the token owner, it must be declared in ",Object(o.b)("inlineCode",{parentName:"td"},"operator")," to be able to transfer, otherwise it fails.")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"balance_of")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"requests")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Returns the list a token balance for each token id in ",Object(o.b)("inlineCode",{parentName:"td"},"requests"),".")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"buy")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"tokenids")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Internall calls ",Object(o.b)("inlineCode",{parentName:"td"},"transfer")," to transfer ownership of ",Object(o.b)("inlineCode",{parentName:"td"},"tokenids")," tokens to ",Object(o.b)("em",{parentName:"td"},"caller"),". Token price is transferred to token owner. It fails if a token is not up for sale, that is if a token has not been delegated to the contract by ",Object(o.b)("inlineCode",{parentName:"td"},"sell"),". It also fails if the transferred amount does not exceed the sum of purchased tokens.")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"sell")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"tokenid")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Declares the contract as the operator of the token ",Object(o.b)("inlineCode",{parentName:"td"},"tokenid"),"; it internally calls the ",Object(o.b)("inlineCode",{parentName:"td"},"update_operators")," with ",Object(o.b)("inlineCode",{parentName:"td"},"selfaddress")," as operator address. As a result, the token ",Object(o.b)("inlineCode",{parentName:"td"},"tokenid")," is up for sale (transfer).")))),Object(o.b)("h2",{id:"code"},"Code"),Object(o.b)("p",null,"Deploy the contract from ",Object(o.b)("a",{href:"https://archetype-lang.org/"},"Archetype")," code below with the following ",Object(o.b)(l.a,{to:"/docs/cli",mdxType:"Link"},"Completium CLI")," example command:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"completium-cli deploy nft.arl\n")),Object(o.b)("p",null,"In order to initialise the ",Object(o.b)("inlineCode",{parentName:"p"},"token")," and ",Object(o.b)("inlineCode",{parentName:"p"},"ledger")," collections, edit the code below with ",Object(o.b)("inlineCode",{parentName:"p"},"initialized by")," instructions; for example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype",metastring:"{4-14}","{4-14}":!0}),"asset token {\n  tid        : nat;\n  tprice     : tez;\n} initialized by {\n  { 973012;  1.3tz };\n  { 973013;  2.2tz };\n  { 973014;  1.4tz };\n  { 973015;  3.4tz };\n  { 973016;  2.8tz };\n  { 973017;  1.0tz };\n  { 973018;  2.4tz };\n  { 973019;  4.1tz };\n  { 973020; 12.4tz };\n}\n")),Object(o.b)(i.a,{defaultValue:"archetype",values:[{label:"Archetype",value:"archetype"},{label:"Michelson",value:"michelson"}],mdxType:"Tabs"},Object(o.b)(c.a,{value:"archetype",mdxType:"TabItem"},Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype"}),'archetype nft\n\n(* STORAGE --------------------------------------------------------------------*)\n\nasset token {\n  tid        : nat;\n  tprice     : tez;\n}\n\nasset ledger identified by ltoken {\n  ltoken     : nat;\n  lowner     : address;\n}\n\nasset operator identified by oaddr otoken oowner {\n  oaddr       : address;\n  otoken      : nat;\n  oowner      : address;\n}\n\nasset token_metadata to big_map {\n  key_token_id   : nat;\n  token_id       : nat;\n  symbol         : string;\n  name           : string;\n  decimals       : nat;\n  extras         : map<string, string>;\n}\n\n(* FA2 INTERFACE -------------------------------------------------------------*)\n\nrecord operator_param {\n  opp_owner    : address;\n  opp_operator : address;\n  opp_token_id : nat\n} as ((owner, (operator, token_id)))\n\nentry update_operators (upl : list<or<operator_param, operator_param>>) {\n  for up in upl do\n    match up with\n    | left(param)  -> (* add *)\n      dorequire(ledger[param.opp_token_id].lowner = source, "CALLER NOT OWNER");\n      operator.addupdate((param.opp_operator, param.opp_token_id, param.opp_owner), {})\n    | right(param) -> (* remove *)\n      dorequire(ledger[param.opp_token_id].lowner = source, "CALLER NOT OWNER");\n      operator.remove((param.opp_operator, param.opp_token_id, param.opp_owner))\n    end;\n  done;\n}\n\nrecord transfer_destination {\n  to_dest           : address;\n  token_id_dest     : nat;\n  token_amount_dest : nat\n} as ((to_, (token_id, amount)))\n\nentry %transfer (txs : list<address * list<transfer_destination>>) {\n  for tx in txs do\n    var %from = tx[0];\n    var tds = tx[1];\n    for td in tds do begin\n      if caller <> %from then begin\n        (* check operator *)\n        dorequire(operator.contains((caller,td.token_id_dest,%from)),"FA2_NOT_OPERATOR");\n      end;\n      (* set token ownership *)\n      ledger.addupdate(td.token_id_dest,{ lowner = td.to_dest });\n    end done;\n  done\n}\n\nrecord balance_of_request {\n  bo_owner : address;\n  btoken_id : nat;\n} as ((owner, token_id))\n\nrecord balance_of_response {\n  request : balance_of_request;\n  balance_ : nat;\n} as ((request, balance))\n\ngetter balance_of (requests : list<balance_of_request>) : list<balance_of_response> {\n  return map(requests, br -> {\n    request = br;\n    balance_ = (if ledger[br.btoken_id].lowner = br.bo_owner\n                then 1\n                else 0)\n  })\n}\n\nentry token_metadata_registry (c : contract<address>) {\n  transfer 0tz to entry c(selfaddress);\n}\n\n(* TOKEN EXCHANGE INTERFACE ---------------------------------------------------*)\n\nentry buy (tokenids : list<nat>) {\n  var total = 0;\n  for tokenid in tokenids do begin\n    var price = token[tokenid].tprice;\n    var owner = ledger[tokenid].lowner;\n    transfer price to owner;\n    (* transfer ownership *)\n    transfer 0tz to entry self.%transfer([(owner,[{\n      to_dest = caller;\n      token_id_dest = tokenid;\n      token_amount_dest = 1\n    }])]);\n    (* reset permission *)\n    transfer 0tz to entry self.update_operators([right<operator_param>({\n        opp_owner = owner;\n        opp_operator = selfaddress;\n        opp_token_id = tokenid\n      })]);\n    total += price;\n  end done;\n  dorequire(transferred >= total, "INSUFFICIENT_TRANSFERRED");\n  operations := reverse(operations);\n}\n\nentry sell (tokenid : nat) {\n  transfer 0tz to entry self.update_operators([left<operator_param>({\n    opp_owner = caller;\n    opp_operator = selfaddress;\n    opp_token_id = tokenid\n  })])\n}\n'))),Object(o.b)(c.a,{value:"michelson",mdxType:"TabItem"},Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"")))))}m.isMDXComponent=!0},233:function(e,t,n){"use strict";function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}t.a=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}},242:function(e,t,n){"use strict";var a=n(0),r=n(243);t.a=function(){const e=Object(a.useContext)(r.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},243:function(e,t,n){"use strict";var a=n(0);const r=Object(a.createContext)(void 0);t.a=r},245:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(242),l=n(233),i=n(56),c=n.n(i);const b=37,d=39;t.a=function(e){const{lazy:t,block:n,defaultValue:i,values:s,groupId:p,className:m}=e,{tabGroupChoices:u,setTabGroupChoices:O}=Object(o.a)(),[j,f]=Object(a.useState)(i),h=a.Children.toArray(e.children);if(null!=p){const e=u[p];null!=e&&e!==j&&s.some((t=>t.value===e))&&f(e)}const N=e=>{f(e),null!=p&&O(p,e)},_=[];return r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(l.a)("tabs",{"tabs--block":n},m)},s.map((({value:e,label:t})=>r.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":j===e,className:Object(l.a)("tabs__item",c.a.tabItem,{"tabs__item--active":j===e}),key:e,ref:e=>_.push(e),onKeyDown:e=>{((e,t,n)=>{switch(n.keyCode){case d:((e,t)=>{const n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()})(e,t);break;case b:((e,t)=>{const n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()})(e,t)}})(_,e.target,e)},onFocus:()=>N(e),onClick:()=>{N(e)}},t)))),t?Object(a.cloneElement)(h.filter((e=>e.props.value===j))[0],{className:"margin-vert--md"}):r.a.createElement("div",{className:"margin-vert--md"},h.map(((e,t)=>Object(a.cloneElement)(e,{key:t,hidden:e.props.value!==j})))))}},246:function(e,t,n){"use strict";var a=n(3),r=n(0),o=n.n(r);t.a=function({children:e,hidden:t,className:n}){return o.a.createElement("div",Object(a.a)({role:"tabpanel"},{hidden:t,className:n}),e)}}}]);
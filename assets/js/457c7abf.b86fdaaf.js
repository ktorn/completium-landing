(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[1335],{8215:function(n,e,t){"use strict";var a=t(7294);e.Z=function(n){var e=n.children,t=n.hidden,r=n.className;return a.createElement("div",{role:"tabpanel",hidden:t,className:r},e)}},5064:function(n,e,t){"use strict";t.d(e,{Z:function(){return c}});var a=t(7294),r=t(9443);var o=function(){var n=(0,a.useContext)(r.Z);if(null==n)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return n},i=t(6010),l="tabItem_1uMI",d="tabItemActive_2DSg";var s=37,p=39;var c=function(n){var e=n.lazy,t=n.block,r=n.defaultValue,c=n.values,m=n.groupId,u=n.className,D=o(),k=D.tabGroupChoices,P=D.setTabGroupChoices,I=(0,a.useState)(r),N=I[0],f=I[1],g=a.Children.toArray(n.children),h=[];if(null!=m){var _=k[m];null!=_&&_!==N&&c.some((function(n){return n.value===_}))&&f(_)}var b=function(n){var e=n.currentTarget,t=h.indexOf(e),a=c[t].value;f(a),null!=m&&(P(m,a),setTimeout((function(){var n,t,a,r,o,i,l,s;(n=e.getBoundingClientRect(),t=n.top,a=n.left,r=n.bottom,o=n.right,i=window,l=i.innerHeight,s=i.innerWidth,t>=0&&o<=s&&r<=l&&a>=0)||(e.scrollIntoView({block:"center",behavior:"smooth"}),e.classList.add(d),setTimeout((function(){return e.classList.remove(d)}),2e3))}),150))},R=function(n){var e,t;switch(n.keyCode){case p:var a=h.indexOf(n.target)+1;t=h[a]||h[0];break;case s:var r=h.indexOf(n.target)-1;t=h[r]||h[h.length-1]}null==(e=t)||e.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":t},u)},c.map((function(n){var e=n.value,t=n.label;return a.createElement("li",{role:"tab",tabIndex:N===e?0:-1,"aria-selected":N===e,className:(0,i.Z)("tabs__item",l,{"tabs__item--active":N===e}),key:e,ref:function(n){return h.push(n)},onKeyDown:R,onFocus:b,onClick:b},t)}))),e?(0,a.cloneElement)(g.filter((function(n){return n.props.value===N}))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},g.map((function(n,e){return(0,a.cloneElement)(n,{key:e,hidden:n.props.value!==N})}))))}},9443:function(n,e,t){"use strict";var a=(0,t(7294).createContext)(void 0);e.Z=a},3836:function(n,e,t){"use strict";t.r(e),t.d(e,{frontMatter:function(){return p},contentTitle:function(){return c},metadata:function(){return m},toc:function(){return u},default:function(){return k}});var a=t(2122),r=t(9756),o=(t(7294),t(3905)),i=t(6742),l=t(5064),d=t(8215),s=["components"],p={id:"template3",title:"FA 2",sidebar_label:"FA 2",slug:"/templates/nft"},c=void 0,m={unversionedId:"templates/template3",id:"templates/template3",isDocsHomePage:!1,title:"FA 2",description:"Introduction",source:"@site/docs/templates/template3.md",sourceDirName:"templates",slug:"/templates/nft",permalink:"/docs/templates/nft",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/templates/template3.md",version:"current",frontMatter:{id:"template3",title:"FA 2",sidebar_label:"FA 2",slug:"/templates/nft"},sidebar:"templates",previous:{title:"ERC20",permalink:"/docs/templates/erc20"},next:{title:"Zero-Coupon bond",permalink:"/docs/templates/zcb"}},u=[{value:"Introduction",id:"introduction",children:[]},{value:"API",id:"api",children:[{value:"Storage",id:"storage",children:[]},{value:"Entrypoints",id:"entrypoints",children:[]}]},{value:"Originate",id:"originate",children:[]},{value:"Code",id:"code",children:[]}],D={toc:u};function k(n){var e=n.components,t=(0,r.Z)(n,s);return(0,o.kt)("wrapper",(0,a.Z)({},D,t,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,"This contract follows the Financial Asset 2 (FA 2) ",(0,o.kt)("a",{href:"https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-12/tzip-12.md"},"TZIP 12")," specification for non-fungible token on Tezos."),(0,o.kt)("p",null,"You can observe the contract in action in the ",(0,o.kt)(i.Z,{to:"/docs/dapp-nonfungible/",mdxType:"Link"},"Collectible cards")," DApp example."),(0,o.kt)("p",null,"A ",(0,o.kt)(i.Z,{to:"/docs/templates/auction",mdxType:"Link"},"contract template")," is available to transfer ownership of a FA 2 NFT based on an auction process."),(0,o.kt)("h2",{id:"api"},"API"),(0,o.kt)("p",null,"FA 2 introduces the concept of ",(0,o.kt)("em",{parentName:"p"},"operator"),", which is an account that can transfer a token on behalf of the owner. The delegation is done by the owner with the ",(0,o.kt)("inlineCode",{parentName:"p"},"update_operators")," entrypoint."),(0,o.kt)("h3",{id:"storage"},"Storage"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Name"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"token")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"collection")),(0,o.kt)("td",{parentName:"tr",align:null},"Token data, like price.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"ledger")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"collection")),(0,o.kt)("td",{parentName:"tr",align:null},"Association between token id and its owner.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"operator")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"collection")),(0,o.kt)("td",{parentName:"tr",align:null},"Delegation data: which operator can transfer which token owned by which owner?")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"token_metadata")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"collection")),(0,o.kt)("td",{parentName:"tr",align:null},"Token metadata.")))),(0,o.kt)("h3",{id:"entrypoints"},"Entrypoints"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Name"),(0,o.kt)("th",{parentName:"tr",align:null},"Parameters"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"update_operators")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"upl")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"upl")," is a list of delegation data (named ",(0,o.kt)("inlineCode",{parentName:"td"},"operator_param")," with token, owner and operator), either to add or remove an operator to a token and owner. It fails if the ",(0,o.kt)("em",{parentName:"td"},"caller")," is not the declared owner in ",(0,o.kt)("inlineCode",{parentName:"td"},"upl"),".")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"transfer")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"txs")),(0,o.kt)("td",{parentName:"tr",align:null},"Transfers token ownerships specified in ",(0,o.kt)("inlineCode",{parentName:"td"},"txs"),", a list of ",(0,o.kt)("inlineCode",{parentName:"td"},"transfer_param")," (from, to, token). If ",(0,o.kt)("em",{parentName:"td"},"caller")," is not the token owner, it must be declared in ",(0,o.kt)("inlineCode",{parentName:"td"},"operator")," to be able to transfer, otherwise it fails.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"balance_of")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"requests")),(0,o.kt)("td",{parentName:"tr",align:null},"Returns the list a token balance for each token id in ",(0,o.kt)("inlineCode",{parentName:"td"},"requests"),".")))),(0,o.kt)("h2",{id:"originate"},"Originate"),(0,o.kt)("p",null,"Deploy the contract from ",(0,o.kt)("a",{href:"https://archetype-lang.org/"},"Archetype")," code below with the following ",(0,o.kt)(i.Z,{to:"/docs/cli",mdxType:"Link"},"Completium CLI")," example command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"completium-cli deploy nft.arl\n")),(0,o.kt)("h2",{id:"code"},"Code"),(0,o.kt)(l.Z,{defaultValue:"archetype",values:[{label:"Archetype",value:"archetype"},{label:"Michelson",value:"michelson"}],mdxType:"Tabs"},(0,o.kt)(d.Z,{value:"archetype",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-archetype",metastring:'title="nft.arl"',title:'"nft.arl"'},'archetype nft\n\nasset ledger identified by ltoken to big_map {\n  ltoken     : nat;\n  lowner     : address;\n}\n\nasset operator identified by oaddr otoken oowner {\n  oaddr       : address;\n  otoken      : nat;\n  oowner      : address;\n}\n\nasset token_metadata to big_map {\n  key_token_id   : nat;\n  token_id       : nat;\n  symbol         : string;\n  name           : string;\n  decimals       : nat;\n  extras         : map<string, string>;\n}\n\nrecord operator_param {\n  opp_owner    : address;\n  opp_operator : address;\n  opp_token_id : nat\n} as ((owner, (operator, token_id)))\n\nentry update_operators (upl : list<or<operator_param, operator_param>>) {\n  for up in upl do\n    match up with\n    | left(param)  -> (* add *)\n      dorequire(ledger[param.opp_token_id].lowner = source, "CALLER NOT OWNER");\n      operator.add({param.opp_operator; param.opp_token_id; param.opp_owner})\n    | right(param) -> (* remove *)\n      dorequire(ledger[param.opp_token_id].lowner = source, "CALLER NOT OWNER");\n      operator.remove((param.opp_operator, param.opp_token_id, param.opp_owner))\n    end;\n  done;\n}\n\nrecord transfer_destination {\n  to_dest           : address;\n  token_id_dest     : nat;\n  token_amount_dest : nat\n} as ((to_, (token_id, amount)))\n\nentry %transfer (txs : list<address * list<transfer_destination>>) {\n  for tx in txs do\n    var %from = tx[0];\n    var tds = tx[1];\n    for td in tds do begin\n      if caller <> %from then begin\n        (* check operator *)\n        dorequire(operator.contains((caller,td.token_id_dest,%from)),"FA2_NOT_OPERATOR");\n      end;\n      (* set token ownership *)\n      ledger.addupdate(td.token_id_dest,{ lowner = td.to_dest });\n    end done;\n  done\n}\n\nrecord balance_of_request {\n  bo_owner : address;\n  btoken_id : nat;\n} as ((owner, token_id))\n\nrecord balance_of_response {\n  request : balance_of_request;\n  balance_ : nat;\n} as ((request, balance))\n\ngetter balance_of (requests : list<balance_of_request>) : list<balance_of_response> {\n  return map(requests, br -> {\n    request = br;\n    balance_ = (if ledger[br.btoken_id].lowner = br.bo_owner\n                then 1\n                else 0)\n  })\n}\n\nentry token_metadata_registry (c : contract<address>) {\n  transfer 0tz to entry c(selfaddress);\n}\n'))),(0,o.kt)(d.Z,{value:"michelson",mdxType:"TabItem"},(0,o.kt)("p",null,"The ",(0,o.kt)(i.Z,{to:"/docs/contract/programming-language#micheslon",mdxType:"Link"},"Michelson")," code is generated with version 1.2.3 of Archetype."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'# (Pair {  } (Pair {  } {  }))\n{\n  storage (pair (big_map %ledger nat address) (pair (set %operator (pair address (pair nat address))) (big_map %token_metadata nat (pair (nat %token_id) (pair (string %symbol) (pair (string %name) (pair (nat %decimals) (map %extras string string))))))));\n  parameter (or (pair %balance_of (list %requests (pair (address %owner) (nat %token_id))) (contract (list (pair (pair (address %owner) (nat %token_id)) (nat %balance))))) (or (list %update_operators (or (pair (address %owner) (pair (address %operator) (nat %token_id))) (pair (address %owner) (pair (address %operator) (nat %token_id))))) (or (list %transfer (pair address (list (pair (address %to_) (pair (nat %token_id) (nat %amount)))))) (contract %token_metadata_registry address))));\n  code { NIL operation;\n         DIG 1;\n         UNPAIR;\n         DIP { UNPAIR; SWAP; UNPAIR; SWAP };\n         IF_LEFT\n           { UNPAIR;\n             DIG 5;\n             DUP;\n             DUG 6;\n             DIG 2;\n             DUP;\n             DUG 3;\n             AMOUNT;\n             DIG 3;\n             DUP;\n             DUG 4;\n             MAP { DUP;\n                   CAR;\n                   DIG 9;\n                   DUP;\n                   DUG 10;\n                   DIG 2;\n                   DUP;\n                   DUG 3;\n                   CDR;\n                   GET;\n                   IF_NONE\n                     { PUSH string "GetNoneValue";\n                       FAILWITH }\n                     {  };\n                   COMPARE;\n                   EQ;\n                   IF\n                     { PUSH nat 1 }\n                     { PUSH nat 0 };\n                   DIG 1;\n                   DUP;\n                   DUG 2;\n                   PAIR;\n                   SWAP;\n                   DROP };\n             TRANSFER_TOKENS;\n             CONS;\n             DIP { DIG 5; DROP };\n             DUG 5;\n             DROP 2;\n             SWAP;\n             PAIR;\n             SWAP;\n             PAIR;\n             DIG 1;\n             PAIR }\n           { IF_LEFT\n               { DUP;\n                 ITER { DUP;\n                        IF_LEFT\n                          { SOURCE;\n                            DIG 6;\n                            DUP;\n                            DUG 7;\n                            DIG 2;\n                            DUP;\n                            DUG 3;\n                            CDR;\n                            CDR;\n                            GET;\n                            IF_NONE\n                              { PUSH string "GetNoneValue";\n                                FAILWITH }\n                              {  };\n                            COMPARE;\n                            EQ;\n                            NOT;\n                            IF\n                              { PUSH string "CALLER NOT OWNER";\n                                FAILWITH }\n                              {  };\n                            DIG 4;\n                            DUP;\n                            DUG 5;\n                            DIG 1;\n                            DUP;\n                            DUG 2;\n                            CAR;\n                            DIG 2;\n                            DUP;\n                            DUG 3;\n                            CDR;\n                            CDR;\n                            PAIR;\n                            DIG 2;\n                            DUP;\n                            DUG 3;\n                            CDR;\n                            CAR;\n                            PAIR;\n                            MEM;\n                            IF\n                              { PUSH string "KeyAlreadyExists";\n                                FAILWITH }\n                              { DIG 4;\n                                DUP;\n                                DUG 5;\n                                PUSH bool True;\n                                DIG 2;\n                                DUP;\n                                DUG 3;\n                                CAR;\n                                DIG 3;\n                                DUP;\n                                DUG 4;\n                                CDR;\n                                CDR;\n                                PAIR;\n                                DIG 3;\n                                DUP;\n                                DUG 4;\n                                CDR;\n                                CAR;\n                                PAIR;\n                                UPDATE;\n                                DIP { DIG 4; DROP };\n                                DUG 4 };\n                            DROP }\n                          { SOURCE;\n                            DIG 6;\n                            DUP;\n                            DUG 7;\n                            DIG 2;\n                            DUP;\n                            DUG 3;\n                            CDR;\n                            CDR;\n                            GET;\n                            IF_NONE\n                              { PUSH string "GetNoneValue";\n                                FAILWITH }\n                              {  };\n                            COMPARE;\n                            EQ;\n                            NOT;\n                            IF\n                              { PUSH string "CALLER NOT OWNER";\n                                FAILWITH }\n                              {  };\n                            DIG 4;\n                            DUP;\n                            DUG 5;\n                            PUSH bool False;\n                            DIG 2;\n                            DUP;\n                            DUG 3;\n                            CAR;\n                            DIG 3;\n                            DUP;\n                            DUG 4;\n                            CDR;\n                            CDR;\n                            PAIR;\n                            DIG 3;\n                            DUP;\n                            DUG 4;\n                            CDR;\n                            CAR;\n                            PAIR;\n                            UPDATE;\n                            DIP { DIG 4; DROP };\n                            DUG 4;\n                            DROP };\n                        DROP };\n                 DROP;\n                 SWAP;\n                 PAIR;\n                 SWAP;\n                 PAIR;\n                 DIG 1;\n                 PAIR }\n               { IF_LEFT\n                   { DUP;\n                     ITER { DUP;\n                            CAR;\n                            DIG 1;\n                            DUP;\n                            DUG 2;\n                            CDR;\n                            DUP;\n                            ITER { DIG 2;\n                                   DUP;\n                                   DUG 3;\n                                   SENDER;\n                                   COMPARE;\n                                   NEQ;\n                                   IF\n                                     { DIG 6;\n                                       DUP;\n                                       DUG 7;\n                                       DIG 3;\n                                       DUP;\n                                       DUG 4;\n                                       DIG 2;\n                                       DUP;\n                                       DUG 3;\n                                       CDR;\n                                       CAR;\n                                       PAIR;\n                                       SENDER;\n                                       PAIR;\n                                       MEM;\n                                       NOT;\n                                       IF\n                                         { PUSH string "FA2_NOT_OPERATOR";\n                                           FAILWITH }\n                                         {  } }\n                                     {  };\n                                   DIG 7;\n                                   DUP;\n                                   DUG 8;\n                                   DIG 1;\n                                   DUP;\n                                   DUG 2;\n                                   CAR;\n                                   SOME;\n                                   DIG 2;\n                                   DUP;\n                                   DUG 3;\n                                   CDR;\n                                   CAR;\n                                   UPDATE;\n                                   DIP { DIG 7; DROP };\n                                   DUG 7;\n                                   DROP };\n                            DROP 3 };\n                     DROP;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     DIG 1;\n                     PAIR }\n                   { DIG 4;\n                     DUP;\n                     DUG 5;\n                     DIG 1;\n                     DUP;\n                     DUG 2;\n                     PUSH mutez 0;\n                     SELF;\n                     ADDRESS;\n                     TRANSFER_TOKENS;\n                     CONS;\n                     DIP { DIG 4; DROP };\n                     DUG 4;\n                     DROP;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     DIG 1;\n                     PAIR } } } };\n}\n')))))}k.isMDXComponent=!0},6010:function(n,e,t){"use strict";function a(n){var e,t,r="";if("string"==typeof n||"number"==typeof n)r+=n;else if("object"==typeof n)if(Array.isArray(n))for(e=0;e<n.length;e++)n[e]&&(t=a(n[e]))&&(r&&(r+=" "),r+=t);else for(e in n)n[e]&&(r&&(r+=" "),r+=e);return r}function r(){for(var n,e,t=0,r="";t<arguments.length;)(n=arguments[t++])&&(e=a(n))&&(r&&(r+=" "),r+=e);return r}t.d(e,{Z:function(){return r}})}}]);
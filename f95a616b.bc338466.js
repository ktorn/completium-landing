(window.webpackJsonp=window.webpackJsonp||[]).push([[149],{217:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return d})),t.d(n,"metadata",(function(){return o})),t.d(n,"toc",(function(){return s})),t.d(n,"default",(function(){return O}));var a=t(3),r=t(7),i=(t(0),t(227)),b=t(228),l=t(242),c=t(243),d={id:"template6",title:"Zero-Coupon bond",sidebar_label:"Zero-Coupon bond",slug:"/templates/zcb"},o={unversionedId:"templates/template6",id:"templates/template6",isDocsHomePage:!1,title:"Zero-Coupon bond",description:"Introduction",source:"@site/docs/templates/template6.md",slug:"/templates/zcb",permalink:"/docs/templates/zcb",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/templates/template6.md",version:"current",sidebar_label:"Zero-Coupon bond",sidebar:"templates",previous:{title:"FA 2",permalink:"/docs/templates/nft"},next:{title:"DEX",permalink:"/docs/templates/dex"}},s=[{value:"Introduction",id:"introduction",children:[]},{value:"API",id:"api",children:[{value:"Storage",id:"storage",children:[]},{value:"Entrypoints",id:"entrypoints",children:[]}]},{value:"Code",id:"code",children:[]}],u={toc:s};function O(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},u,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"introduction"},"Introduction"),Object(i.b)("p",null,"A ",Object(i.b)("a",{href:"https://en.wikipedia.org/wiki/Zero-coupon_bond",target:"_blank"},"Zero-Coupon")," bond is a bond in which the face value is repaid some predefined time after it has been released (maturity time)."),Object(i.b)("p",null,"In this contract, the present value of the bond (value at which the bond is traded) is computed as the face value (value at which the bond is redeemed at maturity time) minus a discount percent of face value."),Object(i.b)("p",null,"A detailed presentation of the process is available in the ",Object(i.b)(b.a,{to:"/docs/dapp-zcb/",mdxType:"Link"},"Zero-Coupon Bond")," DApp example."),Object(i.b)("h2",{id:"api"},"API"),Object(i.b)("h3",{id:"storage"},"Storage"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"issuer")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"address")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Bond issuer's address.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"subscriber")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"address")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Bond subscriber's address.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"facevalue")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"tez")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Value at which the bond is redeemed at maturity time.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"discout")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"rational")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Discount applied to ",Object(i.b)("inlineCode",{parentName:"td"},"facevalue")," to compute present value (at emission)")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"maturityduration")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"duration")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Duration before maturity time.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"paybackduration")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"duration")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Duration of payback period after maturity date")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"issuersigned")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"bool")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"true")," is issuer has signed, ",Object(i.b)("inlineCode",{parentName:"td"},"false")," otherwise.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"subscribersigned")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"bool")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"true")," is subscriber has signed, ",Object(i.b)("inlineCode",{parentName:"td"},"false")," otherwise.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"_state")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"states")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"One of ",Object(i.b)("inlineCode",{parentName:"td"},"Created"),", ",Object(i.b)("inlineCode",{parentName:"td"},"Signed"),", ",Object(i.b)("inlineCode",{parentName:"td"},"Terminated"),", ",Object(i.b)("inlineCode",{parentName:"td"},"Disputed"))))),Object(i.b)("h3",{id:"entrypoints"},"Entrypoints"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Parameters"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"toSigned")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null})),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Called by ",Object(i.b)("inlineCode",{parentName:"td"},"sign")," to set contract's state to ",Object(i.b)("inlineCode",{parentName:"td"},"Signed"),".")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"sign")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null})),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Called by ",Object(i.b)("inlineCode",{parentName:"td"},"issuer")," or ",Object(i.b)("inlineCode",{parentName:"td"},"subscriber"),". ",Object(i.b)("inlineCode",{parentName:"td"},"subscriber")," must transfer the present value to the contract.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"terminate")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null})),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Called by ",Object(i.b)("inlineCode",{parentName:"td"},"issuer")," during payback period, to transfer the face value to ",Object(i.b)("inlineCode",{parentName:"td"},"subscriber"),".")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"dispute")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null})),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Called by ",Object(i.b)("inlineCode",{parentName:"td"},"subscriber")," if ",Object(i.b)("inlineCode",{parentName:"td"},"issuer")," has not terminated the contract in the payback period.")))),Object(i.b)("h2",{id:"code"},"Code"),Object(i.b)(l.a,{defaultValue:"archetype",values:[{label:"Archetype",value:"archetype"},{label:"Michelson",value:"michelson"}],mdxType:"Tabs"},Object(i.b)(c.a,{value:"archetype",mdxType:"TabItem"},Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype",metastring:'title="zcb.arl"',title:'"zcb.arl"'}),'archetype zero_coupon_bond (\n  issuer : role,\n  subscriber : role,\n  facevalue : tez,\n  discount : rational,\n  maturityduration : duration,\n  paybackduration  : duration,\n  issuersigned : bool,\n  subscribersigned : bool\n)\n\nvariable signaturedate    : option<date> = none\n\nstates =\n  | Created initial\n  | Signed\n  | Terminated\n  | Disputed\n\ntransition toSigned() {\n  called by selfaddress\n  from Created to Signed with effect {\n    signaturedate := some(now)\n  }\n}\n\nentry sign () {\n  if caller = issuer then\n    issuersigned := true\n  else if caller = subscriber then begin\n    subscribersigned := true;\n    var presentvalue = discount * facevalue;\n    dorequire(transferred >= presentvalue, "SUBSCRIBER_INVALID_TRANSFERRED");\n    transfer presentvalue to issuer;\n  end\n  else fail("CALLER_NOT_A_SIGNER");\n  if issuersigned and subscribersigned then\n    transfer 0tz to entry self.toSigned();\n}\n\ntransition terminate () {\n  called by issuer\n  from Signed to Terminated when {\n    match signaturedate with\n    | some(d) ->\n      d + maturityduration <=  now <= d + maturityduration + paybackduration and\n      transferred >= facevalue\n    | none -> false\n    end\n  } with effect {\n    transfer facevalue to subscriber\n  }\n}\n\ntransition dispute () {\n  called by subscriber\n  from Signed to Disputed when {\n    match signaturedate with\n    | some(d) ->\n      d + maturityduration + paybackduration <=  now\n    | none -> false\n    end\n  }\n}\n'))),Object(i.b)(c.a,{value:"michelson",mdxType:"TabItem"},Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'# (Pair issuer (Pair subscriber (Pair facevalue (Pair discount (Pair maturityduration (Pair paybackduration (Pair issuersigned (Pair subscribersigned (Pair None 0)))))))))\n{\n  storage (pair (address %issuer) (pair (address %subscriber) (pair (mutez %facevalue) (pair (pair %discount int nat) (pair (int %maturityduration) (pair (int %paybackduration) (pair (bool %issuersigned) (pair (bool %subscribersigned) (pair (option %signaturedate timestamp) (nat %_state))))))))));\n  parameter (or (unit %toSigned) (or (unit %sign) (or (unit %terminate) (unit %dispute))));\n  code { NIL operation;\n         DIG 1;\n         UNPAIR;\n         DIP { UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP };\n         IF_LEFT\n           { DROP;\n             SELF;\n             ADDRESS;\n             SENDER;\n             COMPARE;\n             EQ;\n             NOT;\n             IF\n               { PUSH string "InvalidCaller";\n                 FAILWITH }\n               {  };\n             DUP;\n             DUP;\n             PUSH nat 0;\n             COMPARE;\n             EQ;\n             IF\n               { NOW;\n                 SOME;\n                 DIP { DIG 2; DROP };\n                 DUG 2;\n                 PUSH nat 1;\n                 DIP { DIG 1; DROP };\n                 DUG 1 }\n               { PUSH string "InvalidState";\n                 FAILWITH };\n             DROP;\n             SWAP;\n             PAIR;\n             SWAP;\n             PAIR;\n             SWAP;\n             PAIR;\n             SWAP;\n             PAIR;\n             SWAP;\n             PAIR;\n             SWAP;\n             PAIR;\n             SWAP;\n             PAIR;\n             SWAP;\n             PAIR;\n             SWAP;\n             PAIR;\n             DIG 1;\n             PAIR }\n           { IF_LEFT\n               { DROP;\n                 DIG 9;\n                 DUP;\n                 DUG 10;\n                 SENDER;\n                 COMPARE;\n                 EQ;\n                 IF\n                   { PUSH bool True;\n                     DIP { DIG 3; DROP };\n                     DUG 3 }\n                   { DIG 8;\n                     DUP;\n                     DUG 9;\n                     SENDER;\n                     COMPARE;\n                     EQ;\n                     IF\n                       { PUSH bool True;\n                         DIP { DIG 2; DROP };\n                         DUG 2;\n                         DIG 7;\n                         DUP;\n                         DUG 8;\n                         DIG 7;\n                         DUP;\n                         DUG 8;\n                         PAIR;\n                         UNPAIR;\n                         UNPAIR;\n                         ABS;\n                         DIG 2;\n                         MUL;\n                         EDIV;\n                         IF_NONE\n                           { PUSH string "DivByZero";\n                             FAILWITH }\n                           {  };\n                         CAR;\n                         DUP;\n                         AMOUNT;\n                         COMPARE;\n                         GE;\n                         NOT;\n                         IF\n                           { PUSH string "SUBSCRIBER_INVALID_TRANSFERRED";\n                             FAILWITH }\n                           {  };\n                         DIG 11;\n                         DUP;\n                         DUG 12;\n                         DIG 11;\n                         DUP;\n                         DUG 12;\n                         CONTRACT unit;\n                         IF_NONE\n                           { PUSH string "BadContract";\n                             FAILWITH }\n                           {  };\n                         DIG 2;\n                         DUP;\n                         DUG 3;\n                         UNIT;\n                         TRANSFER_TOKENS;\n                         CONS;\n                         DIP { DIG 11; DROP };\n                         DUG 11;\n                         DROP }\n                       { PUSH string "CALLER_NOT_A_SIGNER";\n                         FAILWITH } };\n                 DIG 2;\n                 DUP;\n                 DUG 3;\n                 DIG 4;\n                 DUP;\n                 DUG 5;\n                 AND;\n                 IF\n                   { DIG 10;\n                     DUP;\n                     DUG 11;\n                     SELF;\n                     ADDRESS;\n                     CONTRACT %toSigned unit;\n                     IF_NONE\n                       { PUSH string "BadContract";\n                         FAILWITH }\n                       {  };\n                     PUSH mutez 0;\n                     UNIT;\n                     TRANSFER_TOKENS;\n                     CONS;\n                     DIP { DIG 10; DROP };\n                     DUG 10 }\n                   {  };\n                 SWAP;\n                 PAIR;\n                 SWAP;\n                 PAIR;\n                 SWAP;\n                 PAIR;\n                 SWAP;\n                 PAIR;\n                 SWAP;\n                 PAIR;\n                 SWAP;\n                 PAIR;\n                 SWAP;\n                 PAIR;\n                 SWAP;\n                 PAIR;\n                 SWAP;\n                 PAIR;\n                 DIG 1;\n                 PAIR }\n               { IF_LEFT\n                   { DROP;\n                     DIG 9;\n                     DUP;\n                     DUG 10;\n                     SENDER;\n                     COMPARE;\n                     EQ;\n                     NOT;\n                     IF\n                       { PUSH string "InvalidCaller";\n                         FAILWITH }\n                       {  };\n                     DUP;\n                     DUP;\n                     PUSH nat 1;\n                     COMPARE;\n                     EQ;\n                     IF\n                       { DIG 2;\n                         DUP;\n                         DUG 3;\n                         IF_NONE\n                           { PUSH bool False }\n                           { DIG 9;\n                             DUP;\n                             DUG 10;\n                             AMOUNT;\n                             COMPARE;\n                             GE;\n                             DIG 7;\n                             DUP;\n                             DUG 8;\n                             DIG 9;\n                             DUP;\n                             DUG 10;\n                             DIG 3;\n                             DUP;\n                             DUG 4;\n                             ADD;\n                             ADD;\n                             NOW;\n                             COMPARE;\n                             LE;\n                             NOW;\n                             DIG 10;\n                             DUP;\n                             DUG 11;\n                             DIG 4;\n                             DUP;\n                             DUG 5;\n                             ADD;\n                             COMPARE;\n                             LE;\n                             AND;\n                             AND;\n                             SWAP;\n                             DROP };\n                         IF\n                           { DIG 11;\n                             DUP;\n                             DUG 12;\n                             DIG 10;\n                             DUP;\n                             DUG 11;\n                             CONTRACT unit;\n                             IF_NONE\n                               { PUSH string "BadContract";\n                                 FAILWITH }\n                               {  };\n                             DIG 10;\n                             DUP;\n                             DUG 11;\n                             UNIT;\n                             TRANSFER_TOKENS;\n                             CONS;\n                             DIP { DIG 11; DROP };\n                             DUG 11;\n                             PUSH nat 2;\n                             DIP { DIG 1; DROP };\n                             DUG 1 }\n                           {  } }\n                       { PUSH string "InvalidState";\n                         FAILWITH };\n                     DROP;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     DIG 1;\n                     PAIR }\n                   { DROP;\n                     DIG 8;\n                     DUP;\n                     DUG 9;\n                     SENDER;\n                     COMPARE;\n                     EQ;\n                     NOT;\n                     IF\n                       { PUSH string "InvalidCaller";\n                         FAILWITH }\n                       {  };\n                     DUP;\n                     DUP;\n                     PUSH nat 1;\n                     COMPARE;\n                     EQ;\n                     IF\n                       { DIG 2;\n                         DUP;\n                         DUG 3;\n                         IF_NONE\n                           { PUSH bool False }\n                           { NOW;\n                             DIG 7;\n                             DUP;\n                             DUG 8;\n                             DIG 9;\n                             DUP;\n                             DUG 10;\n                             DIG 3;\n                             DUP;\n                             DUG 4;\n                             ADD;\n                             ADD;\n                             COMPARE;\n                             LE;\n                             SWAP;\n                             DROP };\n                         IF\n                           { PUSH nat 3;\n                             DIP { DIG 1; DROP };\n                             DUG 1 }\n                           {  } }\n                       { PUSH string "InvalidState";\n                         FAILWITH };\n                     DROP;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     SWAP;\n                     PAIR;\n                     DIG 1;\n                     PAIR } } } };\n}\n')))))}O.isMDXComponent=!0},234:function(e,n,t){"use strict";function a(e){var n,t,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(n=0;n<e.length;n++)e[n]&&(t=a(e[n]))&&(r&&(r+=" "),r+=t);else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}n.a=function(){for(var e,n,t=0,r="";t<arguments.length;)(e=arguments[t++])&&(n=a(e))&&(r&&(r+=" "),r+=n);return r}},240:function(e,n,t){"use strict";var a=t(0),r=t(241);n.a=function(){const e=Object(a.useContext)(r.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},241:function(e,n,t){"use strict";var a=t(0);const r=Object(a.createContext)(void 0);n.a=r},242:function(e,n,t){"use strict";var a=t(0),r=t.n(a),i=t(240),b=t(234),l=t(56),c=t.n(l);const d=37,o=39;n.a=function(e){const{lazy:n,block:t,defaultValue:l,values:s,groupId:u,className:O}=e,{tabGroupChoices:p,setTabGroupChoices:m}=Object(i.a)(),[P,j]=Object(a.useState)(l),N=a.Children.toArray(e.children);if(null!=u){const e=p[u];null!=e&&e!==P&&s.some((n=>n.value===e))&&j(e)}const D=e=>{j(e),null!=u&&m(u,e)},I=[];return r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(b.a)("tabs",{"tabs--block":t},O)},s.map((({value:e,label:n})=>r.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":P===e,className:Object(b.a)("tabs__item",c.a.tabItem,{"tabs__item--active":P===e}),key:e,ref:e=>I.push(e),onKeyDown:e=>{((e,n,t)=>{switch(t.keyCode){case o:((e,n)=>{const t=e.indexOf(n)+1;e[t]?e[t].focus():e[0].focus()})(e,n);break;case d:((e,n)=>{const t=e.indexOf(n)-1;e[t]?e[t].focus():e[e.length-1].focus()})(e,n)}})(I,e.target,e)},onFocus:()=>D(e),onClick:()=>{D(e)}},n)))),n?Object(a.cloneElement)(N.filter((e=>e.props.value===P))[0],{className:"margin-vert--md"}):r.a.createElement("div",{className:"margin-vert--md"},N.map(((e,n)=>Object(a.cloneElement)(e,{key:n,hidden:e.props.value!==P})))))}},243:function(e,n,t){"use strict";var a=t(3),r=t(0),i=t.n(r);n.a=function({children:e,hidden:n,className:t}){return i.a.createElement("div",Object(a.a)({role:"tabpanel"},{hidden:n,className:t}),e)}}}]);
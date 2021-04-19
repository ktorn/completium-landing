(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{154:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return d})),n.d(t,"toc",(function(){return r})),n.d(t,"default",(function(){return l}));var a=n(3),i=(n(0),n(235)),c=(n(237),n(238)),s=(n(239),n(236));const o={id:"game4",title:"Sign & Submit score",sidebar_label:"Sign&Submit",slug:"/dapp-game/usecase"},d={unversionedId:"dapp-game/game4",id:"dapp-game/game4",isDocsHomePage:!1,title:"Sign & Submit score",description:"Connect to wallet",source:"@site/docs/dapp-game/game4.md",slug:"/dapp-game/usecase",permalink:"/docs/dapp-game/usecase",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-game/game4.md",version:"current",sidebar_label:"Sign&Submit",sidebar:"dapps",previous:{title:"Use Case Presentation",permalink:"/docs/dapp-game/Presentation"},next:{title:"Technical guide",permalink:"/docs/dapp-game/tg-presentation"}},r=[{value:"Connect to wallet",id:"connect-to-wallet",children:[]},{value:"Sign score",id:"sign-score",children:[]},{value:"Submit score",id:"submit-score",children:[]}],p={toc:r};function l({components:e,...t}){return Object(i.b)("wrapper",Object(a.a)({},p,t,{components:e,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"connect-to-wallet"},"Connect to wallet"),Object(i.b)("p",null,'Connect to the wallet by clicking the "Connect to wallet" button:'),Object(i.b)(c.a,{img:"game-connect1.png",width:"35%",mdxType:"DappFigure"}),Object(i.b)("p",null,"Then select the user account. If you don't have a dedicated user account, go to the ",Object(i.b)(s.a,{to:"/docs/dapp-game/presentation#create-a-user-account",mdxType:"Link"},"Presentation")," page."),Object(i.b)("p",null,"Once connected, the account address and a unique game session id are displayed:"),Object(i.b)(c.a,{img:"game-connect2.png",width:"50%",mdxType:"DappFigure"}),Object(i.b)("p",null,'If the Thanos wallet is not installed (as a browser extension), then the "Install Thanos" button is displayed.'),Object(i.b)("h2",{id:"sign-score"},"Sign score"),Object(i.b)("p",null,'Click the "Compute & sign score" button.'),Object(i.b)("p",null,"The Orcale recieves the list played actions (direction keys) and the session id."),Object(i.b)("p",null,"On the Oracle side, the session id is associated to the initial board configuration. With the list of actions, the oracle is able to compute the score, sign it with its private key and send it back to the DApp's user interface."),Object(i.b)("p",null,'When received, the signed score value and actions is displayed abve the "Submit" button:'),Object(i.b)(c.a,{img:"game-send.png",width:"100%",mdxType:"DappFigure"}),Object(i.b)("h2",{id:"submit-score"},"Submit score"),Object(i.b)("p",null,"Click the submit button to send it to the smart contract. The transaction information pops up:"),Object(i.b)(c.a,{img:"game-send2.png",width:"60%",mdxType:"DappFigure"}),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json",metastring:"{11,13}","{11,13}":!0}),'[{\n    "kind":"transaction"\n    "to":"KT1WXMx4kQmDpPTCFEqgtthRuQR6udy7965k"\n    "amount":0\n    "mutez":true\n    "parameter":{\n        "entrypoint":"submit"\n        "value":{\n        "prim":"Pair"\n        "args":[{\n            "bytes":"0507070a000000160000c4ae0cdc2736e665..."\n        }{\n            "string":"edsigtn1sDfLLjeifhqWoGLyQmkpoLN9Fmf4..."\n        }]\n        }\n    }\n}]\n')),Object(i.b)("p",null,"Note that 2 arguments are passed to the ",Object(i.b)(s.a,{to:"/docs/dapp-game/interface#submit",mdxType:"Link"},"submit")," entry point:"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"encoded data"),Object(i.b)("li",{parentName:"ol"},"signed data (by the Oracle)")),Object(i.b)("p",null,"The smart contract checks that the signed data is the encoded data signed by the Oracle."))}l.isMDXComponent=!0},237:function(e,t,n){"use strict";n(0),n(242)}}]);
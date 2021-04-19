(window.webpackJsonp=window.webpackJsonp||[]).push([[131],{200:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return p})),n.d(t,"toc",(function(){return d})),n.d(t,"default",(function(){return b}));var a=n(3),c=(n(0),n(235)),o=(n(237),n(238)),i=n(239),r=n(236);const s={id:"escrow4",title:"Purchase process",sidebar_label:"Purchase process",slug:"/dapp-escrow/usecase"},p={unversionedId:"dapp-escrow/escrow4",id:"dapp-escrow/escrow4",isDocsHomePage:!1,title:"Purchase process",description:"The payment process requires a escrow contract to be originated.",source:"@site/docs/dapp-escrow/escrow4.md",slug:"/dapp-escrow/usecase",permalink:"/docs/dapp-escrow/usecase",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-escrow/escrow4.md",version:"current",sidebar_label:"Purchase process",sidebar:"dapps",previous:{title:"Use Case Presentation",permalink:"/docs/dapp-escrow/Presentation"},next:{title:"Technical guide",permalink:"/docs/dapp-escrow/tg-presentation"}},d=[{value:"Connect to wallet",id:"connect-to-wallet",children:[]},{value:"Escrow origination",id:"escrow-origination",children:[]},{value:"Fund escrow",id:"fund-escrow",children:[]},{value:"Finalize purchase",id:"finalize-purchase",children:[]}],l={toc:d};function b({components:e,...t}){return Object(c.b)("wrapper",Object(a.a)({},l,t,{components:e,mdxType:"MDXLayout"}),Object(c.b)("p",null,"The payment process requires a ",Object(c.b)("a",{href:"https://en.wikipedia.org/wiki/Escrow"},"escrow")," contract to be originated."),Object(c.b)("h2",{id:"connect-to-wallet"},"Connect to wallet"),Object(c.b)("p",null,'Connect to the wallet by clicking the "Connect to wallet" button:'),Object(c.b)(o.a,{img:"escrow-connect1.png",width:"35%",mdxType:"DappFigure"}),Object(c.b)("p",null,"Then select the user account. If you don't have a dedicated user account, go to the ",Object(c.b)(r.a,{to:"/docs/dapp-game/presentation#create-a-user-account",mdxType:"Link"},"Presentation")," page."),Object(c.b)("p",null,"Once connected, the account address is displayed in the purchase panel:"),Object(c.b)(o.a,{img:"escrow-connect2.png",width:"80%",mdxType:"DappFigure"}),Object(c.b)("p",null,'If the Thanos wallet is not installed (as a browser extension), then the "Install Thanos" button is displayed.'),Object(c.b)("h2",{id:"escrow-origination"},"Escrow origination"),Object(c.b)("p",null,"A payment contract is originated by the purchaser to start the purchase process. It supposes the seller is equipped with a contract indexer to be notified when a new purchase contract is originated."),Object(c.b)("p",null,'Click the "Create escrow" button to trigger the contract creation (aka origination):'),Object(c.b)(o.a,{img:"escrow-origination.png",width:"100%",mdxType:"DappFigure"}),Object(c.b)("p",null,"In this example, the following parameters are hardcoded in the contract:"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},"seller address"),Object(c.b)("li",{parentName:"ul"},"tax collector address"),Object(c.b)("li",{parentName:"ul"},"tax rate"),Object(c.b)("li",{parentName:"ul"},"security deposit (equal to 110% of the face value of the item)")),Object(c.b)("p",null,"The contract code is embedded in origination transaction's json parameter in the ",Object(c.b)("inlineCode",{parentName:"p"},"script")," section, split in ",Object(c.b)("inlineCode",{parentName:"p"},"code")," and ",Object(c.b)("inlineCode",{parentName:"p"},"storage")," sections."),Object(c.b)("p",null,"This json format of the ",Object(c.b)(r.a,{to:"/docs/dapp-tools/tezos#micheslon",mdxType:"Link"},"Michelson")," contract code (called ",Object(c.b)("em",{parentName:"p"},"Micheline"),") is ",Object(c.b)(r.a,{to:"/docs/dapp-escrow/compilation",mdxType:"Link"},"generated")," by the ",Object(c.b)("a",{href:"https://archetype-lang.org/"},"Archetype")," compiler."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json"}),'[\n    {\n        "kind":"origination"\n        "balance":"0"\n        "script":{\n            "code":[...]\n            "storage":{...}\n        }\n    }\n]\n')),Object(c.b)("p",null,"Once created, the new contract address is displayed and links to the ",Object(c.b)(r.a,{to:"docs/dapp-tools/bcd",mdxType:"Link"},"Better Call Dev")," indexer for inspection. For example:"),Object(c.b)(o.a,{img:"escrow-origination2.png",width:"100%",mdxType:"DappFigure"}),Object(c.b)("h2",{id:"fund-escrow"},"Fund escrow"),Object(c.b)("p",null,"The newly created escrow contract needs to be funded for the purchase query to be completed. Click the 'Fund escrow' button:"),Object(c.b)(o.a,{img:"escrow-fund.png",width:"100%",mdxType:"DappFigure"}),Object(c.b)("p",null,"The json's transaction parameter is displayed by clicking the ",Object(c.b)("inlineCode",{parentName:"p"},"Raw")," button:"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json"}),'[{\n    "kind":"transaction"\n    "to":"KT1Ta6tPZiY7299CRtEEoSByW56pz4jCc9vj"\n    "amount":195500000\n    "mutez":true\n    "parameter":{\n        "entrypoint":"fund"\n        "value":{\n            "prim":"Unit"\n        }\n    }\n}]\n')),Object(c.b)("p",null,"Note that the amount transeferred ",Object(c.b)("inlineCode",{parentName:"p"},"195500000")," is in mutez unit, which is 195.5\ua729 as expected."),Object(c.b)("p",null,"Once validated, the balance of the escrow is displayed:"),Object(c.b)(o.a,{img:"escrow-fund2.png",width:"100%",mdxType:"DappFigure"}),Object(c.b)("h2",{id:"finalize-purchase"},"Finalize purchase"),Object(c.b)("p",null,"When the escrow is funded, the seller may send the item to the buyer's address."),Object(c.b)("div",{className:"admonition admonition-info alert alert--info"},Object(c.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(c.b)("h5",{parentName:"div"},Object(c.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(c.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(c.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})))),"info")),Object(c.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(c.b)("p",{parentName:"div"},"Note that only the buyer may transfer the fund to the seller. The incentive for the buyer to do so is to get back the security deposit. This may be done when the item is received."))),Object(c.b)("p",null,"In this example, the transit process is materialized with the following popup:"),Object(c.b)(o.a,{img:"escrow-transfer.png",width:"50%",mdxType:"DappFigure"}),Object(c.b)("p",null,"Fill in the buyer address and click on 'Set Address'. When the address is set, the transit takes a about 20 seconds for the sake of the demonstration."),Object(c.b)("p",null,"When the transit is complete, you may click on the 'Transfer fund' button in order to:"),Object(c.b)("ol",null,Object(c.b)("li",{parentName:"ol"},"transfer 85\ua729 to the sellet"),Object(c.b)("li",{parentName:"ol"},"transfer back the security deposit of 85\ua729 back to you"),Object(c.b)("li",{parentName:"ol"},"transfer the tax to the tax collector")),Object(c.b)(o.a,{img:"escrow-transfer2.png",width:"100%",mdxType:"DappFigure"}),Object(c.b)("p",null,"The ",Object(c.b)(r.a,{to:"/docs/dapp-escrow/interface#complete",mdxType:"Link"},"complete")," entry point of the escrow contract is called. Below is an example of the 3 generated internal transactions as shown in ",Object(c.b)(r.a,{to:"docs/dapp-tools/bcd",mdxType:"Link"},"Better call Dev")," indexer:"),Object(c.b)(o.a,{img:"escrow-transfer3.png",width:"100%",mdxType:"DappFigure"}),Object(c.b)(i.a,{url:"https://better-call.dev/delphinet/opg/ooBNEg5t2UeoHcBkC32GgNjUVvbracxnhGvD5nmyBuL1efFgDMQ/contents",txt:"open in BCD",mdxType:"DappButton"}))}b.isMDXComponent=!0},237:function(e,t,n){"use strict";n(0),n(242)}}]);
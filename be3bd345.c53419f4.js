(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{186:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return d})),n.d(t,"toc",(function(){return b})),n.d(t,"default",(function(){return m}));var a=n(3),i=n(7),r=(n(0),n(227)),c=n(230),o=n(231),s=n(228),l={id:"miles3",title:"Create Miles",sidebar_label:"Create Miles",slug:"/dapp-miles/create-miles"},d={unversionedId:"dapp-miles/miles3",id:"dapp-miles/miles3",isDocsHomePage:!1,title:"Create Miles",description:"In order to consume miles, it is first required that the contract's admin account provides your user account with some new miles. To do so, it is necessary to invoke the add entry point of the smart contract.",source:"@site/docs/dapp-miles/miles3.md",slug:"/dapp-miles/create-miles",permalink:"/docs/dapp-miles/create-miles",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-miles/miles3.md",version:"current",sidebar_label:"Create Miles",sidebar:"dapps",previous:{title:"Use Case Presentation",permalink:"/docs/dapp-miles/usecase-presentation"},next:{title:"Consume Miles",permalink:"/docs/dapp-miles/consume-miles"}},b=[{value:"Import the smart contract&#39;s admin account",id:"import-the-smart-contracts-admin-account",children:[]},{value:"Provide you with new miles",id:"provide-you-with-new-miles",children:[{value:"<code>add</code> entry point",id:"add-entry-point",children:[]},{value:"Miles creation transaction",id:"miles-creation-transaction",children:[]}]}],p={toc:b};function m(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"In order to consume miles, it is first required that the contract's admin account provides your user account with some new miles. To do so, it is necessary to invoke the ",Object(r.b)("inlineCode",{parentName:"p"},"add")," entry point of the smart contract."),Object(r.b)("p",null,"In a real production situation, miles are created by the DApp's off-chain server which creates miles according to user activity."),Object(r.b)("p",null,"In this DApp example, the off-chain server is not provided and the creation operation is done manually by invoking the smart contract's ",Object(r.b)("inlineCode",{parentName:"p"},"add")," entry point. To do so, it is necessary to import the contract's admin account in the Thanos wallet as explained below."),Object(r.b)("h2",{id:"import-the-smart-contracts-admin-account"},"Import the smart contract's admin account"),Object(r.b)("p",null,"The process to is two-steps:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"download the admin faucet file (",Object(r.b)(s.a,{to:"/docs/dapp-tools/faucet#admin-account",mdxType:"Link"},"instructions"),")"),Object(r.b)("li",{parentName:"ol"},"import it in wallet (",Object(r.b)(s.a,{to:"/docs/dapp-tools/thanos#import-faucet-file",mdxType:"Link"},"instructions"),")")),Object(r.b)("p",null,'It is suggested that you name that account "Admin" for ease of use.'),Object(r.b)("h2",{id:"provide-you-with-new-miles"},"Provide you with new miles"),Object(r.b)("h3",{id:"add-entry-point"},Object(r.b)("inlineCode",{parentName:"h3"},"add")," entry point"),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"add"),"entry point to create miles and associate to a user address is presented in ",Object(r.b)(s.a,{to:"/docs/dapp-miles/miles-contract-interface#add",mdxType:"Link"},"this section"),"."),Object(r.b)("p",null,"It takes 4 parameters:"),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Parameter"),Object(r.b)("th",Object(a.a)({parentName:"tr"},{align:"center"}),"Value"),Object(r.b)("th",Object(a.a)({parentName:"tr"},{align:"right"}),"Description"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"ow"),Object(r.b)("td",Object(a.a)({parentName:"tr"},{align:"center"}),"USER_ADDRESS"),Object(r.b)("td",Object(a.a)({parentName:"tr"},{align:"right"}),"address of the created miles' owner")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"newmile_id"),Object(r.b)("td",Object(a.a)({parentName:"tr"},{align:"center"}),'USER_ADDRESS + "_0"'),Object(r.b)("td",Object(a.a)({parentName:"tr"},{align:"right"}),"a unique for the created miles")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"newmile_amount"),Object(r.b)("td",Object(a.a)({parentName:"tr"},{align:"center"}),"20"),Object(r.b)("td",Object(a.a)({parentName:"tr"},{align:"right"}),"number of miles to create")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"newmile_expiration"),Object(r.b)("td",Object(a.a)({parentName:"tr"},{align:"center"}),"TOMORROW"),Object(r.b)("td",Object(a.a)({parentName:"tr"},{align:"right"}),"date beyond which miles are expired, for example '2021-06-28'")))),Object(r.b)("p",null,"where:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"USER_ADDRESS is replaced by the DApp user account to receive the miles"),Object(r.b)("li",{parentName:"ul"},"TOMORROW is replaced by a date in the future, for example tomorrow")),Object(r.b)("p",null,"This entry point may only be called by ",Object(r.b)("u",null,"the contract's admin account"),". If you have not registered the admin address in the wallet, go to the section above."),Object(r.b)("h3",{id:"miles-creation-transaction"},"Miles creation transaction"),Object(r.b)("p",null,"The smart contract is available at the following address:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),"KT1F5DqPwKJC9qeEjTgdEQKGGBZpcAv5DX86\n")),Object(r.b)("p",null,"This section presents how to invoke the ",Object(r.b)("inlineCode",{parentName:"p"},"add")," entry point with the smart contract indexer ",Object(r.b)(s.a,{to:"/docs/dapp-tools/bcd",mdxType:"Link"},"Better Call Dev"),". Click the button blow to open the smart contract:"),Object(r.b)(o.a,{url:"https://better-call.dev/delphinet/KT1F5DqPwKJC9qeEjTgdEQKGGBZpcAv5DX86/operations",txt:"open smart contract",mdxType:"DappButton"}),Object(r.b)("p",null,'Click on the "Interact" tab and enter the parameters as presented above.'),Object(r.b)("p",null,"Below is an example screenshot (with USER_ADDRESS set to ",Object(r.b)("inlineCode",{parentName:"p"},"tz1dZydwVDuz6SH5jCUfCQjqV8YCQimL9GCp"),") of the interact panel:"),Object(r.b)(c.a,{img:"bcd-miles-2.png",width:"100%",mdxType:"DappFigure"}),Object(r.b)("p",null,'Once settings are set, click on the "Execute" button and select "Thanos":'),Object(r.b)(c.a,{img:"bcd-miles-3.png",width:"60%",mdxType:"DappFigure"}),Object(r.b)("p",null,'You may check the transation parameters in the "Operations" section:'),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json"}),'[\n    {\n        "kind":"transaction",\n        "to":"KT1F5DqPwKJC9qeEjTgdEQKGGBZpcAv5DX86",\n        "amount":0,\n        "mutez":true,\n        "parameter":{\n            "entrypoint":"add",\n            "value":{\n                "args":[\n                {\n                    "string":"tz1dZydwVDuz6SH5jCUfCQjqV8YCQimL9GCp"\n                },\n                {\n                    "args":[\n                    {\n                        "string":"tz1dZydwVDuz6SH5jCUfCQjqV8YCQimL9GCp_0"\n                    },\n                    {\n                        "args":[\n                        {\n                            "int":"20"\n                        },\n                        {\n                            "int":"1611331473"\n                        }\n                        ],\n                        "prim":"Pair"\n                    }\n                    ],\n                    "prim":"Pair"\n                }\n                ],\n                "prim":"Pair"\n            }\n        }\n    }\n]\n\n')),Object(r.b)("p",null,"Once sent, the transaction should take a minute to be confirmed. When confirmed, you may click on the transaction to visualize the evolution of the contract storage. On the screenshot below, check create miles (highlighted in green):"),Object(r.b)(c.a,{img:"bcd-miles-4.png",width:"100%",mdxType:"DappFigure"}),Object(r.b)("p",null,"Next step is to go to the user interface to spend these 20 miles on reward items!"))}m.isMDXComponent=!0}}]);
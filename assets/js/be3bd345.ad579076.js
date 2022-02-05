"use strict";(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[8634],{3079:function(e,t,n){var a=n(7294),i=n(282),r=n(8500),o=n(3457),l=n(9960),s=n(4996);t.Z=function(e){var t=a.useMemo((function(){return(0,r.Z)({palette:{type:"dark"}})}),[!0]);return a.createElement("div",{style:{textAlign:"center",paddingTop:"0px",paddingBottom:"40px"}},a.createElement(o.Z,{theme:t},e.internal?a.createElement(i.Z,{variant:"outlined",size:"large",component:l.Z,to:(0,s.Z)("docs/"+e.url+"/")},e.txt):a.createElement(i.Z,{variant:"outlined",size:"large",onClick:function(){return window.open(e.url,"_blank")}},e.txt)))}},2025:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return p},contentTitle:function(){return c},metadata:function(){return m},toc:function(){return u},default:function(){return k}});var a=n(7462),i=n(3366),r=(n(7294),n(3905)),o=n(7134),l=n(3079),s=n(9960),d=["components"],p={id:"miles3",title:"Create Miles",sidebar_label:"Create Miles",slug:"/dapp-miles/create-miles"},c=void 0,m={unversionedId:"dapp-miles/miles3",id:"dapp-miles/miles3",title:"Create Miles",description:"In order to consume miles, it is first required that the contract's admin account provides your user account with some new miles. To do so, it is necessary to invoke the add entry point of the smart contract.",source:"@site/docs/dapp-miles/miles3.md",sourceDirName:"dapp-miles",slug:"/dapp-miles/create-miles",permalink:"/docs/dapp-miles/create-miles",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-miles/miles3.md",tags:[],version:"current",frontMatter:{id:"miles3",title:"Create Miles",sidebar_label:"Create Miles",slug:"/dapp-miles/create-miles"},sidebar:"dapps",previous:{title:"Presentation",permalink:"/docs/dapp-miles/usecase-presentation"},next:{title:"Consume Miles",permalink:"/docs/dapp-miles/consume-miles"}},u=[{value:"Import the smart contract&#39;s admin account",id:"import-the-smart-contracts-admin-account",children:[],level:2},{value:"Provide you with new miles",id:"provide-you-with-new-miles",children:[{value:"<code>add</code> entry point",id:"add-entry-point",children:[],level:3},{value:"Miles creation transaction",id:"miles-creation-transaction",children:[],level:3}],level:2}],h={toc:u};function k(e){var t=e.components,n=(0,i.Z)(e,d);return(0,r.kt)("wrapper",(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"In order to consume miles, it is first required that the contract's admin account provides your user account with some new miles. To do so, it is necessary to invoke the ",(0,r.kt)("inlineCode",{parentName:"p"},"add")," entry point of the smart contract."),(0,r.kt)("p",null,"In a real production situation, miles are created by the DApp's off-chain server which creates miles according to user activity."),(0,r.kt)("p",null,"In this DApp example, the off-chain server is not provided and the creation operation is done manually by invoking the smart contract's ",(0,r.kt)("inlineCode",{parentName:"p"},"add")," entry point. To do so, it is necessary to import the contract's admin account in the Thanos wallet as explained below."),(0,r.kt)("h2",{id:"import-the-smart-contracts-admin-account"},"Import the smart contract's admin account"),(0,r.kt)("p",null,"The process to is two-steps:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"download the admin faucet file (",(0,r.kt)(s.Z,{to:"/docs/dapp-tools/faucet#admin-account",mdxType:"Link"},"instructions"),")"),(0,r.kt)("li",{parentName:"ol"},"import it in wallet (",(0,r.kt)(s.Z,{to:"/docs/dapp-tools/thanos#import-faucet-file",mdxType:"Link"},"instructions"),")")),(0,r.kt)("p",null,'It is suggested that you name that account "Admin" for ease of use.'),(0,r.kt)("h2",{id:"provide-you-with-new-miles"},"Provide you with new miles"),(0,r.kt)("h3",{id:"add-entry-point"},(0,r.kt)("inlineCode",{parentName:"h3"},"add")," entry point"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"add"),"entry point to create miles and associate to a user address is presented in ",(0,r.kt)(s.Z,{to:"/docs/dapp-miles/miles-contract-interface#add",mdxType:"Link"},"this section"),"."),(0,r.kt)("p",null,"It takes 4 parameters:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:"center"},"Value"),(0,r.kt)("th",{parentName:"tr",align:"right"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"ow"),(0,r.kt)("td",{parentName:"tr",align:"center"},"USER_ADDRESS"),(0,r.kt)("td",{parentName:"tr",align:"right"},"address of the created miles' owner")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"newmile_id"),(0,r.kt)("td",{parentName:"tr",align:"center"},'USER_ADDRESS + "_0"'),(0,r.kt)("td",{parentName:"tr",align:"right"},"a unique for the created miles")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"newmile_amount"),(0,r.kt)("td",{parentName:"tr",align:"center"},"20"),(0,r.kt)("td",{parentName:"tr",align:"right"},"number of miles to create")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"newmile_expiration"),(0,r.kt)("td",{parentName:"tr",align:"center"},"TOMORROW"),(0,r.kt)("td",{parentName:"tr",align:"right"},"date beyond which miles are expired, for example '2021-06-28'")))),(0,r.kt)("p",null,"where:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"USER_ADDRESS is replaced by the DApp user account to receive the miles"),(0,r.kt)("li",{parentName:"ul"},"TOMORROW is replaced by a date in the future, for example tomorrow")),(0,r.kt)("p",null,"This entry point may only be called by ",(0,r.kt)("u",null,"the contract's admin account"),". If you have not registered the admin address in the wallet, go to the section above."),(0,r.kt)("h3",{id:"miles-creation-transaction"},"Miles creation transaction"),(0,r.kt)("p",null,"The smart contract is available at the following address:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"KT1F5DqPwKJC9qeEjTgdEQKGGBZpcAv5DX86\n")),(0,r.kt)("p",null,"This section presents how to invoke the ",(0,r.kt)("inlineCode",{parentName:"p"},"add")," entry point with the smart contract indexer ",(0,r.kt)(s.Z,{to:"/docs/dapp-tools/bcd",mdxType:"Link"},"Better Call Dev"),". Click the button blow to open the smart contract:"),(0,r.kt)(l.Z,{url:"https://better-call.dev/delphinet/KT1F5DqPwKJC9qeEjTgdEQKGGBZpcAv5DX86/operations",txt:"open smart contract",mdxType:"DappButton"}),(0,r.kt)("p",null,'Click on the "Interact" tab and enter the parameters as presented above.'),(0,r.kt)("p",null,"Below is an example screenshot (with USER_ADDRESS set to ",(0,r.kt)("inlineCode",{parentName:"p"},"tz1dZydwVDuz6SH5jCUfCQjqV8YCQimL9GCp"),") of the interact panel:"),(0,r.kt)(o.Z,{img:"bcd-miles-2.png",width:"100%",mdxType:"DappFigure"}),(0,r.kt)("p",null,'Once settings are set, click on the "Execute" button and select "Thanos":'),(0,r.kt)(o.Z,{img:"bcd-miles-3.png",width:"60%",mdxType:"DappFigure"}),(0,r.kt)("p",null,'You may check the transation parameters in the "Operations" section:'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'[\n    {\n        "kind":"transaction",\n        "to":"KT1F5DqPwKJC9qeEjTgdEQKGGBZpcAv5DX86",\n        "amount":0,\n        "mutez":true,\n        "parameter":{\n            "entrypoint":"add",\n            "value":{\n                "args":[\n                {\n                    "string":"tz1dZydwVDuz6SH5jCUfCQjqV8YCQimL9GCp"\n                },\n                {\n                    "args":[\n                    {\n                        "string":"tz1dZydwVDuz6SH5jCUfCQjqV8YCQimL9GCp_0"\n                    },\n                    {\n                        "args":[\n                        {\n                            "int":"20"\n                        },\n                        {\n                            "int":"1611331473"\n                        }\n                        ],\n                        "prim":"Pair"\n                    }\n                    ],\n                    "prim":"Pair"\n                }\n                ],\n                "prim":"Pair"\n            }\n        }\n    }\n]\n\n')),(0,r.kt)("p",null,"Once sent, the transaction should take a minute to be confirmed. When confirmed, you may click on the transaction to visualize the evolution of the contract storage. On the screenshot below, check create miles (highlighted in green):"),(0,r.kt)(o.Z,{img:"bcd-miles-4.png",width:"100%",mdxType:"DappFigure"}),(0,r.kt)("p",null,"Next step is to go to the user interface to spend these 20 miles on reward items!"))}k.isMDXComponent=!0}}]);
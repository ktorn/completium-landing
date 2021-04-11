(window.webpackJsonp=window.webpackJsonp||[]).push([[130],{198:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return b})),a.d(t,"toc",(function(){return s})),a.d(t,"default",(function(){return u}));var n=a(3),o=a(7),d=(a(0),a(227)),i=(a(229),a(230)),p=a(231),r=a(228),c={id:"ideabox10",title:"Add an Idea or Vote",sidebar_label:"Add idea or vote",slug:"/dapp-ideabox/addidea"},b={unversionedId:"dapp-ideabox/ideabox10",id:"dapp-ideabox/ideabox10",isDocsHomePage:!1,title:"Add an Idea or Vote",description:"Vote for or add a new idea in the DApp web interface:",source:"@site/docs/dapp-ideabox/ideabox10.md",slug:"/dapp-ideabox/addidea",permalink:"/docs/dapp-ideabox/addidea",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-ideabox/ideabox10.md",version:"current",sidebar_label:"Add idea or vote",sidebar:"dapps",previous:{title:"Register Voter",permalink:"/docs/dapp-ideabox/registervoter"},next:{title:"Technical guide",permalink:"/docs/dapp-ideabox/tg-presentation"}},s=[{value:"Connect to wallet",id:"connect-to-wallet",children:[]},{value:"Vote",id:"vote",children:[]},{value:"Add an Idea",id:"add-an-idea",children:[]}],l={toc:s};function u(e){var t=e.components,a=Object(o.a)(e,["components"]);return Object(d.b)("wrapper",Object(n.a)({},l,a,{components:t,mdxType:"MDXLayout"}),Object(d.b)("p",null,"Vote for or add a new idea in the DApp web interface:"),Object(d.b)(p.a,{url:"https://edukera.github.io/completium-dapp-ideabox/",txt:"open dapp",mdxType:"DappButton"}),Object(d.b)("h2",{id:"connect-to-wallet"},"Connect to wallet"),Object(d.b)("p",null,'Connect to the wallet by clicking the "Connect" button:'),Object(d.b)(i.a,{img:"ideabox-connect1.png",width:"35%",mdxType:"DappFigure"}),Object(d.b)("p",null,"Then select the user account. If you don't have a dedicated user account, go to the ",Object(d.b)(r.a,{to:"/docs/dapp-ideabox/presentation#create-a-user-account",mdxType:"Link"},"Presentation")," page."),Object(d.b)("p",null,"Once connected, the account address and the number of remmaining votes (max. is 5) is displayed:"),Object(d.b)(i.a,{img:"ideabox-connect2.png",width:"100%",mdxType:"DappFigure"}),Object(d.b)("p",null,'If the Thanos wallet is not installed (as a browser extension), then the "Install Thanos" button is displayed.'),Object(d.b)("h2",{id:"vote"},"Vote"),Object(d.b)("p",null,'We first want to check ideas with the highest number of votes. Click on the "Sort by votes" button to do so:'),Object(d.b)(i.a,{img:"ideabox-sort.png",width:"20%",mdxType:"DappFigure"}),Object(d.b)("p",null,'The idea with highest number of votes (at the time of writing) is "Huge gigantic banner". Click on the blue thumb-up icon to vote for it:'),Object(d.b)(i.a,{img:"ideabox-top.png",width:"60%",mdxType:"DappFigure"}),Object(d.b)("p",null,"You may check the json parameters, the first parameter of the ",Object(d.b)(r.a,{to:"/docs/dapp-ideabox/interface#vote",mdxType:"Link"},"vote")," entry point is the idea's id (7):"),Object(d.b)("pre",null,Object(d.b)("code",Object(n.a)({parentName:"pre"},{className:"language-json",metastring:"{12}","{12}":!0}),'[\n    {\n        "kind":"transaction"\n        "to":"KT1QMowNVCUngertU7bAeoZmU7XYm3gphE69"\n        "amount":0\n        "mutez":true\n        "parameter":{\n            "entrypoint":"vote"\n            "value":{\n            "prim":"Pair"\n            "args":[{\n                    "int":"7"\n                }, {\n                    "int":"1"\n                }\n            ]\n            }\n        }\n    }\n]\n')),Object(d.b)("h2",{id:"add-an-idea"},"Add an Idea"),Object(d.b)("p",null,"You may add a new idea and you don't need to be regsitered for that."),Object(d.b)("p",null,'Click the "+" button at the bottom of the DApp:'),Object(d.b)(i.a,{img:"ideabox-add.png",width:"30%",mdxType:"DappFigure"}),Object(d.b)("p",null,"This displays the form to create an idea:"),Object(d.b)(i.a,{img:"ideabox-form.png",width:"80%",mdxType:"DappFigure"}),Object(d.b)("p",null,'Click the "Submit" button to add the idea. You may check the json parameters, the first parameter of the ',Object(d.b)(r.a,{to:"/docs/dapp-ideabox/implementation#add-idea",mdxType:"Link"},"add-idea")," entry point is the idea's title and the second is the idea's body :"),Object(d.b)("pre",null,Object(d.b)("code",Object(n.a)({parentName:"pre"},{className:"language-json",metastring:"{11,13}","{11,13}":!0}),'[{\n    "kind":"transaction"\n    "to":"KT1QMowNVCUngertU7bAeoZmU7XYm3gphE69"\n    "amount":0\n    "mutez":true\n    "parameter":{\n    "entrypoint":"add_idea"\n    "value":{\n        "prim":"Pair"\n        "args":[{\n            "bytes":"20813100810dc01d21cc0a6e01981ec04eb0..."\n        } {\n            "bytes":"248170040ee0f60ae0360133008c0a660398..."\n        }]\n    }\n    }\n}]\n')),Object(d.b)("p",null,"Note that the idea's title and body are are sent to the contract in zipped and encoded format."))}u.isMDXComponent=!0},229:function(e,t,a){"use strict";a(0),a(233)}}]);
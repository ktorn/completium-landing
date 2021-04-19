(window.webpackJsonp=window.webpackJsonp||[]).push([[114],{184:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return p})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return r})),n.d(t,"default",(function(){return u}));var i=n(3),o=(n(0),n(235)),a=n(239),s=n(238),c=n(236);const p={id:"miles5",title:"Consume Miles",sidebar_label:"Consume Miles",slug:"/dapp-miles/consume-miles"},l={unversionedId:"dapp-miles/miles5",id:"dapp-miles/miles5",isDocsHomePage:!1,title:"Consume Miles",description:"Miles are consumed on the DApp user interface. Click the button below to open the DApp:",source:"@site/docs/dapp-miles/miles5.md",slug:"/dapp-miles/consume-miles",permalink:"/docs/dapp-miles/consume-miles",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-miles/miles5.md",version:"current",sidebar_label:"Consume Miles",sidebar:"dapps",previous:{title:"Create Miles",permalink:"/docs/dapp-miles/create-miles"},next:{title:"Presentation",permalink:"/docs/dapp-miles/miles-tg-overview"}},r=[{value:"Connect to the Dapp",id:"connect-to-the-dapp",children:[]},{value:"Pick reward item",id:"pick-reward-item",children:[]}],d={toc:r};function u({components:e,...t}){return Object(o.b)("wrapper",Object(i.a)({},d,t,{components:e,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Miles are consumed on the DApp user interface. Click the button below to open the DApp:"),Object(o.b)(a.a,{url:"https://edukera.github.io/completium-dapp-miles/",txt:"open dapp",mdxType:"DappButton"}),Object(o.b)("h2",{id:"connect-to-the-dapp"},"Connect to the Dapp"),Object(o.b)("p",null,'Connect to the DApp by clicking the "Connect" button:'),Object(o.b)(s.a,{img:"miles-connect1.png",width:"35%",mdxType:"DappFigure"}),Object(o.b)("p",null,"Then select the user account. If you don't have a dedicated user account, go to the ",Object(o.b)(c.a,{to:"/docs/dapp-miles/usecase-presentation#create-a-user-account",mdxType:"Link"},"Presentation")," page."),Object(o.b)("p",null,"Once connected, the number of valid miles (ie. with expiration date in the future) is displayed:"),Object(o.b)(s.a,{img:"miles-connect3.png",width:"100%",mdxType:"DappFigure"}),Object(o.b)("p",null,'If the Thanos wallet is not installed (as a browser extension), then the "Install Thanos" button is displayed.'),Object(o.b)("h2",{id:"pick-reward-item"},"Pick reward item"),Object(o.b)("p",null,'When the connected account has enough miles, the "Get it!" button of the reward item is enabled. Clicking this button generates the miles\'s consumption transaction to the smart contract.'),Object(o.b)("p",null,"For example, clicking the \"Get it!\" button on the 'Tezos phone case' item generates the transaction popup issued by the Thanos wallet."),Object(o.b)(s.a,{img:"miles-consume.png",width:"70%",mdxType:"DappFigure"}),Object(o.b)("p",null,'You may check the transaction parameters in the "Operations" section:'),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{className:"language-json"}),'[\n    {\n        "kind":"transaction"\n        "to":"KT1F5DqPwKJC9qeEjTgdEQKGGBZpcAv5DX86"\n        "amount":0\n        "mutez":true\n        "parameter":{\n            "entrypoint":"consume"\n            "value":{\n                "int":"5"\n            }\n        }\n    }\n]\n')),Object(o.b)("p",null,'Once the transaction is confirmed, you can verify the transaction online with the "Better Call Dev" indexer:'),Object(o.b)(a.a,{url:"https://better-call.dev/delphinet/KT1F5DqPwKJC9qeEjTgdEQKGGBZpcAv5DX86/operations",txt:"open smart contract",mdxType:"DappButton"}))}u.isMDXComponent=!0}}]);
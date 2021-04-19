(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{157:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return d})),a.d(t,"metadata",(function(){return p})),a.d(t,"toc",(function(){return s})),a.d(t,"default",(function(){return l}));var n=a(3),o=(a(0),a(235)),c=(a(237),a(238)),i=a(239),r=a(236);const d={id:"zcb1",title:"Zero Coupon Bond",sidebar_label:"Introduction",slug:"/dapp-zcb/"},p={unversionedId:"dapp-zcb/zcb1",id:"dapp-zcb/zcb1",isDocsHomePage:!1,title:"Zero Coupon Bond",description:"Introduction",source:"@site/docs/dapp-zcb/zcb1.md",slug:"/dapp-zcb/",permalink:"/docs/dapp-zcb/",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-zcb/zcb1.md",version:"current",sidebar_label:"Introduction",sidebar:"dapps",previous:{title:"Interactions",permalink:"/docs/dapp-dex/interactions"},next:{title:"Use Case Presentation",permalink:"/docs/dapp-zcb/Presentation"}},s=[{value:"Introduction",id:"introduction",children:[]},{value:"DApp",id:"dapp",children:[]},{value:"Smart contract",id:"smart-contract",children:[]},{value:"Architecture",id:"architecture",children:[]}],b={toc:s};function l({components:e,...t}){return Object(o.b)("wrapper",Object(n.a)({},b,t,{components:e,mdxType:"MDXLayout"}),Object(o.b)(c.a,{img:"zcb-screen.png",width:"100%",mdxType:"DappFigure"}),Object(o.b)(i.a,{url:"https://edukera.github.io/completium-dapp-zerocouponbond/",txt:"open dapp",mdxType:"DappButton"}),Object(o.b)("h2",{id:"introduction"},"Introduction"),Object(o.b)("p",null,"You work in the business department of a law company which uses an online solution to deploy DeFi contracts on the Tezos blockchain."),Object(o.b)("p",null,"Today you are deploying a Zero-Coupon Bond contract from the tailord template. Fill in the contract parameters and deploy the smart contract."),Object(o.b)("p",null,"The holder (or subscriber) of a ",Object(o.b)("a",{href:"https://en.wikipedia.org/wiki/Zero-coupon_bond",target:"_blank"},"Zero-Coupon bond")," provides the bond's present value to the issuer and gets redeemed at maturity date of its face value."),Object(o.b)("p",null,"In this example DApp, the ",Object(o.b)("em",{parentName:"p"},"present")," value of the bond (value at which the bond is traded) is computed as the face value (value at which the bond is redeemed at maturity date) minus a ",Object(o.b)("em",{parentName:"p"},"discount")," percent of face value."),Object(o.b)("p",null,"The schema below illustrates the two steps of the bond:"),Object(o.b)(c.a,{img:"zcb-schema.svg",width:"60%",mdxType:"DappFigure"}),Object(o.b)("h2",{id:"dapp"},"DApp"),Object(o.b)("h2",{id:"smart-contract"},"Smart contract"),Object(o.b)("p",null,"The Zero-coupon bond's business logic is anchored with a ",Object(o.b)(r.a,{to:"/docs/templates/zcb",mdxType:"Link"},"smart contract")," on the ",Object(o.b)(r.a,{to:"/docs/dapp-tools/tezos",mdxType:"Link"},"Tezos")," blockchain."),Object(o.b)("p",null,"The smart contract is designed with the ",Object(o.b)("a",{href:"https://archetype-lang.org/"},"Archetype")," language as a simple state machine for clarity purpose toward involved parties:"),Object(o.b)(c.a,{img:"zcb-schema2.svg",width:"60%",mdxType:"DappFigure"}),Object(o.b)("p",null,"The smart contract's entry points are the state machine's transitions:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("u",null,"sign"),": called by parties, transitions from *Created* to *Signed* when both parties have signed; holder must transfer *present value*"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("u",null,"terminate"),": transition is validated when called by issuer after maturity date and before end of payback perdiod"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("u",null,"dispute"),": transition is validated when called by holder after end of payback period")),Object(o.b)("p",null,"Dates and periods are illustrated in the schema below:"),Object(o.b)(c.a,{img:"zcb-schema3.svg",width:"80%",mdxType:"DappFigure"}),Object(o.b)("p",null,"The smart contract's implementation is presented in this ",Object(o.b)(r.a,{to:"/docs/dapp-zcb/interface",mdxType:"Link"},"section"),"."),Object(o.b)("h2",{id:"architecture"},"Architecture"),Object(o.b)("p",null,"The DApp is made of:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"an online editor and its content servers"),Object(o.b)("li",{parentName:"ul"},"deployed smart contracts")),Object(o.b)(c.a,{img:"zcb-schema4.svg",width:"40%",mdxType:"DappFigure"}))}l.isMDXComponent=!0},237:function(e,t,a){"use strict";a(0),a(242)}}]);
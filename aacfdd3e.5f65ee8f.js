(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{181:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return p})),n.d(t,"toc",(function(){return b})),n.d(t,"default",(function(){return d}));var i=n(3),a=(n(0),n(235)),c=(n(237),n(238)),o=n(239),r=n(236);const s={id:"iot1",title:"Connected Object",sidebar_label:"Introduction",slug:"/dapp-iot"},p={unversionedId:"dapp-iot/iot1",id:"dapp-iot/iot1",isDocsHomePage:!1,title:"Connected Object",description:"Introduction",source:"@site/docs/dapp-iot/iot1.md",slug:"/dapp-iot",permalink:"/docs/dapp-iot",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-iot/iot1.md",version:"current",sidebar_label:"Introduction",sidebar:"dapps",previous:{title:"Interactions with contract",permalink:"/docs/dapp-miles/miles-tg-interactions"},next:{title:"Use Case Presentation",permalink:"/docs/dapp-iot/presentation"}},b=[{value:"Introduction",id:"introduction",children:[]},{value:"DApp",id:"dapp",children:[{value:"Architecture",id:"architecture",children:[]},{value:"Benefits",id:"benefits",children:[]}]}],l={toc:b};function d({components:e,...t}){return Object(a.b)("wrapper",Object(i.a)({},l,t,{components:e,mdxType:"MDXLayout"}),Object(a.b)(c.a,{img:"iot-screen.png",width:"100%",mdxType:"DappFigure"}),Object(a.b)(o.a,{url:"https://edukera.github.io/completium-dapp-iot/",txt:"open dapp",mdxType:"DappButton"}),Object(a.b)("h2",{id:"introduction"},"Introduction"),Object(a.b)("p",null," A public connected object is activated for a certain duration against payment. Such an object can be:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"an electric vehicle supply equipment"),Object(a.b)("li",{parentName:"ul"},"an advertising display equipment (online or IRL)"),Object(a.b)("li",{parentName:"ul"},"a jukebox in a public place (caf\xe9, street urban equipment, ...)"),Object(a.b)("li",{parentName:"ul"},"...")),Object(a.b)("h2",{id:"dapp"},"DApp"),Object(a.b)("p",null,"In this DApp example, the connected object is a simple online bulb accessible on mobile device:"),Object(a.b)(c.a,{img:"bulb.jpg",width:"30%",mdxType:"DappFigure"}),Object(a.b)("p",null,"You may switch it on and off via the DApp's web interface by sending XTZ to the object's ",Object(a.b)(r.a,{to:"/docs/dapp-tools/tezos#smart-contract",mdxType:"Link"},"smart contract"),"."),Object(a.b)("h3",{id:"architecture"},"Architecture"),Object(a.b)("p",null,"The connected object is permanently reading its state and service information in its associated smart contract."),Object(a.b)(c.a,{img:"iot-archi.svg",width:"80%",mdxType:"DappFigure"}),Object(a.b)("ol",{start:0},Object(a.b)("li",{parentName:"ol"},"The customer interacts with the ",Object(a.b)(r.a,{to:"/docs/templates/iot",mdxType:"Link"},"smart contract")," through the DApp's ",Object(a.b)(r.a,{to:"/docs/dapp-iot/presentation",mdxType:"Link"},"web interface"),". The contract provides two entry points:")),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"start")," to start the service"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"interrupt")," to interrupt the service")),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"the connected object reads its state on a regular basis (typically every 5 seconds)"),Object(a.b)("li",{parentName:"ol"},"the connected object may retrieve content to broadcast from a content server")),Object(a.b)("p",null,"Inspect the smart contract transactions in ",Object(a.b)(r.a,{to:"/docs/dapp-tools/bcd",mdxType:"Link"},"Better Call Dev"),":"),Object(a.b)(o.a,{url:"https://better-call.dev/edo2net/KT19ZQUnVrDT5xnfvPqYhn1DeM489875oWGU/operations",txt:"inspect smart contract",mdxType:"DappButton"}),Object(a.b)("div",{className:"admonition admonition-info alert alert--info"},Object(a.b)("div",Object(i.a)({parentName:"div"},{className:"admonition-heading"}),Object(a.b)("h5",{parentName:"div"},Object(a.b)("span",Object(i.a)({parentName:"h5"},{className:"admonition-icon"}),Object(a.b)("svg",Object(i.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(a.b)("path",Object(i.a)({parentName:"svg"},{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})))),"info")),Object(a.b)("div",Object(i.a)({parentName:"div"},{className:"admonition-content"}),Object(a.b)("p",{parentName:"div"},"In this DApp example, there is no need for a content server because of the simple nature of the on/off bulb service. With more sophisticated objects like advertising display equipment, the content to display is retrieved from a dedicated off-chain content server."))),Object(a.b)("h3",{id:"benefits"},"Benefits"),Object(a.b)("p",null,"The use of the Tezos blockchain ",Object(a.b)("em",{parentName:"p"},"tremendously")," reduces the setup and exploitation costs, as it provides the following services:"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"secured payment system"),Object(a.b)("li",{parentName:"ol"},"auditable and persistent transaction system"),Object(a.b)("li",{parentName:"ol"},"public and verifiable business logic")),Object(a.b)("p",null,"The setup effort is minimal:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"the smart contract is 30 lines long and simple to deploy"),Object(a.b)("li",{parentName:"ul"},"the business logic on the connected object side basically consists in an infinite reading loop and the capacity to perform standard HTTP GET connection to read the contract's storage")),Object(a.b)("p",null,"The cost per transaction is the fee to call the contract, which is 0.002109 \ua729 per transaction!"))}d.isMDXComponent=!0},237:function(e,t,n){"use strict";n(0),n(242)}}]);
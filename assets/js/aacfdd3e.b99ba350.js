(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[534],{807:function(t,e,n){"use strict";n(7294),n(4996)},5463:function(t,e,n){"use strict";n.r(e),n.d(e,{frontMatter:function(){return l},contentTitle:function(){return d},metadata:function(){return u},toc:function(){return m},default:function(){return k}});var i=n(2122),a=n(9756),o=(n(7294),n(3905)),r=(n(807),n(7134)),s=n(3079),c=n(6742),p=["components"],l={id:"iot1",title:"Connected Object",sidebar_label:"Introduction",slug:"/dapp-iot"},d=void 0,u={unversionedId:"dapp-iot/iot1",id:"dapp-iot/iot1",isDocsHomePage:!1,title:"Connected Object",description:"Introduction",source:"@site/docs/dapp-iot/iot1.md",sourceDirName:"dapp-iot",slug:"/dapp-iot",permalink:"/docs/dapp-iot",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-iot/iot1.md",version:"current",frontMatter:{id:"iot1",title:"Connected Object",sidebar_label:"Introduction",slug:"/dapp-iot"},sidebar:"dapps",previous:{title:"Interactions",permalink:"/docs/dapp-miles/miles-tg-interactions"},next:{title:"Presentation",permalink:"/docs/dapp-iot/presentation"}},m=[{value:"Introduction",id:"introduction",children:[]},{value:"DApp",id:"dapp",children:[{value:"Architecture",id:"architecture",children:[]},{value:"Benefits",id:"benefits",children:[]}]}],h={toc:m};function k(t){var e=t.components,n=(0,a.Z)(t,p);return(0,o.kt)("wrapper",(0,i.Z)({},h,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)(r.Z,{img:"iot-screen.png",width:"100%",mdxType:"DappFigure"}),(0,o.kt)(s.Z,{url:"https://edukera.github.io/completium-dapp-iot/",txt:"open dapp",mdxType:"DappButton"}),(0,o.kt)("h2",{id:"introduction"},"Introduction"),(0,o.kt)("p",null," A public connected object is activated for a certain duration against payment. Such an object can be:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"an electric vehicle supply equipment"),(0,o.kt)("li",{parentName:"ul"},"an advertising display equipment (online or IRL)"),(0,o.kt)("li",{parentName:"ul"},"a jukebox in a public place (caf\xe9, street urban equipment, ...)"),(0,o.kt)("li",{parentName:"ul"},"...")),(0,o.kt)("h2",{id:"dapp"},"DApp"),(0,o.kt)("p",null,"In this DApp example, the connected object is a simple online bulb accessible on mobile device:"),(0,o.kt)(r.Z,{img:"bulb.jpg",width:"30%",mdxType:"DappFigure"}),(0,o.kt)("p",null,"You may switch it on and off via the DApp's web interface by sending XTZ to the object's ",(0,o.kt)(c.Z,{to:"/docs/dapp-tools/tezos#smart-contract",mdxType:"Link"},"smart contract"),"."),(0,o.kt)("h3",{id:"architecture"},"Architecture"),(0,o.kt)("p",null,"The connected object is permanently reading its state and service information in its associated smart contract."),(0,o.kt)(r.Z,{img:"iot-archi.svg",width:"80%",mdxType:"DappFigure"}),(0,o.kt)("ol",{start:0},(0,o.kt)("li",{parentName:"ol"},"The customer interacts with the ",(0,o.kt)(c.Z,{to:"/docs/templates/iot",mdxType:"Link"},"smart contract")," through the DApp's ",(0,o.kt)(c.Z,{to:"/docs/dapp-iot/presentation",mdxType:"Link"},"web interface"),". The contract provides two entry points:")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"start")," to start the service"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"interrupt")," to interrupt the service")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"the connected object reads its state on a regular basis (typically every 5 seconds)"),(0,o.kt)("li",{parentName:"ol"},"the connected object may retrieve content to broadcast from a content server")),(0,o.kt)("p",null,"Inspect the smart contract transactions in ",(0,o.kt)(c.Z,{to:"/docs/dapp-tools/bcd",mdxType:"Link"},"Better Call Dev"),":"),(0,o.kt)(s.Z,{url:"https://better-call.dev/edo2net/KT19ZQUnVrDT5xnfvPqYhn1DeM489875oWGU/operations",txt:"inspect smart contract",mdxType:"DappButton"}),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"In this DApp example, there is no need for a content server because of the simple nature of the on/off bulb service. With more sophisticated objects like advertising display equipment, the content to display is retrieved from a dedicated off-chain content server."))),(0,o.kt)("h3",{id:"benefits"},"Benefits"),(0,o.kt)("p",null,"The use of the Tezos blockchain ",(0,o.kt)("em",{parentName:"p"},"tremendously")," reduces the setup and exploitation costs, as it provides the following services:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"secured payment system"),(0,o.kt)("li",{parentName:"ol"},"auditable and persistent transaction system"),(0,o.kt)("li",{parentName:"ol"},"public and verifiable business logic")),(0,o.kt)("p",null,"The setup effort is minimal:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"the smart contract is 30 lines long and simple to deploy"),(0,o.kt)("li",{parentName:"ul"},"the business logic on the connected object side basically consists in an infinite reading loop and the capacity to perform standard HTTP GET connection to read the contract's storage")),(0,o.kt)("p",null,"The cost per transaction is the fee to call the contract, which is 0.002109 \ua729 per transaction!"))}k.isMDXComponent=!0}}]);
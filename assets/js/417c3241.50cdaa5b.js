"use strict";(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[5425],{3079:function(e,t,a){var i=a(7294),n=a(282),o=a(8500),d=a(3457),r=a(9960),s=a(4996);t.Z=function(e){var t=i.useMemo((function(){return(0,o.Z)({palette:{type:"dark"}})}),[!0]);return i.createElement("div",{style:{textAlign:"center",paddingTop:"0px",paddingBottom:"40px"}},i.createElement(d.Z,{theme:t},e.internal?i.createElement(n.Z,{variant:"outlined",size:"large",component:r.Z,to:(0,s.Z)("docs/"+e.url+"/")},e.txt):i.createElement(n.Z,{variant:"outlined",size:"large",onClick:function(){return window.open(e.url,"_blank")}},e.txt)))}},807:function(e,t,a){a(7294),a(4996)},8632:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return h},default:function(){return v}});var i=a(7462),n=a(3366),o=(a(7294),a(3905)),d=a(9960),r=(a(807),a(7134)),s=a(3079),p=["components"],c={id:"ideabox1",title:"Idea Box",sidebar_label:"Introduction",slug:"/dapp-ideabox"},l=void 0,u={unversionedId:"dapp-ideabox/ideabox1",id:"dapp-ideabox/ideabox1",title:"Idea Box",description:"Introduction",source:"@site/docs/dapp-ideabox/ideabox1.md",sourceDirName:"dapp-ideabox",slug:"/dapp-ideabox",permalink:"/docs/dapp-ideabox",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-ideabox/ideabox1.md",tags:[],version:"current",frontMatter:{id:"ideabox1",title:"Idea Box",sidebar_label:"Introduction",slug:"/dapp-ideabox"},sidebar:"dapps",previous:{title:"Contract Interactions",permalink:"/docs/dapp-iot/interactions"},next:{title:"Presentation",permalink:"/docs/dapp-ideabox/presentation"}},h=[{value:"Introduction",id:"introduction",children:[],level:2},{value:"DApp",id:"dapp",children:[{value:"Architecture",id:"architecture",children:[],level:3},{value:"Benefits",id:"benefits",children:[],level:3},{value:"Discussion",id:"discussion",children:[],level:3}],level:2}],m={toc:h};function v(e){var t=e.components,a=(0,n.Z)(e,p);return(0,o.kt)("wrapper",(0,i.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)(r.Z,{img:"ideabox-screen.png",width:"100%",mdxType:"DappFigure"}),(0,o.kt)(s.Z,{url:"https://edukera.github.io/completium-dapp-ideabox/",txt:"open dapp",mdxType:"DappButton"}),(0,o.kt)("h2",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,"An online retail company wants to improve customer experience by setting up an ideabox for customers and/or employees to post improvement ideas. After a voting period, the top 3 ideas are selected. Voters must be registered by the ideabox's chairman."),(0,o.kt)("h2",{id:"dapp"},"DApp"),(0,o.kt)("p",null,"This DApp example provides the Tezos' smart contract to store ideas and votes, and a web interface to display, add and vote for ideas."),(0,o.kt)("p",null,"Voters must be registered to be able to vote for or add ideas to the box. Each voter is assigned a maximum number of 5 votes."),(0,o.kt)("p",null,"The DApp ",(0,o.kt)("em",{parentName:"p"},"chairman")," registers voters, and decides when the voting period starts and ends. Ending the vote process triggers the selection of top ideas."),(0,o.kt)("h3",{id:"architecture"},"Architecture"),(0,o.kt)("p",null,"The DApp is made of a ",(0,o.kt)(d.Z,{to:"/docs/templates/ideabox",mdxType:"Link"},"smart contract")," and a web interface for voters to interact with the smart contract:"),(0,o.kt)(r.Z,{img:"ideabox-archi.svg",width:"80%",mdxType:"DappFigure"}),(0,o.kt)("p",null,"An idea is made of a title and a body. Ideas are stored in the contract's storage in ",(0,o.kt)("em",{parentName:"p"},"zipped")," format to reduce the contract size and reduce transaction costs. The positive side effect is that ideas are not on-chain readable as such."),(0,o.kt)("p",null,"Inspect the smart contract transactions in ",(0,o.kt)(d.Z,{to:"/docs/dapp-tools/bcd",mdxType:"Link"},"Better Call Dev"),":"),(0,o.kt)(s.Z,{url:"https://better-call.dev/edo2net/KT1QNURPMuFJSmTLRttRutb4gfJ6NS4BfsM6/operations",txt:"inspect smart contract",mdxType:"DappButton"}),(0,o.kt)("h3",{id:"benefits"},"Benefits"),(0,o.kt)("p",null,"The use of the Tezos blockchain makes it easy to setup a robust and auditable application because the blockchain serves as the server with just a 50 lines long smart contract."),(0,o.kt)("h3",{id:"discussion"},"Discussion"),(0,o.kt)("p",null,"Are votes anonymous?"),(0,o.kt)("p",null,"The publically available information is the account address that voted for/added an idea. If the association between the address and the person the address belongs to is unknown, then the process may be considered as ",(0,o.kt)("em",{parentName:"p"},"anonymized"),"."),(0,o.kt)("p",null,"As a consequence, it is advised that the voter uses a ",(0,o.kt)("em",{parentName:"p"},"dedicated")," address for the DApp."),(0,o.kt)("p",null,"Note that all the information about the address is available though: when did it vote, for which idea and so on."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"register")," entry point requires that the DApp chairman knows the identity that goes with the address in order to decide whether to register the address. The off-chain register process may consist for example in sending the chairmain an email with the address to register."),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"If voters use dedicated addresses, voters identity is only known by the DApp chairmain"))))}v.isMDXComponent=!0}}]);
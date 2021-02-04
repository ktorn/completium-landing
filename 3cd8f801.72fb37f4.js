(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{105:function(e,t,i){"use strict";i.r(t),i.d(t,"frontMatter",(function(){return c})),i.d(t,"metadata",(function(){return l})),i.d(t,"toc",(function(){return p})),i.d(t,"default",(function(){return d}));var a=i(3),n=i(7),r=(i(0),i(186)),s=(i(189),i(187)),o=i(188),c={id:"miles1",title:"Fidelity program",sidebar_label:"Fidelity program",slug:"/dapp-miles"},l={unversionedId:"dapp-miles/miles1",id:"dapp-miles/miles1",isDocsHomePage:!1,title:"Fidelity program",description:"Introduction",source:"@site/docs/dapp-miles/miles1.md",slug:"/dapp-miles",permalink:"/completium-landing/docs/dapp-miles",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/dapp-miles/miles1.md",version:"current",sidebar_label:"Fidelity program",sidebar:"miles",next:{title:"Use Case Presentation",permalink:"/completium-landing/docs/dapp-miles/usecase-presentation"}},p=[{value:"Introduction",id:"introduction",children:[]},{value:"DApp",id:"dapp",children:[{value:"Architecure",id:"architecure",children:[]},{value:"Benefits",id:"benefits",children:[]}]}],m={toc:p};function d(e){var t=e.components,i=Object(n.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},m,i,{components:t,mdxType:"MDXLayout"}),Object(r.b)(s.a,{img:"miles_screenshot.png",width:"100%",mdxType:"DappFigure"}),Object(r.b)(o.a,{url:"https://edukera.github.io/completium-dapp-miles/",txt:"open dapp",mdxType:"DappButton"}),Object(r.b)("h2",{id:"introduction"},"Introduction"),Object(r.b)("p",null,"Customers of a service (transport, gaming, grocery, ...) receive miles in reward for their activity with the service: miles are received for examples, for each travel in proportion of the distance traveled; or when completing an achievement in a game; or when achieving a certain amount of purchase; and so on. Miles may then for example be traded in for gifts or cash-back, or any kind of reward."),Object(r.b)("p",null,"Such miles rewarding program are put in place by Marketing departments to retain customers."),Object(r.b)("h2",{id:"dapp"},"DApp"),Object(r.b)("p",null,"This Dapp example provides the Tezos's smart contract for miles management, and a web interface to interact with the contract."),Object(r.b)("p",null,"In this example, each mile has an ",Object(r.b)("em",{parentName:"p"},"expiration date")," beyond which it cannot be consumed. The smart contract guarantees that only valid miles can be consumed."),Object(r.b)("p",null,"A smart contract on the Tezos blockchain is used to store and manage customers' miles lifecycle, namely miles creation and consumption operations."),Object(r.b)("h3",{id:"architecure"},"Architecure"),Object(r.b)("p",null,"The Dapp architecture is 3-tier:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Tezos' smart contract (to store and manage miles' lifecycle)"),Object(r.b)("li",{parentName:"ul"},"User web interface for customer to exchange miles (consume) for rewards"),Object(r.b)("li",{parentName:"ul"},"Standard application server to create miles according to customer activity")),Object(r.b)("p",null,"Interactions between these three elements are illustrated in the schema below:"),Object(r.b)(s.a,{img:"miles-dapp-architecture.svg",width:"60%",mdxType:"DappFigure"}),Object(r.b)("p",null,"The User Interface straightforwardly interacts with the smart contract to consume miles. The resulting blockchain's hash operation is sent to the App Server with other operation informations (selected product(s) id(s))."),Object(r.b)("p",null,"It uses a wallet technology (hardware or sofware) to forge, sign and send the operations to the blockchain."),Object(r.b)("p",null,"The Application Server interacts with the blockchain through a dedicated library that provides a high level API. It is ",Object(r.b)("u",null,"not provided")," in this example Dapp though."),Object(r.b)("h3",{id:"benefits"},"Benefits"),Object(r.b)("p",null,"The benefits of the on-chain miles' lifecycle management are:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"reliability of miles' management: the consumption rule is publically available to the customer in the smart contract code"),Object(r.b)("li",{parentName:"ul"},"the quantity of miles a customer has acquired may be used to prove activity to any other third party")),Object(r.b)("p",null,"A blockchain based miles registry is especially suited for mutualising activity accross mulitple brands and services since it solves miles ownership and miles management issues."))}d.isMDXComponent=!0}}]);
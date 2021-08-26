(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[7689],{1797:function(t,e,a){"use strict";a.r(e),a.d(e,{frontMatter:function(){return l},contentTitle:function(){return u},metadata:function(){return d},toc:function(){return m},default:function(){return h}});var n=a(2122),o=a(9756),i=(a(7294),a(3905)),r=a(7134),c=(a(3079),a(6742)),s=["components"],l={id:"contract1",title:"Introduction",sidebar_label:"Introduction",slug:"/contract",hide_title:!0},u=void 0,d={unversionedId:"contract/contract1",id:"contract/contract1",isDocsHomePage:!1,title:"Introduction",description:"A smart contract is a program that is executed by the blockchain. It is similar to a stored procedure on a public distributed database. As such, it must ensure the consistency of the business logic it implements.",source:"@site/docs/contract/contract1.md",sourceDirName:"contract",slug:"/contract",permalink:"/docs/contract",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/contract/contract1.md",version:"current",frontMatter:{id:"contract1",title:"Introduction",sidebar_label:"Introduction",slug:"/contract",hide_title:!0},sidebar:"contract",next:{title:"Programming language",permalink:"/docs/contract/programming-language"}},m=[{value:"Structure",id:"structure",children:[]},{value:"Business logic",id:"business-logic",children:[]},{value:"Cost",id:"cost",children:[]},{value:"Limits",id:"limits",children:[]}],p={toc:m};function h(t){var e=t.components,a=(0,o.Z)(t,s);return(0,i.kt)("wrapper",(0,n.Z)({},p,a,{components:e,mdxType:"MDXLayout"}),(0,i.kt)(r.Z,{img:"smart-contract.svg",width:"30%",mdxType:"DappFigure"}),(0,i.kt)("p",null,"A smart contract is a program that is executed by the blockchain. It is similar to a stored procedure on a public distributed database. As such, it must ensure the consistency of the ",(0,i.kt)("strong",{parentName:"p"},"business logic")," it implements."),(0,i.kt)("p",null,"Smart contracts unleash the full potential of the blockchain because they enable the development of a new class of applications, called ",(0,i.kt)("em",{parentName:"p"},"Decentralized Applications")," (DApps), which benefit from blockchain's strengths (decentralization, trust-less, immutability, governance by consensus in ",(0,i.kt)(c.Z,{to:"/docs/dapp-tools/tezos",mdxType:"Link"},"Tezos")," case, ...)."),(0,i.kt)("h2",{id:"structure"},"Structure"),(0,i.kt)("p",null,"A smart contract possesses:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"an ",(0,i.kt)("em",{parentName:"li"},"address")),(0,i.kt)("li",{parentName:"ol"},"a ",(0,i.kt)("em",{parentName:"li"},"balance")," of currency"),(0,i.kt)("li",{parentName:"ol"},"a ",(0,i.kt)("em",{parentName:"li"},"storage")," of data"),(0,i.kt)("li",{parentName:"ol"},"a ",(0,i.kt)("em",{parentName:"li"},"code")," to implement the contract's ",(0,i.kt)("em",{parentName:"li"},"business logic"),", structured as ",(0,i.kt)("em",{parentName:"li"},"entrypoints")," to call")),(0,i.kt)("p",null,"Contract storage, code and transactions (incoming and outcoming) are all ",(0,i.kt)("em",{parentName:"p"},"publically")," available."),(0,i.kt)("h2",{id:"business-logic"},"Business logic"),(0,i.kt)("p",null,"Besides the storage data, the following information is available to the contract's business logic:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"when")," the contract is called"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"who")," the contract is called by"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"how much")," currency is ",(0,i.kt)("strong",{parentName:"li"},"transferred")," to the contract"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"how much")," currency the contract ",(0,i.kt)("strong",{parentName:"li"},"owns")," (balance)")),(0,i.kt)("p",null,"The contract can be programmed to send currency to an account or to another contract."),(0,i.kt)("h2",{id:"cost"},"Cost"),(0,i.kt)("p",null,"Originating (deploying) a smart contract has a cost which depends on the size of the code and the size of the initial storage."),(0,i.kt)("p",null,"Calling a smart contract has a cost which depends on:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the complexity of the execution (number and nature of instructions executed by the program)"),(0,i.kt)("li",{parentName:"ul"},"the size of additional data it creates"),(0,i.kt)("li",{parentName:"ul"},"a constant fee")),(0,i.kt)("p",null,"Currently on ",(0,i.kt)(c.Z,{to:"/docs/dapp-tools/tezos",mdxType:"Link"},"Tezos"),", the cost of origination is 0.000250 \ua729 per byte of data. The constant fee is the ",(0,i.kt)("em",{parentName:"p"},"baker fee")," equal to 0.001189 \ua729 (it may be increased to increase transaction priority)."),(0,i.kt)("p",null,"Note that once data storage is allocated to the contract, it does not decrease; if data has been removed by the contract, additional data does not require payment while total data size remains below allocated storage size."),(0,i.kt)("h2",{id:"limits"},"Limits"),(0,i.kt)("p",null,"The ",(0,i.kt)("em",{parentName:"p"},"gas")," is the unit to measure code execution and storage allocation for any kind of transactions (origination, call to an entrypoint)."),(0,i.kt)("p",null,"Currently on ",(0,i.kt)(c.Z,{to:"/docs/dapp-tools/tezos",mdxType:"Link"},"Tezos"),", the gas per transaction is limited to 1040000."))}h.isMDXComponent=!0}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{94:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return s})),a.d(t,"metadata",(function(){return l})),a.d(t,"toc",(function(){return p})),a.d(t,"default",(function(){return d}));var n=a(3),o=a(7),r=(a(0),a(197)),c=a(200),i=a(199),s={id:"tools9",title:"Taquito",sidebar_label:"Taquito",slug:"/dapp-tools/taquito"},l={unversionedId:"dapp-tools/tools9",id:"dapp-tools/tools9",isDocsHomePage:!1,title:"Taquito",description:"Taquito is a TypeScript library suite for development on the Tezos blockchain.",source:"@site/docs/dapp-tools/tools9.md",slug:"/dapp-tools/taquito",permalink:"/docs/dapp-tools/taquito",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/dapp-tools/tools9.md",version:"current",sidebar_label:"Taquito",sidebar:"tools",previous:{title:"React",permalink:"/docs/dapp-tools/react"},next:{title:"Temple Wallet",permalink:"/docs/dapp-tools/thanos"}},p=[{value:"Integration in DApps",id:"integration-in-dapps",children:[]},{value:"Contract origination",id:"contract-origination",children:[]},{value:"Call contract",id:"call-contract",children:[{value:"Basics",id:"basics",children:[]},{value:"Transfer amount",id:"transfer-amount",children:[]},{value:"Several Transactions",id:"several-transactions",children:[]}]},{value:"Read contract storage",id:"read-contract-storage",children:[{value:"Variables",id:"variables",children:[]},{value:"Collection of assets",id:"collection-of-assets",children:[]}]}],b={toc:p};function d(e){var t=e.components,a=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(n.a)({},b,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("a",{href:"https://tezostaquito.io/"},"Taquito")," is a TypeScript library suite for development on the Tezos blockchain.",Object(r.b)(c.a,{img:"taquito-logo.png",width:"50%",mdxType:"DappFigure"}),Object(r.b)("h2",{id:"integration-in-dapps"},"Integration in DApps"),Object(r.b)("p",null,"The ",Object(r.b)(i.a,{to:"/docs/dapp-tools/thanos",mdxType:"Link"},"Temple")," wallet, used in the ",Object(r.b)(i.a,{to:"/dapps",mdxType:"Link"},"DApps"),", integrates Taquito which is then used to interact with the smart contract."),Object(r.b)("p",null,"The Taquito object is retrieved with a mecanism defined in the file ",Object(r.b)("inlineCode",{parentName:"p"},"/src/dapps.js"),". All DApps use a global state managed with the ",Object(r.b)("a",{href:"https://www.npmjs.com/package/constate",target:"_blank"},"constate")," library."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"dapp.js")," registers in the constate global state an accessor ",Object(r.b)("inlineCode",{parentName:"p"},"useTezos"),", so that any module can retrieve it easily, without passing it down from root ",Object(r.b)(i.a,{to:"/docs/dapp-tools/react",mdxType:"Link"},"React")," element:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js",metastring:"{4}","{4}":!0}),"import { useTezos } from '../dapp';\n\nconst ReactComponent = (props) => {\n  const tezos = useTezos();\n  ...\n}\n")),Object(r.b)("p",null,"As a side note, here is the way to retrieve the account address (public key) the user has signed in with:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js",metastring:"{4}","{4}":!0}),"import { useAccountPkh } from '../dapp';\n\nconst ReactComponent = (props) => {\n  const account = useAccountPkh();\n  ...\n}\n")),Object(r.b)("p",null,"Note that the user account is managed by the ",Object(r.b)(i.a,{to:"/docs/dapp-tools/thanos",mdxType:"Link"},"Temple")," wallet, not by Taquito. The wallet internally passes the account's private key to Taquito to sign transactions."),Object(r.b)("h2",{id:"contract-origination"},"Contract origination"),Object(r.b)("p",null,"Taquito originates contracts provided in the Micheline format, a json version of ",Object(r.b)(i.a,{to:"/docs/dapp-tools/tezos#micheslon",mdxType:"Link"},"Michelson"),"."),Object(r.b)("p",null,"The ",Object(r.b)(i.a,{to:"/docs/dapp-tools/completium-cli",mdxType:"Link"},"Completium CLI")," command to generate Micheline from ",Object(r.b)("inlineCode",{parentName:"p"},"contract.arl"),":"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),"$ completium-cli generate javascript contract.arl > contract.js\n")),Object(r.b)("p",null,"The generated ",Object(r.b)("inlineCode",{parentName:"p"},"contract.js")," file exports:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"the Micheline/Json ",Object(r.b)("inlineCode",{parentName:"li"},"code")," of the contract"),Object(r.b)("li",{parentName:"ul"},"the ",Object(r.b)("inlineCode",{parentName:"li"},"getStorage")," methode to build the initial storage")),Object(r.b)("p",null,"These two elements are passed to the Taquito's originate method:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js",metastring:"{3-5}","{3-5}":!0}),"import { code, getStorage } from 'contract.js';\n\ntezos.wallet.originate({\n  code: code,\n  storage: getStorage(...)\n}).send().then(op => {\n  console.log(`Waiting for confirmation of origination...`);\n  return op.contract()\n}).then (contract => {\n  console.log(`Origination completed for ${contract.address}.`);\n}).catch(error => console.log(`Error: ${JSON.stringify(error, null, 2)}`));\n")),Object(r.b)("p",null,"Examples of contract origination are found is the following DApps:"),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"DApp"),Object(r.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Origination description"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(r.b)(i.a,{to:"/docs/dapp-escrow/interactions#contract-origination",mdxType:"Link"},"Online purchase")),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"The escrow contract for payment is originated when customers decides to purchase.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(r.b)(i.a,{to:"/docs/dapp-zcb/interactions#contract-origination",mdxType:"Link"},"Zero-coupon-bond")),Object(r.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"The Zero-coupon bond contract is originated when contract parameters are set in the editor.")))),Object(r.b)("h2",{id:"call-contract"},"Call contract"),Object(r.b)("p",null,"It is very straightforward to call contracts entry points with Taquito."),Object(r.b)("h3",{id:"basics"},"Basics"),Object(r.b)("p",null,"For example, the ",Object(r.b)(i.a,{to:"/docs/dapp-ideabox/",mdxType:"Link"},"Idea Box")," DApp's smart contract, developed in ",Object(r.b)(i.a,{to:"/docs/dapp-tools/archetype",mdxType:"Link"},"Archetype")," language, defines an entry point ",Object(r.b)("inlineCode",{parentName:"p"},"vote")," to vote for an idea:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"entry vote(n : nat, weight : nat) {\n  require {\n    r2 : voter.contains(caller);\n    r3 : voter[caller].remaining >= weight;\n    r4 : state = Activated;\n  }\n  effect {\n    voter[caller].remaining -= weight;\n    idea[n].nbvotes += weight;\n  }\n}\n")),Object(r.b)("p",null,"The entry point requires two natural integer parameters:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"the idea identifier"),Object(r.b)("li",{parentName:"ul"},"the weight the user wishes to associate to the vote (max. 5)")),Object(r.b)("p",null,"The following code calls the ",Object(r.b)("inlineCode",{parentName:"p"},"vote")," entry point:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js",metastring:"{2}","{2}":!0}),"tezos.wallet.at(contractAddress).then(contract => {\n  contract.methods.vote(props.id, props.weight).send().then(op => {\n    console.log(`waiting for ${op.opHash} to be confirmed`);\n    op.receipt().then(() => {\n        props.handleReceipt();\n    });\n  })\n});\n")),Object(r.b)("p",null,"Note that while the contract defines parameters as ",Object(r.b)("inlineCode",{parentName:"p"},"nat")," (natural integers), the javascript type is simply ",Object(r.b)("inlineCode",{parentName:"p"},"integer"),"; Taquito emits an error if the conversion to Michelson type is not possible."),Object(r.b)("p",null,"Typically here an error is emitted if ",Object(r.b)("inlineCode",{parentName:"p"},"-1")," is passed as argument for example."),Object(r.b)("h3",{id:"transfer-amount"},"Transfer amount"),Object(r.b)("p",null,"Some entry points require to send an amount of tez for the contract to execute properly according to the business logic."),Object(r.b)("p",null,"For example, the ",Object(r.b)("inlineCode",{parentName:"p"},"start")," entry point of the ",Object(r.b)(i.a,{to:"/docs/dapp-iot/",mdxType:"Link"},"Connected Object")," DApp requires to transfer some Tez to switch on the bulb. The amount is passed as argument of the ",Object(r.b)("inlineCode",{parentName:"p"},"send")," method:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js",metastring:"{5}","{5}":!0}),"import { UnitValue } from '@taquito/taquito';\n\ntezos.wallet.at(contractAddress).then(contract => {\n    var price = (props.switch.rate * duration).toFixed(6);\n    contract.methods.start(UnitValue).send({ amount : price }).then(op => {\n      console.log(`waiting for ${op.opHash} to be confirmed`);\n      op.receipt().then(() => {\n        props.handleReceipt();\n      });\n    })\n});\n")),Object(r.b)("p",null,"Note that ",Object(r.b)("inlineCode",{parentName:"p"},"UnitValue")," is necessary to pass when the entry point does not have any argument."),Object(r.b)("p",null,"The default amount unit is Tez. It is possible to pass Mutez (1 Tez = 10^6 Mutez) by adding ",Object(r.b)("inlineCode",{parentName:"p"},"mutez: true")," to the ",Object(r.b)("inlineCode",{parentName:"p"},"send")," argument."),Object(r.b)("h3",{id:"several-transactions"},"Several Transactions"),Object(r.b)("p",null,"It is possible to execute several transactions in one operation."),Object(r.b)("p",null,"For example in the ",Object(r.b)(i.a,{to:"/docs/dapp-dex/",mdxType:"Link"},"DEX")," DApp, the exchange process requires calling two contracts: the ",Object(r.b)("em",{parentName:"p"},"FA 1.2")," and the ",Object(r.b)("em",{parentName:"p"},"DEX"),". The following code illustrates how to execute that:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"// FA 1.2 transaction definition\nconst fa12 = await tezos.wallet.at(fa12address);\nconst fa12params = fa12.methods.approve(UnitValue).toTransferParams();\nfa12params.kind = OpKind.TRANSACTION;\n\n// DEX transaction definition\nconst dex = await tezos.wallet.at(dexaddress);\nconst dexparams = dex.methods.exchange(UnitValue).toTransferParams();\ndexparams.kind = OpKind.TRANSACTION;\n\n// Group them in a batch operation and send\nconst batch = await tezos.wallet.batch([fa12params, dexparams]);\nconst op = await batch.send();\nprops.openSnack();\nop.receipt().then(() => {\n  props.handleReceipt();\n})\n")),Object(r.b)("p",null,"The parameters of ",Object(r.b)("inlineCode",{parentName:"p"},"approve")," and ",Object(r.b)("inlineCode",{parentName:"p"},"exchange")," have been simplified to ",Object(r.b)("inlineCode",{parentName:"p"},"UnitValue")," for demo purpose."),Object(r.b)("h2",{id:"read-contract-storage"},"Read contract storage"),Object(r.b)("h3",{id:"variables"},"Variables"),Object(r.b)("p",null,"For example in the ",Object(r.b)(i.a,{to:"/docs/dapp-iot/",mdxType:"Link"},"Connected Object")," DApp, it is necessary to read the dates of service to know whether the object is currently in use."),Object(r.b)("p",null,"These variables are declared in the smart contract with the ",Object(r.b)(i.a,{to:"/docs/dapp-tools/archetype",mdxType:"Link"},"Archetype")," language:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable dateofstop   : date = now\n\nvariable dateofstart  : date = now\n")),Object(r.b)("p",null,"These values are stored in the contract storage (click ",Object(r.b)("a",{href:"https://better-call.dev/edo2net/KT19ZQUnVrDT5xnfvPqYhn1DeM489875oWGU/storage",target:"_blank"},"here")," to view an instance in ",Object(r.b)(i.a,{to:"",mdxType:"Link"},"Better Call dev")," indexer)."),Object(r.b)("p",null,"Taquito provides the contract storage as a ",Object(r.b)("em",{parentName:"p"},"POJO")," for direct access to the contract data:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js",metastring:"{4,5}","{4,5}":!0}),"var contract  = await Tezos.contract.at(contractAddress);\nvar storage   = await contract.storage();\n\nvar dateofstart = new Date(storage.dateofstart);\nvar dateofstop = new Date(storage.dateofstop);\n")),Object(r.b)("h3",{id:"collection-of-assets"},"Collection of assets"),Object(r.b)("p",null,"For example in the the ",Object(r.b)(i.a,{to:"/docs/dapp-ideabox/",mdxType:"Link"},"Idea Box")," DApp, the smart contract stores the idea and the votes."),Object(r.b)("p",null,"The collection of ideas is declared in ",Object(r.b)(i.a,{to:"/docs/dapp-tools/archetype",mdxType:"Link"},"Archetype")," language the following way:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"asset idea {\n  id       : nat;\n  title    : bytes;\n  desc     : bytes;\n  nbvotes  : nat = 0;\n  creation : date;\n  author   : address;\n}\n")),Object(r.b)("p",null,"The asset collection is compiled to a (Michelson) map from ",Object(r.b)("inlineCode",{parentName:"p"},"id")," to a 'record' ",Object(r.b)("inlineCode",{parentName:"p"},"{ title; desc; nbvotes; creation; author }"),". It is possible to iterate over the map with the ",Object(r.b)("a",{href:"https://tezostaquito.io/docs/michelsonmap/#the-keyvalue-methods",target:"_blank"},"forEach")," operator:"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"var contract  = await Tezos.contract.at(contractAddress);\nvar storage   = await contract.storage();\n\nstorage.idea.forEach((i, k, _) => {\n  ids.push({\n    id:       k,\n    title:    fromHexString(i.title),\n    desc:     fromHexString(i.desc),\n    author:   i.author,\n    nbvotes:  parseInt(i.nbvotes,10),\n    creation: (i.creation+'').substring(0,10),\n    winner:   false\n  });\n});\n")),Object(r.b)("p",null,"The code above stores each id in a local javascript list of records ",Object(r.b)("inlineCode",{parentName:"p"},"ids"),". ",Object(r.b)("inlineCode",{parentName:"p"},"k")," is the idea identifier (named ",Object(r.b)("inlineCode",{parentName:"p"},"id")," in the Archetype contract)."))}d.isMDXComponent=!0}}]);
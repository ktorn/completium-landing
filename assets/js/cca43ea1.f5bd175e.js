"use strict";(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[1399],{3079:function(e,t,n){var a=n(7294),o=n(282),r=n(8500),i=n(3457),s=n(9960),d=n(4996);t.Z=function(e){var t=a.useMemo((function(){return(0,r.Z)({palette:{type:"dark"}})}),[!0]);return a.createElement("div",{style:{textAlign:"center",paddingTop:"0px",paddingBottom:"40px"}},a.createElement(i.Z,{theme:t},e.internal?a.createElement(o.Z,{variant:"outlined",size:"large",component:s.Z,to:(0,d.Z)("docs/"+e.url+"/")},e.txt):a.createElement(o.Z,{variant:"outlined",size:"large",onClick:function(){return window.open(e.url,"_blank")}},e.txt)))}},807:function(e,t,n){n(7294),n(4996)},1792:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return d},metadata:function(){return c},toc:function(){return l},default:function(){return u}});var a=n(7462),o=n(3366),r=(n(7294),n(3905)),i=(n(807),n(7134),n(3079),["components"]),s={id:"ideabox7",title:"Interactions",sidebar_label:"Interactions",slug:"/dapp-ideabox/interactions"},d=void 0,c={unversionedId:"dapp-ideabox/ideabox7",id:"dapp-ideabox/ideabox7",title:"Interactions",description:"Read contract storage",source:"@site/docs/dapp-ideabox/ideabox7.md",sourceDirName:"dapp-ideabox",slug:"/dapp-ideabox/interactions",permalink:"/docs/dapp-ideabox/interactions",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-ideabox/ideabox7.md",tags:[],version:"current",frontMatter:{id:"ideabox7",title:"Interactions",sidebar_label:"Interactions",slug:"/dapp-ideabox/interactions"},sidebar:"dapps",previous:{title:"Contract Origination",permalink:"/docs/dapp-ideabox/origination"},next:{title:"Introduction",permalink:"/docs/dapp-game"}},l=[{value:"Read contract storage",id:"read-contract-storage",children:[],level:2},{value:"Add an Idea",id:"add-an-idea",children:[],level:2},{value:"Vote",id:"vote",children:[],level:2}],p={toc:l};function u(e){var t=e.components,n=(0,o.Z)(e,i);return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"read-contract-storage"},"Read contract storage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"async function loadIdeaxBoxContent () {\n    try {\n      ///////////////////////////////////////////////////////////////////////////\n      // FIX ME\n      // Read contract's storage to fill the following local variables:\n      // var winners = [];\n      // var ids = [];\n      // var votes = [];\n      // var state = 0;\n      // Invoke 'setStorage' method\n      // setStorage({\n      //  status: state,\n      //  ideas: ids,\n      //  votes: votes,\n      // });\n      ///////////////////////////////////////////////////////////////////////////\n    } catch (error) {\n      console.log(`Error: ${error}`);\n    }\n}\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"{5,7,19}","{5,7,19}":!0},"const Tezos = new TezosToolkit('https://testnet-tezos.giganode.io');\nvar contract  = await Tezos.contract.at(contractAddress);\nvar cstorage   = await contract.storage();\nvar winners = [];\ncstorage.selected.forEach(w => winners.push(parseInt(0+w)));\nvar ids = [];\ncstorage.idea.forEach((i, k, m) => {\n  ids.push({\n    id:       k,\n    title:    decompressFromUint8Array(fromHexString(i.title)),\n    desc:     decompressFromUint8Array(fromHexString(i.desc)),\n    author:   i.author,\n    nbvotes:  parseInt(0+i.nbvotes,10),\n    creation: (i.creation+'').substring(0,10),\n    winner:   winners.includes(parseInt(k))\n  });\n});\nvar votes = [];\ncstorage.voter.forEach((v,k,m) => {\n    votes[k] = parseInt(0+v,10)\n});\nids = SortIdeas(ids,'sort by creation');\nconsole.log(ids);\nsetStorage({\n  status: (0+cstorage._state === '00'),\n  ideas: ids,\n  votes: votes,\n});\n")),(0,r.kt)("h2",{id:"add-an-idea"},"Add an Idea"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"src/components/IdeaForm.js")," line 65"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"  const handleSubmit = () => {\n    console.info(state);\n    ///////////////////////////////////////////////////////////////////////////\n    // FIX ME\n    // Invoke 'add_idea' method with title and description arguments\n    // title is stored in `state.title` variable and description in `state.desc`\n    // These parameters must be compressed and Hex-encoded with:\n    // x => toHexString(compressToUint8Array(x)) function\n    ///////////////////////////////////////////////////////////////////////////\n    props.onclose();\n  }\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"{1,4}","{1,4}":!0},"tezos.wallet.at(contractAddress).then(contract => {\n  var t = toHexString(compressToUint8Array(state.title));\n  var d = toHexString(compressToUint8Array(state.desc));\n  contract.methods.add_idea(t, d).send().then(op => {\n    console.log(`waiting for ${op.opHash} to be confirmed`);\n    props.openSnack();\n    op.receipt().then(() => {\n      props.handleReceipt();\n    }).catch(error => console.log(`Error: ${error}`));\n  }).catch(error => console.log(`Error: ${error}`))\n});\n")),(0,r.kt)("h2",{id:"vote"},"Vote"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"src/components/Idea.js")," line 17"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"  const handleVote = () => {\n    ///////////////////////////////////////////////////////////////////////////\n    // FIX ME\n    // Invoke 'vote' method with:\n    // * idea identifier\n    // * vote weight (set to 1)\n    ///////////////////////////////////////////////////////////////////////////\n  }\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"{1,2}","{1,2}":!0},"  tezos.wallet.at(contractAddress).then(contract => {\n      contract.methods.vote(props.id, 1).send().then( op => {\n        console.log(`waiting for ${op.opHash} to be confirmed`);\n        props.openSnack();\n        op.receipt().then(() => {\n          props.handleReceipt();\n        });\n      })\n  });\n")))}u.isMDXComponent=!0}}]);
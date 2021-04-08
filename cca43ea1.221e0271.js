(window.webpackJsonp=window.webpackJsonp||[]).push([[125],{193:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return p}));var a=n(3),o=n(7),r=(n(0),n(224)),s=(n(226),n(227),n(228),{id:"ideabox7",title:"Interactions",sidebar_label:"Interactions",slug:"/dapp-ideabox/interactions"}),i={unversionedId:"dapp-ideabox/ideabox7",id:"dapp-ideabox/ideabox7",isDocsHomePage:!1,title:"Interactions",description:"Read contract storage",source:"@site/docs/dapp-ideabox/ideabox7.md",slug:"/dapp-ideabox/interactions",permalink:"/docs/dapp-ideabox/interactions",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/dapp-ideabox/ideabox7.md",version:"current",sidebar_label:"Interactions",sidebar:"dapps",previous:{title:"Contract Origination",permalink:"/docs/dapp-ideabox/origination"},next:{title:"2048 Competition",permalink:"/docs/dapp-game"}},c=[{value:"Read contract storage",id:"read-contract-storage",children:[]},{value:"Add an Idea",id:"add-an-idea",children:[]},{value:"Vote",id:"vote",children:[]}],d={toc:c};function p(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},d,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"read-contract-storage"},"Read contract storage"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"async function loadIdeaxBoxContent () {\n    try {\n      ///////////////////////////////////////////////////////////////////////////\n      // FIX ME\n      // Read contract's storage to fill the following local variables:\n      // var winners = [];\n      // var ids = [];\n      // var votes = [];\n      // var state = 0;\n      // Invoke 'setStorage' method\n      // setStorage({\n      //  status: state,\n      //  ideas: ids,\n      //  votes: votes,\n      // });\n      ///////////////////////////////////////////////////////////////////////////\n    } catch (error) {\n      console.log(`Error: ${error}`);\n    }\n}\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js",metastring:"{5,7,19}","{5,7,19}":!0}),"const Tezos = new TezosToolkit('https://delphinet-tezos.giganode.io');\nvar contract  = await Tezos.contract.at(contractAddress);\nvar cstorage   = await contract.storage();\nvar winners = [];\ncstorage.selected.forEach(w => winners.push(parseInt(0+w)));\nvar ids = [];\ncstorage.idea.forEach((i, k, m) => {\n  ids.push({\n    id:       k,\n    title:    decompressFromUint8Array(fromHexString(i.title)),\n    desc:     decompressFromUint8Array(fromHexString(i.desc)),\n    author:   i.author,\n    nbvotes:  parseInt(0+i.nbvotes,10),\n    creation: (i.creation+'').substring(0,10),\n    winner:   winners.includes(parseInt(k))\n  });\n});\nvar votes = [];\ncstorage.voter.forEach((v,k,m) => {\n    votes[k] = parseInt(0+v,10)\n});\nids = SortIdeas(ids,'sort by creation');\nconsole.log(ids);\nsetStorage({\n  status: (0+cstorage._state === '00'),\n  ideas: ids,\n  votes: votes,\n});\n")),Object(r.b)("h2",{id:"add-an-idea"},"Add an Idea"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"src/components/IdeaForm.js")," line 65"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"  const handleSubmit = () => {\n    console.info(state);\n    ///////////////////////////////////////////////////////////////////////////\n    // FIX ME\n    // Invoke 'add_idea' method with title and description arguments\n    // title is stored in `state.title` variable and description in `state.desc`\n    // These parameters must be compressed and Hex-encoded with:\n    // x => toHexString(compressToUint8Array(x)) function\n    ///////////////////////////////////////////////////////////////////////////\n    props.onclose();\n  }\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js",metastring:"{1,4}","{1,4}":!0}),"tezos.wallet.at(contractAddress).then(contract => {\n  var t = toHexString(compressToUint8Array(state.title));\n  var d = toHexString(compressToUint8Array(state.desc));\n  contract.methods.add_idea(t, d).send().then(op => {\n    console.log(`waiting for ${op.opHash} to be confirmed`);\n    props.openSnack();\n    op.receipt().then(() => {\n      props.handleReceipt();\n    }).catch(error => console.log(`Error: ${error}`));\n  }).catch(error => console.log(`Error: ${error}`))\n});\n")),Object(r.b)("h2",{id:"vote"},"Vote"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"src/components/Idea.js")," line 17"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"  const handleVote = () => {\n    ///////////////////////////////////////////////////////////////////////////\n    // FIX ME\n    // Invoke 'vote' method with:\n    // * idea identifier\n    // * vote weight (set to 1)\n    ///////////////////////////////////////////////////////////////////////////\n  }\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js",metastring:"{1,2}","{1,2}":!0}),"  tezos.wallet.at(contractAddress).then(contract => {\n      contract.methods.vote(props.id, 1).send().then( op => {\n        console.log(`waiting for ${op.opHash} to be confirmed`);\n        props.openSnack();\n        op.receipt().then(() => {\n          props.handleReceipt();\n        });\n      })\n  });\n")))}p.isMDXComponent=!0},226:function(e,t,n){"use strict";n(0),n(230)}}]);
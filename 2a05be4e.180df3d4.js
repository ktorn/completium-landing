(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{229:function(e,n,t){"use strict";t(0),t(233)},99:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return s})),t.d(n,"metadata",(function(){return c})),t.d(n,"toc",(function(){return l})),t.d(n,"default",(function(){return p}));var a=t(3),o=t(7),r=(t(0),t(227)),s=(t(229),t(230),t(231),{id:"nonfungible7",title:"Interactions",sidebar_label:"Interactions",slug:"/dapp-nonfungible/interactions"}),c={unversionedId:"dapp-nonfungible/nonfungible7",id:"dapp-nonfungible/nonfungible7",isDocsHomePage:!1,title:"Interactions",description:"Read storage",source:"@site/docs/dapp-nonfungible/nonfungible7.md",slug:"/dapp-nonfungible/interactions",permalink:"/docs/dapp-nonfungible/interactions",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-nonfungible/nonfungible7.md",version:"current",sidebar_label:"Interactions",sidebar:"dapps",previous:{title:"Contract Origination",permalink:"/docs/dapp-nonfungible/origination"},next:{title:"Decentralised Exchange",permalink:"/docs/dapp-dex"}},l=[{value:"Read storage",id:"read-storage",children:[]},{value:"Sell transacation",id:"sell-transacation",children:[]},{value:"Buy transaction",id:"buy-transaction",children:[]}],i={toc:l};function p(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},i,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"read-storage"},"Read storage"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"src/Apps.js")," line 62"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"if (!isReady()) {\n    ///////////////////////////////////////////////////////////////////////////\n    // FIX ME\n    // Read conract storage:\n    // * forsales : the list of item for sales\n    // * botwallet : list of purchased items\n    // call 'setNonFungibleState' to set UI state\n    ///////////////////////////////////////////////////////////////////////////\n}\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"Tezos.contract\n.at(contractAddress)\n.then(contract => {\n  contract.storage().then(storage => {\n    var forsales = [];\n    var botwallet = [];\n    // operator is an array\n    storage.operator.forEach(element => {\n      forsales.push(element[1].toString());\n    });\n    // ledger is a map\n    // read ledger for ownership information\n    if (ready) {\n      storage.ledger.forEach((l,k,m) => {\n        if(l === accountAddress) {\n          botwallet.push(k);\n        }\n      })\n    }\n    setNonFungibleState({\n      forsales  : forsales,\n      botwallet : botwallet,\n      basket    : nonFungibleState.basket,\n      ready     : true\n    });\n  })\n})\n.catch(error => console.log(`Error: ${error}`));\n")),Object(r.b)("h2",{id:"sell-transacation"},"Sell transacation"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"src/components/Robots.js")," line"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const handleSell = () => {\n    ///////////////////////////////////////////////////////////////////////////\n    // FIX ME\n    // Call 'sell' entry point\n    ///////////////////////////////////////////////////////////////////////////\n}\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"tezos.wallet.at(contractAddress).then(contract => {\n      contract.methods.sell(props.data.id).send().then(op => {\n        props.openSnack();\n        op.receipt().then(() => {\n          props.closeSnack();\n          setNotReady();\n        })\n      })\n});\n")),Object(r.b)("h2",{id:"buy-transaction"},"Buy transaction"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"src/components/Account.js")," line 76"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const handleBuy = () => {\n    ///////////////////////////////////////////////////////////////////////////\n    // FIX ME\n    // Call 'buy' entry point\n    ///////////////////////////////////////////////////////////////////////////\n    setOpen(false);\n}\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"tezos.wallet.at(contractAddress).then(contract => {\n    var amount = getTotal(robotributes, nonFungibleState.basket).toFixed(1);\n    contract.methods.buy(nonFungibleState.basket).send({ amount: amount, mutez: false }).then(op => {\n      props.openSnack();\n      op.receipt().then(() => {\n        props.closeSnack();\n        setNotReady();\n      })\n    })\n});\n")))}p.isMDXComponent=!0}}]);
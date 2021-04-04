(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{152:function(e,t,o){"use strict";o.r(t),o.d(t,"frontMatter",(function(){return i})),o.d(t,"metadata",(function(){return s})),o.d(t,"toc",(function(){return p})),o.d(t,"default",(function(){return d}));var n=o(3),c=o(7),a=(o(0),o(207)),r=(o(211),o(210),o(208)),i={id:"escrow6",title:"Contract Compilation",sidebar_label:"Contract Compilation",slug:"/dapp-escrow/compilation"},s={unversionedId:"dapp-escrow/escrow6",id:"dapp-escrow/escrow6",isDocsHomePage:!1,title:"Contract Compilation",description:"The smart contract is written in Archetype language. Go to the Smart contract section for a detailed presentation.",source:"@site/docs/dapp-escrow/escrow6.md",slug:"/dapp-escrow/compilation",permalink:"/docs/dapp-escrow/compilation",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/dapp-escrow/escrow6.md",version:"current",sidebar_label:"Contract Compilation",sidebar:"escrow",previous:{title:"Technical guide",permalink:"/docs/dapp-escrow/tg-presentation"},next:{title:"Interactions",permalink:"/docs/dapp-escrow/interactions"}},p=[],l={toc:p};function d(e){var t=e.components,o=Object(c.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},l,o,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"The smart contract is written in ",Object(a.b)("a",{href:"https://archetype-lang.org/"},"Archetype")," language. Go to the ",Object(a.b)(r.a,{to:"",mdxType:"Link"},"Smart contract")," section for a detailed presentation."),Object(a.b)("p",null,"In order to generate the javascript, used in the dapp, here is the ",Object(a.b)(r.a,{to:"/docs/cli/contract#generate-javascript",mdxType:"Link"},"command"),":"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),"completium-cli generate javascript ./contract/escrow.arl > ./src/contract.js\n")),Object(a.b)("p",null,"you can now use contract as below:"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"import { code, getStorage } from '../contract';\n...\ntezos.wallet.originate({\n      code: code,\n      init: getStorage(\n        seller,                                // seller\n        account,                               // buyer\n        taxCollector,                          // taxcollector\n        (parseInt(price) * 1000000).toString() // price\n      )\n    }).send().then(op => {\n...\n\n")))}d.isMDXComponent=!0}}]);
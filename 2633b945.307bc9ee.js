(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{95:function(t,e,o){"use strict";o.r(e),o.d(e,"frontMatter",(function(){return s})),o.d(e,"metadata",(function(){return i})),o.d(e,"toc",(function(){return u})),o.d(e,"default",(function(){return l}));var c=o(3),n=o(7),a=(o(0),o(227)),r=o(228),s={id:"tuto9",title:"Testing a contract",sidebar_label:"9. Testing a contract",slug:"/contract/tuto/archetype-test"},i={unversionedId:"contract/tuto/tuto9",id:"contract/tuto/tuto9",isDocsHomePage:!1,title:"Testing a contract",description:"In this exercise, a test is written to test the asset contract (step 7).",source:"@site/docs/contract/tuto/tuto9.md",slug:"/contract/tuto/archetype-test",permalink:"/docs/contract/tuto/archetype-test",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/contract/tuto/tuto9.md",version:"current",sidebar_label:"9. Testing a contract"},u=[{value:"Code",id:"code",children:[]},{value:"Excute",id:"excute",children:[]}],d={toc:u};function l(t){var e=t.components,o=Object(n.a)(t,["components"]);return Object(a.b)("wrapper",Object(c.a)({},d,o,{components:e,mdxType:"MDXLayout"}),Object(a.b)("p",null,"In this exercise, a test is written to test the ",Object(a.b)(r.a,{to:"/docs/contract/tuto/archetype-assets",mdxType:"Link"},"asset")," contract (step 7)."),Object(a.b)("p",null,"The test is written in javascript with the ",Object(a.b)(r.a,{to:"/docs/dapp-tools/taquito",mdxType:"Link"},"Taquito")," library and executed with node."),Object(a.b)("h2",{id:"code"},"Code"),Object(a.b)("p",null,"The goal is to originate the contract from archetype source and to call the entry points in order to check the resulating contract storage. The test succeeds if the storage has in a specific state."),Object(a.b)("pre",null,Object(a.b)("code",Object(c.a)({parentName:"pre"},{className:"language-js"}),"const { TezosToolkit } = require('@taquito/taquito');\nconst tezos = new TezosToolkit('https://api.tez.ie/rpc/edonet');\n\ntezos.tz\n  .getBalance('tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY')\n  .then((balance) => console.log(`${balance.toNumber() / 1000000} \ua729`))\n  .catch((error) => console.log(JSON.stringify(error)));\n")),Object(a.b)("h2",{id:"excute"},"Excute"),Object(a.b)("pre",null,Object(a.b)("code",Object(c.a)({parentName:"pre"},{}),"")))}l.isMDXComponent=!0}}]);
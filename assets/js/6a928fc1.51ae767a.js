(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[246],{4278:function(t,e,n){"use strict";n.r(e),n.d(e,{frontMatter:function(){return r},contentTitle:function(){return l},metadata:function(){return p},toc:function(){return m},default:function(){return u}});var a=n(2122),o=n(9756),c=(n(7294),n(3905)),i=n(6742),s=["components"],r={id:"contract3",title:"Test Scenario",sidebar_label:"Test Scenario",slug:"/contract/test-scenario",hide_title:!1},l=void 0,p={unversionedId:"contract/contract3",id:"contract/contract3",isDocsHomePage:!1,title:"Test Scenario",description:"Test scenario is the current industry standard to ensure a contract has the expected behavior. Basically a test is a program that originates the contract(s), calls them and checks the storage value(s) and account(s) balances.",source:"@site/docs/contract/contract3.md",sourceDirName:"contract",slug:"/contract/test-scenario",permalink:"/docs/contract/test-scenario",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/contract/contract3.md",version:"current",frontMatter:{id:"contract3",title:"Test Scenario",sidebar_label:"Test Scenario",slug:"/contract/test-scenario",hide_title:!1},sidebar:"contract",previous:{title:"8. Call a contract",permalink:"/docs/contract/tuto/archetype-callcontr"}},m=[{value:"Completium JS library",id:"completium-js-library",children:[]},{value:"Create test project",id:"create-test-project",children:[]},{value:"Example",id:"example",children:[]},{value:"Run test",id:"run-test",children:[]},{value:"Sandbox",id:"sandbox",children:[]}],d={toc:m};function u(t){var e=t.components,n=(0,o.Z)(t,s);return(0,c.kt)("wrapper",(0,a.Z)({},d,n,{components:e,mdxType:"MDXLayout"}),(0,c.kt)("p",null,"Test scenario is the current industry standard to ensure a contract has the expected behavior. Basically a test is a program that originates the contract(s), calls them and checks the storage value(s) and account(s) balances."),(0,c.kt)("p",null,"This article presents how to write and execute tests with Completium."),(0,c.kt)("h2",{id:"completium-js-library"},"Completium JS library"),(0,c.kt)("p",null,"Completium provides a Javascript ",(0,c.kt)(i.Z,{to:"/docs/cli/jslibrary",mdxType:"Link"},"programming library")," to program interactions with contracts. It benefits from the configuration of endpoints and accounts established with the ",(0,c.kt)(i.Z,{to:"/docs/cli",mdxType:"Link"},"CLI"),"."),(0,c.kt)("p",null,"Before using ",(0,c.kt)("inlineCode",{parentName:"p"},"$completium-cli")," as a programming library, ",(0,c.kt)(i.Z,{to:"/docs/cli",mdxType:"Link"},"install")," the CLI to configure ",(0,c.kt)(i.Z,{to:"/docs/cli/network",mdxType:"Link"},"endpoint")," and ",(0,c.kt)(i.Z,{to:"/docs/cli/account",mdxType:"Link"},"account(s)"),"."),(0,c.kt)("h2",{id:"create-test-project"},"Create test project"),(0,c.kt)("p",null,"Follow the standard npm process to create a javascript project and install ",(0,c.kt)("inlineCode",{parentName:"p"},"completium-cli"),":"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-bash"},"$ mkdir test\n$ cd test\n$ npm init -y\n$ npm i @completium/completium-cli\n")),(0,c.kt)("h2",{id:"example"},"Example"),(0,c.kt)("p",null,"The following example illustrates how to test the ",(0,c.kt)(i.Z,{to:"/docs/contract/tuto/archetype-statem",mdxType:"Link"},"State machine")," contract of the Archetype ",(0,c.kt)(i.Z,{to:"/docs/contract/programming-language#archetype",mdxType:"Link"},"tutorial"),"."),(0,c.kt)("p",null,"The goal is to check whether the contract is in the right state after a series of calls to ",(0,c.kt)("inlineCode",{parentName:"p"},"init"),", ",(0,c.kt)("inlineCode",{parentName:"p"},"inc_value")," twice and ",(0,c.kt)("inlineCode",{parentName:"p"},"complete")," entrypoints, and to check whether the caller's balance is unchanged while transferring 5tz to ",(0,c.kt)("inlineCode",{parentName:"p"},"init")," (within cost of transactions)."),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="test.js"',title:'"test.js"'},"const assert     = require('assert');\nconst { deploy, getBalance } = require('@completium/completium-cli');\n\nconst test = async () => {\n  // Scenario\n  const balance_before = (await getBalance()).toNumber();\n  var cost = 0;\n  var [state_machine, op] = await deploy('state_machine.arl');\n  cost += op.cost.toNumber();\n  // send 5tz to contract\n  var op = await state_machine.init({ amount: \"5tz\" });\n  cost += op.cost.toNumber();\n  var op = await state_machine.inc_value();\n  cost += op.cost.toNumber();\n  var op = await state_machine.inc_value();\n  cost += op.cost.toNumber();\n  // Should return the 5tz sent with `init`\n  var op = await state_machine.complete();\n  cost += op.cost.toNumber();\n  // Test final state and balance\n  const storage = await state_machine.storage();\n  const balance   = (await getBalance()).toNumber();\n  assert(storage._state == 3, \"Invalid contract state\");\n  assert(balance == balance_before - cost, \"Invalid caller balance\");\n}\n\ntest();\n")),(0,c.kt)("p",null,"The cost of transactions is accumulated in the local ",(0,c.kt)("inlineCode",{parentName:"p"},"cost")," variable. It is used to test that the caller has got back the 5 tezies send to ",(0,c.kt)("inlineCode",{parentName:"p"},"init")," entrypoint."),(0,c.kt)("p",null,"The script is using the current account and endpoint, shown with the Completium ",(0,c.kt)(i.Z,{to:"/docs/cli",mdxType:"Link"},"CLI")," commands:"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-bash",metastring:"{1,4}","{1,4}":!0},"$ completium-cli show endpoint\nCurrent network: edo\nCurrent endpoint: https://edonet-tezos.giganode.io\n$ completium-cli show account\nCurrent account: admin\nPublic key hash: tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb\nBalance on sandbox: 9998.466387 \ua729\n")),(0,c.kt)("p",null,"This means the script is using the ",(0,c.kt)("inlineCode",{parentName:"p"},"edo")," network with the account ",(0,c.kt)("inlineCode",{parentName:"p"},"admin"),". It is possible to programmatically switch account and endpoint from within the test scenario."),(0,c.kt)("h2",{id:"run-test"},"Run test"),(0,c.kt)("p",null,"Edit the package file to set the test command:"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-json",metastring:'{7} title="package.json"',"{7}":!0,title:'"package.json"'},'{\n  "name": "demo",\n  "version": "1.0.0",\n  "description": "",\n  "main": "test.js",\n  "scripts": {\n    "test": "node test.js"\n  },\n  "keywords": [],\n  "author": "",\n  "license": "ISC",\n  "dependencies": {\n    "@completium/completium-cli": "^0.1.8"\n  }\n}\n')),(0,c.kt)("p",null,"Launch the test with:"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre"},"npm test\n")),(0,c.kt)("h2",{id:"sandbox"},"Sandbox"),(0,c.kt)("p",null,(0,c.kt)("inlineCode",{parentName:"p"},"$completium-cli")," provides the possibility to run the scenario on a local ",(0,c.kt)(i.Z,{to:"/docs/cli/network#sandbox",mdxType:"Link"},"sandbox")," network."),(0,c.kt)("p",null,"In order to launch the test in a sandbox, run the following script:"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-sh"},"completium-cli start sandbox\ncompletium-cli set endpoint http://localhost:20000\nnpm test\ncompletium-cli stop sandbox\n")))}u.isMDXComponent=!0}}]);
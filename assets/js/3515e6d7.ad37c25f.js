(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[8090],{7459:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return s},default:function(){return d}});var a=n(2122),r=n(9756),l=(n(7294),n(3905)),i=(n(6742),["components"]),o={id:"iot8",title:"Interface",sidebar_label:"Interface",slug:"/dapp-iot/interface"},p=void 0,c={unversionedId:"dapp-iot/iot8",id:"dapp-iot/iot8",isDocsHomePage:!1,title:"Interface",description:"The smart contract is developed with the Archetype language.",source:"@site/docs/dapp-iot/iot8.md",sourceDirName:"dapp-iot",slug:"/dapp-iot/interface",permalink:"/docs/dapp-iot/interface",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-iot/iot8.md",version:"current",frontMatter:{id:"iot8",title:"Interface",sidebar_label:"Interface",slug:"/dapp-iot/interface"}},s=[{value:"Storage",id:"storage",children:[]},{value:"Entry points",id:"entry-points",children:[{value:"start",id:"start",children:[]},{value:"interrupt",id:"interrupt",children:[]},{value:"collect",id:"collect",children:[]},{value:"set unit",id:"set-unit",children:[]}]}],u={toc:s};function d(e){var t=e.components,n=(0,r.Z)(e,i);return(0,l.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"The smart contract is developed with the ",(0,l.kt)("a",{href:"https://archetype-lang.org/"},"Archetype")," language."),(0,l.kt)("h2",{id:"storage"},"Storage"),(0,l.kt)("p",null,"Address of the contract owner only capable of collecting payments and setting parameters:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"variable owner : address = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw\n")),(0,l.kt)("p",null,"Start date of service:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"variable dateofstop   : date = now\n")),(0,l.kt)("p",null,"End date of service (the service is off if in the past, on otherwize):"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"variable dateofstart  : date = now\n")),(0,l.kt)("p",null,"Number of minutes of service mimutes par XTZ sent:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"variable rate : rational = 1.2 // in time_unit / tez_unit\n")),(0,l.kt)("p",null,"Time unit:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"variable time_unit : duration = 1m\n")),(0,l.kt)("p",null,"Tez unit:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"variable tez_unit : tez = 1tz\n")),(0,l.kt)("p",null,"Last/current customer address:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"variable user : option<address> = none\n")),(0,l.kt)("p",null,"Duration between two state lookups by the connected object:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"variable read_interval : duration = 5s\n")),(0,l.kt)("h2",{id:"entry-points"},"Entry points"),(0,l.kt)("h3",{id:"start"},"start"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"entry start () {\n    require {\n        r1: now > dateofstop;\n    }\n    effect {\n        ...\n    }\n}\n")),(0,l.kt)("h3",{id:"interrupt"},"interrupt"),(0,l.kt)("p",null,"It is possible to interrupt the service before its planned end of service date by calling this entry point. In that case, the smart contract pays the caller back in proportion of the service duration without any penalty."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"entry interrupt () {\n    require {\n        r2: caller = opt_get(user) and now < dateofstop\n    }\n    effect {\n        ...\n    }\n}\n")),(0,l.kt)("h3",{id:"collect"},"collect"),(0,l.kt)("p",null,"Called by ",(0,l.kt)("inlineCode",{parentName:"p"},"owner")," to collect service payments:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"entry collect () {\n    called by owner\n    effect {\n        ...\n    }\n}\n")),(0,l.kt)("h3",{id:"set-unit"},"set unit"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"entry setunits (dunit : duration, tunit : tez) {\n    called by owner\n    effect {\n        ...\n    }\n}\n")))}d.isMDXComponent=!0}}]);
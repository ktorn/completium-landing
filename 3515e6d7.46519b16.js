(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{105:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return l})),a.d(t,"metadata",(function(){return i})),a.d(t,"toc",(function(){return o})),a.d(t,"default",(function(){return p}));var n=a(3),r=a(7),c=(a(0),a(227)),l=(a(228),{id:"iot8",title:"Interface",sidebar_label:"Interface",slug:"/dapp-iot/interface"}),i={unversionedId:"dapp-iot/iot8",id:"dapp-iot/iot8",isDocsHomePage:!1,title:"Interface",description:"The smart contract is developed with the Archetype language.",source:"@site/docs/dapp-iot/iot8.md",slug:"/dapp-iot/interface",permalink:"/docs/dapp-iot/interface",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-iot/iot8.md",version:"current",sidebar_label:"Interface"},o=[{value:"Storage",id:"storage",children:[]},{value:"Entry points",id:"entry-points",children:[{value:"start",id:"start",children:[]},{value:"interrupt",id:"interrupt",children:[]},{value:"collect",id:"collect",children:[]},{value:"set unit",id:"set-unit",children:[]}]}],b={toc:o};function p(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},b,a,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"The smart contract is developed with the ",Object(c.b)("a",{href:"https://archetype-lang.org/"},"Archetype")," language."),Object(c.b)("h2",{id:"storage"},"Storage"),Object(c.b)("p",null,"Address of the contract owner only capable of collecting payments and setting parameters:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable owner : address = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw\n")),Object(c.b)("p",null,"Start date of service:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable dateofstop   : date = now\n")),Object(c.b)("p",null,"End date of service (the service is off if in the past, on otherwize):"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable dateofstart  : date = now\n")),Object(c.b)("p",null,"Number of minutes of service mimutes par XTZ sent:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable rate : rational = 1.2 // in time_unit / tez_unit\n")),Object(c.b)("p",null,"Time unit:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable time_unit : duration = 1m\n")),Object(c.b)("p",null,"Tez unit:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable tez_unit : tez = 1tz\n")),Object(c.b)("p",null,"Last/current customer address:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable user : option<address> = none\n")),Object(c.b)("p",null,"Duration between two state lookups by the connected object:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable read_interval : duration = 5s\n")),Object(c.b)("h2",{id:"entry-points"},"Entry points"),Object(c.b)("h3",{id:"start"},"start"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"entry start () {\n    require {\n        r1: now > dateofstop;\n    }\n    effect {\n        ...\n    }\n}\n")),Object(c.b)("h3",{id:"interrupt"},"interrupt"),Object(c.b)("p",null,"It is possible to interrupt the service before its planned end of service date by calling this entry point. In that case, the smart contract pays the caller back in proportion of the service duration without any penalty."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"entry interrupt () {\n    require {\n        r2: caller = opt_get(user) and now < dateofstop\n    }\n    effect {\n        ...\n    }\n}\n")),Object(c.b)("h3",{id:"collect"},"collect"),Object(c.b)("p",null,"Called by ",Object(c.b)("inlineCode",{parentName:"p"},"owner")," to collect service payments:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"entry collect () {\n    called by owner\n    effect {\n        ...\n    }\n}\n")),Object(c.b)("h3",{id:"set-unit"},"set unit"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"entry setunits (dunit : duration, tunit : tez) {\n    called by owner\n    effect {\n        ...\n    }\n}\n")))}p.isMDXComponent=!0}}]);
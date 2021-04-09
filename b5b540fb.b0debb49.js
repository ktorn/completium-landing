(window.webpackJsonp=window.webpackJsonp||[]).push([[110],{181:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return o})),a.d(t,"toc",(function(){return b})),a.d(t,"default",(function(){return s}));var n=a(3),r=(a(0),a(224));a(226),a(227),a(228);const c={id:"escrow8",title:"Interface",sidebar_label:"Interface",slug:"/dapp-escrow/interface"},o={unversionedId:"dapp-escrow/escrow8",id:"dapp-escrow/escrow8",isDocsHomePage:!1,title:"Interface",description:"Storage",source:"@site/docs/dapp-escrow/escrow8.md",slug:"/dapp-escrow/interface",permalink:"/docs/dapp-escrow/interface",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/dapp-escrow/escrow8.md",version:"current",sidebar_label:"Interface"},b=[{value:"Storage",id:"storage",children:[]},{value:"Entry points",id:"entry-points",children:[{value:"Transitions",id:"transitions",children:[]},{value:"Fund",id:"fund",children:[]},{value:"Complete",id:"complete",children:[]}]}],l={toc:b};function s({components:e,...t}){return Object(r.b)("wrapper",Object(n.a)({},l,t,{components:e,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"storage"},"Storage"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable seller       : role = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable buyer        : role = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable taxcollector : role = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable price        : tez = 0tz\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"constant taxrate      : rational = 20%\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"constant securityrate : rational = 110%\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"constant deadline     : date = now + 1d\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"states =\n | Created initial\n | Aborted\n | Funded\n | InTransit\n | Completed\n")),Object(r.b)("h2",{id:"entry-points"},"Entry points"),Object(r.b)("h3",{id:"transitions"},"Transitions"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"transition abortCreated () {\n  called by buyer\n  from Created\n  to Aborted\n}\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"transition abortFunded () {\n  called by buyer\n  from Funded\n  to Aborted\n}\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"transition abort () {\n  from any\n  to Aborted when { now > deadline }\n}\n")),Object(r.b)("h3",{id:"fund"},"Fund"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"transition fund () {\n  called by buyer\n  from Created\n  to Funded when { transferred >= (100% + taxrate + securityrate) * price }\n}\n")),Object(r.b)("h3",{id:"complete"},"Complete"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"transition complete () {\n  called by buyer\n  from Funded\n  to Completed\n  with effect {\n    ...\n  }\n}\n")))}s.isMDXComponent=!0},226:function(e,t,a){"use strict";a(0),a(230)}}]);
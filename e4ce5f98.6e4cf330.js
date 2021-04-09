(window.webpackJsonp=window.webpackJsonp||[]).push([[138],{208:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return d})),a.d(t,"toc",(function(){return i})),a.d(t,"default",(function(){return s}));var n=a(3),r=(a(0),a(224));a(226),a(227),a(228);const c={id:"ideabox8",title:"Interface",sidebar_label:"Interface",slug:"/dapp-ideabox/interface"},d={unversionedId:"dapp-ideabox/ideabox8",id:"dapp-ideabox/ideabox8",isDocsHomePage:!1,title:"Interface",description:"Storage",source:"@site/docs/dapp-ideabox/ideabox8.md",slug:"/dapp-ideabox/interface",permalink:"/docs/dapp-ideabox/interface",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/dapp-ideabox/ideabox8.md",version:"current",sidebar_label:"Interface"},i=[{value:"Storage",id:"storage",children:[]},{value:"Entry points",id:"entry-points",children:[{value:"Register",id:"register",children:[]},{value:"Add idea",id:"add-idea",children:[]},{value:"Vote",id:"vote",children:[]},{value:"Terminate",id:"terminate",children:[]}]}],b={toc:i};function s({components:e,...t}){return Object(r.b)("wrapper",Object(n.a)({},b,t,{components:e,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"storage"},"Storage"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"constant chairman : address = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"states =\n| Activated initial\n| Terminated\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"asset idea {\n  id       : nat;\n  title    : bytes;\n  desc     : bytes;\n  nbvotes  : nat = 0;\n  creation : date;\n  author   : address;\n}\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"asset voter {\n  addr      : address;\n  remaining : nat = 5;\n}\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"asset selected {\n  sid : nat;\n}\n")),Object(r.b)("h2",{id:"entry-points"},"Entry points"),Object(r.b)("h3",{id:"register"},"Register"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"entry register (a_voter : address) {\n  called by chairman\n  ...\n}\n")),Object(r.b)("h3",{id:"add-idea"},"Add idea"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"entry add_idea(ititle : bytes, description : bytes) {\n    ...\n}\n")),Object(r.b)("h3",{id:"vote"},"Vote"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"entry vote(n : nat, weight : nat) {\n    ...\n}\n")),Object(r.b)("h3",{id:"terminate"},"Terminate"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"})," transition terminate () {\n  called by chairman\n  from Activated\n  to Terminated\n  with effect {\n    ...\n  }\n }\n")))}s.isMDXComponent=!0},226:function(e,t,a){"use strict";a(0),a(230)}}]);
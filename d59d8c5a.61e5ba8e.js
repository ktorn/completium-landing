(window.webpackJsonp=window.webpackJsonp||[]).push([[131],{199:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return i})),a.d(t,"metadata",(function(){return o})),a.d(t,"toc",(function(){return b})),a.d(t,"default",(function(){return d}));var n=a(3),r=a(7),c=(a(0),a(224)),i=(a(226),a(227),a(228),{id:"game8",title:"Interface",sidebar_label:"Interface",slug:"/dapp-game/interface"}),o={unversionedId:"dapp-game/game8",id:"dapp-game/game8",isDocsHomePage:!1,title:"Interface",description:"Storage",source:"@site/docs/dapp-game/game8.md",slug:"/dapp-game/interface",permalink:"/docs/dapp-game/interface",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/dapp-game/game8.md",version:"current",sidebar_label:"Interface"},b=[{value:"Storage",id:"storage",children:[]},{value:"Entry points",id:"entry-points",children:[{value:"Confirm",id:"confirm",children:[]},{value:"Submit",id:"submit",children:[]},{value:"Decide",id:"decide",children:[]}]}],s={toc:b};function d(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},s,a,{components:t,mdxType:"MDXLayout"}),Object(c.b)("h2",{id:"storage"},"Storage"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable organizer : role = @tz1NUKyDbQtSu4g1bgpwgvwqTeggbtKrNkdv\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable prize : tez = 10tz\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),'constant oracle : key = "edpkv9k8WZNMyEMuLLVwQfGDqm4pfxSEkTmvgq5DakPUnNbNnQuB14"\n')),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"constant noncelength : nat = 8\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"asset submission {\n  competitor : address;\n  score      : nat;\n  timestamp  : date;\n}\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{}),"states =\n | Created     initial\n | InProgress\n | Done\n | Closed\n")),Object(c.b)("h2",{id:"entry-points"},"Entry points"),Object(c.b)("h3",{id:"confirm"},"Confirm"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"transition confirm () {\n  called by organizer\n  from Created\n  to InProgress when { transferred = prize }\n}\n")),Object(c.b)("h3",{id:"submit"},"Submit"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"entry submit (packed_score : bytes, signed_score : signature) {\n    ...\n}\n")),Object(c.b)("h3",{id:"decide"},"Decide"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"transition decide () {\n  called by organizer\n  from InProgress\n  to Done\n  with effect {\n      ...\n  }\n}\n")))}d.isMDXComponent=!0},226:function(e,t,a){"use strict";a(0),a(230)}}]);
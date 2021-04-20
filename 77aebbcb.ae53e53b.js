(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{151:function(e,a,t){"use strict";t.r(a),t.d(a,"frontMatter",(function(){return b})),t.d(a,"metadata",(function(){return i})),t.d(a,"toc",(function(){return l})),t.d(a,"default",(function(){return s}));var n=t(3),c=t(7),r=(t(0),t(235)),b=(t(237),t(238),t(239),{id:"zcb8",title:"Interface",sidebar_label:"Interface",slug:"/dapp-zcb/interface"}),i={unversionedId:"dapp-zcb/zcb8",id:"dapp-zcb/zcb8",isDocsHomePage:!1,title:"Interface",description:"Storage",source:"@site/docs/dapp-zcb/zcb8.md",slug:"/dapp-zcb/interface",permalink:"/docs/dapp-zcb/interface",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-zcb/zcb8.md",version:"current",sidebar_label:"Interface"},l=[{value:"Storage",id:"storage",children:[]},{value:"Entry points",id:"entry-points",children:[{value:"To signed",id:"to-signed",children:[]},{value:"Sign",id:"sign",children:[]},{value:"Terminate",id:"terminate",children:[]},{value:"Dispute",id:"dispute",children:[]}]}],p={toc:l};function s(e){var a=e.components,t=Object(c.a)(e,["components"]);return Object(r.b)("wrapper",Object(n.a)({},p,t,{components:a,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"storage"},"Storage"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable issuer     : role = @tz1bfVgcJC4ukaQSHUe1EbrUd5SekXeP9CWk\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable subscriber : role = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable facevalue : tez = 10tz\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable discount : rational = 14%\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable maturityduration : duration = 1m\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable paybackduration  : duration = 1m\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable issuersigned     : bool = false\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable subscribersigned : bool = false\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable signaturedate    : option<date> = none\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"states =\n  | Created initial\n  | Signed\n  | Terminated\n  | Disputed\n")),Object(r.b)("h2",{id:"entry-points"},"Entry points"),Object(r.b)("h3",{id:"to-signed"},"To signed"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"transition toSigned() {\n  called by selfaddress\n  from Created to Signed with effect {\n    signaturedate := some(now)\n  }\n}\n")),Object(r.b)("h3",{id:"sign"},"Sign"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"entry sign () {\n  ...\n}\n")),Object(r.b)("h3",{id:"terminate"},"Terminate"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"transition terminate () {\n ...\n}\n")),Object(r.b)("h3",{id:"dispute"},"Dispute"),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"transition dispute () {\n  ...\n}\n")))}s.isMDXComponent=!0},237:function(e,a,t){"use strict";t(0),t(242)}}]);
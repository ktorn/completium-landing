"use strict";(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[7494],{3079:function(e,t,n){var a=n(7294),r=n(282),l=n(8500),o=n(3457),c=n(9960),d=n(4996);t.Z=function(e){var t=a.useMemo((function(){return(0,l.Z)({palette:{type:"dark"}})}),[!0]);return a.createElement("div",{style:{textAlign:"center",paddingTop:"0px",paddingBottom:"40px"}},a.createElement(o.Z,{theme:t},e.internal?a.createElement(r.Z,{variant:"outlined",size:"large",component:c.Z,to:(0,d.Z)("docs/"+e.url+"/")},e.txt):a.createElement(r.Z,{variant:"outlined",size:"large",onClick:function(){return window.open(e.url,"_blank")}},e.txt)))}},807:function(e,t,n){n(7294),n(4996)},8675:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return d},metadata:function(){return p},toc:function(){return i},default:function(){return u}});var a=n(7462),r=n(3366),l=(n(7294),n(3905)),o=(n(807),n(7134),n(3079),["components"]),c={id:"escrow8",title:"Interface",sidebar_label:"Interface",slug:"/dapp-escrow/interface"},d=void 0,p={unversionedId:"dapp-escrow/escrow8",id:"dapp-escrow/escrow8",title:"Interface",description:"Storage",source:"@site/docs/dapp-escrow/escrow8.md",sourceDirName:"dapp-escrow",slug:"/dapp-escrow/interface",permalink:"/docs/dapp-escrow/interface",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-escrow/escrow8.md",tags:[],version:"current",frontMatter:{id:"escrow8",title:"Interface",sidebar_label:"Interface",slug:"/dapp-escrow/interface"}},i=[{value:"Storage",id:"storage",children:[],level:2},{value:"Entry points",id:"entry-points",children:[{value:"Transitions",id:"transitions",children:[],level:3},{value:"Fund",id:"fund",children:[],level:3},{value:"Complete",id:"complete",children:[],level:3}],level:2}],s={toc:i};function u(e){var t=e.components,n=(0,r.Z)(e,o);return(0,l.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"storage"},"Storage"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"variable seller       : address = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"variable buyer        : address = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"variable taxcollector : address = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"variable price        : tez = 0tz\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"constant taxrate      : rational = 20%\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"constant securityrate : rational = 110%\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"constant deadline     : date = now + 1d\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"states =\n | Created initial\n | Aborted\n | Funded\n | InTransit\n | Completed\n")),(0,l.kt)("h2",{id:"entry-points"},"Entry points"),(0,l.kt)("h3",{id:"transitions"},"Transitions"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"transition abortCreated () {\n  called by buyer\n  from Created\n  to Aborted\n}\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"transition abortFunded () {\n  called by buyer\n  from Funded\n  to Aborted\n}\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"transition abort () {\n  from any\n  to Aborted when { now > deadline }\n}\n")),(0,l.kt)("h3",{id:"fund"},"Fund"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"transition fund () {\n  called by buyer\n  from Created\n  to Funded when { transferred >= (100% + taxrate + securityrate) * price }\n}\n")),(0,l.kt)("h3",{id:"complete"},"Complete"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-archetype"},"transition complete () {\n  called by buyer\n  from Funded\n  to Completed\n  with effect {\n    ...\n  }\n}\n")))}u.isMDXComponent=!0}}]);
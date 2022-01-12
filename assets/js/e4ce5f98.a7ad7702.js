(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[9598],{807:function(e,t,a){"use strict";a(7294),a(4996)},5928:function(e,t,a){"use strict";a.r(t),a.d(t,{frontMatter:function(){return c},contentTitle:function(){return o},metadata:function(){return s},toc:function(){return l},default:function(){return u}});var n=a(2122),r=a(9756),i=(a(7294),a(3905)),d=(a(807),a(7134),a(3079),["components"]),c={id:"ideabox8",title:"Interface",sidebar_label:"Interface",slug:"/dapp-ideabox/interface"},o=void 0,s={unversionedId:"dapp-ideabox/ideabox8",id:"dapp-ideabox/ideabox8",isDocsHomePage:!1,title:"Interface",description:"Storage",source:"@site/docs/dapp-ideabox/ideabox8.md",sourceDirName:"dapp-ideabox",slug:"/dapp-ideabox/interface",permalink:"/docs/dapp-ideabox/interface",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-ideabox/ideabox8.md",version:"current",frontMatter:{id:"ideabox8",title:"Interface",sidebar_label:"Interface",slug:"/dapp-ideabox/interface"}},l=[{value:"Storage",id:"storage",children:[]},{value:"Entry points",id:"entry-points",children:[{value:"Register",id:"register",children:[]},{value:"Add idea",id:"add-idea",children:[]},{value:"Vote",id:"vote",children:[]},{value:"Terminate",id:"terminate",children:[]}]}],p={toc:l};function u(e){var t=e.components,a=(0,r.Z)(e,d);return(0,i.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"storage"},"Storage"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-archetype"},"constant chairman : address = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-archetype"},"states =\n| Activated initial\n| Terminated\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-archetype"},"asset idea {\n  id       : nat;\n  title    : bytes;\n  desc     : bytes;\n  nbvotes  : nat = 0;\n  creation : date;\n  author   : address;\n}\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-archetype"},"asset voter {\n  addr      : address;\n  remaining : nat = 5;\n}\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-archetype"},"asset selected {\n  sid : nat;\n}\n")),(0,i.kt)("h2",{id:"entry-points"},"Entry points"),(0,i.kt)("h3",{id:"register"},"Register"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-archetype"},"entry register (a_voter : address) {\n  called by chairman\n  ...\n}\n")),(0,i.kt)("h3",{id:"add-idea"},"Add idea"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-archetype"},"entry add_idea(ititle : bytes, description : bytes) {\n    ...\n}\n")),(0,i.kt)("h3",{id:"vote"},"Vote"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-archetype"},"entry vote(n : nat, weight : nat) {\n    ...\n}\n")),(0,i.kt)("h3",{id:"terminate"},"Terminate"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-archetype"}," transition terminate () {\n  called by chairman\n  from Activated\n  to Terminated\n  with effect {\n    ...\n  }\n }\n")))}u.isMDXComponent=!0}}]);
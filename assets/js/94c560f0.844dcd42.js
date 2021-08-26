(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[2899],{807:function(e,t,n){"use strict";n(7294),n(4996)},1316:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return c},default:function(){return m}});var a=n(2122),i=n(9756),r=(n(7294),n(3905)),l=(n(807),n(7134),n(3079),n(6742)),d=["components"],o={id:"dex8",title:"Interface",sidebar_label:"Interface",slug:"/dapp-dex/interface"},p=void 0,s={unversionedId:"dapp-dex/dex8",id:"dapp-dex/dex8",isDocsHomePage:!1,title:"Interface",description:"Storage",source:"@site/docs/dapp-dex/dex8.md",sourceDirName:"dapp-dex",slug:"/dapp-dex/interface",permalink:"/docs/dapp-dex/interface",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-dex/dex8.md",version:"current",frontMatter:{id:"dex8",title:"Interface",sidebar_label:"Interface",slug:"/dapp-dex/interface"}},c=[{value:"Storage",id:"storage",children:[]},{value:"Entry points",id:"entry-points",children:[{value:"Register/Delete token",id:"registerdelete-token",children:[]},{value:"Exchange",id:"exchange",children:[]},{value:"Add liquidity",id:"add-liquidity",children:[]},{value:"Remove liquidity",id:"remove-liquidity",children:[]}]}],u={toc:c};function m(e){var t=e.components,n=(0,i.Z)(e,d);return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"storage"},"Storage"),(0,r.kt)("p",null,"The fee rate is set to 0.3%:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-archetype"},"constant gamma         : rational = 1 - 0.3%\n")),(0,r.kt)("p",null,"The difference between the expected exchanged quantitiy and the actual quantitiy must be less than espsilon (in XTZ, see ",(0,r.kt)(l.Z,{to:"/docs/dapp-dex/implementation#exchange",mdxType:"Link"},"exchange")," entry point implementation):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-archetype"},"constant epsilon       : nat = 1\n")),(0,r.kt)("p",null,"Initial number of minted liquidity tokens (see ",(0,r.kt)(l.Z,{to:"/docs/dapp-dex/implementation#add-liquidity",mdxType:"Link"},"addLiquidity")," entry point implementation):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-archetype"},"constant initialminted : nat = 1_000_000\n")),(0,r.kt)("p",null,"Admin account:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-archetype"},"variable admin : address = @tz1Lc2qBKEWCBeDU8npG6zCeCqpmaegRi6Jg\n")),(0,r.kt)("p",null,"Token asset:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-archetype"},"asset token {\n  id       : string;      /* token label identifier  */\n  addr     : address;     /* FA 1.2 contract address */\n  name     : string;      /* FA 1.2 name             */\n  iconurl  : string;      /* Icon                    */\n  poolvalue: nat = 0;     /* XTZ value in pool       */\n  totalqty : nat = 0;     /* total number of tokens  */\n  totallqt : nat = 0;     /* total LTQ tokens        */\n}\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-archetype"},"asset liquidity identified by tokenid owner {\n  tokenid  : string;      /* token id                */\n  owner    : address;     /* LQT owner               */\n  lqt      : nat = 0;     /* LQT quantity            */\n}\n")),(0,r.kt)("h2",{id:"entry-points"},"Entry points"),(0,r.kt)("h3",{id:"registerdelete-token"},"Register/Delete token"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-archetype"},"entry registertoken (i : string, a : address, n : string, u : string) {\n  called by admin\n  ...\n}\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-archetype"},"entry deletetoken (i : string) {\n  called by admin\n  ...\n}\n")),(0,r.kt)("h3",{id:"exchange"},"Exchange"),(0,r.kt)("p",null,"Unique exchange entry point:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"tA: name of token to exchange from"),(0,r.kt)("li",{parentName:"ul"},"aA: quantity of tA to exchange"),(0,r.kt)("li",{parentName:"ul"},"tB: name of the token to exchange to"),(0,r.kt)("li",{parentName:"ul"},"aB: quantitiy of tB to get")),(0,r.kt)("p",null,"Names are those specified in the ",(0,r.kt)("inlineCode",{parentName:"p"},"token")," asset."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-archetype"},"entry exchange(tA : string, aA: nat, tB : string, aB : nat) {\n    ...\n}\n")),(0,r.kt)("h3",{id:"add-liquidity"},"Add liquidity"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-archetype"},"entry addLiquidity(tL : string, qL : nat) {\n    ...\n}\n")),(0,r.kt)("h3",{id:"remove-liquidity"},"Remove liquidity"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-archetype"},"entry removeLiquidity(qL : nat, tA : string) {\n    ...\n}\n")))}m.isMDXComponent=!0}}]);
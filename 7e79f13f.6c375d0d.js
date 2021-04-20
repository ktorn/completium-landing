(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{155:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return s})),a.d(t,"toc",(function(){return l})),a.d(t,"default",(function(){return u}));var n=a(3),i=a(7),o=(a(0),a(235)),r=a(236),c=(a(248),a(249),{id:"verification7",title:"Invariant",sidebar_label:"Invariant",slug:"/verification/invariant",hide_title:!1}),s={unversionedId:"verification/verification7",id:"verification/verification7",isDocsHomePage:!1,title:"Invariant",description:"An invariant is a property of the contract state (storage, balance) that is always true, regardless of the history of calls to the contract.",source:"@site/docs/verification/verification7.md",slug:"/verification/invariant",permalink:"/docs/verification/invariant",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/verification/verification7.md",version:"current",sidebar_label:"Invariant",sidebar:"verification",previous:{title:"Failure",permalink:"/docs/verification/fail"},next:{title:"Conclusion",permalink:"/docs/verification/conclusion"}},l=[{value:"Conservation",id:"conservation",children:[]},{value:"Accumulation",id:"accumulation",children:[{value:"Example",id:"example",children:[]},{value:"Shadow variables",id:"shadow-variables",children:[]}]}],b={toc:l};function u(e){var t=e.components,a=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},b,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"An invariant is a property of the contract state (storage, balance) that is always true, regardless of the history of calls to the contract."),Object(o.b)("p",null,"If there are ",Object(o.b)("em",{parentName:"p"},"E")," entrypoints in the contract, ",Object(o.b)(r.a,{to:"http://why3.lri.fr/",mdxType:"Link"},"Why3")," will automatically generate ",Object(o.b)("em",{parentName:"p"},"E+1")," proof obligations out of one invariant:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"one for the initial storage value: the invariant is true at the contract origination"),Object(o.b)("li",{parentName:"ul"},"one per entrypoint to prove the invariant as a postcondition, assuming the property holds before entrypoint execution")),Object(o.b)("p",null,'There is no systemic method to establish contract invariants. You need to figure them out case by case by aksing "what do entrypoints preserve?" or "which relations hold between storage variables?" Below is a presentation of two principles you can use to figure out invariants.'),Object(o.b)("h2",{id:"conservation"},"Conservation"),Object(o.b)("p",null,"In these examples, the invariant comes from the fact that information is transfered by entrypoints from one place to the other in the contract storage. It is then possible to write a global conservation equation."),Object(o.b)("p",null,"The invariant of the ",Object(o.b)(r.a,{to:"/docs/templates/fa12",mdxType:"Link"},"FA 1.2")," contract states that the total number of tokens is a constant. Indeed tokens are transferred from one account to the other, but the total number of tokens is conserved, no token is minted or lost:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"specification {\n  i: ledger.sum(tokens) = totalsupply;\n}\n")),Object(o.b)("p",null,"The invariant of the ",Object(o.b)(r.a,{to:"/docs/templates/ideabox",mdxType:"Link"},"Idea Box")," contract is a conservation equation between maximum number of votes per voter, the actual number of votes received by ideas, and the remaining number of votes per voter."),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"specification {\n  i1 : maxvotes * voter.count() = idea.sum(nbvotes) + voter.sum(remaining)\n}\n")),Object(o.b)("p",null,"Note that the invariant is global and that it is not possible in this case to state the conservation principle at the voter level, because the contract does not store the information of which voter voted for which idea."),Object(o.b)("h2",{id:"accumulation"},"Accumulation"),Object(o.b)("h3",{id:"example"},"Example"),Object(o.b)("p",null,"In this example, the invariant comes from the fact that an information is the accumulation of other information as a result of calls to entrypoints. It is then possible to write an accumulation equation."),Object(o.b)("p",null,"Say the contract is selling non fungible tokens, and each time a token is sold, the balance is increased by a percent of the token fixed price, the fee. Say the information is stored in an asset collection ",Object(o.b)("inlineCode",{parentName:"p"},"ledger")," defined as:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"variable fee : rational = 0.003\n\nasset ledger {\n  id        : string,\n  price     : tez,\n  sellcount : nat = 0\n}\n")),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"sellcount")," is the number of times the token has been sold."),Object(o.b)("p",null,"The contract invariant is then the formula for the balance:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"balance = fee * ledger.sum(sellcount * price)\n")),Object(o.b)("h3",{id:"shadow-variables"},"Shadow variables"),Object(o.b)("p",null,"If an information is missing to express the invariant, it is possible to use ",Object(o.b)("em",{parentName:"p"},"shadow variables"),": they do not appear in the final contract storage or code, while they are available in specification."),Object(o.b)("p",null,"Typically the ",Object(o.b)("inlineCode",{parentName:"p"},"sellcount")," field in the above example is a pure accumulation variable only used the invariant formula. It is then better not to have it as a real field and pay for its storage, and turn it into a shadow field."),Object(o.b)("p",null,"The following shows how to declare ",Object(o.b)("inlineCode",{parentName:"p"},"sellcount")," as a shadow field:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"asset ledger {\n  id        : string,\n  price     : tez\n} shadow {\n  sellcount : int = 0;\n}\n")),Object(o.b)("p",null,"Shadow variables cannot be used in entrypoints' effect. It can only be used in dedicated shadow effect sections. Shadow effects are virtually executed ",Object(o.b)("em",{parentName:"p"},"after")," the entrypoint section."),Object(o.b)("p",null,"In this case, the ",Object(o.b)("inlineCode",{parentName:"p"},"sell")," entrypoint declares such a section to accumulate the number of times a card is sold:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"entry sell(i : string) {\n  specification {\n    shadow effect {\n      ledger[i].sellcount += 1\n    }\n  }\n  effect {\n    ...\n  }\n}\n")),Object(o.b)("p",null,"With shadow variables it is possible to accumulate what is necessary to formulate the invariant. In the Box Idea contract presented above, it would be possible to add an field in the ",Object(o.b)("inlineCode",{parentName:"p"},"voter")," asset that stores the sum of weights:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"asset voter {\n  addr        : address;\n  remaining   : nat = maxvotes;\n} shadow {\n  totalweight : nat = 0;\n}\n")),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"vote")," entrypoint would have a shadow effect to store the idea's id:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"entry vote(n : nat, weight : nat) {\n  specification {\n    shadow effect {\n      voter[caller].totalweight += weight\n    }\n  }\n  effect {\n    ...\n  }\n}\n")),Object(o.b)("p",null,"The invariant may then use this shadow information to express maximum vote conservation at voter's level:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"forall v in voter,\n  v.maxvotes = v.totalweight + v.remaining\n")))}u.isMDXComponent=!0},241:function(e,t,a){"use strict";function n(e){var t,a,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(a=n(e[t]))&&(i&&(i+=" "),i+=a);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}t.a=function(){for(var e,t,a=0,i="";a<arguments.length;)(e=arguments[a++])&&(t=n(e))&&(i&&(i+=" "),i+=t);return i}},246:function(e,t,a){"use strict";var n=a(0),i=a(247);t.a=function(){const e=Object(n.useContext)(i.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},247:function(e,t,a){"use strict";var n=a(0);const i=Object(n.createContext)(void 0);t.a=i},248:function(e,t,a){"use strict";var n=a(0),i=a.n(n),o=a(246),r=a(241),c=a(56),s=a.n(c);const l=37,b=39;t.a=function(e){const{lazy:t,block:a,defaultValue:c,values:u,groupId:p,className:d}=e,{tabGroupChoices:h,setTabGroupChoices:m}=Object(o.a)(),[f,v]=Object(n.useState)(c),O=n.Children.toArray(e.children);if(null!=p){const e=h[p];null!=e&&e!==f&&u.some((t=>t.value===e))&&v(e)}const j=e=>{v(e),null!=p&&m(p,e)},g=[];return i.a.createElement("div",null,i.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(r.a)("tabs",{"tabs--block":a},d)},u.map((({value:e,label:t})=>i.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":f===e,className:Object(r.a)("tabs__item",s.a.tabItem,{"tabs__item--active":f===e}),key:e,ref:e=>g.push(e),onKeyDown:e=>{((e,t,a)=>{switch(a.keyCode){case b:((e,t)=>{const a=e.indexOf(t)+1;e[a]?e[a].focus():e[0].focus()})(e,t);break;case l:((e,t)=>{const a=e.indexOf(t)-1;e[a]?e[a].focus():e[e.length-1].focus()})(e,t)}})(g,e.target,e)},onFocus:()=>j(e),onClick:()=>{j(e)}},t)))),t?Object(n.cloneElement)(O.filter((e=>e.props.value===f))[0],{className:"margin-vert--md"}):i.a.createElement("div",{className:"margin-vert--md"},O.map(((e,t)=>Object(n.cloneElement)(e,{key:t,hidden:e.props.value!==f})))))}},249:function(e,t,a){"use strict";var n=a(3),i=a(0),o=a.n(i);t.a=function({children:e,hidden:t,className:a}){return o.a.createElement("div",Object(n.a)({role:"tabpanel"},{hidden:t,className:a}),e)}}}]);
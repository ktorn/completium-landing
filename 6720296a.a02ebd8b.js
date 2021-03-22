(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{126:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return r})),a.d(t,"metadata",(function(){return c})),a.d(t,"toc",(function(){return p})),a.d(t,"default",(function(){return b}));var n=a(3),o=a(7),i=(a(0),a(196)),l=a(199),s=a(198),r={id:"tuto6",title:"State Machine",sidebar_label:"6. State Machine",slug:"/dapp-tools/tutorials/archetype-statem"},c={unversionedId:"dapp-tools/tutorials/tuto6",id:"dapp-tools/tutorials/tuto6",isDocsHomePage:!1,title:"State Machine",description:"It is possible to design the smart contract as a state machine which is convenient for ease of read.",source:"@site/docs/dapp-tools/tutorials/tuto6.md",slug:"/dapp-tools/tutorials/archetype-statem",permalink:"/docs/dapp-tools/tutorials/archetype-statem",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/dapp-tools/tutorials/tuto6.md",version:"current",sidebar_label:"6. State Machine",sidebar:"tools",previous:{title:"Date arithmetic",permalink:"/docs/dapp-tools/tutorials/archetype-datearith"},next:{title:"Assets",permalink:"/docs/dapp-tools/tutorials/archetype-assets"}},p=[{value:"Code",id:"code",children:[]},{value:"Deploy",id:"deploy",children:[]},{value:"Call entry points",id:"call-entry-points",children:[]}],d={toc:p};function b(e){var t=e.components,a=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},d,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"It is possible to design the smart contract as a state machine which is convenient for ease of read."),Object(i.b)("h2",{id:"code"},"Code"),Object(i.b)("p",null,"In this example, the machine has 4 states and 3 transitions as illustrated in the shcema below:"),Object(i.b)(l.a,{img:"tuto_statem.svg",width:"60%",mdxType:"DappFigure"}),Object(i.b)("p",null,"Transitions have conditions:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"goes in InProgress state if balance is greater than 3tz"),Object(i.b)("li",{parentName:"ul"},"complete if internal ",Object(i.b)("inlineCode",{parentName:"li"},"value")," is strictly greater than 1 (requires calls to ",Object(i.b)("inlineCode",{parentName:"li"},"inc_value"),")")),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"archetype state_machine\n\nstates =\n| Created initial\n| InProgress\n| Interrupted\n| Completed\n\nvariable value : nat = 0\n\nentry inc_value () {\n  value += 1\n}\n\ntransition init () {\n  from Created to InProgress\n  when { balance > 3tz }\n}\n\ntransition complete {\n  from InProgress to Completed\n  when { value > 1 }\n  effect { transfer balance to caller }\n}\n\ntransition interrupt {\n  from InProgress to Interrupted\n  effect { transfer (50% * balance) to caller }\n}\n")),Object(i.b)("p",null,"Each transition is a contract entry point."),Object(i.b)("h2",{id:"deploy"},"Deploy"),Object(i.b)("p",null,"The following ",Object(i.b)(s.a,{to:"/docs/dapp-tools/completium-cli",mdxType:"Link"},"Completium CLI")," command deploys the contract on the Tezos network:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),"completium-cli deploy 6-state_machine.arl\n")),Object(i.b)("h2",{id:"call-entry-points"},"Call entry points"),Object(i.b)("p",null,"The goal here is to set the state machines to ",Object(i.b)("inlineCode",{parentName:"p"},"Completed")," state. The following commands are necessary:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),"completium call 6-state_machine\n")),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),"completium call 6-state_machine\n")),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{}),"completium call 6-state_machine\n")))}b.isMDXComponent=!0}}]);
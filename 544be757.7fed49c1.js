(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{122:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return d})),n.d(t,"default",(function(){return b}));var o=n(3),c=n(7),i=(n(0),n(207)),a=n(208),r={id:"tuto2",title:"Execution Conditions",sidebar_label:"2. Execution conditions",slug:"/contract/tuto/archetype-execcond"},l={unversionedId:"contract/tuto/tuto2",id:"contract/tuto/tuto2",isDocsHomePage:!1,title:"Execution Conditions",description:"One of the key requirements of a smart contract's entry point is to establish execution conditions:",source:"@site/docs/contract/tuto/tuto2.md",slug:"/contract/tuto/archetype-execcond",permalink:"/docs/contract/tuto/archetype-execcond",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/contract/tuto/tuto2.md",version:"current",sidebar_label:"2. Execution conditions",sidebar:"archetype",previous:{title:"Hello Tezos world",permalink:"/docs/contract/tuto/archetype-hello"},next:{title:"Rationals and transfers",permalink:"/docs/contract/tuto/archetype-rattrans"}},d=[{value:"Code",id:"code",children:[]},{value:"Deploy",id:"deploy",children:[]},{value:"Call entry point",id:"call-entry-point",children:[]},{value:"View contract",id:"view-contract",children:[]}],s={toc:d};function b(e){var t=e.components,n=Object(c.a)(e,["components"]);return Object(i.b)("wrapper",Object(o.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"One of the key requirements of a smart contract's entry point is to establish execution conditions:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Who can call the contract?"),Object(i.b)("li",{parentName:"ul"},"Under which logical conditions?")),Object(i.b)("p",null,"Archetype provides dedicated syntax to make execution conditions very explicit and non ambiguous."),Object(i.b)("h2",{id:"code"},"Code"),Object(i.b)("p",null,"In the following example, the entry point may only be called by the ",Object(i.b)("inlineCode",{parentName:"p"},"admin")," address; it also requires that the argument value ",Object(i.b)("inlineCode",{parentName:"p"},"v")," be between 10 (included) and 20 (strictly) and be even otherwise; if not even, it must be failed with this following message : ",Object(i.b)("inlineCode",{parentName:"p"},"Expected even value"),":"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-archetype",metastring:"{8,10,11}","{8,10,11}":!0}),'archetype exec_condition\n\nvariable value : nat = 0\n\nconstant admin : address = @tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw\n\nentry main(v : nat) {\n  called by admin\n  require {\n      r1: 10 <= v < 20;\n      r2 otherwise "EXPECTED EVEN VALUE": value % 2 = 0\n  }\n  effect {\n     value := v;\n  }\n}\n')),Object(i.b)("p",null,"It is also possible to establish execution conditions with a ",Object(i.b)("inlineCode",{parentName:"p"},"failif")," section.\nExecution conditions have identifiers (here ",Object(i.b)("inlineCode",{parentName:"p"},"r1")," and ",Object(i.b)("inlineCode",{parentName:"p"},"r2"),") used for fail message when no ",Object(i.b)("inlineCode",{parentName:"p"},"otherwise")," is established, and to name the property in contract formal verification."),Object(i.b)("h2",{id:"deploy"},"Deploy"),Object(i.b)("p",null,"The following ",Object(i.b)(a.a,{to:"/docs/cli",mdxType:"Link"},"Completium CLI")," command deploys the contract on the Tezos network:"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{}),"completium-cli deploy 2-exec_condition.arl\n")),Object(i.b)("h2",{id:"call-entry-point"},"Call entry point"),Object(i.b)("p",null,"The following command calls the unique entry point with the argument ",Object(i.b)("inlineCode",{parentName:"p"},"14")," using the ",Object(i.b)("inlineCode",{parentName:"p"},"--with")," option:"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{}),"completium-cli call 2-exec-condition --with '14'\n")),Object(i.b)("h2",{id:"view-contract"},"View contract"),Object(i.b)("p",null,"The following command generates the URL to view the contract in Better call Dev:"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{}),"completium-cli show contract 2-exec-condition\n")))}b.isMDXComponent=!0}}]);
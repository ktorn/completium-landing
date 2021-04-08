(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{152:function(t,e,n){"use strict";n.r(e),n.d(e,"frontMatter",(function(){return l})),n.d(e,"metadata",(function(){return i})),n.d(e,"toc",(function(){return p})),n.d(e,"default",(function(){return d}));var a=n(3),c=n(7),r=(n(0),n(224)),o=(n(227),n(225)),l={id:"tuto8",title:"Call another Contract",sidebar_label:"8. Call a contract",slug:"/contract/tuto/archetype-callcontr"},i={unversionedId:"contract/tuto/tuto8",id:"contract/tuto/tuto8",isDocsHomePage:!1,title:"Call another Contract",description:"Can a contract read another contract's storage?",source:"@site/docs/contract/tuto/tuto8.md",slug:"/contract/tuto/archetype-callcontr",permalink:"/docs/contract/tuto/archetype-callcontr",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/contract/tuto/tuto8.md",version:"current",sidebar_label:"8. Call a contract",sidebar:"contract",previous:{title:"Assets",permalink:"/docs/contract/tuto/archetype-assets"},next:{title:"Testing a contract",permalink:"/docs/contract/tuto/archetype-test"}},p=[{value:"Code",id:"code",children:[]},{value:"Deploy",id:"deploy",children:[]},{value:"Call entry point",id:"call-entry-point",children:[]}],s={toc:p};function d(t){var e=t.components,n=Object(c.a)(t,["components"]);return Object(r.b)("wrapper",Object(a.a)({},s,n,{components:e,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Can a contract read another contract's storage?"),Object(r.b)("p",null,"No, not directly. However it is possible to call another contract with the ",Object(r.b)("inlineCode",{parentName:"p"},"transfer")," instruction we have seen in ",Object(r.b)(o.a,{to:"/docs/contract/tuto/archetype-datedur",mdxType:"Link"},"previous")," examples."),Object(r.b)("p",null,"It is then possible to setup a mechanism for a smart contract to retrieve a data from another smart contracts, under certain conditions and constraints:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"the smart contract you want to retrieve data from must provide an dedicated entry point to provide the data"),Object(r.b)("li",{parentName:"ul"},"this entry point must accept an argument which is call-back to the calling contract; this call-back is an entry point to be called with the desired data as argument)"),Object(r.b)("li",{parentName:"ul"},"the calling contract must provide a call-back entry point to handle the retreived data")),Object(r.b)("p",null,"It is indeed possible in Michelson to wrap an entrypoint address in a value and send it to an entry point with the ",Object(r.b)("inlineCode",{parentName:"p"},"contract")," type."),Object(r.b)("p",null,"Archetype provides a high-level syntax for this pattern: the keyword ",Object(r.b)("inlineCode",{parentName:"p"},"getter")," generates the required entry point and arguments."),Object(r.b)("h2",{id:"code"},"Code"),Object(r.b)("p",null,"The ",Object(r.b)("em",{parentName:"p"},"called")," contract provides a ",Object(r.b)("inlineCode",{parentName:"p"},"getter")," entry point:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype",metastring:"{9}","{9}":!0}),"archetype contract_called\n\nvariable n : nat = 42\n\nentry set_n(p : nat) {\n  n := p\n}\n\ngetter get_n () : nat { return n }\n\n")),Object(r.b)("p",null,"The smart contract uses a variation of the ",Object(r.b)("inlineCode",{parentName:"p"},"transfer")," instruction to call the ",Object(r.b)("inlineCode",{parentName:"p"},"get_n")," entry point. The address of the called contract is passed as parameter:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype",metastring:"{10}","{10}":!0}),"archetype contract_caller\n\nvariable r : nat = 0\n\nentry set_r(p : nat) {\n  r := p\n}\n\nentry inspect(addr : address) {\n  transfer 0tz to addr call get_n<unit * contract<nat>>((Unit, self.set_r))\n}\n")),Object(r.b)("p",null,"A detailed presentation of the ",Object(r.b)("inlineCode",{parentName:"p"},"getter")," keyword may be found ",Object(r.b)("a",{href:"https://docs.archetype-lang.org/archetype-language/transfers#getter-and-contract",target:"_blank"},"here"),"."),Object(r.b)("h2",{id:"deploy"},"Deploy"),Object(r.b)("p",null,"The following ",Object(r.b)(o.a,{to:"/docs/cli",mdxType:"Link"},"Completium CLI")," commands deploy the contract on the Tezos network:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),"completium-cli deploy 8-1-contract_called.arl\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),"completium-cli deploy 8-2-contract_caller.arl\n")),Object(r.b)("h2",{id:"call-entry-point"},"Call entry point"),Object(r.b)("p",null,"The following command calls the unique entry point:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),"completium-cli call 8-2-contract_caller --entry inspect --with @`completium-cli show address 8-1-contract_called`\n")),Object(r.b)("p",null,"You can retrieve the address of the called contract with this command:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),"completium-cli show contract 8-1-contract_called\n")))}d.isMDXComponent=!0}}]);
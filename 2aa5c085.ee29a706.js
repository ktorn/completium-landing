(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{98:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return p})),n.d(t,"toc",(function(){return b})),n.d(t,"default",(function(){return d}));var c=n(3),a=n(7),o=(n(0),n(197)),i=n(199),l=n(201),r={id:"tools3",title:"Completium CLI",sidebar_label:"Completium CLI",slug:"/dapp-tools/completium-cli"},p={unversionedId:"dapp-tools/tools3",id:"dapp-tools/tools3",isDocsHomePage:!1,title:"Completium CLI",description:"$completium-cli is a command line interface to interact (orginate, call, ...) with Archetype smart contracts on the Tezos blockchain.",source:"@site/docs/dapp-tools/tools3.md",slug:"/dapp-tools/completium-cli",permalink:"/docs/dapp-tools/completium-cli",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/dapp-tools/tools3.md",version:"current",sidebar_label:"Completium CLI",sidebar:"tools",previous:{title:"Testing a contract",permalink:"/docs/dapp-tools/tutorials/archetype-test"},next:{title:"React",permalink:"/docs/dapp-tools/react"}},b=[{value:"Getting started",id:"getting-started",children:[]},{value:"Archetype",id:"archetype",children:[]},{value:"Network",id:"network",children:[{value:"Show current endpoint",id:"show-current-endpoint",children:[]},{value:"Switch endpoint",id:"switch-endpoint",children:[]},{value:"Add endpoint",id:"add-endpoint",children:[]},{value:"Remove endpoint",id:"remove-endpoint",children:[]}]},{value:"Account",id:"account",children:[{value:"Import account",id:"import-account",children:[]},{value:"Show current account",id:"show-current-account",children:[]},{value:"Switch account",id:"switch-account",children:[]},{value:"Set account",id:"set-account",children:[]},{value:"Transfer",id:"transfer",children:[]},{value:"Remove account",id:"remove-account",children:[]}]},{value:"Contract",id:"contract",children:[{value:"Deploy / originate",id:"deploy--originate",children:[]},{value:"Show",id:"show",children:[]},{value:"Call",id:"call",children:[]},{value:"Generate javascript",id:"generate-javascript",children:[]},{value:"Show entries",id:"show-entries",children:[]}]}],s={toc:b};function d(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(c.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"$completium-cli")," is a command line interface to interact (orginate, call, ...) with ",Object(o.b)(i.a,{to:"/docs/dapp-tools/archetype",mdxType:"Link"},"Archetype")," smart contracts on the ",Object(o.b)(i.a,{to:"/docs/dapp-tools/tezos",mdxType:"Link"},"Tezos")," blockchain."),Object(o.b)("h2",{id:"getting-started"},"Getting started"),Object(o.b)("p",null,"The CLI is distributed as a npm ",Object(o.b)("a",Object(c.a)({parentName:"p"},{href:"https://www.npmjs.com/package/@completium/completium-cli"}),"package"),". Install it with the following command:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{className:"language-bash"}),"npm i @completium/completium-cli -g\n")),Object(o.b)("p",null,"Once installed, run the ",Object(o.b)("inlineCode",{parentName:"p"},"init")," command:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{className:"language-bash"}),"completium-cli init\n")),Object(o.b)("p",null,"The list of available commands is displayed with:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{className:"language-bash"}),"completium-cli help\n")),Object(o.b)("h2",{id:"archetype"},"Archetype"),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"$completium-cli")," can install (or update) ",Object(o.b)(i.a,{to:"/docs/dapp-tools/archetype",mdxType:"Link"},"Archetype")," compiler with the following command:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"completium-cli install archetype\n")),Object(o.b)("p",null,"If ",Object(o.b)(i.a,{to:"/docs/dapp-tools/archetype",mdxType:"Link"},"Archetype")," binary is already installed, you can just set the path with:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"completium-cli set archetype <PATH_TO_ARCHETYPE_BIN>\n")),Object(o.b)("h2",{id:"network"},"Network"),Object(o.b)("p",null,"The Tezos blockchain provides serveral networks:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"a main network which is the real operating network where ",Object(o.b)("em",{parentName:"li"},"real")," cryptocurrency are exchanged"),Object(o.b)("li",{parentName:"ul"},"several test networks:",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"one in the same version (to test current network)"),Object(o.b)("li",{parentName:"ul"},"one(s) in the future main net version(s) (to test/preprare future version of smart contracts)"),Object(o.b)("li",{parentName:"ul"},"optionally several in older versions")))),Object(o.b)("p",null,"Each version of the blockchain is given a name (..., Carthage, Edo, Florence, ...)."),Object(o.b)("p",null,"An endpoint is an entry node to the network. You interact with the blockchain through an endpoint. You need to specify the endpoint's URL when interacting with the blockchain."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"$completium-cli")," offers a convenient network management system to register, show and switch networks."),Object(o.b)("h3",{id:"show-current-endpoint"},"Show current endpoint"),Object(o.b)("p",null,"Display the endpoint completium is currently using:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{className:"language-bash"}),"completium-cli show endpoint\n")),Object(o.b)("p",null,"For example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{className:"language-bash"}),"$ completium-cli show endpoint\nCurrent network: edo\nCurrent endpoint: https://edonet-tezos.giganode.io\n")),Object(o.b)("h3",{id:"switch-endpoint"},"Switch endpoint"),Object(o.b)("p",null,"Select the current endpoint with the following command:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"completium-cli switch endpoint\n")),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"$completium-cli")," comes with a set of pre-configured endpoints:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{className:"language-bash"}),"$ completium-cli switch endpoint\nCurrent network: edo\nCurrent endpoint: https://edonet-tezos.giganode.io\n? Switch endpoint \u2026\n\u276f main       https://mainnet-tezos.giganode.io\n  edo        https://edonet-tezos.giganode.io\n  florence   https://florence-tezos.giganode.io\n\n")),Object(o.b)("h3",{id:"add-endpoint"},"Add endpoint"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{className:"language-bash"}),"completium-cli add endpoint (main|edo|florence) <ENDPOINT_URL>\n")),Object(o.b)("h3",{id:"remove-endpoint"},"Remove endpoint"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{className:"language-bash"}),"completium-cli remove endpoint <ENDPOINT_URL>\n")),Object(o.b)("h2",{id:"account"},"Account"),Object(o.b)("p",null,"Interacting with a contract requires a Tezos account to sign the transactions. An account is identified by an account address starting by ",Object(o.b)("inlineCode",{parentName:"p"},"tz1"),", like for example ",Object(o.b)("inlineCode",{parentName:"p"},"tz1MZrh8CvYkp7BfLQMcm6mg5FvL5HRZfACw"),"."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"$completium-cli")," provides a convenient account management system to register, list and switch account. Each account is associated with an alias."),Object(o.b)("h3",{id:"import-account"},"Import account"),Object(o.b)("h4",{id:"faucet"},"Faucet"),Object(o.b)("p",null,"When working with the test network, you need ",Object(o.b)("em",{parentName:"p"},"fake")," currencies to interact and test the contracts. There exists a faucet from which you can ",Object(o.b)(i.a,{to:"/docs/dapp-tools/faucet#create-test-account",mdxType:"Link"},"download")," a faucet file to generate a test account from."),Object(o.b)(l.a,{url:"https://faucet.tzalpha.net/",txt:"open faucet",mdxType:"DappButton"}),Object(o.b)("p",null,"Once the faucet file (a ",Object(o.b)("inlineCode",{parentName:"p"},".json")," file) downloaded, the following command generates the account from it:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{className:"language-bash"}),"completium-cli import faucet <FAUCET_FILE> as <ACCOUNT_ALIAS>\n")),Object(o.b)("h4",{id:"private-key"},"Private key"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{className:"language-bash"}),"completium-cli import privatekey <PRIVATE_KEY> as <ACCOUNT_ALIAS>\n")),Object(o.b)("h3",{id:"show-current-account"},"Show current account"),Object(o.b)("p",null,"The following command displays the account ",Object(o.b)("inlineCode",{parentName:"p"},"$completium-cli")," is currently using:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"completium-cli show account\n")),Object(o.b)("h3",{id:"switch-account"},"Switch account"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"completium-cli switch account\n")),Object(o.b)("h3",{id:"set-account"},"Set account"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"completium-cli set account <ACCOUNT_ALIAS>\n")),Object(o.b)("h3",{id:"transfer"},"Transfer"),Object(o.b)("p",null,"The following command transfers tez from one account to another:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"completium-cli transfer <AMOUNT>(tz|utz) from <ACCOUNT_ALIAS> to <ACCOUNT_ALIAS|ACCOUNT_ADDRESS>\n")),Object(o.b)("p",null,"For example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{className:"language-bash"}),"$ completium-cli transfer 5.2tz from bob to alice\n")),Object(o.b)("h3",{id:"remove-account"},"Remove account"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"completium-cli remove account <ACCOUNT_ALIAS>\n")),Object(o.b)("h2",{id:"contract"},"Contract"),Object(o.b)("h3",{id:"deploy--originate"},"Deploy / originate"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"$ completium-cli deploy <FILE.arl> \\\n    [--as <ACCOUNT_ALIAS>] \\\n    [--named <CONTRACT_ALIAS>] \\\n    [--amount <AMOUNT>(tz|utz)] \\\n    [--burn-cap <BURN_CAP>] \\\n    [--force]\n")),Object(o.b)("p",null,"For example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"$ completium-cli deploy mycontract.arl --as admin --amount 15.5tz\n")),Object(o.b)("p",null,"This creates a contract alias ",Object(o.b)("inlineCode",{parentName:"p"},"mycontract")),Object(o.b)("h3",{id:"show"},"Show"),Object(o.b)("p",null,"It is possible to show data related to a contract alias:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"$ completium-cli show contract <CONTRACT_ALIAS>\n")),Object(o.b)("p",null,"For example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{className:"language-bash"}),"$ completium-cli show contract demo\nName:    demo\nNetwork: edo\nAddress: KT1DYXUVknWdHnMdGYWyNPJwsvSZwnjdXt8J\nUrl:     https://better-call.dev/edo2net/KT1DYXUVknWdHnMdGYWyNPJwsvSZwnjdXt8J\n")),Object(o.b)("h3",{id:"call"},"Call"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"$ completium-cli call <CONTRACT_ALIAS> as <ACCOUNT_ALIAS> \\\n  [--entry <ENTRYPOINT>] \\\n  [--with <ARG>] \\\n  [--amount <AMOUNT>(tz|utz)]\n")),Object(o.b)("p",null,"For example, if ",Object(o.b)("inlineCode",{parentName:"p"},"mycontract.arl")," defines an entry point ",Object(o.b)("inlineCode",{parentName:"p"},"payback"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{className:"language-archetype"}),"entry payback (n : int) {\n  // ...\n}\n")),Object(o.b)("p",null,"The command to call the entry is:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"$ completium-cli call mycontract as admin --entry payback --with 5\n")),Object(o.b)("h3",{id:"generate-javascript"},"Generate javascript"),Object(o.b)("p",null,"The javascript verion of the contract is required when a DApp is originating the contract using ",Object(o.b)(i.a,{to:"/docs/dapp-tools/taquito",mdxType:"Link"},"Taquito"),"."),Object(o.b)("p",null,"The command to generate the javascript version is:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"completium-cli generate javascript <FILE.arl|CONTRACT_ALIAS>\n")),Object(o.b)("p",null,"For example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"$ completium-cli generate javascript mycontract.arl > mycontract.js\n")),Object(o.b)("p",null,"The generated ",Object(o.b)("inlineCode",{parentName:"p"},"mycontract.js")," file exports:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"the Micheline/Json ",Object(o.b)("inlineCode",{parentName:"li"},"code")," of the contract"),Object(o.b)("li",{parentName:"ul"},"the ",Object(o.b)("inlineCode",{parentName:"li"},"getStorage")," method to build the initial storage")),Object(o.b)("p",null,"See ",Object(o.b)(i.a,{to:"/docs/dapp-tools/taquito#contract-origination",mdxType:"Link"},"here")," an example of how to use in a DApp."),Object(o.b)("h3",{id:"show-entries"},"Show entries"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"completium-cli show entries <CONTRACT_ID|CONTRACT_ALIAS>\n")),Object(o.b)("p",null,"The command also works with a remote contract address:"),Object(o.b)("pre",null,Object(o.b)("code",Object(c.a)({parentName:"pre"},{}),"$ completium-cli show entries KT1KyjCqnPEqdEZcRzTsmECpoBM9ndv1rBBk\n%confirm (_ : unit)\n%submit (%packed_score : bytes, %signed_score : signature)\n%decide (_ : unit)\n")))}d.isMDXComponent=!0}}]);
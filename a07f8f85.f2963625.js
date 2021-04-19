(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{172:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return r})),n.d(t,"default",(function(){return d}));var o=n(3),c=(n(0),n(235)),a=n(236);const i={id:"cli1",title:"Network",sidebar_label:"Network",slug:"/cli/network"},l={unversionedId:"cli/cli1",id:"cli/cli1",isDocsHomePage:!1,title:"Network",description:"The Tezos blockchain provides serveral networks:",source:"@site/docs/cli/cli1.md",slug:"/cli/network",permalink:"/docs/cli/network",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/cli/cli1.md",version:"current",sidebar_label:"Network",sidebar:"cli",previous:{title:"Getting Started",permalink:"/docs/cli"},next:{title:"Account",permalink:"/docs/cli/account"}},r=[{value:"Show current endpoint",id:"show-current-endpoint",children:[]},{value:"Switch endpoint",id:"switch-endpoint",children:[]},{value:"Add endpoint",id:"add-endpoint",children:[]},{value:"Remove endpoint",id:"remove-endpoint",children:[]},{value:"Sandbox",id:"sandbox",children:[{value:"Endpoint",id:"endpoint",children:[]},{value:"Accounts",id:"accounts",children:[]}]}],s={toc:r};function d({components:e,...t}){return Object(c.b)("wrapper",Object(o.a)({},s,t,{components:e,mdxType:"MDXLayout"}),Object(c.b)("p",null,"The Tezos blockchain provides serveral networks:"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},"a main network which is the real operating network where ",Object(c.b)("em",{parentName:"li"},"real")," cryptocurrency are exchanged"),Object(c.b)("li",{parentName:"ul"},"several test networks:",Object(c.b)("ul",{parentName:"li"},Object(c.b)("li",{parentName:"ul"},"one in the same version (to test current network)"),Object(c.b)("li",{parentName:"ul"},"one(s) in the future main net version(s) (to test/preprare future version of smart contracts)"),Object(c.b)("li",{parentName:"ul"},"optionally several in older versions")))),Object(c.b)("p",null,"Each version of the blockchain is given a name (..., Carthage, Edo, Florence, ...)."),Object(c.b)("p",null,"An endpoint is an entry node to the network. You interact with the blockchain through an endpoint. You need to specify the endpoint's URL when interacting with the blockchain."),Object(c.b)("p",null,Object(c.b)("inlineCode",{parentName:"p"},"$completium-cli")," offers a convenient network management system to register, show and switch networks."),Object(c.b)("h2",{id:"show-current-endpoint"},"Show current endpoint"),Object(c.b)("p",null,"Display the endpoint completium is currently using:"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),"completium-cli show endpoint\n")),Object(c.b)("p",null,"For example:"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),"$ completium-cli show endpoint\nCurrent network: edo\nCurrent endpoint: https://edonet-tezos.giganode.io\n")),Object(c.b)("h2",{id:"switch-endpoint"},"Switch endpoint"),Object(c.b)("p",null,"Select the current endpoint with the following command:"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{}),"completium-cli switch endpoint\n")),Object(c.b)("p",null,Object(c.b)("inlineCode",{parentName:"p"},"$completium-cli")," comes with a set of pre-configured endpoints:"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),"$ completium-cli switch endpoint\nCurrent network: edo\nCurrent endpoint: https://edonet-tezos.giganode.io\n? Switch endpoint \u2026\n\u276f main       https://mainnet-tezos.giganode.io\n  edo        https://edonet-tezos.giganode.io\n  florence   https://florence-tezos.giganode.io\n\n")),Object(c.b)("h2",{id:"add-endpoint"},"Add endpoint"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),"completium-cli add endpoint (main|edo|florence) <ENDPOINT_URL>\n")),Object(c.b)("h2",{id:"remove-endpoint"},"Remove endpoint"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),"completium-cli remove endpoint <ENDPOINT_URL>\n")),Object(c.b)("h2",{id:"sandbox"},"Sandbox"),Object(c.b)("p",null,Object(c.b)("inlineCode",{parentName:"p"},"$completium-cli")," provides utility commands to install and run the ",Object(c.b)(a.a,{to:"https://gitlab.com/tezos/flextesa",mdxType:"Link"},"Flextesa")," sandbox locally, a presentation of which is available ",Object(c.b)(a.a,{to:"https://assets.tqtezos.com/docs/setup/2-sandbox/",mdxType:"Link"},"here"),"."),Object(c.b)("p",null,"To install and start the sandbox, run the following command:"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{}),"completium-cli start sandbox\n")),Object(c.b)("p",null,"This command assumes you have ",Object(c.b)(a.a,{to:"https://www.docker.com/",mdxType:"Link"},"docker")," installed and running. The container is downloaded the first time you run this command; it may then take some time."),Object(c.b)("p",null,"Check the container is running with the following docker command:"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{}),'$ docker container ls\nCONTAINER ID   IMAGE                       COMMAND          CREATED        STATUS        PORTS                      NAMES\n719c8f02f119   tqtezos/flextesa:20210316   "edobox start"   14 hours ago   Up 14 hours   0.0.0.0:20000->20000/tcp   my-sandbox\n')),Object(c.b)("p",null,"The following command stops the sandbox:"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),"completium-cli stop sandbox\n")),Object(c.b)("h3",{id:"endpoint"},"Endpoint"),Object(c.b)("p",null,"The sandbox endpoint is already available in the list of known endpoints. You need to switch to the ",Object(c.b)("inlineCode",{parentName:"p"},"sandbox")," endpoint with:"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),"$ completium-cli switch endpoint\nCurrent network: sandbox\nCurrent endpoint: http://localhost:20000\n? Switch endpoint \u2026\n  main       https://mainnet-tezos.giganode.io\n  main       https://mainnet.smartpy.io\n  main       https://rpc.tzbeta.net\n  main       https://api.tez.ie/rpc/mainnet\n  edo        https://edonet-tezos.giganode.io\n  edo        https://edonet.smartpy.io\n  florence   https://florence-tezos.giganode.io\n\u276f sandbox    http://localhost:20000\n")),Object(c.b)("h3",{id:"accounts"},"Accounts"),Object(c.b)("p",null,"The sandbox comes with two accounts, 'alice' and 'bob':"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),"$ completium-cli switch account\nCurrent account: alice\n? Switch account \u2026\n\u276f alice                                       tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb\n  bob                                         tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6\n")),Object(c.b)("p",null,"You can import a faucet account as explained ",Object(c.b)(a.a,{to:"/docs/cli/account#faucet",mdxType:"Link"},"here"),", but in the sandbox the faucet account does not come with any tezies. You then need to transfer some from Alice or Bob account:"),Object(c.b)("pre",null,Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),"$ completium-cli import faucet admin.json as admin\n$ completium-cli transfer 10000tz from alice to admin\n")))}d.isMDXComponent=!0}}]);
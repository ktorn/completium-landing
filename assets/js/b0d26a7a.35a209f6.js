"use strict";(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[9785],{2409:function(e,t,c){c.r(t),c.d(t,{frontMatter:function(){return u},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return d},default:function(){return h}});var n,a=c(7462),o=c(3366),i=(c(7294),c(3905)),r=c(9960),l=["components"],u={id:"cli2",title:"Account",sidebar_label:"Account",slug:"/cli/account"},s=void 0,p={unversionedId:"cli/cli2",id:"cli/cli2",title:"Account",description:"Interacting with a contract requires a Tezos account to sign the transactions. An account is identified by an account address starting by tz1, like for example tz1h4CiqWxNe4UxSpkwXy617RM6DaK6NU76P.",source:"@site/docs/cli/cli2.md",sourceDirName:"cli",slug:"/cli/account",permalink:"/docs/cli/account",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/cli/cli2.md",tags:[],version:"current",frontMatter:{id:"cli2",title:"Account",sidebar_label:"Account",slug:"/cli/account"},sidebar:"cli",previous:{title:"Network",permalink:"/docs/cli/network"},next:{title:"Contract",permalink:"/docs/cli/contract"}},d=[{value:"Import account",id:"import-account",children:[{value:"Faucet",id:"faucet",children:[],level:3},{value:"Private key",id:"private-key",children:[],level:3}],level:2},{value:"Generate account",id:"generate-account",children:[],level:2},{value:"Show current account",id:"show-current-account",children:[],level:2},{value:"Switch account",id:"switch-account",children:[],level:2},{value:"Set account",id:"set-account",children:[],level:2},{value:"Transfer",id:"transfer",children:[],level:2},{value:"Remove account",id:"remove-account",children:[],level:2}],m=(n="DappButton",function(e){return console.warn("Component "+n+" was not imported, exported, or provided by MDXProvider as global scope"),(0,i.kt)("div",e)}),k={toc:d};function h(e){var t=e.components,c=(0,o.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},k,c,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Interacting with a contract requires a Tezos account to sign the transactions. An account is identified by an account address starting by ",(0,i.kt)("inlineCode",{parentName:"p"},"tz1"),", like for example ",(0,i.kt)("inlineCode",{parentName:"p"},"tz1h4CiqWxNe4UxSpkwXy617RM6DaK6NU76P"),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"$completium-cli")," provides a convenient account management system to register, list and switch account. Each account is associated with an alias."),(0,i.kt)("h2",{id:"import-account"},"Import account"),(0,i.kt)("h3",{id:"faucet"},"Faucet"),(0,i.kt)("p",null,"When working with the test network, you need ",(0,i.kt)("em",{parentName:"p"},"fake")," currencies to interact and test the contracts. There exists a faucet from which you can ",(0,i.kt)(r.Z,{to:"/docs/dapp-tools/faucet#create-test-account",mdxType:"Link"},"download")," a faucet file to generate a test account from."),(0,i.kt)(m,{url:"https://faucet.tzalpha.net/",txt:"open faucet",mdxType:"DappButton"}),(0,i.kt)("p",null,"Once the faucet file (a ",(0,i.kt)("inlineCode",{parentName:"p"},".json")," file) downloaded, the following command generates the account from it:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"completium-cli import faucet <FAUCET_FILE> as <ACCOUNT_ALIAS>\n")),(0,i.kt)("h3",{id:"private-key"},"Private key"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"completium-cli import privatekey <PRIVATE_KEY> as <ACCOUNT_ALIAS>\n")),(0,i.kt)("h2",{id:"generate-account"},"Generate account"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"completium-cli generate account as <ACCOUNT_ALIAS> [--force]\n")),(0,i.kt)("h2",{id:"show-current-account"},"Show current account"),(0,i.kt)("p",null,"The following command displays the account ",(0,i.kt)("inlineCode",{parentName:"p"},"$completium-cli")," is currently using:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"completium-cli show account\n")),(0,i.kt)("h2",{id:"switch-account"},"Switch account"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"completium-cli switch account\n")),(0,i.kt)("h2",{id:"set-account"},"Set account"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"completium-cli set account <ACCOUNT_ALIAS>\n")),(0,i.kt)("h2",{id:"transfer"},"Transfer"),(0,i.kt)("p",null,"The following command transfers tez from one account to another:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"completium-cli transfer <AMOUNT>(tz|utz) from <ACCOUNT_ALIAS> to <ACCOUNT_ALIAS|ACCOUNT_ADDRESS>\n")),(0,i.kt)("p",null,"For example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"$ completium-cli transfer 5.2tz from bob to alice\n")),(0,i.kt)("h2",{id:"remove-account"},"Remove account"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"completium-cli remove account <ACCOUNT_ALIAS>\n")))}h.isMDXComponent=!0}}]);
(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[7008],{5191:function(t,e,n){"use strict";n.r(e),n.d(e,{frontMatter:function(){return p},contentTitle:function(){return d},metadata:function(){return l},toc:function(){return c},default:function(){return h}});var a=n(2122),o=n(9756),r=(n(7294),n(3905)),s=(n(6742),n(7134)),i=["components"],p={id:"first3",title:"Display contract data",sidebar_label:"3. Display contract data",slug:"/dapp-first/display-storage"},d=void 0,l={unversionedId:"dapp-first/first3",id:"dapp-first/first3",isDocsHomePage:!1,title:"Display contract data",description:"The goal is to display some data retrieved from the ownership contract storage.",source:"@site/docs/dapp-first/first3.md",sourceDirName:"dapp-first",slug:"/dapp-first/display-storage",permalink:"/docs/dapp-first/display-storage",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-first/first3.md",version:"current",frontMatter:{id:"first3",title:"Display contract data",sidebar_label:"3. Display contract data",slug:"/dapp-first/display-storage"},sidebar:"first",previous:{title:"2. Deploy Smart contract",permalink:"/docs/dapp-first/contract"},next:{title:"4. Bid button",permalink:"/docs/dapp-first/bid-button"}},c=[{value:"React pattern",id:"react-pattern",children:[]},{value:"Taquito",id:"taquito",children:[]},{value:"Set contract address",id:"set-contract-address",children:[]},{value:"Storage display code",id:"storage-display-code",children:[]},{value:"<code>App.js</code> code",id:"appjs-code",children:[]}],m={toc:c};function h(t){var e=t.components,n=(0,o.Z)(t,i);return(0,r.kt)("wrapper",(0,a.Z)({},m,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The goal is to display some data retrieved from the ownership contract storage."),(0,r.kt)("h2",{id:"react-pattern"},"React pattern"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"This section is for information only, no action is required."))),(0,r.kt)("p",null,"We want to display the data ",(0,r.kt)("inlineCode",{parentName:"p"},"assetid"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"owner")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"status")," from the deployed contract."),(0,r.kt)("p",null,"Reading contract data is done asynchronously with RPC calls to the blockchain. The following code is a standard React pattern to load  remote data, and refresh component when data is received."),(0,r.kt)("p",null,"It defines a component named ",(0,r.kt)("inlineCode",{parentName:"p"},"OwnershipData")," whose role is to retrieve and display contract data:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const OwnershipData = (props) => {\n  const { settings } = useSettingsContext();\n  const [{ assetid, owner, forsale }, setData] = React.useState(() => ({\n      assetid : "",\n      owner   : "",\n      forsale : "",\n    }));\n  const loadStorage = React.useCallback(async () => {\n    /* Retrieve data and store them with setData(...) */\n  }, [assetid, owner, forsale]);\n  if (assetid === "") loadStorage();\n  return (\n    /* Render Component */\n  );\n}\n')),(0,r.kt)("p",null,"The function ",(0,r.kt)("inlineCode",{parentName:"p"},"loadstorage")," is called when ",(0,r.kt)("inlineCode",{parentName:"p"},"assetid")," is not yet initialized. When it returns, the call to ",(0,r.kt)("inlineCode",{parentName:"p"},"setData")," triggers the refresh of the component with loaded data."),(0,r.kt)("h2",{id:"taquito"},"Taquito"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"This section is for information only, no action is required."))),(0,r.kt)("p",null,"The ",(0,r.kt)("a",{href:"https://tezostaquito.io/",target:"_blank"},"Taquito")," library provides easy integration of blockchain features in javascript applications. It is pre-installed in the Gitpod environment."),(0,r.kt)("p",null,"The following code shows how to retrieve data from the contract when in an asynchronous function. This code is to be inserted in the function passed to ",(0,r.kt)("inlineCode",{parentName:"p"},"useCallback")," above:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"{5-7}","{5-7}":!0},'const tezos     = new TezosToolkit(settings.endpoint);\nconst contract  = await tezos.contract.at(settings.contract);\nconst storage   = await contract.storage();\nsetData({\n  assetid : storage.assetid,\n  owner   : storage.owner,\n  forsale : storage._state.toNumber() > 0 ? "For Sale" : "Not For Sale",\n});\n')),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"endpoint")," constant is the endpoint URL to the Tezos test network."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"contractAddress")," constant is the address of the conctract that has been deployed in previous step."),(0,r.kt)("h2",{id:"set-contract-address"},"Set contract address"),(0,r.kt)("p",null,"It is required to set the ownership contract address in ",(0,r.kt)("inlineCode",{parentName:"p"},"~/src/settings.js"),"."),(0,r.kt)("p",null,"To display the contract address, ",(0,r.kt)("strong",{parentName:"p"},"run")," the command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"completium-cli show contract ownership\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Copy-paste")," the contract address line 9 of ",(0,r.kt)("inlineCode",{parentName:"p"},"~/src/settings.js"),", like for example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"{4}","{4}":!0},"const [settings,setState] = useState({\n    network  : 'granadanet',\n    endpoint : 'https://testnet-tezos.giganode.io',\n    contract : 'KT1BAVw4WhU7BAs2jiakDv4VrR9CNzQK32rd',\n    show     : false,\n});\n")),(0,r.kt)("h2",{id:"storage-display-code"},"Storage display code"),(0,r.kt)("p",null,"The code below synthesizes the sections above."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Replace")," in ",(0,r.kt)("inlineCode",{parentName:"p"},"~/src/App.js")," the comment:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"/* FIXME: Step 3.1 */\n")),(0,r.kt)("p",null,"with the code below (click 'copy' in the upper-right-hand corner):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const Cell = (props) => {\n  return (<Grid item xs={6}><Typography align="left" variant="subtitle2"\n    style={ props.data ? { fontFamily: courier } : { } }> { props.val }\n  </Typography></Grid>)\n}\n\nconst OwnershipData = (props) => {\n  const { settings } = useSettingsContext();\n  const [{ assetid, owner, forsale }, setData] = useState(() => ({\n      assetid : "",\n      owner   : "",\n      forsale : "",\n    }));\n  const loadStorage = React.useCallback(async () => {\n    const tezos     = new TezosToolkit(settings.endpoint);\n    const contract  = await tezos.contract.at(settings.contract);\n    const storage   = await contract.storage();\n    setData({\n      assetid : storage.assetid,\n      owner   : storage.owner,\n      forsale : storage._state.toNumber() > 0 ? "For Sale" : "Not For Sale",\n    });\n  }, [assetid, owner, forsale]);\n  if (assetid === "") loadStorage();\n  return (\n    <Container maxWidth=\'xs\'>\n    <Grid container direction="row" alignItems="center" spacing={1}>\n      <Cell val="Asset Id"/><Cell val={ assetid.substring(0, 20) + "..." } data/>\n      <Cell val="Owner"   /><Cell val={ owner.substring(0, 20) + "..." } data/>\n      <Cell val="Status"  /><Cell val={ forsale }/>\n    </Grid>\n    </Container>\n  );\n}\n')),(0,r.kt)("p",null,"Now ",(0,r.kt)("strong",{parentName:"p"},"replace")," in ",(0,r.kt)("inlineCode",{parentName:"p"},"~/src/App.js")," the code between the comments:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"{ /* FIXME: Step 3.2 Start --*/ }\n...\n{ /* FIXME: Step 3.2 End --*/ }\n")),(0,r.kt)("p",null,"with the code below (click 'copy' in the upper-right-hand corner):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},"<Grid item xs={12}>\n  <OwnershipData />\n</Grid>\n")),(0,r.kt)("p",null,"The result should look something like:"),(0,r.kt)(s.Z,{img:"ownership1.png",width:"60%",mdxType:"DappFigure"}),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Note that the interface is launched in the right-hand panel. It is ",(0,r.kt)("strong",{parentName:"p"},"automatically")," recompiled and updated when a source file is saved (no need to launch anything)."))),(0,r.kt)("h2",{id:"appjs-code"},(0,r.kt)("inlineCode",{parentName:"h2"},"App.js")," code"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"This section is for information only, no action is required."))),(0,r.kt)("p",null,"This section presents the code of ",(0,r.kt)("inlineCode",{parentName:"p"},"~/src/App.js")," at the end of this step:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:"{26-59,85-87}","{26-59,85-87}":!0},"import './App.css';\nimport React from 'react';\nimport useMediaQuery from '@material-ui/core/useMediaQuery';\nimport { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';\nimport CssBaseline from '@material-ui/core/CssBaseline';\nimport Container from '@material-ui/core/Container';\nimport Typography from '@material-ui/core/Typography';\nimport Link from '@material-ui/core/Link';\nimport Grid from '@material-ui/core/Grid';\n\nimport { DAppProvider } from './dappstate';\nimport { SnackProvider } from './snackstate';\nimport { appName, alegreya } from './settings';\nimport Snack from './components/Snack';\nimport WalletButton from './components/WalletButton';\n\nimport { TezosToolkit } from '@taquito/taquito';\nimport { endpoint, contractAddress, courier } from './settings.js';\nimport { useState } from 'react';\n\nimport Button from '@material-ui/core/Button';\nimport { useTezos, useAccountPkh } from './dappstate';\nimport { useSnackContext } from './snackstate';\nimport { UnitValue } from '@taquito/taquito';\n\nconst Cell = (props) => {\n  return (<Grid item xs={6}><Typography align=\"left\" variant=\"subtitle2\"\n    style={ props.data ? { fontFamily: courier } : { } }> { props.val }\n  </Typography></Grid>)\n}\n\nconst OwnershipData = (props) => {\n  const { settings } = useSettingsContext();\n  const [{ assetid, owner, forsale }, setData] = useState(() => ({\n      assetid : \"\",\n      owner   : \"\",\n      forsale : \"\",\n    }));\n  const loadStorage = React.useCallback(async () => {\n    const tezos     = new TezosToolkit(settings.endpoint);\n    const contract  = await tezos.contract.at(settings.contract);\n    const storage   = await contract.storage();\n    setData({\n      assetid : storage.assetid,\n      owner   : storage.owner,\n      forsale : storage._state.toNumber() > 0 ? \"For Sale\" : \"Not For Sale\",\n    });\n  }, [assetid, owner, forsale]);\n  if (assetid === \"\") loadStorage();\n  return (\n    <Container maxWidth='xs'>\n    <Grid container direction=\"row\" alignItems=\"center\" spacing={1}>\n      <Cell val=\"Asset Id\"/><Cell val={ assetid.substring(0, 20) + \"...\" } data/>\n      <Cell val=\"Owner\"   /><Cell val={ owner.substring(0, 20) + \"...\" } data/>\n      <Cell val=\"Status\"  /><Cell val={ forsale }/>\n    </Grid>\n    </Container>\n  );\n}\n\n/* FIXME: step 4.1 */\n\n/* FIXME: Step 6.1 */\n\nfunction App() {\n  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');\n  const theme = React.useMemo(\n    () =>\n      createMuiTheme({\n        palette: {\n          type: prefersDarkMode ? 'dark' : 'light',\n        },\n      }),\n    [prefersDarkMode],\n  );\n  return (\n    <DAppProvider appName={ appName }>\n      <SettingsProvider>\n      <SnackProvider>\n      <ThemeProvider theme={ theme }>\n      <CssBaseline />\n      <div className=\"App\">\n        <Container style={{ marginTop: 50 }}>\n          <Grid container spacing={3}>\n            <Grid item xs={12}>\n                <OwnershipData />\n            </Grid>\n\n            { /* FIXME: Step 4.2 */ }\n\n            { /* FIXME: Step 6.2 */ }\n\n            { /* FIXME: Step 4.3 */ }\n          </Grid>\n        </Container>\n      </div>\n      <SettingsPanel/>\n      <Snack />\n      </ThemeProvider>\n      </SnackProvider>\n      </SettingsProvider>\n    </DAppProvider>\n  );\n}\n\nexport default App;\n")))}h.isMDXComponent=!0}}]);
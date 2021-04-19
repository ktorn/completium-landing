(window.webpackJsonp=window.webpackJsonp||[]).push([[127],{197:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return s})),a.d(t,"metadata",(function(){return i})),a.d(t,"toc",(function(){return c})),a.d(t,"default",(function(){return d}));var n=a(3),o=(a(0),a(235)),r=(a(236),a(238));const s={id:"first3",title:"Display contract data",sidebar_label:"3. Display contract data",slug:"/dapp-first/display-storage"},i={unversionedId:"dapp-first/first3",id:"dapp-first/first3",isDocsHomePage:!1,title:"Display contract data",description:"The goal is to display some data retrieved from the ownership contract storage.",source:"@site/docs/dapp-first/first3.md",slug:"/dapp-first/display-storage",permalink:"/docs/dapp-first/display-storage",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/dapp-first/first3.md",version:"current",sidebar_label:"3. Display contract data",sidebar:"first",previous:{title:"Deploy Smart Contract",permalink:"/docs/dapp-first/contract"},next:{title:"Bid button",permalink:"/docs/dapp-first/bid-button"}},c=[{value:"React pattern",id:"react-pattern",children:[]},{value:"Taquito",id:"taquito",children:[]},{value:"Set contract address",id:"set-contract-address",children:[]},{value:"Storage display code",id:"storage-display-code",children:[]},{value:"<code>App.js</code> code",id:"appjs-code",children:[]}],p={toc:c};function d({components:e,...t}){return Object(o.b)("wrapper",Object(n.a)({},p,t,{components:e,mdxType:"MDXLayout"}),Object(o.b)("p",null,"The goal is to display some data retrieved from the ownership contract storage."),Object(o.b)("h2",{id:"react-pattern"},"React pattern"),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(n.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(n.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(o.b)("path",Object(n.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(o.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"This section is for information only, no action is required."))),Object(o.b)("p",null,"We want to display the data ",Object(o.b)("inlineCode",{parentName:"p"},"assetid"),", ",Object(o.b)("inlineCode",{parentName:"p"},"owner")," and ",Object(o.b)("inlineCode",{parentName:"p"},"status")," from the deployed contract."),Object(o.b)("p",null,"Reading contract data is done asynchronously with RPC calls to the blockchain. The following code is a standard React pattern to load  remote data, and refresh component when data is received."),Object(o.b)("p",null,"It defines a component named ",Object(o.b)("inlineCode",{parentName:"p"},"OwnershipData")," whose role is to retrieve and display contract data:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),'const OwnershipData = (props) => {\n  const [{ assetid, owner, forsale }, setData] = React.useState(() => ({\n      assetid : "",\n      owner   : "",\n      forsale : "",\n    }));\n  const loadStorage = React.useCallback(async () => {\n    /* Retrieve data and store them with setData(...) */\n  }, [assetid, owner, forsale]);\n  if (assetid === "") loadStorage();\n  return (\n    /* Render Component */\n  );\n}\n')),Object(o.b)("p",null,"The function ",Object(o.b)("inlineCode",{parentName:"p"},"loadstorage")," is called when ",Object(o.b)("inlineCode",{parentName:"p"},"assetid")," is not yet initialized. When it returns, the call to ",Object(o.b)("inlineCode",{parentName:"p"},"setData")," triggers the refresh of the component with loaded data."),Object(o.b)("h2",{id:"taquito"},"Taquito"),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(n.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(n.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(o.b)("path",Object(n.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(o.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"This section is for information only, no action is required."))),Object(o.b)("p",null,"The ",Object(o.b)("a",{href:"https://tezostaquito.io/",target:"_blank"},"Taquito")," library provides easy integration of blockchain features in javascript applications. It is pre-installed in the Gitpod environment."),Object(o.b)("p",null,"The following code shows how to retrieve data from the contract when in an asynchronous function. This code is to be inserted in the function passed to ",Object(o.b)("inlineCode",{parentName:"p"},"useCallback")," above:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js",metastring:"{5-7}","{5-7}":!0}),'const tezos     = new TezosToolkit(endpoint);\nconst contract  = await tezos.contract.at(contractAddress);\nconst storage   = await contract.storage();\nsetData({\n  assetid : storage.assetid,\n  owner   : storage.owner,\n  forsale : storage._state.toNumber() > 0 ? "For Sale" : "Not For Sale",\n});\n')),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"endpoint")," constant is the endpoint URL to the Tezos test network."),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"contractAddress")," constant is the address of the conctract that has been deployed in previous step."),Object(o.b)("h2",{id:"set-contract-address"},"Set contract address"),Object(o.b)("p",null,"It is required to set the ownership contract address in ",Object(o.b)("inlineCode",{parentName:"p"},"~/src/settings.js"),"."),Object(o.b)("p",null,"To display the contract address, ",Object(o.b)("strong",{parentName:"p"},"run")," the command:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{}),"completium-cli show contract ownership\n")),Object(o.b)("p",null,"For example in ",Object(o.b)("inlineCode",{parentName:"p"},"~/src/settings.js"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),'export const contractAddress = "KT1LyBhUUP6vnqwAyJTrZ3y2iA6BeZtSSnbk";\n')),Object(o.b)("h2",{id:"storage-display-code"},"Storage display code"),Object(o.b)("p",null,"The code below synthesizes the sections above."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Replace")," in ",Object(o.b)("inlineCode",{parentName:"p"},"~/src/App.js")," the comment:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"/* FIXME: Step 3.1 */\n")),Object(o.b)("p",null,"with the code below (click 'copy' in the upper-right-hand corner):"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),'const Cell = (props) => {\n  return (<Grid item xs={6}><Typography align="left" variant="subtitle2"\n    style={ props.data ? { fontFamily: courier } : { } }> { props.val }\n  </Typography></Grid>)\n}\n\nconst OwnershipData = (props) => {\n  const [{ assetid, owner, forsale }, setData] = useState(() => ({\n      assetid : "",\n      owner   : "",\n      forsale : "",\n    }));\n  const loadStorage = React.useCallback(async () => {\n    const tezos     = new TezosToolkit(endpoint);\n    const contract  = await tezos.contract.at(contractAddress);\n    const storage   = await contract.storage();\n    setData({\n      assetid : storage.assetid,\n      owner   : storage.owner,\n      forsale : storage._state.toNumber() > 0 ? "For Sale" : "Not For Sale",\n    });\n  }, [assetid, owner, forsale]);\n  if (assetid === "") loadStorage();\n  return (\n    <Container maxWidth=\'xs\'>\n    <Grid container direction="row" alignItems="center" spacing={1}>\n      <Cell val="Asset Id"/><Cell val={ assetid.substring(0, 20) + "..." } data/>\n      <Cell val="Owner"   /><Cell val={ owner.substring(0, 20) + "..." } data/>\n      <Cell val="Status"  /><Cell val={ forsale }/>\n    </Grid>\n    </Container>\n  );\n}\n')),Object(o.b)("p",null,"Now ",Object(o.b)("strong",{parentName:"p"},"replace")," in ",Object(o.b)("inlineCode",{parentName:"p"},"~/src/App.js")," the code between the comments:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"{ /* FIXME: Step 3.2 Start --*/ }\n...\n{ /* FIXME: Step 3.2 End --*/ }\n")),Object(o.b)("p",null,"with the code below (click 'copy' in the upper-right-hand corner):"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-html"}),"<Grid item xs={12}>\n  <OwnershipData />\n</Grid>\n")),Object(o.b)("p",null,"The result should look something like:"),Object(o.b)(r.a,{img:"ownership1.png",width:"60%",mdxType:"DappFigure"}),Object(o.b)("h2",{id:"appjs-code"},Object(o.b)("inlineCode",{parentName:"h2"},"App.js")," code"),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(n.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(n.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(o.b)("path",Object(n.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(o.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"This section is for information only, no action is required."))),Object(o.b)("p",null,"This section presents the code of ",Object(o.b)("inlineCode",{parentName:"p"},"~/src/App.js")," at the end of this step:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js",metastring:"{26-58,83-85}","{26-58,83-85}":!0}),"import './App.css';\nimport React from 'react';\nimport useMediaQuery from '@material-ui/core/useMediaQuery';\nimport { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';\nimport CssBaseline from '@material-ui/core/CssBaseline';\nimport Container from '@material-ui/core/Container';\nimport Typography from '@material-ui/core/Typography';\nimport Link from '@material-ui/core/Link';\nimport Grid from '@material-ui/core/Grid';\n\nimport { DAppProvider } from './dappstate';\nimport { SnackProvider } from './snackstate';\nimport { appName, alegreya } from './settings';\nimport Snack from './components/Snack';\nimport WalletButton from './components/WalletButton';\n\nimport { TezosToolkit } from '@taquito/taquito';\nimport { endpoint, contractAddress, courier } from './settings.js';\nimport { useState } from 'react';\n\nimport Button from '@material-ui/core/Button';\nimport { useTezos, useAccountPkh } from './dappstate';\nimport { useSnackContext } from './snackstate';\nimport { UnitValue } from '@taquito/taquito';\n\nconst Cell = (props) => {\n  return (<Grid item xs={6}><Typography align=\"left\" variant=\"subtitle2\"\n    style={ props.data ? { fontFamily: courier } : { } }> { props.val }\n  </Typography></Grid>)\n}\n\nconst OwnershipData = (props) => {\n  const [{ assetid, owner, forsale }, setData] = useState(() => ({\n      assetid : \"\",\n      owner   : \"\",\n      forsale : \"\",\n    }));\n  const loadStorage = React.useCallback(async () => {\n    const tezos     = new TezosToolkit(endpoint);\n    const contract  = await tezos.contract.at(contractAddress);\n    const storage   = await contract.storage();\n    setData({\n      assetid : storage.assetid,\n      owner   : storage.owner,\n      forsale : storage._state.toNumber() > 0 ? \"For Sale\" : \"Not For Sale\",\n    });\n  }, [assetid, owner, forsale]);\n  if (assetid === \"\") loadStorage();\n  return (\n    <Container maxWidth='xs'>\n    <Grid container direction=\"row\" alignItems=\"center\" spacing={1}>\n      <Cell val=\"Asset Id\"/><Cell val={ assetid.substring(0, 20) + \"...\"} data/>\n      <Cell val=\"Owner\"   /><Cell val={ owner.substring(0, 20) + \"...\"} data/>\n      <Cell val=\"Status\"  /><Cell val={ forsale }/>\n    </Grid>\n    </Container>\n  );\n}\n\n/* FIXME: step 4.1 */\n\n/* FIXME: Step 6.1 */\n\nfunction App() {\n  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');\n  const theme = React.useMemo(\n    () =>\n      createMuiTheme({\n        palette: {\n          type: prefersDarkMode ? 'dark' : 'light',\n        },\n      }),\n    [prefersDarkMode],\n  );\n  return (\n    <DAppProvider appName={ appName }>\n      <SnackProvider>\n      <ThemeProvider theme={ theme }>\n      <CssBaseline />\n      <div className=\"App\">\n        <Container style={{ marginTop: 50 }}>\n          <Grid container spacing={3}>\n            <Grid item xs={12}>\n                <OwnershipData />\n            </Grid>\n\n            { /* FIXME: Step 4.2 */ }\n\n            { /* FIXME: Step 6.2 */ }\n\n            { /* FIXME: Step 4.3 */ }\n          </Grid>\n        </Container>\n      </div>\n      <Snack />\n      </ThemeProvider>\n      </SnackProvider>\n    </DAppProvider>\n  );\n}\n\nexport default App;\n")))}d.isMDXComponent=!0}}]);
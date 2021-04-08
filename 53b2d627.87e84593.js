(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{127:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return p})),n.d(t,"metadata",(function(){return u})),n.d(t,"toc",(function(){return b})),n.d(t,"default",(function(){return m}));var a=n(3),r=n(7),o=(n(0),n(224)),i=n(225),l=n(245),c=n(246),s=n(261),d=n.n(s),p={id:"template4",title:"DEX",sidebar_label:"DEX",slug:"/templates/dex"},u={unversionedId:"templates/template4",id:"templates/template4",isDocsHomePage:!1,title:"DEX",description:"Introduction",source:"@site/docs/templates/template4.md",slug:"/templates/dex",permalink:"/docs/templates/dex",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/templates/template4.md",version:"current",sidebar_label:"DEX",sidebar:"templates",previous:{title:"FA 2",permalink:"/docs/templates/nft"},next:{title:"ICO",permalink:"/docs/templates/ico"}},b=[{value:"Introduction",id:"introduction",children:[]},{value:"API",id:"api",children:[{value:"Storage",id:"storage",children:[]},{value:"Entrypoints",id:"entrypoints",children:[]}]},{value:"Code",id:"code",children:[]}],f={toc:b};function m(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},f,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"introduction"},"Introduction"),Object(o.b)("p",null,"This Decentralized Exchange (DEX) presented here is based on the Uniswap-like exchange presented in this ",Object(o.b)("a",{href:"https://web.stanford.edu/~guillean/papers/uniswap_analysis.pdf",target:"_blank"},"paper"),". The principle is the one of automated market maker (AMM), that is that the exchange rate from token A to token B is computed automatically."),Object(o.b)("p",null,"To exchange ",Object(o.b)("em",{parentName:"p"},"qA")," tokens A against ",Object(o.b)("em",{parentName:"p"},"qB")," tokens B, the DEX establishes a pool of tokens A and a pool of tokens B, from which tokens are withdrawn or credited; if ",Object(o.b)("em",{parentName:"p"},"pA")," and ",Object(o.b)("em",{parentName:"p"},"pB")," are the numbers of tokens A and B in the pools, then the quantity ",Object(o.b)("em",{parentName:"p"},"qB")," of token B received in exchange of a quantity ",Object(o.b)("em",{parentName:"p"},"qA")," of token A is given by the following formula:"),Object(o.b)(d.a.Provider,null,Object(o.b)(d.a.Node,{formula:"qB = pB * \\frac{(1-f)*qA}{pA+(1-f)*qA}"})),Object(o.b)("p",null,"This principle is explained in more detailed in the ",Object(o.b)(i.a,{to:"/docs/dapp-dex",mdxType:"Link"},"DEX DApp")," example."),Object(o.b)("h2",{id:"api"},"API"),Object(o.b)("h3",{id:"storage"},"Storage"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"admin")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"address")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Address that can register and unregister tokens in the DEX.")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"token")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"collection")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Token data: ",Object(o.b)("ul",null,Object(o.b)("li",null,"token identifier (key)"),Object(o.b)("li",null,"FA 1.2 contract address"),Object(o.b)("li",null,"token name"),Object(o.b)("li",null,"XTZ value in pool"),Object(o.b)("li",null,"number of tokens in pool"),Object(o.b)("li",null,"number of liquidity tokens")))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"liquidity")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"collection")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Number of liquidity tokens per owner and token: ",Object(o.b)("ul",null,Object(o.b)("li",null,"token id (key)"),Object(o.b)("li",null,"owner (key)"),Object(o.b)("li",null,"number of liquidity tokens")))))),Object(o.b)("h3",{id:"entrypoints"},"Entrypoints"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Parameters"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null})))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"registertoken")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"i"),", ",Object(o.b)("inlineCode",{parentName:"td"},"a"),", ",Object(o.b)("inlineCode",{parentName:"td"},"n")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Admin adds token ",Object(o.b)("inlineCode",{parentName:"td"},"{\xa0i; a; n; 0; 0; 0 }")," to DEX.")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"deletetoken")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"i")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Admin removes token ",Object(o.b)("inlineCode",{parentName:"td"},"i")," from DEX.")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"exchange")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"tA"),", ",Object(o.b)("inlineCode",{parentName:"td"},"qA"),", ",Object(o.b)("inlineCode",{parentName:"td"},"tB"),", ",Object(o.b)("inlineCode",{parentName:"td"},"qB")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("em",{parentName:"td"},"Caller")," exchanges ",Object(o.b)("inlineCode",{parentName:"td"},"qA")," tokens ",Object(o.b)("inlineCode",{parentName:"td"},"tA")," for ",Object(o.b)("inlineCode",{parentName:"td"},"qB")," tokens ",Object(o.b)("inlineCode",{parentName:"td"},"tB"),".")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"addLiquidity")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"tA"),", ",Object(o.b)("inlineCode",{parentName:"td"},"qA")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("em",{parentName:"td"},"Caller")," provides ",Object(o.b)("inlineCode",{parentName:"td"},"qA")," tokens ",Object(o.b)("inlineCode",{parentName:"td"},"tA")," and the corresponding amount of XTZ is transferred.",Object(o.b)("p",null),"Liquidity tokens are minted and affected to  ",Object(o.b)("em",{parentName:"td"},"caller")," so that it reflects the proportion of ",Object(o.b)("em",{parentName:"td"},"transferred")," XTZ towards the XTZ pool.")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"removeLiquidity")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"tA"),", ",Object(o.b)("inlineCode",{parentName:"td"},"qL")),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(o.b)("em",{parentName:"td"},"Caller")," redeems ",Object(o.b)("inlineCode",{parentName:"td"},"qL")," liquidity token for token ",Object(o.b)("inlineCode",{parentName:"td"},"tA"),"; 2 transactions are generated : ",Object(o.b)("ul",null,Object(o.b)("li",null,"transfer of XTZ in proportion of the token XTZ pool"),Object(o.b)("li",null,"transfer of ",Object(o.b)("inlineCode",{parentName:"td"},"tA")," tokens in proportion of the token pool")))))),Object(o.b)("h2",{id:"code"},"Code"),Object(o.b)(l.a,{defaultValue:"archetype",values:[{label:"Archetype",value:"archetype"},{label:"Michelson",value:"michelson"}],mdxType:"Tabs"},Object(o.b)(c.a,{value:"archetype",mdxType:"TabItem"},Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype"}),'archetype dex(admin : address, initialminted : nat)\n\nconstant fee     : rational = 0.003\nconstant epsilon : nat      = 1\n\nasset token {\n  id        : string ;\n  addr      : address;\n  name      : string ;\n  xtzpool   : nat = 0;\n  tokpool   : nat = 0;\n  liqpool   : nat = 0;\n}\n\nasset liquidity identified by tokenid owner {\n  tokenid  : string ;\n  owner    : address;\n  liqt     : nat = 0;\n}\n\nentry registertoken (i : string, a : address, n : string) {\n  called by admin\n  failif { f1: i = "XTZ" }\n  effect { token.addupdate(i, { addr = a; name = n }); }\n}\n\nentry deletetoken (i : string) {\n  called by admin\n  effect { token.remove(i) }\n}\n\nfunction compute_qB(qA : nat, pA : nat, pB : nat) : rational {\n  var feeqA = (1 - fee) * qA;\n  return (pB * feeqA / (pA + feeqA))\n}\n\nentry exchange(tA : string, qA : nat, tB : string, qB : nat) {\n  require {\n    r0 otherwise "SRC_EQ_DST" : tA <> tB;\n  }\n  effect {\n    (* DEX receives *)\n    if tA = "XTZ" then begin\n      var pA = token[tB].xtzpool;\n      var pB = token[tB].tokpool;\n      var expected_qB = compute_qB(qA, pA, pB);\n      dorequire(abs(expected_qB - qB) <= epsilon, ("INVALID_B_AMOUNT", expected_qB));\n      var xtzin : nat = transferred;\n      dorequire(qA = xtzin, ("INVALID_A_AMOUNT", xtzin));\n      match entrypoint<(address * address * nat)>("%transfer", token[tB].addr) with\n      | some(transferB) ->\n        transfer 0tz to entry transferB((selfaddress, caller, qB))\n      | none -> fail("INVALID_B_ENTRY")\n      end;\n      token.update(tB, { xtzpool += xtzin; tokpool -= qB });\n    end else if tB = "XTZ" then begin\n      var pA = token[tA].tokpool;\n      var pB = token[tA].xtzpool;\n      var expected_qB = compute_qB(qA, pA, pB);\n      dorequire(abs(expected_qB - qB) <= epsilon, ("INVALID_B_AMOUNT", expected_qB));\n      match entrypoint<(address * address * nat)>("%transfer", token[tA].addr) with\n      | some(transferA) ->\n        transfer 0tz to entry transferA((caller, selfaddress, qA))\n      | none -> fail("INVALID_A_ENTRY")\n      end;\n      transfer (qB * 1utz) to caller;\n      token.update(tA, { xtzpool -= qB; tokpool += qA });\n    end else begin\n      var pA      = token[tA].tokpool;\n      var pXTZA   = token[tA].xtzpool;\n      var qXTZ    = abs(floor(compute_qB(qA, pA, pXTZA)));\n      var pXTZB   = token[tB].xtzpool;\n      var pB      = token[tB].tokpool;\n      var expected_qB = compute_qB(qXTZ, pXTZB, pB);\n      dorequire(abs(expected_qB - qB) <= epsilon, ("INVALID_B_AMOUNT", expected_qB));\n      match entrypoint<(address * address * nat)>("%transfer", token[tA].addr) with\n      | some(transferA) ->\n        transfer 0tz to entry transferA((caller, selfaddress, qA))\n      | none -> fail("INVALID_A_ENTRY")\n      end;\n      match entrypoint<(address * address * nat)>("%transfer", token[tB].addr) with\n      | some(transferB) ->\n        transfer 0tz to entry transferB((selfaddress, caller, qB))\n      | none -> fail("INVALID_B_ENTRY")\n      end;\n      token.update(tA, { xtzpool -= qXTZ; tokpool += qA });\n      token.update(tB, { xtzpool += qXTZ; tokpool -= qB });\n    end\n  }\n}\n\nentry addLiquidity(tA : string, qA : nat) {\n  (* transfer qA tokens tA to dex contract *)\n  match entrypoint<(address * address * nat)>("%transfer", token[tA].addr) with\n   | some(transfer_src) ->\n    transfer 0tz to entry transfer_src((caller, selfaddress, qA))\n   | none -> fail("INVALID_DST_ENTRY")\n  end;\n  var xtzin : nat = transferred;\n  (* does qA tokens exchange for xtzin XTZ ? *)\n  var pA = token[tA].tokpool;\n  var pB = token[tA].xtzpool;\n  var expected_qB = compute_qB(qA, pA, pB);\n  dorequire(abs(expected_qB - xtzin) <= epsilon, ("INVALID_B_AMOUNT", expected_qB));\n  var mintedLiqT =\n    if token[tA].tokpool = 0\n    then initialminted\n    else abs(floor(token[tA].liqpool * xtzin / token[tA].xtzpool));\n  liquidity.addupdate((tA, caller), { liqt += mintedLiqT });\n  token.update(tA, { xtzpool += xtzin; tokpool += qA; liqpool += mintedLiqT })\n}\n\nentry removeLiquidity(tA : string, qL : nat) {\n  require {\n    r1 otherwise "NOT_ENOUGHT_LQT": qL <= liquidity[(tA, caller)].liqt\n  }\n  effect {\n    var liqratio = qL / token[tA].liqpool;\n    var xtzout = abs(floor(liqratio * token[tA].xtzpool));\n    transfer (xtzout * 1utz) to caller;\n    match entrypoint<(address * address * nat)>("%transfer", token[tA].addr) with\n    | some(transfer_src) ->\n      var qA = abs(floor(liqratio * token[tA].tokpool));\n      transfer 0tz to entry transfer_src((selfaddress, caller, qA));\n      liquidity.addupdate((tA, caller), { liqt -= qL });\n      token.update(tA, { xtzpool -= xtzout; tokpool -= qA; liqpool -= qL })\n    | none -> fail("INVALID_DST_ENTRY")\n    end;\n  }\n}\n'))),Object(o.b)(c.a,{value:"michelson",mdxType:"TabItem"},Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"")))))}m.isMDXComponent=!0},233:function(e,t,n){"use strict";function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}t.a=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}},242:function(e,t,n){"use strict";var a=n(0),r=n(243);t.a=function(){const e=Object(a.useContext)(r.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},243:function(e,t,n){"use strict";var a=n(0);const r=Object(a.createContext)(void 0);t.a=r},245:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(242),i=n(233),l=n(56),c=n.n(l);const s=37,d=39;t.a=function(e){const{lazy:t,block:n,defaultValue:l,values:p,groupId:u,className:b}=e,{tabGroupChoices:f,setTabGroupChoices:m}=Object(o.a)(),[O,h]=Object(a.useState)(l),j=a.Children.toArray(e.children);if(null!=u){const e=f[u];null!=e&&e!==O&&p.some((t=>t.value===e))&&h(e)}const y=e=>{h(e),null!=u&&m(u,e)},N=[];return r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(i.a)("tabs",{"tabs--block":n},b)},p.map((({value:e,label:t})=>r.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":O===e,className:Object(i.a)("tabs__item",c.a.tabItem,{"tabs__item--active":O===e}),key:e,ref:e=>N.push(e),onKeyDown:e=>{((e,t,n)=>{switch(n.keyCode){case d:((e,t)=>{const n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()})(e,t);break;case s:((e,t)=>{const n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()})(e,t)}})(N,e.target,e)},onFocus:()=>y(e),onClick:()=>{y(e)}},t)))),t?Object(a.cloneElement)(j.filter((e=>e.props.value===O))[0],{className:"margin-vert--md"}):r.a.createElement("div",{className:"margin-vert--md"},j.map(((e,t)=>Object(a.cloneElement)(e,{key:t,hidden:e.props.value!==O})))))}},246:function(e,t,n){"use strict";var a=n(3),r=n(0),o=n.n(r);t.a=function({children:e,hidden:t,className:n}){return o.a.createElement("div",Object(a.a)({role:"tabpanel"},{hidden:t,className:n}),e)}},247:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0)).createContext({MathJax:null,registerNode:function(){}});t.default=a},261:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o(n(262)),r=o(n(264));function o(e){return e&&e.__esModule?e:{default:e}}var i={Provider:a.default,Node:r.default};t.default=i},262:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0)),o=l(n(263)),i=l(n(247));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.hasNodes=!1,n.loaded=!1,n.registerNode=function(){n.hasNodes=!0},n.load=function(){var e=n.props.script;!n.loaded&&n.hasNodes&&(n.loaded=!0,e?(0,o.default)(e,n.onLoad):n.onLoad(null))},n.onLoad=function(e){var t=n.props.options;MathJax.Hub.Config(t),n.setState({MathJax:MathJax})},n.state={MathJax:null,registerNode:n.registerNode},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentDidMount",value:function(){this.load()}},{key:"componentDidUpdate",value:function(){this.load()}},{key:"render",value:function(){var e=this.props.children;return r.createElement(i.default.Provider,{value:this.state},e)}}]),t}(r.Component);c.defaultProps={script:"https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML",options:{tex2jax:{inlineMath:[]},showMathMenu:!1,showMathMenuMSIE:!1}},t.default=c},263:function(e,t){function n(e,t){e.onload=function(){this.onerror=this.onload=null,t(null,e)},e.onerror=function(){this.onerror=this.onload=null,t(new Error("Failed to load "+this.src),e)}}function a(e,t){e.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,t(null,e))}}e.exports=function(e,t,r){var o=document.head||document.getElementsByTagName("head")[0],i=document.createElement("script");"function"==typeof t&&(r=t,t={}),t=t||{},r=r||function(){},i.type=t.type||"text/javascript",i.charset=t.charset||"utf8",i.async=!("async"in t)||!!t.async,i.src=e,t.attrs&&function(e,t){for(var n in t)e.setAttribute(n,t[n])}(i,t.attrs),t.text&&(i.text=""+t.text),("onload"in i?n:a)(i,r),i.onload||n(i,r),o.appendChild(i)}},264:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0)),i=c(n(247)),l=c(n(265));function c(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function p(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(e){function t(){var e,n,a;s(this,t);for(var r=arguments.length,i=Array(r),l=0;l<r;l++)i[l]=arguments[l];return n=a=d(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),a.container=o.createRef(),d(a,n)}return p(t,e),r(t,[{key:"componentDidMount",value:function(){this.typeset()}},{key:"componentDidUpdate",value:function(e){var t=e.inline!=this.props.inline;this.typeset(t)}},{key:"componentWillUnmount",value:function(){this.clear()}},{key:"clear",value:function(){var e=this.props.MathJax;if(this.script&&e){var t=e.Hub.getJaxFor(this.script);t&&t.Remove()}}},{key:"typeset",value:function(e){var t=this,n=this.props,a=n.MathJax,r=n.formula,o=n.onRender;if(a)if(e&&this.clear(),!e&&this.script)a.Hub.Queue((function(){var e=a.Hub.getJaxFor(t.script);if(e)e.Text(r,o);else{var n=t.setScriptText(r);(0,l.default)(a,n,o)}}));else{var i=this.setScriptText(r);(0,l.default)(a,i,o)}}},{key:"setScriptText",value:function(e){var t=this.props.inline;return this.script||(this.script=document.createElement("script"),this.script.type="math/tex; "+(t?"":"mode=display"),this.container.current.appendChild(this.script)),"text"in this.script?this.script.text=e:this.script.textContent=e,this.script}},{key:"render",value:function(){var e=this.props,t=(e.MathJax,e.formula,e.inline,e.onRender,function(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}(e,["MathJax","formula","inline","onRender"]));return this.props.inline?o.createElement("span",a({ref:this.container},t)):o.createElement("div",a({ref:this.container},t))}}]),t}(o.Component);u.defaultProps={inline:!1,onRender:function(){}};var b=function(e){function t(){return s(this,t),d(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return p(t,e),r(t,[{key:"render",value:function(){var e=this;return o.createElement(i.default.Consumer,null,(function(t){var n=t.MathJax;return(0,t.registerNode)(),n?o.createElement(u,a({},e.props,{MathJax:n})):null}))}}]),t}(o.PureComponent);t.default=b},265:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=[],r=[],o=!1;t.default=function(e,t,n){a.push(t),r.push(n),o||(o=!0,setTimeout((function(){return function(e){e.Hub.Queue((function(){var t=e.Hub.elementScripts;e.Hub.elementScripts=function(e){return a};try{return e.Hub.Process(null,(function(){r.forEach((function(e){e()})),a=[],r=[],o=!1}))}catch(n){throw n}finally{e.Hub.elementScripts=t}}))}(e)}),0))}}}]);
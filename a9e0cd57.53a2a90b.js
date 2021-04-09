(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{172:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return u})),n.d(t,"metadata",(function(){return p})),n.d(t,"toc",(function(){return d})),n.d(t,"default",(function(){return m}));var o=n(3),a=(n(0),n(224)),r=(n(226),n(227)),i=n(228),c=n(225),s=n(261),l=n.n(s);const u={id:"dex1",title:"Decentralised Exchange",sidebar_label:"Introduction",slug:"/dapp-dex"},p={unversionedId:"dapp-dex/dex1",id:"dapp-dex/dex1",isDocsHomePage:!1,title:"Decentralised Exchange",description:"Introduction",source:"@site/docs/dapp-dex/dex1.md",slug:"/dapp-dex",permalink:"/docs/dapp-dex",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/dapp-dex/dex1.md",version:"current",sidebar_label:"Introduction",sidebar:"dapps",previous:{title:"Interactions",permalink:"/docs/dapp-nonfungible/interactions"},next:{title:"Use Case Presentation",permalink:"/docs/dapp-dex/presentation"}},d=[{value:"Introduction",id:"introduction",children:[]},{value:"DApp",id:"dapp",children:[{value:"Exchange principle",id:"exchange-principle",children:[]},{value:"Architecture",id:"architecture",children:[]}]}],h=(b="MathComponent",function(e){return console.warn("Component "+b+" was not imported, exported, or provided by MDXProvider as global scope"),Object(a.b)("div",e)});var b;const f={toc:d};function m({components:e,...t}){return Object(a.b)("wrapper",Object(o.a)({},f,t,{components:e,mdxType:"MDXLayout"}),Object(a.b)(r.a,{img:"dex-screen.png",width:"100%",mdxType:"DappFigure"}),Object(a.b)(i.a,{url:"https://edukera.github.io/completium-dapp-dex/",txt:"open dapp",mdxType:"DappButton"}),Object(a.b)("h2",{id:"introduction"},"Introduction"),Object(a.b)("p",null,"Year 2038. FIAT currencies have collapsed under nations' huge public debts, and a great reset in the economy has favorised the raise of City Coins: each main city is now emitting its own token for citizens and tourists to pay for public services (transport, museums, ...) and some affiliated retail shops."),Object(a.b)("p",null,"When moving or traveling from one city to another, you need to exchange from one City Token to another."),Object(a.b)("p",null,"Nine prestigious cities have decided to get together and propose a Decentralized EXchange (DEX) system on the Tezos blockchain: Athens, London, New York, Moscow, Paris, Rio de Janeiro, Rome, Tokyo and Sydney."),Object(a.b)("p",null,"Buy and sell City Tokens with the DEX!"),Object(a.b)("h2",{id:"dapp"},"DApp"),Object(a.b)("h3",{id:"exchange-principle"},"Exchange principle"),Object(a.b)("p",null,"A ",Object(a.b)("a",{href:"https://en.wikipedia.org/wiki/Decentralized_exchange",target:"_blank"},"Decentralized Exchange")," (DEX) is a business that allows customers to trade cryptocurrencies or digital currencies for other assets in a decentralized way, that is without the need for an intermediary."),Object(a.b)("p",null,"The automated market maker's (AMM) principle of the DEX presented in this example DApp is the one of ",Object(a.b)("em",{parentName:"p"},"Uniswap"),", as presented in ",Object(a.b)("a",{href:"https://web.stanford.edu/~guillean/papers/uniswap_analysis.pdf",target:"_blank"},"this paper"),"."),Object(a.b)("p",null,"There is a ",Object(a.b)("em",{parentName:"p"},"pool")," for each each token from which tokens are withdrawn from and credited to. The quantity of tokens in the pool is noted p."),Object(a.b)("p",null,"Say a user wants to exchange a quantity ",Object(a.b)("em",{parentName:"p"},"qA")," of Token A against a quantity ",Object(a.b)("em",{parentName:"p"},"qB")," of token B. In that case, the user credits the pool of Token A with ",Object(a.b)("em",{parentName:"p"},"qA")," tokens, and ",Object(a.b)("em",{parentName:"p"},"qB")," tokens from pool of Token B are sent to the user, as illustrated below:"),Object(a.b)(r.a,{img:"dex-principle.svg",width:"70%",mdxType:"DappFigure"}),Object(a.b)("p",null,"How to compute ",Object(a.b)("em",{parentName:"p"},"qB")," as a function of ",Object(a.b)("em",{parentName:"p"},"qA"),"?"),Object(a.b)("p",null,"The principle is to consider that the product of ",Object(a.b)("em",{parentName:"p"},"pA")," and ",Object(a.b)("em",{parentName:"p"},"pB")," is constant; it is named ",Object(a.b)("em",{parentName:"p"},"constant product markets"),". Formally there exists a constant value ",Object(a.b)("em",{parentName:"p"},"k")," such that:"),Object(a.b)(l.a.Provider,null,Object(a.b)(l.a.Node,{formula:"pB*pA=k"})),Object(a.b)("p",null,"The quantities ",Object(a.b)("em",{parentName:"p"},"qB")," of Token B and ",Object(a.b)("em",{parentName:"p"},"qA")," of Token A are such that they keep the resulting pool quantities equal to this constant, which writes:"),Object(a.b)(l.a.Provider,null,Object(a.b)(l.a.Node,{formula:"(pB - qB)*(pA + qA)=k"})),Object(a.b)("p",null,"Each exchange transaction is subject to a fee. Let ",Object(a.b)("em",{parentName:"p"},"f")," be the percentage of ",Object(a.b)("em",{parentName:"p"},"qA")," that are subject to a fee, so that ",Object(a.b)(h,{tex:String.raw`(1-f)*qA`,mdxType:"MathComponent"})," is the quantity left to increment the pool. The constant product market equation then writes:"),Object(a.b)(l.a.Provider,null,Object(a.b)(l.a.Node,{formula:"(pB - qB)*(pA + (1-f)*qA)=k"})),Object(a.b)("p",null,"Which simplifies to:"),Object(a.b)(l.a.Provider,null,Object(a.b)(l.a.Node,{formula:"qB = pB * \\frac{(1-f)*qA}{pA+(1-f)*qA}"})),Object(a.b)("p",null,"At the beginning, pools A and B are empty and must then be initialized by providing liquidity to both of them, thus setting the initial exchange rate."),Object(a.b)("p",null,"It is also possible to provide liquidity to the pair of of pool any time according to exchange rate. Transaction fees are transferred to liquidity providers in proportion to their liquidity ownership."),Object(a.b)("h3",{id:"architecture"},"Architecture"),Object(a.b)("p",null,"The section above presents the exchange principle between two tokens A and B. In the example DApp you can exchange between XTZ and the City Coins: each city coin's pool is associated to a dedicated XTZ (Tezos currency) pool:"),Object(a.b)(r.a,{img:"dex-principle2.svg",width:"30%",mdxType:"DappFigure"}),Object(a.b)("p",null,"Tokens ownership is managed with a ",Object(a.b)(c.a,{to:"/docs/templates/fa12",mdxType:"Link"},"FA 1.2 smart contract")," per Token. FA 1.2 is a specification of Fungible Token ownership for the Tezos blockchain; a FA 1.2 contract provides the following entry points:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"allow")," to authorize a third party to transfer a given quantity of token"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"transfer")," to transfer a quantity of tokens from one account to another according to transfer authorizations"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"get_balance")," enable to retrieve account balance")),Object(a.b)("p",null,"A detailed presentation of the ",Object(a.b)("a",{href:"https://archetype-lang.org/"},"Archetype")," implementation is available ",Object(a.b)("a",{href:"",target:"_blank"},"here"),"."),Object(a.b)("p",null,"The ",Object(a.b)(c.a,{to:"/docs/templates/dex",mdxType:"Link"},"DEX smart contract")," manages the XTZ pools, the interactions to the FA 1.2 contracts, and the liquidity ownership data:"),Object(a.b)(r.a,{img:"dex-principle3.svg",width:"80%",mdxType:"DappFigure"}),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"exchange")," is the unique entry point to exchange",Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},"from XTZ to a token"),Object(a.b)("li",{parentName:"ul"},"from a token to XTZ"),Object(a.b)("li",{parentName:"ul"},"from a token to another token"))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"provide liquidity")," to provide liquidity the XTZ pool and the token pool against ",Object(a.b)("em",{parentName:"li"},"liquidity tokens")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"redeem liquidity")," to redeem liquidity tokens for XTZ")),Object(a.b)("p",null,"When exchanging from one city token A to another B, the DEX actually generates two exchanges:"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"exchange from A to XTZ"),Object(a.b)("li",{parentName:"ol"},"exchange from XTZ to B")),Object(a.b)("p",null,"Note that:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"when exchanging city token for XTZ, the token ownership is transferred from the user's account to the DEX account as a FA 1.2 does not allow token destruction; in that case the user needs to allow the DEX for transferring ownership by calling ``"),Object(a.b)("li",{parentName:"ul"},"when exchanging XTZ for city token, the token ownership is transferred from the DEX's account to the user's account")))}m.isMDXComponent=!0},226:function(e,t,n){"use strict";n(0),n(230)},247:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0)).createContext({MathJax:null,registerNode:function(){}});t.default=o},261:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(262)),a=r(n(264));function r(e){return e&&e.__esModule?e:{default:e}}var i={Provider:o.default,Node:a.default};t.default=i},262:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0)),r=c(n(263)),i=c(n(247));function c(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.hasNodes=!1,n.loaded=!1,n.registerNode=function(){n.hasNodes=!0},n.load=function(){var e=n.props.script;!n.loaded&&n.hasNodes&&(n.loaded=!0,e?(0,r.default)(e,n.onLoad):n.onLoad(null))},n.onLoad=function(e){var t=n.props.options;MathJax.Hub.Config(t),n.setState({MathJax:MathJax})},n.state={MathJax:null,registerNode:n.registerNode},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"componentDidMount",value:function(){this.load()}},{key:"componentDidUpdate",value:function(){this.load()}},{key:"render",value:function(){var e=this.props.children;return a.createElement(i.default.Provider,{value:this.state},e)}}]),t}(a.Component);s.defaultProps={script:"https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML",options:{tex2jax:{inlineMath:[]},showMathMenu:!1,showMathMenuMSIE:!1}},t.default=s},263:function(e,t){function n(e,t){e.onload=function(){this.onerror=this.onload=null,t(null,e)},e.onerror=function(){this.onerror=this.onload=null,t(new Error("Failed to load "+this.src),e)}}function o(e,t){e.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,t(null,e))}}e.exports=function(e,t,a){var r=document.head||document.getElementsByTagName("head")[0],i=document.createElement("script");"function"==typeof t&&(a=t,t={}),t=t||{},a=a||function(){},i.type=t.type||"text/javascript",i.charset=t.charset||"utf8",i.async=!("async"in t)||!!t.async,i.src=e,t.attrs&&function(e,t){for(var n in t)e.setAttribute(n,t[n])}(i,t.attrs),t.text&&(i.text=""+t.text),("onload"in i?n:o)(i,a),i.onload||n(i,a),r.appendChild(i)}},264:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0)),i=s(n(247)),c=s(n(265));function s(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function p(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var d=function(e){function t(){var e,n,o;l(this,t);for(var a=arguments.length,i=Array(a),c=0;c<a;c++)i[c]=arguments[c];return n=o=u(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),o.container=r.createRef(),u(o,n)}return p(t,e),a(t,[{key:"componentDidMount",value:function(){this.typeset()}},{key:"componentDidUpdate",value:function(e){var t=e.inline!=this.props.inline;this.typeset(t)}},{key:"componentWillUnmount",value:function(){this.clear()}},{key:"clear",value:function(){var e=this.props.MathJax;if(this.script&&e){var t=e.Hub.getJaxFor(this.script);t&&t.Remove()}}},{key:"typeset",value:function(e){var t=this,n=this.props,o=n.MathJax,a=n.formula,r=n.onRender;if(o)if(e&&this.clear(),!e&&this.script)o.Hub.Queue((function(){var e=o.Hub.getJaxFor(t.script);if(e)e.Text(a,r);else{var n=t.setScriptText(a);(0,c.default)(o,n,r)}}));else{var i=this.setScriptText(a);(0,c.default)(o,i,r)}}},{key:"setScriptText",value:function(e){var t=this.props.inline;return this.script||(this.script=document.createElement("script"),this.script.type="math/tex; "+(t?"":"mode=display"),this.container.current.appendChild(this.script)),"text"in this.script?this.script.text=e:this.script.textContent=e,this.script}},{key:"render",value:function(){var e=this.props,t=(e.MathJax,e.formula,e.inline,e.onRender,function(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n}(e,["MathJax","formula","inline","onRender"]));return this.props.inline?r.createElement("span",o({ref:this.container},t)):r.createElement("div",o({ref:this.container},t))}}]),t}(r.Component);d.defaultProps={inline:!1,onRender:function(){}};var h=function(e){function t(){return l(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return p(t,e),a(t,[{key:"render",value:function(){var e=this;return r.createElement(i.default.Consumer,null,(function(t){var n=t.MathJax;return(0,t.registerNode)(),n?r.createElement(d,o({},e.props,{MathJax:n})):null}))}}]),t}(r.PureComponent);t.default=h},265:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=[],a=[],r=!1;t.default=function(e,t,n){o.push(t),a.push(n),r||(r=!0,setTimeout((function(){return function(e){e.Hub.Queue((function(){var t=e.Hub.elementScripts;e.Hub.elementScripts=function(e){return o};try{return e.Hub.Process(null,(function(){a.forEach((function(e){e()})),o=[],a=[],r=!1}))}catch(n){throw n}finally{e.Hub.elementScripts=t}}))}(e)}),0))}}}]);
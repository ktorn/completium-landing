(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{204:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return u})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return d}));var r=n(3),o=(n(0),n(235)),a=n(236),i=n(278),c=n.n(i);const l={id:"tuto5",title:"Date arithmetic",sidebar_label:"5. Dates arithmetic",slug:"/contract/tuto/archetype-datearith",hide_title:!0},u={unversionedId:"contract/tuto/tuto5",id:"contract/tuto/tuto5",isDocsHomePage:!1,title:"Date arithmetic",description:"Dates arithmetic",source:"@site/docs/contract/tuto/tuto5.md",slug:"/contract/tuto/archetype-datearith",permalink:"/docs/contract/tuto/archetype-datearith",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/contract/tuto/tuto5.md",version:"current",sidebar_label:"5. Dates arithmetic",sidebar:"contract",previous:{title:"Dates and durations",permalink:"/docs/contract/tuto/archetype-datedur"},next:{title:"State Machine",permalink:"/docs/contract/tuto/archetype-statem"}},s=[{value:"Dates arithmetic",id:"dates-arithmetic",children:[{value:"Deploy",id:"deploy",children:[]},{value:"Call entry point",id:"call-entry-point",children:[]},{value:"Next",id:"next",children:[]}]}],p={toc:s};function d({components:e,...t}){return Object(o.b)("wrapper",Object(r.a)({},p,t,{components:e,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"dates-arithmetic"},"Dates arithmetic"),Object(o.b)("p",null,"Standard arithmetic operations are available on dates."),Object(o.b)("p",null,"Convert a date to a day of week, so that:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"0 if sunday"),Object(o.b)("li",{parentName:"ul"},"1 if monday"),Object(o.b)("li",{parentName:"ul"},"2 if tuesday"),Object(o.b)("li",{parentName:"ul"},"3 if wednesday"),Object(o.b)("li",{parentName:"ul"},"4 if thursday"),Object(o.b)("li",{parentName:"ul"},"5 if friday"),Object(o.b)("li",{parentName:"ul"},"6 if saturday")),Object(o.b)("p",null,"The formula to implement is:"),Object(o.b)(c.a.Provider,null,Object(o.b)(c.a.Node,{formula:"n = \\lfloor\\frac{(d + 4d) \\mod 1w}{1d}\\rfloor"})),Object(o.b)("p",null,"where:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("em",{parentName:"li"},"d")," is the date to compute the day of"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("em",{parentName:"li"},"4d")," is the duration of four days"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("em",{parentName:"li"},"1w")," is the duration of one week"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("em",{parentName:"li"},"mod")," is the modulo operator: it translates to ",Object(o.b)("inlineCode",{parentName:"li"},"%")," operator"),Object(o.b)("li",{parentName:"ul"},"\u230a X \u230b is the floor function")),Object(o.b)("p",null,"The euclidean division ",Object(o.b)("inlineCode",{parentName:"p"},"div")," will efficiently implement the floor and division operations."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-archetype",metastring:'{6} title="5-weekday.arl"',"{6}":!0,title:'"5-weekday.arl"'}),"archetype weekday\n\nvariable n : int = 0\n\nentry weekday (d : date) {\n    n := (((d - 1970-01-01) + 4d) % 1w) div 1d\n}\n")),Object(o.b)("h3",{id:"deploy"},"Deploy"),Object(o.b)("p",null,"The following ",Object(o.b)(a.a,{to:"/docs/cli",mdxType:"Link"},"Completium CLI")," command deploys the contract on the Tezos network:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{}),"completium-cli deploy 5-weekday.arl\n")),Object(o.b)("h3",{id:"call-entry-point"},"Call entry point"),Object(o.b)("p",null,"The following command calls the unique entry point:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{}),"completium-cli call 5-weekday --with '2008-11-28'\n")),Object(o.b)("h3",{id:"next"},"Next"),Object(o.b)("p",null,"Open '6-state_machine.arl' and click on \"Next: State Machine\" below."))}d.isMDXComponent=!0},260:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0)).createContext({MathJax:null,registerNode:function(){}});t.default=r},278:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(279)),o=a(n(281));function a(e){return e&&e.__esModule?e:{default:e}}var i={Provider:r.default,Node:o.default};t.default=i},279:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0)),a=c(n(280)),i=c(n(260));function c(e){return e&&e.__esModule?e:{default:e}}var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.hasNodes=!1,n.loaded=!1,n.registerNode=function(){n.hasNodes=!0},n.load=function(){var e=n.props.script;!n.loaded&&n.hasNodes&&(n.loaded=!0,e?(0,a.default)(e,n.onLoad):n.onLoad(null))},n.onLoad=function(e){var t=n.props.options;MathJax.Hub.Config(t),n.setState({MathJax:MathJax})},n.state={MathJax:null,registerNode:n.registerNode},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){this.load()}},{key:"componentDidUpdate",value:function(){this.load()}},{key:"render",value:function(){var e=this.props.children;return o.createElement(i.default.Provider,{value:this.state},e)}}]),t}(o.Component);l.defaultProps={script:"https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML",options:{tex2jax:{inlineMath:[]},showMathMenu:!1,showMathMenuMSIE:!1}},t.default=l},280:function(e,t){function n(e,t){e.onload=function(){this.onerror=this.onload=null,t(null,e)},e.onerror=function(){this.onerror=this.onload=null,t(new Error("Failed to load "+this.src),e)}}function r(e,t){e.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,t(null,e))}}e.exports=function(e,t,o){var a=document.head||document.getElementsByTagName("head")[0],i=document.createElement("script");"function"==typeof t&&(o=t,t={}),t=t||{},o=o||function(){},i.type=t.type||"text/javascript",i.charset=t.charset||"utf8",i.async=!("async"in t)||!!t.async,i.src=e,t.attrs&&function(e,t){for(var n in t)e.setAttribute(n,t[n])}(i,t.attrs),t.text&&(i.text=""+t.text),("onload"in i?n:r)(i,o),i.onload||n(i,o),a.appendChild(i)}},281:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0)),i=l(n(260)),c=l(n(282));function l(e){return e&&e.__esModule?e:{default:e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function p(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var d=function(e){function t(){var e,n,r;u(this,t);for(var o=arguments.length,i=Array(o),c=0;c<o;c++)i[c]=arguments[c];return n=r=s(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),r.container=a.createRef(),s(r,n)}return p(t,e),o(t,[{key:"componentDidMount",value:function(){this.typeset()}},{key:"componentDidUpdate",value:function(e){var t=e.inline!=this.props.inline;this.typeset(t)}},{key:"componentWillUnmount",value:function(){this.clear()}},{key:"clear",value:function(){var e=this.props.MathJax;if(this.script&&e){var t=e.Hub.getJaxFor(this.script);t&&t.Remove()}}},{key:"typeset",value:function(e){var t=this,n=this.props,r=n.MathJax,o=n.formula,a=n.onRender;if(r)if(e&&this.clear(),!e&&this.script)r.Hub.Queue((function(){var e=r.Hub.getJaxFor(t.script);if(e)e.Text(o,a);else{var n=t.setScriptText(o);(0,c.default)(r,n,a)}}));else{var i=this.setScriptText(o);(0,c.default)(r,i,a)}}},{key:"setScriptText",value:function(e){var t=this.props.inline;return this.script||(this.script=document.createElement("script"),this.script.type="math/tex; "+(t?"":"mode=display"),this.container.current.appendChild(this.script)),"text"in this.script?this.script.text=e:this.script.textContent=e,this.script}},{key:"render",value:function(){var e=this.props,t=(e.MathJax,e.formula,e.inline,e.onRender,function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(e,["MathJax","formula","inline","onRender"]));return this.props.inline?a.createElement("span",r({ref:this.container},t)):a.createElement("div",r({ref:this.container},t))}}]),t}(a.Component);d.defaultProps={inline:!1,onRender:function(){}};var f=function(e){function t(){return u(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return p(t,e),o(t,[{key:"render",value:function(){var e=this;return a.createElement(i.default.Consumer,null,(function(t){var n=t.MathJax;return(0,t.registerNode)(),n?a.createElement(d,r({},e.props,{MathJax:n})):null}))}}]),t}(a.PureComponent);t.default=f},282:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=[],o=[],a=!1;t.default=function(e,t,n){r.push(t),o.push(n),a||(a=!0,setTimeout((function(){return function(e){e.Hub.Queue((function(){var t=e.Hub.elementScripts;e.Hub.elementScripts=function(e){return r};try{return e.Hub.Process(null,(function(){o.forEach((function(e){e()})),r=[],o=[],a=!1}))}catch(n){throw n}finally{e.Hub.elementScripts=t}}))}(e)}),0))}}}]);
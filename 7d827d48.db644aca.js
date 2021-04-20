(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{153:function(e,a,t){"use strict";t.r(a),t.d(a,"frontMatter",(function(){return o})),t.d(a,"metadata",(function(){return r})),t.d(a,"toc",(function(){return p})),t.d(a,"default",(function(){return d}));var n=t(3),i=t(7),c=(t(0),t(235)),l=t(236),b=t(248),s=t(249),o={id:"verification6",title:"Failure",sidebar_label:"Failure",slug:"/verification/fail",hide_title:!1},r={unversionedId:"verification/verification6",id:"verification/verification6",isDocsHomePage:!1,title:"Failure",description:"A postcondition says something about the effect of an entrypoint when the entrypoint does not fail. It is possible to specify situations when the entrypoint fails.",source:"@site/docs/verification/verification6.md",slug:"/verification/fail",permalink:"/docs/verification/fail",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/verification/verification6.md",version:"current",sidebar_label:"Failure",sidebar:"verification",previous:{title:"Postcondition",permalink:"/docs/verification/postcondition"},next:{title:"Invariant",permalink:"/docs/verification/invariant"}},p=[{value:"Basics",id:"basics",children:[]},{value:"Archetype builtins",id:"archetype-builtins",children:[{value:"Execution conditions",id:"execution-conditions",children:[]},{value:"Not found",id:"not-found",children:[]},{value:"Out of bound",id:"out-of-bound",children:[]},{value:"Key exists",id:"key-exists",children:[]},{value:"Arithmetic",id:"arithmetic",children:[]}]}],u={toc:p};function d(e){var a=e.components,t=Object(i.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},u,t,{components:a,mdxType:"MDXLayout"}),Object(c.b)("p",null,"A ",Object(c.b)(l.a,{to:"/docs/verification/postcondition",mdxType:"Link"},"postcondition")," says something about the effect of an entrypoint when the entrypoint does not fail. It is possible to specify situations when the entrypoint fails."),Object(c.b)("p",null,"The goal is to generate one failure specification for every case the entrypoint fails."),Object(c.b)("h2",{id:"basics"},"Basics"),Object(c.b)("p",null,"For example, the entrypoint ",Object(c.b)("inlineCode",{parentName:"p"},"set")," fails when the parameter value ",Object(c.b)("inlineCode",{parentName:"p"},"v")," is greater than 10, and fails with the pair ",Object(c.b)("inlineCode",{parentName:"p"},"v")," and the message ",Object(c.b)("inlineCode",{parentName:"p"},'"v must be below 10"'),":"),Object(c.b)(b.a,{defaultValue:"specification",values:[{label:"Specification",value:"specification"},{label:"Entrypoint",value:"archetype"}],mdxType:"Tabs"},Object(c.b)(s.a,{value:"specification",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),'specification entry set(v : nat)\n  fails {\n    f1 with ((a, msg) : nat * string):\n      (* specify failure object *)\n      a   = v and\n      msg = "v must be below 10" and\n      (* specify failure condition *)\n      v >= 10\n  }\n}\n'))),Object(c.b)(s.a,{value:"archetype",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),'archetype simple\n\nvariable value : nat = 0\n\nentry set(v : nat) {\n  if v < 10 then\n    value := v\n  else\n    fail (v, "v must be below 10")\n}\n')))),Object(c.b)("p",null,"Keyword ",Object(c.b)("inlineCode",{parentName:"p"},"fails")," introduces the section to declare specification of fail situations. In the example above the fail statment, is identified with id ",Object(c.b)("inlineCode",{parentName:"p"},"f1"),"."),Object(c.b)("p",null,"As illustrated above, the failure statement is the conjunction of:"),Object(c.b)("ol",null,Object(c.b)("li",{parentName:"ol"},"a statement to describe the object the entrypoint fails with"),Object(c.b)("li",{parentName:"ol"},"a statement to specify the conditions that makes the entrypoint fail")),Object(c.b)("p",null,"The object the entrypoint fails with is usually a string message, but it can be more complex like for example a pair with the string message and a computed value used in the failure decision."),Object(c.b)("h2",{id:"archetype-builtins"},"Archetype builtins"),Object(c.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(c.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-heading"}),Object(c.b)("h5",{parentName:"div"},Object(c.b)("span",Object(n.a)({parentName:"h5"},{className:"admonition-icon"}),Object(c.b)("svg",Object(n.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(c.b)("path",Object(n.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(c.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-content"}),Object(c.b)("p",{parentName:"div"},"This section describes specification features available from version 1.2.4 of Archetype."))),Object(c.b)("p",null,"The Archetype language provides several high-level syntaxes and builtins that may fail. This section presents how to specify their failure behavior."),Object(c.b)("h3",{id:"execution-conditions"},"Execution conditions"),Object(c.b)(b.a,{defaultValue:"archetype",values:[{label:"Code",value:"archetype"},{label:"Specification",value:"specification"}],mdxType:"Tabs"},Object(c.b)(s.a,{value:"specification",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),'f1 with InvalidCaller(msg : string) :\n  msg = "InvalidCaller" and\n  caller <> <ADDRESS>\n'))),Object(c.b)(s.a,{value:"archetype",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"called by <ADDRESS>\n")))),Object(c.b)(b.a,{defaultValue:"archetype",values:[{label:"Code",value:"archetype"},{label:"Specification",value:"specification"}],mdxType:"Tabs"},Object(c.b)(s.a,{value:"specification",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),'f1 with InvalidCondition((msg, id): string * string) :\n  msg = "InvalidCondition" and\n  id  = "r1" and\n  not <CONDITION>\n'))),Object(c.b)(s.a,{value:"archetype",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"require {\n  r1 : <CONDITION>\n}\n")))),Object(c.b)(b.a,{defaultValue:"archetype",values:[{label:"Code",value:"archetype"},{label:"Specification",value:"specification"}],mdxType:"Tabs"},Object(c.b)(s.a,{value:"specification",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),'f1 with InvalidCondition((msg, id): string * string) :\n  msg = "InvalidCondition" and\n  id  = "f1" and\n  <CONDITION>\n'))),Object(c.b)(s.a,{value:"archetype",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"failif {\n  f1 : <CONDITION>\n}\n")))),Object(c.b)("h3",{id:"not-found"},"Not found"),Object(c.b)("p",null,"In the following, ",Object(c.b)("inlineCode",{parentName:"p"},"c")," is an asset collection, ",Object(c.b)("inlineCode",{parentName:"p"},"k")," is a key value and ",Object(c.b)("inlineCode",{parentName:"p"},"i")," is a nat."),Object(c.b)(b.a,{defaultValue:"archetype",values:[{label:"Code",value:"archetype"},{label:"Specification",value:"specification"}],mdxType:"Tabs"},Object(c.b)(s.a,{value:"specification",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),'f with NotFound(msg, v : string * <KEYTYPE>) :\n  msg = "NotFound" and\n  v = k and\n  not c.contains(k)\n'))),Object(c.b)(s.a,{value:"archetype",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"c[k]\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"c.remove(k)\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"c.update(k, ...)\n")))),Object(c.b)("h3",{id:"out-of-bound"},"Out of bound"),Object(c.b)(b.a,{defaultValue:"archetype",values:[{label:"Code",value:"archetype"},{label:"Specification",value:"specification"}],mdxType:"Tabs"},Object(c.b)(s.a,{value:"specification",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),'f with OutOfBound((msg, v): string * nat) :\n  msg = "OutOfBound" and\n  v   = i and\n  c.count() < i\n'))),Object(c.b)(s.a,{value:"archetype",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"c.nth(i)\n")))),Object(c.b)("h3",{id:"key-exists"},"Key exists"),Object(c.b)(b.a,{defaultValue:"archetype",values:[{label:"Code",value:"archetype"},{label:"Specification",value:"specification"}],mdxType:"Tabs"},Object(c.b)(s.a,{value:"specification",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),'f with KeyExists((msg, v) : string * <KEYTYPE>) :\n  msg = "KeyExists" and\n  v   = k and\n  c.contains(k)\n'))),Object(c.b)(s.a,{value:"archetype",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"c.add({\xa0<ID> = k; ...\xa0})\n")))),Object(c.b)("h3",{id:"arithmetic"},"Arithmetic"),Object(c.b)(b.a,{defaultValue:"archetype",values:[{label:"Code",value:"archetype"},{label:"Specification",value:"specification"}],mdxType:"Tabs"},Object(c.b)(s.a,{value:"specification",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),'f with DivByZero(msg : string) :\n  msg = "DivByZero" and\n  b = 0\n'))),Object(c.b)(s.a,{value:"archetype",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"a / b\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"a div b\n")),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"a % b\n")))),Object(c.b)(b.a,{defaultValue:"archetype",values:[{label:"Code",value:"archetype"},{label:"Specification",value:"specification"}],mdxType:"Tabs"},Object(c.b)(s.a,{value:"specification",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),'f with NatAssign(msg : string) :\n  msg = "NatAssign" and\n  n < v\n'))),Object(c.b)(s.a,{value:"archetype",mdxType:"TabItem"},Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-archetype"}),"n -= v\n")))))}d.isMDXComponent=!0},241:function(e,a,t){"use strict";function n(e){var a,t,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(a=0;a<e.length;a++)e[a]&&(t=n(e[a]))&&(i&&(i+=" "),i+=t);else for(a in e)e[a]&&(i&&(i+=" "),i+=a);return i}a.a=function(){for(var e,a,t=0,i="";t<arguments.length;)(e=arguments[t++])&&(a=n(e))&&(i&&(i+=" "),i+=a);return i}},246:function(e,a,t){"use strict";var n=t(0),i=t(247);a.a=function(){const e=Object(n.useContext)(i.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},247:function(e,a,t){"use strict";var n=t(0);const i=Object(n.createContext)(void 0);a.a=i},248:function(e,a,t){"use strict";var n=t(0),i=t.n(n),c=t(246),l=t(241),b=t(56),s=t.n(b);const o=37,r=39;a.a=function(e){const{lazy:a,block:t,defaultValue:b,values:p,groupId:u,className:d}=e,{tabGroupChoices:m,setTabGroupChoices:f}=Object(c.a)(),[h,O]=Object(n.useState)(b),v=n.Children.toArray(e.children);if(null!=u){const e=m[u];null!=e&&e!==h&&p.some((a=>a.value===e))&&O(e)}const j=e=>{O(e),null!=u&&f(u,e)},y=[];return i.a.createElement("div",null,i.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(l.a)("tabs",{"tabs--block":t},d)},p.map((({value:e,label:a})=>i.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":h===e,className:Object(l.a)("tabs__item",s.a.tabItem,{"tabs__item--active":h===e}),key:e,ref:e=>y.push(e),onKeyDown:e=>{((e,a,t)=>{switch(t.keyCode){case r:((e,a)=>{const t=e.indexOf(a)+1;e[t]?e[t].focus():e[0].focus()})(e,a);break;case o:((e,a)=>{const t=e.indexOf(a)-1;e[t]?e[t].focus():e[e.length-1].focus()})(e,a)}})(y,e.target,e)},onFocus:()=>j(e),onClick:()=>{j(e)}},a)))),a?Object(n.cloneElement)(v.filter((e=>e.props.value===h))[0],{className:"margin-vert--md"}):i.a.createElement("div",{className:"margin-vert--md"},v.map(((e,a)=>Object(n.cloneElement)(e,{key:a,hidden:e.props.value!==h})))))}},249:function(e,a,t){"use strict";var n=t(3),i=t(0),c=t.n(i);a.a=function({children:e,hidden:a,className:t}){return c.a.createElement("div",Object(n.a)({role:"tabpanel"},{hidden:a,className:t}),e)}}}]);
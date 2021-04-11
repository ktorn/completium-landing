(window.webpackJsonp=window.webpackJsonp||[]).push([[147],{215:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return b})),n.d(t,"metadata",(function(){return d})),n.d(t,"toc",(function(){return m})),n.d(t,"default",(function(){return p}));var a=n(3),i=n(7),l=(n(0),n(227)),r=n(228),o=n(242),c=n(243),b={id:"template12",title:"Miles",sidebar_label:"Miles",slug:"/templates/miles"},d={unversionedId:"templates/template12",id:"templates/template12",isDocsHomePage:!1,title:"Miles",description:"Introduction",source:"@site/docs/templates/template12.md",slug:"/templates/miles",permalink:"/docs/templates/miles",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/templates/template12.md",version:"current",sidebar_label:"Miles",sidebar:"templates",previous:{title:"Escrow",permalink:"/docs/templates/escrow"},next:{title:"Connected Object",permalink:"/docs/templates/iot"}},m=[{value:"Introduction",id:"introduction",children:[]},{value:"API",id:"api",children:[{value:"Storage",id:"storage",children:[]},{value:"Entrypoints",id:"entrypoints",children:[]}]},{value:"Code",id:"code",children:[]}],s={toc:m};function p(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(l.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("h2",{id:"introduction"},"Introduction"),Object(l.b)("p",null,"This contract stores miles per owners. Miles have an expiration date and valid miles can be consumed."),Object(l.b)("p",null,"See this contract in action in the ",Object(l.b)(r.a,{to:"/docs/dapp-miles/",mdxType:"Link"},"Fidelity Program")," Dapp example."),Object(l.b)("h2",{id:"api"},"API"),Object(l.b)("h3",{id:"storage"},"Storage"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(l.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Type"),Object(l.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"admin")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"address")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Admin address to call ",Object(l.b)("inlineCode",{parentName:"td"},"add")," entrypoint.")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"mile")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"collection")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"A mile is defined by:",Object(l.b)("ul",null,Object(l.b)("li",null,"id"),Object(l.b)("li",null,"amount"),Object(l.b)("li",null,"expiration date")))),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"owner")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"collection")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"A mile owner is defined by:",Object(l.b)("ul",null,Object(l.b)("li",null,"an address"),Object(l.b)("li",null,"a collection of ",Object(l.b)("inlineCode",{parentName:"td"},"mile"))),Object(l.b)("p",null),"A mile is owned by one and only one owner: this is ensured by the use of ",Object(l.b)("inlineCode",{parentName:"td"},"partition")," collection type (see ",Object(l.b)(r.a,{to:"/docs/templates/miles#code",mdxType:"Link"},"code")," below).")))),Object(l.b)("h3",{id:"entrypoints"},"Entrypoints"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Name"),Object(l.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Parameters"),Object(l.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"add")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"ow"),", ",Object(l.b)("inlineCode",{parentName:"td"},"nm_id"),", ",Object(l.b)("inlineCode",{parentName:"td"},"nm_amount"),", ",Object(l.b)("inlineCode",{parentName:"td"},"nm_exp")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Called by ",Object(l.b)("inlineCode",{parentName:"td"},"admin")," to grant owner ",Object(l.b)("inlineCode",{parentName:"td"},"ow")," with ",Object(l.b)("inlineCode",{parentName:"td"},"nm_amount")," miles that expire on ",Object(l.b)("inlineCode",{parentName:"td"},"nm_exp"),".")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"consume")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"ow"),", ",Object(l.b)("inlineCode",{parentName:"td"},"quantity")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Called by ",Object(l.b)("inlineCode",{parentName:"td"},"admin")," to consume ",Object(l.b)("inlineCode",{parentName:"td"},"quantity")," valid miles (ie. miles with expiration date in the future) from owner ",Object(l.b)("inlineCode",{parentName:"td"},"ow"),".")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"clear_expired")),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null})),Object(l.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Removes expired miles.")))),Object(l.b)("h2",{id:"code"},"Code"),Object(l.b)(o.a,{defaultValue:"archetype",values:[{label:"Archetype",value:"archetype"},{label:"Michelson",value:"michelson"},{label:"Specification",value:"specification"}],mdxType:"Tabs"},Object(l.b)(c.a,{value:"archetype",mdxType:"TabItem"},Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype",metastring:'title="miles.arl"',title:'"miles.arl"'}),'archetype miles(admin : address)\n\nasset mile identified by id {\n   id         : string;\n   amount     : nat;\n   expiration : date\n}\n\nasset owner identified by addr {\n  addr  : role;\n  miles : partition<mile> = []\n}\n\nentry add (\n  ow        : address,\n  nm_id     : string,\n  nm_amount : nat,\n  nm_exp    : date) {\n   called by admin\n   failif {\n     c2 : mile.contains(newmile_id);\n   }\n   effect {\n     owner.addupdate (ow, { miles += [{\n       id         = nm_id;\n       amount     = nm_amount;\n       expiration = nm_exp\n      }] })\n   }\n}\n\nentry consume (ow : address, quantity : nat) {\n  called by admin\n  effect {\n    var view = owner[ow].miles.sort(expiration).select(the.expiration >= now);\n    dorequire (view.sum(the.amount) >= quantity, "NotEnoughMiles");\n    var remainder = quantity;\n    for : loop m in view do\n      if remainder > 0 then begin\n        if mile[m].amount > remainder then begin\n          mile.update(m, { amount -= remainder });\n          remainder := 0\n        end else if mile[m].amount = remainder then begin\n          remainder := 0;\n          owner[ow].miles.remove(m)\n        end else begin\n          remainder -= mile[m].amount;\n          owner[ow].miles.remove(m)\n        end\n      end\n    done;\n    assert p1\n  }\n}\n\nentry clear_expired () {\n  for : loop2 o in owner do\n    owner[o].miles.removeif(the.expiration < now)\n  done\n}\n'))),Object(l.b)(c.a,{value:"michelson",mdxType:"TabItem"},Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),""))),Object(l.b)(c.a,{value:"specification",mdxType:"TabItem"},Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype",metastring:'title="miles.arl"',title:'"miles.arl"'}),"specification asset mile {\n  m1: amount > 0;\n}\n\nspecification entry consume (quantity : int) {\n  assert p1 {\n      remainder = 0\n  }\n  postcondition p2 {\n    mile.sum(the.amount) = before.mile.sum(the.amount) - quantity\n    invariant for loop {\n      0 <= remainder <= toiterate.sum(the.amount);\n        before.mile.sum(the.amount) = mile.sum(the.amount) + quantity - remainder\n    }\n  }\n  postcondition p3 {\n    forall m in removed.mile, m.expiration >= now\n    invariant for loop {\n      removed.mile.subsetof(by_expiration)\n    }\n  }\n  postcondition p4 {\n    added.mile.isempty()\n  }\n}\n\nspecification entry clear_expired () {\n  postcondition s3 {\n    forall m in removed.mile, m.expiration < now\n    invariant for loop2 {\n      forall m in removed.mile, m.expiration < now\n    }\n  }\n}\n")))))}p.isMDXComponent=!0},234:function(e,t,n){"use strict";function a(e){var t,n,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(i&&(i+=" "),i+=n);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}t.a=function(){for(var e,t,n=0,i="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(i&&(i+=" "),i+=t);return i}},240:function(e,t,n){"use strict";var a=n(0),i=n(241);t.a=function(){const e=Object(a.useContext)(i.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},241:function(e,t,n){"use strict";var a=n(0);const i=Object(a.createContext)(void 0);t.a=i},242:function(e,t,n){"use strict";var a=n(0),i=n.n(a),l=n(240),r=n(234),o=n(56),c=n.n(o);const b=37,d=39;t.a=function(e){const{lazy:t,block:n,defaultValue:o,values:m,groupId:s,className:p}=e,{tabGroupChoices:u,setTabGroupChoices:j}=Object(l.a)(),[O,N]=Object(a.useState)(o),f=a.Children.toArray(e.children);if(null!=s){const e=u[s];null!=e&&e!==O&&m.some((t=>t.value===e))&&N(e)}const h=e=>{N(e),null!=s&&j(s,e)},y=[];return i.a.createElement("div",null,i.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(r.a)("tabs",{"tabs--block":n},p)},m.map((({value:e,label:t})=>i.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":O===e,className:Object(r.a)("tabs__item",c.a.tabItem,{"tabs__item--active":O===e}),key:e,ref:e=>y.push(e),onKeyDown:e=>{((e,t,n)=>{switch(n.keyCode){case d:((e,t)=>{const n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()})(e,t);break;case b:((e,t)=>{const n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()})(e,t)}})(y,e.target,e)},onFocus:()=>h(e),onClick:()=>{h(e)}},t)))),t?Object(a.cloneElement)(f.filter((e=>e.props.value===O))[0],{className:"margin-vert--md"}):i.a.createElement("div",{className:"margin-vert--md"},f.map(((e,t)=>Object(a.cloneElement)(e,{key:t,hidden:e.props.value!==O})))))}},243:function(e,t,n){"use strict";var a=n(3),i=n(0),l=n.n(i);t.a=function({children:e,hidden:t,className:n}){return l.a.createElement("div",Object(a.a)({role:"tabpanel"},{hidden:t,className:n}),e)}}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[144],{212:function(r,t,i){"use strict";i.r(t),i.d(t,"frontMatter",(function(){return c})),i.d(t,"metadata",(function(){return l})),i.d(t,"toc",(function(){return b})),i.d(t,"default",(function(){return g}));var e=i(3),n=i(7),a=(i(0),i(227)),m=i(228),p=i(242),o=i(243),s=i(357),c={id:"template15",title:"Connected Object",sidebar_label:"Connected Object",slug:"/templates/iot"},l={unversionedId:"templates/template15",id:"templates/template15",isDocsHomePage:!1,title:"Connected Object",description:"Introduction",source:"@site/docs/templates/template15.md",slug:"/templates/iot",permalink:"/docs/templates/iot",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/templates/template15.md",version:"current",sidebar_label:"Connected Object",sidebar:"templates",previous:{title:"Miles",permalink:"/docs/templates/miles"},next:{title:"Health care",permalink:"/docs/templates/healthcare"}},b=[{value:"Introduction",id:"introduction",children:[]},{value:"API",id:"api",children:[{value:"Storage",id:"storage",children:[]},{value:"Entrypoints",id:"entrypoints",children:[]}]},{value:"Originate",id:"originate",children:[{value:"Command line",id:"command-line",children:[]}]},{value:"Code",id:"code",children:[]}],d={toc:b};function g(r){var t=r.components,i=Object(n.a)(r,["components"]);return Object(a.b)("wrapper",Object(e.a)({},d,i,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"introduction"},"Introduction"),Object(a.b)("p",null,"A connected object reads this contract to decide whether to switch on or off."),Object(a.b)("p",null,"It reads the contract on a regular basis (typically every 5 second):"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"it switches on if the ",Object(a.b)("em",{parentName:"li"},"end of service")," date is in the futur"),Object(a.b)("li",{parentName:"ul"},"it switches off if the ",Object(a.b)("em",{parentName:"li"},"end of service")," date is in the past")),Object(a.b)("p",null,"The object is connected to the internet and executes an HTTP GET request to the Tezos blockchain on a regular basis, and reads the resulting Json answer."),Object(a.b)("p",null,"Any user can transfer tezies to the contract to switch on the object for a duration determined by an exhange rate (tez to duration)."),Object(a.b)("p",null,"See this contract in action in the ",Object(a.b)(m.a,{to:"/docs/dapp-iot/",mdxType:"Link"},"Connected Object")," DApp example."),Object(a.b)("h2",{id:"api"},"API"),Object(a.b)("h3",{id:"storage"},"Storage"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",Object(e.a)({parentName:"tr"},{align:null}),"Name"),Object(a.b)("th",Object(e.a)({parentName:"tr"},{align:null}),"Type"),Object(a.b)("th",Object(e.a)({parentName:"tr"},{align:null}),"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"owner")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"adddress")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),"Object owner can change exchange ",Object(a.b)("inlineCode",{parentName:"td"},"rate")," and collect payments.")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"rate")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"rational")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),"Exchange rate between tez and duration: ",Object(a.b)("inlineCode",{parentName:"td"},"rate")," ",Object(a.b)("inlineCode",{parentName:"td"},"time_unit")," in exchange for ",Object(a.b)("inlineCode",{parentName:"td"},"tez_unit")," amount of payment.")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"endofservice")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"date")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),"Date of end of service. Read by object to decide whether to switch on or off.")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"startofservice")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"date")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),"Date of start of service. For information only.")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"time_unit")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"duration")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),"Time unit used in service duration computation.")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"tez_unit")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"tez")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),"Tez unit used in service duration computation.")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"user")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"option<address>")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("ul",null,Object(a.b)("li",null,"some address of the current user to switch on object"),Object(a.b)("li",null," none otherwise")))),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"read_interval")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"duration")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),"Frequency of read by object.")))),Object(a.b)("h3",{id:"entrypoints"},"Entrypoints"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",Object(e.a)({parentName:"tr"},{align:null}),"Name"),Object(a.b)("th",Object(e.a)({parentName:"tr"},{align:null}),"Type"),Object(a.b)("th",Object(e.a)({parentName:"tr"},{align:null}),"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"start")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null})),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),"Starts service. The duration ",Object(a.b)("em",{parentName:"td"},"d")," of service is computed as: ",Object(a.b)("p",null),Object(a.b)("em",{parentName:"td"},"d")," = ",Object(a.b)("inlineCode",{parentName:"td"},"rate")," * ",Object(a.b)("em",{parentName:"td"},"transferred"))),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"interrupt")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null})),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),"User who started service can interrupt it. ",Object(a.b)("p",null),"It pays back the user so that only the effective duration of service is paid.")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"collect")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null})),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),"Owner collects payments.")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"setunits")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"d"),", ",Object(a.b)("inlineCode",{parentName:"td"},"t")),Object(a.b)("td",Object(e.a)({parentName:"tr"},{align:null}),"Owner can set time unit to ",Object(a.b)("inlineCode",{parentName:"td"},"d")," and tez unit to ",Object(a.b)("inlineCode",{parentName:"td"},"t")," when computing duration of service.")))),Object(a.b)("h2",{id:"originate"},"Originate"),Object(a.b)("p",null,"Originate a switch contract with the widget below."),Object(a.b)("p",null,'Click "Connect to Wallet" button, fill the fields "Owner" and "Rate", and click "Originate".'),Object(a.b)(s.a,{mdxType:"DeployIOT"}),Object(a.b)("h3",{id:"command-line"},"Command line"),Object(a.b)("p",null,"Originate the contract from ",Object(a.b)("a",{href:"https://archetype-lang.org/"},"Archetype")," code below with the following ",Object(a.b)(m.a,{to:"/docs/cli",mdxType:"Link"},"Completium CLI")," example command:"),Object(a.b)("pre",null,Object(a.b)("code",Object(e.a)({parentName:"pre"},{}),"completium-cli deploy switch.arl --init '(@tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG, 2,5)'\n")),Object(a.b)("p",null,"The command sets:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"owner")," constant to ",Object(a.b)("inlineCode",{parentName:"li"},"tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"rate")," variable to 2.5")),Object(a.b)("h2",{id:"code"},"Code"),Object(a.b)(p.a,{defaultValue:"archetype",values:[{label:"Archetype",value:"archetype"},{label:"Michelson",value:"michelson"}],mdxType:"Tabs"},Object(a.b)(o.a,{value:"archetype",mdxType:"TabItem"},Object(a.b)("pre",null,Object(a.b)("code",Object(e.a)({parentName:"pre"},{className:"language-archetype",metastring:'title="switch.arl"',title:'"switch.arl"'}),"archetype switch(\n  owner : address,\n  rate  : rational\n)\n\nvariable endofservice    : date = now\nvariable startofservice  : date = now\n\nvariable time_unit : duration = 1m\nvariable tez_unit : tez = 1tz\n\nvariable user : option<address> = none\n\nvariable read_interval : duration = 5s\n\nfunction get_rate_in_s_by_utz () : rational {\n  var d : int = time_unit;\n  var t : nat = tez_unit;\n  return (rate * d / t)\n}\n\nfunction get_return_tz () : tez {\n  var res : int = 1 / get_rate_in_s_by_utz() * (endofservice - now);\n  return (res * 1utz)\n}\n\nentry start () {\n  require { r1: now > endofservice }\n  effect {\n    var t : nat = transferred;\n    var dur : duration = (get_rate_in_s_by_utz() * t)*1s;\n    if dur > read_interval then begin\n      endofservice   := now + dur + read_interval;\n      startofservice := now;\n      user := some(caller)\n    end\n  }\n}\n\nentry interrupt () {\n  require { r2: caller = opt_get(user) and now < endofservice }\n  effect {\n    transfer (get_return_tz()) to caller;\n    endofservice   := now - read_interval;\n    startofservice := now - read_interval;\n  }\n}\n\nentry collect () {\n  called by owner\n  effect {\n    var keep = 0tz;\n    if now < endofservice then\n      keep := get_return_tz();\n    if balance - keep > 0tz then\n      transfer (balance - keep) to owner\n  }\n}\n\nentry setunits (dunit : duration, tunit : tez) {\n  called by owner\n  effect {\n    time_unit := dunit;\n    tez_unit  := tunit;\n  }\n}\n"))),Object(a.b)(o.a,{value:"michelson",mdxType:"TabItem"},Object(a.b)("pre",null,Object(a.b)("code",Object(e.a)({parentName:"pre"},{className:"language-js"}),"")))))}g.isMDXComponent=!0},259:function(r,t,i){"use strict";i.d(t,"a",(function(){return p})),i.d(t,"f",(function(){return o})),i.d(t,"e",(function(){return s})),i.d(t,"b",(function(){return c})),i.d(t,"d",(function(){return l})),i.d(t,"c",(function(){return b}));var e=i(0),n=i.n(e),a=i(288),m=i(355);const[p,o,s,c,l,b]=Object(a.a)((function({appName:r}){const[{wallet:t,tezos:i,accountPkh:e},a]=n.a.useState((()=>({wallet:null,tezos:null,accountPkh:null}))),p=Boolean(i);n.a.useEffect((()=>m.a.onAvailabilityChange((t=>{a({wallet:t?new m.a(r):null,tezos:null,accountPkh:null})}))),[a,r]);const o=n.a.useCallback((async(r,i)=>{try{if(!t)throw new Error("Thanos Wallet not available");await t.connect(r,i);const e=t.toTezos(),n=await e.wallet.pkh();a({wallet:t,tezos:e,accountPkh:n})}catch(e){alert(`Failed to connect ThanosWallet: ${e.message}`)}}),[a,t]);return{wallet:t,tezos:i,accountPkh:e,ready:p,connect:o}}),(r=>r.wallet),(r=>r.tezos),(r=>r.accountPkh),(r=>r.ready),(r=>r.connect))},261:function(r,t,i){"use strict";i.d(t,"a",(function(){return a})),i.d(t,"b",(function(){return m}));var e=i(0),n=i(288);const[a,m]=Object(n.a)((function(){const[r,t]=Object(e.useState)({show:!1,severity:"info",msg:""});return{snackState:r,setInfoSnack:r=>{t({show:!0,severity:"info",msg:r})},setErrorSnack:r=>{t({show:!0,severity:"error",msg:r})},hideSnack:()=>{t((r=>({...r,show:!1})))}}}))},306:function(r,t,i){"use strict";var e=i(3),n=i(0),a=i.n(n),m=i(608),p=i(605),o=i(316),s=i(261);function c(r){return a.a.createElement(p.a,Object(e.a)({elevation:6,variant:"filled"},r))}t.a=()=>{const{snackState:r}=Object(s.b)();Object(o.a)();return a.a.createElement(m.a,{open:r.show},a.a.createElement(c,{severity:r.severity},r.msg))}},307:function(r,t,i){"use strict";var e=i(0),n=i.n(e),a=i(259);var m=i(590),p=i(596),o=i(316);t.a=r=>{const t=Object(o.a)(),i=Object(a.d)(),e=Object(a.f)(),s=Object(a.c)(),c=n.a.useCallback((r=>async()=>{try{await s(r?"mainnet":"edo2net")}catch(t){alert(t.message)}}),[s]);return i?n.a.createElement("div",null):e?n.a.createElement(m.a,{variant:"outlined",color:t.palette.text.primary,onClick:c(r.main)},"connect to wallet"):n.a.createElement(p.a,{href:"https://templewallet.com/",rel:"noopener",underline:"none"},n.a.createElement(m.a,{variant:"contained",disableElevation:!0,style:{backgroundColor:"#ed8936",color:"white",fontWeight:"bold"}},"install Temple"))}},333:function(r,t){},334:function(r,t){},345:function(r,t){},346:function(r,t){},349:function(r,t){},350:function(r,t){},354:function(r,t){var i,e;Fraction=function(r,t){if(void 0!==r&&t)"number"==typeof r&&"number"==typeof t?(this.numerator=r,this.denominator=t):"string"==typeof r&&"string"==typeof t&&(this.numerator=parseInt(r),this.denominator=parseInt(t));else if(void 0===t)if(num=r,"number"==typeof num)this.numerator=num,this.denominator=1;else if("string"==typeof num){var i,e,n=num.split(" ");if(n[0]&&(i=n[0]),n[1]&&(e=n[1]),i%1==0&&e&&e.match("/"))return new Fraction(i).add(new Fraction(e));if(!i||e)return;if("string"==typeof i&&i.match("/")){var a=i.split("/");this.numerator=a[0],this.denominator=a[1]}else{if("string"==typeof i&&i.match("."))return new Fraction(parseFloat(i));this.numerator=parseInt(i),this.denominator=1}}this.normalize()},Fraction.prototype.clone=function(){return new Fraction(this.numerator,this.denominator)},Fraction.prototype.toString=function(){if("NaN"===this.denominator)return"NaN";var r=this.numerator/this.denominator>0?Math.floor(this.numerator/this.denominator):Math.ceil(this.numerator/this.denominator),t=this.numerator%this.denominator,i=this.denominator,e=[];return 0!=r&&e.push(r),0!=t&&e.push((0===r?t:Math.abs(t))+"/"+i),e.length>0?e.join(" "):0},Fraction.prototype.rescale=function(r){return this.numerator*=r,this.denominator*=r,this},Fraction.prototype.add=function(r){var t=this.clone();return r=r instanceof Fraction?r.clone():new Fraction(r),td=t.denominator,t.rescale(r.denominator),r.rescale(td),t.numerator+=r.numerator,t.normalize()},Fraction.prototype.subtract=function(r){var t=this.clone();return r=r instanceof Fraction?r.clone():new Fraction(r),td=t.denominator,t.rescale(r.denominator),r.rescale(td),t.numerator-=r.numerator,t.normalize()},Fraction.prototype.multiply=function(r){var t=this.clone();if(r instanceof Fraction)t.numerator*=r.numerator,t.denominator*=r.denominator;else{if("number"!=typeof r)return t.multiply(new Fraction(r));t.numerator*=r}return t.normalize()},Fraction.prototype.divide=function(r){var t=this.clone();if(r instanceof Fraction)t.numerator*=r.denominator,t.denominator*=r.numerator;else{if("number"!=typeof r)return t.divide(new Fraction(r));t.denominator*=r}return t.normalize()},Fraction.prototype.equals=function(r){r instanceof Fraction||(r=new Fraction(r));var t=this.clone().normalize();r=r.clone().normalize();return t.numerator===r.numerator&&t.denominator===r.denominator},Fraction.prototype.normalize=(i=function(r){return"number"==typeof r&&(r>0&&r%1>0&&r%1<1||r<0&&r%-1<0&&r%-1>-1)},e=function(r,t){if(t){var i=Math.pow(10,t);return Math.round(r*i)/i}return Math.round(r)},function(){if(i(this.denominator)){var r=e(this.denominator,9),t=Math.pow(10,r.toString().split(".")[1].length);this.denominator=Math.round(this.denominator*t),this.numerator*=t}i(this.numerator)&&(r=e(this.numerator,9),t=Math.pow(10,r.toString().split(".")[1].length),this.numerator=Math.round(this.numerator*t),this.denominator*=t);var n=Fraction.gcf(this.numerator,this.denominator);return this.numerator/=n,this.denominator/=n,(this.numerator<0&&this.denominator<0||this.numerator>0&&this.denominator<0)&&(this.numerator*=-1,this.denominator*=-1),this}),Fraction.gcf=function(r,t){var i=[],e=Fraction.primeFactors(r),n=Fraction.primeFactors(t);return e.forEach((function(r){var t=n.indexOf(r);t>=0&&(i.push(r),n.splice(t,1))})),0===i.length?1:function(){var r,t=i[0];for(r=1;r<i.length;r++)t*=i[r];return t}()},Fraction.primeFactors=function(r){for(var t=Math.abs(r),i=[],e=2;e*e<=t;)t%e==0?(i.push(e),t/=e):e++;return 1!=t&&i.push(t),i},r.exports.Fraction=Fraction},357:function(r,t,i){"use strict";var e=i(0),n=i.n(e),a=i(384),m=i(386),p=i(603),o=i(387),s=i(590),c=i(550),l=i(588),b=i(259),d=i(306),g=i(261),u=i(307);const P=[{prim:"storage",args:[{prim:"pair",args:[{prim:"address",annots:["%owner"]},{prim:"pair",args:[{prim:"pair",args:[{prim:"int"},{prim:"nat"}],annots:["%rate"]},{prim:"pair",args:[{prim:"timestamp",annots:["%endofservice"]},{prim:"pair",args:[{prim:"timestamp",annots:["%startofservice"]},{prim:"pair",args:[{prim:"int",annots:["%time_unit"]},{prim:"pair",args:[{prim:"mutez",annots:["%tez_unit"]},{prim:"pair",args:[{prim:"option",args:[{prim:"address"}],annots:["%user"]},{prim:"int",annots:["%read_interval"]}]}]}]}]}]}]}]}]},{prim:"parameter",args:[{prim:"or",args:[{prim:"unit",annots:["%start"]},{prim:"or",args:[{prim:"unit",annots:["%interrupt"]},{prim:"or",args:[{prim:"unit",annots:["%collect"]},{prim:"pair",args:[{prim:"int",annots:["%dunit"]},{prim:"mutez",annots:["%tunit"]}],annots:["%setunits"]}]}]}]}]},{prim:"code",args:[[{prim:"LAMBDA",args:[{prim:"pair",args:[{prim:"pair",args:[{prim:"int"},{prim:"nat"}]},{prim:"pair",args:[{prim:"mutez"},{prim:"int"}]}]},{prim:"pair",args:[{prim:"int"},{prim:"nat"}]},[{prim:"UNPAIR"},{prim:"SWAP"},{prim:"UNPAIR"},{prim:"SWAP"},{prim:"PUSH",args:[{prim:"unit"},{prim:"Unit"}]},{prim:"DIG",args:[{int:"1"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"2"}]},{prim:"PUSH",args:[{prim:"mutez"},{int:"1"}]},{prim:"DIG",args:[{int:"4"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"5"}]},{prim:"EDIV"},{prim:"IF_NONE",args:[[{prim:"PUSH",args:[{prim:"string"},{string:"DivByZero"}]},{prim:"FAILWITH"}],[{prim:"DUP"},{prim:"CAR"},{prim:"SWAP"},{prim:"DROP",args:[{int:"1"}]}]]},{prim:"PUSH",args:[{prim:"nat"},{int:"1"}]},{prim:"DIG",args:[{int:"1"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"2"}]},{prim:"INT"},{prim:"PAIR"},{prim:"PUSH",args:[{prim:"nat"},{int:"1"}]},{prim:"DIG",args:[{int:"3"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"4"}]},{prim:"PAIR"},{prim:"DIG",args:[{int:"7"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"8"}]},{prim:"PAIR"},{prim:"UNPAIR"},{prim:"DIP",args:[{int:"1"},[{prim:"UNPAIR"}]]},{prim:"UNPAIR"},{prim:"DIP",args:[{int:"1"},[{prim:"SWAP"}]]},{prim:"MUL"},{prim:"DIP",args:[{int:"1"},[{prim:"MUL"}]]},{prim:"PAIR"},{prim:"PAIR"},{prim:"UNPAIR"},{prim:"DIP",args:[{int:"1"},[{prim:"UNPAIR"}]]},{prim:"UNPAIR"},{prim:"DIG",args:[{int:"3"}]},{prim:"PUSH",args:[{prim:"int"},{int:"0"}]},{prim:"DIG",args:[{int:"4"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"5"}]},{prim:"COMPARE"},{prim:"GE"},{prim:"IF",args:[[{prim:"INT"}],[{prim:"NEG"}]]},{prim:"MUL"},{prim:"DIP",args:[{int:"1"},[{prim:"MUL"},{prim:"ABS"}]]},{prim:"PAIR"},{prim:"DIP",args:[{int:"1"},[{prim:"DIG",args:[{int:"2"}]},{prim:"DROP",args:[{int:"1"}]}]]},{prim:"DUG",args:[{int:"2"}]},{prim:"DROP",args:[{int:"2"}]},{prim:"DUG",args:[{int:"3"}]},{prim:"DROP",args:[{int:"3"}]}]]},{prim:"LAMBDA",args:[{prim:"pair",args:[{prim:"timestamp"},{prim:"pair",args:[{prim:"pair",args:[{prim:"int"},{prim:"nat"}]},{prim:"pair",args:[{prim:"mutez"},{prim:"pair",args:[{prim:"int"},{prim:"lambda",args:[{prim:"pair",args:[{prim:"pair",args:[{prim:"int"},{prim:"nat"}]},{prim:"pair",args:[{prim:"mutez"},{prim:"int"}]}]},{prim:"pair",args:[{prim:"int"},{prim:"nat"}]}]}]}]}]}]},{prim:"mutez"},[{prim:"UNPAIR"},{prim:"SWAP"},{prim:"UNPAIR"},{prim:"SWAP"},{prim:"UNPAIR"},{prim:"SWAP"},{prim:"UNPAIR"},{prim:"SWAP"},{prim:"PUSH",args:[{prim:"unit"},{prim:"Unit"}]},{prim:"NOW"},{prim:"DIG",args:[{int:"6"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"7"}]},{prim:"SUB"},{prim:"DIG",args:[{int:"2"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"3"}]},{prim:"DIG",args:[{int:"4"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"5"}]},{prim:"DIG",args:[{int:"6"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"7"}]},{prim:"PAIR"},{prim:"DIG",args:[{int:"7"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"8"}]},{prim:"PAIR"},{prim:"EXEC"},{prim:"PUSH",args:[{prim:"nat"},{int:"1"}]},{prim:"PUSH",args:[{prim:"nat"},{int:"1"}]},{prim:"INT"},{prim:"PAIR"},{prim:"PAIR"},{prim:"UNPAIR"},{prim:"DIP",args:[{int:"1"},[{prim:"UNPAIR"}]]},{prim:"UNPAIR"},{prim:"DIG",args:[{int:"3"}]},{prim:"PUSH",args:[{prim:"int"},{int:"0"}]},{prim:"DIG",args:[{int:"4"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"5"}]},{prim:"COMPARE"},{prim:"GE"},{prim:"IF",args:[[{prim:"INT"}],[{prim:"NEG"}]]},{prim:"MUL"},{prim:"DIP",args:[{int:"1"},[{prim:"MUL"},{prim:"ABS"}]]},{prim:"PAIR"},{prim:"PAIR"},{prim:"UNPAIR"},{prim:"UNPAIR"},{prim:"DIG",args:[{int:"2"}]},{prim:"MUL"},{prim:"EDIV"},{prim:"IF_NONE",args:[[{prim:"PUSH",args:[{prim:"string"},{string:"DivByZero"}]},{prim:"FAILWITH"}],[]]},{prim:"CAR"},{prim:"PUSH",args:[{prim:"mutez"},{int:"1"}]},{prim:"PUSH",args:[{prim:"nat"},{int:"1"}]},{prim:"DIG",args:[{int:"2"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"3"}]},{prim:"PAIR"},{prim:"PAIR"},{prim:"UNPAIR"},{prim:"UNPAIR"},{prim:"ABS"},{prim:"DIG",args:[{int:"2"}]},{prim:"MUL"},{prim:"EDIV"},{prim:"IF_NONE",args:[[{prim:"PUSH",args:[{prim:"string"},{string:"DivByZero"}]},{prim:"FAILWITH"}],[]]},{prim:"CAR"},{prim:"DIP",args:[{int:"1"},[{prim:"DIG",args:[{int:"1"}]},{prim:"DROP",args:[{int:"1"}]}]]},{prim:"DUG",args:[{int:"1"}]},{prim:"DROP",args:[{int:"1"}]},{prim:"DUG",args:[{int:"5"}]},{prim:"DROP",args:[{int:"5"}]}]]},{prim:"NIL",args:[{prim:"operation"}]},{prim:"DIG",args:[{int:"3"}]},{prim:"UNPAIR"},{prim:"DIP",args:[{int:"1"},[{prim:"UNPAIR"},{prim:"SWAP"},{prim:"UNPAIR"},{prim:"SWAP"},{prim:"UNPAIR"},{prim:"SWAP"},{prim:"UNPAIR"},{prim:"SWAP"},{prim:"UNPAIR"},{prim:"SWAP"},{prim:"UNPAIR"},{prim:"SWAP"},{prim:"UNPAIR"},{prim:"SWAP"}]]},{prim:"IF_LEFT",args:[[{prim:"DROP",args:[{int:"1"}]},{prim:"DIG",args:[{int:"5"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"6"}]},{prim:"NOW"},{prim:"COMPARE"},{prim:"GT"},{prim:"NOT"},{prim:"IF",args:[[{prim:"PUSH",args:[{prim:"string"},{string:"InvalidCondition: r1"}]},{prim:"FAILWITH"}],[]]},{prim:"PUSH",args:[{prim:"mutez"},{int:"1"}]},{prim:"AMOUNT"},{prim:"EDIV"},{prim:"IF_NONE",args:[[{prim:"PUSH",args:[{prim:"string"},{string:"DivByZero"}]},{prim:"FAILWITH"}],[{prim:"DUP"},{prim:"CAR"},{prim:"SWAP"},{prim:"DROP",args:[{int:"1"}]}]]},{prim:"PUSH",args:[{prim:"int"},{int:"1"}]},{prim:"PUSH",args:[{prim:"nat"},{int:"1"}]},{prim:"DIG",args:[{int:"2"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"3"}]},{prim:"INT"},{prim:"PAIR"},{prim:"DIG",args:[{int:"13"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"14"}]},{prim:"DIG",args:[{int:"7"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"8"}]},{prim:"DIG",args:[{int:"7"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"8"}]},{prim:"PAIR"},{prim:"DIG",args:[{int:"11"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"12"}]},{prim:"PAIR"},{prim:"EXEC"},{prim:"PAIR"},{prim:"UNPAIR"},{prim:"DIP",args:[{int:"1"},[{prim:"UNPAIR"}]]},{prim:"UNPAIR"},{prim:"DIP",args:[{int:"1"},[{prim:"SWAP"}]]},{prim:"MUL"},{prim:"DIP",args:[{int:"1"},[{prim:"MUL"}]]},{prim:"PAIR"},{prim:"PAIR"},{prim:"UNPAIR"},{prim:"UNPAIR"},{prim:"DIG",args:[{int:"2"}]},{prim:"MUL"},{prim:"EDIV"},{prim:"IF_NONE",args:[[{prim:"PUSH",args:[{prim:"string"},{string:"DivByZero"}]},{prim:"FAILWITH"}],[]]},{prim:"CAR"},{prim:"DIG",args:[{int:"2"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"3"}]},{prim:"DIG",args:[{int:"1"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"2"}]},{prim:"COMPARE"},{prim:"GT"},{prim:"IF",args:[[{prim:"DIG",args:[{int:"2"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"3"}]},{prim:"DIG",args:[{int:"1"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"2"}]},{prim:"NOW"},{prim:"ADD"},{prim:"ADD"},{prim:"DIP",args:[{int:"1"},[{prim:"DIG",args:[{int:"7"}]},{prim:"DROP",args:[{int:"1"}]}]]},{prim:"DUG",args:[{int:"7"}]},{prim:"NOW"},{prim:"DIP",args:[{int:"1"},[{prim:"DIG",args:[{int:"6"}]},{prim:"DROP",args:[{int:"1"}]}]]},{prim:"DUG",args:[{int:"6"}]},{prim:"SENDER"},{prim:"SOME"},{prim:"DIP",args:[{int:"1"},[{prim:"DIG",args:[{int:"3"}]},{prim:"DROP",args:[{int:"1"}]}]]},{prim:"DUG",args:[{int:"3"}]}],[]]},{prim:"DROP",args:[{int:"2"}]},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"DIG",args:[{int:"1"}]},{prim:"PAIR"}],[{prim:"IF_LEFT",args:[[{prim:"DROP",args:[{int:"1"}]},{prim:"DIG",args:[{int:"5"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"6"}]},{prim:"NOW"},{prim:"COMPARE"},{prim:"LT"},{prim:"DIG",args:[{int:"2"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"3"}]},{prim:"IF_NONE",args:[[{prim:"PUSH",args:[{prim:"string"},{string:"NoneValue"}]},{prim:"FAILWITH"}],[]]},{prim:"SENDER"},{prim:"COMPARE"},{prim:"EQ"},{prim:"AND"},{prim:"NOT"},{prim:"IF",args:[[{prim:"PUSH",args:[{prim:"string"},{string:"InvalidCondition: r2"}]},{prim:"FAILWITH"}],[]]},{prim:"DIG",args:[{int:"8"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"9"}]},{prim:"SENDER"},{prim:"CONTRACT",args:[{prim:"unit"}]},{prim:"IF_NONE",args:[[{prim:"PUSH",args:[{prim:"string"},{string:"BadContract"}]},{prim:"FAILWITH"}],[]]},{prim:"DIG",args:[{int:"11"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"12"}]},{prim:"DIG",args:[{int:"13"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"14"}]},{prim:"DIG",args:[{int:"7"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"8"}]},{prim:"PAIR"},{prim:"DIG",args:[{int:"6"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"7"}]},{prim:"PAIR"},{prim:"DIG",args:[{int:"10"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"11"}]},{prim:"PAIR"},{prim:"DIG",args:[{int:"9"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"10"}]},{prim:"PAIR"},{prim:"EXEC"},{prim:"UNIT"},{prim:"TRANSFER_TOKENS"},{prim:"CONS"},{prim:"DIP",args:[{int:"1"},[{prim:"DIG",args:[{int:"8"}]},{prim:"DROP",args:[{int:"1"}]}]]},{prim:"DUG",args:[{int:"8"}]},{prim:"DUP"},{prim:"NOW"},{prim:"SUB"},{prim:"DIP",args:[{int:"1"},[{prim:"DIG",args:[{int:"5"}]},{prim:"DROP",args:[{int:"1"}]}]]},{prim:"DUG",args:[{int:"5"}]},{prim:"DUP"},{prim:"NOW"},{prim:"SUB"},{prim:"DIP",args:[{int:"1"},[{prim:"DIG",args:[{int:"4"}]},{prim:"DROP",args:[{int:"1"}]}]]},{prim:"DUG",args:[{int:"4"}]},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"DIG",args:[{int:"1"}]},{prim:"PAIR"}],[{prim:"IF_LEFT",args:[[{prim:"DROP",args:[{int:"1"}]},{prim:"DIG",args:[{int:"7"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"8"}]},{prim:"SENDER"},{prim:"COMPARE"},{prim:"EQ"},{prim:"NOT"},{prim:"IF",args:[[{prim:"PUSH",args:[{prim:"string"},{string:"InvalidCaller"}]},{prim:"FAILWITH"}],[]]},{prim:"PUSH",args:[{prim:"mutez"},{int:"0"}]},{prim:"DIG",args:[{int:"6"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"7"}]},{prim:"NOW"},{prim:"COMPARE"},{prim:"LT"},{prim:"IF",args:[[{prim:"DIG",args:[{int:"10"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"11"}]},{prim:"DIG",args:[{int:"12"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"13"}]},{prim:"DIG",args:[{int:"6"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"7"}]},{prim:"PAIR"},{prim:"DIG",args:[{int:"5"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"6"}]},{prim:"PAIR"},{prim:"DIG",args:[{int:"9"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"10"}]},{prim:"PAIR"},{prim:"DIG",args:[{int:"8"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"9"}]},{prim:"PAIR"},{prim:"EXEC"},{prim:"SWAP"},{prim:"DROP",args:[{int:"1"}]}],[]]},{prim:"PUSH",args:[{prim:"mutez"},{int:"0"}]},{prim:"DIG",args:[{int:"1"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"2"}]},{prim:"BALANCE"},{prim:"SUB"},{prim:"COMPARE"},{prim:"GT"},{prim:"IF",args:[[{prim:"DIG",args:[{int:"9"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"10"}]},{prim:"DIG",args:[{int:"9"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"10"}]},{prim:"CONTRACT",args:[{prim:"unit"}]},{prim:"IF_NONE",args:[[{prim:"PUSH",args:[{prim:"string"},{string:"BadContract"}]},{prim:"FAILWITH"}],[]]},{prim:"DIG",args:[{int:"2"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"3"}]},{prim:"BALANCE"},{prim:"SUB"},{prim:"UNIT"},{prim:"TRANSFER_TOKENS"},{prim:"CONS"},{prim:"DIP",args:[{int:"1"},[{prim:"DIG",args:[{int:"9"}]},{prim:"DROP",args:[{int:"1"}]}]]},{prim:"DUG",args:[{int:"9"}]}],[]]},{prim:"DROP",args:[{int:"1"}]},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"DIG",args:[{int:"1"}]},{prim:"PAIR"}],[{prim:"UNPAIR"},{prim:"SWAP"},{prim:"DIG",args:[{int:"9"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"10"}]},{prim:"SENDER"},{prim:"COMPARE"},{prim:"EQ"},{prim:"NOT"},{prim:"IF",args:[[{prim:"PUSH",args:[{prim:"string"},{string:"InvalidCaller"}]},{prim:"FAILWITH"}],[]]},{prim:"DIG",args:[{int:"1"}]},{prim:"DUP"},{prim:"DUG",args:[{int:"2"}]},{prim:"DIP",args:[{int:"1"},[{prim:"DIG",args:[{int:"5"}]},{prim:"DROP",args:[{int:"1"}]}]]},{prim:"DUG",args:[{int:"5"}]},{prim:"DUP"},{prim:"DIP",args:[{int:"1"},[{prim:"DIG",args:[{int:"4"}]},{prim:"DROP",args:[{int:"1"}]}]]},{prim:"DUG",args:[{int:"4"}]},{prim:"DROP",args:[{int:"2"}]},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"SWAP"},{prim:"PAIR"},{prim:"DIG",args:[{int:"1"}]},{prim:"PAIR"}]]}]]}]]},{prim:"DIP",args:[{int:"1"},[{prim:"DROP",args:[{int:"2"}]}]]}]]}],O=(r,t)=>({prim:"Pair",args:[{string:r},{prim:"Pair",args:[t,{prim:"Pair",args:[{int:"1618169559"},{prim:"Pair",args:[{int:"1618169559"},{prim:"Pair",args:[{int:"60"},{prim:"Pair",args:[{int:"1000000"},{prim:"Pair",args:[{prim:"None"},{int:"5"}]}]}]}]}]}]}]});var I=i(228),D=i(610);const j=r=>{const t=t=>{r.setMain(t.target.checked)};if(Object(b.d)()){const r=Object(b.b)();return n.a.createElement(m.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},n.a.createElement(o.a,{variant:"subtitle2"},"Connected with:"),n.a.createElement(o.a,{variant:"subtitle2",style:{fontFamily:"Courier Prime, monospace"}},r))}return n.a.createElement(m.a,{container:!0},n.a.createElement(m.a,{item:!0,xs:8},n.a.createElement(u.a,{main:r.main})),n.a.createElement(m.a,{item:!0,xs:2},n.a.createElement(D.a,{checked:r.main,onChange:t,name:"checkedB",color:"primary"})),n.a.createElement(m.a,{item:!0,xs:2},n.a.createElement(o.a,{variant:"subtitle2",style:{marginTop:"8px"}},"Mainnet")))};const h=r=>n.a.createElement(m.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},n.a.createElement(o.a,{variant:"subtitle2"},"Contract available at:"),n.a.createElement(o.a,{component:I.a,to:"https://better-call.dev/"+(r.main?"mainnet":"edo2net")+"/"+r.contract+"/operations",variant:"subtitle2",style:{fontFamily:"Courier Prime, monospace"}},r.contract)),N=()=>{const[r,t]=n.a.useState(""),[e,o]=n.a.useState(1.5),[c,l]=n.a.useState(""),[d,u]=n.a.useState(!1),{setInfoSnack:I,setErrorSnack:D,hideSnack:N}=Object(g.b)(),A=Object(b.e)(),U=Object(b.d)(),f=()=>{return r.length>0&(36!==(t=r).length|!t.startsWith("tz1"));var t},R=()=>!(e>0);return n.a.createElement(a.a,{style:{backgroundColor:"transparent",border:"1px solid #606770",marginTop:"20px",marginBottom:"20px"},raised:!1},n.a.createElement(m.a,{container:!0,style:{padding:22},spacing:3},n.a.createElement(m.a,{item:!0,xs:6},n.a.createElement(p.a,{onChange:r=>{t(r.target.value)},value:r,variant:"outlined",color:"primary",fullWidth:!0,required:!0,id:"initalholder",label:"Owner",error:f(),helperText:f()?"Invalid address format":""})),n.a.createElement(m.a,{item:!0,xs:6,style:{textAlign:"center",marginTop:"10px"}},n.a.createElement(j,{main:d,setMain:u})),n.a.createElement(m.a,{item:!0,xs:6},n.a.createElement(p.a,{type:"number",onChange:r=>{o(r.target.value)},error:R(),helperText:R()?"Invalid Number":"",value:e,variant:"outlined",color:"primary",fullWidth:!0,required:!0,id:"totalsupply",label:"Rate"})),n.a.createElement(m.a,{item:!0,xs:6,style:{textAlign:"center",marginTop:"10px"}},""!==c?n.a.createElement(h,{contract:c,main:d}):n.a.createElement(s.a,{variant:"contained",color:"primary",disableElevation:!0,disabled:!U|R()|f()|0==r.length,onClick:async()=>{try{const t=new(0,i(354).Fraction)(e),n={prim:"Pair",args:[{int:t.numerator.toString()},{int:t.denominator.toString()}]},a=await A.wallet.originate({code:P,init:O(r,n)}).send(),m=a.opHash.substring(0,10)+"...";I(`waiting for ${m} to be confirmed ...`);const p=await a.contract();N(),console.log(`Origination completed for ${p.address}.`),setTimeout((()=>l(p.address)),5e3)}catch(t){console.log(t),D(t.message),setTimeout(N,4e3)}}},"originate"))))};t.a=r=>{const t=n.a.useMemo((()=>Object(c.a)({palette:{type:"dark",primary:{light:"#1dc5ff",main:"#00ACE7",dark:"#0a90bf",contrastText:"#fff"}}})),[!0]);return n.a.createElement(b.a,{appName:"Completium IOT"},n.a.createElement(g.a,null,n.a.createElement(l.a,{theme:t},n.a.createElement(N,null),n.a.createElement(d.a,null))))}}}]);
(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[6687],{8215:function(t,e,n){"use strict";var r=n(7294);e.Z=function(t){var e=t.children,n=t.hidden,s=t.className;return r.createElement("div",{role:"tabpanel",hidden:n,className:s},e)}},5064:function(t,e,n){"use strict";n.d(e,{Z:function(){return m}});var r=n(7294),s=n(9443);var a=function(){var t=(0,r.useContext)(s.Z);if(null==t)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return t},i=n(6010),l="tabItem_1uMI",d="tabItemActive_2DSg";var o=37,u=39;var m=function(t){var e=t.lazy,n=t.block,s=t.defaultValue,m=t.values,p=t.groupId,f=t.className,c=a(),k=c.tabGroupChoices,N=c.setTabGroupChoices,g=(0,r.useState)(s),h=g[0],b=g[1],T=r.Children.toArray(t.children),v=[];if(null!=p){var I=k[p];null!=I&&I!==h&&m.some((function(t){return t.value===I}))&&b(I)}var C=function(t){var e=t.currentTarget,n=v.indexOf(e),r=m[n].value;b(r),null!=p&&(N(p,r),setTimeout((function(){var t,n,r,s,a,i,l,o;(t=e.getBoundingClientRect(),n=t.top,r=t.left,s=t.bottom,a=t.right,i=window,l=i.innerHeight,o=i.innerWidth,n>=0&&a<=o&&s<=l&&r>=0)||(e.scrollIntoView({block:"center",behavior:"smooth"}),e.classList.add(d),setTimeout((function(){return e.classList.remove(d)}),2e3))}),150))},y=function(t){var e,n;switch(t.keyCode){case u:var r=v.indexOf(t.target)+1;n=v[r]||v[0];break;case o:var s=v.indexOf(t.target)-1;n=v[s]||v[v.length-1]}null==(e=n)||e.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},f)},m.map((function(t){var e=t.value,n=t.label;return r.createElement("li",{role:"tab",tabIndex:h===e?0:-1,"aria-selected":h===e,className:(0,i.Z)("tabs__item",l,{"tabs__item--active":h===e}),key:e,ref:function(t){return v.push(t)},onKeyDown:y,onFocus:C,onClick:C},n)}))),e?(0,r.cloneElement)(T.filter((function(t){return t.props.value===h}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},T.map((function(t,e){return(0,r.cloneElement)(t,{key:e,hidden:t.props.value!==h})}))))}},9443:function(t,e,n){"use strict";var r=(0,n(7294).createContext)(void 0);e.Z=r},6366:function(t,e,n){"use strict";n.r(e),n.d(e,{frontMatter:function(){return u},contentTitle:function(){return m},metadata:function(){return p},toc:function(){return f},default:function(){return k}});var r=n(2122),s=n(9756),a=(n(7294),n(3905)),i=n(6742),l=n(5064),d=n(8215),o=["components"],u={id:"template16",title:"A 2",sidebar_label:"A 2",slug:"/templates/a2"},m=void 0,p={unversionedId:"templates/template16",id:"templates/template16",isDocsHomePage:!1,title:"A 2",description:"Introduction",source:"@site/docs/templates/template16.md",sourceDirName:"templates",slug:"/templates/a2",permalink:"/docs/templates/a2",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/templates/template16.md",version:"current",frontMatter:{id:"template16",title:"A 2",sidebar_label:"A 2",slug:"/templates/a2"},sidebar:"templates",previous:{title:"Auction",permalink:"/docs/templates/auction"}},f=[{value:"Introduction",id:"introduction",children:[]},{value:"API",id:"api",children:[{value:"Storage",id:"storage",children:[]},{value:"Entrypoints",id:"entrypoints",children:[]}]},{value:"Code",id:"code",children:[]}],c={toc:f};function k(t){var e=t.components,n=(0,s.Z)(t,o);return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"introduction"},"Introduction"),(0,a.kt)("p",null,"This contract implements the Application 2 (A 2) specification ",(0,a.kt)(i.Z,{to:"https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-15/tzip-15.md",mdxType:"Link"},"TZIP 15")," for ",(0,a.kt)("em",{parentName:"p"},"whitelisting")," mechanism."),(0,a.kt)("p",null,"It defines transfer authorisation from users to other users. A user belongs to a list which is associated to other lists. Basically a user A can transfer to a user B if A's list is associated to the list B belongs to."),(0,a.kt)("h2",{id:"api"},"API"),(0,a.kt)("h3",{id:"storage"},"Storage"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"issuer")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"address")),(0,a.kt)("td",{parentName:"tr",align:null},"Issuer is a special user that can transfer (inbound and outbound) to/from anyone.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"admin")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"address")),(0,a.kt)("td",{parentName:"tr",align:null},"Admin can set the address of the issuer, and update the transfer lists data.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"users")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"big_map<adress, nat>")),(0,a.kt)("td",{parentName:"tr",align:null},"A user, identified by the address, is associated to a list id.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"transferlists")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"big_map<nat, bool*set<nat>>")),(0,a.kt)("td",{parentName:"tr",align:null},"A transfer list, identified by a ",(0,a.kt)("inlineCode",{parentName:"td"},"nat")," id, is associated to:",(0,a.kt)("lu",null,(0,a.kt)("li",null,"a boolean ",(0,a.kt)("inlineCode",{parentName:"td"},"unrestricted")," state"),(0,a.kt)("li",null,"a set ",(0,a.kt)("inlineCode",{parentName:"td"},"transferlists")," of ids"))," If ",(0,a.kt)("inlineCode",{parentName:"td"},"unrestricted")," is false, then any transfer from the list or to the list is not authorised. If ",(0,a.kt)("inlineCode",{parentName:"td"},"unrestricted")," is true, then transfers are allowed only to lists and from lists in the ",(0,a.kt)("inlineCode",{parentName:"td"},"transferlists")," set.")))),(0,a.kt)("h3",{id:"entrypoints"},"Entrypoints"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Name"),(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"assertReceivers")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"list<addr>")),(0,a.kt)("td",{parentName:"tr",align:null},"Fails if one user in the parameter list belongs to a restricted or inexistant list. It also fails if a user is not listed, or if its list is not listed.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"assertTransfers")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"list<address * list<address>>")),(0,a.kt)("td",{parentName:"tr",align:null},"Parameter is a list of ",(0,a.kt)("em",{parentName:"td"},"from")," addresses associated to a list of ",(0,a.kt)("em",{parentName:"td"},"to")," addresses.",(0,a.kt)("p",null),"Fails if ",(0,a.kt)("lu",null,(0,a.kt)("li",null,"a ",(0,a.kt)("em",{parentName:"td"},"from")," user is restricted"),(0,a.kt)("li",null,"or one of its associated user is restricted (a user is restricted if its associated list is restricted)"),(0,a.kt)("li",null,"or if one of its associated user is not in the ",(0,a.kt)("em",{parentName:"td"},"from")," address ",(0,a.kt)("inlineCode",{parentName:"td"},"transferlists"))))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"assertTransferList")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"nat")," ",(0,a.kt)("inlineCode",{parentName:"td"},"option<bool* set<nat>>")),(0,a.kt)("td",{parentName:"tr",align:null},"When option parameter is none, fails if list exists.",(0,a.kt)("p",null),"When option parameter is some data, fails if:",(0,a.kt)("lu",null,(0,a.kt)("li",null,"list does not exists"),(0,a.kt)("li",null,(0,a.kt)("inlineCode",{parentName:"td"},"unrestricted")," state is equal to bool parameter"),(0,a.kt)("li",null,"set of list ides is a subset of list's ",(0,a.kt)("inlineCode",{parentName:"td"},"transferlists"))))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"updateUser")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"address")," ",(0,a.kt)("inlineCode",{parentName:"td"},"option<nat>")),(0,a.kt)("td",{parentName:"tr",align:null},"Called by admin to associate a user address to a list, or remove the user from ",(0,a.kt)("inlineCode",{parentName:"td"},"users"),".")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"updateTransferlist")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"nat")," ",(0,a.kt)("inlineCode",{parentName:"td"},"option<(bool * list<nat> * set<nat>")),(0,a.kt)("td",{parentName:"tr",align:null},"Called by admin to remove a list from ",(0,a.kt)("inlineCode",{parentName:"td"},"transferlists")," if option parameter is ",(0,a.kt)("inlineCode",{parentName:"td"},"none"),".",(0,a.kt)("p",null),"It adds or updates a transfer list's data if optional parameter is ",(0,a.kt)("inlineCode",{parentName:"td"},"some"),":",(0,a.kt)("lu",null,(0,a.kt)("li",null,"writes ",(0,a.kt)("inlineCode",{parentName:"td"},"unrestricted")," state with boolean parameter"),(0,a.kt)("li",null,"removes list ids from ",(0,a.kt)("inlineCode",{parentName:"td"},"transferlists")),(0,a.kt)("li",null,"adds list ids in set to ",(0,a.kt)("inlineCode",{parentName:"td"},"transferlists"))))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"setAdmin")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"address")),(0,a.kt)("td",{parentName:"tr",align:null},"Called by admin to set admin's address.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"setIssuer")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"address")),(0,a.kt)("td",{parentName:"tr",align:null},"Called by admin to set issuer's address.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"getAdmin")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"Getter for admin's address.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"getIsuer")),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"Getter for issuer's address.")))),(0,a.kt)("h2",{id:"code"},"Code"),(0,a.kt)(l.Z,{defaultValue:"archetype",values:[{label:"Archetype",value:"archetype"},{label:"Michelson",value:"michelson"},{label:"Specification",value:"specification"}],mdxType:"Tabs"},(0,a.kt)(d.Z,{value:"archetype",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-archetype"},'archetype a2(\n  admin  : address,\n  issuer : address\n)\n\nvariable users         : big_map<address, nat>      = []\n\nrecord transferlist {\n  unrestricted         : bool;\n  allowedTransferlists : set<nat>;\n}\nvariable transferlists : big_map<nat, transferlist> = []\n\nfunction assertReceiver(addr : address) : bool {\n  return\n    match getopt(users, addr) with\n    | some v ->\n        match getopt(transferlists, v) with\n        | some(r) -> r.unrestricted\n        | none -> false\n        end\n    | none   -> false\n    end\n}\n\nentry assertReceivers (addrs : list<address>) {\n  for addr in addrs do\n    if (addr <> issuer)\n    then dorequire(assertReceiver(addr), "USER_RESTRICTED")\n  done\n}\n\nentry assertTransfers (input_list : list<address * list<address>>) {\n  for input_item in input_list do\n    var %from = input_item[0];\n    var tos   = input_item[1];\n    for %to in tos do\n      if %from = issuer\n      then dorequire(assertReceiver(%to), "TO_RESTRICTED")\n      else begin\n        dorequire(assertReceiver(%from), "FROM_RESTRICTED");\n        dorequire(assertReceiver(%to), "TO_RESTRICTED");\n        var fromid       = users[%from];\n        var toid         = users[%to];\n        var allowedlists = transferlists[fromid].allowedTransferlists;\n        dorequire(contains(allowedlists, toid), "TO_NOT_ALLOWED")\n      end\n    done\n  done\n}\n\nentry assertTransferlist (transferlistId : nat, input : option<transferlist>) {\n  match input with\n  | some tl -> begin\n    dorequire(contains(transferlists, transferlistId), "TRANSFERLIST_NOT_FOUND");\n    var l = transferlists[transferlistId];\n    dorequire(l.unrestricted = tl.unrestricted, "INVALID_UNRESTRICTED_STATE");\n    for i in tl.allowedTransferlists do\n      dorequire(contains(l.allowedTransferlists, i), "IS_NOT_SUBSET")\n    done\n    end\n  | none -> dofailif(contains(transferlists, transferlistId), "EXISTS_TRANSFERLIST")\n  end\n}\n\nentry updateUser (user : address, transferlistId : option<nat>) {\n  called by admin\n  require {\n    r0 otherwise "ISSUER_NOT_USER" : issuer <> user;\n  }\n  effect {\n    users.update(user, transferlistId)\n  }\n}\n\nentry updateTransferlist (\n    transferlistId : nat,\n    u : option<(bool * list<nat> * set<nat>)>) {\n  called by admin\n  effect {\n    match u with\n    | some v -> begin\n      var ltransferlist = transferlists[transferlistId];\n      var lunrestricted          = v[0];\n      var ldisallowTransferlists = v[1];\n      var lallowTransferlists    = v[2];\n      ltransferlist.unrestricted := lunrestricted;\n      for r in ldisallowTransferlists do\n        ltransferlist.allowedTransferlists.remove(r)\n      done;\n      for a in lallowTransferlists do\n        ltransferlist.allowedTransferlists.add(la)\n      done;\n      transferlists.put(transferlistId, ltransferlist)\n      end\n    | none -> transferlists.remove(transferlistId)\n    end\n  }\n}\n\nentry setAdmin (value : address) {\n  called by admin\n  effect {\n    admin := value;\n  }\n}\n\nentry setIssuer (value : address) {\n  called by admin\n  effect {\n    issuer := value;\n  }\n}\n\ngetter getAdmin () : address {\n  return admin\n}\n\ngetter getIssuer () : address {\n  return issuer\n}\n\ngetter getUser (user : address) : option<nat> {\n  return getopt(users, user)\n}\n'))),(0,a.kt)(d.Z,{value:"michelson",mdxType:"TabItem"}),(0,a.kt)(d.Z,{value:"specification",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-archetype"},'specification function assertReceiver(addr: address) {\n  postcondition p1 {\n    let some tlid = users[addr] in\n    let some tl   = transferlists[tlid] in\n      result = tl.unrestricted\n    otherwise result = false\n    otherwise result = false\n  }\n}\n\nspecification entry assertReceivers (addrs : list<address>) {\n  fails {\n    f_assertReceivers with (msg: string):\n      msg = "USER_RESTRICTED" and\n      exists a : address,\n        contains(addrs, a) and\n        a <> issuer        and\n        assertReceiver(a) = false;\n  }\n  postcondition p2 {\n    users  = before.users  and transferlists = before.transferlists and\n    issuer = before.issuer and admin = before.admin\n  }\n}\n\nspecification entry assertTransfers (input_list : list<address * list<address>>) {\n  fails {\n    f_assertTransfers with (msg: string):\n      exists e : (address * list<address>),\n        contains(input_list, e) and (\n        let %from = e[0] in\n        let tos   = e[1] in\n        exists %to : address,\n          contains(tos, %to) and ((\n            msg = "TO_RESTRICTED" and\n            %from = issuer and\n            assertReceiver(%to) = false\n          ) or (\n            msg = "FROM_RESTRICTED" and\n            assertReceiver(%from) = false\n          ) or (\n            msg = "TO_RESTRICTED" and\n            assertReceiver(%to) = false\n          ) or (\n            let some fromid = users[%from] in\n            let some toid   = users[%to] in\n            let some tl     = transferlists[%fromid] in\n              msg = "TO_NOT_ALLOWED" and\n              not contains(tl.allowedTransferlists, toid)\n            otherwise msg = "NOT_FOUND"\n            otherwise msg = "NOT_FOUND"\n            otherwise msg = "NOT_FOUND"\n          )));\n  }\n  postcondition p3 {\n    users  = before.users  and transferlists = before.transferlists and\n    issuer = before.issuer and admin = before.admin\n  }\n}\n\nspecification entry assertTransferlist (transferlistId : nat, input : option<transferlist>) {\n  fails {\n    f_assertTransferlist with (msg : string):\n    let some tl = input in (\n      msg = "TRANSFERLIST_NOT_FOUND" and\n      not contains(transferlists, transferlistId)\n    ) or (\n      msg = "INVALID_UNRESTRICTED_STATE" /*\n      let some l = transferlists[transferlistId] in\n        msg = "INVALID_UNRESTRICTED_STATE" and\n        not l.unrestricted = tl.unrestricted\n      otherwise msg = "NOT_FOUND" */\n    ) or (\n      exists i : nat,\n      contains(tl.allowedTransferlists, i) and\n      let some l = transferlists[transferlistId] in\n      not contains(l.allowedTransferlists, i) and\n      msg = "IS_NOT_SUBSET"\n      otherwise msg = "NOT_FOUND"\n    )\n    otherwise\n      msg = "EXISTS_TRANSFERLIST" and not contains(transferlists, transferlistId);\n  }\n  postcondition p4 {\n    users  = before.users  and transferlists = before.transferlists and\n    issuer = before.issuer and admin = before.admin\n  }\n}\n\nspecification entry updateUser (user : address, transferlistId : option<nat>) {\n  fails {\n    f_updateUser1 with (msg : string):\n      msg = "Invalid CALLER" and\n      caller <> admin;\n    f_updateUser2 with (msg : string):\n      msg = "ISSUER_NOT_USER" and\n      issuer = user;\n  }\n  postcondition p5 {\n    let some i = transferlistId in\n      let some v = users[user] in\n        v = i\n      otherwise false\n    otherwise\n      let some v = users[user] in\n      false\n      otherwise true\n  }\n  postcondition p6 {\n    forall a : address,\n      a <> users ->\n      let some na  = users[a] in\n      let some bna = before.users[a] in\n      na = bna\n      otherwise true\n      otherwise true\n  }\n}\n\nspecification entry updateTransferlist (\n    transferlistId : nat,\n    u : option<(bool * list<nat> * set<nat>)>) {\n  fails {\n    f_updateTransferlist with (msg : string):\n      msg = "Invalid CALLER" and\n      caller <> admin;\n  }\n  postcondition p7 {\n    let some v = u in\n      let some tl = transferlists[transferlistId] in\n        let lunrestricted          = v[0] in\n        let ldisallowTransferlists = v[1] in\n        let lallowTransferlists    = v[2] in\n        tl.unrestricted := lunrestricted and\n        (forall r : nat,\n          contains(ldisallowTransferlists, r) ->\n          not contains(lallowTransferlists, r) ->\n          not contains(tl.allowedTransferlists, r)) and\n        (forall a : nat,\n          contains(lallowTransferlists, a) ->\n          contains(tl.allowedTransferlists, a))\n      otherwise true\n    otherwise\n      let some tl = transferlists[transferlistId] in\n        false\n      otherwise true\n  }\n  postcondition p8 {\n    forall i : nat,\n      i <> transferlistId ->\n      let some tl  = transferlists[i] in\n      let some btl = before.transferlists[i] in\n      tl = btl\n      otherwise true\n      otherwise true\n  }\n}\n')))))}k.isMDXComponent=!0},6010:function(t,e,n){"use strict";function r(t){var e,n,s="";if("string"==typeof t||"number"==typeof t)s+=t;else if("object"==typeof t)if(Array.isArray(t))for(e=0;e<t.length;e++)t[e]&&(n=r(t[e]))&&(s&&(s+=" "),s+=n);else for(e in t)t[e]&&(s&&(s+=" "),s+=e);return s}function s(){for(var t,e,n=0,s="";n<arguments.length;)(t=arguments[n++])&&(e=r(t))&&(s&&(s+=" "),s+=e);return s}n.d(e,{Z:function(){return s}})}}]);
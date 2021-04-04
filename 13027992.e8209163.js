(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{78:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return p})),n.d(t,"default",(function(){return u}));var a=n(3),r=n(7),i=(n(0),n(207)),o=(n(208),{id:"iot9",title:"Implementation",sidebar_label:"Implementation",slug:"/dapp-iot/implementation"}),c={unversionedId:"dapp-iot/iot9",id:"dapp-iot/iot9",isDocsHomePage:!1,title:"Implementation",description:"Start",source:"@site/docs/dapp-iot/iot9.md",slug:"/dapp-iot/implementation",permalink:"/docs/dapp-iot/implementation",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/dapp-iot/iot9.md",version:"current",sidebar_label:"Implementation",sidebar:"iot",previous:{title:"Interface",permalink:"/docs/dapp-iot/interface"}},p=[{value:"Start",id:"start",children:[]},{value:"Interrupt",id:"interrupt",children:[]},{value:"Collect",id:"collect",children:[]},{value:"Set Unit",id:"set-unit",children:[]}],l={toc:p};function u(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"start"},"Start"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype",metastring:"{7,9,10}","{7,9,10}":!0}),"entry start () {\n    require {\n        r1: now > dateofstop;\n    }\n    effect {\n        var t : nat = transferred;\n        var dur : duration = (get_rate_in_s_by_utz() * t) * 1s;\n        if dur > read_interval then (\n            dateofstop := now + dur + read_interval;\n            dateofstart := now;\n            user := some(caller)\n        )\n    }\n}\n")),Object(i.b)("p",null,"Duration is computed by multiplying the amount of ",Object(i.b)("inlineCode",{parentName:"p"},"transferred")," XTZ by the price rate. The price rate is converted to mutz (one millionth of tez) per second with the ",Object(i.b)("inlineCode",{parentName:"p"},"get_rate_in_s_by_utz")," function:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype"}),"function get_rate_in_s_by_utz () : rational {\n    var d : int = time_unit;\n    var t : nat = tez_unit;\n    return (rate * d / t)\n}\n")),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"dateofstop")," is computed with the following simple formula ",Object(i.b)("inlineCode",{parentName:"p"},"now + dur + read_interval"),"."),Object(i.b)("p",null,"We note that the ",Object(i.b)("a",{href:"https://archetype-lang.org/"},"Archetype")," makes it very simple to manipulate durations."),Object(i.b)("h2",{id:"interrupt"},"Interrupt"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"interrupt")," entry point pays back the caller so that the caller pays only for the effective duration of service."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype",metastring:"{6}","{6}":!0}),"entry interrupt () {\n    require {\n        r2: caller = opt_get(user) and now < dateofstop\n    }\n    effect {\n        transfer (get_return_tz()) to caller;\n        dateofstop  := now - read_interval;\n        dateofstart := now - read_interval;\n    }\n}\n")),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"get_return_tz")," function computes the number of XTZ to return to the caller:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype",metastring:"{2}","{2}":!0}),"function get_return_tz () : tez {\n    var res : int = 1 / get_rate_in_s_by_utz() * (dateofstop - now);\n    return (res * 1utz)\n}\n")),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"dateofstop - now")," is the duration from ",Object(i.b)("inlineCode",{parentName:"p"},"now")," to the initially planned date of end of service."),Object(i.b)("h2",{id:"collect"},"Collect"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype"}),"entry collect () {\n    called by owner\n    effect {\n        var keep = 0tz;\n        if now < dateofstop then\n            keep := get_return_tz();\n        if balance - keep > 0tz then\n            transfer (balance - keep) to owner\n    }\n}\n")),Object(i.b)("h2",{id:"set-unit"},"Set Unit"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype"}),"entry setunits (dunit : duration, tunit : tez) {\n    called by owner\n    effect {\n        time_unit := dunit;\n        tez_unit := tunit;\n    }\n}\n")))}u.isMDXComponent=!0}}]);
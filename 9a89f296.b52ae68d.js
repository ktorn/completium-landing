(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{145:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(0);function i(){var e="undefined"!=typeof window?window:{innerHeight:"0",innerWidth:"0"};return{width:e.innerWidth,height:e.innerHeight}}function r(){var e=Object(n.useState)(i()),t=e[0],a=e[1];return Object(n.useEffect)((function(){function e(){a(i())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),t}},89:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(224),s=a(221),c=a(192),o=a(222),l=a(225),m=a(111),p=a(115),u=a(119),d=a(223),g=a(231),h=a(230),w=a(218),f=a(220),v=a(219),x=a(214),E=a(145),b=[{name:"miles",title:"Fidelity program",img:"streamline-icon-takeoff-ticket.svg",chips:["Marketing"],text:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"},{name:"iot",title:"Connected bulb",img:"streamline-icon-phone-app-idea.svg",chips:["IoT"],text:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"},{name:"ideabox",title:"Idea box",img:"streamline-icon-idea-box.svg",chips:["Governance"],text:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"},{name:"game",title:"2048 competition",img:"streamline-icon-programming-module.svg",chips:["Gaming","Governance"],text:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"},{name:"escrow",title:"Online purchase",img:"streamline-icon-customize-shirt-browser.svg",chips:["Escrow","Payment","DeFi"],text:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"},{name:"nonfungible",title:"Collectible cards",img:"streamline-icon-card-poker.svg",chips:["Token","DeFi","Gaming"],text:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"},{name:"dex",title:"Dex",img:"streamline-icon-currencies-exchange.svg",chips:["Token","DeFi"],text:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"},{name:"zcb",title:"Zero coupon bond",img:"streamline-icon-contract-handshake.svg",chips:["Legal","Payment","DeFi"],text:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"},{name:"bids",title:"Bids",img:"streamline-icon-gavel.svg",chips:["Governance"],text:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"}],y=Object(x.a)({root:{maxWidth:"100%",minWidth:"300px",backgroundColor:"#262626",border:"2px solid #3e3e3e"},media:{height:250,backgroundSize:"70%"}});function z(e){var t=y();return i.a.createElement(h.a,{className:t.root},i.a.createElement(w.a,{component:m.a,to:Object(p.a)("docs/dapp-"+e.name+"/"),style:{textDecoration:"none"}},i.a.createElement(v.a,{className:t.media,image:Object(p.a)("img/"+e.img),title:e.title}),i.a.createElement(f.a,null,i.a.createElement(s.a,{gutterBottom:!0,variant:"h5",component:"h2"},e.title),i.a.createElement(s.a,{variant:"body2",color:"textSecondary",component:"p"},e.text),i.a.createElement("div",{style:{marginTop:"20px"}}),e.chips.map((function(e){return i.a.createElement(g.a,{style:{marginRight:"8px"},variant:"outlined",label:e})})))))}t.default=function(){var e=i.a.useState(!1),t=(e[0],e[1]),a=i.a.useMemo((function(){return Object(c.a)({palette:{type:"dark"}})}),[true]),n=Object(E.a)().width;console.log(n);var m=4;return m=0===n||"undefined"===n?4:n<=650?12:n<=950?6:4,console.log(m),i.a.useEffect((function(){return t(!0)}),[]),i.a.createElement(u.a,null,i.a.createElement(o.a,{theme:a},i.a.createElement(d.a,{maxWidth:"md"},i.a.createElement(r.a,{container:!0,direction:"column",justify:"center",alignItems:"center",spacing:4},i.a.createElement(r.a,{item:!0,style:{textAlign:"center"}},i.a.createElement(s.a,{variant:"h3",style:{marginTop:"40px"}},"Learn to developp Dapps")),i.a.createElement(r.a,{item:!0,style:{paddingTop:0}},i.a.createElement(s.a,{variant:"h5"},"with examples")),i.a.createElement(r.a,{item:!0},i.a.createElement(s.a,null,"Dapps presented below are potential real-life applications that illustrate how to leverage the Tezos blockchain technology to create a new generation of game-changing applications. Tezos is a powerfull self-amending blockchain that comes with a rich technical ecosystem.")),i.a.createElement(r.a,{item:!0,style:{marginBottom:"60px"}},i.a.createElement(l.a,{variant:"outlined",size:"large"},"Learn about Tezos")),i.a.createElement(r.a,{item:!0},i.a.createElement(r.a,{container:!0,direction:"row",spacing:4,justify:"center",alignItems:"center"},b.map((function(e){return i.a.createElement(r.a,{item:!0,xs:m},i.a.createElement(z,{name:e.name,img:e.img,title:e.title,text:e.text,chips:e.chips}))})))),i.a.createElement(r.a,{item:!0,style:{marginTop:"60px",marginBottom:"60px"}},i.a.createElement(s.a,null,"Each Dapp comes with several documents:",i.a.createElement("ul",null,i.a.createElement("li",null,"an introduction that explains the business issue it solves with a focus on the rationale behind the use of blockchain, and how the business logic is split between on-chain and off-chain process"),i.a.createElement("li",null,"an open source live demo of the Dapp"),i.a.createElement("li",null,"a user manual that presents how to use the Dapp"),i.a.createElement("li",null,"a technical implementation that presents step-by-step instructions to implement the required interactions between the Dapp, the smart contract, and the wallet; the user is invited to test and implement these instructions in a gitpod environment."),i.a.createElement("li",null,"a commented presentation of the smart contract's source code"))))))))}}}]);
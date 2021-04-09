(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{115:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return l})),a.d(t,"toc",(function(){return p})),a.d(t,"default",(function(){return b}));var i=a(3),n=(a(0),a(224)),o=(a(226),a(227)),s=a(228),r=a(225);const c={id:"game1",title:"2048 Competition",sidebar_label:"Introduction",slug:"/dapp-game"},l={unversionedId:"dapp-game/game1",id:"dapp-game/game1",isDocsHomePage:!1,title:"2048 Competition",description:"Introduction",source:"@site/docs/dapp-game/game1.md",slug:"/dapp-game",permalink:"/docs/dapp-game",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/dapp-game/game1.md",version:"current",sidebar_label:"Introduction",sidebar:"dapps",previous:{title:"Interactions",permalink:"/docs/dapp-ideabox/interactions"},next:{title:"Use Case Presentation",permalink:"/docs/dapp-game/Presentation"}},p=[{value:"Introduction",id:"introduction",children:[]},{value:"DApp",id:"dapp",children:[{value:"Architecture",id:"architecture",children:[]},{value:"Benefits",id:"benefits",children:[]},{value:"Discussion",id:"discussion",children:[]}]}],d={toc:p};function b({components:e,...t}){return Object(n.b)("wrapper",Object(i.a)({},d,t,{components:e,mdxType:"MDXLayout"}),Object(n.b)(o.a,{img:"2048-screen.png",width:"100%",mdxType:"DappFigure"}),Object(n.b)(s.a,{url:"https://edukera.github.io/completium-dapp-2048/",txt:"open dapp",mdxType:"DappButton"}),Object(n.b)("h2",{id:"introduction"},"Introduction"),Object(n.b)("p",null,"Win the competion of the famous ",Object(n.b)("a",{href:"https://en.wikipedia.org/wiki/2048_(video_game)",target:"_blank"},"2048")," game by obtaining the highest score."),Object(n.b)("p",null,"The 2048 game consists in sliding numbered tiles that pops up at ",Object(n.b)("em",{parentName:"p"},"random")," position on the grid after each sliding move. Sliding a tile on top of another make the tiles merge and increases the value of the resulting tile. The goal is to obtain a 2048 valued tile."),Object(n.b)("p",null,"The challenge is to guarantee contestants that the competition is fair, that is that the highest submitted score gets the prize, and that scores cannot be artificially manufactured."),Object(n.b)("h2",{id:"dapp"},"DApp"),Object(n.b)("p",null,"This example DApp illustrates how to organize a fair competition with the help of the Tezos blockchain."),Object(n.b)("p",null,"A new score is stored in the DApp's ",Object(n.b)(r.a,{to:"/docs/dapp-tools/tezos#smart-contract",mdxType:"Link"},"smart contract")," storage by invoking the ",Object(n.b)(r.a,{to:"/docs/dapp-game/interface#submit",mdxType:"Link"},"submit")," entry point. How to prevent anyone from storing any arbitrary score ?"),Object(n.b)("p",null,"A standard solution is to use an ",Object(n.b)("em",{parentName:"p"},"Oracle")," which is an off-chain process whose role is to guaranty the validity of the data stored in the smart contract by ",Object(n.b)(r.a,{to:"/docs/dapp-tools/tezos#signing-data",mdxType:"Link"},"signing")," the data."),Object(n.b)("p",null,"In order to accept a score, the smart contract verifies that the score is signed by the Oracle."),Object(n.b)("p",null,"How does the ",Object(n.b)("em",{parentName:"p"},"Oracle")," guarantee that the score is correct?"),Object(n.b)(o.a,{img:"game-oracle.png",width:"60%",mdxType:"DappFigure"}),Object(n.b)("p",null,"For that, the Oracle needs to get the list of moves to compute the score and sign it. However what does prevent anyone to build an artificial session with highest score and have it signed?"),Object(n.b)("p",null,"The solution is that the Oracle generates the random tiles positions from a ",Object(n.b)("a",{href:"https://en.wikipedia.org/wiki/Random_seed",target:"_blank"},"seeded")," Random Number Generator: the request to sign a score requires to provide the oracle with:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"a unique session id"),Object(n.b)("li",{parentName:"ul"},"the list of moves")),Object(n.b)("p",null,"The unique session id is internally associated with a seed for the Oracle to regenerate the session and compute score with the gamer's moves."),Object(n.b)("p",null,"As a consequence each game is associated to a unique session id provided by the Oracle. It is displayed in the upper right hand corner of the DApp's web interface:"),Object(n.b)(o.a,{img:"game-sessionid.png",width:"60%",mdxType:"DappFigure"}),Object(n.b)("p",null,"Note that the random seed is not (and must no be) known by the player. Note also this implies that the Orcale is solicited at each player move for the next tile position."),Object(n.b)("h3",{id:"architecture"},"Architecture"),Object(n.b)("p",null,"The Dapp architecture is 3-tier:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Tezos' smart contract (to store Oracle-signed scores)"),Object(n.b)("li",{parentName:"ul"},"User web interface for customer to exchange miles (consume) for rewards"),Object(n.b)("li",{parentName:"ul"},"Game ",Object(n.b)("em",{parentName:"li"},"oracle")," that:",Object(n.b)("ul",{parentName:"li"},Object(n.b)("li",{parentName:"ul"},"provides a new unique session id at each new game session"),Object(n.b)("li",{parentName:"ul"},"provides with random tile position"),Object(n.b)("li",{parentName:"ul"},"sign score from list of moves")))),Object(n.b)("p",null,"Interactions between these three elements are illustrated in the schema below:"),Object(n.b)(o.a,{img:"game-archi.svg",width:"80%",mdxType:"DappFigure"}),Object(n.b)("p",null,"The smart contract provides other entry points for administration purpose. The complete interface is presented ",Object(n.b)(r.a,{to:"/docs/dapp-game/interface",mdxType:"Link"},"here"),"."),Object(n.b)("p",null,"In this DApp example, for simplicity purpose, the Oracle server is ",Object(n.b)("u",null,"not provided")," as a separate entity, but rather embedded in the web interface. You are invited to implement a stand alone operational version of the Oracle."),Object(n.b)("h3",{id:"benefits"},"Benefits"),Object(n.b)("p",null,"The DApp architecture provides out a the box a high level of security and an auditable process to figure out the origin of a score."),Object(n.b)("p",null,"Beside the blockchain security features (immutability, transparent business logic), the remaining security challenges are on the Oracle part:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"keep Oracle's private key private"),Object(n.b)("li",{parentName:"ul"},"keep the random seeds private"),Object(n.b)("li",{parentName:"ul"},"provide activity log and code source for anyone to be able to reproduce score computation")),Object(n.b)("p",null,"Indeed:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"anyone with the private key could sign any score in place of the Oracle"),Object(n.b)("li",{parentName:"ul"},"anyone with the random seed could build a game session with arbitrary high score")),Object(n.b)("h3",{id:"discussion"},"Discussion"),Object(n.b)("p",null,"Could the score computation process be performed by the smart contract?"),Object(n.b)("p",null,"Why not? Indeed this would almost remove the need for an Oracle to sign the score."),Object(n.b)("p",null,"However this does not remove the need for a secure Random Number Generator that is kept secret. Moreover, due to its highly replicated nature, a blockchain is not designed for intensive CPU/storage tasks: indeed each node runs the call to smart contracts; that's why such tasks are controlled in several ways:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"smart contract storage (including execution code) is limited"),Object(n.b)("li",{parentName:"ul"},"transaction cost is proportional to execution complexity")),Object(n.b)("div",{className:"admonition admonition-info alert alert--info"},Object(n.b)("div",Object(i.a)({parentName:"div"},{className:"admonition-heading"}),Object(n.b)("h5",{parentName:"div"},Object(n.b)("span",Object(i.a)({parentName:"h5"},{className:"admonition-icon"}),Object(n.b)("svg",Object(i.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(n.b)("path",Object(i.a)({parentName:"svg"},{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})))),"info")),Object(n.b)("div",Object(i.a)({parentName:"div"},{className:"admonition-content"}),Object(n.b)("p",{parentName:"div"},"The blockchain is not designed for CPU/storage intensive tasks. Such tasks are handled by off-chain ",Object(n.b)("em",{parentName:"p"},"Oracle")," process."))))}b.isMDXComponent=!0},226:function(e,t,a){"use strict";a(0),a(230)}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[130],{199:function(e,t,i){"use strict";i.r(t),i.d(t,"frontMatter",(function(){return c})),i.d(t,"metadata",(function(){return s})),i.d(t,"toc",(function(){return l})),i.d(t,"default",(function(){return m}));var a=i(3),o=(i(0),i(235)),n=i(238),r=i(236);const c={id:"verification1",title:"Formal Verification",sidebar_label:"Introduction",slug:"/verification",hide_title:!0},s={unversionedId:"verification/verification1",id:"verification/verification1",isDocsHomePage:!1,title:"Formal Verification",description:"Formal verification is the act of proving or disproving that a program, like a smart contract, respects its formal specification, using formal methods of mathematics.",source:"@site/docs/verification/verification1.md",slug:"/verification",permalink:"/docs/verification",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/verification/verification1.md",version:"current",sidebar_label:"Introduction",sidebar:"verification",next:{title:"Tools",permalink:"/docs/verification/tools"}},l=[{value:"Benefit",id:"benefit",children:[]},{value:"Limits",id:"limits",children:[]},{value:"Process",id:"process",children:[]}],p={toc:l};function m({components:e,...t}){return Object(o.b)("wrapper",Object(a.a)({},p,t,{components:e,mdxType:"MDXLayout"}),Object(o.b)(n.a,{img:"verification.svg",width:"30%",mdxType:"DappFigure"}),Object(o.b)("p",null,"Formal verification is the act of proving or disproving that a program, like a smart contract, respects its formal specification, using formal methods of mathematics."),Object(o.b)("p",null,"A formal specification uses a formal language to describe ",Object(o.b)("em",{parentName:"p"},"what")," the program is supposed to do. A formal language is defined by a grammar (a set of rules that define how sentences are formed). Programming languages are also formal languages, but they say something about ",Object(o.b)("em",{parentName:"p"},"how")," the program does what it does."),Object(o.b)("p",null,"The formal aspect of the specification makes it possible to automatically analyze whether the program verifies it or not. A fundamental result of computer science is that it is ",Object(o.b)("em",{parentName:"p"},"not")," possible to decide automatically whether any program verifies any specification."),Object(o.b)("p",null,"The verification process is thus a mixture of automatic and manual ",Object(o.b)("em",{parentName:"p"},"formal")," proving steps."),Object(o.b)("h2",{id:"benefit"},"Benefit"),Object(o.b)("p",null,"Consider the following program:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype"}),"function sum(n : int) = if n > 0 then n + sum(n - 1) else 0\n")),Object(o.b)("p",null,"And the formal specification ",Object(o.b)("em",{parentName:"p"},"P"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-archetype"}),"forall n, n >= 0 -> sum(n) = n * (n + 1) / 2\n")),Object(o.b)("p",null,"which reads: for every integer n, if n is above 0, then ",Object(o.b)("inlineCode",{parentName:"p"},"sum(n)")," is equal to n multiplied by n plus 1, divided by 2."),Object(o.b)("p",null,"How to make sure that ",Object(o.b)("inlineCode",{parentName:"p"},"sum")," verifies ",Object(o.b)("em",{parentName:"p"},"P"),"?"),Object(o.b)("p",null,"You can either write a test program that computes the ",Object(o.b)("inlineCode",{parentName:"p"},"sum")," function for a large range of values, say for ",Object(o.b)("inlineCode",{parentName:"p"},"n")," from 0 to 1000000, and checks the formula; or you can ",Object(o.b)("em",{parentName:"p"},"mathematically")," prove the property (with inductive reasoning for example) in a few reasoning steps."),Object(o.b)("p",null,"While you may be reasonably confident in the test program, and by transtion in the ",Object(o.b)("inlineCode",{parentName:"p"},"sum")," function, the property is only tested on a limited set of values, and the test program may itself contain bugs. The question to decide whether the test is correct is stil not decidable on a systemic level."),Object(o.b)("p",null,"With mathematic reasoning, properties are proven for any parameter value, and the confidence in the proof relies on whether it is correct or not."),Object(o.b)("p",null,"Another fundamental result is that it ",Object(o.b)("em",{parentName:"p"},"is")," possible to automatically decide whether a proof is correct or not, as long as it is formalized. Hence the confidence you get with formal methods does not rely on the confidence you may give the developper of the program and tests, but it relies on the ",Object(o.b)("em",{parentName:"p"},"existence")," of a correct formal proof."),Object(o.b)("p",null,"As such, formal verification provides ",Object(o.b)("em",{parentName:"p"},"trust-less")," confidence. That's why it is a key point for the development of smart contracts bacuse, with smart contracts, blockchains had lost their trust-less execution feature; they claim it back with formal verification."),Object(o.b)("h2",{id:"limits"},"Limits"),Object(o.b)("p",null,"Formal verification is relative to the specification. It is possible that a verified program does not behave as expected if this expectation has not been formalized in the specification."),Object(o.b)("p",null,"Another caveat of formal verification is the difficulty to read specification. What confidence can you have in a verified program if you do not understand its specification?"),Object(o.b)("p",null,"At least, the trust in the verification relies on the trust in the ",Object(o.b)(r.a,{to:"/docs/verification/tools",mdxType:"Link"},"tools")," used to build and check the proof. The set of tools that the process relies on is called the ",Object(o.b)(r.a,{to:"https://en.wikipedia.org/wiki/Trusted_computing_base",mdxType:"Link"},"Trusted Computing Base"),"."),Object(o.b)("p",null,"That's why it is suggested to ",Object(o.b)("em",{parentName:"p"},"complement")," the verification approach with standard ",Object(o.b)(r.a,{to:"/docs/contract/test-scenario",mdxType:"Link"},"tests"),", especially to cover specification areas that are harder to formalize or verify."),Object(o.b)("h2",{id:"process"},"Process"),Object(o.b)("p",null,"The formal verification process is two steps:"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"write the formal specification of the contract"),Object(o.b)("li",{parentName:"ol"},"prove the contract verifies the specification with formal method systems")),Object(o.b)("p",null,"Writing formal specification is a key step of the verification process because it defines the perimeter of the verification. This task requires knowing the technical and business context of the contract execution, in order to describe accurately the contract's behavior."),Object(o.b)("p",null,"It also requires knowing a formal specification language, which is equivalent to knowing a programming language. While there is no systemic method to write formal specification, it may follow some basic principles, presented in this ",Object(o.b)(r.a,{to:"/docs/verification/specification",mdxType:"Link"},"guide"),"."),Object(o.b)("p",null,"Proving that the contract verifies the specification is a technical task that requires training and skills in ",Object(o.b)(r.a,{to:"/docs/verification/logic",mdxType:"Link"},"formal logic")," and formal method ",Object(o.b)(r.a,{to:"/docs/verification/tools",mdxType:"Link"},"tools"),"."))}m.isMDXComponent=!0}}]);
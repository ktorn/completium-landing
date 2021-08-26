(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[1443],{6627:function(e,t,i){"use strict";i.r(t),i.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return m},toc:function(){return f},default:function(){return u}});var o=i(2122),a=i(9756),n=(i(7294),i(3905)),r=i(7134),s=i(6742),c=["components"],l={id:"verification1",title:"Formal Verification",sidebar_label:"Introduction",slug:"/verification",hide_title:!0},p=void 0,m={unversionedId:"verification/verification1",id:"verification/verification1",isDocsHomePage:!1,title:"Formal Verification",description:"Formal verification is the act of proving or disproving that a program, like a smart contract, respects its formal specification, using formal methods of mathematics.",source:"@site/docs/verification/verification1.md",sourceDirName:"verification",slug:"/verification",permalink:"/docs/verification",editUrl:"https://github.com/edukera/completium-landing/tree/master/docs/verification/verification1.md",version:"current",frontMatter:{id:"verification1",title:"Formal Verification",sidebar_label:"Introduction",slug:"/verification",hide_title:!0},sidebar:"verification",next:{title:"Tools",permalink:"/docs/verification/tools"}},f=[{value:"Benefit",id:"benefit",children:[]},{value:"Limits",id:"limits",children:[]},{value:"Process",id:"process",children:[]}],h={toc:f};function u(e){var t=e.components,i=(0,a.Z)(e,c);return(0,n.kt)("wrapper",(0,o.Z)({},h,i,{components:t,mdxType:"MDXLayout"}),(0,n.kt)(r.Z,{img:"verification.svg",width:"30%",mdxType:"DappFigure"}),(0,n.kt)("p",null,"Formal verification is the act of proving or disproving that a program, like a smart contract, respects its formal specification, using formal methods of mathematics."),(0,n.kt)("p",null,"A formal specification uses a formal language to describe ",(0,n.kt)("em",{parentName:"p"},"what")," the program is supposed to do. A formal language is defined by a grammar (a set of rules that define how sentences are formed). Programming languages are also formal languages, but they say something about ",(0,n.kt)("em",{parentName:"p"},"how")," the program does what it does."),(0,n.kt)("p",null,"The formal aspect of the specification makes it possible to automatically analyze whether the program verifies it or not. A fundamental result of computer science is that it is ",(0,n.kt)("em",{parentName:"p"},"not")," possible to decide automatically whether any program verifies any specification."),(0,n.kt)("p",null,"The verification process is thus a mixture of automatic and manual ",(0,n.kt)("em",{parentName:"p"},"formal")," proving steps."),(0,n.kt)("h2",{id:"benefit"},"Benefit"),(0,n.kt)("p",null,"Consider the following program:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-archetype"},"function sum(n : int) = if n > 0 then n + sum(n - 1) else 0\n")),(0,n.kt)("p",null,"And the formal specification ",(0,n.kt)("em",{parentName:"p"},"P"),":"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-archetype"},"forall n, n >= 0 -> sum(n) = n * (n + 1) / 2\n")),(0,n.kt)("p",null,"which reads: for every integer n, if n is above 0, then ",(0,n.kt)("inlineCode",{parentName:"p"},"sum(n)")," is equal to n multiplied by n plus 1, divided by 2."),(0,n.kt)("p",null,"How to make sure that ",(0,n.kt)("inlineCode",{parentName:"p"},"sum")," verifies ",(0,n.kt)("em",{parentName:"p"},"P"),"?"),(0,n.kt)("p",null,"You can either write a test program that computes the ",(0,n.kt)("inlineCode",{parentName:"p"},"sum")," function for a large range of values, say for ",(0,n.kt)("inlineCode",{parentName:"p"},"n")," from 0 to 1000000, and checks the formula; or you can ",(0,n.kt)("em",{parentName:"p"},"mathematically")," prove the property (with inductive reasoning for example) in a few reasoning steps."),(0,n.kt)("p",null,"While you may be reasonably confident in the test program, and by transtion in the ",(0,n.kt)("inlineCode",{parentName:"p"},"sum")," function, the property is only tested on a limited set of values, and the test program may itself contain bugs. The question to decide whether the test is correct is stil not decidable on a systemic level."),(0,n.kt)("p",null,"With mathematic reasoning, properties are proven for any parameter value, and the confidence in the proof relies on whether it is correct or not."),(0,n.kt)("p",null,"Another fundamental result is that it ",(0,n.kt)("em",{parentName:"p"},"is")," possible to automatically decide whether a proof is correct or not, as long as it is formalized. Hence the confidence you get with formal methods does not rely on the confidence you may give the developper of the program and tests, but it relies on the ",(0,n.kt)("em",{parentName:"p"},"existence")," of a correct formal proof."),(0,n.kt)("p",null,"As such, formal verification provides ",(0,n.kt)("em",{parentName:"p"},"trust-less")," confidence. That's why it is a key point for the development of smart contracts bacuse, with smart contracts, blockchains had lost their trust-less execution feature; they claim it back with formal verification."),(0,n.kt)("h2",{id:"limits"},"Limits"),(0,n.kt)("p",null,"Formal verification is relative to the specification. It is possible that a verified program does not behave as expected if this expectation has not been formalized in the specification."),(0,n.kt)("p",null,"Another caveat of formal verification is the difficulty to read specification. What confidence can you have in a verified program if you do not understand its specification?"),(0,n.kt)("p",null,"At least, the trust in the verification relies on the trust in the ",(0,n.kt)(s.Z,{to:"/docs/verification/tools",mdxType:"Link"},"tools")," used to build and check the proof. The set of tools that the process relies on is called the ",(0,n.kt)(s.Z,{to:"https://en.wikipedia.org/wiki/Trusted_computing_base",mdxType:"Link"},"Trusted Computing Base"),"."),(0,n.kt)("p",null,"That's why it is suggested to ",(0,n.kt)("em",{parentName:"p"},"complement")," the verification approach with standard ",(0,n.kt)(s.Z,{to:"/docs/contract/test-scenario",mdxType:"Link"},"tests"),", especially to cover specification areas that are harder to formalize or verify."),(0,n.kt)("h2",{id:"process"},"Process"),(0,n.kt)("p",null,"The formal verification process is two steps:"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"write the formal specification of the contract"),(0,n.kt)("li",{parentName:"ol"},"prove the contract verifies the specification with formal method systems")),(0,n.kt)("p",null,"Writing formal specification is a key step of the verification process because it defines the perimeter of the verification. This task requires knowing the technical and business context of the contract execution, in order to describe accurately the contract's behavior."),(0,n.kt)("p",null,"It also requires knowing a formal specification language, which is equivalent to knowing a programming language. While there is no systemic method to write formal specification, it may follow some basic principles, presented in this ",(0,n.kt)(s.Z,{to:"/docs/verification/specification",mdxType:"Link"},"guide"),"."),(0,n.kt)("p",null,"Proving that the contract verifies the specification is a technical task that requires training and skills in ",(0,n.kt)(s.Z,{to:"/docs/verification/logic",mdxType:"Link"},"formal logic")," and formal method ",(0,n.kt)(s.Z,{to:"/docs/verification/tools",mdxType:"Link"},"tools"),"."))}u.isMDXComponent=!0}}]);
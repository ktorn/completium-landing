(self.webpackChunkcompletium_landing=self.webpackChunkcompletium_landing||[]).push([[8610],{6165:function(e,t,a){"use strict";a.d(t,{Z:function(){return v}});var r=a(9756),n=a(7294),l=a(6010),s=a(2273),i=a(6742),c="sidebar_2ahu",m="sidebarItemTitle_2hhb",o="sidebarItemList_2xAf",u="sidebarItem_2UVv",d="sidebarItemLink_1RT6",g="sidebarItemLinkActive_12pM",h=a(4973);function f(e){var t=e.sidebar;return 0===t.items.length?null:n.createElement("nav",{className:(0,l.Z)(c,"thin-scrollbar"),"aria-label":(0,h.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},n.createElement("div",{className:(0,l.Z)(m,"margin-bottom--md")},t.title),n.createElement("ul",{className:o},t.items.map((function(e){return n.createElement("li",{key:e.permalink,className:u},n.createElement(i.Z,{isNavLink:!0,to:e.permalink,className:d,activeClassName:g},e.title))}))))}var p=a(571),E=["sidebar","toc","children"];var v=function(e){var t=e.sidebar,a=e.toc,i=e.children,c=(0,r.Z)(e,E),m=t&&t.items.length>0;return n.createElement(s.Z,c,n.createElement("div",{className:"container margin-vert--lg"},n.createElement("div",{className:"row"},m&&n.createElement("aside",{className:"col col--3"},n.createElement(f,{sidebar:t})),n.createElement("main",{className:(0,l.Z)("col",{"col--7":m,"col--9 col--offset-1":!m})},i),a&&n.createElement("div",{className:"col col--2"},n.createElement(p.Z,{toc:a})))))}},3146:function(e,t,a){"use strict";a.d(t,{Z:function(){return f}});var r=a(7294),n=a(6010),l=a(3905),s=a(4973),i=a(6742),c=a(3018),m=a(637),o=a(1217),u=a(6146),d="blogPostTitle_GeHD",g="blogPostData_291c",h="blogPostDetailsFull_3kfx";var f=function(e){var t,a,f,p=(a=(0,c.c2)().selectMessage,function(e){var t=Math.ceil(e);return a(t,(0,s.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:t}))}),E=e.children,v=e.frontMatter,b=e.metadata,_=e.truncated,N=e.isBlogPostPage,Z=void 0!==N&&N,k=b.date,T=b.formattedDate,w=b.permalink,L=b.tags,P=b.readingTime,y=b.title,C=b.editUrl,I=v.author,M=v.image,x=v.keywords,R=v.author_url||v.authorURL,U=v.author_title||v.authorTitle,z=v.author_image_url||v.authorImageURL;return r.createElement(r.Fragment,null,r.createElement(o.Z,{keywords:x,image:M}),r.createElement("article",{className:Z?void 0:"margin-bottom--xl"},(f=Z?"h1":"h2",r.createElement("header",null,r.createElement(f,{className:d},Z?y:r.createElement(i.Z,{to:w},y)),r.createElement("div",{className:(0,n.Z)(g,"margin-vert--md")},r.createElement("time",{dateTime:k},T),P&&r.createElement(r.Fragment,null," \xb7 ",p(P))),r.createElement("div",{className:"avatar margin-vert--md"},z&&r.createElement(i.Z,{className:"avatar__photo-link avatar__photo",href:R},r.createElement("img",{src:z,alt:I})),r.createElement("div",{className:"avatar__intro"},I&&r.createElement(r.Fragment,null,r.createElement("div",{className:"avatar__name"},r.createElement(i.Z,{href:R},I)),r.createElement("small",{className:"avatar__subtitle"},U)))))),r.createElement("div",{className:"markdown"},r.createElement(l.Zo,{components:m.Z},E)),(L.length>0||_)&&r.createElement("footer",{className:(0,n.Z)("row docusaurus-mt-lg",(t={},t[h]=Z,t))},L.length>0&&r.createElement("div",{className:"col"},r.createElement("b",null,r.createElement(s.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),L.map((function(e){var t=e.label,a=e.permalink;return r.createElement(i.Z,{key:a,className:"margin-horiz--sm",to:a},t)}))),Z&&C&&r.createElement("div",{className:"col margin-top--sm"},r.createElement(u.Z,{editUrl:C})),!Z&&_&&r.createElement("div",{className:"col text--right"},r.createElement(i.Z,{to:b.permalink,"aria-label":"Read more about "+y},r.createElement("b",null,r.createElement(s.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More")))))))}},9404:function(e,t,a){"use strict";a.r(t);var r=a(7294),n=a(6742),l=a(6165),s=a(3146),i=a(4973),c=a(3018);t.default=function(e){var t,a=e.metadata,m=e.items,o=e.sidebar,u=a.allTagsPath,d=a.name,g=a.count,h=(t=(0,c.c2)().selectMessage,function(e){return t(e,(0,i.I)({id:"theme.blog.post.plurals",description:'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One post|{count} posts"},{count:e}))}),f=(0,i.I)({id:"theme.blog.tagTitle",description:"The title of the page for a blog tag",message:'{nPosts} tagged with "{tagName}"'},{nPosts:h(g),tagName:d});return r.createElement(l.Z,{title:f,wrapperClassName:c.kM.wrapper.blogPages,pageClassName:c.kM.page.blogTagsPostPage,searchMetadatas:{tag:"blog_tags_posts"},sidebar:o},r.createElement("header",{className:"margin-bottom--xl"},r.createElement("h1",null,f),r.createElement(n.Z,{href:u},r.createElement(i.Z,{id:"theme.tags.tagsPageLink",description:"The label of the link targeting the tag list page"},"View All Tags"))),m.map((function(e){var t=e.content;return r.createElement(s.Z,{key:t.metadata.permalink,frontMatter:t.frontMatter,metadata:t.metadata,truncated:!0},r.createElement(t,null))})))}},6146:function(e,t,a){"use strict";a.d(t,{Z:function(){return u}});var r=a(7294),n=a(4973),l=a(2122),s=a(9756),i=a(6010),c="iconEdit_2_ui",m=["className"],o=function(e){var t=e.className,a=(0,s.Z)(e,m);return r.createElement("svg",(0,l.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,i.Z)(c,t),"aria-hidden":"true"},a),r.createElement("g",null,r.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))};function u(e){var t=e.editUrl;return r.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener"},r.createElement(o,null),r.createElement(n.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}},571:function(e,t,a){"use strict";a.d(t,{r:function(){return c},Z:function(){return m}});var r=a(7294),n=a(6010);var l=function(e,t,a){var n=(0,r.useState)(void 0),l=n[0],s=n[1];(0,r.useEffect)((function(){function r(){var r=function(){var e=Array.from(document.getElementsByClassName("anchor")),t=e.find((function(e){return e.getBoundingClientRect().top>=a}));if(t){if(t.getBoundingClientRect().top>=a){var r=e[e.indexOf(t)-1];return null!=r?r:t}return t}return e[e.length-1]}();if(r)for(var n=0,i=!1,c=document.getElementsByClassName(e);n<c.length&&!i;){var m=c[n],o=m.href,u=decodeURIComponent(o.substring(o.indexOf("#")+1));r.id===u&&(l&&l.classList.remove(t),m.classList.add(t),s(m),i=!0),n+=1}}return document.addEventListener("scroll",r),document.addEventListener("resize",r),r(),function(){document.removeEventListener("scroll",r),document.removeEventListener("resize",r)}}))},s="tableOfContents_35-E",i="table-of-contents__link";function c(e){var t=e.toc,a=e.isChild;return t.length?r.createElement("ul",{className:a?"":"table-of-contents table-of-contents__left-border"},t.map((function(e){return r.createElement("li",{key:e.id},r.createElement("a",{href:"#"+e.id,className:i,dangerouslySetInnerHTML:{__html:e.value}}),r.createElement(c,{isChild:!0,toc:e.children}))}))):null}var m=function(e){var t=e.toc;return l(i,"table-of-contents__link--active",100),r.createElement("div",{className:(0,n.Z)(s,"thin-scrollbar")},r.createElement(c,{toc:t}))}}}]);
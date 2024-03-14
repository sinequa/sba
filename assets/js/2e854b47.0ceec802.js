"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8504],{12643:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var o=t(74848),s=t(28453);const i={layout:"default",title:"Introduction",parent:"Tutorial",sidebar_position:1},r="Introduction",a={id:"tutorial/intro",title:"Introduction",description:"The goal of this tutorial is to build a functional Search application, starting (almost) from scratch.",source:"@site/docs/tutorial/intro.md",sourceDirName:"tutorial",slug:"/tutorial/intro",permalink:"/sba-angular/docs/tutorial/intro",draft:!1,unlisted:!1,editUrl:"https://github.com/sinequa/sba-angular/tree/main/docs/tutorial/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{layout:"default",title:"Introduction",parent:"Tutorial",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Tutorial",permalink:"/sba-angular/docs/tutorial/"},next:{title:"Connection to Sinequa",permalink:"/sba-angular/docs/tutorial/connection"}},l={},c=[{value:"Starting point",id:"starting-point",level:2},{value:"Methodology",id:"methodology",level:2},{value:"Modules",id:"modules",level:2}];function d(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"introduction",children:"Introduction"}),"\n",(0,o.jsx)(n.p,{children:"The goal of this tutorial is to build a functional Search application, starting (almost) from scratch."}),"\n",(0,o.jsxs)(n.p,{children:["A Sinequa server is available for you to develop and test your application, so you don't have to worry about the back-end configuration. This tutorial is manageable by any Angular developer without specific knowledge about Sinequa (other than general concepts that are explained on this website). Developers need an account to connect to this server, so ",(0,o.jsx)(n.a,{href:"/docs/contact",children:"contact us"})," if you do not have one yet. You will use ",(0,o.jsx)(n.code,{children:"ng serve"})," to build and serve your application on your own computer (",(0,o.jsx)(n.code,{children:"localhost"}),"), while the data comes from the remote Sinequa server."]}),"\n",(0,o.jsx)(n.p,{children:"At the end of the tutorial, your application will look something like this:"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{alt:"Finished app",src:t(87727).A+"",width:"1732",height:"1003"})}),"\n",(0,o.jsx)(n.h2,{id:"starting-point",children:"Starting point"}),"\n",(0,o.jsxs)(n.p,{children:["The tutorial starts at the end of the ",(0,o.jsx)(n.a,{href:"/sba-angular/docs/guides/development#building-the-libraries",children:'"Building the libraries"'})," step of the ",(0,o.jsx)(n.a,{href:"/sba-angular/docs/guides/development",children:"Development"})," section. You must have installed the required tools (NodeJs, VS Core, Git), downloaded or cloned the Angular workspace, installed the dependencies and built the ",(0,o.jsx)(n.code,{children:"@sinequa/core"})," and ",(0,o.jsx)(n.code,{children:"@sinequa/components"})," libraries."]}),"\n",(0,o.jsxs)(n.p,{children:["Unless otherwise specified, the tutorial is based on the ",(0,o.jsx)(n.a,{href:"/sba-angular/docs/apps/hello-search",children:(0,o.jsx)(n.strong,{children:"Hello Search"})})," app included in the workspace inside ",(0,o.jsx)(n.code,{children:"projects/hello-search/"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"methodology",children:"Methodology"}),"\n",(0,o.jsxs)(n.p,{children:["We recommend doing this tutorial inside ",(0,o.jsx)(n.strong,{children:"Visual Studio Code"})," (with the Angular workspace root opened), and using a ",(0,o.jsx)(n.strong,{children:"modern browser"})," (Chrome, Firefox) to test and inspect your app. Keep one (or more) terminal(s) opened in VS Code, to run commands like ",(0,o.jsx)(n.code,{children:"ng serve"}),", ",(0,o.jsx)(n.code,{children:"git status"})," or ",(0,o.jsx)(n.code,{children:"ng generate component"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["We recommend using ",(0,o.jsx)(n.strong,{children:"Git"})," to track the changes during the different steps of the tutorial. At the end of each chapter, commit your changes in a ",(0,o.jsx)(n.code,{children:"tutorial"})," branch, to make it easy to track and revert changes, and go back in time later."]}),"\n",(0,o.jsxs)(n.p,{children:["You might face runtime errors not detected during compilation. The only way to see these errors is to keep the ",(0,o.jsx)(n.strong,{children:"inspector"})," of your web browser opened, with an eye on the ",(0,o.jsx)(n.strong,{children:"console"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"modules",children:"Modules"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.em,{children:"Module"})," is an ambiguous term. It may refer to a ",(0,o.jsx)(n.a,{href:"https://www.typescriptlang.org/docs/handbook/modules.html",children:"typescript module"}),", which is in fact just a ",(0,o.jsx)(n.code,{children:".ts"})," file, which ",(0,o.jsx)(n.em,{children:"imports"})," variables and types from other modules and ",(0,o.jsx)(n.em,{children:"exports"})," other variables and types. In contrast, an ",(0,o.jsx)(n.a,{href:"https://angular.io/guide/architecture-modules",children:"Angular module"})," is a class with a ",(0,o.jsx)(n.code,{children:"NgModule"})," annotation, which ",(0,o.jsx)(n.em,{children:"also"})," imports other ",(0,o.jsx)(n.code,{children:"NgModule"})," and can export Angular components, directives and pipes."]}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"Typescript module:"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { a } from './foo';\n\nconsole.log(a);\nexport const b = a + 42;\n"})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"Angular module:"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { AnotherModule } from './foo';\n\n@NgModule({\n    imports: [\n        AnotherModule\n    ]\n})\nexport class MyModule {}\n"})}),"\n",(0,o.jsx)(n.p,{children:"In this tutorial, we generally refer to the second type of modules (Angular modules)."}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.img,{alt:"Sample module",src:t(77838).A+"",width:"949",height:"369"}),"\n",(0,o.jsx)(n.em,{children:"Relationships between Angular modules (blue), components (purple) and their library (green)"})]}),"\n",(0,o.jsxs)(n.p,{children:["Some of these modules are based on the ",(0,o.jsx)(n.a,{href:"https://getbootstrap.com/",children:(0,o.jsx)(n.strong,{children:"Bootstrap"})})," library. When a module or component depends on Bootstrap, its class name is prefixed with ",(0,o.jsx)(n.strong,{children:(0,o.jsx)(n.code,{children:"Bs"})})," (eg. ",(0,o.jsx)(n.code,{children:"BsSearchModule"}),", ",(0,o.jsx)(n.code,{children:"BsFacetList"}),")."]}),"\n",(0,o.jsxs)(n.p,{children:["The tutorial is divided in chapters which each deals with a new Sinequa feature. These features come packaged as modules of the ",(0,o.jsx)(n.a,{href:"/sba-angular/docs/libraries/components/",children:(0,o.jsx)(n.code,{children:"@sinequa/components"})})," library. The illustration below depicts in more details the content of a typical module/library which you will use in this tutorial."]}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.img,{alt:"Sample module",src:t(28798).A+"",width:"823",height:"829"}),"\n",(0,o.jsx)(n.em,{children:"Content of one of the libraries (green), including modules (blue), components (purple), services (red), styles (orange) and locales (grey)"})]}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.strong,{children:"This gives you a natural checklist for dealing with these modules:"})}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Take a look at the code of that module in the ",(0,o.jsx)(n.a,{href:"/sba-angular/docs/libraries/components/",children:(0,o.jsx)(n.code,{children:"@sinequa/components"})})," library. In this example, inside: ",(0,o.jsx)(n.code,{children:"projects/components/facet/"}),". This gives you a general idea of what components, directives and services are bundled with that module."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Import the module you're interested in in your ",(0,o.jsx)(n.code,{children:"app.module.ts"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { BsFacetModule } from '@sinequa/components/facet';\n\n@NgModule({\n  imports: [\n    ...,\n    BsFacetModule\n  ],\n  ...\n})\n...\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Use the components, directives and pipes in the templates of your app:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-html",children:'<sq-facet-list [results]="..."></sq-facet-list>\n'})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Inject the services in the constructor(s) of your component(s):"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { FacetService } from '@sinequa/components/facet';\n\n...\nexport class MyComponent {\n  constructor(\n    public facetService: FacetService\n  ){\n    ...\n  }\n}\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Some libraries include a global stylesheet that needs to be imported so that the components are correctly displayed. Import these stylesheet in your global ",(0,o.jsx)(n.code,{children:"styles\\app.scss"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-scss",children:'@import\xa0"../../../components/facet/bootstrap/facet.scss";\n'})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:['Some components contain strings that need to be translated in various languages, to internationalize your SBA. We provide translations in three languages (English, French and German) via "message files" which your app needs to import. Alternatively, you can ignore these files and fully rewrite the messages in your app (which is needed anyway if you are going to add additional languages). See the ',(0,o.jsx)(n.a,{href:"/sba-angular/docs/tutorial/intl",children:"Internationalization chapter"})," of the tutorial for more details."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:'import\xa0{enFacet}\xa0from\xa0"@sinequa/components/facet";\n'})}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},87727:(e,n,t)=>{t.d(n,{A:()=>o});const o=t.p+"assets/images/finished-f23c6740441525bcda7ee755703076ec.png"},77838:(e,n,t)=>{t.d(n,{A:()=>o});const o=t.p+"assets/images/modules-c0252e8612798b530f93c9269de68ebf.png"},28798:(e,n,t)=>{t.d(n,{A:()=>o});const o=t.p+"assets/images/modules2-c4122167d20839210633f9d3a67c4c94.png"},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var o=t(96540);const s={},i=o.createContext(s);function r(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);
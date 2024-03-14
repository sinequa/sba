"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2961],{70679:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var i=t(74848),a=t(28453);const o={layout:"default",title:"Configuration",parent:"Tips and Tricks",sidebar_position:7},r="Configuration",s={id:"tipstricks/configuration",title:"Configuration",description:"It is a good practice to centralize some high-level parameters of your application in a place where you can easily modify them (rather than if they were hard-coded everywhere in the source code). For example, you could specify the list of facets or the metadata you want to display.",source:"@site/docs/tipstricks/configuration.md",sourceDirName:"tipstricks",slug:"/tipstricks/configuration",permalink:"/sba-angular/docs/tipstricks/configuration",draft:!1,unlisted:!1,editUrl:"https://github.com/sinequa/sba-angular/tree/main/docs/tipstricks/configuration.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{layout:"default",title:"Configuration",parent:"Tips and Tricks",sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"User settings",permalink:"/sba-angular/docs/tipstricks/user-settings"},next:{title:"Environment",permalink:"/sba-angular/docs/tipstricks/environment"}},c={},l=[{value:"Source-code configuration",id:"source-code-configuration",level:2},{value:"Server-side configuration",id:"server-side-configuration",level:2},{value:"Combining both approaches",id:"combining-both-approaches",level:2}];function p(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"configuration",children:"Configuration"}),"\n",(0,i.jsx)(n.p,{children:"It is a good practice to centralize some high-level parameters of your application in a place where you can easily modify them (rather than if they were hard-coded everywhere in the source code). For example, you could specify the list of facets or the metadata you want to display."}),"\n",(0,i.jsx)(n.p,{children:"There are essentially two ways of doing this in the SBA framework:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Centralize configuration in the source code of your app."}),"\n",(0,i.jsxs)(n.li,{children:["Centralize configuration on the server and download it in your app via the ",(0,i.jsx)(n.code,{children:"AppWebService"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"source-code-configuration",children:"Source-code configuration"}),"\n",(0,i.jsxs)(n.p,{children:["The first one is not specific to Sinequa: You can simply store your settings in a global TypeScript file that you can import anywhere in your app. An example of this is available in ",(0,i.jsx)(n.a,{href:"/sba-angular/docs/apps/vanilla-search",children:"Vanilla Search"})," with the ",(0,i.jsx)(n.code,{children:"src/config.ts"})," file. You can use this file to store any data you need, and then import this data from a component or service."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="config.ts"',children:'export const FACETS = [\n    {\n        "title": "Companies",\n        "aggregation": "Companies"\n    },\n    {\n        "title": "People",\n        "aggregation": "People"\n    },\n    ...\n]\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="app.component.ts"',children:'import { FACETS } from "../config";\n\n...\npublic getFacets(){\n    return FACETS\n}\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",metastring:'title="app.component.html"',children:'<sq-facet-card *ngFor="let facet of getFacets()" [title]="facet.title">\n    <sq-facet-list #facet [results]="results" [aggregation]="facet.aggregation"></sq-facet-list>\n</sq-facet-card>\n'})}),"\n",(0,i.jsx)(n.p,{children:"The drawback of this method is that you have to rebuild your application to take into account any change in the configuration."}),"\n",(0,i.jsx)(n.h2,{id:"server-side-configuration",children:"Server-side configuration"}),"\n",(0,i.jsxs)(n.p,{children:['This approach stores the configuration in JSON format in the Sinequa administration. Your App configuration has a "Customization (JSON)" tab as described in ',(0,i.jsx)(n.a,{href:"/sba-angular/docs/guides/server-config#apps",children:"Server configuration"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Unlike the first method, this configuration is ",(0,i.jsx)(n.strong,{children:"dynamic"}),", meaning you won't have to rebuild your application to see the difference. However, it is only available ",(0,i.jsx)(n.strong,{children:"post-login"}),", so you cannot store information like the URL of your web-service (See ",(0,i.jsx)(n.a,{href:"/sba-angular/docs/tipstricks/environment",children:"environment"})," for that)."]}),"\n",(0,i.jsx)(n.p,{children:"We can adapt our first example:"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Server config",src:t(29423).A+"",width:"756",height:"384"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="app.component.ts"',children:"import { AppService } from '@sinequa/core/app-utils';\n\n...\n  constructor(\n    ...\n    private appService: AppService) { }\n\n  public get facets() {\n    return this.appService.app?.data?.facets || [];\n  }\n"})}),"\n",(0,i.jsx)(n.p,{children:"(The HTML template is unchanged)"}),"\n",(0,i.jsx)(n.h2,{id:"combining-both-approaches",children:"Combining both approaches"}),"\n",(0,i.jsxs)(n.p,{children:["In ",(0,i.jsx)(n.a,{href:"/sba-angular/docs/apps/vanilla-search",children:"Vanilla Search"})," both approaches are used. By default, the ",(0,i.jsx)(n.code,{children:"src/config.ts"})," file is used, but if configuration is passed through the ",(0,i.jsx)(n.code,{children:"AppService"})," as above, then it takes precedence."]}),"\n",(0,i.jsxs)(n.p,{children:["For example, the Home component has the following logic for listing the active ",(0,i.jsx)(n.em,{children:"features"})," (resulting in specific facets on the home page):"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'title="home.component.ts"',children:"import { AppService } from '@sinequa/core/app-utils';\nimport { FEATURES } from '../../config';\n\n  constructor(\n    ...\n    private appService: AppService) { }\n\n  ...\n  public get features(): string[] {\n    return this.appService.app?.data?.features as string[] || FEATURES;\n  }\n"})})]})}function d(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},29423:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/config-5c57f60ecbdbe6e7bd2b6673dca89d59.png"},28453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>s});var i=t(96540);const a={},o=i.createContext(a);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);
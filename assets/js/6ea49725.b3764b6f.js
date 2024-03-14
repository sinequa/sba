"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3736],{44923:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>o,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>l,toc:()=>d});var s=n(74848),t=n(28453);const a={layout:"default",title:"Vis Timeline Module",parent:"Analytics",grand_parent:"Libraries",nav_order:4},r="Vis Timeline Module",l={id:"libraries/analytics/vis-timeline",title:"Vis Timeline Module",description:"This module is an integration of the Vis Timeline library.",source:"@site/docs/libraries/analytics/vis-timeline.md",sourceDirName:"libraries/analytics",slug:"/libraries/analytics/vis-timeline",permalink:"/sba-angular/docs/libraries/analytics/vis-timeline",draft:!1,unlisted:!1,editUrl:"https://github.com/sinequa/sba-angular/tree/main/docs/libraries/analytics/vis-timeline.md",tags:[],version:"current",frontMatter:{layout:"default",title:"Vis Timeline Module",parent:"Analytics",grand_parent:"Libraries",nav_order:4},sidebar:"tutorialSidebar",previous:{title:"Timeline Module",permalink:"/sba-angular/docs/libraries/analytics/timeline"},next:{title:"UI Builder",permalink:"/sba-angular/docs/libraries/ngx-ui-builder"}},o={},d=[{value:"Features",id:"features",level:2},{value:"Import",id:"import",level:2},{value:"Timeline Component",id:"timeline-component",level:2},{value:"Basic usage",id:"basic-usage",level:3},{value:"Dates and Events",id:"dates-and-events",level:3},{value:"List of Inputs",id:"list-of-inputs",level:3}];function c(e){const i={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.h1,{id:"vis-timeline-module",children:"Vis Timeline Module"}),"\n",(0,s.jsxs)(i.p,{children:["This module is an integration of the ",(0,s.jsx)(i.a,{href:"https://visjs.github.io/vis-timeline/docs/timeline/",children:"Vis Timeline"})," library."]}),"\n",(0,s.jsxs)(i.p,{children:["This module reuses code from the ",(0,s.jsx)(i.a,{href:"https://github.com/visjs/ngx-vis",children:"ngx-vis"})," project. The documentation from this project is valid, except the directive and service are packaged in this Sinequa module."]}),"\n",(0,s.jsx)(i.h2,{id:"features",children:"Features"}),"\n",(0,s.jsxs)(i.p,{children:["This module includes a sample Timeline visualization for dates and events, based on the ",(0,s.jsx)(i.a,{href:"https://visjs.org/",children:"Vis library"}),". The timeline can display punctual ",(0,s.jsx)(i.em,{children:"dates"})," (generic events) or ",(0,s.jsx)(i.em,{children:"events"})," (dates associated to an event name)."]}),"\n",(0,s.jsx)(i.p,{children:"The module only includes one component, which can be used as is, or more probably taken as a starting point for further development using the Vis library API."}),"\n",(0,s.jsx)(i.p,{children:(0,s.jsx)(i.img,{alt:"Timeline",src:n(36274).A+"",width:"736",height:"261"})}),"\n",(0,s.jsx)(i.h2,{id:"import",children:"Import"}),"\n",(0,s.jsxs)(i.p,{children:["Import this module in your ",(0,s.jsx)(i.code,{children:"app.module.ts"}),"."]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-ts",children:"import { VisTimelineModule } from '@sinequa/analytics/vis-timeline';\n\n@NgModule({\n  imports: [\n    ...\n    VisTimelineModule\n"})}),"\n",(0,s.jsxs)(i.p,{children:["Note that if you need to use the Vis Timeline library directly (without using our wrapper module), you can simply import the ",(0,s.jsx)(i.code,{children:"VisModule"})," as follow:"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-ts",children:'import {VisModule} from "ngx-vis";\n\n@NgModule({\n  imports: [\n    ...\n    VisModule\n'})}),"\n",(0,s.jsx)(i.p,{children:"In any case you will also need to import the following stylesheet in your app's global stylesheet:"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-scss",children:'// Vis.js styles\n@import "~vis-timeline/dist/vis-timeline-graph2d.min.css";\n'})}),"\n",(0,s.jsx)(i.h2,{id:"timeline-component",children:"Timeline Component"}),"\n",(0,s.jsx)(i.h3,{id:"basic-usage",children:"Basic usage"}),"\n",(0,s.jsxs)(i.p,{children:["The ",(0,s.jsx)(i.code,{children:"sq-result-timeline"})," component displays a timeline associated to a specific ",(0,s.jsx)(i.code,{children:"Record"}),' object. This record must have at least one column storing a list of "dates" or "events".']}),"\n",(0,s.jsxs)(i.p,{children:["If this column is named ",(0,s.jsx)(i.code,{children:"'dates'"}),", a sample usage could be as follow:"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-html",children:'<sq-result-timeline [record]="record" [dates]="record[\'dates\']"></sq-result-timeline>\n'})}),"\n",(0,s.jsx)(i.h3,{id:"dates-and-events",children:"Dates and Events"}),"\n",(0,s.jsxs)(i.p,{children:["A ",(0,s.jsx)(i.strong,{children:"date"})," can be a JavaScript ",(0,s.jsx)(i.a,{href:"https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date",children:(0,s.jsx)(i.code,{children:"Date"})})," object, or a formatted string which can be parsed automatically by the ",(0,s.jsx)(i.a,{href:"https://date-fns.org/",children:"date-fns library"})," (which is used internally). For example ",(0,s.jsx)(i.code,{children:'"2020-12-03"'})," or ",(0,s.jsx)(i.code,{children:'"2020-12"'})," qualify as dates. A Sinequa index can store such a list of dates within a CSV or Entity column."]}),"\n",(0,s.jsxs)(i.p,{children:["An ",(0,s.jsx)(i.strong,{children:"event"})," is a date associated to an event name. The association is done by formatting the field as ",(0,s.jsx)(i.code,{children:"(Event name)#(Date)"}),", which is the standard format of cooccurrence normalization in the Sinequa platform. For example, the event ",(0,s.jsx)(i.code,{children:"(Birthday)#(2021-04-24)"})," can be extracted from documents with a cooccurrence associating two entities: One for the event names (eg. a whitelist entity) and one for the dates (eg. a TMA entity)."]}),"\n",(0,s.jsxs)(i.p,{children:["\u26a0\ufe0f Note that you may have other type of data to display on this timeline. Rather than trying to awkwardly coax your data into the data structures that this component expect, we recommend you to create your own component using the ",(0,s.jsx)(i.a,{href:"https://visjs.org/",children:"Vis"})," and ",(0,s.jsx)(i.a,{href:"https://github.com/visjs/ngx-vis",children:"ngx-vis"})," APIs. In particular the ",(0,s.jsx)(i.code,{children:"[visTimeline]"})," directive and ",(0,s.jsx)(i.code,{children:"VisTimelineService"})," to listen to user events, like clicks on the dates and events. Both the directive and service are packaged in the Sinequa library and can be imported with: ",(0,s.jsx)(i.code,{children:"import {VisTimelineDirective, VisTimelineService} from '@sinequa/analytics/vis-timeline';"})]}),"\n",(0,s.jsx)(i.h3,{id:"list-of-inputs",children:"List of Inputs"}),"\n",(0,s.jsxs)(i.p,{children:["The ",(0,s.jsx)(i.code,{children:"sq-result-timeline"})," component accepts the following inputs:"]}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.code,{children:"record"})," (required): The object of type ",(0,s.jsx)(i.code,{children:"Record"})," which contains the dates to display."]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.code,{children:"dates"})," (optional): The column of the ",(0,s.jsx)(i.code,{children:"record"})," object which contains the dates to display (eg. ",(0,s.jsx)(i.code,{children:"record['dates']"}),")."]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.code,{children:"events"})," (optional): The column of the ",(0,s.jsx)(i.code,{children:"record"})," object which contains the events to display (eg. ",(0,s.jsx)(i.code,{children:"record['events']"}),")."]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.code,{children:"min_year"})," and ",(0,s.jsx)(i.code,{children:"max_year"})," (defaults: ",(0,s.jsx)(i.code,{children:"0"})," and ",(0,s.jsx)(i.code,{children:"10000"}),"): Min and max years to filter out the date and event outliers."]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.code,{children:"min_dates"})," and ",(0,s.jsx)(i.code,{children:"max_dates"})," (defaults: ",(0,s.jsx)(i.code,{children:"1"})," and ",(0,s.jsx)(i.code,{children:"100"}),"): Min and max number of dates or events to display."]}),"\n"]}),"\n",(0,s.jsxs)(i.li,{children:["\n",(0,s.jsxs)(i.p,{children:[(0,s.jsx)(i.code,{children:"options"}),": an object of type ",(0,s.jsx)(i.a,{href:"https://visjs.github.io/vis-timeline/docs/timeline/#Configuration_Options",children:(0,s.jsx)(i.code,{children:"TimelineOptions"})})," containing the configuration of the Vis Timeline. The default options are as follow:"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-ts",children:"export const defaultOptions : TimelineOptions = {\n    minHeight : '150px',\n    margin: {\n        axis: 5,\n        item: 5\n    }\n};\n"})}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},36274:(e,i,n)=>{n.d(i,{A:()=>s});const s=n.p+"assets/images/timeline-9df9a6c344588e1f3bebd976723c3d12.png"},28453:(e,i,n)=>{n.d(i,{R:()=>r,x:()=>l});var s=n(96540);const t={},a=s.createContext(t);function r(e){const i=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function l(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(a.Provider,{value:i},e.children)}}}]);
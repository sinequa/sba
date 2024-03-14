"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9121],{15768:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>l,toc:()=>a});var t=i(74848),s=i(28453);const o={layout:"default",title:"Filters Module",parent:"Components",grand_parent:"Libraries",sidebar_position:4},r="Filters Module",l={id:"libraries/components/filters",title:"Filters Module",description:"Features",source:"@site/docs/libraries/components/filters.md",sourceDirName:"libraries/components",slug:"/libraries/components/filters",permalink:"/sba-angular/docs/libraries/components/filters",draft:!1,unlisted:!1,editUrl:"https://github.com/sinequa/sba-angular/tree/main/docs/libraries/components/filters.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{layout:"default",title:"Filters Module",parent:"Components",grand_parent:"Libraries",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Facet Module",permalink:"/sba-angular/docs/libraries/components/facet"},next:{title:"Search Form Component",permalink:"/sba-angular/docs/libraries/components/search-form"}},c={},a=[{value:"Features",id:"features",level:2},{value:"Import",id:"import",level:2},{value:"API usage",id:"api-usage",level:2},{value:"Filters component",id:"filters-component",level:3},{value:"Filters editor component",id:"filters-editor-component",level:3},{value:"Filters view component",id:"filters-view-component",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"filters-module",children:"Filters Module"}),"\n",(0,t.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,t.jsxs)(n.p,{children:["This module provides 3 components to visualize the ",(0,t.jsx)(n.a,{href:"/sba-angular/docs/libraries/core/app-utils#filtering-the-metadata",children:"filters"})," of a ",(0,t.jsx)(n.code,{children:"Query"})," object."]}),"\n",(0,t.jsx)(n.p,{children:'A query can contain a "tree" of filters defining the boolean conditions for filtering the search results. These filters might look like:'}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:'Source: "Documentation"'}),"\n",(0,t.jsxs)(n.li,{children:["And either:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:'Format: "pdf"'}),"\n",(0,t.jsx)(n.li,{children:'Format: "html"'}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["These filters would be added to a ",(0,t.jsx)(n.code,{children:"query"})," object with the ",(0,t.jsx)(n.code,{children:"addFilter"})," method:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'query.addFilter({\n  operator: "and",\n  filters: [\n    {field: "Source", value: "Documentation"},\n    {\n      operator: "or",\n      filters: [\n        {field: "Format", value: "pdf"},\n        {field: "Format", value: "html"},\n      ]\n    }\n  ]\n});\n'})}),"\n",(0,t.jsxs)(n.p,{children:["See more details about the supported filters in the ",(0,t.jsx)(n.a,{href:"/sba-angular/docs/libraries/core/app-utils#filtering-the-metadata",children:"documentation of the Query objects"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["The filters would then be represented by the following tree (in the ",(0,t.jsx)(n.code,{children:"sq-filters-editor"})," component):"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Filters Editor",src:i(55861).A+"",width:"304",height:"104"})}),"\n",(0,t.jsx)(n.h2,{id:"import",children:"Import"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"import { FiltersModule } from '@sinequa/components/filters';\n\n@NgModule({\n  imports: [\n    ...\n    FiltersModule,\n  ],\n})\n"})}),"\n",(0,t.jsxs)(n.p,{children:["This module is internationalized: If not already the case, you need to import its messages for the language(s) of your application. For example, in your app's ",(0,t.jsx)(n.code,{children:"src/locales/en.ts"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'...\nimport {enFilters} from "@sinequa/components/filters";\n\nconst messages = Utils.merge({}, ..., enFilters, appMessages);\n'})}),"\n",(0,t.jsx)(n.h2,{id:"api-usage",children:"API usage"}),"\n",(0,t.jsx)(n.h3,{id:"filters-component",children:"Filters component"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"sq-filters"})," component displays the filters of a query in an inline view:"]}),"\n",(0,t.jsx)("doc-filters",{}),"\n",(0,t.jsx)(n.h3,{id:"filters-editor-component",children:"Filters editor component"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"sq-filters-editor"})," component displays the filters of a query in an editable tree view:"]}),"\n",(0,t.jsx)("doc-filters-editor",{}),"\n",(0,t.jsx)(n.h3,{id:"filters-view-component",children:"Filters view component"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"sq-filters-view"})," component integrates both the ",(0,t.jsx)(n.code,{children:"sq-filters"})," and ",(0,t.jsx)(n.code,{children:"sq-filters-editor"})," components. By default it displays the ",(0,t.jsx)(n.code,{children:"sq-filters"}),' component, and when clicking on the "Edit" button, it displays the ',(0,t.jsx)(n.code,{children:"sq-filters-editor"})," component."]}),"\n",(0,t.jsx)("doc-filters-view",{})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},55861:(e,n,i)=>{i.d(n,{A:()=>t});const t="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATAAAABoCAIAAAD5MzuKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAASdEVYdFNvZnR3YXJlAEdyZWVuc2hvdF5VCAUAABA+SURBVHhe7Z3bbxXHHcfzr/ShD/0H+hBFVaQ89K1KkyhR3xI1vahtLmqapKkSoG3iCiUFGpMSCIZQsGLMxYEYiAzllqBCkE2xA8YYbMAYDnHw/XJsbNJP+C6T8Tk+6z0Xu7vr30ej1cxvZ3cHPB/PzPE5cx6YnJz6xjCMGICMDwRZwzBigAlpGDHChDSMGGFCGkaMMCENI0aYkIYRI0xIw4gRJqRhxAgT0jBihAlpGDHChDSMGGFCGkaMSJKQMzN3h0ZGx8YnZmZmgpBhpIvECDk6PnE90zc1dScoG0YaSYaQ2Nh17cbYeDYoG0ZKSYCQzFSvXs9k+vqDsmGklwQIOTg8yvA4PDoWlA0jvSRAyN5MH0JO3bHVo5F+EiBkd89NhLx7925Qvs/09PSxEye31u3a33Q4m81SbDp8nCJH8kElw0gUCRASG3EyKHgMDg4te+ud515+4/lXlrV+2X7las8rb7xFkSP5oJJhJAoTcjHovHT5oYcf+d73f+DSyrf/HpxLOPqn/fSJp/r7/8+vuo2MjIyNzXqhgSLBoJAQEiykm6PWNzQi5/j4xJ59TRQ5kg8q3YPeLw3oOnSgILqI5AtJikMnzocm0bAXfv9yzv+hT/2OXbT/5KkvyC+QkKOjoz09PaxEgrLH0NDQ1atXc0719vZWV1fX1tYODAwoQoYiQU4pkggSLCSrytZz7bX1DYeOfqY15MnTLQjJ0V9DYqMbjug9rW1tyi8m6rWul9OV5SQ9WxXiQ05T50S/4CTkQoBCq1evXr58eU1NjRNMoKJO1dXVIW0QvRfHPeJyUjZSJMipoFISSMOU9cU/rjjXfrHQlJXeM2fXccOm++2OHs4Q+uXry/9MpyTzzLO/em/detcFNT6Q1Gs1pFB0w+/6mi2NB5ru3SYgv5frJjl3IPlDja5SnNbqEv1y8W+of8iRo8coqgJB5d0T/UfoDvql4G6rxrvfFEoU3T+W5N9ZiXzbl+f9f5pfnzwRXUId7qY2qAEhHD9+fOPGjW1tbWvWrEGqHDZt2tTS0kImx7Tu7m65yrVAhiLB4HRCSIOQpDOt5woJST9QbwvK96CvuD5EBeUJqg8B9Z2QXO7i/oX79n96+/YARe5AkZqoS9ePIqQidNCuri6nipKcVAUXdOaoN/s3JEL86Z//QjWJP/r4k8qTaJtvoxK3Ik6Gmu4p3O3Y8c+VV6KObu7Stto6qrkieV9ItdBPRIhzNr9V+n+Yk46OjqqqKhm1d+/e+vr6wcFBFoTQ2tpKHNatW9fX1xdccB/nJCTRRkiwkJNTU9u278bJd9/fpDXk+k3bKHJ0/V6o+5LIUKSDYo7yQGXco0jvISlI0R8hucSvqTpAx1JfJJ9/1kHQ9VpF5AOefLhlKxlpxlnqqL/KBMWFursi/g39mvl5/aPyL5R7vvx+3m+qUIP9O0sqV//GjZvcgTwRV5+4fmeR1/+taxX5QszMzFy+fPnEiRM3b97EOmanw8PD7tSFCxc4lclkFPFxM1Xw15MJItlryEuXu0+3nD3X3oGcrBvPX7hIkeOcf4dU16Gj0O3oInJM0EuIq+8qQuV8IfMvVLfzk7ppDq7Xul4uSYgw5pBxz1Wco9/phU5JCf+Gfk13uZ9Xxk9cKCF1N/5FuJQvJImMf6Hq+0909SWkbuLfkzhnqUNNv1Xko8CouGPHjvzBMB/fRpFEJ9OzhrzW0/vqsiqKHMkHlWZDH6Iz0VdKGyFzLgTdMCgUhkt8IblK/ZuMOqhu4gTQbV1c6CrdxM+rJhHq+N3d5f1HOHQHBZ08ZPym+nX8m/hPdPXDR8iShcxms7t3775y5Qp5RsWmpiYWkFNTuV9IMzQ0JBs1U3VzV4KcCiolgZSvIelVm7ds5agiPcl1KfU58nQd1/+UIZFRnm7khMy5kDWkeqG6pqPQGpKO6Ce1RDL4cfdc/xIq599ENTlFXm3wu7vL519IZRIZvw2+kKq2q2FPzoWqryeSaED4GpKnEOcsdbhzTgsjcurUqY8//hjHampq7o18y4kE5+6jZae/bsTh6upqgpxSJBEkWMiJieyGzbU4uWrtB/0Dg6OjY2s3fEiRI/mgkjcckdSfhN+rJJi6DhF6D7Llj5DCXai7+T1Yt4oipN8j8++QH9ez9Gg1j6MqKxgiZM6tVLmQkO4pqqY8p3iiq+/uRgNyXmV115LUJOKcpQ5XUfRbFZHJyckjR45oxGtubmZJeejQoZwPqbN+6ezszPmTI0WC+W+6jDMJFtJYUoyPj+/atQsnE/ryaURMSCMxTE9Ps4z03w+QPkxIw4gRJqRhxAgT0jBihAlpGDHChDSMGGFCGkaMMCErg+2qblQEE7IC2K7qRqUwIcvFdlU3KogJWRa2q7pRWUzIsrBd1Y3KYkKWhe2qblQWE7IsaBjNm/MDPhcvddXWN3y0c8/NzFcUz1+4+O2Olbs/6R8YVAXDyMeELIuQtm3etl0fnv7XRzsnJrKr3/tAxQMHjwQ1DCOPhRUym82uql7XfeVaUC4JE3IR0AeL9ZHi+HDnzp3+/n5/AkKeCPGgnDpMyLIIaZvmqKSOzst0o/980UyeSey16zeCGnn7d+jz+AsENw/5nH4hIfUB/0qJWtR+5Fh38ODBqqqq5uZmvd2CI3kixNPqpAlZFiFtu/XV1zv37CORodh99RrryU8OHBwe+e7ztQj5wuxt7BaO0oQsFC+BYvcjn5qaOnDgAEE5SVE2EiGev89VOihCyMYDTY/97GnScy+9NjD47U5eRNbXbCERfPqXv3PiuZo7G/balBUPC01Z5xTSHzbxQUEy761bT1zb2DxzfzN17VWjccztW+PfgVPa1UZF4plM5s2Vq86cnfWVChLPbX/O0e2nqqTnavscqhHR43BVFeaVtoT9yCcnJxsbGwniIa7KRiLEgxqpI6qQjHXYpRmFJCQj8fSjJc+PmQoUlVHQFzWHuh0N8laJYnBiNkkXkkx0ISWPG8rwRHkyuKSa2mNKcano8lzLHXBDelDz0ceflKXuVvxoCgnptj8nFdqk3N/sPGfjc+1zVYjS9iN3Top02wilTFn5WTohlQGse235m7e+6vN/2Pzsw0dI52QhGyGhQrJoXPG3VX9ZueZcewdryINHji9765033/4Hc9egxuyhjIQwiOT3bFzS5ndOJwXdRniF8oILteUsef8O+UhIjuSp5vKKO73Rj0QmP+9+XxSCFWAJ+5G7dSM2cnTrybRShJBo5kazfCGZxKIiQvoGziskoGKIjZBQIb++3X+65WzLf9sG703ve67fUDF8DUnXlwnCVSAYXUg85CpJLmc4698hH188jiFC6vcFT8FASejnv71XBCLuR+7bKFLvZFQh/YnonCOkE9IfIQkybIYLOS8JFdJfQ2YnJ9esq1Gx6fCxoEYBIdXjVcSBYkdIbd0vhYodIRdNSDrSvPuRY92ZM2dkIzPVkZERt54knlYnowrpu0emkJAcCTp1yYesISOSdCGLWkOqcztznEW+TuFCdnV1cZSEHItaQxYSkkQ7/T2R1c6ShYR59yOnnYyixN26kaNedyWuDpY+inhRh5+im6+GCEmeoGou6Kus09PTx06c3Fq3a3/TYZpHUV+ozHHOL9tZCEKE/PfRz1k0sow823aeNWTjp4cosqS8eKkrqDGXkKD+LQ3yzYR8CXPyMopEkftLSI5a6YW8ypovpK6iWHEhsWve/cgZFVtbW/1XccgTSdwXlUenlBd1FplCnd59t8fzryxr/bK90PdDLihxHr0TwRLZjzw6JmRZmJDlsxT2I49OgoV0c9T6hkbkZB61Z18TRY7kg0oLjAlpVJYEC8nCrPVce219w6Gjn2kNefJ0C0JyjMMa0jBKIA1TVn1ha8iUtfH+W/ncS776e8zOhr0EOatqJWBCGpUlDUKSCn1hK5w52+befIuNeEieRNC9RJyPewuRUqG3LpiQRmVJsJCTU1Pbtu/GyXff36Q15PpN2yhydGtI/bXGf4kfCSlqhAz/e4xzMuSNRCakUVmSvYa8dLn7dMvZc+0dyMm68fyFixQ5ujUkQub8IZQJKimKkICKITaCCWlUlvSsIa/19L66rIoiR/KqU84IGQUT0qgs6V9DMh7OuYY0IY0YkmAhJyayGzbX4uSqtR/0DwyOjo6t3fAhRY7kg0r3cK+yOjMXQUjbdc4ogQQLGQdC2ubeXG67zhnRMSHLYkkJWb/ju90JQO9HL/Y95VEYGRkZG5s1x6GY4jeU+5iQZRHStmTtOhcFX0jlSfMKWdROc9Db21tdXV1bW+s2wiJDkSCnFEkxJmRZhLQtWbvORcEXUsOjPq4VQrE7zQFx3CMuJ2UjRYL+/ldpxYQsi5C2+TsGRP+AMlB0w6YbM8ks5q5zbtxz1xLRE7mhKitxNuSt/CXsNAfd3d1ylWuBzNL5cJYJWRZRhCxqxwAJoFEI6PpuRHKS6EPDinOUJMpLDwYujV3ULHnXOSIu7idu4gfDhSxtpzlwTsLSsRFMyLIIaVtyd52jPsLTsOaWM2TcwKs6uony805ZZ0raaQ7cTBX89WTqMSHLIqRtyd11jjtgoxPS/YLg8mKF9GFUjLLTHPg2iqXjpAlZFiFt89eQSdl1ThWo74+QZHR/v04JQjJVnnenORgaGpKNmqm6uStBTgWV0osJWRZRhCxqDUkeAZw5ziJfp3Ahy9l1zk9E/JHWpZKFhHl3mgMtO/11Iw5XV1cT5JQiFafr8mTdRwPZ7Bzf87nImJBlEdK2JO46t2//p3o0V2mU1lWKbN6ylUw5QkbZaY7/q87Ozpw/OVIkyKmgXFE6O7NPPXHlwR9e3LTx9vT0rEdMTNxd8cZNTpGefeba4MCC70RhQpZFnNtWFKUJVhqx2mnO2fjwQ5379w35ysvGT/YG8+T28xPd3Qv+tSImZFmYkKUxveg7zTEdvdiRzRkAQ2wEhHx75a18CVHUHzNbmsfxlso6+8+1fUT8akR0KgomZFnQMJq3QFOpxWSRhVxkxsdn/roi86MHO/1JabiNAqlyZqqIV183IP0wjcTZl17slbfkkTPHUuq4YXZeTMiy6M300byp9H7Ddjro759+7jfXcc85GcVGgVpUm3MBySmNfhw1KiqCh9ioiAsqPy8mZFkMDo/SvOHZH780YsitzJ3f/rpHTr7+pxuy8cePXDrYNBxlfoNUj/2kS8Mgea5VkmnOQ01xJaSrQ/LntOEkQMg4TwtnZu5evZ7J9M16mdSIJ85Jpeg2CqadJNxzdrmhTzNVigjJKWfmveuKIwFCxnxaODo+QfPGxtP5ZUwpwzkZxUY027E9eHuQBj056eafZHLybq1IJvqo6JMAIeM/LcTJ65m+qSlbSSYAnHz1D70Rx0a8ciOqZJOZivhCMjy6Oa3glLuWs0F0PhIgZCKmhTRyaGR0bHwirV8kaiwOCRASbFpoLBGSISTYtNBYCiRGSLBpoZF6kiSkYaQeE9IwYoQJaRgxwoQ0jBhhQhpGjDAhDSNGmJCGESNMSMOIESakYcQIE9IwYoQJaRgxwoQ0jBhhQhpGbPjmm/8BH4TZzT5qDgsAAAAASUVORK5CYII="},28453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>l});var t=i(96540);const s={},o=t.createContext(s);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);
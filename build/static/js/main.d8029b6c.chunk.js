(this["webpackJsonpbird-report"]=this["webpackJsonpbird-report"]||[]).push([[0],{170:function(e,t){},215:function(e,t,n){e.exports=n(412)},221:function(e,t,n){},222:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},223:function(e,t,n){},410:function(e,t){},411:function(e,t){},412:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),i=n(31),o=n.n(i),c=(n(220),n(221),n(16)),l=n(15),u=n(56),s=n(10),d=(n(222),n(223),n(419)),m=n(417);var b=a.a.createContext(),f=n(420),g=n(11),p=n(224),E=p.standardDeviation,v=p.mean,h=function(e){return function(t,n){return t[e]===n[e]?0:t[e]>n[e]?1:-1}},y=function(e){var t=h(e);return function(e,n){return-1*t(e,n)}},O=h("date"),x=function(){return-1*O.apply(void 0,arguments)},j=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return e.filter((function(e){var t=e.date;return n.includes(new Date(t).getMonth()+1)}))},w=function(e,t){var n=e.reduce((function(e,n){var r=t(n);return e[r]=e[r]||[],e[r].push(n),e}),{});return Object.values(n)},S=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n.tolerance,a=void 0===r?2:r,i=n.minResults,o=void 0===i?1:i,c=n.highLow,l=void 0===c?"high":c;if(!e.length)return[];var u=e.map((function(e){return e[t]})),s=v(u),d=E(u),m="high"===l?function(e){return e>=s+a*d}:function(e){return e<=s-a*d},b="high"===l?y("numberIndex"):h("numberIndex");return e.filter((function(e,n){return m(e[t])||n<o})).sort(b)},I=function(e){return e=Object(l.a)(e).sort(O),Object(g.a)(Object(g.a)({},e[0]),{},{records:e.slice(0,5)})},M=function(e){return e=Object(l.a)(e).sort(x),Object(g.a)(Object(g.a)({},e[0]),{},{records:e.slice(0,5)})},C=function(e){return e=Object(l.a)(e).sort(O),{"Upper bound":Math.round(e.reduce((function(e,t){return e+t.numberIndex}),0)),"Lower bound":Math.round(w(e,(function(e){return e.location})).map((function(e){return Math.max.apply(Math,Object(l.a)(e.map((function(e){return e.numberIndex}))))})).reduce((function(e,t){return e+t}),0)),"Assuming each bird stays 2 days":Math.round(w(e,(function(e){return e.location})).flatMap((function(e){return e.map((function(t,n){return n%2===1?Object(g.a)(Object(g.a)({},t),{},{numberIndex:Math.max(0,t.numberIndex-e[n-1].numberIndex)}):t}))})).reduce((function(e,t){return e+t.numberIndex}),0)),"Assuming each bird stays 3 days":Math.round(w(e,(function(e){return e.location})).flatMap((function(e){return e.map((function(t,n){return n%3===1?Object(g.a)(Object(g.a)({},t),{},{numberIndex:Math.max(0,t.numberIndex-e[n-1].numberIndex)}):n%3===2?Object(g.a)(Object(g.a)({},t),{},{numberIndex:Math.max(0,t.numberIndex-Math.max(e[n-1].numberIndex,e[n-2].numberIndex))}):t}))})).reduce((function(e,t){return e+t.numberIndex}),0))}},A=n(422),L=n(415),D=n(416),N=n(76);function K(e){var t=e.date,n=e.dates,r=void 0===n?[t]:n,i=e.location,o=void 0===i?null:i,c=e.locations,l=void 0===c?[o]:c,u=e.numberIndex,s=e.records,d=e.viewMoreHeading,m=e.notes,b=e.observer;e.viceCounty;if(s&&1===s.length)return a.a.createElement(K,s[0]);var f=!!s;return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{style:{display:"flex"}},a.a.createElement("b",{style:{paddingRight:"5px"}},u,":"),a.a.createElement("div",null,r.map((function(e,t){return a.a.createElement("div",null,l[t]?"".concat(l[t],", "):null,e.toDateString(),f?null:a.a.createElement("span",null,m?", ".concat(m):null,b?", ".concat(b):null))})))),f?a.a.createElement(P,{records:s,heading:d}):null)}function P(e){var t=e.initialState,n=void 0!==t&&t,i=e.records,o=e.heading,l=void 0===o?"View nested records":o,u=Object(r.useState)(n),s=Object(c.a)(u,2),d=s[0],m=s[1];return a.a.createElement(a.a.Fragment,null,!1===n?a.a.createElement(L.a,{onClick:function(){return m(!d)},"aria-controls":"example-collapse-text","aria-expanded":d},l):null,d?a.a.createElement(N.a,{in:d},a.a.createElement("ul",null,i.map((function(e){return a.a.createElement("li",null,a.a.createElement(K,e))})))):null)}var F=function(e){return function(t){return(t=w(t,(function(e){return e.date.toISOString()})).map((function(t){return{records:t,date:t[0].date,numberIndex:e(t)}})).sort(y("numberIndex"))).length?function(e){var t=(e=Object(l.a)(e).sort(y("numberIndex")))[0].numberIndex,n=e.filter((function(e){return e.numberIndex===t}));return Object(g.a)(Object(g.a)(Object(g.a)({},e[0]),n.length>1?{dates:n.map((function(e){return e.date})),locations:n.map((function(e){return e.location}))}:{}),{},{records:S(e,"numberIndex")})}(t):{numberIndex:0,records:[]}}},H=function(e){var t=e.heading,n=e.body;return a.a.createElement(A.a,null,a.a.createElement(A.a.Header,null,t),n?a.a.createElement(A.a.Body,null,n):null)},J=function(e){var t=e.heading,n=e.body,r=e.eventKey;return n?a.a.createElement(A.a,null,a.a.createElement(A.a.Header,null,a.a.createElement(f.a.Toggle,{as:L.a,variant:"link",eventKey:r},t)),a.a.createElement(f.a.Collapse,{eventKey:r},a.a.createElement(A.a.Body,null,n))):a.a.createElement(H,{heading:t})},k=function(e){var t=e.heading,n=e.content;return a.a.createElement("tr",null,a.a.createElement("th",{style:{minWidth:"100px"}},t),a.a.createElement("td",null,n))},B=function(e){var t=e.allowEmpty,n=void 0!==t&&t,r=e.heading,i=e.records,o=e.isAccordion,c=void 0!==o&&o,u=e.index,s=e.preContent,d=void 0===s?[]:s,m=e.postContent,b=void 0===m?[]:m;if(!i.length)return n?a.a.createElement(H,{heading:r,body:null}):null;var f=F((function(e){return e.reduce((function(e,t){return e+t.numberIndex}),0)}))(i),g=function(e){var t=new Set;return e.forEach((function(e){var n=e.location;return t.add(n)})),Object(l.a)(t).length}(i),p=S(i,"numberIndex"),E=a.a.createElement(a.a.Fragment,null,a.a.createElement(D.a,null,a.a.createElement("tbody",null,d.map((function(e){return a.a.createElement(k,e)})),a.a.createElement(k,{heading:"Number of sites",content:g}),g>1?a.a.createElement(k,{heading:"Max citywide sites in day",content:a.a.createElement(K,F((function(e){return e.length}))(i))}):null,f.numberIndex>1?a.a.createElement(k,{heading:"Max citywide day count",content:a.a.createElement(K,f)}):null,p[0].numberIndex>1?a.a.createElement(k,{heading:"High single site counts",content:a.a.createElement(a.a.Fragment,null,a.a.createElement(K,p[0]),a.a.createElement(P,{records:p.slice(1),heading:"View other high counts"}))}):null,b.map((function(e){return a.a.createElement(k,e)})))),a.a.createElement(P,{records:i,heading:"View all records"})),v=c?J:H;return a.a.createElement(v,{heading:r,body:E,eventKey:"".concat(u)})},V=[null,"January","February","March","April","May","June","July","August","September","October","November","December"];function Y(e){var t=e.heading,n=e.preContent,r=e.postContent,i=e.months,o=e.records;return a.a.createElement("section",null,a.a.createElement("h2",null,t," ","(",function(e){return"".concat(V[e[0]]," to ").concat(V[e[e.length-1]])}(i),")"),a.a.createElement(f.a,{defaultActiveKey:"0"},a.a.createElement(B,{isAccordion:!0,index:0,heading:"Summary",records:j.apply(void 0,[o].concat(Object(l.a)(i))),preContent:n,postContent:r})))}var T=function(e){var t=e.records,n=e.distribution.breeding<3<3?[1,2,3]:[1,2];return t=j.apply(void 0,[t].concat(n)),a.a.createElement(Y,{heading:"First winter",months:n,records:t})},G=function(e){var t=e.records;e.distribution;return t=j(t,11,12),a.a.createElement(Y,{heading:"Second winter",months:[11,12],records:t})},R=function(e){var t=e.records;if(e.distribution.winter)return null;var n=I(t);return{heading:"Earliest",content:a.a.createElement(K,Object.assign({},n,{viewMoreHeading:"View other early records"}))}},W=function(e){var t=e.records,n=e.distribution,r=e.breedingSites;if(n.breeding>2)return null;var i=M(t.filter((function(e){var t=e.location;return!r.includes(t)})));return{heading:n.breeding?"Latest non breeding":"Latest",content:a.a.createElement(K,Object.assign({},i,{viewMoreHeading:"View other late records"}))}},U=function(e){var t=e.records,n=e.distribution;return n.breeding>2||n.winter>2?null:{heading:"Estimated total throughput",content:a.a.createElement("ul",null,Object.entries(C(t)).map((function(e){var t=Object(c.a)(e,2),n=t[0],r=t[1];return a.a.createElement("li",null,a.a.createElement("breeding",null,n),":"," ",r)})))}},_=function(e){var t=e.records,n=e.distribution,r=e.breedingSites;r=r.map((function(e){return e.location}));var i=[4,5];return n.breeding||i.push(6),n.winter||i.unshift(2,3),t=j.apply(void 0,[t].concat(i)),a.a.createElement(Y,{heading:"Spring passage",months:i,records:t,preContent:[R({records:t,distribution:n})],postContent:[U({records:t,distribution:n}),W({records:t,distribution:n,breedingSites:r})]})};function $(e){e.records,e.distribution;var t=e.breedingSites;return a.a.createElement(f.a,{defaultActiveKey:"0"},t.map((function(e,t){var n=e.records,r=e.location;return a.a.createElement(A.a,null,a.a.createElement(A.a.Header,null,a.a.createElement(f.a.Toggle,{as:L.a,variant:"link",eventKey:"breeding-".concat(t)},r)),a.a.createElement(f.a.Collapse,{eventKey:"breeding-".concat(t)},a.a.createElement(A.a.Body,null,a.a.createElement(P,{records:n,initialState:!0}))))})))}var q=n(42),z=n(25),Q=n.n(z);function X(e){var t=e.records,n=w(t,(function(e){return e.date.toISOString()})).map((function(e){var t=w(e,(function(e){return e.location}));return{date:e[0].date,dayOfYear:Q()(e[0].date).dayOfYear(),month:Q()(e[0].date).format("MMM"),dayOfMonth:Number(Q()(e[0].date).format("D")),axisLabel:"".concat(Q()(e[0].date).format("MMM"),"-").concat(Q()(e[0].date).format("D")),locations:t.length,total:Math.round(t.map((function(e){return Math.max.apply(Math,Object(l.a)(e.map((function(e){return e.numberIndex}))))})).reduce((function(e,t){return e+t}),0))}})),r=Object(l.a)(Array(365)).map((function(e,t){var r=n.find((function(e){return e.dayOfYear===t+1}));return r||{month:Q()().dayOfYear(t+1).format("MMM"),dayOfMonth:Number(Q()().dayOfYear(t+1).format("D")),axisLabel:"".concat(Q()().dayOfYear(t+1).format("MMM"),"-").concat(Q()().dayOfYear(t+1).format("D")),locations:0,total:0}}));return a.a.createElement(q.b,{width:730,height:250,data:r,margin:{top:10,right:30,left:0,bottom:0}},a.a.createElement("defs",null,a.a.createElement("linearGradient",{id:"colorLocations",x1:"0",y1:"0",x2:"0",y2:"1"},a.a.createElement("stop",{offset:"5%",stopColor:"#8884d8",stopOpacity:.8}),a.a.createElement("stop",{offset:"95%",stopColor:"#8884d8",stopOpacity:0})),a.a.createElement("linearGradient",{id:"colorTotal",x1:"0",y1:"0",x2:"0",y2:"1"},a.a.createElement("stop",{offset:"5%",stopColor:"#82ca9d",stopOpacity:.8}),a.a.createElement("stop",{offset:"95%",stopColor:"#82ca9d",stopOpacity:0}))),a.a.createElement(q.d,{dataKey:"month",minTickGap:28,type:"category",allowDuplicatedCategory:!0}),a.a.createElement(q.e,null),a.a.createElement(q.c,null),a.a.createElement(q.a,{type:"monotone",dataKey:"locations",stroke:"#8884d8",fillOpacity:1,fill:"url(#colorLocations)"}),a.a.createElement(q.a,{type:"monotone",dataKey:"total",stroke:"#82ca9d",fillOpacity:1,fill:"url(#colorTotal)"}))}var Z=["January","February","March","April","May","June","July","August","September","October","November","December"];function ee(e){e.heading,e.preContent,e.postContent,e.months;var t=e.records;return a.a.createElement("section",null,a.a.createElement(f.a,null,Z.map((function(e,n){return a.a.createElement(B,{allowEmpty:!0,isAccordion:!0,index:n,heading:e,records:j(t,n+1)})}))))}var te=n(74),ne=n(418),re=(n(401),function(e){var t=e.value,n=(e.species,e.season),r=e.setDistribution,i=e.distribution;return a.a.createElement(ne.a.Control,{as:"select",value:t,onChange:function(e){var t=Number(e.target.value);if(isNaN(t)){var a=Object(g.a)({},i);delete a[n],r(a)}else r(Object(g.a)(Object(g.a)({},i),{},Object(te.a)({},n,t)))}},a.a.createElement("option",{value:null},"Please select"),a.a.createElement("option",{value:0},"UNKNOWN"),a.a.createElement("option",{value:1},"VAGRANT"),a.a.createElement("option",{value:2},"HIGHLY_LOCALISED"),a.a.createElement("option",{value:3},"LOCALISED"),a.a.createElement("option",{value:4},"WIDESPREAD"))}),ae=function(e){var t=e.species,n=e.distribution,r=e.setDistribution,i=n.winter,o=n.springPassage,c=n.breeding,l=n.autumnPassage;return a.a.createElement(ne.a.Group,null,a.a.createElement("h2",null,t),a.a.createElement(ne.a.Label,null,"Winter"),a.a.createElement(re,{value:i,species:t,setDistribution:r,distribution:n,season:"winter"}),a.a.createElement(ne.a.Label,null,"Spring passage"),a.a.createElement(re,{value:o,species:t,setDistribution:r,distribution:n,season:"springPassage"}),a.a.createElement(ne.a.Label,null,"Breeding"),a.a.createElement(re,{value:c,species:t,setDistribution:r,distribution:n,season:"breeding"}),a.a.createElement(ne.a.Label,null,"Autumn passage"),a.a.createElement(re,{value:l,species:t,setDistribution:r,distribution:n,season:"autumnPassage"}))},ie=function(e){var t=e.records,n=e.distribution,r=e.breedingSites;if(n.breeding>2)return null;var i=I(t.filter((function(e){var t=e.location;return!r.includes(t)})));return{heading:n.breeding?"Earliest non breeding":"Earliest",content:a.a.createElement(K,Object.assign({},i,{viewMoreHeading:"View other early records"}))}},oe=function(e){var t=e.records;if(e.distribution.winter)return null;var n=M(t);return{heading:"Latest",content:a.a.createElement(K,Object.assign({},n,{viewMoreHeading:"View other late records"}))}},ce=function(e){var t=e.records,n=e.distribution;return n.breeding>2||n.winter>2?null:{heading:"Estimated total throughput",content:a.a.createElement("ul",null,Object.entries(C(t)).map((function(e){var t=Object(c.a)(e,2),n=t[0],r=t[1];return a.a.createElement("li",null,a.a.createElement("breeding",null,n),":"," ",r)})))}},le=function(e){var t=e.records,n=e.distribution,r=e.breedingSites;r=r.map((function(e){return e.location}));var i=[7,8,9,10];return n.breeding<3&&i.unshift(6),!n.winter<2&&i.push(11,12),t=j.apply(void 0,[t].concat(i)),a.a.createElement(Y,{heading:"Autumn passage",months:i,records:t,preContent:[ie({records:t,distribution:n,breedingSites:r})],postContent:[ce({records:t,distribution:n}),oe({records:t,distribution:n})]})},ue=function(e){var t=e.bird,n=function(e,t){var n=Object(r.useState)((function(){try{var n=window.localStorage.getItem(e);return n?JSON.parse(n):t}catch(r){return console.log(r),t}})),a=Object(c.a)(n,2),i=a[0],o=a[1];return[i,function(t){try{var n=t instanceof Function?t(i):t;o(n),window.localStorage.setItem(e,JSON.stringify(n))}catch(r){console.log(r)}}]}(t,{}),i=Object(c.a)(n,2),o=i[0],u=i[1],s=Object(r.useContext)(b),f=function(e){return w(e,(function(e){var t=e.date;return e.location+t.toISOString()})).map((function(e){return e=Object(l.a)(e).sort(y("numberIndex")),Object(g.a)(Object(g.a)({},e[0]),e.length>1?{records:e}:{})})).sort(h("date"))}(Object(c.a)(s,1)[0].records.filter((function(e){return e.species===t}))),p=function(e,t){if(!(t.breeding&&t.breeding<3))return[];return e=j.apply(void 0,[e].concat([5,6])),w(e,(function(e){return e.location})).map((function(e){return e.length>2?{records:e,location:e[0].location}:null})).filter((function(e){return!!e}))}(f,o),E={records:f,distribution:o};return a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",null,t),a.a.createElement(X,E),a.a.createElement(d.a,{defaultActiveKey:"months",id:"uncontrolled-tab-example"},a.a.createElement(m.a,{eventKey:"months",title:"Individual months"},a.a.createElement(ee,E)," "),a.a.createElement(m.a,{eventKey:"inner-london",title:"Inner London"},a.a.createElement(P,{records:f.filter((function(e){return"IL"===e.viceCounty})),initialState:!0})),a.a.createElement(m.a,{eventKey:"winter",title:"Winter",disabled:!o.winter},o.winter?a.a.createElement(a.a.Fragment,null,a.a.createElement(T,E),a.a.createElement(G,E)):null),a.a.createElement(m.a,{eventKey:"spring",title:"Spring passage",disabled:!o.springPassage},o.springPassage?a.a.createElement(_,Object.assign({},E,{breedingSites:p})):null),a.a.createElement(m.a,{eventKey:"breeding",title:"Breeding",disabled:!o.breeding},o.breeding?a.a.createElement($,Object.assign({},E,{breedingSites:p})):null),a.a.createElement(m.a,{eventKey:"autumn",title:"Autumn passage",disabled:!o.autumnPassage},o.autumnPassage?a.a.createElement(le,Object.assign({},E,{breedingSites:p})):null),a.a.createElement(m.a,{eventKey:"settings",title:"Settings"},a.a.createElement(ae,{species:t,distribution:o,setDistribution:u}))))},se=function(){var e=Object(s.f)().bird;return a.a.createElement(ue,{bird:e})},de=n(421),me=n(118),be=n.n(me),fe=function(e){return Object(l.a)(e.reduce((function(e,t){var n=t.species;return e.add(n)}),new Set))},ge=function(){var e=Object(r.useState)({speciesList:[],records:[]}),t=Object(c.a)(e,2),n=t[0],i=t[1];return a.a.createElement(b.Provider,{value:[n,i]},a.a.createElement(u.a,null," ",a.a.createElement(de.a,{bg:"light",expand:"lg"},a.a.createElement(u.b,{to:"/"},"Bird report tool")),a.a.createElement("label",null,"Load spreadsheet"),a.a.createElement("input",{type:"file",name:"load-spreadsheet",onChange:function(e){var t=new FileReader;t.addEventListener("load",(function(e){var n=function(e){var t=be.a.read(e,{cellDates:!0,type:"array"});return be.a.utils.sheet_to_json(t.Sheets[t.SheetNames[0]]).map((function(e){return{species:e.SPECIES,location:e.Location,date:e["Date:D"],number:e.Number,numberIndex:e.NumberIndex,notes:e.Notes,recordingArea:e.RecordingArea,viceCounty:e.ViceCounty||e.Sector,observer:e.Observer,source:e.Source}}))}(new Uint8Array(t.result));i({speciesList:fe(n),records:n})})),t.readAsArrayBuffer(e.currentTarget.files[0])}}),a.a.createElement("div",{className:"container"},a.a.createElement("nav",{className:"nav"},n.speciesList.map((function(e){return a.a.createElement(u.b,{className:"nav-link active",to:"/bird/".concat(e)},e)}))),a.a.createElement(s.c,null,a.a.createElement(s.a,{path:"/bird/:bird"},a.a.createElement(se,null)),a.a.createElement(s.a,{path:"/"})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(ge,null)),document.getElementById("root"))}},[[215,1,2]]]);
//# sourceMappingURL=main.d8029b6c.chunk.js.map
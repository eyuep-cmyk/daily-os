const fs=require('fs');const html=fs.readFileSync('index.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const store={};
global.localStorage={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>store[k]=String(v),removeItem:k=>delete store[k]};
function fakeEl(){return new Proxy(function(){},{get(t,p){if(p==='style')return{};if(p==='classList')return{add(){},remove(){},toggle(){}};if(p==='dataset')return{};if(p==='value')return'';if(p==='appendChild'||p==='querySelector')return()=>fakeEl();if(p==='querySelectorAll')return()=>[];if(p==='click')return()=>{};if(p==='remove')return()=>{};return fakeEl();},set(){return true;},apply(){return fakeEl();}});}
global.document={getElementById:()=>fakeEl(),querySelector:()=>fakeEl(),querySelectorAll:()=>[],createElement:()=>fakeEl(),addEventListener:()=>{},body:fakeEl()};
global.window={};global.navigator={};global.setInterval=()=>0;global.clearInterval=()=>{};global.setTimeout=(fn)=>0;
let captured=null;
global.Blob=function(parts){this.parts=parts;captured=parts[0];};
global.URL={createObjectURL:()=>"blob:x",revokeObjectURL:()=>{}};
const test=`
// seed some data across keys
save("wkSets",4); save("wkMode","band"); save("wkWeight",[{kg:72,ts:1,date:"x"}]);
save("wkWins",{"Mo":["win1"]}); save("wkProgress",{a_brust:{levelIdx:1,targetReps:9}});
save("wkSkills",{pullup:true}); save("wkStartDate","2026-06-03T00:00:00.000Z");
exportData();
const out=JSON.parse(globalThis.__cap);
`;
// inject capture bridge
const bridge="globalThis.__cap=null;const _Blob=global.Blob;global.Blob=function(p){globalThis.__cap=p[0];};";
(0,eval)(bridge+script+`
save("wkSets",4); save("wkMode","band"); save("wkWeight",[{kg:72,ts:1,date:"x"}]);
save("wkWins",{"Mo":["win1"]}); save("wkProgress",{a_brust:{levelIdx:1,targetReps:9}});
save("wkSkills",{pullup:true}); save("wkStartDate","2026-06-03");
exportData();
const out=JSON.parse(globalThis.__cap);
console.log("export _app   :", out._app, "_v", out._v);
console.log("export keys   :", Object.keys(out).filter(k=>!k.startsWith("_")).sort().join(","));
console.log("roundtrip vals:", out.wkSets===4, out.wkMode==="band", out.wkProgress.a_brust.targetReps===9, out.wkSkills.pullup===true);
// simulate import: wipe + restore
Object.keys(store2=arguments).length;
`.replace("store2=arguments","_unused"));
fs.unlinkSync('_t.js');

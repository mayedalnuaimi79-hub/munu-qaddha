// Minimal DOM harness for script behavior only; not a layout or browser emulator.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
module.exports=function createHarness(initial={}){
 const html=fs.readFileSync(path.resolve(__dirname,'../dist/index.html'),'utf8');
 const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
 const saved={...initial},elements={},callbacks=new Map();let now=0,next=1;
 function element(s){return elements[s]??={innerHTML:'',textContent:'',value:'',type:'password',disabled:false,
   classList:{add(){},remove(){},toggle(){}},handlers:{},
   addEventListener(e,f){const prev=this.handlers[e];this.handlers[e]=event=>{if(prev)prev(event);f(event)}},
   setAttribute(k,v){this[k]=v},showModal(){this.open=true},close(){this.open=false}}}
 const doc={querySelector:element,hidden:false,addEventListener(e,f){this[e]=f}};
 class Clock extends Date{constructor(...args){super(...(args.length?args:[now]))}static now(){return now}}
 const ctx=vm.createContext({document:doc,window:{scrollTo(){}},Date:Clock,structuredClone,console,
   localStorage:{setItem(k,v){saved[k]=v},getItem(k){return saved[k]??null}},
   setInterval(f){const id=next++;callbacks.set(id,f);return id},clearInterval(i){callbacks.delete(i)},setTimeout(){},confirm(){return true}});
 vm.runInContext(script,ctx);
 return {html,saved,element,doc,callbacks,run:s=>vm.runInContext(s,ctx),
   advance(ms){now+=ms;for(const f of callbacks.values())f()},
   click(action,auth=false){const selector=auth?'[data-auth-action]':'[data-act]';element('#app').handlers.click({target:{closest:s=>s===selector?({dataset:auth?{authAction:action}:{act:action},disabled:false}):null}})},
   input(team,value){element('#app').handlers.input({target:{dataset:{team:String(team)},value}})},
   authInput(key,value){element('#app').handlers.input({target:{dataset:{auth:key},value}})},
   consent(checked){element('#app').handlers.change({target:{id:'auth-consent',checked}})},
 };
};

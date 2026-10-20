// Persistent dealt-question history. Text-based keys survive bank reordering.
const SEEN_KEY='munu-dealt-questions-v1';
const questionKey=(category,text)=>category+'|'+text.normalize('NFKC').replace(/[\u064B-\u065F\u0670\u0640]/g,'').replace(/\s+/g,' ').trim();
function readSeen(){
 const raw=localStorage.getItem(SEEN_KEY);
 if(raw===null){
  const old=stored();
  const keys=old?old.deck.map(q=>questionKey(q.category,q.text)):[];
  const data={version:1,keys:[...new Set(keys)]};
  localStorage.setItem(SEEN_KEY,JSON.stringify(data));
  return new Set(data.keys);
 }
 const data=JSON.parse(raw);
 if(data?.version!==1||!Array.isArray(data.keys)||!data.keys.every(k=>typeof k==='string'))throw new Error('Invalid question history');
 return new Set(data.keys);
}
function writeSeen(seen){localStorage.setItem(SEEN_KEY,JSON.stringify({version:1,keys:[...seen]}))}
function shuffled(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function availableQuestions(c,seen){return c.questions.map((q,i)=>({id:c.id+'-'+i,category:c.id,points:q[0],text:q[1],answer:q[2],hint:q[3],...(c.images?.[i]?{image:c.images[i]}:{}),...(c.audio?.[i]?{audio:c.audio[i]}:{})})).filter(q=>!seen.has(questionKey(c.id,q.text)))}
function remainingText(c,seen){
 if(!seen)return '<span class="freshness-unavailable">تعذر قراءة سجل الأسئلة</span>';
 const a=availableQuestions(c,seen),total=c.questions.length;
 const rounds=Math.min(...[200,400,600].map(p=>Math.floor(a.filter(q=>q.points===p).length/((draft.perCategory||6)/3))));
 const used=total-a.length;
 const percent=total?(used===total?100:Math.min(99,Math.round(used/total*100))):0;
 const status=rounds===0?'empty':rounds===1?'low':'ready';
 const roundText=rounds===0?(a.length?'المتبقي لا يكفي جولة بهذا النمط':'خلصت الأسئلة الجديدة'):rounds===1?'باقي جولة بدون تكرار':rounds===2?'باقي جولتين بدون تكرار':`باقي ${rounds} جولات بدون تكرار`;
 return `<span class="freshness ${status}"><span class="freshness-heading"><span>نسبة الاستخدام</span><b>${percent}٪</b></span><span class="freshness-track" role="meter" aria-label="الأسئلة المستخدمة في ${esc(c.name)}" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${used}" aria-valuetext="استخدمت ${used} من ${total} سؤال"><span style="width:${percent}%"></span></span><span class="freshness-count">استخدمت ${used} من ${total} · باقي ${a.length}</span><span class="freshness-rounds">${roundText}</span></span>`;
}
function showExhausted(ids){
 const names=ids.map(id=>BANK.find(c=>c.id===id).name).join('، ');
 $('#dialog-content').innerHTML=`<h2>خلصت الأسئلة الجديدة لهالجولة</h2><p>ما بقي عدد كاف من أسئلة كل مستوى في: <strong>${esc(names)}</strong>.</p><p>اختاروا فئات ثانية، أو أعيدوا أسئلة هالفئات بموافقتكم. ما بدأنا جولة ولا غيرنا الجولة المحفوظة.</p><div class="row">${button('اختيار فئات ثانية','freshcategories','primary')}${button('السماح بإعادة هالفئات','recycle:'+ids.join(','),'quiet')}</div><p class="help">تقدرون أيضا تجربون الجولة السريعة إذا بقي سؤال جديد من كل مستوى.</p>`;
 $('#dialog').showModal();
}
function start(){
 draft.cats=draft.cats.filter(id=>BANK.some(c=>c.id===id));
 if(draft.cats.length!==6){go('categories');toast('اختر 6 فئات متاحة لبدء الجولة الجديدة.');return}
 let seen;try{seen=readSeen()}catch{toast('تعذر حفظ سجل الأسئلة. اسمح بالتخزين في المتصفح حتى نمنع التكرار.');return}
 const deck=[],exhausted=[],perCategory=draft.perCategory||6,each=perCategory/3;
 for(const id of draft.cats){const c=BANK.find(x=>x.id===id),pool=availableQuestions(c,seen);if([200,400,600].some(p=>pool.filter(q=>q.points===p).length<each)){exhausted.push(id);continue}for(const points of [200,400,600])deck.push(...shuffled(pool.filter(q=>q.points===points)).slice(0,each))}
 if(exhausted.length){showExhausted(exhausted);return}
 // Reserve the complete deck before opening it. Abandoned rounds cannot repeat.
 for(const q of deck)seen.add(questionKey(q.category,q.text));
 try{writeSeen(seen)}catch{toast('تعذر حفظ سجل الأسئلة؛ لم تبدأ الجولة حتى لا تتكرر أسئلتك.');return}
 game={version:1,teams:draft.teams.map(name=>({name:name.trim(),score:0,correct:0,help:{hint:false,extra:false,double:false}})),cats:[...draft.cats],seconds:draft.seconds,penalty:draft.penalty,perCategory,turn:0,used:[],history:[],active:null,deck};
 save();go('board');
}
$('#dialog-content').addEventListener('click',e=>{
 const b=e.target.closest('[data-act]');if(!b||b.disabled)return;
 const [action,arg]=b.dataset.act.split(':');
 if(action==='freshcategories'){$('#dialog').close();go('categories')}
 if(action==='recycle'){
  const ids=arg.split(',').filter(id=>draft.cats.includes(id));
  if(!ids.length)return;
  try{const seen=readSeen();for(const key of seen)if(ids.some(id=>key.startsWith(id+'|')))seen.delete(key);writeSeen(seen)}catch{toast('تعذر حفظ سجل الأسئلة.');return}
  $('#dialog').close();start();
 }
});

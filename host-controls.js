// Corrections share the scored-question undo history.
function hostSnapshot(){game.history.push({teams:structuredClone(game.teams),turn:game.turn,used:[...game.used],active:game.active?structuredClone(game.active):null})}
function hostControls(){return `<details class="panel" style="margin-top:20px"><summary style="cursor:pointer;font-weight:bold">إدارة الجولة · تعديل النقاط وتبديل الدور</summary><p class="help">اكتب المجموع الجديد للفريق ثم اضغط حفظ. تقدر تتراجع عن التعديل من زر التراجع.</p>${game.teams.map((t,i)=>`<div class="row" style="margin:12px 0"><label style="flex:1;min-width:150px">${esc(t.name)} <input id="host-score-${i}" aria-label="مجموع نقاط ${esc(t.name)}" type="number" step="1" min="-1000000" max="1000000" value="${t.score}" style="width:130px"></label>${button('حفظ النقاط','hostscore:'+i,'tiny')}${view!=='results'?button(i===game.turn?'عليه الدور':'اجعل الدور له','hostturn:'+i,'tiny',!!game.active||i===game.turn):''}</div>`).join('')}${game.active?'<p class="help">تبديل الدور متاح من لوحة الأسئلة بعد إنهاء السؤال الحالي، للحفاظ على المساعدات والنقاط.</p>':''}${button('تراجع عن آخر تعديل أو نتيجة','undo','tiny',!game.history.length)}</details>`}
const renderWithoutHost=render;
render=function(){renderWithoutHost();if(game&&['board','question','results'].includes(view))$('#app').innerHTML+=hostControls()};
$('#app').addEventListener('click',e=>{
 const b=e.target.closest('[data-act]');if(!b||b.disabled||!game||!['board','question','results'].includes(view))return;
 const [a,raw]=b.dataset.act.split(':');if(!['hostscore','hostturn'].includes(a))return;
 const i=Number(raw);if(!Number.isInteger(i)||!game.teams[i])return;
 if(a==='hostscore'){
  const value=$('#host-score-'+i).value.trim(),n=Number(value);
  if(!value||!Number.isInteger(n)||Math.abs(n)>1000000){toast('اكتب عددا صحيحا بين -1000000 و1000000');return}
  if(n===game.teams[i].score)return;
  hostSnapshot();game.teams[i].score=n;
 }else{
  if(game.active||view!=='board'||i===game.turn)return;
  hostSnapshot();game.turn=i;
 }
 save();render();toast(a==='hostscore'?'تم تعديل النقاط':'تم تبديل الدور');
});

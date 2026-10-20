function questionHistoryExport(){
 const seen=readSeen();
 return {format:'munu-question-history',version:1,exportedAt:new Date().toISOString(),seenKeys:[...seen],categories:BANK.map(c=>({id:c.id,name:c.name,total:c.questions.length,used:c.questions.map((q,i)=>seen.has(questionKey(c.id,q[1]))?i:null).filter(i=>i!==null)}))};
}
async function exportQuestionHistory(){
 try{
  const payload=JSON.stringify(questionHistoryExport(),null,2);
  const file=new File([payload],'Munu-Question-History.json',{type:'application/json'});
  if(navigator.canShare&&navigator.canShare({files:[file]})){
   try{await navigator.share({files:[file],title:'سجل أسئلة منو قدها؟'});return}catch(e){if(e.name==='AbortError')return}
  }
  const url=URL.createObjectURL(file),a=document.createElement('a');a.href=url;a.download=file.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
  toast('احفظ ملف السجل وأرسله في المحادثة.');
 }catch{toast('تعذر تصدير السجل. افتح اللعبة من نفس المتصفح اللي تلعب فيه وحاول مرة ثانية.')}
}
$('#app').addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(b&&!b.disabled&&b.dataset.act==='exporthistory')exportQuestionHistory()});

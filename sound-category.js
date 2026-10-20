/* Original sound-guessing clips, fetched only when a player presses play. */
function soundQuestionMedia(q){
 if(!q.audio||!/^\/sounds\/fx-\d{2}\.wav$/.test(q.audio))return '';
 return `<div class="sound-question"><div class="sound-symbol" aria-hidden="true">♫</div><h3>ركزوا… وش هالصوت؟</h3><audio id="sound-clip" controls preload="none" playsinline aria-label="تشغيل مقطع السؤال الصوتي" src="${esc(q.audio)}"></audio><p class="help">شغلوا المقطع وخمنوا مصدره. تقدرون تعيدونه أكثر من مرة.</p><p id="sound-error" class="hidden" role="status">تعذر تشغيل الصوت. تأكد من الاتصال وأعد المحاولة.</p></div>`;
}
function stopQuestionSound(){const el=$('#sound-clip');if(el&&typeof el.pause==='function')el.pause()}
// Media errors do not bubble; capture lets us show an actionable message.
document.addEventListener('error',e=>{if(e.target?.id==='sound-clip')$('#sound-error')?.classList.remove('hidden')},true);

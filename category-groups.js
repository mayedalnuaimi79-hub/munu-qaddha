const CATEGORY_GROUPS=[
 {id:'football',name:'كرة القدم',icon:'⚽',cats:['football']},
 {id:'sound',name:'أصوات',icon:'🎧',cats:['sounds']},
 {id:'thinking',name:'تفكير',icon:'🧠',cats:['riddles','general']},
 {id:'countries',name:'دول',icon:'🌍',cats:['capitals','geography','guess_country','landmarks','maps','world']},
 {id:'emirates',name:'الإمارات',icon:'🇦🇪',cats:['uae','rak','abudhabi']},
 {id:'spacetoon',name:'سبيستون',icon:'🪐',cats:['spacetoon','spacetoon_songs','golden_eagle','adnan_lina']},
 {id:'games',name:'ألعاب فيديو',icon:'🎮',cats:['videogames','ark']},
 {id:'cars',name:'سيارات',icon:'🚗',cats:['cars']},
 {id:'knowledge',name:'علوم وثقافة',icon:'📚',cats:['science','animals','history','islamic']}
];
let activeCategoryGroup=null;
function categoryCard(c,seen){return `<button data-act="cat:${c.id}" class="cat ${draft.cats.includes(c.id)?'selected':''}" aria-pressed="${draft.cats.includes(c.id)}"><span class="check">${draft.cats.includes(c.id)?'✓':''}</span><div class="art" style="--tint:${c.color}"><img src="${c.art||'/art/'+c.id+'.svg'}" alt="" loading="lazy" width="350" height="280"></div><div class="info"><strong>${c.name}</strong>${remainingText(c,seen)}<small>200 / 400 / 600 نقطة</small></div></button>`}
function groupedCategoriesScreen(){
 draft.cats=draft.cats.filter(id=>BANK.some(c=>c.id===id));
 let seen;try{seen=readSeen()}catch{seen=null}
 const selected=draft.cats.map(id=>BANK.find(c=>c.id===id)).filter(Boolean);
 return `${steps(1)}<div class="row between"><div><div class="eyebrow">كل جمعة ولها جوّ</div><h1>اختاروا فئاتكم.</h1><p class="muted">انزلوا تحت وتصفحوا القوائم. اختاروا 6 فئات من أي قائمة تعجبكم.</p></div><span class="pill" id="selected-count">${selected.length} / 6 فئات</span></div>
 <div class="row" style="margin:10px 0">${button('تصدير سجل الأسئلة','exporthistory','quiet tiny')}<span class="help">أرسل الملف لتحديث الأسئلة اللي ما لعبتها.</span></div>
 <section class="selection-tray" aria-label="الفئات المختارة"><div class="row between"><strong>اختياراتكم · ${selected.length} من 6</strong>${button('ابدأ التحدي ✦','start','primary tiny',selected.length!==6)}</div><div class="selection-chips">${selected.length?selected.map(c=>`<button class="selected-chip" data-act="cat:${c.id}" aria-label="إلغاء اختيار ${esc(c.name)}">${c.icon} ${esc(c.name)} <span aria-hidden="true">×</span></button>`).join(''):'<span class="help">اختاروا أول فئة من القوائم تحت.</span>'}</div></section>
 <div class="category-sections">${CATEGORY_GROUPS.map(g=>`<section class="category-section" aria-labelledby="group-${g.id}"><div class="group-heading row between"><h2 id="group-${g.id}">${g.icon} ${g.name}</h2><span class="pill">${g.cats.filter(id=>draft.cats.includes(id)).length} / ${g.cats.length} مختارة</span></div><div class="categories">${g.cats.map(id=>categoryCard(BANK.find(c=>c.id===id),seen)).join('')}</div></section>`).join('')}</div>
 <details class="category-help"><summary>عن الأسئلة ونسبة الاستخدام</summary><p class="help">نسحب ${draft.perCategory||6} أسئلة جديدة من كل فئة. نسبة الاستخدام تبدأ من 0٪ وتزيد مع حجز أسئلة الجولة. السجل محفوظ في نفس المتصفح؛ مسح بيانات الموقع يبدأ سجلا جديدا.</p></details>
 <div class="footerbar"><span class="muted">${draft.teams.length} فرق · ${(draft.perCategory||6)*6} سؤالا</span>${button('تعديل الفرق','teams','quiet')}</div>`;
}
$('#app').addEventListener('click',e=>{
 const b=e.target.closest('[data-act]');if(!b||b.disabled)return;
 const [action,arg]=b.dataset.act.split(':');
 if(action==='categorygroup'&&CATEGORY_GROUPS.some(g=>g.id===arg)){activeCategoryGroup=arg;go('categories')}
 if(action==='categorygroups'){activeCategoryGroup=null;go('categories')}
});

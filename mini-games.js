/* Original local rules for the reference menu's challenges. No server or QR code. */
let mini=null,miniTimer=null;
const MINI_RULES={
 map:'اختار المدينة المطلوبة على الخريطة. لكل إجابة صحيحة نقطة.',lie:'اقرأ العبارات الثلاث واكتشف العبارة غير الصحيحة.',missing:'حدد الشكل الناقص من النمط.',yesno:'قرر إذا كانت العبارة صحيحة أو غلط.',memory:'اكشف البطاقات وطابق كل زوج. تنتهي الجولة تلقائيا عند اكتمال الأزواج.',find:'دور على الرمز المختلف واضغط عليه.',nodots:'اكتب الكلمة الصحيحة بعد إعادة النقاط للحروف.',word:'رتب الحروف واكتب الكلمة المطلوبة.',pixels:'اكشف أجزاء الصورة تدريجيا وخمن ما فيها.', 'words-memory':'احفظ ترتيب الكلمات، ثم اضغط عليها بنفس الترتيب.',wall:'اختر مضاعفات الرقم المطلوب لتهدم الجدار.',puzzle:'بدل مكان قطعتين لترجع الصورة إلى ترتيبها الصحيح.',bomb:'مرروا الجهاز: كل لاعب يقول كلمة من الموضوع قبل انفجار القنبلة. من يمسك الجهاز عند الانفجار يخسر الجولة.',right:'اضغط إجابة العملية الصحيحة.',tap:'عند البداية اضغط أكبر عدد ممكن خلال 10 ثوان.', 'flag-color':'اختر اللون ثم اضغط أجزاء علم الإمارات لتلوينها.',hangman:'اكتشف الكلمة باختيار الحروف. عند 6 أخطاء تنتهي الجولة.',difference:'اعثر على الشكل المختلف في الشبكة.',draw:'ارسم الكلمة بدون كتابة حروف. الفريق يحاول تخمينها خلال 60 ثانية.',charades:'مثل الكلمة بدون كلام أو أصوات، والفريق يخمن خلال 60 ثانية.',popular:'تحدي جماعي: كل فريق يكتب إجابة، وتحسب نقطة لكل إجابة تكررت عند فريق آخر. لا توجد نتائج استبيان جاهزة.',clues:'اكشف الوصف تدريجيا وخمن الجواب بأقل عدد من التلميحات.',percent:'قدر نسبة المربعات الملونة. يكشف التطبيق النسبة الفعلية والفارق.',auction:'اقرأ الموضوع، ثم يزايد الفريقان بعدد الإجابات التي يقدران على ذكرها خلال 60 ثانية. صاحب أعلى مزايدة يحاول.',concept:'اشرح الكلمة باستعمال أمثلة فقط دون ذكرها أو أي كلمة مشتقة منها.',flash:'احفظ الرمز المعروض لثانية، ثم اختره من الخيارات.',blind:'اختر الكلمة ثم ارسم. الخطوط لا تظهر حتى تضغط كشف الرسم.',forehead:'خل لاعب يمسك الجهاز باتجاه فريقه دون النظر للكلمة؛ يسأل أسئلة جوابها نعم أو لا.',imitate:'قلد الصوت المطلوب بدون نطق كلمات، والفريق يخمن.',line:'ارسم الكلمة بخط واحد متصل دون رفع يدك.',bone:'حدد العظمة حسب موضعها ووصفها.',part:'حدد القطعة حسب وظيفتها.',half:'حاول إيقاف المؤشر عند منتصف المسار بالضبط.',fly:'اضغط للطيران واجمع 10 نجوم. انتبه للحواف والعوائق.',group:'لاعبان يمثلان الموقف معا بدون كلام، وبقية الفريق يخمن.',trace:'اتبع الخانات المرقمة بالترتيب من 1 إلى 9.',lights:'احفظ ترتيب الإضاءة ثم أعده. يزيد طول السلسلة عند النجاح.',cups:'راقب مكان الكرة، ثم تابع حركة الأكواب واختر الكوب الصحيح.',names:'اختاروا اسم ونبات وحيوان وبلاد تبدأ بالحرف المعروض خلال 60 ثانية.',ten:'ابدأ المؤقت ثم أوقفه عندما تحس أنه وصل 10 ثوان؛ الأرقام تختفي بعد البداية.',moving:'اجمع الحروف المعروضة لتكوين كلمة.',zoom:'الصورة تبدأ مكبرة. صغرها تدريجيا حتى تتعرف عليها.',chain:'اذكر كلمة تبدأ بآخر حرف في الكلمة السابقة. الكلمات المكررة لا تقبل.',sum:'أكمل ناتج عملية الجمع.',scramble:'رتب الحروف المبعثرة لتكوين الكلمة.'
};
function miniDescription(kind){return MINI_RULES[kind]||'تحدي جماعي على نفس الجهاز.'}
const MINI_WORDS=['برتقال','مكتبة','مفتاح','سفينة','تمساح','بوصلة','مظلة','دراجة','جبل','قمر','تفاحة','مدرسة','صقر','سحابة','نخلة','نافذة','قطار','حقيبة','حديقة','هاتف','سجادة','مروحة','سلحفاة','فراشة'];
const MINI_PROMPTS={
 charades:['رائد فضاء يمشي على القمر','حارس مرمى يصد ركلة جزاء','صياد يسحب سمكة كبيرة','طباخ يحضر العجين','متسلق يصل قمة جبل','مصور ينتظر طائرا','غواص يبحث عن اللؤلؤ','سائق يغير إطار السيارة'],
 group:['شخصان يجدفان في قارب','طبيب يفحص مريضا','مقابلة عمل','لاعبان يتنازعان على كرة','إنقاذ قطة من شجرة','نقل أريكة عبر باب ضيق','رحلة في منطاد','بائع ومشتر يساومان'],
 imitate:['قطرات ماء','محرك دراجة نارية','رياح قوية','باب يصرصر','جرس مدرسة','قطار يتحرك','قطة','نباح كلب','دقات ساعة','موج البحر','هطول المطر','صرصور الليل'],
 auction:['دول عربية','حيوانات تبيض','مدن إماراتية','أشياء تجدها في المطبخ','رياضات تستخدم كرة','علامات سيارات','عواصم في أوروبا','أنواع فواكه'],
 popular:['شيء ننساه عند السفر','أكلة في العزائم','حيوان يخاف منه الناس','مكان نروح له في الويكند','شيء في شنطة المدرسة','مشروب شتوي','هدية لعيد ميلاد','شيء يضيع في البيت'],
 bomb:['فاكهة','دولة','اسم ولد','حيوان','شيء لونه أحمر','شيء في المطبخ','رياضة','مدينة'],
 names:['ب','ت','ج','ح','د','ر','س','ش','ص','ع','ف','ق','ك','ل','م','ن']
};
const MINI_QUIZZES={
 yesno:[['الأخطبوط له 3 قلوب.',['صح','غلط'],0],['عطارد هو الكوكب الأشد حرارة.',['صح','غلط'],1],['الصوت ينتقل في الفراغ.',['صح','غلط'],1],['عدد أضلاع الشكل السداسي 6.',['صح','غلط'],0],['النعامة تستطيع الطيران.',['صح','غلط'],1],['اليابان تقع في آسيا.',['صح','غلط'],0]],
 lie:[['أي عبارة غير صحيحة؟',['القمر تابع للأرض','الشمس كوكب','المريخ كوكب'],1],['أي عبارة غير صحيحة؟',['الحوت من الثدييات','القرش من الثدييات','الدلفين من الثدييات'],1],['أي عبارة غير صحيحة؟',['الرباط عاصمة المغرب','أنقرة عاصمة تركيا','سيدني عاصمة أستراليا'],2],['أي عبارة غير صحيحة؟',['العنكبوت له 8 أرجل','الحشرات لها 6 أرجل','الأخطبوط له 6 أذرع'],2]],
 bone:[['ما العظمة المسطحة الموجودة أمام القفص الصدري؟',['القص','الترقوة','الزند'],0],['أي عظمة تقع في الجزء العلوي من الذراع؟',['العضد','الفخذ','الشظية'],0],['ما العظمة الأمامية الكبيرة في الساق؟',['القصبة','الزند','الكعبرة'],0],['ما العظمة التي تربط الكتف بأعلى الصدر؟',['الترقوة','الحوض','الرُّضفة'],0]],
 part:[['أي قطعة تحول حركة اليد إلى حركة المؤشر في الحاسوب؟',['الفأرة','السماعة','الشاحن'],0],['أي قطعة في الدراجة تنقل الحركة من الدواسات للعجلة؟',['السلسلة','الجرس','المقعد'],0],['أي جزء في المظلة تمسكه بيدك؟',['المقبض','القماش','القمة'],0],['أي جزء في المصباح يبدد الحرارة غالبا؟',['المشتت الحراري','السلك فقط','العدسة'],0]],
 nodots:[['ٮاٮ','باب'],['ٮٮٮ','بيت'],['ٮحار','بحار'],['حٮل','جبل']],
 clues:[['له أوراق، لا ينمو في التراب، يحمل كلمات.','كتاب'],['له أسنان، لا يأكل، يرتب الشعر.','مشط'],['تراه ليلا، يعكس نور الشمس، يدور حول الأرض.','القمر'],['له إبرة، يساعد الرحالة، يشير للشمال.','بوصلة']]
};
function miniSeen(){try{return JSON.parse(localStorage.getItem('munu-mini-history-v1')||'{}')}catch{return {}}}
function miniPool(kind){return MINI_QUIZZES[kind]||MINI_PROMPTS[kind]||(['draw','blind','line','forehead','concept','word','scramble','moving','hangman'].includes(kind)?MINI_WORDS:null)}
function miniStop(){clearInterval(miniTimer);miniTimer=null}
function miniPick(kind){const pool=miniPool(kind);if(!pool)return null;const seen=miniSeen(),used=seen[kind]||[],remaining=pool.map((v,i)=>i).filter(i=>!used.includes(i));if(!remaining.length)return false;const i=remaining[Math.floor(Math.random()*remaining.length)];seen[kind]=[...used,i];try{localStorage.setItem('munu-mini-history-v1',JSON.stringify(seen))}catch{toast('تعذر حفظ سجل التحدي في المتصفح.')}return pool[i]}
function miniOpen(id){miniStop();const item=REFERENCE_ITEMS.find(x=>x[0]===id);if(!item)return;mini={id,kind:item[4],title:item[1],phase:'intro',scores:[0,0],result:'',turn:0};go('mini-game')}
function miniStart(){miniStop();const m=mini;Object.assign(m,{phase:'play',result:'',done:false,started:Date.now(),reveal:false,picked:[],matched:[],errors:0,attempts:0,guesses:[],taps:0,step:0,paint:[],color:'#ed334b',drawing:false});m.prompt=miniPick(m.kind);if(m.prompt===false){m.phase='empty';render();return}
 const k=m.kind;
 if(k==='memory')m.tiles=shuffled(['🍋','🍋','🚗','🚗','🌴','🌴','⚽','⚽','🦋','🦋','🏠','🏠']);
 if(['find','difference'].includes(k)){m.odd=Math.floor(Math.random()*36);m.tiles=Array.from({length:36},(_,i)=>i===m.odd?'🔓':'🔒')}
 if(k==='puzzle'){m.tiles=shuffled([0,1,2,3,4,5,6,7,8]);if(m.tiles.every((n,i)=>n===i))m.tiles.reverse();m.photo='/art/uae.svg'}
 if(['word','scramble','moving','hangman'].includes(k)){m.answer=m.prompt;m.scramble=shuffled([...m.answer]).join(' · ')}
 if(k==='nodots')m.answer=m.prompt[1];
 if(['right','sum'].includes(k)){m.a=10+Math.floor(Math.random()*80);m.b=10+Math.floor(Math.random()*80);m.answer=m.a+m.b;m.options=shuffled([m.answer,m.answer+10,m.answer-1,m.answer+1])}
 if(k==='missing'){m.base=2+Math.floor(Math.random()*8);m.answer=m.base*5;m.options=shuffled([m.answer,m.answer+1,m.answer-2,m.answer+m.base])}
 if(k==='percent')m.count=5+Math.floor(Math.random()*91);
 if(k==='wall'){m.base=2+Math.floor(Math.random()*7);m.tiles=shuffled(Array.from({length:20},(_,i)=>i+1))}
 if(k==='trace')m.tiles=shuffled([1,2,3,4,5,6,7,8,9]);
 if(k==='flag-color')m.paint=['#ffffff','#ffffff','#ffffff','#ffffff'];
 if(['pixels','zoom'].includes(k)){m.photo='/art/rak-v2.jpg';m.answer='جبال';m.step=0}
 if(k==='map'){m.cities=[['لندن',20,22],['القاهرة',54,56],['دبي',80,65],['روما',36,32],['إسطنبول',56,35],['الرياض',71,72]];m.target=Math.floor(Math.random()*m.cities.length)}
 if(k==='chain'){m.words=['قمر'];m.answer='ر'}
 if(['words-memory','lights'].includes(k)){m.sequence=k==='words-memory'?shuffled(['بحر','جبل','قمر','بيت','شمس','نهر']).slice(0,4):Array.from({length:3},()=>Math.floor(Math.random()*4));m.phase='watch';m.tick=0}
 if(k==='flash'){m.options=shuffled(['⭐','🌙','☀️','⚡']);m.answer=m.options[Math.floor(Math.random()*4)];m.phase='watch'}
 if(k==='cups'){m.cup=0;m.order=[0,1,2];m.phase='watch';m.tick=0}
 if(k==='fly'){m.y=50;m.velocity=0;m.x=95;m.gap=50;m.taps=0}
 if(k==='bomb')m.limit=20+Math.floor(Math.random()*25);
 if(['tap','ten','half','bomb','fly'].includes(k))miniTimer=setInterval(miniTick,k==='fly'?70:50);
 if(['words-memory','lights','flash','cups'].includes(k))miniTimer=setInterval(miniWatch, k==='flash'?1000:k==='words-memory'?4000:650);
 if(['draw','blind','line','charades','group','imitate','forehead','concept','popular','auction','names'].includes(k)){m.remaining=60;miniTimer=setInterval(()=>{if(view!=='mini-game'){miniStop();return}m.remaining=Math.max(0,60-Math.floor((Date.now()-m.started)/1000));const el=$('#mini-seconds');if(el)el.textContent=m.remaining;if(!m.remaining){miniStop();m.done=true;m.result='انتهى الوقت! سجلوا نتيجة الفريق.';render()}},250)}
 render();
}
function miniWatch(){if(view!=='mini-game'){miniStop();return}const m=mini,k=m.kind;if(k==='cups'){m.tick++;if(m.tick<7){const a=m.tick%3,b=(a+1)%3;[m.order[a],m.order[b]]=[m.order[b],m.order[a]];render();return}}else if(k==='lights'){m.tick++;if(m.tick<m.sequence.length*2){render();return}}miniStop();m.phase='play';render()}
function miniTick(){if(view!=='mini-game'){miniStop();return}const m=mini,t=(Date.now()-m.started)/1000;
 if(m.kind==='tap'){const e=$('#mini-seconds');if(e)e.textContent=Math.max(0,10-t).toFixed(1);if(t>=10)miniFinish('خلص الوقت! سجلت '+m.taps+' ضغطة.')}
 if(m.kind==='bomb'&&t>=m.limit)miniFinish('💥 انفجرت القنبلة! اللاعب الذي يمسك الجهاز خسر الجولة.');
 if(m.kind==='half'){m.position=(Math.sin(t*2.1-Math.PI/2)+1)*50;const e=$('#mini-marker');if(e)e.style.left=m.position+'%'}
 if(m.kind==='fly'){m.velocity+=0.16;m.y+=m.velocity;m.x-=2;if(m.x<0){m.x=100;m.gap=25+Math.random()*50;m.taps++;if(m.taps>=10){miniFinish('وصلت! جمعت 10 نجوم.');return}}if(m.y<2||m.y>96||(m.x<24&&m.x>14&&Math.abs(m.y-m.gap)>22)){miniFinish('انتهت الرحلة. جمعت '+m.taps+' نجوم.');return}const b=$('#mini-bird'),p=$('#mini-pipe');if(b)b.style.top=m.y+'%';if(p){p.style.left=m.x+'%';p.style.background=`linear-gradient(to bottom,#543781 ${m.gap-22}%,transparent ${m.gap-22}%,transparent ${m.gap+22}%,#543781 ${m.gap+22}%)`}}
}
function miniFinish(message){miniStop();mini.done=true;mini.result=message;render()}
function miniCorrect(ok){miniFinish(ok?'صح! نقطة لك ✓':'مو صحيح. جرب تحديا جديدا.');if(ok)mini.scores[mini.turn]++;render()}
function miniTeamNames(){return [draft.teams?.[0]||'الفريق الأول',draft.teams?.[1]||'الفريق الثاني']}
function miniScreen(){const m=mini,k=m.kind,pool=miniPool(k),used=miniSeen()[k]?.length||0;let body='';
 if(m.phase==='intro')body=`<div class="mini-intro-icon">${REFERENCE_ITEMS.find(x=>x[0]===m.id)[2]}</div><p>${miniDescription(k)}</p><p class="help">قواعد نسخة منو قدها؟ · على نفس الجهاز</p>${button('ابدأ التحدي','mini-start','primary')}`;
 else if(m.phase==='empty')body=`<h2>خلصت تحديات هاللعبة الجديدة</h2><p>ما نعيدها بدون اختيارك.</p>${button('السماح بتكرار هاللعبة','mini-recycle','quiet')}`;
 else{
  if(k==='memory')body=`<div class="mini-grid four">${m.tiles.map((v,i)=>button(m.matched.includes(i)||m.picked.includes(i)?v:'؟','mini-tile:'+i,'mini-tile',m.done||m.matched.includes(i))).join('')}</div><p>الأزواج: ${m.matched.length/2} / 6 · المحاولات: ${m.attempts}</p>${m.picked.length===2&&!m.done?button('إخفاء البطاقتين','mini-hide','quiet'):''}`;
  else if(['find','difference','wall','trace'].includes(k))body=`<h2>${k==='wall'?'اضغط مضاعفات '+m.base:k==='trace'?'التالي: '+(m.step+1):'وين المختلف؟'}</h2><div class="mini-grid ${k==='trace'?'three':'six'}">${m.tiles.map((v,i)=>button(String(v),'mini-tile:'+i,'mini-tile '+(m.matched.includes(i)?'won':''),m.done||m.matched.includes(i))).join('')}</div>`;
  else if(k==='puzzle')body=`<p>بدّل قطعتين. الأرقام تساعدك تتبع ترتيب الصورة من اليسار لليمين.</p><div class="mini-puzzle" dir="ltr">${m.tiles.map((v,i)=>`<button data-act="mini-tile:${i}" class="${m.picked.includes(i)?'chosen':''}" style="background-image:url('${m.photo}');background-size:300% 300%;background-position:${v%3*50}% ${Math.floor(v/3)*50}%" ${m.done?'disabled':''}><span>${v+1}</span></button>`).join('')}</div>`;
  else if(['yesno','lie','bone','part'].includes(k))body=`<h2>${esc(m.prompt[0])}</h2><div class="mini-options">${m.prompt[1].map((v,i)=>button(v,'mini-answer:'+i,'quiet',m.done)).join('')}</div>${m.done?'<p>الإجابة: '+esc(m.prompt[1][m.prompt[2]])+'</p>':''}`;
  else if(['sum','right','missing'].includes(k))body=`<h2 dir="ltr">${k==='missing'?[1,2,3,4].map(n=>n*m.base).join(' , ')+' , ?':m.a+' + '+m.b+' = ?'}</h2>${k==='sum'?miniInput():`<div class="mini-options">${m.options.map(v=>button(String(v),'mini-number:'+v,'quiet',m.done)).join('')}</div>`}`;
  else if(['word','scramble','moving','nodots'].includes(k))body=`<h2 class="mini-word ${k==='moving'?'moving':''}">${esc(k==='nodots'?m.prompt[0]:m.scramble)}</h2>${miniInput()}`;
  else if(k==='hangman')body=`<h2>${[...m.answer].map(c=>m.guesses.includes(c)?c:'ـ').join(' ')}</h2><p>الأخطاء: ${m.errors} / 6</p><div class="mini-alphabet">${[...'ابتثجحخدذرزسشصضطظعغفقكلمنهويأإةء'].map(c=>button(c,'mini-letter:'+c,'quiet tiny',m.done||m.guesses.includes(c))).join('')}</div>`;
  else if(k==='percent')body=`<h2>كم نسبة المربعات الملونة؟</h2><div class="mini-percent" dir="ltr">${Array.from({length:100},(_,i)=>`<i class="${i<m.count?'colored':''}"></i>`).join('')}</div>${miniInput('number')}`;
  else if(k==='flag-color')body=`<p>اختر اللون ثم الجزء.</p><div class="mini-palette">${['#ed334b','#13965a','#ffffff','#172234'].map(c=>`<button data-act="mini-color:${c}" style="background:${c};outline:${m.color===c?'3px solid #67429d':'none'}" aria-label="${c==='#ed334b'?'أحمر':c==='#13965a'?'أخضر':c==='#ffffff'?'أبيض':'أسود'}"></button>`).join('')}</div><div class="mini-flag" dir="ltr">${m.paint.map((c,i)=>`<button data-act="mini-paint:${i}" aria-label="${i===0?'الشريط العمودي':'الشريط الأفقي '+i}" style="background:${c}" ${m.done?'disabled':''}></button>`).join('')}</div>${button('تحقق من العلم','mini-check-flag','primary',m.done)}`;
  else if(['pixels','zoom'].includes(k))body=`<div class="mini-photo"><img src="${m.photo}" alt="صورة التحدي" style="transform:scale(${k==='zoom'?Math.max(1,5-m.step):1});filter:blur(${k==='pixels'?Math.max(0,18-m.step*4):0}px)"></div>${button('وضح الصورة أكثر','mini-clarify','quiet',m.done)}<p>ما طبيعة هذا المنظر؟</p>${miniInput()}`;
  else if(k==='map')body=`<h2>حدد موقع ${m.cities[m.target][0]}</h2><p class="help">خريطة إقليمية مبسطة للمواقع النسبية</p><div class="mini-map"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M12 5L32 8 38 20 61 23 62 36 52 42 31 35 16 30Z M20 43L49 41 60 55 52 91 30 82 20 60Z M62 38L84 45 95 67 77 83 63 62Z" fill="#e6d6b4" stroke="#b69b72"/></svg>${m.cities.map((c,i)=>`<button data-act="mini-answer:${i}" style="left:${c[1]}%;top:${c[2]}%" ${m.done?'disabled':''}>${i+1}</button>`).join('')}</div>${m.done?'<p>'+m.cities.map((c,i)=>(i+1)+': '+c[0]).join(' · ')+'</p>':''}`;
  else if(k==='clues'){const clues=m.prompt[0].split('،');body=`<h2>${esc(clues.slice(0,m.step+1).join('،'))}</h2>${button('تلميح آخر','mini-clarify','quiet',m.done||m.step>=clues.length-1)}${miniInput()}`}
  else if(k==='flash')body=m.phase==='watch'?`<div class="mini-intro-icon">${m.answer}</div>`:`<h2>أي رمز شفت؟</h2><div class="mini-options">${m.options.map(v=>button(v,'mini-flash:'+v,'quiet',m.done)).join('')}</div>`;
  else if(k==='words-memory')body=m.phase==='watch'?`<h2>${m.sequence.join(' ← ')}</h2><p>احفظ الترتيب من اليمين لليسار</p>`:`<p>اختار الكلمة رقم ${m.step+1}</p><div class="mini-options">${['بحر','جبل','قمر','بيت','شمس','نهر'].map(v=>button(v,'mini-sequence:'+v,'quiet',m.done)).join('')}</div>`;
  else if(k==='lights')body=`<p>${m.phase==='watch'?'راقب الإضاءة':'أعد الترتيب'}</p><div class="mini-grid two">${['#ef5077','#39b8b0','#f3b948','#8874d0'].map((c,i)=>`<button class="mini-light ${m.phase==='watch'&&m.tick%2===0&&m.sequence[Math.floor(m.tick/2)]===i?'lit':''}" style="background:${c}" data-act="mini-sequence:${i}" aria-label="لون ${i+1}" ${m.phase==='watch'||m.done?'disabled':''}></button>`).join('')}</div>`;
  else if(k==='cups')body=`<p>${m.phase==='watch'?'تابع الكوب الذي تحته الكرة':'وين الكرة؟'}</p><div class="mini-cups" dir="ltr">${m.order.map((v,i)=>button((m.phase==='watch'&&m.tick===0&&v===m.cup?'⚽':'🥤')+' '+(v+1),'mini-cup:'+i,'quiet',m.phase==='watch'||m.done)).join('')}</div>`;
  else if(k==='chain')body=`<p>${m.words.map(esc).join(' ← ')}</p><h2>كلمة تبدأ بحرف ${esc(m.answer)}</h2>${miniInput()}`;
  else if(k==='ten')body=`<h2>حس بالوقت…</h2>${button('وقف','mini-stop','primary',m.done)}`;
  else if(k==='half')body=`<div class="mini-track"><span id="mini-marker"></span><i></i></div>${button('وقف في النص','mini-stop','primary',m.done)}`;
  else if(k==='tap')body=`<h2><span id="mini-seconds">10</span> ثانية</h2>${button('اضغط! '+m.taps,'mini-tap','primary mini-tap',m.done)}`;
  else if(k==='fly')body=`<div class="mini-sky"><span id="mini-bird" style="top:${m.y}%;left:18%">🪽</span><div id="mini-pipe" style="left:${m.x}%"></div></div>${button('طير ↑','mini-flap','primary',m.done)}`;
  else if(k==='bomb')body=`<div class="mini-intro-icon">💣</div><h2>قولوا: ${esc(m.prompt)}</h2><p>مرروا الجهاز بعد كل إجابة!</p>`;
  else body=`<p><span id="mini-seconds">${m.remaining}</span> ثانية</p>${m.reveal?`<h2>${esc(m.prompt)}</h2>`:button('اعرض الكلمة للاعب','mini-reveal','primary')}<p>${miniDescription(k)}</p>${['draw','blind','line'].includes(k)?`<canvas id="mini-canvas" width="800" height="400" aria-label="لوحة الرسم"></canvas><div class="row">${button('مسح الرسم','mini-clear','quiet')}${k==='blind'?button('كشف الرسم','mini-show-drawing','quiet'):''}</div>`:''}<div class="row">${miniTeamNames().map((n,i)=>button('نقطة لـ '+n,'mini-score:'+i,'quiet',m.done&&m.scored)).join('')}</div>`;
 }
 return `<section class="mini-shell"><div class="row between">${button('رجوع للفئات','mini-back','quiet tiny')}<span class="eyebrow">تحديات اللمة</span></div><h1>${esc(m.title)}</h1><div class="mini-scorebar">${miniTeamNames().map((n,i)=>`<span>${esc(n)} <b>${m.scores[i]}</b></span>`).join('')}</div><div class="mini-play">${body}</div><p class="mini-result" role="status">${esc(m.result)}</p>${m.done&&m.answer?'<p>الإجابة: '+esc(String(m.answer))+'</p>':''}${m.phase!=='intro'?button('تحدي جديد','mini-start','primary'):''}<details><summary>طريقة اللعب</summary><p>${miniDescription(k)}</p></details><p class="help">${pool?'استخدمت '+used+' / '+pool.length+' · '+Math.round(used/pool.length*100)+'% · باقي '+(pool.length-used)+' تحديات جديدة':'تحديات متجددة عشوائيا؛ قد تتشابه الجولات.'}</p></section>`;
}
function miniInput(type='text'){return `<div class="mini-input"><input id="mini-input" type="${type}" autocomplete="off" aria-label="إجابتك" placeholder="اكتب إجابتك" ${mini.done?'disabled':''}>${button('تحقق','mini-submit','primary',mini.done)}</div>`}
const renderBeforeMini=render;
render=function(){if(view==='mini-game'&&mini){$('#app').innerHTML=miniScreen();if(['draw','blind','line'].includes(mini.kind)&&mini.phase==='play')miniCanvas();return}miniStop();renderBeforeMini()};
function miniNorm(s){return String(s).trim().replace(/[ًٌٍَُِّْـ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي')}
function miniCanvas(){const c=$('#mini-canvas');if(!c?.getContext)return;const ctx=c.getContext('2d');ctx.lineWidth=6;ctx.lineCap='round';ctx.strokeStyle='#58348c';if(mini.canvasData){const img=new Image();img.onload=()=>ctx.drawImage(img,0,0);img.src=mini.canvasData}c.style.opacity=mini.kind==='blind'&&!mini.showDrawing?0.04:1;
 const pos=e=>{const r=c.getBoundingClientRect();return [(e.clientX-r.left)*800/r.width,(e.clientY-r.top)*400/r.height]};
 c.addEventListener('pointerdown',e=>{if(mini.done||(mini.kind==='line'&&mini.strokeUsed))return;c.setPointerCapture(e.pointerId);mini.drawing=true;mini.strokeUsed=true;ctx.beginPath();ctx.moveTo(...pos(e))});c.addEventListener('pointermove',e=>{if(!mini.drawing)return;ctx.lineTo(...pos(e));ctx.stroke()});const end=()=>{mini.drawing=false;mini.canvasData=c.toDataURL()};c.addEventListener('pointerup',end);c.addEventListener('pointercancel',end)
}
$('#app').addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||b.disabled)return;const [a,arg]=b.dataset.act.split(':');if(a==='mini-open'){miniOpen(arg);return}if(!a.startsWith('mini-')||!mini)return;const m=mini,k=m.kind;
 if(a==='mini-back'){miniStop();go('categories');return}
 if(a==='mini-start'){m.canvasData=null;m.strokeUsed=false;m.showDrawing=false;m.scored=false;miniStart();return}
 if(a==='mini-recycle'){if(confirm('تسمح بإعادة تحديات هاللعبة؟')){const s=miniSeen();s[k]=[];localStorage.setItem('munu-mini-history-v1',JSON.stringify(s));miniStart()}return}
 if(a==='mini-reveal'){m.reveal=true;render();return}
 if(a==='mini-clear'){m.canvasData=null;m.strokeUsed=false;render();return}
 if(a==='mini-show-drawing'){m.showDrawing=true;render();return}
 if(a==='mini-score'&&!m.scored){m.scores[Number(arg)]++;m.scored=true;miniFinish('تم تسجيل النقطة.');return}
 if(m.done)return;
 if(a==='mini-answer')miniCorrect(Number(arg)===(k==='map'?m.target:m.prompt[2]));
 if(a==='mini-number')miniCorrect(Number(arg)===m.answer);
 if(a==='mini-flash')miniCorrect(arg===m.answer);
 if(a==='mini-cup'&&m.phase==='play')miniCorrect(m.order[Number(arg)]===m.cup);
 if(a==='mini-sequence'&&m.phase==='play'){if(String(m.sequence[m.step])!==arg)miniCorrect(false);else if(++m.step===m.sequence.length)miniCorrect(true);else render()}
 if(a==='mini-hide'){m.picked=[];render()}
 if(a==='mini-tile'){const i=Number(arg);if(!Number.isInteger(i)||i<0||i>=m.tiles.length)return;
  if(['find','difference'].includes(k))miniCorrect(i===m.odd);
  if(k==='memory'&&!m.matched.includes(i)&&!m.picked.includes(i)&&m.picked.length<2){m.picked.push(i);if(m.picked.length===2){m.attempts++;if(m.tiles[m.picked[0]]===m.tiles[m.picked[1]]){m.matched.push(...m.picked);m.picked=[];if(m.matched.length===m.tiles.length)miniFinish('طابقت كل البطاقات في '+m.attempts+' محاولات!')}}render()}
  if(k==='puzzle'){if(m.picked.length){const j=m.picked[0];[m.tiles[i],m.tiles[j]]=[m.tiles[j],m.tiles[i]];m.picked=[];if(m.tiles.every((v,n)=>v===n))miniFinish('اكتملت الصورة!')}else m.picked=[i];render()}
  if(k==='trace'){if(m.tiles[i]===m.step+1){m.step++;m.matched.push(i);if(m.step===9)miniFinish('وصلت نهاية الأثر!')}else m.result='اختار الرقم '+(m.step+1);render()}
  if(k==='wall'&&!m.matched.includes(i)){if(m.tiles[i]%m.base===0){m.matched.push(i);if(m.matched.length===m.tiles.filter(v=>v%m.base===0).length)miniFinish('هدمت الجدار الصحيح!')}else m.result='هذا الرقم مو من مضاعفات '+m.base;render()}
 }
 if(a==='mini-color'){m.color=arg;render()}
 if(a==='mini-paint'){m.paint[Number(arg)]=m.color;render()}
 if(a==='mini-check-flag')miniCorrect(m.paint.join(',')==='#ed334b,#13965a,#ffffff,#172234');
 if(a==='mini-clarify'){m.step++;render()}
 if(a==='mini-letter'&&!m.guesses.includes(arg)){m.guesses.push(arg);if(!m.answer.includes(arg))m.errors++;if([...m.answer].every(c=>m.guesses.includes(c)))miniCorrect(true);else if(m.errors>=6)miniFinish('خلصت المحاولات. الكلمة: '+m.answer);else render()}
 if(a==='mini-submit'){const value=$('#mini-input').value;if(!value.trim()){m.result='اكتب إجابتك أول.';render();return}if(k==='chain'){const s=miniNorm(value);if(s.length<2||miniNorm(s[0])!==miniNorm(m.answer)||m.words.some(w=>miniNorm(w)===s)){m.result='لازم كلمة جديدة تبدأ بالحرف المطلوب.'}else{m.words.push(value.trim());m.answer=value.trim().slice(-1);m.result='كلمة جديدة! تأكدوا جماعيا أنها كلمة صحيحة.'}render()}else if(k==='percent'){const n=Number(value);if(!Number.isFinite(n)||n<0||n>100){toast('اكتب نسبة بين 0 و100');return}miniFinish('النسبة '+m.count+'%. الفرق عن إجابتك: '+Math.abs(n-m.count)+'%.')}else miniCorrect(miniNorm(value)===miniNorm(k==='clues'?m.prompt[1]:m.answer))}
 if(a==='mini-tap'){if(Date.now()-m.started>=10000){miniTick();return}m.taps++;render()}
 if(a==='mini-flap')m.velocity=-1.7;
 if(a==='mini-stop'){const value=k==='ten'?(Date.now()-m.started)/1000:m.position||0;miniFinish(k==='ten'?'وقفت عند '+value.toFixed(2)+' ثانية. الفرق '+Math.abs(value-10).toFixed(2)+' ثانية.':'وقفت عند '+value.toFixed(1)+'%. الفرق عن المنتصف '+Math.abs(value-50).toFixed(1)+'%.')}
});

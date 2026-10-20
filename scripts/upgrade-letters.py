from pathlib import Path
import json,re
R=Path(__file__).resolve().parents[1];p=R/'letters-game.js';old=p.read_text();s=old
b={}
for l in (R/'data/letters-hard.txt').read_text().splitlines():
 k,q,a=l.split('|');b.setdefault(k,[k]).extend([q,a])
assert len(b)==28 and all(len(r)==5 for r in b.values())
s=re.sub(r'const LETTER_BANK=\[.*?\];',lambda m:'const LETTER_BANK='+json.dumps(list(b.values()),ensure_ascii=False,separators=(',',':'))+';',s,count=1,flags=re.S)
start=s.index('function letterWinner(');end=s.index('function letterSetup()',start)
s=s[:start]+'''function letterWinningPath(cells,team){
 const queue=[],parent=new Map();
 for(let i=0;i<25;i++)if(cells[i].owner===team&&(team===0?i%5===0:i<5)){queue.push(i);parent.set(i,null)}
 for(let p=0;p<queue.length;p++){const i=queue[p];if(team===0?i%5===4:i>=20){const path=[];for(let n=i;n!==null;n=parent.get(n))path.push(n);return path.reverse()}
  for(const n of letterNeighbors(i))if(cells[n].owner===team&&!parent.has(n)){parent.set(n,i);queue.push(n)}
 }return [];
}
function letterWinner(cells,team){return letterWinningPath(cells,team).length>0}
function letterCheckFinish(){if(!letters)return;letters.winningPath=[];letters.winner=null;for(const t of [0,1]){const path=letterWinningPath(letters.cells,t);if(path.length){letters.winner=t;letters.winningPath=path;letters.active=null;break}}}
function letterFinishBanner(){return `<div class="letter-finish" role="status"><div class="finish-trophy" aria-hidden="true">🏆</div><h1>انتهت الجولة!</h1><h2>${esc(letters.names[letters.winner])} وصلوا الطرفين</h2><p>تم احتساب الفوز تلقائيا. المسار الفائز موضح على اللوحة.</p>${button('العبوا جولة ثانية','letters-new','primary')}</div>`}
''' + s[end:]
s=s.replace('const g=letters;return `<section class="letter-shell">','const g=letters;return `<section class="letter-shell ${g.winner!==null?\'finished\':\'\'}">${g.winner!==null?letterFinishBanner():\'\'}')
s=s.replace('class="hex-cell owner-${c.owner}"','class="hex-cell owner-${c.owner} ${(g.winningPath||[]).includes(i)?\'winning-cell\':\'\'}"')
s=s.replace("letters.winner=letterWinner(letters.cells,team)?team:null;letters.turn=1-letters.turn;", "letterCheckFinish();if(letters.winner===null)letters.turn=1-letters.turn;")
s=s.replace("letters.history.pop());letterSave();render()", "letters.history.pop());letterCheckFinish();letterSave();render()")
s=s.replace("if(a==='letters-resume'&&letters)go('letters-board');", "if(a==='letters-resume'&&letters){letterCheckFinish();letterSave();go('letters-board')}")
s=s.replace("row[0]+':'+n", "questionKey('letters',row[n])")
s=s.replace('الحكم يكشف الجواب ويحدد الفريق الصحيح.','سجلوا صاحب الإجابة الصحيحة؛ اللعبة تنهي الجولة تلقائيا عندما يتصل طرفا الفريق.')
s=s.replace('الإجابة تبدأ بهذا الحرف · الحكم يحدد من جاوب صح','الإجابة تبدأ بهذا الحرف · سجلوا صاحب الإجابة الصحيحة')
s=s.replace("esc(n)+' جاوب صح'", "'إجابة صحيحة لـ '+esc(n)")
s=s.replace('ثم يختار الحكم الفريق الذي جاوب صح. أول طريق متصل يفوز.','ثم سجلوا الفريق الذي أجاب صح لتلوين الخلية. يفحص التطبيق المسار بعد كل إجابة، وينهي الجولة تلقائيا بمجرد اتصال الطرفين بلون الفريق؛ لا يوجد اختيار يدوي للفائز.')
s=s.replace('56 سؤالا.','56 سؤالا بمستوى متوسط وصعب.')
# Always derive outcome from the actual board after loading a saved game.
pos=s.index("const renderBeforeLetters=render;");s=s[:pos]+'letterCheckFinish();\n'+s[pos:]
p.write_text(s);html=R/'dist/index.html';h=html.read_text();assert old in h;h=h.replace(old,s);html.write_text(h)
css='''
.letter-finish{text-align:center;padding:24px 18px;background:linear-gradient(135deg,#412467,#7749a3);color:white;border-radius:22px;margin-bottom:20px;box-shadow:0 8px 25px #6a397729}.letter-finish h1{font-size:34px;color:#ffe79c;margin:6px 0}.letter-finish h2{font-size:23px}.letter-finish p{color:#f5eaff}.finish-trophy{font-size:48px}.finished .hex-cell{cursor:default}.winning-cell polygon{stroke:#ee3885;stroke-width:7;filter:drop-shadow(0 0 4px #ee388560)}.finished .hex-cell:not(.winning-cell){opacity:.55}.finished .letter-tools{border-top:1px solid #d9c7b1;padding-top:16px}.hex-board text{user-select:none}@media(max-width:600px){.letter-finish{padding:18px 12px}.letter-finish h1{font-size:29px}.letter-finish h2{font-size:20px}}
'''
p=R/'letters-game.css';p.write_text(p.read_text()+css);h=html.read_text().replace('</style>',css+'</style>');html.write_text(h)

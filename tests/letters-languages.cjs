const assert=require('node:assert/strict'),fs=require('node:fs'),create=require('./ui-harness.cjs');
const h=create();
const previous=fs.readFileSync('data/letters-oct1-night.txt','utf8').split('\n').join(' ');
for(const lang of ['ar','en']){
 const rows=JSON.parse(h.run(`JSON.stringify(letterBank('${lang}'))`));
 assert.equal(rows.length,lang==='ar'?28:26);const seen=new Set();
 for(const row of rows){assert.equal(row.length,13);for(let i=1;i<row.length;i+=2){assert(!seen.has(row[i]),row[i]);seen.add(row[i]);assert(row[i+1].replace(/[إآا]/g,'أ').startsWith(row[0]),row[i+1]);if(lang==='ar')assert(!previous.includes(row[i]),row[i]);}}
 assert.equal(h.run(`letterStats('${lang}').percent`),0);assert.equal(h.run(`letterStats('${lang}').rounds`),6);
}
h.click('letters');assert(h.element('#app').innerHTML.includes('0%'));assert(h.element('#app').innerHTML.includes('168'));
h.element('#letter-name-0').value='الصقور';h.element('#letter-name-1').value='الفرسان';h.click('letters-lang:en');assert(h.element('#app').innerHTML.includes('156'));assert(h.element('#app').innerHTML.includes('الصقور'));
h.click('letters-start');assert.equal(h.run('letters.lang'),'en');assert.equal(h.run('letters.cells.length'),25);assert(h.run('letters.cells.every(c=>/^[A-Z]$/.test(c.letter))'));
h.click('letter-cell:0');assert(h.element('#app').innerHTML.includes('lang="en" dir="ltr"'));assert.equal(h.run("letterStats('en').left"),155);assert.equal(h.run("letterStats('ar').used"),0);
const first=h.run('letters.active.q');h.click('letters-pass');h.click('letter-cell:0');assert.notEqual(h.run('letters.active.q'),first);h.click('letters-pass');
let reload=create(h.saved);assert.equal(reload.run('letters.lang'),'en');assert.equal(reload.run("letterStats('en').used"),2);
reload.click('letters');reload.click('letters-lang:ar');reload.element('#letter-name-0').value='أ';reload.element('#letter-name-1').value='ب';reload.click('letters-start');reload.click('letter-cell:0');reload.click('letters-pass');assert.equal(reload.run("letterStats('ar').used"),1);
reload.click('letters-new');reload.click('letters-reset');assert.equal(reload.run("letterStats('ar').used"),0);assert.equal(reload.run("letterStats('en').used"),2);
// Exhausted Arabic cannot silently recycle or create an unplayable new board.
reload.run("localStorage.setItem(LETTER_SEEN,JSON.stringify([...letterSeen(),...LETTER_BANK.flatMap(r=>r.filter((_,i)=>i%2===1).map(q=>letterKey('ar',q)))]))");assert.equal(reload.run("letterStats('ar').percent"),100);assert.equal(reload.run("letterStats('ar').rounds"),0);reload.click('letters-start');assert.equal(reload.run('view'),'letters-setup');
reload.click('letters-lang:en');reload.click('letters-start');assert.equal(reload.run('letters.lang'),'en');
// Win detection also locks the English board without a manual winner control.
reload.run('letters.cells.forEach(c=>c.owner=null);[0,5,10,15].forEach(i=>letters.cells[i].owner=1);letters.active={index:20,q:"Test",answer:"Answer",revealed:true}');reload.click('letters-award:1');assert.equal(reload.run('letters.winner'),1);assert(reload.element('#app').innerHTML.includes('انتهت الجولة!'));reload.click('letter-cell:24');assert.equal(reload.run('letters.active'),null);
// Existing saved boards without a language migrate to Arabic.
const legacy={...h.saved};const board=JSON.parse(legacy['munu-letters-game-v1']);delete board.lang;legacy['munu-letters-game-v1']=JSON.stringify(board);assert.equal(create(legacy).run('letters.lang'),'ar');
assert(fs.readFileSync('dist/index.html','utf8').includes(fs.readFileSync('letters-game.js','utf8')));
console.log('PASS: 324 valid questions, all Arabic replaced; English gameplay/RTL boundary; independent persistent progress and reset; exhaustion blocks repeat; automatic English win; old save migration.');

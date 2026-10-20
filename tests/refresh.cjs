const fs=require('fs'),assert=require('assert/strict'),create=require('./ui-harness.cjs');
const bank=JSON.parse(fs.readFileSync('questions.json')),old=JSON.parse(fs.readFileSync('data/bank-before-oct1-night.json'));
const oldTexts=new Set(old.flatMap(c=>c.questions.map(q=>q[1])));
assert.equal(bank.flatMap(c=>c.questions).filter(q=>oldTexts.has(q[1])).length,0,'every main question must be fresh');
for(const c of bank){assert(fs.existsSync('dist'+c.art),c.id);assert(c.questions.length>=24)}
const h=create();h.click('mode:classic');h.click('categories');assert(h.element('#app').innerHTML.includes('النسر الذهبي'));assert(h.element('#app').innerHTML.includes('/art/rak-v2.jpg'));
h.run("draft.cats=['golden_eagle','spacetoon','cars','uae','rak','animals']");h.click('start');assert.equal(h.run("game.deck.filter(q=>q.category==='golden_eagle').length"),6);
const q=JSON.parse(h.run("JSON.stringify(game.deck.find(q=>q.category==='golden_eagle'))"));h.click('q:'+q.id);h.click('reveal');assert(h.element('#app').innerHTML.includes(q.answer));
h.click('letters');h.element('#letter-name-0').value='أ';h.element('#letter-name-1').value='ب';h.click('letters-start');
// A bent path that reaches both edges wins immediately on its final cell.
h.run('letters.cells.forEach(c=>c.owner=null);[0,1,6,7,8].forEach(i=>letters.cells[i].owner=0);letters.active={index:9,q:"سؤال",answer:"جواب",revealed:true};');
h.click('letters-award:0');assert.equal(h.run('letters.winner'),0);assert(h.element('#app').innerHTML.includes('انتهت الجولة!'));assert(h.element('#app').innerHTML.includes('winning-cell'));h.click('letter-cell:24');assert.equal(h.run('letters.active'),null);
const reload=create(h.saved);reload.click('letters-resume');assert(reload.element('#app').innerHTML.includes('انتهت الجولة!'));reload.click('letters-undo');assert.equal(reload.run('letters.winner'),null);
// New text keys keep prior history, but old positional keys cannot suppress new questions.
const legacy=create({'munu-letters-seen-v1':'["أ:1","أ:3"]'});legacy.click('letters');legacy.element('#letter-name-0').value='أ';legacy.element('#letter-name-1').value='ب';legacy.click('letters-start');legacy.run('letters.cells[0].letter="أ"');legacy.click('letter-cell:0');assert(legacy.run('!!letters.active'));assert.equal(legacy.run('letterSeen().length'),3);
console.log('PASS: all current questions replaced, assets present, Golden Eagle playable, bent-path automatic finish/reload/undo, fresh letter history migration.');

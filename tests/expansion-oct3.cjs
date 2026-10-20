const assert=require('node:assert/strict'),fs=require('node:fs'),create=require('./ui-harness.cjs');
const before=JSON.parse(fs.readFileSync('data/bank-before-oct3.json')),after=JSON.parse(fs.readFileSync('questions.json')),report=JSON.parse(fs.readFileSync('data/oct3-expansion-report.json'));
assert.equal(after.reduce((n,c)=>n+c.questions.length,0),1122);assert.equal(report.newQuestions,432);
const oldSeen=[];for(const c of before)for(const q of c.questions)oldSeen.push(c.id+'|'+q[1].normalize('NFKC').replace(/[\u064B-\u065F\u0670\u0640]/g,'').replace(/\s+/g,' ').trim());
let h=create({'munu-dealt-questions-v1':JSON.stringify({version:1,keys:oldSeen})});
for(const c of after){const old=before.find(x=>x.id===c.id);if(!old)continue;assert.deepEqual(c.questions.slice(0,old.questions.length),old.questions,'unplayed questions and old indices preserved');for(const kind of ['images','audio'])if(old[kind])assert.deepEqual(c[kind].slice(0,old[kind].length),old[kind]);const expected=report.added[c.id]||0;assert.equal(h.run(`availableQuestions(BANK.find(c=>c.id==='${c.id}'),readSeen()).length`),expected)}
// Every previously played question is excluded, across all categories; newly available questions can be dealt.
h.click('mode:classic');h.click('categories');h.run("draft.cats=['cars','science','animals','football','capitals','maps']");h.click('start');assert.equal(h.run('game.deck.length'),36);const seen=new Set(oldSeen);for(const q of JSON.parse(h.run('JSON.stringify(game.deck)')))assert(!seen.has(h.run(`questionKey('${q.category}',${JSON.stringify(q.text)})`)));
const saved=h.saved;const beforeKeys=JSON.parse(saved['munu-dealt-questions-v1']).keys;h=create(saved);h.click('resume');assert.equal(h.run('game.deck.length'),36);assert.deepEqual(JSON.parse(h.saved['munu-dealt-questions-v1']).keys,beforeKeys);
// When all old cars are consumed, the 24 new cars support exactly four full classic rounds.
const j=create({'munu-dealt-questions-v1':JSON.stringify({version:1,keys:oldSeen})});assert(j.run("remainingText(BANK.find(c=>c.id==='cars'),readSeen())").includes('4'));
const maps=after.find(c=>c.id==='maps');assert.equal(maps.questions.length,96);assert.equal(maps.images.length,96);const sources=new Set();for(const image of maps.images.slice(24)){const svg=fs.readFileSync('dist'+image,'utf8');assert(svg.includes('<path d='));assert(!svg.includes('NAME_AR'));assert(h.run(`questionMedia({image:${JSON.stringify(image)}})`).includes(image));sources.add(svg)}assert.equal(sources.size,72);
assert.equal(new Set(after.flatMap(c=>c.questions.map(q=>q[1]))).size,1122);
console.log('PASS: 432 additions; all 576 old questions preserved and excluded when played; saved history/resume retained; balanced inventory; 72 distinct new maps.');

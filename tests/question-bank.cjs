const assert=require('node:assert/strict'),fs=require('node:fs');
const bank=JSON.parse(fs.readFileSync(require('node:path').resolve(__dirname,'../questions.json'),'utf8'));
assert.equal(bank.length,43);assert.equal(new Set(bank.map(c=>c.id  )).size,43);
const texts=[];
for(const c of bank){assert(c.questions.length>=6);for(const points of [200,400,600])assert.equal(c.questions.filter(q=>q[0]===points).length,c.questions.length/3);for(const q of c.questions){assert.equal(q.length,4);q.slice(1).forEach(s=>assert.ok(typeof s==='string'&&s.trim()));texts.push(q[1])}}
assert.equal(new Set(texts).size,1122);
const h=require('./ui-harness.cjs')();
assert.equal(h.run('JSON.stringify(BANK)'),JSON.stringify(bank));
h.click('mode:classic');h.click('categories');
for(const id of ['cars','uae','rak'])h.click('cat:'+id);
for(const id of ['islamic','videogames','spacetoon_songs'])h.click('cat:'+id);
h.click('start');assert.equal(h.run('game.deck.length'),36);
for(const id of ['islamic','videogames','spacetoon_songs'])assert.equal(h.run(`game.deck.filter(q=>q.category==='${id}').length`),6);
const song=JSON.parse(h.run("JSON.stringify(game.deck.find(q=>q.category==='spacetoon_songs'))"));
h.click('q:'+song.id);assert.ok(h.element('#app').innerHTML.includes(song.text));h.click('reveal');assert.ok(h.element('#app').innerHTML.includes(song.answer));
console.log('PASS: 43 categories, 1122 unique questions, balanced tiers, songs playable.');

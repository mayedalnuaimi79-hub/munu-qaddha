const assert=require('node:assert/strict'),fs=require('node:fs');
const h=require('./ui-harness.cjs')();
h.click('mode:classic');h.click('categories');
h.run("draft.cats=['capitals','geography','guess_country','landmarks','maps','world']");h.click('start');
const deck=JSON.parse(h.run('JSON.stringify(game.deck)'));
assert.equal(deck.length,36);
for(const c of ['capitals','geography','guess_country','landmarks','maps','world'])assert.equal(deck.filter(q=>q.category===c).length,6);
const maps=deck.filter(q=>q.category==='maps');
for(const q of maps){assert.match(q.image,/^\/maps\/geo[45]-\d{2}\.svg$/);assert.ok(fs.existsSync('dist'+q.image))}
h.click('q:'+maps[0].id);assert.ok(h.element('#app').innerHTML.includes('src="'+maps[0].image+'"'));assert.ok(!h.element('#app').innerHTML.includes(maps[0].answer));
h.click('home');h.click('resume');assert.equal(h.run('current().image'),maps[0].image);h.click('reveal');assert.ok(h.element('#app').innerHTML.includes(maps[0].answer));
h.click('award:0');assert.equal(h.run('game.teams[0].score'),maps[0].points);h.click('undo');assert.equal(h.run('current().image'),maps[0].image);
console.log('PASS: five new categories playable; image persistence, no answer before reveal, scoring and undo.');

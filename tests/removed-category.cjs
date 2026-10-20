const assert=require('node:assert/strict'),create=require('./ui-harness.cjs'),fs=require('fs');
const h=create();
assert.equal(h.run("BANK.some(c=>c.id==='arabic')"),false);
h.click('mode:classic');h.click('categories');assert(!h.element('#app').innerHTML.includes('لغتنا الحلوة'));assert(!h.element('#app').innerHTML.includes('group-letters'));h.click('start');
// A prior saved round may still include the retired category. Its deck is self-contained.
const q=JSON.parse(h.run('JSON.stringify(game.deck[0])'));
h.run("game.cats[0]='arabic';game.deck.filter(q=>q.category==='cars').forEach(q=>q.category='arabic');save();");h.click('home');h.click('resume');assert.equal(h.run('view'),'board');
h.click('q:'+q.id);assert.equal(h.run('view'),'question');h.click('reveal');assert(h.element('#app').innerHTML.includes(q.answer));h.click('award:0');assert.equal(h.run('game.teams[0].score'),q.points);
h.click('replay');assert.equal(h.run('view'),'categories');assert.equal(h.run('draft.cats.length'),5);assert.equal(h.run("draft.cats.includes('arabic')"),false);
// Independent letter game is not the removed trivia category.
h.click('letters');assert.equal(h.run('view'),'letters-setup');
console.log('PASS: removed category hidden; saved round resumes/reveals/scores; replay requests replacement; letter game retained.');

const assert=require('node:assert/strict');
const make=require('./ui-harness.cjs');
const key='munu-dealt-questions-v1';
let h=make(),seen=new Set();
function start(mode='classic'){h.click('mode:'+mode);h.click('categories');h.click('start')}
function collect(count){const deck=JSON.parse(h.run('JSON.stringify(game.deck)'));assert.equal(deck.length,count);for(const q of deck){assert.ok(!seen.has(q.text),'Repeated: '+q.text);seen.add(q.text)}for(const c of new Set(deck.map(q=>q.category)))for(const p of [200,400,600])assert.equal(deck.filter(q=>q.category===c&&q.points===p).length,count/18);return deck}
start();collect(36);
// Reload: history survives; abandoning a round also never re-deals it.
h=make(h.saved);start();collect(36);
h=make(h.saved);start();collect(36);
h=make(h.saved);start();collect(36);
const previous=h.run('JSON.stringify(game)');
h.click('replay');assert.equal(h.run('JSON.stringify(game)'),previous);assert.match(h.element('#dialog-content').innerHTML,/خلصت/);
// No reset is automatic; user must explicitly select the reset action.
assert.equal(JSON.parse(h.saved[key]).keys.length,144);
const action='recycle:'+h.run('draft.cats.join(",")');
h.element('#dialog-content').handlers.click({target:{closest:()=>({dataset:{act:action}})}});
assert.equal(h.run('view'),'board');assert.equal(JSON.parse(h.saved[key]).keys.length,36);
// Quick mode: eight full rounds, then exhausted, no repeats.
h=make();seen=new Set();for(let i=0;i<8;i++){start('quick');collect(18)}
h.click('replay');assert.match(h.element('#dialog-content').innerHTML,/خلصت/);
// Legacy saved decks migrate without changing resume or scores.
const legacy=JSON.parse(h.saved['lamma-game-v1']);h=make({'lamma-game-v1':JSON.stringify(legacy)});h.click('resume');assert.equal(h.run('JSON.stringify(game.deck)'),JSON.stringify(legacy.deck));h.click('categories');assert.equal(JSON.parse(h.saved[key]).keys.length,18);
// Corruption and quota errors fail closed instead of silently repeating.
h=make({[key]:'broken'});start();assert.equal(h.run('game'),null);assert.match(h.element('#toast').textContent,/تعذر/);
h=make();h.run('localStorage.setItem=()=>{throw new Error("quota")}');start();assert.equal(h.run('game'),null);
// Score undo and resume do not clear dealt history.
h=make();start();const before=h.saved[key];h.click('q:'+h.run('game.deck[0].id'));h.click('reveal');h.click('award:0');h.click('undo');assert.equal(h.saved[key],before);h.click('home');h.click('resume');assert.equal(h.saved[key],before);
console.log('PASS: classic and quick exhaustion, no repeats across reloads, explicit recycle, migration, resume, undo, storage failure.');

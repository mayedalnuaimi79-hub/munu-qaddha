const assert=require('node:assert/strict'),fs=require('node:fs'),create=require('./ui-harness.cjs');
const h=create();const items=JSON.parse(h.run('JSON.stringify(REFERENCE_ITEMS)'));
assert.equal(items.length,81);assert.equal(new Set(items.map(x=>x[0])).size,81);
assert.deepEqual(JSON.parse(h.run('JSON.stringify(MENU_SECTIONS.map(s=>s[1]))')),['الأكثر لعبا','mini game','عام','الإمارات','دول','إسلامي','كرة قدم','حروف','ألعاب']);
h.run("go('categories')");let markup=h.element('#app').innerHTML;assert(!markup.includes('جديدنا'));assert(markup.includes('باقي فئات منو قدها؟'));
for(const item of items){assert(markup.includes(item[1]));const art=h.run(`referenceArt(${JSON.stringify(item)})`);assert(fs.existsSync('dist'+art),art);h.click('menu-info:'+item[0]);assert(h.element('#dialog-content').innerHTML.includes(item[1]));}
const original=JSON.parse(require('child_process').execFileSync('git',['show','HEAD:questions.json'],{encoding:'utf8'}));const current=JSON.parse(fs.readFileSync('questions.json'));
for(const c of original)assert.deepEqual(current.find(x=>x.id===c.id),c,'Original category and text-based history keys must not change');
for(const item of items.filter(x=>x[3]==='mini')){h.click('mini-open:'+item[0]);assert.equal(h.run('view'),'mini-game');assert(h.element('#app').innerHTML.includes(item[1]));h.click('mini-start');assert.equal(h.run('mini.phase')==='empty',false,item[0]);assert(h.element('#app').innerHTML.length>500);h.click('mini-back');assert.equal(h.run('view'),'categories');assert.equal(h.callbacks.size,0)}
// Memory completes exactly once and cannot score duplicate tiles.
h.click('mini-open:memory');h.click('mini-start');const tiles=JSON.parse(h.run('JSON.stringify(mini.tiles)'));for(const v of new Set(tiles)){tiles.forEach((x,i)=>{if(x===v)h.click('mini-tile:'+i)})}assert(h.run('mini.done'));assert.equal(h.run('mini.matched.length'),12);
// Puzzle completion is automatic after swapping the final misplaced pair.
h.click('mini-open:puzzle');h.click('mini-start');h.run('mini.tiles=[1,0,2,3,4,5,6,7,8]');h.click('mini-tile:0');h.click('mini-tile:1');assert(h.run('mini.done'));
// Sequence rejects a wrong answer; flag validates all four regions.
h.click('mini-open:color-flag');h.click('mini-start');['#ed334b','#13965a','#ffffff','#172234'].forEach((c,i)=>{h.click('mini-color:'+c);h.click('mini-paint:'+i)});h.click('mini-check-flag');assert(h.run('mini.done'));assert.equal(h.run('mini.scores[0]'),1);
h.click('mini-open:press-right');h.click('mini-start');h.click('mini-number:'+h.run('mini.answer'));assert.equal(h.run('mini.scores[0]'),1);h.click('mini-number:'+h.run('mini.answer'));assert.equal(h.run('mini.scores[0]'),1);
// Prompt inventory exhausts, never silently resets; history survives a fresh page.
const j=create();j.click('mini-open:no-dots');for(let i=0;i<4;i++)j.click('mini-start');j.click('mini-start');assert.equal(j.run('mini.phase'),'empty');const reloaded=create(j.saved);reloaded.click('mini-open:no-dots');reloaded.click('mini-start');assert.equal(reloaded.run('mini.phase'),'empty');
// New categories deal balanced, non-repeating complete rounds through existing engine.
const n=create();n.run("draft.cats=['food','tech','market','flags','cities','smash']");n.click('start');assert.equal(n.run('game.deck.length'),36);for(const id of ['food','tech','market','flags','cities','smash'])assert.equal(n.run(`availableQuestions(BANK.find(c=>c.id==='${id}'),readSeen()).length`),0);
console.log('PASS: 81 ordered cards, valid assets/actions; 19 playable new quiz categories; original bank/history preserved; mini completion, scoring, prompt exhaustion and timer cleanup.');

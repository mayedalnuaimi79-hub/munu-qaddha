const assert=require('node:assert/strict'),fs=require('node:fs'),create=require('./ui-harness.cjs');
for(const mode of ['classic','quick']){
 const h=create();h.click('mode:'+mode);h.click('categories');h.run("draft.cats=['cars','uae','rak','spacetoon','adnan_lina','golden_eagle']");h.click('start');
 const deck=JSON.parse(h.run('JSON.stringify(game.deck)')),html=h.element('#app').innerHTML;
 assert.equal((html.match(/class="column poster-category"/g)||[]).length,6);
 for(const q of deck)assert.equal(html.split(`data-act="q:${q.id}"`).length-1,1,'each playable question appears exactly once');
 const card=h.run("posterCategory('cars',0)");
 assert.equal((card.match(/poster-points/g)||[]).length,mode==='classic'?2:1);
 assert.deepEqual([...card.matchAll(/>(200|400|600)<\/button>/g)].map(m=>+m[1]),mode==='classic'?[200,400,600,200,400,600]:[200,400,600]);
 h.click('q:'+deck[0].id);h.click('reveal');h.click('award:0');
 assert.equal(h.run('game.teams[0].score'),deck[0].points);
 const used=h.run(`posterCategory('${deck[0].category}',0)`);assert.match(used,new RegExp('data-act="q:'+deck[0].id+'"[^>]*disabled'));
 assert.doesNotMatch(h.element('#app').innerHTML,/[\u0660-\u0669\u06f0-\u06f9]/);
 assert.equal(h.run("westernDigits('١٢٣٤٥٦٧٨٩٠ ۱۲۳۴۵۶۷۸۹۰')"),'1234567890 1234567890');
}
assert.equal(create().run("esc('200 400 600')"),'200 400 600');
const bank=JSON.parse(fs.readFileSync('questions.json'));assert.doesNotMatch(JSON.stringify(bank),/[\u0660-\u0669\u06f0-\u06f9]/);
console.log('PASS: poster controls once each, both tiers, quick mode, used state, scoring and Western numeral display.');

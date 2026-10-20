
function posterCategory(id,index){
 const c=categoryInfo(id),deck=game.deck.filter(q=>q.category===id),top=[],bottom=[];
 for(const points of [200,400,600]){const rows=deck.filter(q=>q.points===points);if(rows[0])top.push(rows[0]);if(rows[1])bottom.push(rows[1])}
 const color=['#df386d','#14a2bf','#8656c5','#e77d35','#537ac0','#22977c'][index%6];
 const points=rows=>rows.map(q=>`<button class="point poster-point" data-act="q:${q.id}" aria-label="${esc(c.name)}، ${q.points} نقطة${game.used.includes(q.id)?'، تم اللعب':''}" ${game.used.includes(q.id)?'disabled':''}>${game.used.includes(q.id)?'✓':q.points}</button>`).join('');
 return `<section class="column poster-category" style="--category-color:${color}" aria-label="${esc(c.name)}"><div class="poster-points">${points(top)}</div><div class="poster-cover"><img src="${c.art||'/art/'+c.id+'.svg'}" alt=""><h3>${esc(c.name)}</h3></div>${bottom.length?`<div class="poster-points">${points(bottom)}</div>`:''}</section>`;
}

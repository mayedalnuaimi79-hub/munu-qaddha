import json,re,html
from pathlib import Path
root=Path(__file__).resolve().parent.parent
bank=json.loads((root/'questions.json').read_text())
new=[]
for line in (root/'data/menu-topics.txt').read_text().splitlines():
 if line.startswith('['):
  id,name,icon=line[1:-1].split('|');current={'id':id,'name':name,'icon':icon,'color':'#ffbd83','art':'/art/menu-topic-'+id+'.svg','questions':[]};new.append(current)
 elif line.strip():
  q,a=line.split('|');current['questions'].append([200+200*(len(current['questions'])//2),q,a,'فكروا مع بعض في وصف السؤال.'])
ids={x['id'] for x in new};bank=[c for c in bank if c['id'] not in ids]+new
(root/'questions.json').write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
# Extract static catalog tuples without evaluating the application.
js=(root/'reference-catalog.js').read_text()
items=re.findall(r"\['([^']+)','([^']+)','([^']+)','(cat|mini|letters|pending)','([^']+)'\]",js)
colors=['#eadcf8','#ffdfbe','#cfece8','#d7e8ff','#ffe0e8','#fff0b8']
def art(name,icon,i):
 bg=colors[i%len(colors)]
 return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 210"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="{bg}"/><stop offset="1" stop-color="#fff9ed"/></linearGradient></defs><rect width="240" height="210" fill="url(#bg)"/><circle cx="210" cy="28" r="54" fill="#fff" opacity=".45"/><circle cx="25" cy="192" r="58" fill="#fff" opacity=".5"/><path d="M18 55l8-4 5 9-8 4zm180 110l9-9 7 8-9 8z" fill="#a47cbd" opacity=".5"/><rect x="54" y="39" width="132" height="132" rx="32" transform="rotate(-8 120 105)" fill="#77558f" opacity=".12"/><rect x="53" y="32" width="134" height="132" rx="32" transform="rotate(6 120 105)" fill="#fff" stroke="#fff" stroke-width="5"/><text x="120" y="129" text-anchor="middle" font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif" font-size="82">{html.escape(icon)}</text><circle cx="38" cy="34" r="5" fill="#ef9d5a"/><path d="M193 145v16m-8-8h16" stroke="#bb88bd" stroke-width="3" stroke-linecap="round"/></svg>'''
for i,(id,name,icon,kind,target) in enumerate(items):
 (root/'dist/art'/('menu-'+id+'.svg')).write_text(art(name,icon,i))
for i,c in enumerate(new):(root/'dist/art'/('menu-topic-'+c['id']+'.svg')).write_text(art(c['name'],c['icon'],i))
p=root/'dist/index.html';s=p.read_text();a=s.index('const BANK=')+len('const BANK=');_,end=json.JSONDecoder().raw_decode(s[a:]);s=s[:a]+json.dumps(bank,ensure_ascii=False,separators=(',',':'))+s[a+end:]
s=re.sub(r'/\* REFERENCE MENU CSS BEGIN \*/.*?/\* REFERENCE MENU CSS END \*/','',s,flags=re.S)
s=s.replace('</style>','/* REFERENCE MENU CSS BEGIN */\n'+(root/'reference-catalog.css').read_text()+'\n/* REFERENCE MENU CSS END */\n</style>',1)
s=re.sub(r'/\* REFERENCE MENU JS BEGIN \*/.*?/\* REFERENCE MENU JS END \*/','',s,flags=re.S)
# Keep earlier functions for old navigation; the final declaration replaces the category screen.
pos=s.rindex('\nrender();')
s=s[:pos]+'\n/* REFERENCE MENU JS BEGIN */\n'+js+'\n'+(root/'mini-games.js').read_text()+'\n/* REFERENCE MENU JS END */\n'+s[pos:]
p.write_text(s)
print(f'{len(items)} menu cards, {len(bank)} question categories, {sum(len(c["questions"]) for c in bank)} questions')

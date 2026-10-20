"""Append October 3 content; never clear player history or mutate saved assets."""
import json,math,re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
bank=json.loads((root/'questions.json').read_text());lookup={c['id']:c for c in bank}
if any(c.get('expansion')=='2026-10-03' for c in bank):raise SystemExit('Expansion already applied')
(root/'data/bank-before-oct3.json').write_text(json.dumps(bank,ensure_ascii=False,indent=2))
added={};cat=None
for line in (root/'data/expansion-oct3.txt').read_text().splitlines():
 if line.startswith('['):cat=line[1:-1];continue
 points,q,a,h=line.split('|');lookup[cat]['questions'].append([int(points),q,a,h]);added[cat]=added.get(cat,0)+1
for line in (root/'data/capitals-oct3.txt').read_text().splitlines():
 p,c,a=line.split('|');lookup['capitals']['questions'].append([int(p),f'ما عاصمة {c}؟',a,'اسم مدينة العاصمة، وليس أكبر مدينة بالضرورة.'])
added['capitals']=48
names='''Argentina|Chile|South Africa|Mexico|Brazil|Cuba|Madagascar|Thailand|Vietnam|India|Greece|Turkey|Portugal|New Zealand|Australia|Italy|United Kingdom|Iceland|Philippines|Finland|Japan|Saudi Arabia|Egypt|South Korea|Haiti|Dominican Republic|Panama|Costa Rica|Nicaragua|Honduras|Guatemala|Jamaica|Zimbabwe|Mauritania|Niger|Zambia|Malawi|Cambodia|Laos|Myanmar|North Korea|Azerbaijan|Georgia|Czechia|Uganda|Rwanda|East Timor|Lesotho|El Salvador|Belize|Guyana|Suriname|Benin|Togo|Ivory Coast|Guinea|Guinea-Bissau|Liberia|Sierra Leone|Burkina Faso|Central African Republic|Republic of the Congo|Gabon|Equatorial Guinea|Burundi|Bhutan|Tajikistan|Kyrgyzstan|Turkmenistan|Armenia|Moldova|Bosnia and Herzegovina'''.split('|')
assert len(names)==72
features={f['properties']['ADMIN']:f for f in json.loads((root/'data/countries-110m.geojson').read_text())['features']}
selection=[]
for i,name in enumerate(names,1):
 f=features[name];selection.append(f);g=f['geometry'];polys=g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
 pts=[p for poly in polys for ring in poly for p in ring];mid=(min(p[1] for p in pts)+max(p[1] for p in pts))/2;factor=math.cos(math.radians(mid));xy=[(p[0]*factor,-p[1]) for p in pts]
 xmin=min(x for x,y in xy);xmax=max(x for x,y in xy);ymin=min(y for x,y in xy);ymax=max(y for x,y in xy)
 assert xmax-xmin<160,name
 scale=min(440/(xmax-xmin),300/(ymax-ymin));dx=(520-(xmax-xmin)*scale)/2;dy=(360-(ymax-ymin)*scale)/2
 paths=[]
 for poly in polys:
  for ring in poly:paths.append('M'+' L'.join(f'{(p[0]*factor-xmin)*scale+dx:.2f},{(-p[1]-ymin)*scale+dy:.2f}' for p in ring)+' Z')
 svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360"><rect width="520" height="360" rx="18" fill="#f1f6fa"/><path d="'+' '.join(paths)+'" fill="#7652bb" stroke="#402770" stroke-width="1.4" stroke-linejoin="round" fill-rule="evenodd"/><path d="M488 40V16m0 0-6 9m6-9 6 9" fill="none" stroke="#304a5d" stroke-width="2"/><text x="488" y="55" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#304a5d">N</text></svg>'
 path=f'/maps/geo5-{i:02}.svg';(root/('dist'+path)).write_text(svg)
 lookup['maps']['questions'].append([200 if i<=24 else 400 if i<=48 else 600,f'تحدي الحدود 5 — ما الدولة الموضحة في الشكل {i:02}؟',f['properties']['NAME_AR'],'شمال الخريطة للأعلى. الحدود مبسطة للتحدي.']);lookup['maps']['images'].append(path)
added['maps']=72
(root/'data/map-outlines-v5.json').write_text(json.dumps(selection,ensure_ascii=False))
for c in bank:
 if c['id'] in added:c['expansion']='2026-10-03'
texts=[q[1] for c in bank for q in c['questions']];assert len(texts)==len(set(texts))
for c in bank:
 counts=[sum(q[0]==p for q in c['questions']) for p in [200,400,600]];assert len(set(counts))==1,(c['id'],counts)
new=json.dumps(bank,ensure_ascii=False,separators=(',',':'))
html=root/'dist/index.html';h=html.read_text();a=h.index('const BANK=')+len('const BANK=');_,end=json.JSONDecoder().raw_decode(h[a:]);h=h[:a]+new+h[a+end:];html.write_text(h)
(root/'questions.json').write_text(json.dumps(bank,ensure_ascii=False,indent=2))
(root/'data/oct3-expansion-report.json').write_text(json.dumps({'added':added,'newQuestions':sum(added.values()),'total':len(texts)},indent=2))
print(added,'ADDED',sum(added.values()),'TOTAL',len(texts))

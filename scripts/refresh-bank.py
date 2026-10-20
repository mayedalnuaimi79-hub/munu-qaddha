import json,re,math
from pathlib import Path
R=Path(__file__).resolve().parents[1];old=json.loads((R/'data/bank-before-refresh.json').read_text());groups={};key=None
for line in (R/'data/refresh-bank.txt').read_text().splitlines():
 if line.startswith('['):key=line[1:-1];groups[key]=[]
 elif line.strip():
  p=line.split('|');assert len(p)==2,(key,line);groups[key].append(p)
caps=[('البرتغال','لشبونة'),('السويد','ستوكهولم'),('النرويج','أوسلو'),('فنلندا','هلسنكي'),('بولندا','وارسو'),('التشيك','براغ'),('المجر','بودابست'),('أيرلندا','دبلن'),('كندا','أوتاوا'),('أستراليا','كانبيرا'),('الأرجنتين','بوينس آيرس'),('البرازيل','برازيليا'),('أوروغواي','مونتيفيديو'),('الإكوادور','كيتو'),('باراغواي','أسونسيون'),('كولومبيا','بوغوتا'),('منغوليا','أولان باتور'),('لاوس','فيينتيان'),('كمبوديا','بنوم بنه'),('بروناي','بندر سري بكاوان'),('ناميبيا','ويندهوك'),('ملاوي','ليلونغوي'),('زامبيا','لوساكا'),('سلوفاكيا','براتيسلافا')]
# Slovakia appeared in the previous bank; use an entirely different country.
caps[-1]=('مولدوفا','كيشيناو')
groups['capitals']=[[f'ما عاصمة {c}؟',a] for c,a in caps]
mapnames=[('Germany','ألمانيا'),('Spain','إسبانيا'),('Canada','كندا'),('China','الصين'),('Morocco','المغرب'),('Sweden','السويد'),('Pakistan','باكستان'),('Peru','بيرو'),('Poland','بولندا'),('Ukraine','أوكرانيا'),('Algeria','الجزائر'),('Tunisia','تونس'),('Mongolia','منغوليا'),('Kenya','كينيا'),('Colombia','كولومبيا'),('Venezuela','فنزويلا'),('Bolivia','بوليفيا'),('Ethiopia','إثيوبيا'),('Tanzania','تنزانيا'),('Botswana','بوتسوانا'),('Namibia','ناميبيا'),('Libya','ليبيا'),('Sudan','السودان'),('Afghanistan','أفغانستان')]
features=json.loads((R/'data/countries-110m.geojson').read_text())['features'];selected=[]
for name,arabic in mapnames:
 match=[f for f in features if f['properties']['ADMIN']==name or f['properties']['NAME']==name];assert len(match)==1,(name,len(match));selected.append(match[0])
(R/'data/map-outlines-v2.json').write_text(json.dumps(selected,ensure_ascii=False,separators=(',',':')))
code=(R/'scripts/build-map-assets.py').read_text().replace('map-outlines.json','map-outlines-v2.json').replace('geo1-','geo2-')
(R/'scripts/build-map-assets-v2.py').write_text(code)
groups['maps']=[[f'تعرف على الدولة من حدودها في الخريطة الجديدة رقم {i+1:02}؟',a] for i,(_,a) in enumerate(mapnames)]
old.append({'id':'golden_eagle','name':'النسر الذهبي','icon':'🦅','color':'#dcab55','questions':[]})
seen=set();oldtexts={q[1] for c in old for q in c['questions']}
for c in old:
 rows=groups[c['id']];assert len(rows)==24,(c['id'],len(rows));c['questions']=[]
 for i,(q,a) in enumerate(rows):
  assert not any(x in q+a for x in ['استبدال','غير موثق','؟|']),q
  if q in oldtexts:print('OVERLAP',c['id'],q)
  assert q not in seen,q;seen.add(q)
  word=a.split('/')[0].strip();w=word[2:] if word.startswith('ال') else word
  hint='الإجابة رقم أو تاريخ.' if any(ch.isdigit() for ch in a) else 'تبدأ الإجابة بحرف «'+w[0]+'».'
  c['questions'].append([200 if i<8 else 400 if i<16 else 600,q,a,hint])
 if c['id']=='maps':c['images']=[f'/maps/geo2-{i+1:02}.svg' for i in range(24)]
 c['art']='/art/'+c['id']+('-v2.jpg' if c['id'] in ['rak','abudhabi','cars','animals','football','ark'] else '.svg')
(R/'questions.json').write_text(json.dumps(old,ensure_ascii=False,indent=2))
p=R/'dist/index.html';s=p.read_text();s=re.sub(r'const BANK=.*?;',lambda _: 'const BANK='+json.dumps(old,ensure_ascii=False,separators=(',',':'))+';',s,count=1)
s=s.replace('528 سؤال','552 سؤال').replace('22 فئة','23 فئة').replace(r'/^\/maps\/geo1-\d{2}\.svg$/',r'/^\/maps\/geo[12]-\d{2}\.svg$/')
p.write_text(s)
print('Wrote',len(old),'categories',sum(len(c['questions']) for c in old),'questions')

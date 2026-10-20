from pathlib import Path
import json,re
R=Path(__file__).resolve().parents[1]
bank=json.loads((R/'data/bank-before-board-refresh.json').read_text())
rows={};cat=None
for line in (R/'data/poster-refresh-bank.txt').read_text().splitlines():
 if line.startswith('['):cat=line[1:-1];rows[cat]=[]
 elif line:
  parts=line.split('|');assert len(parts)==2,(cat,line)
  rows[cat].append(parts)
capitals='النمسا|فيينا;بلجيكا|بروكسل;الدنمارك|كوبنهاغن;اليونان|أثينا;رومانيا|بوخارست;بلغاريا|صوفيا;كرواتيا|زغرب;صربيا|بلغراد;لاتفيا|ريغا;ليتوانيا|فيلنيوس;إستونيا|تالين;سلوفاكيا|براتيسلافا;سلوفينيا|ليوبليانا;ألبانيا|تيرانا;جورجيا|تبليسي;أرمينيا|يريفان;قيرغيزستان|بيشكيك;طاجيكستان|دوشانبي;بوتان|تيمفو;المالديف|ماليه;بوركينا فاسو|واغادوغو;النيجر|نيامي;تشاد|نجامينا;إريتريا|أسمرة'
rows['capitals']=[[f'ما عاصمة {c}؟',a] for c,a in (x.split('|') for x in capitals.split(';'))]
mapnames='Oman|عمان;United Arab Emirates|الإمارات العربية المتحدة;Qatar|قطر;Jordan|الأردن;Iraq|العراق;Iran|إيران;Yemen|اليمن;Syria|سوريا;Lebanon|لبنان;Kuwait|الكويت;Belgium|بلجيكا;Netherlands|هولندا;Denmark|الدنمارك;Austria|النمسا;Hungary|المجر;Romania|رومانيا;Bulgaria|بلغاريا;Republic of Serbia|صربيا;Croatia|كرواتيا;Ecuador|الإكوادور;Uruguay|أوروغواي;Paraguay|باراغواي;Senegal|السنغال;Ghana|غانا'
features=json.loads((R/'data/countries-110m.geojson').read_text())['features']
lookup={f['properties']['ADMIN']:f for f in features}
names=[x.split('|') for x in mapnames.split(';')]
selected=[lookup[n] for n,a in names]
(R/'data/map-outlines-v3.json').write_text(json.dumps(selected,ensure_ascii=False))
rows['maps']=[[f'تحدي الحدود 3 — ما الدولة الموضحة في الشكل {i:02}؟',a] for i,(n,a) in enumerate(names,1)]
old={q[1] for c in bank for q in c['questions']}
for c in bank:
 data=rows[c['id']];assert len(data)==24,(c['id'],len(data))
 c['questions']=[[200*(i//8+1),q,a,'الإجابة تبدأ بحرف '+a.removeprefix('ال')[0]] for i,(q,a) in enumerate(data)]
 if c['id']=='maps':
  c['images']=[f'/maps/geo3-{i:02}.svg' for i in range(1,25)]
  for q,f in zip(c['questions'],selected):q[3]='تقع في قارة '+{'Asia':'آسيا','Europe':'أوروبا','Africa':'إفريقيا','South America':'أمريكا الجنوبية'}[f['properties']['CONTINENT']]
new=[q[1] for c in bank for q in c['questions']]
assert len(new)==len(set(new))==576
assert not set(new)&old, set(new)&old
trans=str.maketrans('٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹','01234567890123456789')
blob=json.dumps(bank,ensure_ascii=False,separators=(',',':')).translate(trans)
(R/'questions.json').write_text(blob+'\n')
p=R/'dist/index.html';s=p.read_text();s=re.sub(r'const BANK=.*?;',lambda m:'const BANK='+blob+';',s,count=1)
s=s.replace('geo[12]-','geo[123]-')
s=s.translate(trans)
p.write_text(s)
# Replace only the letter bank, preserving automatic connection-win logic.
p=R/'letters-game.js';before=p.read_text();letters={}
for l in (R/'data/letters-poster-refresh.txt').read_text().splitlines():
 k,q,a=l.split('|');letters.setdefault(k,[k]).extend([q,a])
assert len(letters)==28 and all(len(v)==5 for v in letters.values())
after=re.sub(r'const LETTER_BANK=\[.*?\];',lambda m:'const LETTER_BANK='+json.dumps(list(letters.values()),ensure_ascii=False,separators=(',',':'))+';',before,count=1,flags=re.S)
p.write_text(after)
p=R/'dist/index.html';s=p.read_text();assert before in s;s=s.replace(before,after);p.write_text(s)
print('Imported 576 new main questions + 56 letter questions; retained seen/saved-game keys.')

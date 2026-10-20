from pathlib import Path
import json,re
R=Path(__file__).resolve().parents[1]
bank=json.loads((R/'data/bank-before-oct1-night.json').read_text())
rows={};cat=None
for line in (R/'data/oct1-night-bank.txt').read_text().splitlines():
 if line.startswith('['):cat=line[1:-1];rows[cat]=[]
 elif line:
  parts=line.split('|');assert len(parts)==2,(cat,line)
  rows[cat].append(parts)
capitals='السعودية|الرياض;الإمارات|أبوظبي;عمان|مسقط;مصر|القاهرة;الجزائر|الجزائر;ليبيا|طرابلس;سوريا|دمشق;العراق|بغداد;السنغال|داكار;غانا|أكرا;نيجيريا|أبوجا;الكاميرون|ياوندي;الغابون|ليبرفيل;أوغندا|كمبالا;رواندا|كيغالي;بوروندي|غيتيغا;سورينام|باراماريبو;غيانا|جورج تاون;بليز|بلموبان;هندوراس|تيغوسيغالبا;نيكاراغوا|ماناغوا;السلفادور|سان سلفادور;كوستاريكا|سان خوسيه;بنما|بنما'
rows['capitals']=[[f'ما عاصمة {c}؟',a] for c,a in (x.split('|') for x in capitals.split(';'))]
mapnames='Malaysia|ماليزيا;Kazakhstan|كازاخستان;Uzbekistan|أوزبكستان;Indonesia|إندونيسيا;Papua New Guinea|بابوا غينيا الجديدة;Nepal|نيبال;Sri Lanka|سريلانكا;Bangladesh|بنغلاديش;Belarus|بيلاروس;Switzerland|سويسرا;Ireland|أيرلندا;Slovakia|سلوفاكيا;Lithuania|ليتوانيا;Latvia|لاتفيا;Estonia|إستونيا;Albania|ألبانيا;Mozambique|موزمبيق;Angola|أنغولا;Democratic Republic of the Congo|الكونغو الديمقراطية;Nigeria|نيجيريا;Cameroon|الكاميرون;Mali|مالي;Chad|تشاد;Somalia|الصومال'
features=json.loads((R/'data/countries-110m.geojson').read_text())['features']
lookup={f['properties']['ADMIN']:f for f in features}
names=[x.split('|') for x in mapnames.split(';')]
selected=[lookup[n] for n,a in names]
(R/'data/map-outlines-v4.json').write_text(json.dumps(selected,ensure_ascii=False))
rows['maps']=[[f'تحدي الحدود 4 — ما الدولة الموضحة في الشكل {i:02}؟',a] for i,(n,a) in enumerate(names,1)]
old={q[1] for c in bank for q in c['questions']}
bank=[c for c in bank if c['id']!='arabic']
for c in bank:
 data=rows[c['id']];assert len(data)==24,(c['id'],len(data))
 c['questions']=[[200*(i//8+1),q,a,'الإجابة تبدأ بحرف '+a.removeprefix('ال')[0]] for i,(q,a) in enumerate(data)]
 if c['id']=='maps':
  c['images']=[f'/maps/geo4-{i:02}.svg' for i in range(1,25)]
  for q,f in zip(c['questions'],selected):q[3]='تقع في قارة '+{'Asia':'آسيا','Europe':'أوروبا','Africa':'إفريقيا','South America':'أمريكا الجنوبية','North America':'أمريكا الشمالية','Oceania':'أوقيانوسيا'}[f['properties']['CONTINENT']]
new=[q[1] for c in bank for q in c['questions']]
assert len(new)==len(set(new))==552
assert not set(new)&old, set(new)&old
trans=str.maketrans('٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹','01234567890123456789')
blob=json.dumps(bank,ensure_ascii=False,separators=(',',':')).translate(trans)
(R/'questions.json').write_text(blob+'\n')
p=R/'dist/index.html';s=p.read_text();s=re.sub(r'const BANK=.*?;',lambda m:'const BANK='+blob+';',s,count=1)
s=s.replace('geo[123]-','geo[1234]-')
s=s.translate(trans)
p.write_text(s)
# Replace only the letter bank, preserving automatic connection-win logic.
p=R/'letters-game.js';before=p.read_text();letters={}
for l in (R/'data/letters-oct1-night.txt').read_text().splitlines():
 k,q,a=l.split('|');letters.setdefault(k,[k]).extend([q,a])
assert len(letters)==28 and all(len(v)==5 for v in letters.values())
after=re.sub(r'const LETTER_BANK=\[.*?\];',lambda m:'const LETTER_BANK='+json.dumps(list(letters.values()),ensure_ascii=False,separators=(',',':'))+';',before,count=1,flags=re.S)
p.write_text(after)
p=R/'dist/index.html';s=p.read_text();assert before in s;s=s.replace(before,after);p.write_text(s)
print('Imported 552 new main questions + 56 letter questions; retained seen/saved-game keys.')

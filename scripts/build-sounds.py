"""Original, deterministic synthesized sound effects; no third-party recordings."""
from pathlib import Path
import numpy as np
from scipy.signal import butter,sosfilt
import wave,json
R=Path(__file__).resolve().parents[1];out=R/'dist/sounds';out.mkdir(exist_ok=True)
SR=24000;D=6;rng=np.random.default_rng(20261002)
def noise(d,lo=100,hi=7000):
 x=rng.normal(size=int(SR*d));return sosfilt(butter(2,[lo,hi],fs=SR,btype='bandpass',output='sos'),x)
def tone(f,d):
 t=np.arange(int(SR*d))/SR;return np.sin(2*np.pi*f*t)
def decay(f,d=.2,k=25):
 t=np.arange(int(SR*d))/SR;return tone(f,d)*np.exp(-k*t)
def add(y,x,at,gain=1):
 n=int(at*SR);end=min(len(y),n+len(x));y[n:end]+=x[:end-n]*gain
spec=[
('قطرات ماء','صوت سائل ينزل قطرة قطرة'),('دقات ساعة','شيء يقيس الوقت'),('طرق على باب خشبي','شخص ينتظر أحدا يفتح له'),('رنين هاتف قديم','صوت اتصال من جهاز قديم'),('جرس الباب','صوت تسمعه عند وصول ضيف'),('منبه إلكتروني','يذكرك بموعد أو يوقظك'),('صفارة سيارة شرطة أو إنذار طوارئ','صوت تحذيري يرتفع وينخفض'),('مطر','صوت مرتبط بالجو والسحب'),
('كتابة على لوحة مفاتيح','صوت من مكتب أو كمبيوتر'),('هبوب الرياح','حركة هواء قوية'),('صرصور الليل أو حشرة ليلية','كائن صغير تسمعه في الليل'),('نبض القلب','صوت إيقاعي من داخل الجسم'),('كرة ترتد على الأرض','شيء مستدير ينط ثم يهدأ'),('تصفيق','صوت تشجيع يصدر من اليدين'),('صفارة حكم','تسمعها في الملعب'),('خطوات بكعب على أرض صلبة','شخص يمشي على ممر'),
('قطع نقدية تتصادم','أشياء معدنية صغيرة في الجيب'),('سونار أو جهاز رصد بحري','نبضة جهاز يساعد على الرصد تحت الماء'),('عداد غايغر لقياس الإشعاع','جهاز قياس يصدر طقطقة متقطعة'),('تشويش راديو','جهاز استقبال يحتاج ضبط المحطة'),('صفارة قطار بخاري','وسيلة نقل تسير على قضبان'),('مروحية أو هليكوبتر','وسيلة نقل بمراوح علوية'),('سحاب ملابس يفتح ويغلق','قطعة تفتح بها الجاكيت أو الشنطة'),('صب الماء في كأس','صوت سائل يملأ وعاء')]
for idx,(answer,hint) in enumerate(spec):
 y=np.zeros(SR*D);t=np.arange(SR*D)/SR
 if idx==0:
  for at in [.45,1.3,2.4,3.1,4.6]:
   q=np.arange(int(.22*SR))/SR;x=np.sin(2*np.pi*(1500*q-1900*q*q))*np.exp(-22*q)+noise(.22,2000,6500)*np.exp(-65*q)*.2;add(y,x,at)
 elif idx==1:
  for j,at in enumerate(np.arange(.3,5.8,.5)):add(y,decay(2100 if j%2 else 1450,.065,100)+noise(.065,1500,6000)*np.exp(-np.arange(int(.065*SR))/SR*140),at)
 elif idx==2:
  for at in [.4,.68,.96,2.8,3.08,3.36]:add(y,decay(170,.16,32)+decay(410,.16,50)*.4+noise(.16,200,2600)*np.exp(-np.arange(int(.16*SR))/SR*100)*.3,at)
 elif idx==3:
  for at in [.4,1.2,3.2,4.0]:
   q=np.arange(int(.55*SR))/SR;x=(np.sin(2*np.pi*1700*q)+np.sin(2*np.pi*2150*q))*(.4+.6*np.maximum(0,np.sin(2*np.pi*24*q)));add(y,x,at,.35)
 elif idx==4:
  for at in [.4,3.3]:add(y,decay(660,1.4,3)+decay(1320,1.4,5)*.3,at);add(y,decay(525,1.7,2.8)+decay(1050,1.7,5)*.25,at+.48)
 elif idx==5:
  for at in [.4,.65,.9,1.8,2.05,2.3,3.2,3.45,3.7,4.6,4.85,5.1]:add(y,tone(1800,.14)*np.hanning(int(.14*SR)),at)
 elif idx==6:
  f=650+500*(.5-.5*np.cos(2*np.pi*.45*t));y=np.sin(2*np.pi*np.cumsum(f)/SR)+.18*np.sin(4*np.pi*np.cumsum(f)/SR)
 elif idx==7:
  y=noise(D,600,9500)*.25
  for at in rng.uniform(.1,5.9,180):add(y,noise(.025,1000,9000)*np.exp(-np.arange(int(.025*SR))/SR*180),at,.3)
 elif idx==8:
  for at in np.cumsum(rng.uniform(.08,.28,30)):
   if at<5.8:add(y,noise(.035,900,6500)*np.exp(-np.arange(int(.035*SR))/SR*140)+decay(550,.035,90)*.3,at)
 elif idx==9:
  y=noise(D,100,1900)*(.4+.3*np.sin(2*np.pi*.23*t)+.12*np.sin(2*np.pi*.65*t))
 elif idx==10:
  for at in np.arange(.3,5.4,.65):
   for n in range(4):add(y,tone(4200,.055)*np.hanning(int(.055*SR)),at+n*.085)
 elif idx==11:
  for at in np.arange(.35,5.5,.8):add(y,decay(62,.19,23),at);add(y,decay(82,.16,27),at+.24,.7)
 elif idx==12:
  for j,at in enumerate([.35,1.4,2.3,3.05,3.66,4.13,4.5,4.8,5.04,5.23]):add(y,decay(105+j*4,.15,32)+noise(.15,350,1800)*np.exp(-np.arange(int(.15*SR))/SR*90)*.7,at,1-j*.065)
 elif idx==13:
  for at in np.arange(.35,5.6,.36):add(y,noise(.13,650,9500)*np.exp(-np.arange(int(.13*SR))/SR*40),at)
 elif idx==14:
  for at,d in [(.4,.3),(1.1,.3),(2.4,1.4)]:
   q=np.arange(int(d*SR))/SR;add(y,(np.sin(2*np.pi*2800*q+2*np.sin(2*np.pi*40*q))+.3*np.sin(2*np.pi*3150*q))*np.minimum(1,q*40)*np.minimum(1,(d-q)*30),at)
 elif idx==15:
  for j,at in enumerate(np.arange(.35,5.7,.48)):
   add(y,decay(950 if j%2 else 750,.075,55)+noise(.075,1500,5000)*np.exp(-np.arange(int(.075*SR))/SR*120)*.25,at)
 elif idx==16:
  for at in [.4,.48,.61,.85,1.0,2.5,2.57,2.7,2.82,3,4.3,4.45,4.63]:
   f=rng.uniform(2200,4200);add(y,decay(f,.45,14)+decay(f*1.41,.45,19)*.4,at)
 elif idx==17:
  for at in [.5,2.3,4.1]:
   x=decay(1250,1.25,4);add(y,x,at)
   for k in range(1,4):add(y,x,at+k*.19,.25**k)
 elif idx==18:
  for at in np.cumsum(rng.exponential(.085,100)):
   if at<5.9:add(y,noise(.006,1400,10500)*np.hanning(int(.006*SR)),at)
 elif idx==19:
  y=noise(D,150,10500)*(.1+.6*(.5+.5*np.sin(2*np.pi*.37*t)))
  for at in [.6,1.8,3.7]:add(y,tone(1400,.15)*np.hanning(int(.15*SR)),at,.3)
 elif idx==20:
  for at,d in [(.35,1.5),(2.9,2.1)]:
   q=np.arange(int(d*SR))/SR;x=sum(np.sin(2*np.pi*f*q+1.4*np.sin(2*np.pi*2*q)) for f in [330,415,490])+noise(d,400,4000)*.3;env=np.minimum(q*8,1)*np.minimum((d-q)*5,1);add(y,x*env,at,.3)
 elif idx==21:
  pulse=(.5+.5*np.sin(2*np.pi*16*t))**8;y=noise(D,40,1600)*pulse+np.sin(2*np.pi*75*t)*pulse*.4
 elif idx==22:
  for at,d in [(.5,.65),(2,.9),(4,.65)]:
   q=np.arange(int(d*SR))/SR;x=noise(d,1200,8000)*(.2+.8*(.5+.5*np.sin(2*np.pi*85*q))**8)*np.hanning(len(q));add(y,x,at)
 elif idx==23:
  q=np.arange(int(4.8*SR))/SR;x=noise(4.8,300,6500)*.16
  for at in np.arange(0,4.65,.043):
   u=np.arange(int(.12*SR))/SR;f=700+at*140+rng.uniform(-150,150);add(x,np.sin(2*np.pi*(f*u-700*u*u))*np.exp(-35*u),at,.4)
  add(y,x*np.minimum(1,q*6)*np.minimum(1,(4.8-q)*6),.4)
 y[:int(.025*SR)]*=np.linspace(0,1,int(.025*SR));y[-int(.06*SR):]*=np.linspace(1,0,int(.06*SR));peak=np.max(np.abs(y));y=y/(peak or 1)*.78
 with wave.open(str(out/f'fx-{idx+1:02}.wav'),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((y*32767).astype('<i2').tobytes())
(R/'data/sound-questions.json').write_text(json.dumps(spec,ensure_ascii=False,indent=2))
print('24 original sound effects generated: 6 seconds each, mono PCM WAV, 24 kHz.')

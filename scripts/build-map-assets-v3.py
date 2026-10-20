import json,math
from pathlib import Path
root=Path(__file__).resolve().parents[1]
features=json.loads((root/'data/map-outlines-v3.json').read_text())
for i,f in enumerate(features,1):
 g=f['geometry'];polys=g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
 pts=[pt for poly in polys for ring in poly for pt in ring]
 midlat=(min(p[1] for p in pts)+max(p[1] for p in pts))/2
 factor=math.cos(math.radians(midlat));xy=[(p[0]*factor,-p[1]) for p in pts]
 loX=min(p[0] for p in xy);hiX=max(p[0] for p in xy);loY=min(p[1] for p in xy);hiY=max(p[1] for p in xy)
 scale=min(440/(hiX-loX),300/(hiY-loY));dx=(520-(hiX-loX)*scale)/2;dy=(360-(hiY-loY)*scale)/2
 paths=[]
 for poly in polys:
  for ring in poly:
   coords=[f'{(p[0]*factor-loX)*scale+dx:.2f},{(-p[1]-loY)*scale+dy:.2f}' for p in ring]
   paths.append('M'+' L'.join(coords)+' Z')
 svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 360"><rect width="520" height="360" rx="18" fill="#f1f6fa"/><path d="'+' '.join(paths)+'" fill="#7652bb" stroke="#402770" stroke-width="1.4" stroke-linejoin="round" fill-rule="evenodd"/><path d="M488 40V16m0 0-6 9m6-9 6 9" fill="none" stroke="#304a5d" stroke-width="2"/><text x="488" y="55" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#304a5d">N</text></svg>'
 (root/f'dist/maps/geo3-{i:02}.svg').write_text(svg)

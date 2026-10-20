# Country outline assets

Source: Natural Earth, 1:110m Admin 0 Countries (public domain).
Downloaded 2026-09-29 from the maintainer's GeoJSON mirror:
https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson

Dataset and licensing information:
https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/
https://www.naturalearthdata.com/about/terms-of-use/

`map-outlines.json` retains geometry for 24 selected countries. `scripts/build-map-assets.py` produces numbered, unnamed SVG silhouettes with north upwards. Equirectangular coordinates are adjusted by cosine of each country's middle latitude. All polygons in the selected source feature are retained. These are simplified quiz illustrations, not survey maps. Existing geo1 assets should remain immutable so saved games retain their maps.

2026-10-01: geo3 maps built from `countries-110m.geojson` using `scripts/build-map-assets-v3.py`. Country selection is recorded in `scripts/poster-refresh.py`; source geometry preserved in `map-outlines-v3.json`. No answers appear in the rendered SVG labels.

2026-10-01 evening: geo4 generated from the same Natural Earth 110m geometry. Selection in `scripts/oct1-night-refresh.py`. Malaysia selected instead of the United States to avoid a trans-Pacific bounding box that would make the silhouette difficult to read. Previous geo1–geo3 assets retained.

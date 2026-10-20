## Spacetoon update — 2026-09-27

Replaced the six Spacetoon questions with six distinct series; added a separate six-question songs category. Song identification uses short excerpts (3–6 words per song), not audio playback. Original default category selection preserved.

Sources checked for the new song questions:
- Sally: https://kalimat.anghami.com/lyrics/38140923
- Hazeem: https://kalimat.anghami.com/lyrics/38012705
- Ahd Al Asdiqa: https://kalimat.anghami.com/lyrics/38012704
- Secret Garden: https://www.youtube.com/watch?v=8PpCwa1uurA
- Rasha Rizk repertoire: https://arriyadiyah.com/749318/
- Hazeem writer/composer, artist upload: https://www.youtube.com/watch?v=lU3CnE7GxZc

# Question refresh — 27 September 2026

Latest revision replaces all 96 questions from the preceding release. Cars now covers brands, models, logos, founders and automotive cultural history, with no mechanical questions. Original reference notes below are retained as history; latest specialized references:
- https://www.lamborghini.com/en-en/history/milestones
- https://www.ferrari.com/en-GW/history/moments/2002/homage-to-the-founder/more
- https://www.rakports.ae/contact/
- https://visitrasalkhaimah.com/discover/activities/suwaidi-pearls/
- https://visitjebeljais.com/play
- https://visitabudhabi.ae/en/plan-your-trip/article-hub/13-must-see-architecture
- https://abudhabiculture.ae/en/cultural-sites/museums/louvre-abu-dhabi
- https://ark.wiki.gg/wiki/Polymer
- https://ark.wiki.gg/wiki/Cement
- https://ark.wiki.gg/wiki/Achatina
- https://ark.wiki.gg/wiki/Chitin
- https://www.teamcherry.com.au/blog/hollow-knight-then-and-now
- https://corpus.quran.com/concept.jsp?id=zayd

## Previous revision

All 78 prior questions replaced; 18 questions added in Islamic knowledge, video games and ARK. Six questions per category, two each at 200/400/600. Difficulty is editorial. ARK recipes and weight reductions assume standard unmodded settings.

Specialized question references:
- https://ark.wiki.gg/wiki/Metal_Ingot
- https://ark.wiki.gg/wiki/Argent
- https://ark.wiki.gg/wiki/Gasoline_%28Gas-Crafted%29
- https://visitrasalkhaimah.com/discover/attractions/dhayah-fort/
- https://almarjanisland.com/unique-experience/
- https://visitrasalkhaimah.com/blog/natural-attractions-ras-al-khaimah/
- https://areq.net/m/سالي_(أنمي).html
- https://quran.com/ar/an-naml/27
- https://sunnah.com/bukhari/66/8
- https://www.thinkwithportals.com/blog.php?id=5539&p=1
- https://abudhabiculture.ae/en/cultural-sites/museums/louvre-abu-dhabi

Saved games retain their embedded question decks. Start a new round for refreshed questions. Score and turn controls remain compatible with prior saves.

## Automatic question rotation — 2026-09-27

Expanded to 306 questions (18 per category, six per score tier). Cars remain brands/models/history. No-repeat history is local to the browser. Complete decks are reserved on creation, including abandoned questions. Existing saved deck is imported once; historical games no longer stored cannot be reconstructed. No server or automatic content-generation service is implied. Exhaustion requires choosing other categories or explicitly allowing recycling; no silent wraparound.

Additional ARK references checked:
- https://ark.wiki.gg/wiki/Basilosaurus
- https://ark.wiki.gg/wiki/Argentavis

Validation: tests/no-repeat.cjs covers classic and quick exhaustion, reload persistence, explicit recycling, legacy saves, quota/corruption handling, and undo/resume. Existing host-control and question-bank suites pass.

## Fresh bank and usage meter — 2026-09-28

Replaced all 306 question texts; maintained 18 questions per category and six per score tier. Usage meter now measures (total minus available) / total, starts at zero, and rises as decks are reserved. Old history and saved rounds are retained; the new bank's keys naturally start unused. Existing saved rounds retain their original questions.

References consulted for specialized items:
- RAK heritage and Falayah: https://visitrasalkhaimah.com/discover/attractions/falayah/
- Flamingo Beach: https://visitrasalkhaimah.com/discover/attractions/flamingo-beach/
- Shimal / Dhayah: https://whc.unesco.org/en/tentativelists/7041/
- Queen of Sheba site: https://visitrasalkhaimah.com/discover/attractions/queen-of-sheebas-palace/
- Song identification: https://spacesoogh.com/all-spacetoon-songs/ (short excerpts only, under ten words per song; no audio)

Validated 0/33/67/100 usage progression, reload persistence, unaffected categories, no-repeat behavior and balanced question bank. No mobile visual verification performed for this text and arithmetic update.

## Geography categories — 2026-09-29

Added 90 questions across capitals, geography, guess the country, landmarks and map silhouettes. Total: 22 categories / 396 questions. Each new category has 18 questions, six each at 200/400/600 points. Existing bank, default selections, saved rounds and no-repeat history preserved. New categories start at zero usage.

Map geometry references and reproduction steps are in data/MAP-SOURCES.md. Map silhouettes were inspected together, and gameplay tests cover all five categories, map display, answer reveal, save/resume, scoring and undo. Browser layout was not visually tested on a device.

## Continuous category page and additional questions — 2026-09-30

All nine category groups now render as sections on one vertically scrolling page. The selection tray stays near the top on portrait screens; landscape short screens use normal flow. Selecting a category preserves scroll position.

Added six questions per category: 132 new questions, 528 total. Prior questions and browser history remain intact. Tested a history containing every earlier question and confirmed that only newly added questions are dealt. New map assets 19–24 use the same Natural Earth source: Saudi Arabia, Turkey, South Africa, New Zealand, Cuba and Finland. Existing map assets remain unchanged.

Additional reference: RAK Airport inauguration year, https://www.rakairport.com/aboutus.html . Song clue paraphrases use the previously documented theme-song reference. Tests cover bank balance, persistence, no-repeat exhaustion, host controls, map gameplay and the continuous section structure.

## 2026-09-30 evening refresh
All 528 previous prompt texts were replaced; 24 Golden Eagle prompts added (23 × 24 = 552). Twenty-four new Natural Earth outlines use geo2 files; geo1 assets remain for saved games. Each category has eight questions at each point tier. The 56 letter-game prompts were replaced with intermediate/advanced vocabulary, science and language concepts. This is authored trivia, not a copy of another game's question bank. General stable facts were reviewed editorially; no claim of exhaustive external verification of all 552 entries.

Sources checked for niche facts and ambiguous names:
- Golden Eagle / Pepero story and Arabic names: https://www.aranime.art/post/1535 (father Carlos, Andes, Kana, Chika, ending). https://answers.mawdoo3.com/ما-أسماء-أهم-الشخصيات-في-مسلسل-الأنمي-النسر-الذهبي (Jupiter, Shira, Chuchu). https://en.wikipedia.org/wiki/The_Adventures_of_Pepero and https://www.animecharactersdatabase.com/source.php?id=103153 (Wako, 1975–1976, 26 episodes). Short original prompts, no lyrics reproduced.
- Ras Al Khaimah: https://u.ae/en/about-the-uae/the-seven-emirates/ras-al-khaimah ; https://visitrasalkhaimah.com/discover/attractions/khatt-village/ ; https://visitrasalkhaimah.com/location/place/al-marjan-island/ ; https://raktda.com/history/ .
- Abu Dhabi: https://visitabudhabi.ae/en/things-to-do/culture/heritage/qasr-al-muwaiji ; https://visitabudhabi.ae/en/things-to-do/culture/heritage/zayed-centre ; https://www.visitabudhabi.ae/ar/things-to-do/shopping/souks-in-abudhabi .
- Cars: https://www.mazda.com/en/experience/mspr/motorsports/lemans/ ; https://www.ferrari.com/en-GR/history/moments/2013/extreme-innovation/more . All car prompts concern models, brands, places, founders and motorsport history, not mechanical troubleshooting.
- ARK: official community wiki entries Taming, Griffin, Quetzal, Ovis and Plesiosaur at https://ark.wiki.gg/ . Prompts avoid changing server rates, current patch numbers and build-specific balances.
- Natural Earth public-domain country boundaries, 110m source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson . National outlines simplified; no claim of survey precision.

Spacetoon songs category still uses written identifying clues. No audio was supplied, and this release does not claim to add playback.

## 2026-09-30: Adnan & Lina category
24 original prompts (8 per tier) added without editing existing categories or clearing played history. Arabic localization follows Dubai Zaman: https://www.dubaizaman.ae/content/dubaizaman/ar-ae/programs/213/25186.html . Character abilities/equipment checked against the official series site: https://future-boy-conan.com/character/ . Original-production information: https://www.nippon-animation.co.jp/work/1295/ and https://www.nipponanimation.com/program/1295/ . Arabic aliases and ending checked against https://3rabica.org/مغامرات_عدنان search index; voice credits against https://www.bostah.com/1978/عدنان_ولينا and the Bahrain culture recognition booklet for Abdulrahman Al-Aqal. No dialogue or song lyrics reproduced. Category image is newly generated fan illustration, not an official promotional still.

## 2026-10-01 — full bank refresh and poster board

576 main prompts replaced against `data/bank-before-board-refresh.json`; 56 letter prompts refreshed. Stable general knowledge authored separately. Selected specialist details cross-checked using:
- https://gkids.com/series/future-boy-conan/ — licensed episode guide (Conan plot events).
- https://en.wikipedia.org/wiki/Future_Boy_Conan — original character names.
- https://en.wikipedia.org/wiki/The_Adventures_of_Pepero — plot details including necklace, whistle, cave and false accusation.
- https://animetime.tv/series/the-adventures-of-pepero-son-of-the-andes — original episode titles, questions explicitly refer to original episode numbering.
- https://ark.wiki.gg/wiki/Basilosaurus — passive oil generation.
- https://visitrasalkhaimah.com/discover/attractions/national-museum-of-ras-al-khaimah/ — heritage context.
- https://visitrasalkhaimah.com/ar/location/place/mina-al-arab/ — Hayat Island.
- https://www.rak.ae/wps/portal/rak/government-entities/rak-international-airport/Ras%20Al%20Khaimah%20International%20Airport — airport opened in 1976.
- https://ar.wikipedia.org/wiki/أسطورة_زورو_(أنمي) — Gabriel is the lieutenant, distinct from Raymond.
- https://www.youtube.com/watch?v=Fc0LTrUSxKE — official Spacetoon Doremi opening title. Songs category remains text clues; no audio represented as installed.
- https://ar.wikipedia.org/wiki/رعد_العملاق — Tetsujin 28, not a combining aircraft robot.

New map set geo3 uses 24 distinct country outlines from the existing Natural Earth 110m dataset. geo1 and geo2 remain deployed for older saved games. Existing saved rounds keep their old deck; new rounds use the new bank. Seen history is retained; new prompts have new history keys.

## 2026-10-01 evening — full replacement; retire Arabic trivia

552 new main prompts across 23 categories; 56 new letter-game prompts. `arabic` is absent from the playable bank and category navigation. Saved self-contained rounds can still reveal and score their old cards; replay removes retired IDs and asks for a replacement category. No history reset.

Specialist checks for this revision:
- https://visitrasalkhaimah.com/things-to-do/top-things-to-do/ — tourism activities.
- https://raktda.com/neighborhood-guide/ — Al Hamra and coastal neighborhoods.
- https://ark.wiki.gg/wiki/Tropeognathus_Saddle — gasoline-powered jet saddle.
- https://ark.wiki.gg/wiki/Astrocetus — Genesis Part 1 space whale.
- https://ark.wiki.gg/wiki/Bloodstalker — Genesis creature.
- https://thetvdb.com/series/the-adventures-of-pepero-son-of-the-andes — Anita and journey departure.
- https://www.imdb.com/it/title/tt0352037/episodes/ — indexed episode summaries (Titicaca's successor, mountain hazards).
- https://www.imdb.com/title/tt1417313/plotsummary/ — sick donkey in the wolf-valley episode.
- https://en.wikipedia.org/wiki/The_Adventures_of_Pepero — original staff/voice credits.
- https://animetime.tv/series/the-adventures-of-pepero-son-of-the-andes — original episode titles.
- https://en.wikipedia.org/wiki/Future_Boy_Conan — production credits, cast and story setting.
- https://futureboyconan.fandom.com/wiki/Gutch — Barracuda cook.
- https://futureboyconan.fandom.com/wiki/Tera — Orlo's sister.
- https://futureboyconan.fandom.com/wiki/Luke — underground resistance.

Map pack geo4 adds 24 distinct country silhouettes from the existing Natural Earth source; previous sets stay available for saved rounds. No change to songs' text-clue presentation or audio availability.

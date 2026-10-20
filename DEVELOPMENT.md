# Run Munu Qaddha

The game is a buildless static application. Its playable entry point is
`dist/index.html`; the main application JavaScript, CSS and question bank are
embedded there. Python 3 and Node.js are sufficient; there is no npm install,
database, production sign-in service or build step.

From the repository root:

```sh
python3 -m http.server 8080 --bind 0.0.0.0 --directory dist
```

Use the development platform's web preview or HTTP port forwarding for port
8080 when that capability is available. Starting this command alone does not
create a browser preview or public website. Opening the HTML as `file://` does
not resolve its root-relative artwork, map and sound paths correctly.

## Checks

Run these from the repository root:

```sh
node tests/question-bank.cjs
node tests/no-repeat.cjs
node tests/letters-languages.cjs
node tests/host-controls.cjs
node tests/sound-category.cjs
node tests/letters.cjs
node tests/poster-board.cjs
node tests/geography.cjs
node tests/expansion-oct3.cjs
```

All nine checks passed after import. Browser smoke checks also verified question
reveal, scoring, saved rounds across reloads, English letter play and saved
progress, memory-game completion, and mobile home rendering. Browser automation
checks behavior; it does not provide a user-visible interactive preview.

The historical tests have these limitations:

- `tests/refresh.cjs` expects at least 24 questions in every category; 19 current
  categories contain six questions.
- `tests/removed-category.cjs` expects the letters menu section to be absent;
  the current reference menu includes independent letter games in that section.
- `tests/reference-menu.cjs` reads `git show HEAD:questions.json`. An import
  commit supplies a local comparison baseline, but does not restore the earlier
  source Git history omitted from the uploaded package. Do not interpret that
  comparison as proof of preservation against the omitted original history.

## Import provenance

All 397 files from the uploaded package's `Munu-Qaddha/project/` directory were
copied byte-for-byte to the repository root, including the 326 files in `dist/`.
The repository's existing `README.md` was preserved. The original ZIP SHA256 is
`e00df74eac7ca3d21328ee54d89e30f3c708f835e00cfcf9ca81c51b4404b739`.

`.openai/hosting.json` is retained historical metadata. It does not authorize
deployment to the old hosting project. Data-refresh scripts can rewrite the
question bank and embedded application; inspect them before running them.

# font.gl TODO

## From the bug-fix pass (2026-10-08)

Open work left after the fix-and-improve pass recorded in `CHANGELOG.md` (Unreleased).

### Release

- [ ] Commit the Unreleased changes on `dev`.
- [ ] Run `npm ci && npm run lint && npm run typecheck && npm run build` in a clean checkout. The pass was verified with the `node_modules` of `hue.gl` / `unit.gl` (low disk space), not with this repo's own install.
- [ ] Pick the next version. Renaming `AlvaradoVar.ttf` to `alvarado-variable.ttf` and replacing the Sass entry point are breaking, but no earlier release shipped any fonts or styles (the old `files` glob matched nothing in `dist/`), so `0.1.0` is enough.
- [ ] Tag the release and check the publish workflow (Node 22, new lint step) on GitHub.

### Licensing

- [ ] Alvarado's `OFL.txt` is the foundry's file verbatim and has no copyright line. Neither the font nor `Alvarado.glyphs` contains one (the Glyphs source only names Hector Torres as designer). Ask Primary Foundry / Hector Torres for the copyright notice and add it to the top of `src/font/alvarado/OFL.txt`.
- [ ] Align copyright notices: `LICENSE` and `doc/legal/license.md` say "2024 Scape Press", the README says "2025 Scape Press BV", `mkdocs.yml` says 2024.

### Verification

- [ ] Open `dist/html/index.html` after a build and check the font tester in a browser (font switch, weight/italic sliders, Alvarado axes). Only its script syntax was checked.
- [ ] Check that the dev container builds (`.devcontainer/` now uses Node 22 and drops the missing `requirements.txt`).

### Improvements

- [ ] Add Sass tests for the mixins and the configuration paths (`$font-path`, `$font-formats`, unknown-font error), like `unit.gl`'s `test/scss.test.mjs`.
- [ ] Decide on `src/ts/`: it only holds `export {}`. Either export a typed font catalogue (keys, families, axes, file paths) with a JS build (`tsup`, as in `hue.gl`), or remove the TypeScript layer.
- [ ] Replace the placeholder entries in `AUTHORS` and `CONTRIBITORS.md` (filename typo is shared with other Stylescape repos).
- [ ] Fill or drop the empty `doc/resources/glossary.md`.

### Upstream

- [ ] kist `PackageManagerAction` always merges its defaults (`main: js/index.js`, `types: js/index.d.ts`) and offers no way to remove a field, so `dist/package.json` carries `"types": null`. Add an option to drop default fields, then remove `types: null` from `kist.yml`.

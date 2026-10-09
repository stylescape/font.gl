# font.gl TODO

## From the bug-fix pass (2026-10-08)

Open work left after the fix-and-improve pass recorded in `CHANGELOG.md` (Unreleased).

### Release

- [ ] Commit the Unreleased changes on `dev`.
- [ ] Run `npm ci && npm run lint && npm run typecheck && npm run build` in a clean checkout. The pass was verified with the `node_modules` of `hue.gl` / `unit.gl` (low disk space), not with this repo's own install. (2026-10-09: `npm run lint`, `typecheck`, `test` and `build:css` pass with this repo's own `node_modules`; the full kist `npm run build` passes too and leaves `dist/` in sync with the sources; only `npm ci` was not run.)
- [ ] Pick the next version. Renaming `AlvaradoVar.ttf` to `alvarado-variable.ttf` and replacing the Sass entry point are breaking, but no earlier release shipped any fonts or styles (the old `files` glob matched nothing in `dist/`), so `0.1.0` is enough.
- [ ] Tag the release and check the publish workflow (Node 22, new lint step) on GitHub.

### Licensing

- [ ] Alvarado's `OFL.txt` is the foundry's file verbatim and has no copyright line. Neither the font nor `Alvarado.glyphs` contains one (the Glyphs source only names Hector Torres as designer). Ask Primary Foundry / Hector Torres for the copyright notice and add it to the top of `src/font/alvarado/OFL.txt`.
- [ ] Align copyright notices: `LICENSE` and `doc/legal/license.md` say "2024 Scape Press", the README says "2025 Scape Press BV", `mkdocs.yml` says 2024.

### Verification

- [ ] Check that the dev container builds (`.devcontainer/` now uses Node 22 and drops the missing `requirements.txt`). (2026-10-09: not built, no Docker here. Likely failure: `devcontainer.json` sets the build context to `.devcontainer/`, so the `Dockerfile`'s `COPY package*.json ./` and `COPY . .` see no project files and `RUN npm install` has no `package.json`. The workspace is bind-mounted and `postCreateCommand` already runs `npm install`, so dropping those three lines, or setting `"context": ".."`, should fix it.)

### Improvements

- [ ] Decide on `src/ts/`: it only holds `export {}`. Either export a typed font catalogue (keys, families, axes, file paths) with a JS build (`tsup`, as in `hue.gl`), or remove the TypeScript layer.
- [ ] Replace the placeholder entries in `AUTHORS` and `CONTRIBITORS.md` (filename typo is shared with other Stylescape repos).
- [ ] Fill or drop the empty `doc/resources/glossary.md`.

### Upstream

- [x] kist `PackageManagerAction` offered no way to remove a default field, so `dist/package.json` carried `"types": null`. Fixed in kist 0.1.81 (now the devDependency): a `null` in `customConfig` drops the key. Keep `types: null` in `kist.yml`; the next build omits `types`.

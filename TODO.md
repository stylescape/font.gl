# font.gl TODO

## From the bug-fix pass (2026-10-08)

Open work left after the fix-and-improve pass recorded in `CHANGELOG.md` (0.1.0).

### Release

- [x] Commit the Unreleased changes on `dev`. (05b560e)
- [x] Run `npm ci && npm run lint && npm run typecheck && npm run build` in a clean checkout. (2026-10-09: all pass in a fresh clone with its own `npm ci`, plus `npm test`; the build only refreshed the stale `"types": null` in `dist/package.json`.)
- [x] Pick the next version: `0.1.0`. Renaming `AlvaradoVar.ttf` and replacing the Sass entry point are breaking, but no earlier release shipped any fonts or styles.
- [ ] Tag `v0.1.0` on `dev` and push it; the tag triggers `publish_package.yml` (GitHub release + npm publish). Set `date-released` in `CITATION.cff` to the tag date first, then check the workflow run (Node 22, lint and test steps) on GitHub.
  - 2026-10-10 prep done: `CITATION.cff` `date-released` set to 2026-10-10 (it was a stale 2024-07-01; change it if the tag is cut on another day). `publish_package.yml` reviewed: triggers on `v<semver>` tags, Node 22.x, `npm clean-install`, lint, test, build, then GitHub release and `npm publish` from `dist/`. Locally on Node 22.22: `npm ci`, lint, typecheck, test (35 pass) and build pass; `npm pack --dry-run` in `dist/` lists 24 files (fonts, OFL.txts, css, js, scss, LICENSE, README), 309.7 kB. Remaining: commit the `CITATION.cff` change, tag and push `v0.1.0`, then check the workflow run on GitHub (needs the `PUBLISH_NPM_TOKEN` secret).

### Licensing

- [ ] Alvarado's `OFL.txt` is the foundry's file verbatim and has no copyright line. Neither the font nor `Alvarado.glyphs` contains one (the Glyphs source only names Hector Torres as designer). Ask Primary Foundry / Hector Torres for the copyright notice and add it to the top of `src/font/alvarado/OFL.txt`.
  - 2026-10-10: needs the foundry, so no notice has been invented. Email drafted (not sent) for Lars to send; the draft is outside the repo (session scratchpad `alvarado-copyright-email.txt`); the recipient address is still to be filled in. Once the foundry replies, add the notice to `OFL.txt` and tick this item.
- [x] Align copyright notices: `LICENSE`, `doc/legal/license.md`, the README and `mkdocs.yml` now all say "2024 Scape Press BV".

### Verification

- [x] Check that the dev container builds. (2026-10-09: built and started with `@devcontainers/cli`; `npm install`, `lint`, `typecheck`, `test` and `build` pass inside on Node 22. Fixed on the way: the `Dockerfile` no longer copies project files from the `.devcontainer/` build context, and `remoteUser` is `nodeuser`, the base image's user.)

### Improvements

- [x] Decide on `src/ts/`: it now exports a typed font catalogue (`fonts`, `fontKeys`, `fontStack`), compiled to `dist/js/` by kist's `TypeScriptCompilerAction` (no `tsup` dependency needed for one ESM file). `tst/catalogue.test.mjs` checks it against the Sass registry.
- [x] Replace the placeholder entries in `AUTHORS` and `CONTRIBITORS.md` (filename typo is shared with other Stylescape repos, so kept).
- [x] Fill the empty `doc/resources/glossary.md`.

### Upstream

- [x] kist `PackageManagerAction` offered no way to remove a default field, so `dist/package.json` carried `"types": null`. Fixed in kist 0.1.81 (now the devDependency): a `null` in `customConfig` drops the key. `kist.yml` now sets `types` to the JS declarations.

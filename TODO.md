# font.gl TODO

## From the bug-fix pass (2026-10-08)

Open work left after the fix-and-improve pass recorded in `CHANGELOG.md` (0.1.0).

### Release

- [ ] Tag `v0.1.0` on `dev` and push it; the tag triggers `publish_package.yml` (GitHub release + npm publish). Set `date-released` in `CITATION.cff` to the tag date first, then check the workflow run (Node 22, lint and test steps) on GitHub.
  - 2026-10-10 prep done: `CITATION.cff` `date-released` set to 2026-10-10 (it was a stale 2024-07-01; change it if the tag is cut on another day). `publish_package.yml` reviewed: triggers on `v<semver>` tags, Node 22.x, `npm clean-install`, lint, test, build, then GitHub release and `npm publish` from `dist/`. Locally on Node 22.22: `npm ci`, lint, typecheck, test (35 pass) and build pass; `npm pack --dry-run` in `dist/` lists 24 files (fonts, OFL.txts, css, js, scss, LICENSE, README), 309.7 kB. Remaining: commit the `CITATION.cff` change, tag and push `v0.1.0`, then check the workflow run on GitHub (needs the `PUBLISH_NPM_TOKEN` secret).

### Licensing

- [ ] Alvarado's `OFL.txt` is the foundry's file verbatim and has no copyright line. Neither the font nor `Alvarado.glyphs` contains one (the Glyphs source only names Hector Torres as designer). Ask Primary Foundry / Hector Torres for the copyright notice and add it to the top of `src/font/alvarado/OFL.txt`.
  - 2026-10-10: needs the foundry, so no notice has been invented. Email drafted (not sent) for Lars to send; the draft is outside the repo (session scratchpad `alvarado-copyright-email.txt`); the recipient address is still to be filled in. Once the foundry replies, add the notice to `OFL.txt` and tick this item.

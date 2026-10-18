# font.gl TODO

## From the bug-fix pass (2026-10-08)

Open work left after the fix-and-improve pass recorded in `CHANGELOG.md` (0.1.0).

### Release

- [ ] Publish 0.1.0 to npm. `v0.1.0` is tagged and its GitHub Release exists (2026-10-18), but the workflow's `npm publish` failed with E404: the org secret `PUBLISH_NPM_TOKEN` (2024-09-05) can no longer publish, and `font.gl` does not exist on npm yet. Publish once by hand (`npm login`, then `npm ci && npm run build && cd dist && npm publish --access public`), then configure the trusted publisher on npmjs.com (font.gl > Settings > Trusted publishing > GitHub Actions: organization `stylescape`, repository `font.gl`, workflow `publish_package.yml`, no environment). **2026-10-18:** `publish_package.yml` now uses npm trusted publishing (OIDC, `npm publish --provenance`, no token), so later tags publish without a secret.

### Licensing

- [ ] Alvarado's `OFL.txt` is the foundry's file verbatim and has no copyright line. Neither the font nor `Alvarado.glyphs` contains one (the Glyphs source only names Hector Torres as designer). Ask Primary Foundry / Hector Torres for the copyright notice and add it to the top of `src/font/alvarado/OFL.txt`.
  - 2026-10-10: needs the foundry, so no notice has been invented. Email drafted (not sent) for Lars to send; the draft is outside the repo (session scratchpad `alvarado-copyright-email.txt`); the recipient address is still to be filled in. Once the foundry replies, add the notice to `OFL.txt` and tick this item.

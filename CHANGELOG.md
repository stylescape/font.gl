# Changelog

## Unreleased

### Fixed

- Published package shipped no fonts or styles: `dist/package.json` inherited repo-relative `files`/`main` paths (`dist/font/**`, `src/scss/index.scss`) that match nothing inside `dist/`.
- `src/scss/index.scss` imported ~15 Stylescape partials that don't exist, so it never compiled; CSS build steps were disabled as a result.
- `font-smoothing` mixin emitted quoted values (invalid CSS) and an invalid `antialiased` value for `-moz-osx-font-smoothing`.
- Font tester page called jQuery UI without loading it and showed Google Fonts instead of the bundled fonts.
- Font tester: slider readouts failed WCAG contrast (2.6:1), and the sample text was clipped at large sizes; the sample now grows with its text.
- Dev container README still described the Node 18 image and the `requirements.txt` install.
- `npm run dev/serve/start/build:webpack` referenced a missing `webpack.config.js`.
- Publish workflow used Node 18, below what the dev toolchain requires.
- Docs workflow: unquoted `mkdocstrings[python]>=0.18` was parsed as a shell redirect, dropping the version constraint.
- Docs site: invalid top-level `lang` key failed `mkdocs build --strict`; logo path pointed to a non-existent file; edit links missed the `edit/<branch>/` prefix.
- Linting silently did nothing: ESLint 10 ignores `.eslintrc`, and `|| true` masked the failure.
- Dev container set both `image` and `build`, used Node 18, and ran `pip3 install -r requirements.txt` against a missing file.
- VS Code launch configs started a non-existent `index.js` and `npm start`.
- README license section claimed CC BY 4.0 / Apache 2.0, contradicting the MIT `LICENSE`; it now separates the MIT code license from the per-font licenses.
- CodeQL only ran for `main`, not the default branch `dev`.
- Docs license page named another project ("rite") and copyright holder; it now matches `LICENSE` and states that fonts keep their own licenses.
- `tsconfig.json` failed under TypeScript 6 (deprecated `downlevelIteration`).

### Added

- Sass API: font registry, `$font-path` / `$font-display` / `$font-formats` settings, `font-face`, `font-faces`, `font` mixins and `font-stack` function.
- Compiled `css/font.gl.css` and `css/font.gl.min.css` with `@font-face` rules, `--font-*` custom properties and `.font-*` utilities.
- WOFF2 files for Quicksand and Alvarado.
- Alvarado axis control through `--font-alvarado-wght` / `--font-alvarado-ital`.
- ESLint flat config (`eslint.config.js`) and stylelint for the Sass sources; `npm run lint` now runs both and gates the publish workflow.
- `npm run typecheck`, which the agent instructions already referenced.
- `npm test`: Sass tests (`test/scss.test.mjs`, Node's built-in test runner) for the generated `@font-face` rules, custom properties and utilities, the `$font-path` / `$font-formats` / `$font-display` / `$fonts` / emit settings, and the unknown-font and font-smoothing errors. The publish workflow already runs `npm run test --if-present`.
- Specifications page: bundled fonts, package layout, Sass settings and API.
- `.gitattributes` marks font files as binary.
- `OFL.txt` for Manrope, Quicksand and Alvarado (required by the OFL; Alvarado's is the foundry's file verbatim), shipped in the package next to the fonts.

### Changed

- Renamed `AlvaradoVar.ttf` to `alvarado-variable.ttf`.
- Removed unused webpack/Babel toolchain and committed TypeScript build output.

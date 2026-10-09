# Specifications

## Fonts

| Key         | Family    | Classification | Axes                       | Designer          | License                                           |
| ----------- | --------- | -------------- | -------------------------- | ----------------- | ------------------------------------------------- |
| `manrope`   | Manrope   | Sans-serif     | `wght` 200–800             | Mikhail Sharanda  | [SIL OFL 1.1](https://openfontlicense.org/)       |
| `quicksand` | Quicksand | Rounded sans   | `wght` 300–700             | Andrew Paglinawan | [SIL OFL 1.1](https://openfontlicense.org/)       |
| `alvarado`  | Alvarado  | Serif          | `wght` 0–100, `ital` 0–100 | Hector Torres     | [SIL OFL 1.1](https://openfontlicense.org/)       |

Each font ships as `font/<key>/<key>-variable.woff2` and `.ttf`.

## Package layout

| Path                  | Contents                                                     |
| --------------------- | ------------------------------------------------------------ |
| `css/font.gl.css`     | `@font-face` rules, `--font-*` properties, `.font-*` classes |
| `css/font.gl.min.css` | Same, minified                                               |
| `scss/index.scss`     | Configurable stylesheet (emits the CSS above)                |
| `scss/font.scss`      | Settings, functions and mixins only (emits nothing)          |
| `font/`               | Font files                                                   |

## Sass settings

All settings are `!default` and can be set with `@use "pkg:font.gl" with (...)`.

| Setting                 | Default                                   | Purpose                                         |
| ----------------------- | ----------------------------------------- | ----------------------------------------------- |
| `$font-path`            | `"../font"`                               | Font directory URL, relative to the CSS file    |
| `$font-display`         | `swap`                                    | `font-display` of every `@font-face`            |
| `$font-formats`         | `("woff2": "woff2", "ttf": "truetype")`   | Extensions and `format()` hints, in order       |
| `$font-emit-properties` | `true`                                    | Emit `--font-<key>` on `:root`                  |
| `$font-emit-utilities`  | `true`                                    | Emit `.font-<key>` and `.font-smooth`           |
| `$fonts`                | all bundled fonts                         | Registry; override to ship a subset             |

## Sass API

| Member                         | Kind     | Description                                                     |
| ------------------------------ | -------- | --------------------------------------------------------------- |
| `font($key)`                   | function | Registry entry for `$key`; errors on unknown keys               |
| `font-stack($key)`             | function | Family plus fallback stack                                      |
| `font-face($key, $path)`       | mixin    | One `@font-face` rule                                           |
| `font-faces($path)`            | mixin    | `@font-face` rules for every registered font                    |
| `font($key)`                   | mixin    | `font-family`, plus `font-variation-settings` for custom axes   |
| `font-smoothing($type)`        | mixin    | `antialiased` (default), `subpixel-antialiased`, `auto`, `none` |

## Alvarado axes

Alvarado's `wght` axis runs 0–100 (Light 0, Regular 25, Medium 50, Bold 100) and its `ital` axis 0–100. Neither maps onto CSS `font-weight` / `font-style`, so `.font-alvarado` and `@include font.font("alvarado")` read them from custom properties:

``` css
.title {
    --font-alvarado-wght: 100; /* Bold */
    --font-alvarado-ital: 100; /* Italic */
}
```

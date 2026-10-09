<p align="center">
    <img src="https://raw.githubusercontent.com/stylescape/brand/master/src/logo/logo-transparant.png" width="20%" alt="Stylescape Logo">
</p>
<h1 align="center" style='border-bottom: none;'>font.gl</h1>
<h3 align="center">Variable Font Collection</h3>

<br/>

<div align="center">

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.font.gl&up_message=Up&up_color=%23000000&down_message=Down&down_color=%23000000&style=flat-square&logo=Firefox&logoColor=FFFFFF&label=Website&labelColor=%23000000&color=%23000000)
](https://www.font.gl)
[![NPM Version](https://img.shields.io/npm/v/font.gl?style=flat-square&logo=npm&logoColor=FFFFFF&label=NPM&labelColor=%23000000&color=%23000000&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffont.gl)](https://www.npmjs.com/package/font.gl)
[![devContainer](https://img.shields.io/badge/devContainer-23354351?style=flat-square&logo=Docker&logoColor=%23FFFFFF&labelColor=%23000000&color=%23000000)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/stylescape/font.gl)
[![StackBlitz](https://img.shields.io/badge/StackBlitz-23354351?style=flat-square&logo=StackBlitz&logoColor=%23FFFFFF&labelColor=%23000000&color=%23000000)](https://stackblitz.com/github/stylescape/font.gl/tree/main?file=src%2Findex.html)
[![GitHub License](https://img.shields.io/github/license/stylescape/font.gl?style=flat-square&logo=readthedocs&logoColor=FFFFFF&label=&labelColor=%23000000&color=%23000000&link=LICENSE)](https://github.com/stylescape/font.gl/blob/main/LICENSE)

</div>

<div align="center">

[![Report a Bug](https://img.shields.io/badge/Report%20a%20Bug-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/font.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=bug_report.yml)
[![Request a Feature](https://img.shields.io/badge/Request%20a%20Feature-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/font.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=feature_request.yml)
[![Ask a Question](https://img.shields.io/badge/Ask%20a%20Question-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/font.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=question.yml)
[![Make a Suggestion](https://img.shields.io/badge/Make%20a%20Suggestion-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/font.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=suggestion.yml)
[![Start a Discussion](https://img.shields.io/badge/Start%20a%20Discussion-GitHub?style=flat-square&&logoColor=%23FFFFFF&color=%23D2D9DF)](https://github.com/stylescape/font.gl/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&projects=&template=discussion.yml)

</div>

---

<br/>

**Curated Open-Source Variable Font Library by Scape Press**

## Overview

**font.gl** is a curated collection of open-source variable fonts by Scape Press, packaged for the web: WOFF2 + TTF files, a ready-to-use stylesheet, and a Sass API to generate exactly the `@font-face` rules you need.

## Fonts

| Key         | Family    | Classification | Weight axis               | Designer          | License                                              |
| ----------- | --------- | -------------- | ------------------------- | ----------------- | ---------------------------------------------------- |
| `manrope`   | Manrope   | Sans-serif     | `wght` 200–800            | Mikhail Sharanda  | [SIL OFL 1.1](src/font/manrope/OFL.txt)              |
| `quicksand` | Quicksand | Rounded sans   | `wght` 300–700            | Andrew Paglinawan | [SIL OFL 1.1](src/font/quicksand/OFL.txt)            |
| `alvarado`  | Alvarado  | Serif          | `wght` 0–100, `ital` 0–100 | Hector Torres     | [SIL OFL 1.1](src/font/alvarado/OFL.txt)             |

## Installation

``` bash
npm i font.gl
```

## Usage

### CSS

Link the compiled stylesheet. It declares every font, exposes `--font-<key>` custom properties and `.font-<key>` utility classes, and expects the `font/` directory next to `css/` (as shipped):

``` html
<link rel="stylesheet" href="node_modules/font.gl/css/font.gl.css">

<h1 class="font-manrope">Hello</h1>
<p style="font-family: var(--font-quicksand)">World</p>
```

### Sass

Configure the stylesheet on import — for example when you serve the font files from your own path:

``` scss
@use "pkg:font.gl" with (
    $font-path: "/assets/fonts",        // default: "../font"
    $font-display: swap,
    $font-formats: ("woff2": "woff2"),  // drop the TTF fallback
    $font-emit-utilities: false,
);
```

Or use only the functions and mixins, which emit no CSS on their own:

``` scss
@use "pkg:font.gl/scss/font" as font;

@include font.font-face("manrope");

body {
    @include font.font("manrope");      // font-family stack
    @include font.font-smoothing;       // antialiased / grayscale
    font-weight: 600;
}
```

`pkg:` URLs need Dart Sass with the Node package importer (`--pkg-importer=node`, or `importers: [new NodePackageImporter()]`).

### Alvarado

Alvarado's axes don't follow the CSS scales (`wght` runs 0–100: Light 0, Regular 25, Medium 50, Bold 100), so `font-weight` and `font-style` can't reach them. `.font-alvarado` and `@include font.font("alvarado")` drive the axes through custom properties instead:

``` css
.title {
    --font-alvarado-wght: 100;  /* Bold */
    --font-alvarado-ital: 100;  /* Italic */
}
```

## Development

``` bash
npm run build      # kist: CSS, Sass, fonts and dist/package.json into dist/
```

`dist/` is the published package root. Open `dist/html/index.html` after a build for an interactive font tester.

---

## Colophon

### Authors

**font.gl** is an open-source project by **[Scape Press](https://www.scape.press "Scape Press website")**.

#### Scape Press

Scape Press is a spatial innovation collective that dreams, discovers and designs the everyday of tomorrow. We blend design thinking with emerging technologies to create a brighter perspective for people and planet. Our products and services naturalise technology in liveable and sustainable –scapes that spark the imagination and inspire future generations.

- website: [scape.press](https://www.scape.press "Scape Press website")
- github: [github.com/stylescape](https://github.com/stylescape "Scape Press GitHub")

### Development Resources

#### Contributing

We'd love for you to contribute and to make this project even better than it is today!
Please refer to the [contribution guidelines](.github/CONTRIBUTING.md) for information.

### Legal Information

#### Copyright

Copyright &copy; 2025 [Scape Press BV](https://www.scape.press/ "Scape Press website"). All Rights Reserved.

#### License

The font.gl code (Sass, build configuration, demo) is licensed under the [MIT License](LICENSE).

The bundled fonts are **not** covered by the MIT License; each keeps its own license, shipped next to the font files:

- Manrope — [SIL Open Font License 1.1](src/font/manrope/OFL.txt)
- Quicksand — [SIL Open Font License 1.1](src/font/quicksand/OFL.txt), with Reserved Font Name "Quicksand"
- Alvarado — [SIL Open Font License 1.1](src/font/alvarado/OFL.txt), published by [Primary Foundry](https://primary-foundry.com/typefaces/alvarado/)

#### Disclaimer

**THIS SOFTWARE IS PROVIDED AS IS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

<p align="center">
    <b>Made with ❤️ by <a href="https://www.scape.press" target="_blank">Scape Press</a></b>
</p>

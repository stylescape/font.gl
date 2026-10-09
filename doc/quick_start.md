# Quick Start

## Installation

``` bash
npm i font.gl
```

## CSS

``` html
<link rel="stylesheet" href="node_modules/font.gl/css/font.gl.css">

<h1 class="font-manrope">Hello</h1>
<p style="font-family: var(--font-quicksand)">World</p>
```

The stylesheet expects the `font/` directory next to `css/`, as shipped in the package.

## Sass

``` scss
@use "pkg:font.gl" with ($font-path: "/assets/fonts");
```

Mixins and functions only (no CSS output):

``` scss
@use "pkg:font.gl/scss/font" as font;

body {
    @include font.font("manrope");
    @include font.font-smoothing;
}
```

See the [README](https://github.com/stylescape/font.gl#readme) for all settings and the bundled fonts.

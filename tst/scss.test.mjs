// =============================================================================
// Sass tests
// =============================================================================
//
// Compiles small stylesheets against `src/scss/` and checks the CSS output.
// Uses Node's built-in test runner and the `sass` dev dependency, so no extra
// packages are needed. Run with `npm test`.

import assert from 'node:assert/strict'
import { dirname, resolve } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import { compileString } from 'sass'

const here = dirname(fileURLToPath(import.meta.url))
const loadPaths = [resolve(here, '../src/scss')]

const compile = (source) => compileString(source, { loadPaths }).css

const count = (css, pattern) => (css.match(pattern) ?? []).length

describe('index.scss (defaults)', () => {
    const css = compile('@use "index";')

    it('emits one @font-face per registered font', () => {
        assert.equal(count(css, /@font-face/g), 3)
        for (const family of ['Manrope', 'Quicksand', 'Alvarado']) {
            assert.match(css, new RegExp(`font-family: "${family}";`))
        }
    })

    it('references woff2 then ttf under ../font/<key>/', () => {
        assert.match(
            css,
            /src: url\("\.\.\/font\/manrope\/manrope-variable\.woff2"\) format\("woff2"\), url\("\.\.\/font\/manrope\/manrope-variable\.ttf"\) format\("truetype"\);/,
        )
        assert.match(css, /font-display: swap;/)
        assert.match(css, /font-weight: 200 800;/)
    })

    it('emits --font-* custom properties', () => {
        assert.match(css, /--font-manrope: "Manrope", ui-sans-serif, system-ui, sans-serif;/)
        assert.match(css, /--font-alvarado: "Alvarado", ui-serif, "Georgia", serif;/)
    })

    it('emits .font-* utilities with Alvarado axis settings', () => {
        assert.match(css, /\.font-quicksand \{\s*font-family: "Quicksand"/)
        assert.match(
            css,
            /\.font-alvarado \{[^}]*font-variation-settings: "wght" var\(--font-alvarado-wght, 25\), "ital" var\(--font-alvarado-ital, 0\);/,
        )
        assert.doesNotMatch(css, /\.font-manrope \{[^}]*font-variation-settings/)
    })

    it('emits .font-smooth', () => {
        assert.match(
            css,
            /\.font-smooth \{\s*-webkit-font-smoothing: antialiased;\s*-moz-osx-font-smoothing: grayscale;/,
        )
    })
})

describe('configuration', () => {
    it('$font-path changes every src URL', () => {
        const css = compile('@use "index" with ($font-path: "/assets/fonts");')
        assert.equal(count(css, /url\("\/assets\/fonts\//g), 6)
        assert.doesNotMatch(css, /\.\.\/font\//)
    })

    it('$font-formats limits and orders the src list', () => {
        const css = compile('@use "index" with ($font-formats: ("ttf": "truetype"));')
        assert.doesNotMatch(css, /woff2/)
        assert.equal(count(css, /format\("truetype"\)/g), 3)
    })

    it('$font-display is applied to every rule', () => {
        const css = compile('@use "index" with ($font-display: optional);')
        assert.equal(count(css, /font-display: optional;/g), 3)
    })

    it('$font-emit-properties and $font-emit-utilities turn output off', () => {
        const css = compile(
            '@use "index" with ($font-emit-properties: false, $font-emit-utilities: false);',
        )
        assert.equal(count(css, /@font-face/g), 3)
        assert.doesNotMatch(css, /:root/)
        assert.doesNotMatch(css, /\.font-/)
    })

    it('$fonts can be overridden to ship a subset', () => {
        const css = compile(`@use "index" with ($fonts: (
            "manrope": (family: "Manrope", file: "manrope-variable", fallback: (sans-serif,), weight: 200 800),
        ));`)
        assert.equal(count(css, /@font-face/g), 1)
        assert.doesNotMatch(css, /Quicksand|Alvarado/)
    })
})

describe('font.scss (library)', () => {
    it('produces no CSS on its own', () => {
        assert.equal(compile('@use "font";').trim(), '')
    })

    it('font-face takes an explicit path', () => {
        const css = compile('@use "font"; @include font.font-face("quicksand", "/f");')
        assert.match(css, /url\("\/f\/quicksand\/quicksand-variable\.woff2"\)/)
        assert.equal(count(css, /@font-face/g), 1)
    })

    it('font-faces passes its path to every rule', () => {
        const css = compile('@use "font"; @include font.font-faces("/f");')
        assert.equal(count(css, /url\("\/f\//g), 6)
    })

    it('font-stack returns family and fallback', () => {
        const css = compile('@use "font"; a { font-family: font.font-stack("quicksand"); }')
        assert.match(
            css,
            /font-family: "Quicksand", ui-rounded, ui-sans-serif, system-ui, sans-serif;/,
        )
    })

    it('font-smoothing maps non-antialiased types to auto on Firefox', () => {
        const css = compile(
            '@use "font"; a { @include font.font-smoothing(subpixel-antialiased); }',
        )
        assert.match(
            css,
            /-webkit-font-smoothing: subpixel-antialiased;\s*-moz-osx-font-smoothing: auto;/,
        )
    })

    it('font-smoothing accepts a quoted value', () => {
        const css = compile('@use "font"; a { @include font.font-smoothing("antialiased"); }')
        assert.match(css, /-webkit-font-smoothing: antialiased;/)
    })
})

describe('errors', () => {
    it('unknown font key', () => {
        assert.throws(
            () => compile('@use "font"; a { @include font.font("helvetica"); }'),
            /font\.gl: unknown font `helvetica`\. Available: manrope, quicksand, alvarado\./,
        )
    })

    it('unknown font key in font-face and font-stack', () => {
        assert.throws(
            () => compile('@use "font"; @include font.font-face("nope");'),
            /unknown font `nope`/,
        )
        assert.throws(
            () => compile('@use "font"; a { b: font.font-stack("nope"); }'),
            /unknown font `nope`/,
        )
    })

    it('unknown font-smoothing type', () => {
        assert.throws(
            () => compile('@use "font"; a { @include font.font-smoothing(blurry); }'),
            /font-smoothing: unknown type `blurry`/,
        )
    })
})

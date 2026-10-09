// =============================================================================
// Font catalogue tests
// =============================================================================
//
// Checks that the typed catalogue in `src/ts/index.ts` matches the Sass
// registry and the files on disk. Imports the TypeScript source directly
// (Node's type stripping), so no build is needed. Run with `npm test`.

import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import { compileString } from 'sass'

import { fontKeys, fonts, fontStack } from '../src/ts/index.ts'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const css = compileString('@use "index";', {
    loadPaths: [resolve(root, 'src/scss')],
}).css

// Catalogue paths are relative to the package root (dist/), whose `font/`
// is a copy of `src/font/`.
const source = (path) => resolve(root, 'src', path)

describe('font catalogue', () => {
    it('lists every font the Sass registry emits', () => {
        const families = [...css.matchAll(/@font-face \{\s*font-family: "([^"]+)"/g)].map(
            (m) => m[1],
        )
        assert.deepEqual(
            fontKeys.map((key) => fonts[key].family),
            families,
        )
    })

    for (const key of fontKeys) {
        const font = fonts[key]

        it(`${key}: key matches its registry entry`, () => {
            assert.equal(font.key, key)
        })

        it(`${key}: fontStack() matches --font-${key}`, () => {
            assert.ok(css.includes(`--font-${key}: ${fontStack(key)};`))
        })

        it(`${key}: weight matches @font-face`, () => {
            const face = css.match(
                new RegExp(`@font-face \\{[^}]*font-family: "${font.family}";[^}]*\\}`),
            )
            assert.ok(face, `no @font-face for ${font.family}`)
            assert.match(face[0], new RegExp(`font-weight: ${font.weight.join(' ')};`))
        })

        it(`${key}: variation defaults match .font-${key}`, () => {
            const settings = Object.entries(font.variationDefaults ?? {})
                .map(([tag, value]) => `"${tag}" var(--font-${key}-${tag}, ${value})`)
                .join(', ')
            const rule = css.match(new RegExp(`\\.font-${key} \\{[^}]*\\}`))
            assert.ok(rule, `no .font-${key} rule`)
            if (settings) {
                assert.ok(rule[0].includes(`font-variation-settings: ${settings};`))
            } else {
                assert.doesNotMatch(rule[0], /font-variation-settings/)
            }
        })

        it(`${key}: files exist`, () => {
            for (const path of [font.files.woff2, font.files.ttf, font.licenseFile]) {
                assert.ok(existsSync(source(path)), `missing ${path}`)
            }
        })
    }
})

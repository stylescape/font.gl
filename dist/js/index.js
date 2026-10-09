// ============================================================================
// font.gl | Font Catalogue
// ============================================================================
// Typed mirror of the Sass registry in `src/scss/maps/_fonts.scss`, for
// JavaScript consumers (build tools, font pickers, preloading). Keep both in
// sync: `tst/catalogue.test.mjs` compares this catalogue with the CSS that the
// Sass registry emits.
//
// File paths are relative to the package root, e.g.
// `font.gl/font/manrope/manrope-variable.woff2`.
// ============================================================================
export const fonts = {
    manrope: {
        key: 'manrope',
        family: 'Manrope',
        classification: 'Sans-serif',
        designer: 'Mikhail Sharanda',
        license: 'OFL-1.1',
        fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        weight: [200, 800],
        axes: [{ tag: 'wght', min: 200, default: 200, max: 800 }],
        files: {
            woff2: 'font/manrope/manrope-variable.woff2',
            ttf: 'font/manrope/manrope-variable.ttf',
        },
        licenseFile: 'font/manrope/OFL.txt',
    },
    quicksand: {
        key: 'quicksand',
        family: 'Quicksand',
        classification: 'Rounded sans',
        designer: 'Andrew Paglinawan',
        license: 'OFL-1.1',
        fallback: ['ui-rounded', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        weight: [300, 700],
        axes: [{ tag: 'wght', min: 300, default: 300, max: 700 }],
        files: {
            woff2: 'font/quicksand/quicksand-variable.woff2',
            ttf: 'font/quicksand/quicksand-variable.ttf',
        },
        licenseFile: 'font/quicksand/OFL.txt',
    },
    // Alvarado's `wght` axis runs 0–100 (Light 0, Regular 25, Medium 50,
    // Bold 100), so `font-weight` cannot reach it; `weight` starts at 1
    // because CSS rejects `font-weight: 0`.
    alvarado: {
        key: 'alvarado',
        family: 'Alvarado',
        classification: 'Serif',
        designer: 'Hector Torres',
        license: 'OFL-1.1',
        fallback: ['ui-serif', 'Georgia', 'serif'],
        weight: [1, 100],
        axes: [
            { tag: 'wght', min: 0, default: 0, max: 100 },
            { tag: 'ital', min: 0, default: 0, max: 100 },
        ],
        variationDefaults: { wght: 25, ital: 0 },
        files: {
            woff2: 'font/alvarado/alvarado-variable.woff2',
            ttf: 'font/alvarado/alvarado-variable.ttf',
        },
        licenseFile: 'font/alvarado/OFL.txt',
    },
};
export const fontKeys = Object.keys(fonts);
// Generic families and `system-ui`-style keywords must stay unquoted.
const isKeyword = (name) => /^[a-z-]+$/.test(name);
/**
 * CSS `font-family` value for `key`, matching the Sass `font-stack()`
 * function and the `--font-<key>` custom property.
 */
export function fontStack(key) {
    const { family, fallback } = fonts[key];
    return [family, ...fallback].map((name) => (isKeyword(name) ? name : `"${name}"`)).join(', ');
}

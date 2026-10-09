/** A variation axis as declared in the font's `fvar` table. */
export interface FontAxis {
    /** Four-letter axis tag, e.g. `wght`. */
    readonly tag: string;
    readonly min: number;
    readonly default: number;
    readonly max: number;
}
/** One bundled variable font. */
export interface Font {
    /** Registry key: directory name, `--font-<key>` and `.font-<key>` suffix. */
    readonly key: string;
    /** CSS family name used in `@font-face`. */
    readonly family: string;
    readonly classification: string;
    readonly designer: string;
    /** SPDX license identifier of the font files. */
    readonly license: string;
    /** Stack appended after the family. */
    readonly fallback: readonly string[];
    /** `font-weight` range declared in `@font-face`. */
    readonly weight: readonly [number, number];
    /** Axes of the font file. */
    readonly axes: readonly FontAxis[];
    /**
     * Axes driven through `font-variation-settings` and
     * `--font-<key>-<tag>` custom properties, with their default values.
     * Only set for fonts whose axes are not on the CSS scales.
     */
    readonly variationDefaults?: Readonly<Record<string, number>>;
    /** Font files by extension, relative to the package root. */
    readonly files: {
        readonly woff2: string;
        readonly ttf: string;
    };
    /** License text, relative to the package root. */
    readonly licenseFile: string;
}
export declare const fonts: {
    readonly manrope: {
        readonly key: "manrope";
        readonly family: "Manrope";
        readonly classification: "Sans-serif";
        readonly designer: "Mikhail Sharanda";
        readonly license: "OFL-1.1";
        readonly fallback: readonly ["ui-sans-serif", "system-ui", "sans-serif"];
        readonly weight: readonly [200, 800];
        readonly axes: readonly [{
            readonly tag: "wght";
            readonly min: 200;
            readonly default: 200;
            readonly max: 800;
        }];
        readonly files: {
            readonly woff2: "font/manrope/manrope-variable.woff2";
            readonly ttf: "font/manrope/manrope-variable.ttf";
        };
        readonly licenseFile: "font/manrope/OFL.txt";
    };
    readonly quicksand: {
        readonly key: "quicksand";
        readonly family: "Quicksand";
        readonly classification: "Rounded sans";
        readonly designer: "Andrew Paglinawan";
        readonly license: "OFL-1.1";
        readonly fallback: readonly ["ui-rounded", "ui-sans-serif", "system-ui", "sans-serif"];
        readonly weight: readonly [300, 700];
        readonly axes: readonly [{
            readonly tag: "wght";
            readonly min: 300;
            readonly default: 300;
            readonly max: 700;
        }];
        readonly files: {
            readonly woff2: "font/quicksand/quicksand-variable.woff2";
            readonly ttf: "font/quicksand/quicksand-variable.ttf";
        };
        readonly licenseFile: "font/quicksand/OFL.txt";
    };
    readonly alvarado: {
        readonly key: "alvarado";
        readonly family: "Alvarado";
        readonly classification: "Serif";
        readonly designer: "Hector Torres";
        readonly license: "OFL-1.1";
        readonly fallback: readonly ["ui-serif", "Georgia", "serif"];
        readonly weight: readonly [1, 100];
        readonly axes: readonly [{
            readonly tag: "wght";
            readonly min: 0;
            readonly default: 0;
            readonly max: 100;
        }, {
            readonly tag: "ital";
            readonly min: 0;
            readonly default: 0;
            readonly max: 100;
        }];
        readonly variationDefaults: {
            readonly wght: 25;
            readonly ital: 0;
        };
        readonly files: {
            readonly woff2: "font/alvarado/alvarado-variable.woff2";
            readonly ttf: "font/alvarado/alvarado-variable.ttf";
        };
        readonly licenseFile: "font/alvarado/OFL.txt";
    };
};
export type FontKey = keyof typeof fonts;
export declare const fontKeys: FontKey[];
/**
 * CSS `font-family` value for `key`, matching the Sass `font-stack()`
 * function and the `--font-<key>` custom property.
 */
export declare function fontStack(key: FontKey): string;

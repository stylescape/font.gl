# Glossary

Terms used in the font.gl documentation and code.

**Axis**
:   A dimension along which a variable font can vary, named by a four-letter tag. Registered axes use lowercase tags (`wght` weight, `ital` italic, `wdth` width, `slnt` slant, `opsz` optical size) and map onto CSS properties; custom axes use uppercase tags. Each axis has a minimum, default and maximum value.

**Fallback stack**
:   The fonts listed after the family in `font-family`, used while the web font loads or for characters it lacks. font.gl ends each stack with a generic family (`sans-serif`, `serif`).

**`@font-face`**
:   The CSS at-rule that declares a downloadable font: its family name, source files, weight range and loading behaviour. The Sass `font-face` and `font-faces` mixins emit these rules.

**`font-display`**
:   The `@font-face` descriptor that controls what the browser shows while a font loads. font.gl defaults to `swap`: text renders at once in the fallback font and switches when the web font arrives. Set with `$font-display`.

**Font key**
:   The lowercase identifier of a font in the registry (`manrope`, `quicksand`, `alvarado`). It names the font directory (`font/<key>/`), the custom property (`--font-<key>`) and the utility class (`.font-<key>`).

**`font-variation-settings`**
:   The low-level CSS property that sets axis values by tag, e.g. `"wght" 100, "ital" 100`. Needed when an axis does not follow the CSS scale, as with Alvarado's `wght` and `ital` axes.

**Font smoothing**
:   Browser-specific anti-aliasing of glyphs on macOS (`-webkit-font-smoothing`, `-moz-osx-font-smoothing`). The `font-smoothing` mixin and `.font-smooth` class set them.

**OFL (SIL Open Font License)**
:   The license of every font bundled with font.gl. It allows use, embedding, modification and redistribution, as long as the license text travels with the font and modified versions do not use Reserved Font Names. font.gl ships `OFL.txt` next to each font.

**Registry**
:   The `$fonts` Sass map that lists every bundled font with its family, file name, fallback stack, weight range and custom axes. Override it to ship a subset. The JavaScript `fonts` catalogue mirrors it.

**Reserved Font Name (RFN)**
:   A name that the OFL forbids for modified versions of a font. Quicksand reserves "Quicksand".

**TTF (TrueType Font)**
:   An uncompressed font format supported everywhere. font.gl lists it after WOFF2 as a fallback; drop it with `$font-formats`.

**Variable font**
:   A single font file that contains a continuous range of styles along one or more axes, instead of one file per weight or style. Defined by the OpenType 1.8 font variations specification.

**WOFF2 (Web Open Font Format 2)**
:   A compressed font format for the web, typically 30% smaller than TTF and supported by all current browsers. font.gl references it first.

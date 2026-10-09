// =============================================================================
// Stylelint configuration for font.gl
// =============================================================================

/** @type {import('stylelint').Config} */
module.exports = {
    extends: ["stylelint-config-standard-scss"],
    ignoreFiles: ["dist/**/*", "node_modules/**/*"],
    rules: {
        // ----- Modern @use only -------------------------------------------------
        "scss/load-no-partial-leading-underscore": true,
        "scss/at-use-no-redundant-alias": true,
        "scss/no-global-function-names": true,

        // ----- Relaxations ------------------------------------------------------
        // SassDoc uses `///` triple-slash blocks; allow empty lines in them.
        "scss/comment-no-empty": null,
        "scss/double-slash-comment-empty-line-before": null,
        "scss/dollar-variable-empty-line-before": null,
        "at-rule-empty-line-before": null,
        "comment-empty-line-before": null,
    },
};

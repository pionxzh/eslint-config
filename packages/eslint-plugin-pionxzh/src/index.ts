import genericSpacing from './rules/generic-spacing'
import importDedupe from './rules/import-dedupe'
import noCjsExports from './rules/no-cjs-exports'
import noTsExportEqual from './rules/no-ts-export-equal'
import preferInlineTypeImport from './rules/prefer-inline-type-import'
import topLevelFunction from './rules/top-level-function'

export default {
    rules: {
        'import-dedupe': importDedupe,
        'prefer-inline-type-import': preferInlineTypeImport,
        'generic-spacing': genericSpacing,
        'top-level-function': topLevelFunction,
        'no-cjs-exports': noCjsExports,
        'no-ts-export-equal': noTsExportEqual,
    },
}

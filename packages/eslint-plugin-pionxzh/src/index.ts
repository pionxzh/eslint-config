import genericSpacing from './rules/generic-spacing'
import importDedupe from './rules/import-dedupe'
import namedTupleSpacing from './rules/named-tuple-spacing'
import noCjsExports from './rules/no-cjs-exports'
import noConstEnum from './rules/no-const-enum'
import noImportNodeModulesByPath from './rules/no-import-node-modules-by-path'
import noTsExportEqual from './rules/no-ts-export-equal'
import preferInlineTypeImport from './rules/prefer-inline-type-import'
import topLevelFunction from './rules/top-level-function'

export default {
    rules: {
        'import-dedupe': importDedupe,
        'prefer-inline-type-import': preferInlineTypeImport,
        'generic-spacing': genericSpacing,
        'top-level-function': topLevelFunction,
        'no-import-node-modules-by-path': noImportNodeModulesByPath,
        'no-cjs-exports': noCjsExports,
        'no-ts-export-equal': noTsExportEqual,
        'no-const-enum': noConstEnum,
        'named-tuple-spacing': namedTupleSpacing,
    },
}

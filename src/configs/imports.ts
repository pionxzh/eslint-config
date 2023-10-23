import { pluginAntfu, pluginImport } from '../plugins'
import type { ConfigItem, OptionsStylistic } from '../types'

export function imports(options: OptionsStylistic = {}): ConfigItem[] {
    const {
        stylistic = true,
    } = options

    return [
        {
            name: 'pionxzh:imports',
            plugins: {
                import: pluginImport,
                pionxzh: pluginAntfu,
            },
            rules: {
                'import/first': 'error',
                'import/no-duplicates': 'error',
                'import/no-mutable-exports': 'error',
                'import/no-named-default': 'error',
                // 'import/no-self-import': 'error',
                'import/no-webpack-loader-syntax': 'error',
                // @pionxzh: prefer to sort imports
                'import/order': ['error', {
                    alphabetize: {
                        caseInsensitive: true,
                        order: 'asc',
                    },
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
                }],

                'pionxzh/import-dedupe': 'error',
                'pionxzh/no-import-node-modules-by-path': 'error',

                ...stylistic
                    ? {
                            'import/newline-after-import': ['error', { considerComments: true, count: 1 }],
                        }
                    : {},
            },
        },
    ]
}

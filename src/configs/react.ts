import globals from 'globals'
import { GLOB_JSX, GLOB_TSX } from '../globs'
import { pluginReact, pluginReactHooks } from '../plugins'
import type { ConfigItem, OptionsHasTypeScript, OptionsOverrides, OptionsStylistic } from '../types'

export function react(
    options: OptionsHasTypeScript & OptionsOverrides & OptionsStylistic = {},
): ConfigItem[] {
    const {
        overrides = {},
        stylistic = true,
    } = options

    const {
        // @pionxzh prefer to use 4 spaces
        indent = 4,
    } = typeof stylistic === 'boolean' ? {} : stylistic

    const extensions = ['.jsx', ...[options.typescript ? '.tsx' : '']]

    return [
        {
            name: 'pionxzh:react:setup',
            plugins: {
                'react': pluginReact,
                'react-hooks': pluginReactHooks,
            },
            settings: {
                'import/extensions': extensions,
                'import/resolver': {
                    node: { extensions },
                },
                'react': {
                    version: 'detect',
                },
            },
        },
        {
            files: [GLOB_JSX, ...[options.typescript ? GLOB_TSX : '']],
            languageOptions: {
                globals: globals.browser,
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true,
                    },
                    // for @typescript/eslint-parser
                    jsxPragma: undefined,
                    // FIXME: @typescript-eslint v6 throws deprecation warnings
                    // See https://github.com/jsx-eslint/eslint-plugin-react/issues/3602
                    // Remove this when they support typescript 5.2
                    suppressDeprecatedPropertyWarnings: true,
                },

            },
            name: 'pionxzh:react:rules',
            rules: {
                ...pluginReact.configs.recommended.rules as any,
                ...pluginReactHooks.configs.recommended.rules as any,

                'node/prefer-global/process': 'off',

                'react/display-name': ['off', { ignoreTranspilerName: false }],
                'react/iframe-missing-sandbox': 'warn',
                'react/no-unknown-property': ['error', {
                    ignore: [
                        // SVG
                        'clip-path',
                        'clip-rule',
                        'fill-opacity',
                        'fill-rule',
                        'stroke-dasharray',
                        'stroke-dashoffset',
                        'stroke-linecap',
                        'stroke-linejoin',
                        'stroke-miterlimit',
                        'stroke-opacity',
                        'stroke-width',
                    ],
                }],
                'react/no-unused-class-component-methods': 'error',
                'react/no-unused-state': 'error',
                'react/prop-types': 'off',
                'react/react-in-jsx-scope': 'off',

                ...stylistic
                    ? {
                            'react/jsx-boolean-value': ['error', 'never', { always: [] }],
                            'react/jsx-fragments': ['error', 'syntax'],
                            'react/jsx-no-useless-fragment': 'error',
                            'react/sort-comp': ['error', {
                                groups: {
                                    lifecycle: [
                                        'displayName',
                                        'propTypes',
                                        'contextTypes',
                                        'childContextTypes',
                                        'mixins',
                                        'statics',
                                        'defaultProps',
                                        'constructor',
                                        'getDefaultProps',
                                        'getInitialState',
                                        'state',
                                        'getChildContext',
                                        'getDerivedStateFromProps',
                                        'componentWillMount',
                                        'UNSAFE_componentWillMount',
                                        'componentDidMount',
                                        'componentWillReceiveProps',
                                        'UNSAFE_componentWillReceiveProps',
                                        'shouldComponentUpdate',
                                        'componentWillUpdate',
                                        'UNSAFE_componentWillUpdate',
                                        'getSnapshotBeforeUpdate',
                                        'componentDidUpdate',
                                        'componentDidCatch',
                                        'componentWillUnmount',
                                    ],
                                    rendering: [
                                        '/^render.+$/',
                                        'render',
                                    ],
                                },
                                order: [
                                    'static-variables',
                                    'static-methods',
                                    'instance-variables',
                                    'lifecycle',
                                    '/^handle.+$/',
                                    '/^on.+$/',
                                    'getters',
                                    'setters',
                                    '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
                                    'instance-methods',
                                    'everything-else',
                                    'rendering',
                                ],
                            }],
                            'react/style-prop-object': 'error',

                            'style/indent': ['error', indent, {
                                SwitchCase: 1,
                                VariableDeclarator: 1,
                                // from: https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
                                ignoredNodes: [
                                    'JSXElement',
                                    'JSXElement :not(JSXExpressionContainer, JSXExpressionContainer *)',
                                    'JSXAttribute',
                                    'JSXIdentifier',
                                    'JSXNamespacedName',
                                    'JSXMemberExpression',
                                    'JSXSpreadAttribute',
                                    'JSXOpeningElement',
                                    'JSXClosingElement',
                                    'JSXFragment',
                                    'JSXOpeningFragment',
                                    'JSXClosingFragment',
                                    'JSXText',
                                    'JSXEmptyExpression',
                                    'JSXSpreadChild',
                                ],
                                offsetTernaryExpressions: true,
                                outerIIFEBody: 1,
                            }],
                            'style/jsx-closing-bracket-location': ['error', 'tag-aligned'],
                            'style/jsx-closing-tag-location': 'error',
                            'style/jsx-curly-brace-presence': ['error', { children: 'never', propElementValues: 'always', props: 'never' }],
                            'style/jsx-curly-newline': ['error', {
                                multiline: 'consistent',
                                singleline: 'consistent',
                            }],
                            'style/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
                            'style/jsx-equals-spacing': ['error', 'never'],
                            'style/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
                            'style/jsx-indent': ['error', indent, { checkAttributes: false, indentLogicalExpressions: true }],
                            'style/jsx-indent-props': ['error', indent],
                            'style/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
                            'style/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
                            'style/jsx-props-no-multi-spaces': 'error',
                            'style/jsx-quotes': ['error', 'prefer-double'],
                            'style/jsx-tag-spacing': ['error', {
                                afterOpening: 'never',
                                beforeClosing: 'never',
                                beforeSelfClosing: 'always',
                                closingSlash: 'never',
                            }],
                            'style/jsx-wrap-multilines': ['error', {
                                arrow: 'parens-new-line',
                                assignment: 'parens-new-line',
                                condition: 'parens-new-line',
                                declaration: 'parens-new-line',
                                logical: 'parens-new-line',
                                prop: 'parens-new-line',
                                return: 'parens-new-line',
                            }],
                        }
                    : {},

                ...overrides,
            },
        },
    ]
}

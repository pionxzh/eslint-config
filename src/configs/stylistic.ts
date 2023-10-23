import { pluginAntfu, pluginStylistic } from '../plugins'
import type { ConfigItem, StylisticConfig } from '../types'

export function stylistic(options: StylisticConfig = {}): ConfigItem[] {
    const {
        // @pionxzh prefer to use 4 spaces
        indent = 4,
        quotes = 'single',
    } = options

    return [
        {
            name: 'pionxzh:stylistic',
            plugins: {
                pionxzh: pluginAntfu,
                style: pluginStylistic,
            },
            rules: {
                // @pionxzh prefer `multi-line` for curly braces
                'curly': ['error', 'multi-line'],
                'pionxzh/consistent-list-newline': 'error',
                // @pionxzh: prefer to have a shorter if statement
                'pionxzh/if-newline': 'off',
                'pionxzh/top-level-function': 'error',

                'style/array-bracket-spacing': ['error', 'never'],
                'style/arrow-spacing': ['error', { after: true, before: true }],
                'style/block-spacing': ['error', 'always'],
                'style/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
                'style/comma-dangle': ['error', 'always-multiline'],
                'style/comma-spacing': ['error', { after: true, before: false }],
                'style/comma-style': ['error', 'last'],
                'style/computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
                'style/dot-location': ['error', 'property'],
                'style/eol-last': 'error',
                'style/indent': ['error', indent, {
                    ArrayExpression: 1,
                    CallExpression: { arguments: 1 },
                    FunctionDeclaration: { body: 1, parameters: 1 },
                    FunctionExpression: { body: 1, parameters: 1 },
                    ImportDeclaration: 1,
                    MemberExpression: 1,
                    ObjectExpression: 1,
                    SwitchCase: 1,
                    VariableDeclarator: 1,
                    flatTernaryExpressions: false,
                    ignoreComments: false,
                    ignoredNodes: [
                        'TemplateLiteral *',
                        'JSXElement',
                        'JSXElement > *',
                        'JSXAttribute',
                        'JSXIdentifier',
                        'JSXNamespacedName',
                        'JSXMemberExpression',
                        'JSXSpreadAttribute',
                        'JSXExpressionContainer',
                        'JSXOpeningElement',
                        'JSXClosingElement',
                        'JSXFragment',
                        'JSXOpeningFragment',
                        'JSXClosingFragment',
                        'JSXText',
                        'JSXEmptyExpression',
                        'JSXSpreadChild',
                        'TSTypeParameterInstantiation',
                        'FunctionExpression > .params[decorators.length > 0]',
                        'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
                        'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
                    ],
                    offsetTernaryExpressions: true,
                    outerIIFEBody: 1,
                }],
                'style/key-spacing': ['error', { afterColon: true, beforeColon: false }],
                'style/keyword-spacing': ['error', { after: true, before: true }],
                'style/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
                'style/max-statements-per-line': ['error', { max: 1 }],
                'style/member-delimiter-style': ['error', { multiline: { delimiter: 'none' } }],
                'style/multiline-ternary': ['error', 'always-multiline'],
                'style/new-parens': 'error',
                'style/no-extra-parens': ['error', 'functions'],
                'style/no-floating-decimal': 'error',
                'style/no-mixed-operators': ['error', {
                    allowSamePrecedence: true,
                    groups: [
                        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                        ['&&', '||'],
                        ['in', 'instanceof'],
                    ],
                }],
                'style/no-mixed-spaces-and-tabs': 'error',
                'style/no-multi-spaces': 'error',
                'style/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
                'style/no-tabs': indent === 'tab' ? 'off' : 'error',
                'style/no-trailing-spaces': 'error',
                'style/no-whitespace-before-property': 'error',
                'style/object-curly-spacing': ['error', 'always'],
                'style/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
                'style/operator-linebreak': ['error', 'before'],
                'style/padded-blocks': ['error', { blocks: 'never', classes: 'never', switches: 'never' }],
                'style/quote-props': ['error', 'consistent-as-needed'],
                'style/quotes': ['error', quotes, { allowTemplateLiterals: true, avoidEscape: false }],
                'style/rest-spread-spacing': ['error', 'never'],
                'style/semi': ['error', 'never'],
                'style/semi-spacing': ['error', { after: true, before: false }],
                'style/space-before-blocks': ['error', 'always'],
                'style/space-before-function-paren': ['error', { anonymous: 'always', asyncArrow: 'always', named: 'never' }],
                'style/space-in-parens': ['error', 'never'],
                'style/space-infix-ops': 'error',
                'style/space-unary-ops': ['error', { nonwords: false, words: true }],
                'style/spaced-comment': ['error', 'always', {
                    block: {
                        balanced: true,
                        exceptions: ['*'],
                        markers: ['!'],
                    },
                    line: {
                        exceptions: ['/', '#'],
                        markers: ['/'],
                    },
                }],
                'style/template-curly-spacing': 'error',
                'style/template-tag-spacing': ['error', 'never'],
                'style/type-annotation-spacing': ['error', {}],
                'style/wrap-iife': ['error', 'any', { functionPrototypeMethods: true }],
                'style/yield-star-spacing': ['error', 'both'],
            },
        },
    ]
}

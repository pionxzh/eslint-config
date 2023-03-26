module.exports = {
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        '@pionxzh/eslint-config-ts',
    ],
    settings: {
        react: {
            version: '17.0',
        },
    },
    rules: {
        'jsx-quotes': [
            'error',
            'prefer-double',
        ],
        'indent': ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            offsetTernaryExpressions: true,
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
        }],
        'react/jsx-indent': ['error', 4, { checkAttributes: false, indentLogicalExpressions: true }],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
        'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
        'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
        'react/jsx-tag-spacing': ['error', {
            closingSlash: 'never',
            beforeSelfClosing: 'always',
            afterOpening: 'never',
            beforeClosing: 'never',
        }],
        'react/jsx-wrap-multilines': ['error', {
            declaration: 'parens-new-line',
            assignment: 'parens-new-line',
            return: 'parens-new-line',
            arrow: 'parens-new-line',
            condition: 'parens-new-line',
            logical: 'parens-new-line',
            prop: 'parens-new-line',
        }],
        'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
        'react/jsx-curly-newline': ['error', {
            multiline: 'consistent',
            singleline: 'consistent',
        }],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/no-unknown-property': ['error', {
            ignore: [
                'stroke-width',
                'stroke-linecap',
                'stroke-linejoin',
            ],
        }],
    },
}

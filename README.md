# @pionxzh/eslint-config
Forked from [antfu/eslint-config](https://github.com/antfu/eslint-config)

[![npm](https://img.shields.io/npm/v/@pionxzh/eslint-config?color=a1b858&label=)](https://npmjs.com/package/@pionxzh/eslint-config)

- Single quotes, no semi
- Auto fix for formatting (aimed to be used standalone **without** Prettier)
- Designed to work with TypeScript, Vue, React out-of-box
- Lints also for json, yaml, markdown
- Sorted imports, dangling commas
- Reasonable defaults, best practices, only one-line of config
- Respects `.gitignore` by default
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Using [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
- **Style principle**: Minimal for reading, stable for diff, consistent

## Usage

### Install

```bash
pnpm i -D eslint @pionxzh/eslint-config
```

### Create config file

With [`"type": "module"`](https://nodejs.org/api/packages.html#type) in `package.json` (recommended):

```js
// eslint.config.js
import pionxzh from '@pionxzh/eslint-config'

export default pionxzh()
```

With CJS:

```js
// eslint.config.js
const pionxzh = require('@pionxzh/eslint-config').default

module.exports = pionxzh()
```

> Note that `.eslintignore` no longer works in Flat config, see [customization](#customization) for more details.

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Config VS Code (auto fix)

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`:

```jsonc
{
  // Enable the ESlint flat config support
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml"
  ]
}
```

## Customization

Since v1.0, we migrated to [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new). It provides much better organization and composition.

Normally you only need to import the `pionxzh` preset:


```js
// eslint.config.js
import pionxzh from '@pionxzh/eslint-config'

export default pionxzh()
```

And that's it! Or you can configure each integration individually, for example:

```js
// eslint.config.js
import pionxzh from '@pionxzh/eslint-config'

export default pionxzh({
    // Enable stylistic formatting rules
    // stylistic: true,

    // Or customize the stylistic rules
    stylistic: {
        indent: 4, // 2, or 'tab'
        quotes: 'single', // or 'double'
    },

    // TypeScript and Vue are auto-detected, you can also explicitly enable them:
    typescript: true,
    vue: true,

    // Disable jsonc and yaml support
    jsonc: false,
    yaml: false,

    // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    ignores: [
        './fixtures',
    // ...globs
    ]
})
```

The `pionxzh` factory function also accepts any number of arbitrary custom config overrides:

```js
// eslint.config.js
import pionxzh from '@pionxzh/eslint-config'

export default pionxzh(
    {
    // Configures for pionxzh's config
    },

    // From the second arguments they are ESLint Flat Configs
    // you can have multiple configs
    {
        files: ['**/*.ts'],
        rules: {},
    },
    {
        rules: {},
    },
)
```

Going more advanced, you can also import fine-grained configs and compose them as you wish:

```js
// eslint.config.js
import {
    comments,
    ignores,
    imports,
    javascript,
    jsdoc,
    jsonc,
    markdown,
    node,
    sortPackageJson,
    sortTsconfig,
    stylistic,
    typescript,
    unicorn,
    vue,
    yml,
} from '@pionxzh/eslint-config'

export default [
    ...ignores(),
    ...javascript(),
    ...comments(),
    ...node(),
    ...jsdoc(),
    ...imports(),
    ...unicorn(),
    ...typescript(),
    ...stylistic(),
    ...vue(),
    ...jsonc(),
    ...yml(),
    ...markdown(),
]
```

Check out the [configs](https://github.com/pionxzh/eslint-config/blob/main/src/configs) and [factory](https://github.com/pionxzh/eslint-config/blob/main/src/factory.ts) for more details.

> Thanks to [sxzz/eslint-config](https://github.com/sxzz/eslint-config) for the inspiration and reference.

## Plugins Renaming

Since flat config requires us to explicitly provide the plugin names (instead of mandatory convention from npm package name), we renamed some plugins to make overall scope more consistent and easier to write.

| New Prefix | Original Prefix | Source Plugin |
| --- | --- | --- |
| `import/*` | `i/*` | [eslint-plugin-i](https://github.com/un-es/eslint-plugin-i) |
| `node/*` | `n/*` | [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n) |
| `yaml/*` | `yml/*` | [eslint-plugin-yml](https://github.com/ota-meshi/eslint-plugin-yml) |
| `ts/*` | `@typescript-eslint/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) |
| `style/*` | `@stylistic/*` | [@stylistic/eslint-plugin](https://github.com/eslint-stylistic/eslint-stylistic) |
| `test/*` | `vitest/*` | [eslint-plugin-vitest](https://github.com/veritem/eslint-plugin-vitest) |
| `test/*` | `no-only-tests/*` | [eslint-plugin-no-only-tests](https://github.com/levibuzolic/eslint-plugin-no-only-tests) |

When you want to override rules, or disable them inline, you need to update to the new prefix:

```diff
-// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
+// eslint-disable-next-line ts/consistent-type-definitions
type foo = { bar: 2 }
```

### Rules Overrides

Certain rules would only be enabled in specific files, for example, `ts/*` rules would only be enabled in `.ts` files and `vue/*` rules would only be enabled in `.vue` files. If you want to override the rules, you need to specify the file extension:

```js
// eslint.config.js
import pionxzh from '@pionxzh/eslint-config'

export default pionxzh(
    { vue: true, typescript: true },
    {
    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
        files: ['**/*.vue'],
        rules: {
            'vue/operator-linebreak': ['error', 'before'],
        },
    },
    {
    // Without `files`, they are general rules for all files
        rules: {
            'style/semi': ['error', 'never'],
        },
    }
)
```

We also provided an `overrides` options to make it easier:

```js
// eslint.config.js
import pionxzh from '@pionxzh/eslint-config'

export default pionxzh({
    overrides: {
        vue: {
            'vue/operator-linebreak': ['error', 'before'],
        },
        typescript: {
            'ts/consistent-type-definitions': ['error', 'interface'],
        },
        yaml: {},
    // ...
    }
})
```

### Type Aware Rules

You can optionally enable the [type aware rules](https://typescript-eslint.io/linting/typed-linting/) by passing the options object to the `typescript` config:

```js
// eslint.config.js
import pionxzh from '@pionxzh/eslint-config'

export default pionxzh({
    typescript: {
        tsconfigPath: 'tsconfig.json',
    },
})
```

## Extended Reading

Learn more about the context - [Why I don't use Prettier](https://antfu.me/posts/why-not-prettier).

## License

[MIT](./LICENSE) License &copy; 2022-PRESENT [Pionxzh](https://github.com/pionxzh)

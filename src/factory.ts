import fs from 'node:fs'
import process from 'node:process'
import gitignore from 'eslint-config-flat-gitignore'
import { isPackageExists } from 'local-pkg'
import {
    comments,
    ignores,
    imports,
    javascript,
    jsdoc,
    jsonc,
    markdown,
    node,
    sortKeys,
    sortPackageJson,
    sortTsconfig,
    stylistic,
    test,
    typescript,
    unicorn,
    vue,
    yaml,
} from './configs'
import { react } from './configs/react'
import { combine } from './utils'
import type { ConfigItem, OptionsConfig } from './types'

const flatConfigProps: (keyof ConfigItem)[] = [
    'files',
    'ignores',
    'languageOptions',
    'linterOptions',
    'processor',
    'plugins',
    'rules',
    'settings',
]

const VuePackages = [
    'vue',
    'nuxt',
    'vitepress',
    '@slidev/cli',
]

const ReactPackages = [
    'react',
    'react-dom',
    'next',
]

/**
 * Construct an array of ESLint flat config items.
 */
export function pionxzh(options: OptionsConfig & ConfigItem = {}, ...userConfigs: (ConfigItem | ConfigItem[])[]) {
    const {
        isInEditor = !!((process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI),
        vue: enableVue = VuePackages.some(i => isPackageExists(i)),
        react: enableReact = ReactPackages.some(i => isPackageExists(i)),
        typescript: enableTypeScript = isPackageExists('typescript'),
        gitignore: enableGitignore = true,
        overrides = {},
        componentExts = [],
    } = options

    const stylisticOptions = options.stylistic === false
        ? false
        : typeof options.stylistic === 'object'
            ? options.stylistic
            : {}

    const configs: ConfigItem[][] = []

    if (enableGitignore) {
        if (typeof enableGitignore !== 'boolean') {
            configs.push([gitignore(enableGitignore)])
        }
        else {
            if (fs.existsSync('.gitignore')) {
                configs.push([gitignore()])
            }
        }
    }

    // Base configs
    configs.push(
        ignores(),
        javascript({
            isInEditor,
            overrides: overrides.javascript,
        }),
        comments(),
        node(),
        jsdoc({
            stylistic: stylisticOptions,
        }),
        imports({
            stylistic: stylisticOptions,
        }),
        unicorn(),

        // Optional plugins (not enabled by default)
        sortKeys(),
    )

    if (enableVue) {
        componentExts.push('vue')
    }

    if (enableReact) {
        componentExts.push('jsx')
        if (enableTypeScript) componentExts.push('tsx')
    }

    if (enableTypeScript) {
        configs.push(typescript({
            ...typeof enableTypeScript !== 'boolean'
                ? enableTypeScript
                : {},
            componentExts,
            overrides: overrides.typescript,
        }))
    }

    if (stylisticOptions) {
        configs.push(stylistic(stylisticOptions))
    }

    if (options.test ?? true) {
        configs.push(test({
            isInEditor,
            overrides: overrides.test,
        }))
    }

    if (enableVue) {
        configs.push(vue({
            overrides: overrides.vue,
            stylistic: stylisticOptions,
            typescript: !!enableTypeScript,
        }))
    }

    if (enableReact) {
        configs.push(react({
            overrides: overrides.react,
            stylistic: stylisticOptions,
            typescript: !!enableTypeScript,
        }))
    }

    if (options.jsonc ?? true) {
        configs.push(
            jsonc({
                overrides: overrides.jsonc,
                stylistic: stylisticOptions,
            }),
            sortPackageJson(),
            sortTsconfig(),
        )
    }

    if (options.yaml ?? true) {
        configs.push(yaml({
            overrides: overrides.yaml,
            stylistic: stylisticOptions,
        }))
    }

    if (options.markdown ?? true) {
        configs.push(markdown({
            componentExts,
            overrides: overrides.markdown,
        }))
    }

    // User can optionally pass a flat config item to the first argument
    // We pick the known keys as ESLint would do schema validation
    const fusedConfig = flatConfigProps.reduce((acc, key) => {
        if (key in options) acc[key] = options[key] as any
        return acc
    }, {} as ConfigItem)
    if (Object.keys(fusedConfig).length) {
        configs.push([fusedConfig])
    }

    const merged = combine(
        ...configs,
        ...userConfigs,
    )

    return merged
}

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginCommentsConfigs from '@eslint-community/eslint-plugin-eslint-comments/configs';
import eslint from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import deMorgan from 'eslint-plugin-de-morgan';
import { importX } from 'eslint-plugin-import-x';
import eslintPluginJest from 'eslint-plugin-jest';
import eslintPluginJestDom from 'eslint-plugin-jest-dom';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginReact from 'eslint-plugin-react';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import eslintPluginTestingLibrary from 'eslint-plugin-testing-library';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  tseslint.configs.recommended,
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginCommentsConfigs.recommended,
  importX.flatConfigs.errors,
  importX.flatConfigs.typescript,
  eslintPluginUnicorn.configs.recommended,
  deMorgan.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd()
      }
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    plugins: {
      perfectionist
    },
    settings: {
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.mts']
      },
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: false,
          project: '.'
        })
      ]
    },
    rules: {
      'dot-notation': 'error',
      'eqeqeq': ['error', 'smart'],
      'no-alert': 'error',
      'no-console': 'error',
      'no-eval': 'error',
      'no-extra-boolean-cast': 'error',
      'no-useless-rename': 'error',
      'object-shorthand': 'error',
      'require-atomic-updates': 'error',
      'prefer-object-spread': 'error',
      'yoda': 'error',
      'curly': ['error', 'multi-line'],
      'no-void': ['error', { allowAsStatement: true }],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-lonely-if': 'error',
      'no-nested-ternary': 'error', // disabled in favor of unicorn/no-nested-ternary
      'no-implicit-coercion': 'error',
      'array-callback-return': 'error',
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.{ts,tsx,js,jsx}',
            '**/*.spec.{ts,tsx,js,jsx}',
            '**/testing/**',
            '**/test-helpers/**',
            '**/__tests__/**',
            '**/vite.config.{ts,js,mts}',
            '**/vitest.config.{ts,js}',
            '**/*.stories.{ts,tsx,js,jsx}',
            '**/eslint.config.{js,ts}',
            '**/jest.config.{js,ts}',
            '**/jest.*.{js,ts,jsx,tsx}',
            '**/tsconfig.*.json',
            '**/tsup.config.{js,ts}',
            '**/scripts/**',
            '**/mocks/**',
            '**/__mocks__/**',
            '**/*.mocks.{js,ts}',
            '**/msw*.{js,ts}'
          ],
          optionalDependencies: false,
          peerDependencies: false,
          bundledDependencies: false
        }
      ],
      'import-x/no-cycle': ['error', { ignoreExternal: true, maxDepth: 3 }],
      'import-x/namespace': ['error', { allowComputed: true }],
      'import-x/no-unused-modules': 'error',
      'import-x/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/client',
              from: './src/server'
            },
            {
              target: './src/server',
              from: './src/client'
            }
          ]
        }
      ],
      'import-x/no-duplicates': ['error', { considerQueryString: true }],
      'import-x/newline-after-import': 'error',
      'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import-x/no-anonymous-default-export': 'error',
      'import-x/no-useless-path-segments': 'error',
      'import-x/no-relative-packages': 'error',
      'perfectionist/sort-imports': 'error',
      'perfectionist/sort-named-imports': 'error',
      '@typescript-eslint/naming-convention': ['error', { selector: 'class', format: ['PascalCase'] }],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/interface-name-prefix': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      'no-use-before-define': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' }
      ],
      '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: false }],
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      'unicorn/numeric-separators-style': ['error', { number: { minimumDigits: 10 } }],
      'unicorn/consistent-function-scoping': 'error',
      'unicorn/no-array-for-each': 'error',
      'unicorn/prefer-single-call': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/explicit-length-check': 'error',
      'unicorn/no-useless-length-check': 'error',
      'unicorn/no-empty-file': 'error',
      'unicorn/no-null': 'error',
      'unicorn/filename-case': 'error',
      'unicorn/prevent-abbreviations': 'error',
      'unicorn/prefer-module': 'error',
      'unicorn/no-process-exit': 'error',
      'unicorn/no-array-reduce': 'error',
      'unicorn/no-object-as-default-parameter': 'error',
      'unicorn/no-array-callback-reference': 'error',
      'unicorn/prefer-logical-operator-over-ternary': 'error',
      'unicorn/prefer-spread': 'error',
      'unicorn/prefer-dom-node-append': 'error',
      'unicorn/no-thenable': 'error',
      'unicorn/prefer-set-has': 'error',
      'unicorn/error-message': 'error',
      'unicorn/prefer-native-coercion-functions': 'error',
      'unicorn/no-new-array': 'error',
      'unicorn/no-useless-spread': 'error',
      'unicorn/import-style': 'error',
      'unicorn/no-await-expression-member': 'error',
      'unicorn/no-useless-promise-resolve-reject': 'error',
      'unicorn/prefer-array-index-of': 'error',
      'unicorn/prefer-number-properties': 'error',
      'unicorn/prefer-blob-reading-methods': 'error',
      'unicorn/prefer-add-event-listener': 'error',
      'unicorn/prefer-ternary': 'error',
      'unicorn/prefer-code-point': 'error',
      'unicorn/no-nested-ternary': 'error',
      'unicorn/no-useless-undefined': 'error',
      'unicorn/prefer-global-this': 'error',
      'unicorn/no-array-method-this-argument': 'error',
      'unicorn/no-magic-array-flat-depth': 'error',
      'unicorn/prefer-event-target': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/no-useless-switch-case': 'error',
      'unicorn/prefer-top-level-await': 'error',
      'unicorn/prefer-regexp-test': 'error',
      'unicorn/prefer-object-from-entries': 'error',
      'unicorn/prefer-at': 'error',
      'unicorn/prefer-math-min-max': 'error'
    }
  },
  {
    plugins: {
      '@stylistic': stylisticPlugin
    },
    rules: {
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          next: 'return',
          prev: '*'
        },
        {
          blankLine: 'always',
          next: 'break',
          prev: '*'
        },
        {
          blankLine: 'always',
          next: 'throw',
          prev: '*'
        },
        {
          blankLine: 'always',
          next: '*',
          prev: ['const', 'let', 'var']
        },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var']
        },
        {
          blankLine: 'always',
          next: ['let', 'var'],
          prev: 'const'
        },
        {
          blankLine: 'always',
          next: ['const', 'var'],
          prev: 'let'
        },
        {
          blankLine: 'always',
          next: ['const', 'let'],
          prev: 'var'
        },
        {
          blankLine: 'always',
          next: '*',
          prev: 'directive'
        },
        {
          blankLine: 'any',
          next: 'directive',
          prev: 'directive'
        },
        {
          blankLine: 'always',
          next: 'function',
          prev: '*'
        },
        {
          blankLine: 'always',
          next: 'if',
          prev: 'if'
        },
        {
          blankLine: 'always',
          next: '*',
          prev: 'if'
        },
        {
          blankLine: 'always',
          next: 'expression',
          prev: '*'
        },
        {
          blankLine: 'any',
          next: 'expression',
          prev: 'expression'
        }
      ]
    }
  },
  {
    ...eslintPluginJest.configs['flat/recommended'],
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    rules: {
      'jest/consistent-test-it': 'error',
      'jest/expect-expect': [
        'error',
        {
          assertFunctionNames: ['expect', 'assert.*'],
          additionalTestBlockFunctions: []
        }
      ],
      'jest/no-jasmine-globals': 'error',
      'jest/no-commented-out-tests': 'error',
      'jest/prefer-to-have-length': 'error',
      'jest/prefer-to-be': 'error',
      'jest/prefer-strict-equal': 'error',
      'jest/valid-title': [
        'error',
        {
          mustMatch: {
            it: '^should'
          }
        }
      ]
    }
  },
  {
    plugins: { 'testing-library': eslintPluginTestingLibrary, 'jest-dom': eslintPluginJestDom },
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    rules: {
      ...eslintPluginTestingLibrary.configs['flat/react'].rules,
      ...eslintPluginJestDom.configs['flat/recommended'].rules
    }
  },
  [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: {
        'react': eslintPluginReact,
        'react-refresh': reactRefresh.plugin
      },
      settings: {
        react: {
          version: 'detect'
        }
      },
      languageOptions: {
        ...eslintPluginReact.configs.flat['jsx-runtime']?.languageOptions,
        globals: {
          ...globals.browser
        }
      },
      rules: {
        ...eslintPluginReact.configs.flat.recommended?.rules,
        ...eslintPluginReact.configs.flat['jsx-runtime']?.rules,
        'react-refresh/only-export-components': [
          'error',
          { extraHOCs: ['connect', 'styled', 'withMultiVopSelectProvider'] }
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': [
          'error',
          {
            additionalHooks: '(useDeepCompareEffect)'
          }
        ],
        'react-hooks/use-memo': 'error',
        'react-hooks/component-hook-factories': 'error',
        'react-hooks/error-boundaries': 'error',
        'react-hooks/immutability': 'error',
        'react-hooks/globals': 'error',
        'react-hooks/incompatible-library': 'error',
        'react-hooks/purity': 'error',
        'react-hooks/static-components': 'error',
        'react-hooks/unsupported-syntax': 'error',
        'react-hooks/set-state-in-render': 'error',
        'react-hooks/set-state-in-effect': 'error',
        'react-hooks/refs': 'error',
        'react-hooks/preserve-manual-memoization': 'off',
        'react/display-name': 'error',
        'react/jsx-boolean-value': [2, 'never'],
        'react/jsx-equals-spacing': [2, 'never'],
        'react/jsx-fragments': 'error',
        'react/jsx-wrap-multilines': 'error',
        'react/prop-types': 'error',
        'react/jsx-curly-brace-presence': 'error',
        'react/jsx-no-useless-fragment': 'error',
        'react/no-unescaped-entities': 'error',
        'react/self-closing-comp': 'error',
        'react/no-unstable-nested-components': 'error',
        'react/jsx-no-leaked-render': 'error',
        '@typescript-eslint/no-restricted-types': [
          'error',
          {
            types: { 'React.FC': 'Not required and has some drawbacks' }
          }
        ]
      }
    }
  ],

  {
    files: ['**/?(*.)+(stories|config).[jt]s?(x)', '**/__mocks__/**/*.[jt]s?(x)'],
    rules: {
      'import-x/no-unused-modules': 'error'
    }
  },
  {
    files: ['**/*.config.*'],
    rules: {
      'import-x/no-unused-modules': 'error'
    }
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true
    }
  },
  {
    ignores: ['package.json', 'dist', 'node_modules']
  }
]);

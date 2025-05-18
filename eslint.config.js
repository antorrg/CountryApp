import js from '@eslint/js'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'
import nPlugin from 'eslint-plugin-n'
import promisePlugin from 'eslint-plugin-promise'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // 🧪 Config para tests frontend (Jest)
  {
    files: ['frontend/**/*.test.{js,jsx}', 'frontend/**/*.spec.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.jest
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      }
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2]
    }
  },
  { ignores: ['dist', 'node_modules'] },

  // 🟦 Config para backend (Node)
  {
    files: ['server/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022, // Actualizado a 2022 para soportar campos privados (#)
      sourceType: 'module',
      globals: globals.node,
    },
    plugins: {
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'never'],
      'space-before-function-paren': ['error', 'always'],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'object-curly-spacing': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'eol-last': ['error', 'always'],
      'no-extra-semi': 'error',
      'no-trailing-spaces': 'error',
      // Reglas para permitir métodos con asignación
      'no-invalid-this': 'off',
      'no-dupe-class-members': 'off',
      'class-methods-use-this': 'off'
    }
  },
  
  // 🧪 Config para tests (Jest)
  {
    files: ['server/**/*.test.js', 'server/**/*.spec.js'],
    languageOptions: {
      ecmaVersion: 2022, // Actualizado a 2022 para soportar campos privados (#)
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest // ✅ Aquí se incluyen `describe`, `it`, `expect`, etc.
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      // Reglas para permitir métodos con asignación
      'no-invalid-this': 'off',
      'no-dupe-class-members': 'off',
      'class-methods-use-this': 'off'
    }
  },
  
  // 🟨 Config para frontend (React)
  {
    files: ['frontend/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
]
// import js from '@eslint/js'
// import globals from 'globals'
// import importPlugin from 'eslint-plugin-import'
// import nPlugin from 'eslint-plugin-n'
// import promisePlugin from 'eslint-plugin-promise'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'

// export default [
//   { ignores: ['dist', 'node_modules'] },

//   // 🟦 Config para backend (Node)
//   {
//     files: ['server/**/*.js'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       sourceType: 'module',
//       globals: globals.node,
//     },
//     plugins: {
//       import: importPlugin,
//       n: nPlugin,
//       promise: promisePlugin,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       'semi': ['error', 'never'],
//       'quotes': ['error', 'single'],
//       'indent': ['error', 2],
//       'comma-dangle': ['error', 'never'],
//       'space-before-function-paren': ['error', 'always'],
//       'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
//       'no-multiple-empty-lines': ['error', { max: 1 }],
//       'object-curly-spacing': ['error', 'always'],
//       'keyword-spacing': ['error', { before: true, after: true }],
//       'eol-last': ['error', 'always'],
//       'no-extra-semi': 'error',
//       'no-trailing-spaces': 'error'
//     },
//      // 🧪 Config para tests (Jest)
  
//     files: ['**/*.test.js', '**/*.spec.js'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       sourceType: 'module',
//       globals: {
//         ...globals.node,
//         ...globals.jest // ✅ Aquí se incluyen `describe`, `it`, `expect`, etc.
//       }
//     }
//   },
//   // 🟨 Config para frontend (React)
//   {
//     files: ['frontend/**/*.{js,jsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       sourceType: 'module',
//       globals: globals.browser,
//       parserOptions: {
//         ecmaFeatures: { jsx: true },
//       },
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...reactHooks.configs.recommended.rules,
//       'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
//       'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
//     },
//   },
// ]

// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'

// export default [
//   { ignores: ['dist'] },
//   {
//     files: ['**/*.{js,jsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...reactHooks.configs.recommended.rules,
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// ]

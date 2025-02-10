import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import path from 'node:path';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';

const ignoreList = ['**/node_modules/**/*', '**/dist/**/*', '**/*.js', '**/*.mjs'];

export default tseslint.config(
    {
        extends: [eslint.configs.recommended, ...tseslint.configs.recommended, prettier],
        ignores: ignoreList,
        languageOptions: {
            globals: globals.node,
        },
        rules: {
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'class',
                    format: ['PascalCase'],
                },
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                },
                {
                    selector: 'typeAlias',
                    format: ['PascalCase'],
                },
                {
                    selector: 'enum',
                    format: ['PascalCase'],
                },
                {
                    selector: 'function',
                    format: ['camelCase'],
                },
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE'],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'method',
                    format: ['camelCase'],
                },
                {
                    selector: 'parameter',
                    format: ['camelCase'],
                    leadingUnderscore: 'allow',
                },
            ],
        },
    },
    {
        files: ['frontend/**/*.{ts,tsx}'],
        ignores: ignoreList,
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        settings: {
            react: { version: 'detect' },
        },
        extends: [react.configs.flat.recommended, react.configs.flat['jsx-runtime']],
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'function',
                    format: ['PascalCase', 'camelCase'],
                },
            ],
            'react/no-array-index-key': 'error',
            'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
        },
    },
    {
        files: ['backend/**/*.ts'],
        ignores: ignoreList,
        languageOptions: {
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: path.join(import.meta.dirname, 'backend'),
                sourceType: 'module',
            },
        },
        rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    }
);

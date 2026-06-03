import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import sonarjs from 'eslint-plugin-sonarjs';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Рекомендованный набор правил SonarJS.
  sonarjs.configs.recommended,
  {
    rules: {
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // Использование оберток вместо прямых импортов.
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'lodash',
              message: 'Import [module] from lodash/[module] instead.',
            },
            {
              name: 'react-redux',
              importNames: ['useSelector', 'useDispatch'],
              message: 'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
            },
            {
              name: 'dayjs',
              message: 'Use import from "@shared/lib/dayjs" instead',
            },
          ],

          patterns: [
            {
              group: [
                'antd',
                '!@refinedev/antd',
                '@ant-design',
                'rc-*',
                '@lad-tech/mobydick-*',
                '@lad-tech/keyboard-aware',
              ],
              message: 'Use import from "@shared/ui" instead',
            },
          ],
        },
      ],

      // При использовании `@ts-<directive>` нужно добавлять описание.
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': true,
          'ts-check': false,
          minimumDescriptionLength: 5,
        },
      ],

      // Отключаем Prop Types.
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/no-unused-prop-types': 'off',

      // Отключаем обязательный импорт React.
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.ts', '.tsx'] }],

      // Предотвращение использования небезопасных `target="_blank"`.
      'react/jsx-no-target-blank': 'warn',

      'sonarjs/no-duplicate-string': [
        'error',
        { ignoreStrings: 'lower-case,text/plain,Content-Type,space-between,flex-start,flex-end' },
      ],

      // Смягчено: проглатывание исключения допускается (предупреждение, не ошибка).
      'sonarjs/no-ignored-exceptions': 'warn',
      // Смягчено: возможны ложные срабатывания на безопасных regex.
      'sonarjs/slow-regex': 'warn',
    },
  },
  // Prettier идёт последним: отключает конфликтующие форматные правила
  // и включает правило prettier/prettier.
  prettierRecommended,
  // Переопределяем стандартные игноры eslint-config-next.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;

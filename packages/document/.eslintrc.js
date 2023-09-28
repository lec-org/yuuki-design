module.exports = {
  root: true,
  extends: ['@modern-js'],
  overrides: [
    {
      files: ['*.ts', '*.d.ts', '*.tsx'],
      excludedFiles: ['rspress.config.ts'],
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json']
      },
      extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking']
    }
  ]
}

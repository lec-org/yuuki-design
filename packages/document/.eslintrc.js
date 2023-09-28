module.exports = {
  root: true,
  extends: ['@modern-js'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  overrides: [
    {
      files: ['rspress.config.ts'],
      extends: ['plugin:@typescript-eslint/disable-type-checked']
    }
  ]
}

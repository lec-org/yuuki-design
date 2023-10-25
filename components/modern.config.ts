import { moduleTools, defineConfig } from '@modern-js/module-tools'

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: {
    format: 'esm',
    target: 'esnext',
    buildType: 'bundleless',
    input: ['src', '!src/**/!(index).less'], // 除index.less外其它都编译为css
    copy: {
      patterns: [{ from: '**/*.less', to: '' }] // 保留所有less
    }
  }
})

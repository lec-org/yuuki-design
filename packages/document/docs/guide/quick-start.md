# 快速开始

总之开始的很快速

## 安装

依赖建议：

- react >= 18
- react-dom >= 18
- @arco-design/web-react >= 2.53.0
- @formily/core >= 2.2.0
- @formily/react >= 2.2.0

```bash
# npm
npm i @arco-design/web-react yuuki-design

# pnpm
pnpm i @arco-design/web-react yuuki-design
```

## 简易使用案例

示例 App.tsx 文件，样式也可在 main.ts 中引入

```tsx pure
import React from 'React'
import { Button } from 'yuuki-design'
import '@arco-design/web-react/dist/css/arco.css' // 引入arco的样式，也可以引入less
import 'yuuki-design/dist/style/index.css' // 引入增量样式，也可以引入less

const App: React.FC = () => {
  return <Button type='primary'>按钮</Button>
}
```

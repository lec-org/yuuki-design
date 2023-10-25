import React from 'react'
import { Space } from '@arco-design/web-react'
import { Button } from 'yuuki-design'

const App: React.FC = () => {
  return (
    <Space size='large'>
      <Button type='primary'>Primary</Button>
      <Button type='secondary'>Secondary</Button>
      <Button type='dashed'>Dashed</Button>
      <Button type='outline'>Outline</Button>
      <Button type='text'>Text</Button>
      <Button type='text-normal'>Text Normal</Button>
    </Space>
  )
}

export default App

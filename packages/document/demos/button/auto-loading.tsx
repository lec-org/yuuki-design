import React, { useState } from 'react'
import { Space } from '@arco-design/web-react'
import { Button } from 'yuuki-design'

const App: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const onAutoClick = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }

  const onClick = () => {
    return new Promise<void>((resolve) => {
      setLoading(true)
      setTimeout(() => {
        resolve()
        setLoading(false)
      }, 1500)
    })
  }

  return (
    <Space size='large'>
      <Button type='primary' onClick={onAutoClick}>
        自动加载
      </Button>
      <Button loading={loading} onClick={onClick}>
        手动加载
      </Button>
    </Space>
  )
}

export default App

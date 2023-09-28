import React from 'react'
import { Space } from '@arco-design/web-react'
import { Select } from 'yuuki-design'

const options = ['Beijing', 'Shanghai', 'Shenzhen', 'Hangzhou']

const App: React.FC = () => {
  return (
    <Space size='large'>
      <Select
        showSearch
        allowClear
        placeholder='请选择'
        style={{ width: 240 }}
        request={() =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(options.map((item) => ({ label: item, value: item })))
            }, 2000)
          })
        }
      />
      <Select
        showSearch
        allowClear
        mode='multiple'
        placeholder='请选择（多选）'
        style={{ width: 420 }}
        request={() =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(options.map((item) => ({ label: item, value: item })))
            }, 2000)
          })
        }
      />
    </Space>
  )
}

export default App

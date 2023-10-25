import React from 'react'
import { Space } from '@arco-design/web-react'
import { Select } from 'yuuki-design'

const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled']

const App: React.FC = () => {
  return (
    <Space size='large' direction='vertical'>
      <Space size='large'>
        <Select
          showSearch
          allowClear
          placeholder='只在挂载时请求'
          requestTrigger={['mount']}
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
          placeholder='在聚焦和输入时请求'
          requestTrigger={['focus', 'input']}
          style={{ width: 240 }}
          request={() =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(options.map((item) => ({ label: item, value: item })))
              }, 2000)
            })
          }
        />
      </Space>
      <Space size='large'>
        <Select
          showSearch
          allowClear
          placeholder='只在输入时请求'
          requestTrigger={['input']}
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
          placeholder='在挂载和输入时请求'
          requestTrigger={['mount', 'input']}
          style={{ width: 240 }}
          request={() =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve(options.map((item) => ({ label: item, value: item })))
              }, 2000)
            })
          }
        />
      </Space>
    </Space>
  )
}

export default App

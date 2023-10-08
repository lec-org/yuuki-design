import React from 'react'
import { Table, ColumnProps } from 'yuuki-design'

const columns: ColumnProps<DataType>[] = [
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '薪资',
    dataIndex: 'salary'
  },
  {
    title: '地址',
    dataIndex: 'address'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  }
]

interface DataType {
  key: React.Key
  name: string
  salary: string
  address: string
  email: string
}

const data: DataType[] = Array.from(new Array(20).keys()).map((item) => ({
  key: item,
  name: `name${item + 1}`,
  salary: '总之就是很有钱',
  address: `番斗大街番斗花园${item + 1}号`,
  email: `name${item + 1}@example.com`
}))

const App: React.FC = () => {
  return (
    <div style={{ height: 400 }}>
      <Table columns={columns} data={data} scroll={{ y: 'auto' }} />
    </div>
  )
}

export default App

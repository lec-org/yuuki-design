import React from 'react'
import { Table, ColumnProps } from 'yuuki-design'

const columns: ColumnProps[] = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Identity',
    dataIndex: 'identity'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]
const data = [
  {
    key: '1',
    name: 'Asahi',
    identity: 'maid',
    address: 'Paris, France',
    email: 'asahi.kokura@example.com'
  },
  {
    key: '2',
    name: 'Resona',
    identity: 'designer',
    address: 'Paris, France',
    email: 'resona.ookura@example.com'
  },
  {
    key: '3',
    name: 'Luna',
    identity: 'designer',
    address: 'Tokyo, Japan',
    email: 'luna.sakurakouji@example.com'
  },
  {
    key: '4',
    name: 'Meryl',
    identity: 'designer',
    address: 'Paris, France',
    email: 'meryl.lynch@example.com'
  },
  {
    key: '5',
    name: 'Bluette',
    identity: 'model',
    address: 'Paris, France',
    email: 'bluette-nicolette.planquette@example.com'
  }
]

const App: React.FC = () => {
  return <Table columns={columns} data={data} />
}

export default App

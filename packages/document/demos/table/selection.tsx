import { Space } from '@arco-design/web-react'
import React, { useRef } from 'react'
import { Table, ColumnProps, TableRef, Button } from 'yuuki-design'

const columns: ColumnProps<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Identity',
    dataIndex: 'identity',
    hideDefault: true
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

interface DataType {
  key: React.Key
  name: string
  identity: string
  address: string
  email: string
}

const data: DataType[] = [
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
  const tableRef = useRef<TableRef>(null)

  return (
    <div style={{ height: 400 }}>
      <Table
        config
        ref={tableRef}
        columns={columns}
        data={data}
        scroll={{ y: 'auto' }}
        rowSelection={{}}
        slotArea={{
          topLeft() {
            return (
              <Space>
                <Button
                  type='primary'
                  onClick={() => {
                    console.log(tableRef.current?.getSelectionRowKeys())
                  }}
                >
                  选中项Key
                </Button>
                <Button
                  type='primary'
                  onClick={() => {
                    console.log(tableRef.current?.getSelectionRows())
                  }}
                >
                  选中项value
                </Button>
              </Space>
            )
          }
        }}
      />
    </div>
  )
}

export default App

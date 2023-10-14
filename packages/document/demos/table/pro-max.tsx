import React, { useRef, useState } from 'react'
import { Space } from '@arco-design/web-react'
import { Table, ColumnProps, Button, TableRef } from 'yuuki-design'

const columns: ColumnProps<DataType>[] = [
  {
    title: '商品编号',
    dataIndex: 'id',
    width: 180
  },
  {
    title: '商品名',
    dataIndex: 'name',
    ellipsis: true, // 默认为true
    width: 180
  },
  {
    title: '商品价格',
    dataIndex: 'price',
    valueType: 'digit'
  },
  {
    title: '创建时间',
    valueType: 'date',
    dataIndex: 'createTime',
    hideDefault: true
  },
  {
    title: '送货地址',
    dataIndex: 'address'
  }
]

interface DataType {
  id: string
  name: string
  createTime: string
  address: string
  email: string
}

let uid = 0
const genId = () => {
  return Date.now() + uid++
}

const data: DataType[] = Array.from(new Array(100).keys()).map((item) => ({
  id: `ISBN${genId()}`,
  name: `超长超长超长超长超长名字超长超长超长名字${item + 1}`,
  price: Number(10000 + 10000 * Math.random()),
  createTime: new Date(Date.now() + item * 24 * 3600 * 1000).toDateString(),
  address: `番斗大街番斗花园${item + 1}号`,
  email: `name${item + 1}@example.com`
}))

const App: React.FC = () => {
  const [rowData, setRowData] = useState(data)
  const tableRef = useRef<TableRef>(null)

  return (
    <div style={{ height: 400 }}>
      <Table
        config
        resizable
        draggable
        borderCell
        onDragChange={setRowData}
        rowKey='id'
        ref={tableRef}
        data={rowData}
        columns={columns}
        rowSelection={{}}
        scroll={{ y: 'auto' }}
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
                <Button
                  type='primary'
                  onClick={() => {
                    const row: DataType = {
                      id: `ISBN${genId()}`,
                      name: `增加的超长超长超长超长超长名字超长超长超长名字`,
                      createTime: new Date(Date.now()).toDateString(),
                      address: `番斗大街番斗花园xxx号`,
                      email: `email@example.com`
                    }
                    setRowData([...rowData, row])
                  }}
                >
                  新增一项
                </Button>
              </Space>
            )
          }
        }}
        opreationColumn={{
          title: null,
          width: 100,
          fixed: 'right',
          render: (record) => (
            <Button
              size='small'
              type='text'
              onClick={() =>
                setRowData(rowData.filter((item) => item.id !== record.id))
              }
            >
              删除
            </Button>
          )
        }}
      />
    </div>
  )
}

export default App

import React, { useState } from 'react'
import { Table, ColumnProps, Button } from 'yuuki-design'

const columns: ColumnProps<DataType>[] = [
  {
    title: '商品编号',
    dataIndex: 'no',
    width: 180
  },
  {
    title: '商品名',
    dataIndex: 'name',
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
  no: string
  name: string
  price: number
  createTime: string
  address: string
  email: string
}

let uid = 0
const genId = () => {
  return Date.now() + uid++
}

const data: DataType[] = Array.from(new Array(5).keys()).map((item) => ({
  no: `ISBN${genId()}`,
  name: `超长超长超长超长超长名字超长超长超长名字${item + 1}`,
  price: Number(10000 + 10000 * Math.random()),
  createTime: new Date(Date.now() + item * 24 * 3600 * 1000).toDateString(),
  address: `番斗大街番斗花园${item + 1}号`,
  email: `name${item + 1}@example.com`
}))

const App: React.FC = () => {
  const [tableData, setTableData] = useState<DataType[]>(data)

  return (
    <div style={{ height: 400 }}>
      <Table
        config
        rowKey='no'
        columns={columns}
        data={tableData}
        scroll={{ y: 'auto' }}
        slotArea={{
          topLeft() {
            return (
              <Button
                type='primary'
                onClick={() => {
                  const row: DataType = {
                    no: `ISBN${genId()}`,
                    name: `增加的超长超长超长超长超长名字超长超长超长名字`,
                    price: Number(10000 + 10000 * Math.random()),
                    createTime: new Date(Date.now()).toDateString(),
                    address: `番斗大街番斗花园xxx号`,
                    email: `email@example.com`
                  }
                  setTableData([...tableData, row])
                }}
              >
                新增一项
              </Button>
            )
          }
        }}
        opreationColumn={{
          title: null,
          width: 100,
          render: (record) => (
            <Button
              size='small'
              type='text'
              onClick={() =>
                setTableData(tableData.filter((item) => item.no !== record.no))
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

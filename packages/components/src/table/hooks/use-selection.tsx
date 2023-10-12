import { useState } from 'react'
import { isFunction } from 'lodash-es'
import { TableProps } from '../type'

export function useSelection<T>(props: TableProps<T>) {
  const { rowSelection, data } = props

  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const onChange = (selectedRowKeys: React.Key[], selectedRows: T[]) => {
    rowSelection?.onChange?.(selectedRowKeys, selectedRows)
    setSelectedKeys(selectedRowKeys)
  }

  const getSelectionRowKeys = () => {
    return rowSelection?.selectedRowKeys ?? selectedKeys
  }

  const getSelectionRows = () => {
    return (data || []).filter((item) => {
      const { rowKey } = props
      const key = (isFunction(rowKey) ? rowKey(item) : rowKey) || 'key'
      return getSelectionRowKeys().includes((item as any)[key])
    })
  }

  return {
    rowSelection: rowSelection
      ? {
          ...rowSelection,
          selectedRowKeys: rowSelection?.selectedRowKeys ?? selectedKeys,
          onChange
        }
      : undefined,
    getSelectionRowKeys,
    getSelectionRows
  }
}

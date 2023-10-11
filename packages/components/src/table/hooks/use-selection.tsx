import { useRef } from 'react'
import { isFunction } from 'lodash-es'
import { TableProps } from '../type'

export function useSelection<T>(props: TableProps<T>) {
  const { rowSelection, data } = props

  const selectedRowKeysRef = useRef(rowSelection?.selectedRowKeys ?? [])
  const onChange = (selectedRowKeys: React.Key[], selectedRows: T[]) => {
    rowSelection?.onChange?.(selectedRowKeys, selectedRows)
    selectedRowKeysRef.current =
      rowSelection?.selectedRowKeys ?? selectedRowKeys
  }

  const getSelectionRowKeys = () => {
    return selectedRowKeysRef.current
  }

  const getSelectionRows = () => {
    return (data || []).filter((item) => {
      const { rowKey } = props
      const key = (isFunction(rowKey) ? rowKey(item) : rowKey) || 'key'
      return selectedRowKeysRef.current.includes((item as any)[key])
    })
  }

  return {
    rowSelection: { ...rowSelection, onChange },
    getSelectionRowKeys,
    getSelectionRows
  }
}

import { Key } from 'react'
import { isFunction } from 'lodash-es'
import { ColumnProps, TableProps } from './type'

type RowKey<T> = TableProps<T>['rowKey']

export const getRowKey = <T>(rowKey: RowKey<T>, item: T) => {
  const key = isFunction(rowKey) ? rowKey(item) : rowKey ?? 'key'
  return (item as any)[key] as Key
}

export const getColumnKey = <T>(column: ColumnProps<T>) => {
  return String(column.key ?? column.dataIndex)
}

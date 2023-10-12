import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Table as ArcoTable, TableInstance } from '@arco-design/web-react'
import { useAutoHeight, useColumns, useSelection, useToolBar } from './hooks'
import { TableProps, TableRef } from './type'

function Table<T = any>(
  props: TableProps<T>,
  ref: React.ForwardedRef<TableRef<T>>
) {
  const { data, ...restProps } = props

  const tableRef = useRef<TableInstance>(null)
  const { srcoll } = useAutoHeight(tableRef, props.scroll)
  const { rowSelection, getSelectionRowKeys, getSelectionRows } =
    useSelection(props)
  const { columns, toolBar } = useToolBar({ ...props, rowSelection })
  const tableColumns = useColumns(columns, props)

  useImperativeHandle(ref, () => ({
    ...tableRef.current!,
    getSelectionRowKeys,
    getSelectionRows
  }))

  return (
    <>
      {toolBar}
      <ArcoTable
        {...restProps}
        ref={tableRef}
        data={data}
        columns={tableColumns}
        scroll={srcoll}
        rowSelection={rowSelection}
      />
    </>
  )
}

const TableComponent = forwardRef<TableRef, TableProps>(Table)

export default TableComponent as <T>(
  props: TableProps<T> & { ref?: React.Ref<TableRef<T>> }
) => React.ReactElement

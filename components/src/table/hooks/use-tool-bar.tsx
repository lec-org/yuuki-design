import { useEffect, useMemo, useState } from 'react'
import ToolBar from '../components/tool-bar'
import { ColumnProps, TableProps } from '../type'

type DisplayedColumn<T> = { column: ColumnProps<T>; visible: boolean }

export function useToolBar<T>(props: TableProps<T>) {
  const { slotArea, config, rowSelection, columns = [] } = props

  const [displayedColumns, setDisplayedColumns] = useState<
    DisplayedColumn<T>[]
  >([])
  useEffect(() => {
    setDisplayedColumns(
      columns.map((column: ColumnProps<T>) => {
        return {
          column,
          visible: !column.hideDefault
        }
      })
    )
  }, [columns])

  const nextColumns = useMemo(
    () =>
      displayedColumns
        .filter(({ visible }) => visible)
        .map(({ column }) => column),
    [displayedColumns]
  )

  return {
    columns: nextColumns,
    toolBar: (
      <ToolBar<T>
        slotArea={slotArea}
        config={config}
        columns={columns}
        rowSelection={rowSelection}
        displayedColumns={displayedColumns}
        onDisplayChange={setDisplayedColumns}
      />
    )
  }
}

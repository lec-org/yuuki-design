import { useState } from 'react'
import ToolBar from '../components/tool-bar'
import { ColumnProps, TableProps } from '../type'

export function useToolBar<T>(props: TableProps<T>) {
  const { slotArea, config, rowSelection, columns = [] } = props

  const [displayedColumns, setDisplayedColumns] = useState(
    columns.map((column: ColumnProps<T>) => ({
      column,
      visible: !column.hideDefault
    }))
  )

  return {
    columns: displayedColumns
      .filter(({ visible }) => visible)
      .map(({ column }) => column),
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

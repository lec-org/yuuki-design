import { useState } from 'react'
import ToolBar from '../components/tool-bar'
import { TableProps } from '../type'

export function useToolBar<T>(props: TableProps<T>) {
  const { slotArea, config, columns = [] } = props

  const [displayedColumns, setDisplayedColumns] = useState(columns)

  if (config) {
    return {
      columns: displayedColumns,
      toolBar: (
        <ToolBar<T>
          slotArea={slotArea}
          config={config}
          columns={columns}
          displayedColumns={displayedColumns ?? []}
          onDisplayChange={setDisplayedColumns}
        />
      )
    }
  }

  return { columns, toolBar: null }
}

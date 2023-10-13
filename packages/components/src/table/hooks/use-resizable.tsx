import { useEffect, useState } from 'react'
import { ResizableProps } from 'react-resizable'
import {
  TableColumnProps,
  TableProps as ArcoTableProps
} from '@arco-design/web-react'
import ResizableTitle, { ResizableTitleProps } from '../components/resizable'
import { TableProps } from '../type'

export function useResizable<T>(
  columns: TableColumnProps<T>[],
  props: TableProps<T>
): {
  components?: ArcoTableProps['components']
  columns: TableColumnProps<T>[]
} {
  const { resizable } = props

  const [resizableColumns, setResizableColumns] = useState<
    TableColumnProps<T>[]
  >([])
  useEffect(() => {
    const nextColumns = columns.map((column, index) => {
      if (index < columns.length - 1) {
        return {
          ...column,
          onHeaderCell: (col: TableColumnProps<T>) => ({
            width: col.width,
            onResize: handleResize(index),
            onInit: handleInitSize(index)
          })
        }
      }
      return column
    })
    setResizableColumns(nextColumns)
  }, [columns])

  const handleResize = (index: number): ResizableProps['onResize'] => {
    return (e, { size }) => {
      console.log(size.width)
      window.getSelection()?.removeAllRanges()
      setResizableColumns((prevColumns) => {
        const nextColumns = [...prevColumns]
        nextColumns[index] = {
          ...nextColumns[index],
          width: Math.round(size.width)
        }
        return nextColumns
      })
    }
  }
  const handleInitSize = (index: number): ResizableTitleProps['onInit'] => {
    return (size) => {
      setResizableColumns((prevColumns) => {
        if (index === prevColumns.length - 1) {
          return prevColumns
        }
        const nextColumns = [...prevColumns]
        nextColumns[index] = { ...nextColumns[index], width: size.width }
        return nextColumns
      })
    }
  }

  const components: ArcoTableProps['components'] = {
    header: {
      th: ResizableTitle
    }
  }

  return resizable ? { components, columns: resizableColumns } : { columns }
}

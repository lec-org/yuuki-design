import { useMemo } from 'react'
import { isFunction, isNumber, isString } from 'lodash-es'
import dayjs from 'dayjs'
import { TableColumnProps } from '@arco-design/web-react'
import OverflowTooltip from '../../overflow-tooltip'
import { ColumnProps, ColumnValue, TableCellRender, TableProps } from '../type'

const stringType: ColumnValue[] = ['text', 'date', 'dateTime']
const numberType: ColumnValue[] = ['digit', 'decimal', 'percent']

export function useColumns<T>(
  columns: ColumnProps<T>[],
  props: TableProps<T>
): TableColumnProps<T>[] {
  const { opreationColumn, emptyCellRender = defaultEmptyRender } = props

  const tableColumns = useMemo(() => {
    const nextColumns = columns.map<TableColumnProps<T>>((column) => {
      const {
        ellipsis = true,
        valueType = 'text',
        formatText,
        render,
        ...rest
      } = column

      const columnRender: TableCellRender = (col, item, index) => {
        if (!col && !isNumber(col)) {
          // 空值占位
          return emptyCellRender(col, item, index)
        }

        const type = isFunction(valueType)
          ? valueType(col, item, index)
          : valueType

        if (isString(col) && stringType.includes(type)) {
          let text = col
          if (type === 'date') {
            text = dayjs(text).format('YYYY-MM-DD')
          } else if (type === 'dateTime') {
            text = dayjs(text).format('YYYY-MM-DD HH:mm:ss')
          }
          text = formatText ? formatText(text) : text

          return <OverflowTooltip ellipsis={ellipsis}>{text}</OverflowTooltip>
        } else if (isNumber(col) && numberType.includes(type)) {
          let result: string | number = col
          if (type === 'digit') {
            result = result.toFixed(2)
            const reg =
              result.indexOf('.') > -1
                ? /(\d)(?=(\d{3})+\.)/g
                : /(\d)(?=(\d{3})+$)/g
            result = result.replace(reg, '$1,')
          } else if (type === 'decimal') {
            result = result.toFixed(2)
          } else if (type === 'percent') {
            result = Math.max(Math.min(result, 1), 0)
            result = `${(result * 100).toFixed(2)}%`
          }
          result = formatText ? formatText(result.toString()) : result

          return <OverflowTooltip ellipsis={ellipsis}>{result}</OverflowTooltip>
        }

        return col
      }

      return { ...rest, ellipsis, render: render ? render : columnRender }
    })

    if (opreationColumn && columns.length) {
      nextColumns.push({
        ...opreationColumn,
        render: (_, item, index) => opreationColumn.render(item, index)
      })
    }

    return nextColumns
  }, [columns, emptyCellRender, opreationColumn])

  return tableColumns
}

const defaultEmptyRender = () => {
  return <div style={{ textIndent: '1em' }}>--</div>
}

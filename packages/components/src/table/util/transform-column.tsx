import React, { useRef, useState } from 'react'
import { isFunction, isNumber, isString } from 'lodash-es'
import dayjs from 'dayjs'
import { TableColumnProps, Tooltip } from '@arco-design/web-react'
import { ColumnProps, ColumnValue, TableCellRender } from '../type'

const stringType: ColumnValue[] = ['text', 'date', 'dateTime']
const numberType: ColumnValue[] = ['digit', 'decimal', 'percent']

export function transformColumn<T>(
  columns: ColumnProps<T>[],
  option: { emptyCellRender?: TableCellRender }
): TableColumnProps<T>[] {
  const tableColumns = columns.map<TableColumnProps>((column) => {
    const {
      ellipsis = true,
      valueType = 'text',
      formatText,
      render,
      ...rest
    } = column
    const { emptyCellRender = defaultEmptyRender } = option

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

        return <TableCellText ellipsis={ellipsis}>{text}</TableCellText>
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

        return <TableCellText ellipsis={ellipsis}>{result}</TableCellText>
      }

      return col
    }

    return { ...rest, ellipsis, render: render ? render : columnRender }
  })

  return tableColumns
}

const defaultEmptyRender = () => {
  return <div style={{ textIndent: '1em' }}>--</div>
}

const TableCellText: React.FC<{
  ellipsis: boolean
  children: React.ReactNode
}> = (props) => {
  const { ellipsis, children } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  const onVisibleChange = (value: boolean) => {
    if (value) {
      const container = containerRef.current
      if (container) {
        const range = document.createRange()
        range.setStart(container, 0)
        range.setEnd(container, container.childNodes.length)
        const style = getComputedStyle(container)
        const padding =
          parseInt(style.paddingLeft, 10) + parseInt(style.paddingRight, 10)
        const scrollWidth = range.getBoundingClientRect().width + padding
        const { width: clientWidth } = container.getBoundingClientRect()
        const delta = Math.pow(10, -3) // 限制精度

        if (scrollWidth - clientWidth > delta) {
          setVisible(value) // 滚动宽度大于可视宽度认为隐藏
        }
      }
    } else {
      setVisible(value)
    }
  }

  return (
    <Tooltip
      disabled={!ellipsis}
      content={children}
      popupVisible={visible}
      onVisibleChange={onVisibleChange}
    >
      <div
        ref={containerRef}
        style={
          ellipsis
            ? {
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }
            : undefined
        }
      >
        {children}
      </div>
    </Tooltip>
  )
}

import {
  TableProps as ArcoTableProps,
  TableColumnProps,
  TableInstance
} from '@arco-design/web-react'

export interface TableProps<T = any>
  extends Omit<ArcoTableProps<T>, 'components' | 'renderPagination'> {
  /**
   * @description 单元格的值为空时显示的内容
   */
  emptyCellRender?: TableCellRender
}

type DateType = 'date' | 'dateTime'
type NumberType = 'digit' | 'decimal' | 'percent'
export type ColumnValue = 'text' | DateType | NumberType
export type TableCellRender = NonNullable<TableColumnProps['render']>

export interface ColumnProps<T = any> extends TableColumnProps<T> {
  /**
   * @description 只对column的值为string的单元格生效，格式化字符串
   */
  formatText?: (text: string) => string
  /**
   * @description column的数据格式，组件会做相应的处理
   */
  valueType?:
    | ColumnValue
    | ((col: any, item: any, index: number) => ColumnValue)
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableRef extends TableInstance {}

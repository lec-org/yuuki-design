import { Key, ReactElement } from 'react'
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
  /**
   * @description 表格周围的插槽区域
   */
  slotArea?: {
    topLeft?: () => ReactElement
    topRight?: () => ReactElement
  }
  /**
   * @description 开启列配置
   */
  config?: boolean
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

export interface TableRef<T = any> extends TableInstance {
  /**
   * @description 获取选中项的key值
   */
  getSelectionRowKeys: () => Key[]
  /**
   * @description 获取选中项
   */
  getSelectionRows: () => T[]
}

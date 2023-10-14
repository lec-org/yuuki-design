import { Key, ReactElement } from 'react'
import {
  TableProps as ArcoTableProps,
  TableColumnProps,
  TableInstance
} from '@arco-design/web-react'

export type ConfigItem = 'setting' | 'refresh'
export type TableCellRender = NonNullable<TableColumnProps['render']>
export interface TableProps<T = any>
  extends Omit<ArcoTableProps<T>, 'components' | 'renderPagination'> {
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
  config?: boolean | ConfigItem[]
  /**
   * @description 操作列列配置
   */
  opreationColumn?: TableColumnProps & {
    render: (item: T, index: number) => ReactElement
  }
  /**
   * @description 单元格的值为空时显示的内容
   */
  emptyCellRender?: TableCellRender
  /**
   * @description 是否可改变列尺寸
   */
  resizable?: boolean
  /**
   * @description 是否开启行拖拽
   */
  draggable?: boolean
  /**
   *  @description 拖拽发生后的回调
   */
  onDragChange?: (data: T[]) => void
}

type DateType = 'date' | 'dateTime'
type NumberType = 'digit' | 'decimal' | 'percent'
export type ColumnValue = 'text' | DateType | NumberType
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
  /**
   * @description 是否在初始化时隐藏列，只有开启table列配置才生效
   */
  hideDefault?: boolean
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

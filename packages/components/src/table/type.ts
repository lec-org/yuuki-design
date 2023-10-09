import {
  TableProps as ArcoTableProps,
  TableColumnProps,
  TableInstance
} from '@arco-design/web-react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableProps<T = any>
  extends Omit<ArcoTableProps<T>, 'components' | 'renderPagination'> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ColumnProps<T = any> extends TableColumnProps<T> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableRef extends TableInstance {}
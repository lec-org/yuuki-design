import {
  TableProps as ArcoTableProps,
  TableColumnProps
} from '@arco-design/web-react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableProps
  extends Omit<ArcoTableProps, 'components' | 'renderPagination'> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ColumnProps extends TableColumnProps {}

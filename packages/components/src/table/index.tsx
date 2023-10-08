import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import {
  ConfigProvider,
  Table as ArcoTable,
  TableInstance
} from '@arco-design/web-react'
import { TableProps, TableRef } from './type'

const { ConfigContext } = ConfigProvider

function Table<T = any>(
  props: TableProps<T>,
  ref: React.ForwardedRef<TableRef>
) {
  const { columns, data, scroll, ...restProps } = props

  const isAutoHeight = scroll?.y === 'auto' // 自动高度
  const [autoHeight, setAutoHeight] = useState<number | true>(true)

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('table')

  useLayoutEffect(() => {
    const table = tableRef.current!.getRootDomElement()
    const container = table.parentElement!
    // table高度 = header高度 + body高度 + 分页器高度（若存在）
    const thead = table.querySelector<HTMLDivElement>(`.${prefixCls}-header`)!
    const pagination = table.querySelector<HTMLDivElement>(
      `.${prefixCls}-pagination`
    )

    const computedTableHeight = () => {
      const tableHeight =
        container.getBoundingClientRect().height -
        Array.from(container.children).reduce(
          (pre, child) =>
            Object.is(table, child)
              ? pre
              : pre + child.getBoundingClientRect().height,
          0
        )
      // 关于marigin和border暂时难解决，所以会留下一定空隙
      const bodyHeight =
        tableHeight -
        thead.getBoundingClientRect().height -
        (pagination?.getBoundingClientRect().height ?? 0)

      // bodyHeight不够则无法自动高度
      setAutoHeight(bodyHeight > 0 ? bodyHeight : true)
    }

    if (isAutoHeight) {
      computedTableHeight()
      window.addEventListener('resize', computedTableHeight)
    }

    return () => {
      window.removeEventListener('resize', computedTableHeight)
    }
  }, [isAutoHeight, prefixCls])

  const tableRef = useRef<TableInstance>(null)
  useImperativeHandle(ref, () => ({
    ...tableRef.current!
  }))

  return (
    <ArcoTable
      {...restProps}
      ref={tableRef}
      columns={columns}
      data={data}
      scroll={{ ...scroll, y: isAutoHeight ? autoHeight : scroll?.y }}
    />
  )
}

const TableComponent = forwardRef<TableRef, TableProps>(Table)

export default TableComponent as <T>(
  props: TableProps<T>,
  ref: React.ForwardedRef<TableRef>
) => React.ReactElement

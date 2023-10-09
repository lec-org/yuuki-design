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
    const table = tableRef.current?.getRootDomElement()
    const wrapper = table?.parentElement
    // table高度 = header高度 + body高度 + 分页器高度（若存在）
    const thead = table?.querySelector<HTMLDivElement>(`.${prefixCls}-header`)
    const pagination = table?.querySelector<HTMLDivElement>(
      `.${prefixCls}-pagination`
    )
    const container = table?.querySelector<HTMLDivElement>(
      `.${prefixCls}-container`
    )

    const computedTableHeight = () => {
      if (!wrapper || !table || !container || !thead) {
        return
      }
      const tableHeight =
        wrapper.clientHeight -
        Array.from(wrapper.children).reduce(
          (pre, child) =>
            Object.is(table, child) ? pre : pre + child.clientHeight,
          0
        )

      const borderHeight = container.offsetHeight - container.clientHeight
      const gapHeight = 2 // 留2px的间隙(border的真实px与预设不符合)
      // thead在arco中为负数margin，若为正数可能需要考虑margin(负数marigin的clientHeight有点奇怪)
      const bodyHeight =
        tableHeight -
        gapHeight -
        borderHeight -
        thead.clientHeight -
        (pagination?.clientHeight ?? 0)

      // bodyHeight不够则无法自动高度
      setAutoHeight(bodyHeight > 0 ? bodyHeight : true)
    }

    const observer = new ResizeObserver(computedTableHeight)

    if (isAutoHeight) {
      wrapper && observer.observe(wrapper)
    }

    return () => {
      observer.disconnect()
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
  props: TableProps<T> & { ref?: React.Ref<TableRef> }
) => React.ReactElement

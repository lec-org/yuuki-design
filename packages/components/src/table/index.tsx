import {
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
import { TableProps } from './type'

const { ConfigContext } = ConfigProvider

const Table = forwardRef<unknown, TableProps>((props, ref) => {
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
    // const tbody = table.querySelector<HTMLDivElement>(`.${prefixCls}-body`)!
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

      if (bodyHeight > 0) {
        // bodyHeight不够则无法自动高度
        setAutoHeight(bodyHeight)
        // tbody.style.height = `${bodyHeight}px`
        // tbody.style.overflowY = 'auto'
      }
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
  useImperativeHandle(ref, () => ({}))

  return (
    <ArcoTable
      {...restProps}
      ref={tableRef}
      columns={columns}
      data={data}
      scroll={{ ...scroll, y: isAutoHeight ? autoHeight : scroll?.y }}
    />
  )
})

export default Table

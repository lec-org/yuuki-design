import { RefObject, useContext, useState } from 'react'
import { useSize, useUpdateLayoutEffect } from 'ahooks'
import { ConfigProvider, TableInstance } from '@arco-design/web-react'
import { TableProps } from '../type'

const { ConfigContext } = ConfigProvider

export const useAutoHeight = (
  tableRef: RefObject<TableInstance>,
  scroll: TableProps['scroll']
) => {
  const isAutoHeight = scroll?.y === 'auto' // 自动高度
  const [autoHeight, setAutoHeight] = useState<number | true>(true)
  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('table')

  const wrapperSize = useSize(
    () => tableRef.current?.getRootDomElement()?.parentElement
  )
  useUpdateLayoutEffect(() => {
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
        Array.from(wrapper.children).reduce((pre, child) => {
          if (child.classList.contains(prefixCls)) {
            return pre
          }
          const style = getComputedStyle(child)
          const height =
            child.clientHeight +
            parseInt(style.marginTop, 10) +
            parseInt(style.marginBottom, 10)
          return pre + height
        }, 0)

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

    if (isAutoHeight) {
      computedTableHeight()
    } else {
      setAutoHeight(true)
    }
  }, [isAutoHeight, prefixCls, wrapperSize]) // 起一个ResizeObserver的作用

  return { srcoll: { ...scroll, y: isAutoHeight ? autoHeight : scroll?.y } }
}

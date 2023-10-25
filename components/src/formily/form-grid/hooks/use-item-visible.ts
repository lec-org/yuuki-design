import { useEffect, useRef, useState } from 'react'

export function useItemVisible({
  cols,
  collapsed,
  collapsedRows
}: {
  cols: number
  collapsed?: boolean
  collapsedRows?: number
}) {
  const [overflow, setOverFlow] = useState(false)
  const [visibleItemList, setVisibleItemList] = useState<Element[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const visibleList: Element[] = []

    const itemList = Array.from(container.children).filter((child) => {
      const attribute = child.getAttribute('data-grid-span')
      return attribute && !Number.isNaN(Number(attribute))
    })
    const isOverflow = (span: number) => {
      return Math.ceil(span / cols) > (collapsedRows ?? 1) // 加起来放不下就超了
    }
    const getSuffix = (el: Element) => {
      return Boolean(el.getAttribute('data-suffix'))
    }
    const getGridSpan = (el: Element) => {
      return Number(el.getAttribute('data-grid-span'))
    }

    if (collapsed) {
      let spanSum = 0
      for (const element of itemList) {
        if (getSuffix(element)) {
          spanSum += getGridSpan(element)
          visibleList.push(element)
        }
      }

      if (!isOverflow(spanSum)) {
        for (const element of itemList) {
          if (!getSuffix(element)) {
            spanSum += getGridSpan(element)

            // eslint-disable-next-line max-depth
            if (isOverflow(spanSum)) {
              break
            }

            visibleList.push(element)
          }
        }
      }

      setVisibleItemList(visibleList)
      setOverFlow(
        itemList.some((item) => !getSuffix(item) && !visibleList.includes(item))
      )
    } else {
      setVisibleItemList(itemList)
    }
  }, [collapsed, collapsedRows, cols])

  return { containerRef, overflow, visibleItemList }
}

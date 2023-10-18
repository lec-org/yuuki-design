import { useState, useRef, useEffect } from 'react'
import { useSize } from 'ahooks'

export function useOverFlow<Container extends HTMLElement>() {
  const [overflow, setOverflow] = useState(false)
  const containerRef = useRef<Container>(null)
  const containerSize = useSize(containerRef)

  useEffect(() => {
    requestAnimationFrame(() => {
      const container = containerRef.current
      if (container) {
        const range = document.createRange()
        range.setStart(container, 0)
        range.setEnd(container, container.childNodes.length)
        const style = getComputedStyle(container)
        const padding =
          parseInt(style.paddingLeft, 10) + parseInt(style.paddingRight, 10)
        const scrollWidth = range.getBoundingClientRect().width + padding
        const { width: clientWidth } = container.getBoundingClientRect()
        const delta = Math.pow(10, -3) // 限制精度

        if (scrollWidth - clientWidth > delta) {
          setOverflow(true) // 滚动宽度大于可视宽度认为隐藏
        } else {
          setOverflow(false)
        }
      }
    })
  }, [containerSize?.width])

  return { overflow, containerRef }
}

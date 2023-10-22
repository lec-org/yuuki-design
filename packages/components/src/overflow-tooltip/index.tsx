import React, { useRef, useState } from 'react'
import { Tooltip } from '@arco-design/web-react'

export interface OverflowTooltipProps {
  children: React.ReactNode
  ellipsis: boolean
}

const OverflowTooltip: React.FC<OverflowTooltipProps> = (props) => {
  const { ellipsis, children } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  const onVisibleChange = (value: boolean) => {
    if (value) {
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
          setVisible(value) // 滚动宽度大于可视宽度认为隐藏
        }
      }
    } else {
      setVisible(value)
    }
  }

  return (
    <Tooltip
      disabled={!ellipsis}
      content={children}
      popupVisible={visible}
      onVisibleChange={onVisibleChange}
    >
      <div
        ref={containerRef}
        style={
          ellipsis
            ? {
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }
            : undefined
        }
      >
        {children}
      </div>
    </Tooltip>
  )
}

export default OverflowTooltip

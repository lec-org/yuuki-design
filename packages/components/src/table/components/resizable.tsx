import React, { forwardRef, useLayoutEffect, useRef } from 'react'
import { Resizable, ResizableProps } from 'react-resizable'
import { isUndefined } from 'lodash-es'

interface ResizeHandleProps {
  handleAxis?: string
  onMouseDown?: React.MouseEventHandler<HTMLSpanElement>
  onMouseUp?: React.MouseEventHandler<HTMLSpanElement>
  onTouchEnd?: React.TouchEventHandler<HTMLSpanElement>
  [key: string]: any
}
const ResizeHandle = forwardRef<HTMLSpanElement, ResizeHandleProps>(
  (props, ref) => {
    const { handleAxis, ...restProps } = props
    // 这里的span通过css定位的方式将其移动到了边框位置

    return (
      <span
        ref={ref}
        className={`react-resizable-handle react-resizable-handle-${handleAxis}`}
        {...restProps}
        onClick={(e) => e.stopPropagation()}
      />
    )
  }
)

export interface ResizableTitleProps
  extends Pick<ResizableProps, 'width' | 'onResize'> {
  onInit?: (size: { width: number; height: number }) => void // 用于计算自适应宽度
  [key: string]: any // 其它属性有但没有标类型的必要
}
const ResizableTitle: React.FC<ResizableTitleProps> = (props) => {
  const { onInit, onResize, width, ...restProps } = props

  const thRef = useRef<HTMLTableHeaderCellElement>(null)
  useLayoutEffect(() => {
    const th = thRef.current

    if (th && isUndefined(width)) {
      const { clientWidth, clientHeight } = th
      onInit?.({ width: clientWidth, height: clientHeight })
    }
  }, [onInit, width])

  if (!width) {
    return <th ref={thRef} {...restProps} />
  }

  return (
    <Resizable
      height={0}
      width={width}
      onResize={onResize}
      handle={<ResizeHandle />}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th ref={thRef} {...restProps} />
    </Resizable>
  )
}

export default ResizableTitle

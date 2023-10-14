import React, { useContext, useMemo } from 'react'
import { ConfigProvider } from '@arco-design/web-react'
import { IconDragDotVertical } from '@arco-design/web-react/icon'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const { ConfigContext } = ConfigProvider

export interface DraggableRowProps<T> {
  children?: React.ReactNode
  className: string
  recordKey: React.Key
  index: number
  record: T
}
export function DraggableRow<T>(props: DraggableRowProps<T>) {
  const { recordKey, record, ...restProps } = props

  const { attributes, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: recordKey
    })

  const style = useMemo<React.CSSProperties>(
    () => ({
      transform: CSS.Transform.toString(
        transform && { ...transform, scaleY: 1 }
      ),
      transition,
      ...(isDragging ? { position: 'relative', zIndex: 1 } : {})
    }),
    [isDragging, transform, transition]
  )

  return <tr {...restProps} ref={setNodeRef} style={style} {...attributes} />
}

export interface DragHandleProps<T> {
  recordKey: React.Key
  record: T
}
export function DragHandle<T>(props: DragHandleProps<T>) {
  const { recordKey } = props

  const { listeners, setActivatorNodeRef } = useSortable({
    id: recordKey
  })

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('table')

  return (
    <td className={`${prefixCls}-td ${prefixCls}-td-sort`}>
      <div className={`${prefixCls}-cell`}>
        <IconDragDotVertical
          ref={setActivatorNodeRef}
          style={{ touchAction: 'none', cursor: 'move' }}
          {...listeners}
        />
      </div>
    </td>
  )
}

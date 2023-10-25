import { ReactElement, ReactNode, useMemo } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { TableProps as ArcoTableProps } from '@arco-design/web-react'
import {
  DragHandle,
  DraggableRow,
  DraggableRowProps
} from '../components/draggable'
import { getRowKey } from '../util'
import { TableProps } from '../type'

type ComponentWithChildren = (props: { children?: ReactNode }) => ReactElement

export function useDraggable<T>(props: TableProps<T>): {
  components?: ArcoTableProps['components']
  DraggableProvider: ComponentWithChildren
} {
  const { draggable, onDragChange, rowKey, data = [] } = props

  const components: ArcoTableProps['components'] = {
    header: {
      operations: ({ selectionNode, expandNode }) => [
        {
          node: <th />,
          width: 40
        },
        {
          name: 'expandNode',
          node: expandNode
        },
        {
          name: 'selectionNode',
          node: selectionNode
        }
      ]
    },
    body: {
      operations: ({ selectionNode, expandNode }) => [
        {
          node: (record: T) => (
            <DragHandle<T>
              record={record}
              recordKey={getRowKey(rowKey, record)}
            />
          ),
          width: 40
        },
        {
          name: 'expandNode',
          node: expandNode
        },
        {
          name: 'selectionNode',
          node: selectionNode
        }
      ],
      row: (params: Omit<DraggableRowProps<T>, 'recordKey'>) => (
        <DraggableRow<T>
          {...params}
          recordKey={getRowKey(rowKey, params.record)}
        />
      )
    }
  }

  const DraggableProvider = useMemo<ComponentWithChildren>(() => {
    if (!draggable) {
      return ({ children }) => <>{children}</>
    }

    const onDragEnd = ({ active, over }: DragEndEvent) => {
      if (active.id !== over?.id) {
        const activeIndex = data.findIndex(
          (item) => getRowKey(rowKey, item) === active.id
        )
        const overIndex = data.findIndex(
          (item) => getRowKey(rowKey, item) === over?.id
        )
        const newData = arrayMove(data, activeIndex, overIndex)
        onDragChange?.(newData)
      }
    }

    return ({ children }) => (
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={data.map((item) => getRowKey(rowKey, item))} // rowKey array
          strategy={verticalListSortingStrategy}
        >
          {children}
        </SortableContext>
      </DndContext>
    )
  }, [data, draggable, onDragChange, rowKey])

  return draggable ? { components, DraggableProvider } : { DraggableProvider }
}

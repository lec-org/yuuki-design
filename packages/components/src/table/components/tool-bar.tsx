import { useContext, useMemo } from 'react'
import { isBoolean } from 'lodash-es'
import {
  Checkbox,
  ConfigProvider,
  Dropdown,
  Link,
  Tree
} from '@arco-design/web-react'
import { IconRefresh, IconSettings } from '@arco-design/web-react/icon'
import { ColumnProps, ConfigItem, TableProps } from '../type'

const { ConfigContext } = ConfigProvider

type DisplayedColumn<T> = { column: ColumnProps<T>; visible: boolean }

export interface ToolBarProps<T>
  extends Pick<
    TableProps<T>,
    'columns' | 'config' | 'slotArea' | 'rowSelection'
  > {
  displayedColumns: DisplayedColumn<T>[]
  onDisplayChange: (columns: DisplayedColumn<T>[]) => void
}

function ToolBar<T>(props: ToolBarProps<T>) {
  const {
    slotArea,
    config,
    columns,
    rowSelection,
    displayedColumns,
    onDisplayChange
  } = props
  const { topLeft, topRight } = slotArea || {}

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('table')

  const { checkAll, indeterminate, checkedKeys } = useMemo(() => {
    const visibleColumn = displayedColumns
      .filter(({ visible }) => visible)
      .map(({ column }) => column)

    const checkAll = Boolean(
      columns?.length && visibleColumn.length === columns.length
    ) // 全选
    const indeterminate = Boolean(
      columns?.length &&
        visibleColumn.length &&
        visibleColumn.length !== columns.length
    ) // 半选
    const checkedKeys = visibleColumn.map((column) => getColumnKey(column))

    return { checkAll, indeterminate, checkedKeys }
  }, [columns?.length, displayedColumns])

  const settingMenu = useMemo(() => {
    return (
      <div className={`${prefixCls}-setting-menu`}>
        <div className={`${prefixCls}-setting-menu-header`}>
          <Checkbox
            checked={checkAll}
            indeterminate={indeterminate}
            onChange={(checked) =>
              onDisplayChange(
                checked
                  ? displayedColumns.map(({ column }) => ({
                      column,
                      visible: true
                    }))
                  : displayedColumns.map(({ column }) => ({
                      column,
                      visible: false
                    }))
              )
            }
          >
            列展示
          </Checkbox>
          <Link
            hoverable={false}
            onClick={() => {
              onDisplayChange(
                (columns || []).map((column: ColumnProps<T>) => ({
                  column,
                  visible: !column.hideDefault
                }))
              )
            }}
          >
            重置
          </Link>
        </div>
        <Tree
          blockNode
          checkable
          draggable
          checkedKeys={checkedKeys}
          onCheck={(keys) =>
            onDisplayChange(
              displayedColumns.map(({ column }) => ({
                column,
                visible: keys.includes(getColumnKey(column))
              }))
            )
          }
          allowDrop={({ dropPosition }) => Boolean(dropPosition)}
          onDrop={({ dragNode, dropNode, dropPosition }) => {
            if (!dropPosition) {
              return
            }
            const data = [...displayedColumns]
            const dragIndex = data.findIndex(
              ({ column }) => getColumnKey(column) === dragNode?.key
            )
            const dragItem = data[dragIndex]
            data.splice(dragIndex, 1)
            const dropIndex = data.findIndex(
              ({ column }) => getColumnKey(column) === dropNode?.key
            )
            data.splice(
              dropPosition < 0 ? dropIndex : dropIndex + 1,
              0,
              dragItem
            )
            onDisplayChange(data)
          }}
          className={`${prefixCls}-setting-menu-list`}
        >
          {displayedColumns?.map(({ column: { title, key, dataIndex } }) => (
            <Tree.Node key={key ?? dataIndex} title={title} />
          ))}
        </Tree>
      </div>
    )
  }, [
    prefixCls,
    checkAll,
    indeterminate,
    checkedKeys,
    onDisplayChange,
    displayedColumns,
    columns
  ])

  const onRefresh = () => {
    onDisplayChange([...displayedColumns]) // 仅刷新
    rowSelection?.onChange?.([], [])
  }

  const displayedConfigItems = useMemo(() => {
    if (isBoolean(config)) {
      return config ? configItems : []
    }
    return config ?? []
  }, [config])

  if (!topLeft && !topRight && !displayedConfigItems.length) {
    return <></>
  }

  return (
    <div className={`${prefixCls}-toolbar`}>
      <div className={`${prefixCls}-slot-top`}>
        <div className={`${prefixCls}-slot-top-left`}>{topLeft?.()}</div>
        <div className={`${prefixCls}-slot-top-right`}>{topRight?.()}</div>
      </div>
      {displayedConfigItems.length > 0 && (
        <div className={`${prefixCls}-config`}>
          {displayedConfigItems.includes('refresh') && (
            <div className={`${prefixCls}-config-item`} onClick={onRefresh}>
              <IconRefresh />
            </div>
          )}
          {displayedConfigItems.includes('setting') && (
            <Dropdown droplist={settingMenu} trigger='click' position='br'>
              <div className={`${prefixCls}-config-item`}>
                <IconSettings />
              </div>
            </Dropdown>
          )}
        </div>
      )}
    </div>
  )
}

export default ToolBar

const configItems: ConfigItem[] = ['setting', 'refresh'] // 可提供的配置项

function getColumnKey<T>(column: ColumnProps<T>) {
  return String(column.key ?? column.dataIndex)
}

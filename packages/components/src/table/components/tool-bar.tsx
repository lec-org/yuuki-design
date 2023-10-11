import { useContext, useMemo } from 'react'
import {
  Checkbox,
  ConfigProvider,
  Dropdown,
  Link,
  Tree
} from '@arco-design/web-react'
import { IconRefresh, IconSettings } from '@arco-design/web-react/icon'
import { ColumnProps, TableProps } from '../type'

const { ConfigContext } = ConfigProvider

export interface ToolBarProps<T>
  extends Pick<TableProps<T>, 'columns' | 'config' | 'slotArea'> {
  displayedColumns: ColumnProps<T>[]
  onDisplayChange: (columns: ColumnProps<T>[]) => void
}

function ToolBar<T>(props: ToolBarProps<T>) {
  const { slotArea, config, columns, displayedColumns, onDisplayChange } = props
  const { topLeft, topRight } = slotArea || {}

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('table')

  const { checkAll, indeterminate, checkedKeys } = useMemo(() => {
    const checkAll = Boolean(
      columns?.length && displayedColumns.length === columns.length
    ) // 全选
    const indeterminate = Boolean(
      columns?.length &&
        displayedColumns.length &&
        displayedColumns.length !== columns.length
    ) // 半选
    const checkedKeys = displayedColumns.map((column) => getColumnKey(column))

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
                  ? getColumnsByKeys(
                      columns,
                      (columns || []).map((column) => getColumnKey(column))
                    )
                  : []
              )
            }
          >
            列展示
          </Checkbox>
          <Link hoverable={false}>重置</Link>
        </div>
        <Tree
          blockNode
          checkable
          draggable
          checkedKeys={checkedKeys}
          onCheck={(keys) => onDisplayChange(getColumnsByKeys(columns, keys))}
          allowDrop={({ dropPosition }) => Boolean(dropPosition)}
          className={`${prefixCls}-setting-menu-list`}
        >
          {(columns || []).map(({ title, key, dataIndex }) => (
            <Tree.Node key={key ?? dataIndex} title={title} />
          ))}
        </Tree>
      </div>
    )
  }, [
    checkAll,
    checkedKeys,
    columns,
    indeterminate,
    onDisplayChange,
    prefixCls
  ])

  if (!topLeft && !topRight && !config) {
    return <></>
  }

  return (
    <div className={`${prefixCls}-toolbar`}>
      <div className={`${prefixCls}-slot-top`}>
        <div className={`${prefixCls}-slot-top-left`}>{topLeft?.()}</div>
        <div className={`${prefixCls}-slot-top-right`}>{topRight?.()}</div>
      </div>
      {config && (
        <div className={`${prefixCls}-config`}>
          <div className={`${prefixCls}-config-item`}>
            <IconRefresh />
          </div>
          <Dropdown droplist={settingMenu} trigger='click' position='br'>
            <div className={`${prefixCls}-config-item`}>
              <IconSettings />
            </div>
          </Dropdown>
        </div>
      )}
    </div>
  )
}

export default ToolBar

function getColumnKey<T>(column: ColumnProps<T>) {
  return String(column.key ?? column.dataIndex)
}

function getColumnsByKeys<T>(columns: ColumnProps<T>[] = [], keys: string[]) {
  return columns.filter(({ key, dataIndex }) =>
    keys.includes(String(key ?? dataIndex))
  )
}

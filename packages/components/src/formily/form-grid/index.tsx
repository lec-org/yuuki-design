import React, { useContext, useEffect, useRef } from 'react'
import cx from 'classnames'
import { observer } from '@formily/react'
import { ConfigProvider } from '@arco-design/web-react'
import { useItemVisible, useResponsiveValue } from './hooks'
import { FormGridContext } from './context'
import { FormGridProps, FormGridItemProps } from './type'

const { ConfigContext } = ConfigProvider

const FormGrid: React.FC<FormGridProps> = observer((props) => {
  const { children, className, style, collapsed, collapsedRows } = props

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('form-grid')

  const cols = useResponsiveValue({ value: props.cols, defaultValue: 3 })
  const colGap = useResponsiveValue({ value: props.colGap, defaultValue: 0 })
  const rowGap = useResponsiveValue({ value: props.rowGap, defaultValue: 0 })

  const { containerRef, visibleItemList, overflow } = useItemVisible({
    cols,
    collapsed,
    collapsedRows
  })
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gap: `${rowGap}px ${colGap}px`,
    gridTemplateColumns: `repeat(${cols}, minmax(0px, 1fr))`
  }

  return (
    <div
      ref={containerRef}
      className={cx(prefixCls, className)}
      style={{ ...gridStyle, ...style }}
    >
      <FormGridContext.Provider
        value={{
          gridClassName: `${prefixCls}-item`,
          visibleItemList,
          overflow
        }}
      >
        {children}
      </FormGridContext.Provider>
    </div>
  )
})

const GridItem: React.FC<FormGridItemProps> = (props) => {
  const { children, className, style, suffix } = props

  const { gridClassName, visibleItemList } = useContext(FormGridContext)

  const span = useResponsiveValue({ value: props.span, defaultValue: 1 })

  const itemRef = useRef<HTMLDivElement>(null)
  const getGridStyle = () => {
    const gridStyle: React.CSSProperties = {
      gridColumn: `span ${span} / auto`
    }

    const item = itemRef.current
    if (!item || !visibleItemList?.includes(item)) {
      gridStyle.display = 'none'
    }

    return gridStyle
  }
  const gridStyle = getGridStyle()
  useEffect(() => {
    const element = itemRef.current
    if (element) {
      element.setAttribute('data-grid-span', String(span))
      suffix && element.setAttribute('data-sufifx', '')
    }
  }, [span, suffix])

  return (
    <div
      ref={itemRef}
      className={cx(gridClassName, className)}
      style={{ ...gridStyle, ...style }}
    >
      {children}
    </div>
  )
}

const FormGridComponent = FormGrid as typeof FormGrid & {
  GridItem: typeof GridItem
}
FormGridComponent.GridItem = GridItem

export default FormGridComponent

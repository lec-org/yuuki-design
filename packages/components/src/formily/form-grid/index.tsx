import React, { useContext, useMemo } from 'react'
import { observer } from '@formily/react'
import cx from 'classnames'
import { ConfigProvider } from '@arco-design/web-react'
import { useResponsiveValue } from './hooks'
import { FormGridLayout, FormGridLayoutContext, defaultValue } from './context'
import { FormGridProps, FormGridItemProps } from './type'

const { ConfigContext } = ConfigProvider

const FormGrid: React.FC<FormGridProps> = observer((props) => {
  const { children, className, style } = props

  const { getPrefixCls } = useContext(ConfigContext) // 有默认值，无Provider也可以使用
  const prefixCls = getPrefixCls!('form-grid')

  const cols = useResponsiveValue(props.cols ?? 3)
  const colGap = useResponsiveValue(props.colGap ?? 0)
  const rowGap = useResponsiveValue(props.rowGap ?? 0)

  const gridStyle: React.CSSProperties = {
    gap: `${rowGap}px ${colGap}px`,
    gridTemplateColumns: `repeat(${cols}, minmax(0px, 1fr))`
  }

  const contextValue = useMemo<FormGridLayout>(
    () => ({
      ...defaultValue,
      prefixCls: getPrefixCls!('form-grid-item')
    }),
    [getPrefixCls]
  )

  return (
    <div
      className={cx(prefixCls, className)}
      style={{ ...gridStyle, ...style }}
    >
      <FormGridLayoutContext.Provider value={contextValue}>
        {children}
      </FormGridLayoutContext.Provider>
    </div>
  )
})

const GridItem: React.FC<FormGridItemProps> = (props) => {
  const { children, className, style, span = 1 } = props

  const { prefixCls } = useContext(FormGridLayoutContext)

  const gridStyle: React.CSSProperties = {
    gridColumn: `span ${span} / auto`
  }

  return (
    <div
      className={cx(prefixCls, className)}
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

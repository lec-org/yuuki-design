import React, { useContext, useMemo } from 'react'
import cx from 'classnames'
import { observer } from '@formily/react'
import { ConfigProvider } from '@arco-design/web-react'
import { FormLayoutContext, FormLayoutContextType } from './context'
import { FormLayoutProps } from './type'

const { ConfigContext } = ConfigProvider

const FormLayout: React.FC<FormLayoutProps> = observer((props) => {
  const { children, className, style, ...restProps } = props

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('form-layout')

  const contextValue = useMemo<FormLayoutContextType>(
    () => ({
      layout: 'horizontal',
      labelCol: { flex: 'none' },
      wrapperCol: { flex: 'auto' },
      colon: true,
      asterisk: true,
      ...restProps
    }),
    [restProps]
  )

  return (
    <div className={cx(prefixCls, className)} style={style}>
      <FormLayoutContext.Provider value={contextValue}>
        {children}
      </FormLayoutContext.Provider>
    </div>
  )
})

export default FormLayout

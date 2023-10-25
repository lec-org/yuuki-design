import React, { useContext } from 'react'
import cx from 'classnames'
import { ConfigProvider, Space } from '@arco-design/web-react'
import FormItem from '../form-item'
import { FormButtonGroupProps } from './type'

const { ConfigContext } = ConfigProvider

const FormButtonGroup: React.FC<FormButtonGroupProps> = (props) => {
  const { children, className, style, size } = props

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('form-button-group')

  return (
    <Space className={cx(prefixCls, className)} style={style} size={size}>
      {children}
    </Space>
  )
}

const FormItemButton: React.FC<FormButtonGroupProps> = (props) => {
  const { children, size, className, style } = props

  return (
    <FormItem className={className} style={style} colon={false}>
      {'length' in (children as any) ? (
        <Space size={size}>{children}</Space>
      ) : (
        children
      )}
    </FormItem>
  )
}

const FormButtonGroupComponent = FormButtonGroup as typeof FormButtonGroup & {
  FormItem: typeof FormItemButton
}
FormButtonGroupComponent.FormItem = FormItemButton

export default FormButtonGroupComponent

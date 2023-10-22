import React, { useContext } from 'react'
import { connect, mapReadPretty, observer } from '@formily/react'
import { ConfigProvider, Input } from '@arco-design/web-react'
import { InputProps, InputPasswordProps } from '@arco-design/web-react/es/Input'
import OverflowTooltip from '@/overflow-tooltip'

const { ConfigContext } = ConfigProvider

const PreviewInput: React.FC<InputProps> = observer((props) => {
  const { value, prefix, suffix } = props

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('form-input-preview')

  return (
    <div className={prefixCls}>
      {prefix}
      <OverflowTooltip ellipsis>{value}</OverflowTooltip>
      {suffix}
    </div>
  )
})

const PreviewPassword: React.FC<InputPasswordProps> = observer((props) => {
  const { value, prefix, suffix } = props

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('form-password-preview')

  return (
    <Input.Password
      disabled
      className={prefixCls}
      value={value}
      prefix={prefix}
      suffix={suffix}
    />
  )
})

const FormInput = connect(Input, mapReadPretty(PreviewInput))
const FormPassword = connect(Input.Password, mapReadPretty(PreviewPassword))

const FormInputComponent = FormInput as typeof FormInput & {
  Password: typeof FormPassword
}
FormInputComponent.Password = FormPassword

export default FormInputComponent

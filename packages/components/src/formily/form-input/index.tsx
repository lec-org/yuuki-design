import React, { useContext } from 'react'
import { connect, mapReadPretty, observer } from '@formily/react'
import { ConfigProvider, Input, Typography } from '@arco-design/web-react'
import {
  InputProps,
  InputPasswordProps,
  TextAreaProps
} from '@arco-design/web-react/es/Input'
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

const PreviewTextArea: React.FC<TextAreaProps> = observer((props) => {
  const { value } = props

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('form-text-area-preview')

  return (
    <Typography.Paragraph className={prefixCls}>{value}</Typography.Paragraph>
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
const FormTextArea = connect(Input.TextArea, mapReadPretty(PreviewTextArea))
const FormPassword = connect(Input.Password, mapReadPretty(PreviewPassword))

const FormInputComponent = FormInput as typeof FormInput & {
  TextArea: typeof FormTextArea
  Password: typeof FormPassword
}
FormInputComponent.TextArea = FormTextArea
FormInputComponent.Password = FormPassword

export default FormInputComponent

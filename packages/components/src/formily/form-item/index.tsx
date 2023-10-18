import React, { useContext } from 'react'
import { isVoidField } from '@formily/core'
import { connect, mapProps, observer } from '@formily/react'
import { ConfigProvider, Form } from '@arco-design/web-react'
import { useFormLayout } from './hooks'
import { FormItemProps } from './type'

const { ConfigContext } = ConfigProvider
const { Item: ArcoFormItem } = Form

const FormItem: React.FC<FormItemProps> = observer((props) => {
  const { children, style, gridSpan, asterisk, label, ...restProps } = props

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('form-item')

  const { className: gridClassName } = useFormLayout(props)

  const gridStyle: React.CSSProperties = {
    gridColumn: gridClassName ? `span ${gridSpan ?? 1} / auto` : 'unset'
  }

  const renderLabel = () => {
    return <span className={`${prefixCls}-label-text`}>{label}</span>
  }

  return (
    <ArcoFormItem
      {...restProps}
      style={{ ...gridStyle, ...style }}
      required={asterisk}
      label={renderLabel()}
    >
      {children}
    </ArcoFormItem>
  )
})

const FormItemComponent = connect(
  FormItem,
  mapProps((props, field) => {
    if (isVoidField(field)) {
      return {
        label: field.title || props.label,
        asterisk: props.asterisk,
        extra: props.extra || field.description
      }
    }
    if (!field) {
      return props
    }

    const takeValidateStatus = (): FormItemProps['validateStatus'] => {
      if (field.validating) {
        return 'validating'
      }
      return field.decoratorProps.validateStatus || field.validateStatus
    }

    // eslint-disable-next-line consistent-return
    const takeMessage = () => {
      const split = (messages: any[]) => {
        return messages.reduce((buf, text, index) => {
          if (!text) {
            return buf
          }
          return index < messages.length - 1
            ? buf.concat([text, ', '])
            : buf.concat([text])
        }, [])
      }
      if (field.validating) {
        return undefined
      }
      if (props.validateStatus) {
        return props.help
      }
      if (field.selfErrors.length) {
        return split(field.selfErrors)
      }
      if (field.selfWarnings.length) {
        return split(field.selfWarnings)
      }
      if (field.selfSuccesses.length) {
        return split(field.selfSuccesses)
      }
    }

    const takeAsterisk = () => {
      if ('asterisk' in props) {
        return field.required && props.asterisk
      }

      return field.required && field.pattern !== 'readPretty'
    }

    return {
      label: props.label || field.title,
      help: takeMessage(),
      asterisk: takeAsterisk(),
      validateStatus: takeValidateStatus(),
      extra: props.extra || field.description
    }
  })
)

export default FormItemComponent

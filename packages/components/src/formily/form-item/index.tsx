import React, { useContext, useEffect, useRef } from 'react'
import { omit } from 'lodash-es'
import { isVoidField } from '@formily/core'
import { connect, mapProps, observer } from '@formily/react'
import { ConfigProvider, Form, Tooltip } from '@arco-design/web-react'
import { useFormLayout, useOverFlow } from './hooks'
import { FormItemProps } from './type'

const { ConfigContext } = ConfigProvider
const { Item: ArcoFormItem } = Form

const FormItem: React.FC<FormItemProps> = observer((props) => {
  const { children, style, suffix, required, label, ...restProps } = props

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('form-item')

  const {
    gridClassName,
    gridSpan,
    asterisk,
    colon,
    overflow: gridOverflow,
    visibleItemList,
    ...formLayout
  } = useFormLayout(props)
  const { containerRef, overflow } = useOverFlow()

  const formItemRef = useRef<HTMLDivElement>(null)
  const getGridStyle = () => {
    const gridStyle: React.CSSProperties = {
      gridColumn: gridClassName ? `span ${gridSpan} / auto` : 'unset',
      flexWrap: formLayout.layout === 'horizontal' ? 'nowrap' : 'wrap'
    }

    if (gridClassName) {
      const item = formItemRef.current
      if (!item || !visibleItemList?.includes(item)) {
        gridStyle.display = 'none'
      }
    }

    return gridStyle
  }
  const gridStyle = getGridStyle()
  useEffect(() => {
    const element = formItemRef.current
    if (element) {
      element.setAttribute('data-grid-span', String(gridSpan))
      suffix && element.setAttribute('data-sufifx', '')
    }
  }, [gridSpan, suffix])

  const renderLabel = () => {
    return (
      <span className={`${prefixCls}-label-text`} ref={containerRef}>
        {overflow ? (
          <Tooltip position='top' content={label}>
            {label}
          </Tooltip>
        ) : (
          label
        )}
      </span>
    )
  }

  return (
    <ArcoFormItem
      {...omit(restProps, ['asterisk', 'gridSpan'])}
      ref={formItemRef}
      style={{ ...gridStyle, ...style }}
      required={required && asterisk}
      label={renderLabel()}
      colon={Boolean(colon && label)}
      {...formLayout}
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

      return field.required
    }

    return {
      label: props.label || field.title,
      required: field.required || props.required,
      help: takeMessage(),
      asterisk: takeAsterisk(),
      validateStatus: takeValidateStatus(),
      extra: props.extra || field.description
    }
  })
)

export default FormItemComponent

import React, { useContext } from 'react'
import { isArray } from 'lodash-es'
import { Field } from '@formily/core'
import { connect, mapReadPretty, observer, useField } from '@formily/react'
import { ConfigProvider, Space } from '@arco-design/web-react'
import Select from '../../select'
import { SelectProps } from '../../select/type'

const { ConfigContext } = ConfigProvider

const PreviewSelect: React.FC<SelectProps> = observer(() => {
  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('form-select-preview')

  const field = useField<Field>()

  const renderText = () => {
    const { value, dataSource = [] } = field
    if (isArray(value)) {
      const targets = dataSource.filter((item: any) =>
        value.includes(item.value)
      )

      const text: any[] = []
      targets.forEach((target, index) => {
        text.push(target.label)
        if (index !== targets.length - 1) {
          text.push(',')
        }
      })

      return <Space size={2}>{text}</Space>
    }

    const target = dataSource.find((item: any) => item.value === value)
    return target?.label ?? value
  }

  return <div className={prefixCls}>{renderText()}</div>
})

const FormSelect: React.FC<SelectProps> = observer((props) => {
  const { request, ...restProps } = props

  const field = useField<Field>() // 储存options

  const requestWrapper = async (keyword?: string) => {
    const result = await request(keyword)
    field.setDataSource(result)
    return result
  }

  return <Select {...restProps} request={requestWrapper} />
})

export default connect(FormSelect, mapReadPretty(PreviewSelect))

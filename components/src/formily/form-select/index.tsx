import React, { useContext, useEffect, useRef } from 'react'
import { isArray } from 'lodash-es'
import { Field } from '@formily/core'
import { connect, mapReadPretty, observer, useField } from '@formily/react'
import { ConfigProvider, Space } from '@arco-design/web-react'
import OverflowTooltip from '../../overflow-tooltip'
import Select from '../../select'
import { SelectProps, SelectRef } from '../../select/type'

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

  return (
    <div className={prefixCls}>
      <OverflowTooltip ellipsis>{renderText()}</OverflowTooltip>
    </div>
  )
})

const FormSelect: React.FC<SelectProps> = observer((props) => {
  const field = useField<Field>() // 储存options
  const selectRef = useRef<SelectRef>(null)

  useEffect(() => {
    const options = selectRef.current?.getOptions()
    field.setDataSource(options ?? [])
  }) // 确保每次更新都有DataSource

  return <Select {...props} ref={selectRef} />
})

const FormSelectComponent = connect(FormSelect, mapReadPretty(PreviewSelect))

export default FormSelectComponent

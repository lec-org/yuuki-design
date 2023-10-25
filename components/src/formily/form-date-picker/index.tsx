import React, { useContext } from 'react'
import { isArray, isFunction } from 'lodash-es'
import dayjs from 'dayjs'
import { connect, mapReadPretty, observer } from '@formily/react'
import {
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Space
} from '@arco-design/web-react'
import OverflowTooltip from '../../overflow-tooltip'

const { ConfigContext } = ConfigProvider

type CalendarValue = NonNullable<DatePickerProps['value']>
interface PreviewPickerProps {
  value?: CalendarValue | Array<CalendarValue>
  format?: DatePickerProps['format']
}

const PreviewPicker: React.FC<PreviewPickerProps> = observer((props) => {
  const { value, format } = props

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('form-picker-preview')

  const renderText = () => {
    const formatDate = (val?: CalendarValue) => {
      const date = dayjs(val)
      return isFunction(format) ? format(date) : date.format(format)
    }

    if (isArray(value)) {
      const dateArray = value.map((item) => formatDate(item))
      const dateString: string[] = []

      dateArray.forEach((item, index) => {
        dateString.push(item)

        if (index !== dateArray.length - 1) {
          dateString.push('-')
        }
      })

      return <Space size={24}>{dateString}</Space>
    } else if (value) {
      return formatDate(value)
    }

    return null
  }

  return (
    <div className={prefixCls}>
      <OverflowTooltip ellipsis>{renderText()}</OverflowTooltip>
    </div>
  )
})

const wrapperReadPretty = (format: string) => {
  return mapReadPretty(
    observer<PreviewPickerProps>((props) => (
      <PreviewPicker format={format} {...props} />
    ))
  )
}

const FormDatePicker = connect(DatePicker, wrapperReadPretty('YYYY-MM-DD'))
const FormWeekPicker = connect(
  DatePicker.WeekPicker,
  wrapperReadPretty('gggg-wo')
)
const FormMonthPicker = connect(
  DatePicker.MonthPicker,
  wrapperReadPretty('YYYY-MM')
)
const FormYearPicker = connect(DatePicker.YearPicker, wrapperReadPretty('YYYY'))
const FormQuarterPicker = connect(
  DatePicker.QuarterPicker,
  wrapperReadPretty('YYYY-[Q]Q')
)
const FormRangePicker = connect(
  DatePicker.RangePicker,
  wrapperReadPretty('YYYY-MM-DD')
)

const FormPicker = FormDatePicker as typeof FormDatePicker & {
  WeekPicker: typeof FormWeekPicker
  MonthPicker: typeof FormMonthPicker
  YearPicker: typeof FormYearPicker
  QuarterPicker: typeof FormQuarterPicker
  RangePicker: typeof FormRangePicker
}
FormPicker.WeekPicker = FormWeekPicker
FormPicker.MonthPicker = FormMonthPicker
FormPicker.YearPicker = FormYearPicker
FormPicker.QuarterPicker = FormQuarterPicker
FormPicker.RangePicker = FormRangePicker

export default FormPicker

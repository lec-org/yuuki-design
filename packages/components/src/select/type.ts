import { SelectProps as ArcoSelectProps } from '@arco-design/web-react'
import {
  LabeledValue,
  SelectHandle
} from '@arco-design/web-react/es/Select/interface'

type SelectValue = string | string[] | number | number[]
type RequestTriggerType = 'mount' | 'input' | 'focus'

export interface SelectProps
  extends Omit<ArcoSelectProps, 'onSearch' | 'children'> {
  /**
   * @description 用于请求选项
   */
  request: (keyword?: string) => Promise<LabeledValue[]>
  /**
   * @description 组件请求的时机
   * @defaultValue ['mount','input']
   */
  requestTrigger?: RequestTriggerType[]
  /**
   * @description 是否在失去焦点时清除option（必须开启聚焦请求）
   */
  resetOnBlur?: boolean
  /**
   * @description 请求防抖的时间（ms）
   * @defaultValue 800
   */
  debounceWait?: number
  /**
   * @description 选择器的值（受控模式）
   */
  value?: SelectValue
  /**
   * @description 选择框的默认值
   */
  defaultValue?: SelectValue
}

export interface SelectRef extends SelectHandle {
  /**
   * @description 获得所有选项
   */
  getOptions: () => LabeledValue[]
}

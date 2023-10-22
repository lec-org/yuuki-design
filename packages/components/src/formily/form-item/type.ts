import { ReactNode } from 'react'
import { FormItemProps as ArcoFormItemProps } from '@arco-design/web-react'

export interface FormItemProps
  extends Omit<
    ArcoFormItemProps,
    | 'trigger'
    | 'triggerPropName'
    | 'requiredSymbol'
    | 'dependencies'
    | 'field'
    | 'initialValue'
    | 'normalize'
    | 'noStyle'
    | 'rules'
    | 'shouldUpdate'
    | 'validateTrigger'
    | 'formatter'
    | 'getValueFromEvent'
  > {
  children?: ReactNode
  /**
   * @description ⽹格布局占宽
   */
  gridSpan?: number
  /**
   *  @description 必填星号
   *  @defaultValue true
   */
  asterisk?: boolean
}

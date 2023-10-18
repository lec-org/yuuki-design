import { ReactNode } from 'react'
import { FormItemProps as ArcoFormItemProps } from '@arco-design/web-react'

export interface FormItemProps extends Omit<ArcoFormItemProps, 'layout'> {
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
  /**
   * @description FormItem的布局方式
   * @defaultValue horizontal
   */
  layout?: 'horizontal' | 'vertical'
}

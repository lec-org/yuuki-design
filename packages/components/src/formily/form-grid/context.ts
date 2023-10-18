import { createContext } from 'react'
import { ColProps } from '@arco-design/web-react'

export interface FormGridLayout {
  /**
   * @description 子元素中FormItem的类名
   * @defaultValue arco-form-grid-item
   */
  className?: string
  /**
   * @description 子元素中FormItem的label是否带有冒号
   * @defaultValue true
   */
  colon?: boolean
  /**
   *  @description 必填星号
   *  @defaultValue true
   */
  asterisk?: boolean
  /**
   * @description label的格栅col参数
   * @defaultValue { flex: 'none' }
   */
  labelCol?: ColProps
  /**
   * @description 内容的格栅col参数
   * @defaultValue { flex: 'auto' }
   */
  wrapperCol?: ColProps
  /**
   * @description FormItem采用布局
   */
  layout?: 'horizontal' | 'vertical'
}

export const FormGridLayoutContext = createContext<FormGridLayout>({})

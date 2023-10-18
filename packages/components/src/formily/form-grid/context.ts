import { createContext } from 'react'

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
}

export const FormGridLayoutContext = createContext<FormGridLayout>({})

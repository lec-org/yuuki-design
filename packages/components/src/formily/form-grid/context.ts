import { createContext } from 'react'

export interface FormGridLayout {
  /**
   * @description 子元素中FormItem的类名
   * @defaultValue arco-form-grid-item
   */
  prefixCls?: string
  /**
   * @description 子元素中FormItem的label是否带有冒号
   * @defaultValue true
   */
  colon?: boolean
}

export const defaultValue: FormGridLayout = {
  prefixCls: 'arco-form-grid-item',
  colon: true
}

export const FormGridLayoutContext = createContext(defaultValue)

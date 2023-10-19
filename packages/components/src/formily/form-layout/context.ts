import { createContext } from 'react'
import { ColProps, FormItemProps } from '@arco-design/web-react'

export interface FormLayoutContextType {
  /**
   * @description FormItem采用布局
   */
  layout?: FormItemProps['layout']
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
   * @description label的对齐方式
   * @defaultValue right
   */
  labelAlign?: FormItemProps['labelAlign']
}

export const FormLayoutContext = createContext<FormLayoutContextType>({})

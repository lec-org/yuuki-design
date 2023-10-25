import { createContext } from 'react'

export interface FormGridContextType {
  /**
   * @description GridItem的类名
   */
  gridClassName?: string
  /**
   * @description item是否超出
   */
  overflow?: boolean
  /**
   * @description 需要显示的元素
   */
  visibleItemList?: Element[]
}

export const FormGridContext = createContext<FormGridContextType>({})

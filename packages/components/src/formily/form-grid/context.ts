import { createContext } from 'react'

export interface FormGridContextType {
  /**
   * @description GridItem的类名
   */
  gridClassName?: string
}

export const FormGridContext = createContext<FormGridContextType>({})

import { CSSProperties, ReactNode } from 'react'
import { FormLayoutContextType } from './context'

export interface FormLayoutProps extends FormLayoutContextType {
  children?: ReactNode
  /**
   * @description 节点类名
   */
  className?: string | string[]
  /**
   * @description 节点样式
   */
  style?: CSSProperties
}

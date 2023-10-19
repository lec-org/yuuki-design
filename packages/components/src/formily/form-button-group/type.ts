import { CSSProperties, ReactNode } from 'react'

export interface FormButtonGroupProps {
  children?: ReactNode
  /**
   * @description 节点类名
   */
  className?: string | string[]
  /**
   * @description 节点样式
   */
  style?: CSSProperties
  /**
   * @description 间距大小
   */
  size?: number
}

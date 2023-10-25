import { ButtonProps as ArcoButtonProps } from '@arco-design/web-react'

export interface ButtonProps extends Omit<ArcoButtonProps, 'type' | 'onClick'> {
  /**
   * @description 按钮类型
   */
  type?: ArcoButtonProps['type'] | 'text-normal'
  /**
   * @description 点击按钮的回调
   */
  onClick?: (e: React.MouseEvent) => void | Promise<void>
}

import { CSSProperties, ReactNode } from 'react'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface FormGridProps {
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
   * @description 每行展示的列数
   * @defaultValue 3
   */
  cols?: number | Record<Breakpoint, number>
  /**
   * @description 列间距
   * @defaultValue 0
   */
  colGap?: number | Record<Breakpoint, number>
  /**
   * @description 行间距
   * @defaultValue 0
   */
  rowGap?: number | Record<Breakpoint, number>
}

export interface FormGridItemProps {
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
   * @description 跨越的格数
   * @defaultValue 1
   */
  span?: number | Record<Breakpoint, number>
}

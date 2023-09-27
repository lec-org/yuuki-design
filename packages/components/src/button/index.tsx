import React, { useCallback, useMemo, useState } from 'react'
import { isUndefined } from 'lodash-es'
import {
  Button as ArcoButton,
  ButtonProps as ArcoButtonProps
} from '@arco-design/web-react'

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

const Button: React.FC<ButtonProps> = (props) => {
  const { type, loading, onClick, ...restProps } = props

  const [autoLoading, setAutoLoading] = useState(false)

  const loadingOnClick = useCallback(
    async (event: React.MouseEvent) => {
      setAutoLoading(true)
      await onClick?.(event)
      setAutoLoading(false)
    },
    [onClick]
  )

  const buttonProps = useMemo<ArcoButtonProps>(() => {
    const buttonProps: ArcoButtonProps = {}
    if (type === 'text-normal') {
      buttonProps.className = 'arco-btn-text-normal'
      buttonProps.type = 'text'
    } else {
      buttonProps.type = type
    }

    const isAutoLoading = isUndefined(loading)

    Object.assign(buttonProps, {
      loading: isAutoLoading ? autoLoading : loading,
      onClick: isAutoLoading ? loadingOnClick : onClick,
      ...restProps
    })

    return buttonProps
  }, [loading, loadingOnClick, onClick, restProps, type])

  return <ArcoButton {...buttonProps} />
}

export default Button

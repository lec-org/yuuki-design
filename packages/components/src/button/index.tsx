import React, { useCallback, useMemo, useState } from 'react'
import { isUndefined } from 'lodash-es'
import {
  Button as ArcoButton,
  ButtonProps as ArcoButtonProps
} from '@arco-design/web-react'
import { ButtonProps } from './type'

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

const ButtonComponent = Button as typeof Button & {
  Group: typeof ArcoButton.Group
}
ButtonComponent.Group = ArcoButton.Group

export default ButtonComponent

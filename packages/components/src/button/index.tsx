import React, { useCallback, useContext, useMemo, useState } from 'react'
import { isUndefined } from 'lodash-es'
import {
  Button as ArcoButton,
  ButtonProps as ArcoButtonProps,
  ConfigProvider
} from '@arco-design/web-react'
import { ButtonProps } from './type'

const { ConfigContext } = ConfigProvider

const Button: React.FC<ButtonProps> = (props) => {
  const { type, loading, onClick, ...restProps } = props

  const [autoLoading, setAutoLoading] = useState(false)

  const { getPrefixCls } = useContext(ConfigContext)
  const prefixCls = getPrefixCls!('btn')

  const loadingOnClick = useCallback(
    async (event: React.MouseEvent) => {
      setAutoLoading(true)
      try {
        await onClick?.(event)
      } finally {
        setAutoLoading(false)
      }
    },
    [onClick]
  )

  const buttonProps = useMemo<ArcoButtonProps>(() => {
    const buttonProps: ArcoButtonProps = {}
    if (type === 'text-normal') {
      buttonProps.className = `${prefixCls}-text-normal`
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
  }, [
    loading,
    autoLoading,
    loadingOnClick,
    onClick,
    prefixCls,
    restProps,
    type
  ])

  return <ArcoButton {...buttonProps} />
}

const ButtonComponent = Button as typeof Button & {
  Group: typeof ArcoButton.Group
}
ButtonComponent.Group = ArcoButton.Group

export default ButtonComponent

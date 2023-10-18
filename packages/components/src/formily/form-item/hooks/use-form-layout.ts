import { useContext } from 'react'
import { FormGridLayoutContext } from '../../form-grid/context'
import { FormItemProps } from '../type'

export function useFormLayout(props: FormItemProps) {
  const layoutContext = useContext(FormGridLayoutContext)

  return {
    className: layoutContext.className,
    colon: props.colon ?? layoutContext.colon,
    asterisk: layoutContext.asterisk
  }
}

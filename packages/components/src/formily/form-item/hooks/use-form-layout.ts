import { useContext } from 'react'
import { FormLayoutContext } from '../../form-layout/context'
import { FormGridContext } from '../../form-grid/context'
import { FormItemProps } from '../type'

export function useFormLayout(props: FormItemProps) {
  const layoutContext = useContext(FormLayoutContext)
  const gridContext = useContext(FormGridContext)

  return {
    ...gridContext,
    colon: props.colon ?? layoutContext.colon ?? true,
    asterisk: layoutContext.asterisk,
    labelCol: props.labelCol ?? layoutContext.labelCol ?? { flex: 'none' },
    wrapperCol: props.wrapperCol ??
      layoutContext.wrapperCol ?? { flex: 'auto' },
    layout: props.layout ?? layoutContext.layout ?? 'horizontal'
  }
}

import { useResponsive } from 'ahooks'
import { isNumber, isObject } from 'lodash-es'
import { Breakpoint } from '../type'

export function useResponsiveValue({
  value,
  defaultValue
}: {
  value?: number | Record<Breakpoint, number>
  defaultValue: number
}) {
  const responsive = useResponsive()
  let responsiveValue = defaultValue

  if (isObject(value)) {
    Object.keys(responsive).forEach((key) => {
      if (responsive[key] && Reflect.has(value, key)) {
        responsiveValue = value[key as Breakpoint]
      }
    })
  } else if (isNumber(value)) {
    responsiveValue = value
  }

  return responsiveValue
}

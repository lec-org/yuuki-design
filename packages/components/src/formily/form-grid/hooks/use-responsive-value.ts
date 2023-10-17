import { useResponsive } from 'ahooks'
import { isObject, isUndefined } from 'lodash-es'
import { Breakpoint } from '../type'

export function useResponsiveValue(
  value?: number | Record<Breakpoint, number>
) {
  const responsive = useResponsive()
  let responsiveValue

  if (isObject(value)) {
    Object.keys(responsive).forEach((key) => {
      const pointValue = value[key as Breakpoint] as unknown
      if (responsive[key] && !isUndefined(pointValue)) {
        responsiveValue = pointValue
      }
    })
  } else {
    responsiveValue = value
  }

  return responsiveValue
}

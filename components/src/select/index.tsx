import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useMount, useRequest } from 'ahooks'
import { Select as ArcoSelect } from '@arco-design/web-react'
import { SelectHandle } from '@arco-design/web-react/es/Select/interface'
import { SelectProps, SelectRef } from './type'

const Select = forwardRef<SelectRef, SelectProps>((props, ref) => {
  const {
    request,
    requestTrigger = ['mount', 'input'],
    debounceWait = 800,
    resetOnBlur,
    defaultValue,
    cacheKey,
    cacheTime,
    ...restProps
  } = props

  if (!request) {
    throw new Error('Select组件中request必填')
  }

  const [stateValue, setStateValue] = useState(defaultValue) // 内部维护state
  const [stateInputValue, setStateInputvalue] = useState('')
  const value = 'value' in props ? props.value : stateValue
  const inputValue =
    'inputValue' in props ? props.inputValue || '' : stateInputValue

  const {
    loading,
    data: options = [],
    run: searchOptions,
    cancel: searchCancel,
    mutate: mutateOptions
  } = useRequest((keyword: string) => request(keyword), {
    debounceWait,
    manual: true,
    cacheKey,
    cacheTime
  })

  useMount(() => {
    if (requestTrigger.includes('mount')) {
      searchOptions(inputValue)
    }
  })

  const arcoSelectRef = useRef<SelectHandle>(null)
  useImperativeHandle(ref, () => ({
    ...arcoSelectRef.current!,
    getOptions() {
      return options
    }
  }))

  return (
    <ArcoSelect
      {...restProps}
      ref={arcoSelectRef}
      value={value}
      inputValue={inputValue}
      loading={loading}
      onSearch={(val) => requestTrigger.includes('input') && searchOptions(val)}
      onFocus={(e) => {
        requestTrigger.includes('focus') && searchOptions(inputValue)
        props.onFocus?.(e)
      }}
      onBlur={(e) => {
        if (requestTrigger.includes('focus') && resetOnBlur) {
          searchCancel() // 防止竞态问题
          mutateOptions([]) // 失焦清空option，聚焦请求开启时生效
        }
        props.onBlur?.(e)
      }}
      onChange={(val, opts) => {
        setStateValue(val)
        props.onChange?.(val, opts)
      }}
      onInputValueChange={(val, reason) => {
        setStateInputvalue(val)
        props.onInputValueChange?.(val, reason)
      }}
    >
      {options.map((option) => (
        <ArcoSelect.Option key={option.value} value={option.value}>
          {option.label}
        </ArcoSelect.Option>
      ))}
    </ArcoSelect>
  )
})

export default Select

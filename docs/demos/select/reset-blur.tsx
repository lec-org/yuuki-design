import React, { useState } from 'react'
import { Space } from '@arco-design/web-react'
import { Select } from 'yuuki-design'

const mockData = [
  {
    province: '四川',
    cities: ['成都', '绵阳', '攀枝花']
  },
  {
    province: '浙江',
    cities: ['杭州', '绍兴', '嘉兴']
  },
  {
    province: '广东',
    cities: ['广州', '深圳', '珠海']
  }
]

const requestProvince = (keyword?: string) => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      const result = mockData.filter((item) =>
        item.province.includes(keyword ?? '')
      )
      resolve(result.map((item) => item.province))
    }, 2000)
  })
}

const requestCities = (province: string) => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      const result = mockData.find((item) => item.province === province)
      resolve(result?.cities ?? [])
    }, 2000)
  })
}

const App: React.FC = () => {
  const [province, setProvince] = useState<string>()
  const [city, setCity] = useState<string>()

  return (
    <Space size='large'>
      <Select
        value={province}
        onChange={(val) => {
          setProvince(val)
          setCity(undefined) // 清除city
        }}
        allowClear
        placeholder='请选择省份'
        style={{ width: 240 }}
        request={async (keywords) => {
          const provinces = await requestProvince(keywords)
          return provinces.map((item) => ({ label: item, value: item }))
        }}
      />
      <Select
        value={city}
        onChange={(val) => setCity(val)}
        style={{ width: 240 }}
        placeholder='请选择市'
        requestTrigger={['focus']}
        allowClear
        resetOnBlur
        request={async () => {
          if (!province) {
            return []
          }
          const cities = await requestCities(province)
          return cities.map((item) => ({ label: item, value: item }))
        }}
      />
    </Space>
  )
}

export default App

import { Switch } from '@arco-design/web-react'
import React, { useState } from 'react'
import { FormGrid } from 'yuuki-design'

const { GridItem } = FormGrid

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  const style: React.CSSProperties = {
    height: 48,
    lineHeight: '48px',
    textAlign: 'center',
    color: 'var(--color-white)',
    backgroundColor: 'rgba(var(--arcoblue-6), 0.9)'
  }
  const lightStyle: React.CSSProperties = {
    height: 48,
    lineHeight: '48px',
    textAlign: 'center',
    color: 'var(--color-white)',
    backgroundColor: 'var(--color-primary-light-4)'
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <div>折叠：</div>
        <Switch checked={collapsed} onChange={setCollapsed} />
      </div>
      <FormGrid colGap={16} rowGap={12} collapsed={collapsed}>
        <GridItem span={1} style={style}>
          col-1
        </GridItem>
        <GridItem span={1} style={lightStyle}>
          col-1
        </GridItem>
        <GridItem span={1} style={style}>
          col-1
        </GridItem>
        <GridItem span={2} style={style}>
          col-2
        </GridItem>
        <GridItem span={1} style={lightStyle}>
          col-1
        </GridItem>
        <GridItem span={1} style={style}>
          col-1
        </GridItem>
        <GridItem span={2} style={lightStyle}>
          col-2
        </GridItem>
        <GridItem span={3} style={style}>
          col-3
        </GridItem>
      </FormGrid>
    </div>
  )
}

export default App

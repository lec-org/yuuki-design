import React, { useState } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/react'
import { Input, Switch } from '@arco-design/web-react'
import { Button, FormGrid, FormItem } from 'yuuki-design'

const SchemaField = createSchemaField({
  components: {
    Input,
    Button,
    FormItem,
    FormGrid
  }
})
const form = createForm()

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  const onSubmit = async () => {
    const result = await form.submit()
    console.log(result)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <div>折叠：</div>
        <Switch checked={collapsed} onChange={setCollapsed} />
      </div>
      <FormProvider form={form}>
        <FormGrid cols={3} colGap={8} rowGap={4} collapsed={collapsed}>
          <SchemaField>
            <SchemaField.String
              name='aaa'
              title='aaa'
              x-decorator='FormItem'
              x-decorator-props={{ gridSpan: 2 }}
              x-component='Input'
            />
            <SchemaField.String
              name='bbb'
              title='bbb'
              x-decorator='FormItem'
              x-component='Input'
            />
            <SchemaField.String
              name='ccc'
              title='ccc'
              x-decorator='FormItem'
              x-component='Input'
            />
            <SchemaField.String
              name='ddd'
              title='ddd'
              x-decorator='FormItem'
              x-component='Input'
            />
            <SchemaField.String
              name='eee'
              title='eee'
              x-decorator='FormItem'
              x-component='Input'
            />
            <SchemaField.String
              name='fff'
              title='fff'
              x-decorator='FormItem'
              x-component='Input'
            />
            <SchemaField.String
              name='ggg'
              title='ggg'
              x-decorator='FormItem'
              x-component='Input'
            />
          </SchemaField>
        </FormGrid>
        <Button type='primary' onClick={onSubmit}>
          提交
        </Button>
      </FormProvider>
    </div>
  )
}

export default App

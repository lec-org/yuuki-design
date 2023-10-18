import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/react'
import { Input } from '@arco-design/web-react'
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
  const onSubmit = async () => {
    const result = await form.submit()
    console.log(result)
  }

  return (
    <>
      <FormProvider form={form}>
        <SchemaField>
          <SchemaField.Void
            x-component='FormGrid'
            x-component-props={{ cols: 3, colGap: 8, rowGap: 4 }}
          >
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
          </SchemaField.Void>
        </SchemaField>
      </FormProvider>
      <Button type='primary' onClick={onSubmit}>
        提交
      </Button>
    </>
  )
}

export default App

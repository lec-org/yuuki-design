import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Input } from '@arco-design/web-react'
import { Button, FormButtonGroup, FormItem, FormLayout } from 'yuuki-design'

const SchemaField = createSchemaField({
  components: {
    Input,
    Button,
    FormItem
  }
})
const form = createForm()

const App: React.FC = () => {
  const onSubmit = async () => {
    const result = await form.submit()
    console.log(result)
  }

  return (
    <FormProvider form={form}>
      <FormLayout labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
        <SchemaField>
          <SchemaField.String
            required
            title='username'
            name='username'
            x-component='Input'
            x-decorator='FormItem'
          />
          <SchemaField.String
            required
            title='password'
            name='password'
            x-component='Input.Password'
            x-decorator='FormItem'
          />
        </SchemaField>
        <FormButtonGroup.FormItem>
          <Button type='primary' onClick={onSubmit}>
            提交
          </Button>
        </FormButtonGroup.FormItem>
      </FormLayout>
    </FormProvider>
  )
}

export default App

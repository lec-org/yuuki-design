import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Input } from '@arco-design/web-react'
import { Button, FormItem, FormLayout } from 'yuuki-design'

const SchemaField = createSchemaField({
  components: {
    Input,
    Button,
    FormItem,
    FormLayout
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
      <SchemaField>
        <SchemaField.Void
          x-component='FormLayout'
          x-component-props={{
            labelCol: { span: 6 },
            wrapperCol: { span: 10 }
          }}
        >
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
          <SchemaField.Void
            x-component='Button'
            x-decorator='FormItem'
            x-decorator-props={{ colon: false }}
            x-component-props={{
              children: '提交',
              type: 'primary',
              onClick: onSubmit
            }}
          />
        </SchemaField.Void>
      </SchemaField>
    </FormProvider>
  )
}

export default App

import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Input } from '@arco-design/web-react'
import { Button, FormItem } from 'yuuki-design'

const SchemaField = createSchemaField({
  components: {
    Input,
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
      <SchemaField>
        <SchemaField.String
          required
          title='输入项'
          name='input'
          x-component='Input'
          x-decorator='FormItem'
        />
      </SchemaField>
      <Button type='primary' onClick={onSubmit}>
        提交
      </Button>
    </FormProvider>
  )
}

export default App

import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, observer } from '@formily/react'
import { Input, Switch } from '@arco-design/web-react'
import { Button, FormButtonGroup, FormItem, FormLayout } from 'yuuki-design'

const SchemaField = createSchemaField({
  components: {
    Input,
    Switch,
    FormItem
  }
})
const form = createForm()

const App: React.FC = observer(() => {
  const onSubmit = async () => {
    const result = await form.submit()
    console.log(result)
  }

  const onReset = () => {
    if (form.editable) {
      form.reset()
    }
  }

  const onPreviewChange = () => {
    if (form.editable) {
      form.setPattern('readPretty')
    } else {
      form.setPattern('editable')
    }
  }

  return (
    <FormProvider form={form}>
      <FormLayout labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
        <SchemaField>
          <SchemaField.String
            required
            title='用户名'
            name='username'
            x-component='Input'
            x-decorator='FormItem'
          />
          <SchemaField.String
            required
            title='密码'
            name='password'
            x-component='Input.Password'
            x-decorator='FormItem'
          />
        </SchemaField>
        <FormButtonGroup.FormItem>
          <Button type='primary' onClick={onSubmit}>
            注册
          </Button>
          <Button onClick={onReset}>重置</Button>
          <Button type='outline' onClick={onPreviewChange}>
            {form.editable ? '预览' : '编辑'}
          </Button>
        </FormButtonGroup.FormItem>
      </FormLayout>
    </FormProvider>
  )
})

export default App

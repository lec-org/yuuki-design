import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, observer } from '@formily/react'
import { Select } from '@arco-design/web-react'
import {
  Button,
  FormButtonGroup,
  FormInput,
  FormSelect,
  FormItem,
  FormLayout
} from 'yuuki-design'

const SchemaField = createSchemaField({
  components: {
    Select,
    FormInput,
    FormSelect,
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
            x-decorator='FormItem'
            x-component='FormInput'
          />
          <SchemaField.String
            required
            title='密码'
            name='password'
            x-decorator='FormItem'
            x-component='FormInput.Password'
          />
          <SchemaField.String
            title='性别'
            name='sex'
            x-decorator='FormItem'
            x-component='FormSelect'
            x-component-props={{
              cacheKey: 'form-sex',
              request: async () => [
                { label: '男', value: 'male' },
                { label: '女', value: 'female' },
                { label: '保密', value: 'secret' }
              ]
            }}
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

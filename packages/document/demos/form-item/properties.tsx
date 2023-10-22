import React from 'react'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Input } from '@arco-design/web-react'
import { FormItem } from 'yuuki-design'

const Title = (props: { text: string }) => (
  <h2 style={{ fontSize: 18, fontWeight: 600, margin: '12px 0' }}>
    {props.text}
  </h2>
)

const SchemaField = createSchemaField({
  components: {
    Title,
    Input,
    FormItem
  }
})
const form = createForm()

const App: React.FC = () => {
  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Void
          x-component='Title'
          x-component-props={{ text: 'label为空时' }}
        />
        <SchemaField.String x-component='Input' x-decorator='FormItem' />
        <SchemaField.Void
          x-component='Title'
          x-component-props={{ text: '冒号' }}
        />
        <SchemaField.String
          title='有冒号'
          x-component='Input'
          x-decorator='FormItem'
        />
        <SchemaField.String
          title='无冒号'
          x-component='Input'
          x-decorator='FormItem'
          x-decorator-props={{ colon: false }}
        />
        <SchemaField.Void
          x-component='Title'
          x-component-props={{ text: '宽度与对齐' }}
        />
        <SchemaField.String
          title='设置labelCol'
          x-component='Input'
          x-decorator='FormItem'
          x-decorator-props={{ labelCol: { span: 5 } }}
        />
        <SchemaField.String
          title='设置labelCol与右对齐'
          x-component='Input'
          x-decorator='FormItem'
          x-decorator-props={{ labelCol: { span: 5 }, labelAlign: 'left' }}
        />
        <SchemaField.String
          title='长长长长长长文字溢出'
          x-component='Input'
          x-decorator='FormItem'
          x-decorator-props={{ labelCol: { span: 4 } }}
        />
      </SchemaField>
    </FormProvider>
  )
}

export default App

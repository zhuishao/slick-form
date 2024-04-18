---
order: 10
title: StepForm 分步提交表单
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { StepForm, Form } from 'slick-form';
import { Radio } from 'antd';

export default () => {
  const [type, setType] = React.useState('default');
  const [current, setCurrent] = React.useState(0);
  const [form] = Form.useForm();
  return (
    <div>
      <Radio.Group
        onChange={v => {
          setType(v.target.value);
        }}
        defaultValue={'default'}
        options={[
          {
            label: '默认',
            value: 'default',
          },
          {
            label: '导航卡',
            value: 'navigation',
          },
        ]}
      />
      <br /> <br />
      <StepForm
        current={current}
        form={form}
        stepProps={{
          type,
        }}
        onStepsClick={async v => {
          await form.submit(); // 表单校验
          setCurrent(v);
        }}
        initialValues={{
          name1: 'name1',
          name3: 'name3',
          name5: 'name5',
        }}
        steps={[
          {
            title: '第一步',
            column: 1,
            fields: [
              {
                type: 'Input',
                name: 'name1',
                label: 'name1',
                required: true,
              },
              {
                type: 'Input',
                name: 'name2',
                label: 'name2',
                required: true,
              },
            ],
            actions: [
              {
                label: '清空',
                onClick() {
                  form.clearValues();
                },
              },
              {
                label: '确认并下一步',
                spin: true,
                validator: true,
                type: 'primary',
                async onClick() {
                  await new Promise(res => setTimeout(res, 1000));
                  setCurrent(1);
                },
              },
            ],
          },
          {
            title: '第二步',
            column: 2,
            fields: [
              {
                type: 'Input',
                name: 'name3',
                label: 'name3',
                required: true,
              },
              {
                type: 'Input',
                name: 'name4',
                label: 'name4',
                required: true,
              },
            ],
            actions: [
              {
                label: '上一步',
                onClick() {
                  setCurrent(0);
                },
              },
              {
                label: '确认并下一步',
                spin: true,
                validator: true,
                type: 'primary',
                async onClick() {
                  await new Promise(res => setTimeout(res, 1000));
                  setCurrent(2);
                },
              },
            ],
          },
          {
            title: '第三步',
            column: 3,
            fields: [
              {
                type: 'Input',
                name: 'name5',
                label: 'name5',
                required: true,
              },
              {
                type: 'Input',
                name: 'name6',
                label: 'name6',
                required: true,
              },
              {
                type: 'Input',
                name: 'name7',
                label: 'name7',
              },
            ],
            actions: [
              {
                label: '上一步',
                onClick() {
                  setCurrent(1);
                },
              },
              {
                label: '确认提交',
                spin: true,
                validator: true,
                type: 'primary',
                async onClick() {
                  await new Promise(res => setTimeout(res, 1000));
                  alert(JSON.stringify(form.getValues()));
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};
```

## 结合弹层

```tsx
import React from 'react';
import { Form, Button, CreateForm, StepForm } from 'slick-form';

const delay = ms => new Promise(res => setTimeout(res, ms, true));

export default props => {
  const [form] = Form.useForm();
  return (
    <Button
      type="primary"
      modalFormProps={{
        title: '新增用户',
        width: 1000,
        footer: false, // 不需要底部按钮
        modalProps: {
          bodyStyle: {
            padding: 0,
          },
        },
        render: () => {
          const [current, setCurrent] = React.useState(0);
          return (
            <StepForm
              current={current}
              form={form}
              initialValues={{
                name1: 'name1',
                name3: 'name3',
                name5: 'name5',
              }}
              steps={[
                {
                  title: '第一步',
                  description: '第一步描述',
                  column: 1,
                  fields: [
                    {
                      type: 'Input',
                      name: 'name1',
                      label: 'name1',
                      required: true,
                    },
                    {
                      type: 'Input',
                      name: 'name2',
                      label: 'name2',
                      required: true,
                    },
                  ],
                  actions: [
                    {
                      label: '清空',
                      onClick() {
                        form.clearValues();
                      },
                    },
                    {
                      label: '确认并下一步',
                      spin: true,
                      validator: true,
                      type: 'primary',
                      async onClick() {
                        await new Promise(res => setTimeout(res, 1000));
                        setCurrent(1);
                      },
                    },
                  ],
                },
                {
                  title: '第二步',
                  description: '第二步描述',
                  column: 2,
                  fields: [
                    {
                      type: 'Input',
                      name: 'name3',
                      label: 'name3',
                      required: true,
                    },
                    {
                      type: 'Input',
                      name: 'name4',
                      label: 'name4',
                      required: true,
                    },
                  ],
                  actions: [
                    {
                      label: '上一步',
                      onClick() {
                        setCurrent(0);
                      },
                    },
                    {
                      label: '确认并下一步',
                      spin: true,
                      validator: true,
                      type: 'primary',
                      async onClick() {
                        await new Promise(res => setTimeout(res, 1000));
                        setCurrent(2);
                      },
                    },
                  ],
                },
                {
                  title: '第三步',
                  description: '第三步描述',
                  column: 3,
                  fields: [
                    {
                      type: 'Input',
                      name: 'name5',
                      label: 'name5',
                      required: true,
                    },
                    {
                      type: 'Input',
                      name: 'name6',
                      label: 'name6',
                      required: true,
                    },
                    {
                      type: 'Input',
                      name: 'name7',
                      label: 'name7',
                    },
                  ],
                  actions: [
                    {
                      label: '上一步',
                      onClick() {
                        setCurrent(1);
                      },
                    },
                    {
                      label: '确认提交',
                      spin: true,
                      validator: true,
                      type: 'primary',
                      async onClick() {
                        await new Promise(res => setTimeout(res, 1000));
                        alert(JSON.stringify(form.getValues()));
                      },
                    },
                  ],
                },
              ]}
            />
          );
        },
        column: 2,
      }}
    >
      打开 StepForm
    </Button>
  );
};
```

## API

| 属性名                 | 描述                                                                | 类型                                                                                                                              | 默认值                       |
| ---------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| current                | 当前步骤                                                            | `number`                                                                                                                          | `--`                         |
| onStepsClick           | 手动切换步骤                                                        | `(current: any) => void`                                                                                                          | `--`                         |
| stepProps              | 步骤属性                                                            | `StepProps`                                                                                                                       | `--`                         |
| steps                  | 配置每一步的表单项和操作按钮                                        | `{ title: ReactNode; description?: ReactNode; column?: number; fields: FormFieldProps<FieldProps>[]; actions: ActionProps[]; }[]` | `(必选)`                     |
| fields                 | 表单的数据模型                                                      | `FormFieldProps<FieldProps>[] \| ((form: FormLibInstance) => FormFieldProps<FieldProps>[])`                                       | `[]`                         |
| widgets                | 注入自定义组件                                                      | `any`                                                                                                                             | `--`                         |
| readOnly               | 是否只读                                                            | `boolean`                                                                                                                         | `false`                      |
| disabled               | 是否禁用                                                            | `boolean`                                                                                                                         | `false`                      |
| disabledFields         | 禁用指定的字段                                                      | `any`                                                                                                                             | `[]`                         |
| column                 | 等分布局属性                                                        | `number`                                                                                                                          | `1`                          |
| gridStyle              | 布局样式设置                                                        | `any`                                                                                                                             | `{columnGap: 20, rowGap: 0}` |
| className              | 最外层类名                                                          | `string`                                                                                                                          | `--`                         |
| onMount                | 表单加载完的钩子                                                    | `(form: FormLibInstance) => void`                                                                                                 | `--`                         |
| locale                 | 国际化                                                              | `any`                                                                                                                             | `--`                         |
| getScrollContainer     | 滚动的区域                                                          | `() => HTMLElement`                                                                                                               | `--`                         |
| readOnlyEmptyValueNode | 只读表单的空提示                                                    | `ReactNode`                                                                                                                       | `--`                         |
| formConfig             | 表单通用配置                                                        | `FormConfigProps`                                                                                                                 | `--`                         |
| readOnlyClean          | 简洁只读模式、开启之后只读表单的 FormItem tooltip、extra 属性会忽略 | `boolean`                                                                                                                         | `false`                      |

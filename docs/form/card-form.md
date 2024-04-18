---
order: 6
title: CardForm 卡片提交表单
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { CardForm, Form } from 'slick-form';
import schema from './schema/form-submit/schema';
import { message } from 'antd';

const delay = ms => new Promise(res => setTimeout(res, ms, true));
export default () => {
  const [form] = Form.useForm();
  const onSubmit = async values => {
    const res = await delay(1000);
    console.log('onSubmit ->', values);
    if (res) {
      message.success('保存成功');
    }
  };
  return (
    <CardForm
      cardProps={{
        bodyStyle: {
          height: 500,
          overflow: 'auto',
        },
      }}
      title="新增用户"
      onSubmit={onSubmit}
      fields={schema}
      form={form}
      column={2}
    />
  );
};
```

## 使用 actionAlign 定义操作按钮位置

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { CardForm } from 'slick-form';
import schema from './schema/form-submit/schema';
import { message, Button, Space } from 'antd';
const delay = ms => new Promise(res => setTimeout(res, ms, true));
export default () => {
  const [actionAlign, setActionAlign] = React.useState('end');
  const onSubmit = async values => {
    const res = await delay(1000);
    console.log('onSubmit ->', values);
    if (res) {
      message.success('保存成功');
    }
  };
  return (
    <>
      <Space>
        <Button onClick={setActionAlign.bind(null, 'start')}>左边</Button>
        <Button onClick={setActionAlign.bind(null, 'center')}>居中</Button>
        <Button onClick={setActionAlign.bind(null, 'end')}>右边</Button>
      </Space>
      <CardForm
        title="新增用户"
        cardProps={{
          style: {
            marginTop: 16,
          },
          bodyStyle: {
            height: 500,
            overflow: 'auto',
          },
        }}
        actionAlign={actionAlign}
        onSubmit={onSubmit}
        fields={schema}
        column={2}
      />
    </>
  );
};
```

## 使用自定义 actions

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { CardForm, Form } from 'slick-form';
import schema from './schema/form-submit/schema';
import { message, Switch } from 'antd';
const delay = ms => new Promise(res => setTimeout(res, ms, true));
export default () => {
  const [form] = Form.useForm();
  const onSubmit = async values => {
    console.log('onSubmit ->', values);
    const res = await delay(1000);
    if (res) {
      message.success('保存成功');
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  const onClear = () => {
    form.clearValues();
    // form.clearValues(['input']);
  };
  const actions1 = [
    {
      label: '保草稿',
      type: 'primary',
      spin: true, // 开启加载
      onClick: onSubmit,
    },
    {
      label: '重置表单',
      type: 'dashed',
      onClick: onReset,
    },
    {
      label: '清空表单',
      type: 'dashed',
      onClick: onClear,
    },
  ];
  const actions2 = [
    {
      label: '同意',
      type: 'primary',
      spin: true, // 开启加载
      validator: true, // 开启表单检验
      onClick: onSubmit,
      confirm: {
        title: '提示',
        content: '是否同意?',
      },
    },
    {
      label: '驳回',
      type: 'dashed',
      confirm: {
        title: '提示',
        content: '是否确认驳回？',
      },
      onClick: values => {
        message.success('驳回成功');
      },
    },
  ];
  return (
    <>
      <Switch
        checkedChildren="加载状态"
        unCheckedChildren="加载状态"
        onChange={v => {
          form.setFormLoading(v);
        }}
      />
      &nbsp;&nbsp;
      <Switch
        checkedChildren="按钮禁用"
        unCheckedChildren="按钮禁用"
        onChange={v => {
          form.setFooterDisabled(v);
        }}
      />
      &nbsp;&nbsp;
      <Switch
        checkedChildren="按钮切换"
        unCheckedChildren="按钮切换"
        onChange={v => {
          if (v) {
            form.setFooterActions(actions2);
          } else {
            form.setFooterActions(actions1);
          }
        }}
      />
      <CardForm
        title="新增用户"
        form={form}
        initialValues={{
          input: '这里是默认值',
        }}
        fields={schema}
        cardProps={{
          style: {
            marginTop: 16,
          },
          bodyStyle: {
            height: 500,
            overflow: 'auto',
          },
        }}
        column={2}
        actions={actions1}
      />
    </>
  );
};
```

## API

| 属性名                 | 描述                                                                | 类型                                                                                        | 默认值                       |
| ---------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------- |
| cardProps              | Card 属性设置                                                       | `CardProps`                                                                                 | `--`                         |
| width                  | 表单宽度                                                            | `string \| number`                                                                          | `--`                         |
| actions                | 定义操作按钮                                                        | `ActionProps[]`                                                                             | `--`                         |
| actionAlign            | 操作按钮的布局方式                                                  | `"start" \| "center" \| "end"`                                                              | `center`                     |
| onClose                | 取消事件                                                            | `(e: any) => void`                                                                          | `--`                         |
| onSubmit               | 提交事件                                                            | `(values: any) => void`                                                                     | `--`                         |
| cancelText             | 取消的文案                                                          | `string`                                                                                    | `取消`                       |
| confirmText            | 确定的文案                                                          | `string`                                                                                    | `确定`                       |
| render                 | 自定义渲染                                                          | `({ value, onChange }: { value: any; onChange: any; }) => ReactNode`                        | `--`                         |
| closeConfirm           | 关闭二次确认配置                                                    | `PopconfirmProps`                                                                           | `--`                         |
| footerRender           | 自定义渲染底部操作                                                  | `(form: any) => ReactNode`                                                                  | `--`                         |
| fields                 | 表单的数据模型                                                      | `FormFieldProps<FieldProps>[] \| ((form: FormLibInstance) => FormFieldProps<FieldProps>[])` | `[]`                         |
| widgets                | 注入自定义组件                                                      | `any`                                                                                       | `--`                         |
| readOnly               | 是否只读                                                            | `boolean`                                                                                   | `false`                      |
| disabled               | 是否禁用                                                            | `boolean`                                                                                   | `false`                      |
| disabledFields         | 禁用指定的字段                                                      | `any`                                                                                       | `[]`                         |
| column                 | 等分布局属性                                                        | `number`                                                                                    | `1`                          |
| gridStyle              | 布局样式设置                                                        | `any`                                                                                       | `{columnGap: 20, rowGap: 0}` |
| className              | 最外层类名                                                          | `string`                                                                                    | `--`                         |
| onMount                | 表单加载完的钩子                                                    | `(form: FormLibInstance) => void`                                                           | `--`                         |
| locale                 | 国际化                                                              | `any`                                                                                       | `--`                         |
| getScrollContainer     | 滚动的区域                                                          | `() => HTMLElement`                                                                         | `--`                         |
| readOnlyEmptyValueNode | 只读表单的空提示                                                    | `ReactNode`                                                                                 | `--`                         |
| formConfig             | 表单通用配置                                                        | `FormConfigProps`                                                                           | `--`                         |
| readOnlyClean          | 简洁只读模式、开启之后只读表单的 FormItem tooltip、extra 属性会忽略 | `boolean`                                                                                   | `false`                      |

## ActionProps

| 属性名    | 描述                  | 类型                                                     | 默认值   |
| --------- | --------------------- | -------------------------------------------------------- | -------- |
| label     | 文案                  | `string`                                                 | `(必选)` |
| type      | 按钮类型              | `"primary" \| "link" \| "text" \| "default" \| "dashed"` | `--`     |
| reset     | 清空表单              | `boolean`                                                | `false`  |
| spin      | 开启加载              | `boolean`                                                | `false`  |
| auth      | 权限标识，参看 Button | `string`                                                 | `--`     |
| validator | 开启校验              | `boolean`                                                | `false`  |
| onClick   | 开启校验              | `Function`                                               | `false`  |
| visible   | 是否可见              | `Function \| Boolean`                                    | `true`   |
| disabled  | 是否禁用              | `boolean`                                                | `false`  |
| confirm   | 配置二次确认          | `{ title: string; content: ReactNode; }`                 | `--`     |
| tooltip   | hover 提示信息        | `ReactNode \| TooltipProps`                              | `--`     |

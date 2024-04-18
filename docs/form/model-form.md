---
order: 9
title: ModalForm 弹框提交表单
toc: menu
---

## 基本使用

```tsx
import React from 'react';
import { ModalForm } from 'slick-form';
import schema from './schema/form-submit/schema';
import { Button, message, Switch } from 'antd';
const delay = ms => new Promise(res => setTimeout(res, ms, true));
export default props => {
  const onSubmit = async values => {
    console.log('onSubmit ->', values);
    const res = await delay(1000);
    if (res) {
      message.success('保存成功');
    }
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const [drag, setDrag] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  return (
    <>
      <Switch
        checkedChildren="拖拽"
        unCheckedChildren="拖拽"
        onChange={setDrag}
      />
      &nbsp;&nbsp;
      <Switch
        checkedChildren="关闭触发二次确认"
        unCheckedChildren="关闭触发二次确认"
        onChange={setConfirm}
      />
      <br />
      <br />
      <Button type="primary" onClick={setOpen.bind(null, true)}>
        新增
      </Button>
      <ModalForm
        title="新增用户"
        drag={drag}
        open={open}
        width={1000}
        closeConfirm={
          confirm
            ? {
                title: '提示',
                content: '是否确认关闭?',
              }
            : undefined
        }
        modalProps={{
          bodyStyle: {
            height: 500,
            overflow: 'auto',
          },
        }}
        onClose={setOpen.bind(null, false)}
        onSubmit={onSubmit}
        fields={schema}
        column={2}
      />
    </>
  );
};
```

## 自定义渲染底部按钮

```tsx
import React from 'react';
import { DrawerForm, ModalForm } from 'slick-form';
import schema from './schema/form-submit/schema';
import { Button, message, Switch, Space } from 'antd';

const delay = ms => new Promise(res => setTimeout(res, ms, true));

export default props => {
  const [opeModal, setOpenModal] = React.useState(false);
  return (
    <>
      <Button type="primary" onClick={setOpenModal.bind(null, true)}>
        新增Modal
      </Button>
      <ModalForm
        title="新增用户"
        open={opeModal}
        width={1000}
        onClose={setOpenModal.bind(null, false)}
        modalProps={{
          bodyStyle: {
            height: 500,
            overflow: 'auto',
          },
        }}
        footerRender={form => {
          return (
            <Space>
              <a>这个是一个描述信息</a>
              <Button onClick={setOpenModal.bind(null, false)}>取消</Button>
              <Button
                type="primary"
                ghost
                onClick={async () => {
                  const data = await form.submit();
                  const res = await delay(1000);
                  if (res) {
                    message.success('保存成功');
                  }
                  setOpenModal(false);
                }}
              >
                提交
              </Button>
            </Space>
          );
        }}
        fields={schema}
        column={2}
      />
    </>
  );
};
```

## API

| 属性名                 | 描述                                                                | 类型                                                                                        | 默认值                       |
| ---------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------- |
| modalProps             | Modal 属性设置                                                      | `ModalProps`                                                                                | `--`                         |
| open                   | 是否可见                                                            | `boolean`                                                                                   | `false`                      |
| drag                   | 是否可拖拽                                                          | `boolean`                                                                                   | `--`                         |
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

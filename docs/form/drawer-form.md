---
order: 8
title: DrawerForm 抽屉提交表单
toc: menu
---

## 基本使用

```tsx
import React from 'react';
import { DrawerForm } from 'slick-form';
import schema from './schema/form-submit/schema';
import { Button } from 'antd';
const delay = ms => new Promise(res => setTimeout(res, ms, true));
export default props => {
  const [open, setOpen] = React.useState(false);
  const onSubmit = async values => {
    console.log('onSubmit ->', values);
    const res = await delay(1000);
    if (res) {
      message.success('保存成功');
    }
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={setOpen.bind(null, true)}>
        新增
      </Button>
      <DrawerForm
        title="新增用户"
        open={open}
        width={500}
        onClose={setOpen.bind(null, false)}
        onSubmit={onSubmit}
        fields={schema}
      />
    </>
  );
};
```

## 自定义渲染底部按钮

```tsx
import React from 'react';
import { DrawerForm } from 'slick-form';
import schema from './schema/form-submit/schema';
import { Button, message, Switch, Space } from 'antd';

const delay = ms => new Promise(res => setTimeout(res, ms, true));

export default props => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  return (
    <>
      <Button type="primary" onClick={setOpenDrawer.bind(null, true)}>
        新增 Drawer
      </Button>
      <DrawerForm
        title="新增用户"
        fields={schema}
        open={openDrawer}
        onClose={setOpenDrawer.bind(null, false)}
        footerRender={form => {
          return (
            <Space>
              <a>这个是一个描述信息</a>
              <Button onClick={setOpenDrawer.bind(null, false)}>取消</Button>
              <Button
                type="primary"
                ghost
                onClick={async () => {
                  const data = await form.submit();
                  const res = await delay(1000);
                  if (res) {
                    message.success('保存成功');
                  }
                  setOpenDrawer(false);
                }}
              >
                提交
              </Button>
            </Space>
          );
        }}
      />
    </>
  );
};
```

## API

| 属性名                 | 描述                                                                | 类型                                                                                               | 默认值                       |
| ---------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------- |
| drawerProps            | Drawer 属性设置                                                     | <a href="https://ant-design.antgroup.com/components/drawer-cn#api" target="_blank">DrawerProps</a> | --                           |
| visible                | 是否可见                                                            | `boolean`                                                                                          | `false`                      |
| width                  | 表单宽度                                                            | `string` \| `number`                                                                               | --                           |
| actions                | 定义操作按钮                                                        | `ActionProps[]`                                                                                    | --                           |
| actionAlign            | 操作按钮的布局方式                                                  | `"start"` \| `"center"` \| `"end"`                                                                 | `center`                     |
| onClose                | 取消事件                                                            | `(e: any) => void`                                                                                 | --                           |
| onSubmit               | 提交事件                                                            | `(values: any) => void`                                                                            | --                           |
| cancelText             | 取消的文案                                                          | `string`                                                                                           | `取消`                       |
| confirmText            | 确定的文案                                                          | `string`                                                                                           | `确定`                       |
| render                 | 自定义渲染                                                          | `({ value, onChange }: { value: any; onChange: any; }) => ReactNode`                               | --                           |
| closeConfirm           | 关闭二次确认配置                                                    | `PopconfirmProps`                                                                                  | --                           |
| footerRender           | 自定义渲染底部操作                                                  | `(form: any) => ReactNode`                                                                         | --                           |
| fields                 | 表单的数据模型                                                      | `FormFieldProps<FieldProps>[]` \| `((form: FormLibInstance) => FormFieldProps<FieldProps>[])`      | `[]`                         |
| widgets                | 注入自定义组件                                                      | `any`                                                                                              | --                           |
| readOnly               | 是否只读                                                            | `boolean`                                                                                          | `false`                      |
| disabled               | 是否禁用                                                            | `boolean`                                                                                          | `false`                      |
| disabledFields         | 禁用指定的字段                                                      | `any[]`                                                                                            | `[]`                         |
| column                 | 等分布局属性                                                        | `number`                                                                                           | `1`                          |
| gridStyle              | 布局样式设置                                                        | `any`                                                                                              | `{columnGap: 20, rowGap: 0}` |
| className              | 最外层类名                                                          | `string`                                                                                           | --                           |
| onMount                | 表单加载完的钩子                                                    | `(form: FormLibInstance) => void`                                                                  | --                           |
| locale                 | 国际化                                                              | `any`                                                                                              | --                           |
| getScrollContainer     | 滚动的区域                                                          | `() => HTMLElement`                                                                                | --                           |
| readOnlyEmptyValueNode | 只读表单的空提示                                                    | `ReactNode`                                                                                        | --                           |
| formConfig             | 表单通用配置                                                        | `FormConfigProps`                                                                                  | --                           |
| readOnlyClean          | 简洁只读模式、开启之后只读表单的 FormItem tooltip、extra 属性会忽略 | `boolean`                                                                                          | `false`                      |

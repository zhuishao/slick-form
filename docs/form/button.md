---
order: 1
title: Button 扩展
toc: menu
---

> **在 antd 的 Button 基础上添加了 loading、防止重复点击、及二次确认、角色权限等扩展**

## 设置加载防止重复提交

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { Button } from 'slick-form';
export default () => {
  const submit = async e => {
    return new Promise(res => setTimeout(res, 1000));
  };
  return (
    <Button type="primary" spin onClick={submit}>
      点我提交
    </Button>
  );
};
```

## 设置气泡二次确认提示

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { message } from 'antd';
import { Button } from 'slick-form';
export default () => {
  const submit = async () => {
    return new Promise(res => {
      setTimeout(() => {
        message.success('删除成功！');
        res();
      }, 1000);
    });
  };
  return (
    <>
      <Button
        // type="link"
        type="primary"
        confirm={{
          title: '是否确认删除？',
          type: 'pop',
        }}
        onClick={submit}
      >
        删除
      </Button>
    </>
  );
};
```

## 设置二次确认提示前置校验

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { message } from 'antd';
import { Button, Form } from 'slick-form';
export default () => {
  const [form] = Form.useForm();
  const submit = async () => {
    return new Promise(res => {
      setTimeout(() => {
        message.success('发布成功！');
        res();
      }, 1000);
    });
  };
  return (
    <>
      <Form form={form}>
        <Form.Input
          required
          name="username"
          label="用户名称"
          style={{ width: 300 }}
        />
      </Form>
      <Button
        type="primary"
        onBeforeClick={async () => {
          await form.validateFields();
        }}
        confirm={{
          title: '提示下',
          content: '是否确认发布?',
          okText: '确认',
          cancelText: '取消',
        }}
        spin
        onClick={submit}
      >
        提交
      </Button>
    </>
  );
};
```

## 与 CreateForm 整合

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { message, Space } from 'antd';
import { Button, Form } from 'slick-form';
import fields from '../form/schema/create-form/form.ts';
const delay = ms => new Promise(res => setTimeout(res, ms, true));

export default () => {
  const btnRef = React.useRef({});
  const onSubmit = async values => {
    console.log('values: ', values);
    await delay(400);
    message.success('保存成功');
    // return Promise.reject(); // 阻止关闭
  };
  return (
    <Space>
      <Button
        onClick={() => {
          btnRef.current.click();
        }}
      >
        外部引用
      </Button>
      <Button
        spin
        modalFormProps={{
          title: '添加用户',
          fields,
          onSubmit,
          okConfirm: {
            title: '提示',
            type: 'pop',
            description: 323,
          },
        }}
        type="primary"
      >
        打开 ModalForm
      </Button>
      <Button
        ref={btnRef}
        spin
        drawerFormProps={async () => {
          await new Promise(res => setTimeout(res, 1000));
          return {
            title: '添加用户',
            width: 600,
            fields,
            onSubmit,
            okConfirm: {
              title: '提示',
              type: 'pop',
              description: 323,
            },
            initialValues: {
              dateTimeHabit: '2019-09-09 09:00',
            },
          };
        }}
      >
        打开 DrawerForm 支持异步函数
      </Button>
    </Space>
  );
};
```

## 与 Tooltip 整合

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { Button } from 'slick-form';
import { Space } from 'antd';

export default () => {
  return (
    <Space>
      <Button tooltip="我是提示文案" type="primary">
        鼠标移入显示提示
      </Button>
      <Button tooltip="我是提示文案" type="link">
        显示提示
      </Button>
      <Button
        tooltip={{
          title: '我是提示文案',
          placement: 'right',
        }}
      >
        鼠标移入显示提示
      </Button>
    </Space>
  );
};
```

## 配置权限体系

```tsx
/**
 * background: '#fff'
 * title: 按钮权限一般是接口下发，我们会存在store中。一般是路由下添加按钮、给角色分配改按钮权限，需要在启动的入口预先注入权限
 */
import * as React from 'react';
import { Button } from 'slick-form';
import { Tag } from 'antd';
// 这个注入一般是在ice的app.ts的getInitialData中完成的,此处仅演示
// 代表当前用户配置了若干个按钮权限
Button.setAuth({
  'user-management-create': '新增用户',
  'user-management-retrieve': '详情',
  'user-management-update': '编辑',

  'application-management-create': '新增应用',
  'application-management-retrieve': '详情',
  'application-management-update': '编辑',
  'application-management-delete': '删除',
});
export default () => {
  return (
    <>
      <Button type="primary" auth="user-management-create" />
      <br />
      <br />
      <Button type="primary" auth="user-management-update" />
      <br />
      <br />
      <Button type="primary" auth="user-management-retrieve">
        用户详情
      </Button>
      <br />
      <br />
      {Button.hasAuth('user-management-delete') ? (
        <Tag color="success">您具有删除用户的权限</Tag>
      ) : (
        <Tag color="red">您暂无删除用户的权限</Tag>
      )}
      <br />
      <br />
      <Button type="primary" auth="application-management-create" />
      <br />
      <br />
      <Button type="primary" auth="application-management-update" />
      <br />
      <br />
      <Button type="primary" auth="application-management-delete" />
      <br />
      <br />
      {Button.hasAuth('application-management-delete') ? (
        <Tag color="success">您具有删除应用的权限</Tag>
      ) : (
        <Tag color="red">您暂无删除应用的权限</Tag>
      )}
    </>
  );
};
```

## 设置弹框二次确认提示

```tsx
/**
 * background: '#fff'
 */
import * as React from 'react';
import { message } from 'antd';
import { Button } from 'slick-form';

export default () => {
  const submit = async () => {
    return new Promise(res => {
      setTimeout(() => {
        message.success('发布成功！');
        res(true);
      }, 1000);
    });
  };
  return (
    <Button
      type="primary"
      confirm={{
        title: '提示下',
        content: '是否确认发布?',
        okText: '确认',
        cancelText: '取消',
      }}
      spin
      onClick={submit}
    >
      开始部署
    </Button>
  );
};
```

## API

### Button Props

| 属性名          | 描述                                                      | 类型                                                                                                                                                                        | 默认值  |
| --------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| onClick         | 点击按钮时触发的事件                                      | `(e?: any) => void`                                                                                                                                                         | -       |
| spin            | 是否启用加载效果                                          | `boolean`                                                                                                                                                                   | `false` |
| confirm         | 弹出确认框或自定义确认逻辑的配置对象                      | `PopconfirmProps & { type?: "pop" \| "alert"; content?: ReactNode; }`                                                                                                       | -       |
| auth            | 权限标识，用于权限控制                                    | `string`                                                                                                                                                                    | -       |
| btnType         | 按钮类型                                                  | `string`                                                                                                                                                                    | -       |
| onBeforeClick   | 点击按钮之前执行的回调函数                                | `() => void`                                                                                                                                                                | -       |
| drawerFormProps | 配置 Drawer 表单的属性或者一个函数返回 Promise 包装的配置 | <a href="/form/drawer-form#api" target="_blank">`CreateDrawerFormProps`</a> \| <a href="/form/drawer-form#api" target="_blank">`(() => Promise<CreateDrawerFormProps>)`</a> | -       |
| modalFormProps  | 配置 Modal 表单的属性或者一个函数返回 Promise 包装的配置  | `CreateModalFormProps \| (() => Promise<CreateModalFormProps>)`                                                                                                             | -       |
| tooltip         | 提示信息                                                  | `ReactNode` \| `TooltipProps`                                                                                                                                               | -       |
| visible         | 是否显示按钮                                              | `boolean`                                                                                                                                                                   | `true`  |
| validator       | 自定义验证逻辑                                            | -                                                                                                                                                                           | -       |
| ...props        | antd Button 组件支持的其他所有 props                      | -                                                                                                                                                                           | -       |

## 方法扩展

| **属性名** | **类型** | **描述**               | **默认** |
| ---------- | -------- | ---------------------- | -------- |
| setAuth    | Function | 设置按钮权限           | 无       |
| getAuth    | Function | 获取按钮权限           | 无       |
| hasAuth    | Function | 判断是否具有该按钮权限 | 无       |

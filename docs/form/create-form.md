---
order: 10.1
title: CreateForm 创建提交表单
toc: menu
---

> - 基于数据模型创建提交表单，通过 API 方式打开关闭，不需要定义 visible 控制
> - 可以替换 PageProvider 实现基础 CRUD

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { message } from 'antd';
import { TableProvider, Form, CreateForm } from 'slick-form';
import searchSchema from './schema/create-form/search';
import tableSchema from './schema/create-form/table';
import formSchema from './schema/create-form/form';

// 模拟接口延迟
const delay = ms => new Promise(res => setTimeout(res, ms, true));

// 用户1表单模型
const userForm1 = CreateForm.Modal({
  title: '新增用户1',
  fields: formSchema,
  onClose() {
    console.log('closeModal');
  },
});

// 用户2表单模型
const userForm2 = CreateForm.Drawer({
  title: '新增用户2',
  fields: formSchema,
  onClose() {
    console.log('closeDrawer');
  },
});

export default () => {
  const [searchForm] = Form.useForm();
  const onSubmit = async values => {
    await delay(400);
    message.success('保存成功');
    searchForm.search();
    // return Promise.reject(); // 阻止关闭
  };
  const toolsClick = e => {
    if (e.key === 'add1') {
      userForm1.open({
        onSubmit,
      });
    }
    if (e.key === 'add2') {
      userForm2.open({
        onSubmit,
      });
    }
  };
  const rowOperationsClick = (e, record) => {
    if (e.key === 'edit1') {
      userForm1.open({
        title: '编辑用户1',
        initialValues: record, // 添加扩展属性
        onSubmit,
      });
    }
    if (e.key === 'edit2') {
      userForm2.open({
        title: '编辑用户2',
        initialValues: record, // 添加扩展属性
        onSubmit,
      });
    }
  };
  return (
    <TableProvider
      toolsClick={toolsClick}
      rowOperationsClick={rowOperationsClick}
    >
      <TableProvider.Search {...searchSchema} form={searchForm} />
      <TableProvider.Table {...tableSchema} />
    </TableProvider>
  );
};
```

## CreateForm 自定义渲染

```tsx
import React from 'react';
import { CreateForm } from 'slick-form';
import { Space, Button, message } from 'antd';

const delay = ms => new Promise(res => setTimeout(res, ms, true));

const renderModal = CreateForm.Modal({
  title: '自定义渲染',
  initialValues: {
    userName: '张三',
    address: 'xx省xx市',
  },
});

const renderDrawer = CreateForm.Drawer({
  title: '自定义渲染',
});

export default props => {
  const onSubmit = async values => {
    const res = await delay(1000);
    console.log('onSubmit ->', values);
    if (res) {
      message.success('保存成功');
    } else {
      return Promise.reject(); // 阻止关闭
    }
  };
  return (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          renderModal.open({
            onSubmit,
            // 体现为一个自定义组件
            render: ({ value = {}, onChange }) => {
              return (
                <div>
                  姓名：
                  <input
                    value={value.userName}
                    onChange={e => {
                      onChange({
                        ...value,
                        userName: e.target.value,
                      });
                    }}
                  />
                  <br />
                  <br />
                  地址：
                  <input
                    value={value.address}
                    onChange={e => {
                      onChange({
                        ...value,
                        address: e.target.value,
                      });
                    }}
                  />
                </div>
              );
            },
          });
        }}
      >
        打开弹窗自定义渲染
      </Button>
      <Button
        type="primary"
        onClick={() => {
          renderDrawer.open({
            onSubmit,
            // 体现为一个自定义组件
            render: ({ value = {}, onChange }) => {
              return <div>这里是自定义渲染的内容</div>;
            },
          });
        }}
      >
        打开抽屉自定义渲染
      </Button>
    </Space>
  );
};
```

## API

| **属性名** | **类型**                                 | **描述**             |
| ---------- | ---------------------------------------- | -------------------- |
| Modal      | `funtion(config: CreateModalFormProps)`  | 创建 ModalForm 实例  |
| Drawer     | `funtion(config: CreateDrawerFormProps)` | 创建 DrawerForm 实例 |

## 实例 Api

| **属性名** | **类型**          | **描述**                   |
| ---------- | ----------------- | -------------------------- |
| open       | `funtion(config)` | 打开表单，支持扩展属性配置 |
| close      | `funtion()`       | 关闭当前表单               |

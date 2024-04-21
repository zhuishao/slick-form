---
order: 16
title: EditableTable 可编辑表格
toc: menu
---

- 可排序、编辑表格、基于 Table 扩展、可作为自定义表单组件配合 Form 使用

## 基本使用

```tsx
/**
 * desc: 排序采用的react-sortable-hoc，需要提供rowKey来确定数据的唯一值，否则不能正常工作
 */
import React from 'react';
import { Switch } from 'antd';
import { EditableTable } from 'slick-form';
import schema from './schema/editable-table/schema';

export default () => {
  const [position, setPosition] = React.useState('bottom');
  const [sortable, setSortable] = React.useState(false);
  return (
    <div style={{ width: 800 }}>
      <Switch
        checkedChildren="bottom"
        unCheckedChildren="top"
        checked={position === 'bottom'}
        onChange={v => {
          setPosition(v ? 'bottom' : 'top');
        }}
      />
      &nbsp;&nbsp;
      <Switch
        checkedChildren="sort"
        unCheckedChildren="unSort"
        onChange={setSortable}
        checked={sortable}
      />
      <br />
      <br />
      <EditableTable
        rowKey="name" // 唯一标识默认是id
        scroll={{
          x: 800,
        }}
        value={[
          {
            name: '张三',
            sex: 0,
            sexLabel: '男',
            phone: '12234344545',
            age: 13,
          },
          {
            name: '李四',
            sex: 1,
            sexLabel: '女',
            phone: '934893489',
          },
        ]}
        position={position}
        sortable={sortable}
        {...schema}
      />
    </div>
  );
};
```

## 配合 Form 表单使用

```tsx
import React from 'react';
import { Modal } from 'antd';
import { Button, CardForm, Form } from 'slick-form';
import schema from './schema/editable-table/schema';

export default () => {
  const [form] = Form.useForm();
  const [readOnly, setReadOnly] = React.useState(false);
  const onSubmit = async values => {
    if (form.formListInstance.relationList.editIndex !== -1) {
      Modal.confirm({
        title: '提示',
        content: '客户联系人名单有未保存的数据，是否确认提交',
        onOk: async () => {
          await form.formListInstance.relationList.saveEdit(); // 手动保存正在编辑的行
          console.log('values: ', values);
        },
      });
    } else {
      console.log('values: ', values);
    }
  };
  React.useEffect(() => {
    // 默认第一行开启编辑态
    console.log(form.formListInstance, 'kdjsl');
    // form.formListInstance.relationList.setEditIndex(0);
  }, []);
  return (
    <>
      <Button
        style={{ marginBottom: 12 }}
        onClick={setReadOnly.bind(null, !readOnly)}
      >
        {!readOnly ? '设置' : '取消'}只读模式
      </Button>
      <CardForm
        title="新增客户"
        form={form}
        width={800}
        readOnly={readOnly}
        initialValues={{
          userName: 'test-001',
          relationList: [
            {
              name: '张三',
              phone: '13723785623',
              sex: 0,
              sexLabel: '男',
              age: 12,
            },
          ],
        }}
        onSubmit={onSubmit}
        fields={[
          {
            type: 'Input',
            label: '客户姓名',
            name: 'userName',
            required: true,
          },
          {
            type: 'EditableTable',
            label: '客户联系人名单',
            name: 'relationList',
            required: true,
            style: {
              width: 750,
            },
            props: {
              ...schema,
              scroll: {
                x: 1000,
              },
            },
          },
        ]}
      />
    </>
  );
};
```

## API

| 属性名             | 描述           | 类型                                        | 默认值   |
| ------------------ | -------------- | ------------------------------------------- | -------- |
| columns            | 列信息         | `any`                                       | `(必选)` |
| value              | 数据源         | `any`                                       | `--`     |
| onBeforeChange     | 数据即将改变   | `(value: any, values: any) => Promise<any>` | `--`     |
| onBeforeDelete     | 数据即将删除   | `(value: any) => Promise<any>`              | `--`     |
| onChange           | 数据改变       | `(value: any) => void`                      | `--`     |
| readOnly           | 是否只读       | `boolean`                                   | `--`     |
| sortable           | 是否支持排序   | `boolean`                                   | `--`     |
| creatorButtonProps | 底部按钮配置   | `any`                                       | `(必选)` |
| maxLength          | 限制最大条数   | `number`                                    | `--`     |
| position           | 添加按钮的位置 | `"top" \| "bottom"`                         | `--`     |
| defaultAddValue    | 添加的默认值   | `any`                                       | `--`     |

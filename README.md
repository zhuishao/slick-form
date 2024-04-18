## 安装

组件库本身依赖 ant design，使用需要同时安装 antd，在 src/global.less 中全量引入 antd less 文件

```shell
npm install slick-form --save
```

## 基本使用

```tsx
import { Form } from 'slick-form';

export default () => {
  return (
    <Form
      fields={[
        {
          type: 'Input',
          label: '姓名',
          name: 'name',
          required: true,
        },
        {
          type: 'Select',
          label: '爱好',
          name: 'liked',
          props: {
            options: [
              {
                label: '爱好1',
                value: 0,
              },
              {
                label: '爱好2',
                value: 1,
              },
            ],
          },
        },
      ]}
    />
  );
};
```

## 使用异步选择器

```tsx
import { Form } from 'slick-form';

export default () => {
  return (
    <Form
      fields={[
        {
          type: 'AsyncSelect',
          label: '爱好',
          name: 'liked',
          props: {
            options: async () => {
              await new Promise(res => setTimeout(res, 1000));
              return [
                {
                  label: '爱好1',
                  value: 0,
                },
                {
                  label: '爱好2',
                  value: 1,
                },
              ];
            },
          },
        },
      ]}
    />
  );
};
```

## 使用设置联动

```tsx
import { Form } from 'slick-form';

export default () => {
  return (
    <Form
      fields={[
        {
          type: 'RadioGroup',
          label: '性别',
          name: 'sex',
          props: {
            options: [
              {
                label: '男',
                value: 0,
              },
              {
                label: '女',
                value: 1,
              },
            ],
          },
        },
        {
          type: 'InputNumber',
          label: '年龄',
          name: 'age',
          effect: ['sex'],
          isShow: ({ sex }) => sex === 0,
        },
      ]}
    />
  );
};
```

## 使用自定义渲染

```tsx
import { Form } from 'slick-form';

export default () => {
  return (
    <Form
      fields={[
        {
          label: '性别',
          name: 'sex',
          type: ({ value, onChange, form, ...props }) => {
            return <div>自定义渲染</div>;
          },
        },
        {
          type: 'Render',
          props: {
            render(form) {
              return <div>自定义渲染</div>;
            },
          },
        },
        {
          type: 'AsyncRender',
          props: {
            async render(form) {
              await new Promise(res => setTimeout(res, 1000));
              return <div>自定义异步渲染</div>;
            },
          },
        },
        {
          type: 'MyWidget',
          name: 'my-widget',
          props: {
            text: 'my-widget',
          },
        },
      ]}
      widgets={{
        MyWidget: ({ value, onChange, form, ...props }) => {
          return <div>{props.text}</div>;
        },
      }}
    />
  );
};
```

## 在线文档

- [敬请期待]()

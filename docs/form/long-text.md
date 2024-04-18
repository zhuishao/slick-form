---
order: 20
title: LongText 长文本组件
toc: menu
---

> - 详情组件基于 antd Paragraph 扩展

## 基本使用-文本比较短

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { LongText } from 'slick-form';
export default () => {
  return <LongText text="这是一段说明文本" />;
};
```

## 基本使用-文本比较长，超过 2 行隐藏

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { LongText } from 'slick-form';
import { Switch } from 'antd';
export default () => {
  const [count, setCount] = React.useState(5);
  return (
    <>
      <Switch
        checkedChildren="超长"
        unCheckedChildren="普通"
        onChange={v => {
          setCount(v ? 10 : 5);
        }}
      />
      <br />
      <br />
      <LongText
        text={'这是一段有点长的说明文本，超出2行就换行了，不信你试试'.repeat(
          count
        )}
      />
    </>
  );
};
```

## 基本使用-文本比较长，超过 3 行隐藏

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { LongText } from 'slick-form';
import { Switch } from 'antd';
export default () => {
  const [count, setCount] = React.useState(5);
  return (
    <>
      <Switch
        checkedChildren="超长"
        unCheckedChildren="普通"
        onChange={v => {
          setCount(v ? 15 : 5);
        }}
      />
      <br />
      <br />
      <LongText
        text={'这是一段有点长的说明文本，超出3行就换行了，不信你试试'.repeat(
          count
        )}
        rows={3}
        expandText="展开全部"
        packupText="收起全部"
      />
    </>
  );
};
```

## API

| 属性名     | 描述                     | 类型        | 默认值   |
| ---------- | ------------------------ | ----------- | -------- |
| rows       | 最多显示的行数，默认为 2 | `number`    | `--`     |
| text       | 完整的文本               | `ReactNode` | `(必选)` |
| expandText | 展开的文案               | `ReactNode` | `--`     |
| packupText | 收起的文案               | `ReactNode` | `--`     |
| className  | 自定义样式               | `string`    | `--`     |

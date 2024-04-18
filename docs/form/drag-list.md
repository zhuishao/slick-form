---
order: 17
title: DragList 可拖拽列表
toc: menu
---

> - 拖拽调整位置列表

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { DragList } from 'slick-form';
export default () => {
  return (
    <div style={{ width: 100 }}>
      <DragList
        defaultActiveKey={3}
        onClick={item => {
          console.log(item);
        }}
        onChange={list => {
          console.log(list);
        }}
        list={[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
          return {
            key: i,
            label: <div style={{ padding: 6 }}>{i}</div>,
          };
        })}
      />
    </div>
  );
};
```

## API

| 属性名           | 描述           | 类型                                             | 默认值 |
| ---------------- | -------------- | ------------------------------------------------ | ------ |
| list             | 列表数据源     | `{ key: string \| number; label: ReactNode; }[]` | `[]`   |
| onChange         | 列顺序改变事件 | `Function`                                       | `--`   |
| onClick          | 点击事件事件   | `Function`                                       | `--`   |
| defaultActiveKey | 默认选中       | `string \| number`                               | `--`   |
| showIcon         | 是否展示图标   | `boolean`                                        | `true` |

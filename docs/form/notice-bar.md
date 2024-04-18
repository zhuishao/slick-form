---
order: 20
title: NoticeBar 通告栏
toc: menu
---

- 详情组件基于 antd Alert 扩展

## 基本使用

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { NoticeBar } from 'slick-form';
export default () => {
  return (
    <NoticeBar
      marquee
      message="这是一段说明文本这是一段说明文本这是一段说明文本这是一段说明文本这是一段说明文本这是一段说明文本这是一段说明文本这是一段说明文本这是一段说明文本"
    />
  );
};
```

## API

| 属性名  | 描述         | 类型    | 默认值  |
| ------- | ------------ | ------- | ------- |
| marquee | 是否开启滚动 | `false` | `false` |

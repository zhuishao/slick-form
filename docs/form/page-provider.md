---
order: 11
title: PageProvider 单页组件
toc: menu
---

> - 本质是一个接收一个 Page 和 Layers，并注入相关的 props 可以实现通用的 CRUD 的高阶组件

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { PageProvider } from 'slick-form';
import Page from './demo/user/page';
import Form1 from './demo/user/layer/1';
import Form2 from './demo/user/layer/2';
import Form3 from './demo/user/layer/3';
export default () => {
  return (
    <PageProvider
      Page={Page}
      Layers={{
        f1: Form1,
        f2: Form2,
        f3: Form3,
      }}
    />
  );
};
```

## 使用 properties 注入扩展属性

```tsx
/**
 * background: '#f6f7f9'
 * desc: properties 中如果含有LayerProps或者PageProps同名的属性则会被覆盖
 */
import React from 'react';
import { PageProvider } from 'slick-form';
import Page from './demo/user/page';
import Form1 from './demo/user/layer/1';
import Form2 from './demo/user/layer/2';
import Form3 from './demo/user/layer/3';
export default () => {
  return (
    <PageProvider
      properties={{
        name: 'hello',
        age: 'kkk',
        userId: '9999',
        data: 23, // 定义的data会被覆盖
      }}
      Page={Page}
      Layers={{
        f1: Form1,
        f2: Form2,
        f3: Form3,
      }}
    />
  );
};
```

## API

| 属性名     | 描述                                 | 类型                                 | 默认值   |
| ---------- | ------------------------------------ | ------------------------------------ | -------- |
| Page       | 主页面                               | `any`                                | `(必选)` |
| Layers     | 弹出层                               | `{ [key: string]: FC<LayerProps>; }` | `--`     |
| properties | 注入的属性，穿透到 Page 和 Layers 中 | `any`                                | `--`     |

## Page、Layer 注入的属性

| 属性名     | 描述             | 类型                                                               | 默认值   |
| ---------- | ---------------- | ------------------------------------------------------------------ | -------- |
| open       | 打开指定的 layer | `(key: string \| number, data?: Object, newTab?: boolean) => void` | `(必选)` |
| close      | 关闭所有的 layer | `() => void`                                                       | `(必选)` |
| success    | 成功提示         | `(description: ReactNode) => void`                                 | `(必选)` |
| refresh    | 刷新主页面       | `() => void`                                                       | `(必选)` |
| notify     | 通知             | `Notify`                                                           | `(必选)` |
| searchForm | Form 实例        | `FormLibInstance`                                                  | `(必选)` |
| data       | 传递的属性       | `any`                                                              | `--`     |

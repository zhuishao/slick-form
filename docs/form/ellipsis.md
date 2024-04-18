---
order: 10
title: Ellipsis 文本省略
toc: menu
---

## 基本使用

```tsx
import * as React from 'react';
import { Ellipsis } from 'slick-form';
export default () => {
  return (
    <div
      style={{
        fontSize: '14px',
        color: '#666',
        width: '615px',
        margin: '50px auto',
        borderRadius: '8px',
        padding: '15px',
        overflow: 'hidden',
        resize: 'horizontal',
        boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
      }}
    >
      <Ellipsis>
        我是pdf哦我是pdf哦我是pdf哦我是pdf哦我是pdf哦我是pdf哦我是pdf哦我是pdf哦我是pdf哦我是pdf哦我是pdf哦.pdf
      </Ellipsis>
      <Ellipsis>
        我是图片哦我是图片哦我是图片哦我是图片哦我是图片哦我是图片哦我是图片哦我是图片哦我是图片哦我是图片哦我是图片哦.png
      </Ellipsis>
    </div>
  );
};
```

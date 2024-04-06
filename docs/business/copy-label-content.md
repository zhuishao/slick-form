---
order: 5
title: CopyLabelContent 富交互复制
toc: menu
---

## 基本使用

```tsx
import React from 'react';
import { CopyLabelContent, tools } from 'slick-form';

export default () => {
  return (
    <>
      <CopyLabelContent
        type="primary"
        label="商品 ID"
        content="这个是被复制的内容"
        onCopy={() => {
          tools.copyToClipBoard('这个是被复制的内容', false);
        }}
      />
    </>
  );
};
```

## 修改整体样式

```tsx
import React from 'react';
import { CopyLabelContent, tools } from 'slick-form';

export default () => {
  return (
    <>
      <CopyLabelContent
        style={{ color: 'red', fontSize: 12 }}
        label="商品 ID"
        content="这个是被复制的内容"
        onCopy={() => {
          tools.copyToClipBoard('这个是被复制的内容', false);
        }}
      />
    </>
  );
};
```

## 修改 content 样式

```tsx
import React from 'react';
import { CopyLabelContent, tools } from 'slick-form';

export default () => {
  return (
    <>
      <CopyLabelContent
        contentStyle={{ fontSize: 12 }}
        style={{ ['--copy-content-color']: 'blue' }}
        label="商品 ID"
        content="这个是被复制的内容"
        onCopy={() => {
          tools.copyToClipBoard('这个是被复制的内容', false);
        }}
      />
    </>
  );
};
```

## 不显示 label 和 content

```tsx
import React from 'react';
import { CopyLabelContent, tools } from 'slick-form';

export default () => {
  return (
    <>
      <CopyLabelContent
        onCopy={() => {
          tools.copyToClipBoard('这个是被复制的内容', false);
        }}
      />
    </>
  );
};
```

## 在复制 icon 后显示提示

```tsx
import React from 'react';
import { CopyLabelContent, tools } from 'slick-form';

export default () => {
  return (
    <>
      <CopyLabelContent
        iconStyle={{ marginTop: -1 }}
        label="GROUP ID:"
        copyTxt="复制链接"
        content="234143234234"
        // style={{ fontSize: '12px', color: '#8F96A0' }}
        onCopy={() => {
          tools.copyToClipBoard('234143234234', false);
        }}
      />
    </>
  );
};
```

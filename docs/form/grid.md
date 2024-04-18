---
order: 2
title: Grid 布局组件
toc: menu
---

> - Grid 布局，相比较 Row、Col 组件具有随着屏幕大小会自动适配。
> - ≧ 1352px 4 列 、≧ 701px 3 列、≧ 513px 2 列、< 513px 1 列

## 基本使用

```tsx
import * as React from 'react';
import { Grid } from 'slick-form';
export default () => {
  return (
    <Grid>
      {new Array(13).fill(1).map((d, i) => (
        <div key={i} style={{ height: 200, background: '#eee' }}></div>
      ))}
    </Grid>
  );
};
```

## 默认 3 列

```tsx
import * as React from 'react';
import { Grid } from 'slick-form';
export default () => {
  return (
    <Grid column={3}>
      {new Array(13).fill(1).map((d, i) => (
        <div key={i} style={{ height: 200, background: '#eee' }}></div>
      ))}
    </Grid>
  );
};
```

## 灵活布局

```tsx
import * as React from 'react';
import { Grid } from 'slick-form';
export default () => {
  const style = { height: 64, background: '#eee' };
  return (
    <Grid>
      <div style={style}></div>
      <div style={style}></div>
      <div style={{ ...style, gridColumnStart: 'span 2' }}></div>

      <div style={{ ...style, gridColumnStart: 'span 2' }}></div>
      <div style={{ ...style, gridColumnStart: 'span 2' }}></div>

      <div style={{ ...style, gridColumnStart: 'span 3' }}></div>
      <div style={style}></div>

      <div style={style}></div>
      <div style={style}></div>
      <div style={style}></div>
      <div style={style}></div>

      <div style={{ ...style, gridColumnStart: 'span 4' }}></div>

      <div style={{ ...style, gridColumnStart: 'span 2' }}></div>
      <div style={{ height: 64, background: '#eee' }}></div>
      <div style={{ height: 64, background: '#eee' }}></div>
    </Grid>
  );
};
```

## API

| 属性名    | 描述               | 类型            | 默认值                          |
| --------- | ------------------ | --------------- | ------------------------------- |
| gridStyle | 间隙设置           | `CSSProperties` | `{ rowGap: 20, columnGap: 20 }` |
| column    | 等分布局最多四等份 | `number`        | `4`                             |

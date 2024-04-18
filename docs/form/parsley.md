---
order: 19
title: Parsley 引导页步骤条
toc: menu
---

> - 解决项目中新功能引导问题

> - 采用原生 js+react 托管，并且最终销毁

> - 统一步骤引导，根据不同的主题，区分不同模式

## 案例

```tsx
import * as React from 'react';
import { Parsley, Button } from 'slick-form';

export default () => {
  const start = () => {
    Parsley.start({
      steps: [
        {
          title: '步骤一',
          intro: '点击这里开始步骤导航',
          element: document.querySelector('.ant-btn'),
        },
        {
          title: '步骤二',
          intro: '点击这里返回首页 🔙',
          element: document.querySelector('.dumi-default-logo'),
        },
        {
          title: '步骤三',
          intro: '可以在这里进行和关键字查找组件 👋',
          element: document.querySelector('.dumi-default-search-bar-input'),
        },
        {
          title: '步骤四',
          intro: '可以在这里切换主题!',
          element: document.querySelector('.dumi-default-color-switch'),
        },
      ],
      theme: 'line',
    });
  };
  return <Button onClick={start}> 点击开始 </Button>;
};
```

## API

| 属性名 | 描述               | 类型                            | 默认值   |
| ------ | ------------------ | ------------------------------- | -------- |
| start  | start 开启步骤引导 | `(options: PluginInter) => any` | `(必选)` |

## PluginInter

| 属性名       | 描述                                                  | 类型                  | 默认值      |
| ------------ | ----------------------------------------------------- | --------------------- | ----------- |
| steps        | 步骤数组                                              | `StepsInter[]`        | `(必选)`    |
| okText       | 确定文字                                              | `string`              | `--`        |
| jumpText     | 跳过文字                                              | `string`              | `--`        |
| previousText | 跳过文字                                              | `string`              | `--`        |
| width        | 宽度统一设置，也可在 steps 单独设置，权重低于 steps   | `number`              | `--`        |
| theme        | 主题， @param default 默认主题 @param line 线条提示框 | `"default" \| "line"` | `'default'` |

## StepsInter

| 属性名   | 描述         | 类型        | 默认值   |
| -------- | ------------ | ----------- | -------- |
| intro    | 内容描述     | `ReactNode` | `(必选)` |
| element  | 注入元素     | `Element`   | `--`     |
| callback | 执行完成回掉 | `Function`  | `--`     |
| title    | 标题         | `ReactNode` | `--`     |
| width    | 提示框宽度   | `number`    | `--`     |

---
order: 15
title: AnchorCard 锚点卡片
toc: menu
---

- 左侧面板支持点击滑动定位到指定的卡片

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { AnchorCard } from 'slick-form';
import { Card } from 'antd';
const tabs = [
  {
    tab: '基本信息',
    key: 'part1',
  },
  {
    tab: '数据报表',
    key: 'part2',
  },
  {
    tab: '联系人信息',
    key: 'part3',
  },
  {
    tab: '关联项目信息',
    key: 'part4',
  },
  {
    tab: '备案信息',
    key: 'part5',
  },
];

export default () => {
  return (
    <AnchorCard
      tabs={tabs.map(item => {
        return {
          ...item,
          content: (
            <Card
              title={item.tab}
              style={{
                height: 400,
                marginBottom: 20,
              }}
            >
              {item.tab}
            </Card>
          ),
        };
      })}
      defaultActivityKey="part1"
      fixHeight={104}
      fixedTop={104}
      contentClass="m-card"
    />
  );
};
```

## 自定义渲染子节点

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { AnchorCard } from 'slick-form';
import { Card } from 'antd';
const tabs = [
  {
    tab: '基本信息',
    key: 'self-part1',
  },
  {
    tab: '数据报表',
    key: 'self-part2',
  },
  {
    tab: '联系人信息',
    key: 'self-part3',
  },
  {
    tab: '关联项目信息',
    key: 'self-part4',
  },
  {
    tab: '备案信息',
    key: 'self-part5',
  },
];

export default () => {
  return (
    <AnchorCard
      tabs={tabs}
      defaultActivityKey="self-part1"
      fixHeight={104}
      fixedTop={104}
      contentClass="m-card"
    >
      <Card
        title="基本信息"
        id="self-part1"
        style={{
          height: 400,
          marginBottom: 20,
        }}
      >
        基本信息
      </Card>
      <Card
        title="数据报表"
        id="self-part2"
        style={{
          height: 400,
          marginBottom: 20,
        }}
      >
        数据报表
      </Card>
      <Card
        title="联系人信息"
        id="self-part3"
        style={{
          height: 400,
          marginBottom: 20,
        }}
      >
        联系人信息
      </Card>
      <Card
        title="关联项目信息"
        id="self-part4"
        style={{
          height: 400,
          marginBottom: 20,
        }}
      >
        关联项目信息
      </Card>
      <Card
        title="备案信息"
        id="self-part5"
        style={{
          height: 400,
          marginBottom: 20,
        }}
      >
        备案信息
      </Card>
    </AnchorCard>
  );
};
```

## API

| 属性名             | 描述              | 类型                                                      | 默认值   |
| ------------------ | ----------------- | --------------------------------------------------------- | -------- |
| tabs               | 数据源            | `{ tab: ReactNode; key: string; content?: ReactNode; }[]` | `(必选)` |
| getContainer       | 设置挂载 Dom 容器 | `() => HTMLElement`                                       | `--`     |
| defaultActivityKey | 默认选中          | `string`                                                  | `--`     |
| fixHeight          | 设置固定高度      | `number`                                                  | `--`     |
| contentClass       | 容器类名          | `string`                                                  | `--`     |
| fixedTop           | 固定高度          | `number`                                                  | `--`     |

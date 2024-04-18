---
order: 20
title: Descriptions 详情组件
toc: menu
---

<Alert>

- 详情组件类似 antd Descriptions，内部实现基于 antd gutter 布局重写

</Alert>

## 基本使用——居左对齐

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { Descriptions, LongText } from 'slick-form';
export default () => {
  return (
    <Descriptions column={2}>
      {[
        { label: '会议性质', value: '正式会议' },
        { label: '会议类型', value: '第一次债权人会议' },
        {
          label: '会名称',
          value: '张三组织开的第一次债权人会议',
        },
        { label: '会议时间', value: '2022-12-20 10:00:00' },
        {
          label: '会议地址',
          value: '浙江省杭州市余杭区阿里巴巴西溪园区访客中心4楼405',
        },
        {
          label: '会议备注',
          value: (
            <LongText text="会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注会议的备注" />
          ),
          span: 2,
        },
      ].map(item => (
        <Descriptions.Item
          label={item.label}
          key={item.label}
          span={item.span || 1}
        >
          {item.value}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};
```

## 基本使用——冒号对齐

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { Descriptions } from 'slick-form';
export default () => {
  return (
    <>
      <Descriptions
        title="基本信息"
        column={1}
        labelAlign="right"
        labelWidth={90}
        style={{ marginBottom: 10 }}
      >
        {[
          { label: '案号', value: '(2022)破1破97号' },
          { label: '案件名称', value: '呼市测试申请破产清算' },
          { label: '案件管理人', value: '测试专用管理人' },
          { label: '申请人', value: '张三' },
          { label: '申请时间', value: '2022-12-20 10:00:00' },
        ].map(item => (
          <Descriptions.Item
            label={item.label}
            key={item.label}
            span={item.span}
          >
            {item.value}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <Descriptions
        title="审批信息"
        column={1}
        labelAlign="right"
        labelWidth={90}
      >
        {[
          { label: '审批事项', value: '(2022)破1破97号' },
          { label: '审批时间', value: '2022-12-20 10:00:00' },
          {
            label: '审批意见',
            value: '爽快通过',
          },
          {
            label: '备注',
            value: '案件整体符合，准予通过',
          },
        ].map(item => (
          <Descriptions.Item
            label={item.label}
            key={item.label}
            span={item.span || 1}
          >
            {item.value}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </>
  );
};
```

## 更便捷使用——直接设置数据源

数据源设置 visible 控制是否显示,不设置默认为显示

数据源设置 tooltip 控制显示信息说明

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { Descriptions, LongText } from 'slick-form';
export default () => {
  return (
    <Descriptions
      column={3}
      dataSource={[
        {
          label: '会议性质',
          tooltip: 'ddd',
          value: '正式会议',
        },
        { label: '会议类型', visible: false, value: '第一次债权人会议' },
        { label: '会议名称', value: '张三组织开的第一次债权人会议' },
        { label: '会议时间', value: '2022-12-20 10:00:00' },
        { label: '所属地区', value: '浙江省杭州市余杭区' },
        { label: '详细地址', value: '阿里巴巴西溪园区访客中心4楼405' },
      ]}
    />
  );
};
```

## Descriptions

<API src="../../src/descriptions/index.tsx" hideTitle></API>

## Descriptions.Item

<API src="../../src/descriptions/item.tsx" hideTitle></API>

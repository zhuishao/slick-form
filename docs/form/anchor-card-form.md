---
order: 7
title: AnchorCardForm 电梯提交表单
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { ConfigProvider } from 'antd';
import { AnchorCardForm } from 'slick-form';

export default () => {
  const onSubmit = async values => {
    console.log('onSubmit ->', values);
  };
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
      }}
    >
      <AnchorCardForm
        fixHeight={205} // 偏移量
        height={460} // 容器高度
        defaultActivityKey="baseInfo"
        formProps={{
          fields: [
            {
              type: 'FieldSet',
              name: 'baseInfo',
              label: '基础表单',
              props: {
                column: 1,
                subTitle: '这个是一个描述信息',
                children: () => [
                  {
                    type: 'Input',
                    name: 'input',
                    label: '输入框',
                    required: true,
                  },
                  {
                    type: 'InputNumber',
                    name: 'inputNumber',
                    label: '数字输入框',
                  },
                  {
                    type: 'Select',
                    name: 'select',
                    label: '下拉选',
                    props: {
                      options: [
                        { label: '选项1', value: 1 },
                        { label: '选项2', value: 2 },
                      ],
                    },
                  },
                ],
              },
            },
            {
              type: 'FieldSet',
              name: 'advanceInfo',
              label: '高级表单',
              props: {
                column: 1,
                children: [
                  {
                    type: 'Switch',
                    name: 'switch',
                    label: '开关切换',
                    valuePropName: 'checked',
                    props: {
                      checkedChildren: '开启',
                      unCheckedChildren: '关闭',
                    },
                  },
                  {
                    type: 'Rate',
                    name: 'rate',
                    label: '评分组件',
                  },
                  {
                    type: 'Slider',
                    name: 'slider',
                    label: '滑块组件',
                    props: {},
                  },
                ],
              },
            },
            {
              type: 'FieldSet',
              name: 'dateInfo',
              label: '日期相关',
              props: {
                column: 1,
                children: [
                  {
                    type: 'DatePicker',
                    name: 'datePicker',
                    label: '选择日期',
                  },
                  {
                    type: 'RangePicker',
                    name: 'rangePicker',
                    label: '区间选取',
                    nameAlise: ['rangePickerStart', 'rangePickerEnd'],
                  },
                ],
              },
            },
            {
              type: 'FieldSet',
              name: 'timeInfo',
              label: '时间相关',
              props: {
                column: 1,
                children: [
                  {
                    type: 'TimePicker',
                    name: 'timePicker',
                    label: '时间选择',
                  },
                  {
                    type: 'TimeRange',
                    name: 'timeRange',
                    label: '时间区间',
                    nameAlise: ['timeRangeStart', 'timeRangeEnd'],
                  },
                  {
                    type: 'TimeRange',
                    name: 'timeRange',
                    label: '时间区间',
                    nameAlise: ['timeRangeStart', 'timeRangeEnd'],
                  },
                  {
                    type: 'TimeRange',
                    name: 'timeRange',
                    label: '时间区间',
                    nameAlise: ['timeRangeStart', 'timeRangeEnd'],
                  },
                  {
                    type: 'TimeRange',
                    name: 'timeRange',
                    label: '时间区间',
                    nameAlise: ['timeRangeStart', 'timeRangeEnd'],
                  },
                  {
                    type: 'TimeRange',
                    name: 'timeRange',
                    label: '时间区间',
                    nameAlise: ['timeRangeStart', 'timeRangeEnd'],
                  },
                ],
              },
            },
          ],
          onSubmit,
          initialValues: {
            baseInfo: { inputNumber: 2323, select: 2 },
            advanceInfo: { switch: true, rate: 3, slider: 30 },
            dateInfo: {
              datePicker: '2022-02-12',
              rangePickerStart: '2022-09-12',
              rangePickerEnd: '2022-12-12',
            },
            timeInfo: {
              timeRangeStart: '01:23:12',
              timeRangeEnd: '12:23:12',
              timePicker: '09:23:12',
            },
          },
        }}
      />
    </ConfigProvider>
  );
};
```

## API

| 属性名             | 描述              | 类型                | 默认值   |
| ------------------ | ----------------- | ------------------- | -------- |
| formProps          | form 属性         | `CardFormProps`     | `(必选)` |
| className          | 外层容器名        | `string`            | `--`     |
| height             | 容器高度          | `string \| number`  | `--`     |
| getContainer       | 设置挂载 Dom 容器 | `() => HTMLElement` | `--`     |
| defaultActivityKey | 默认选中          | `string`            | `--`     |
| fixHeight          | 设置固定高度      | `number`            | `--`     |
| contentClass       | 容器类名          | `string`            | `--`     |
| fixedTop           | 固定高度          | `number`            | `--`     |

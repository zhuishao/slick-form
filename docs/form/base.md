---
order: 2.2
title: Form 基本用法
toc: menu
---

## 数据渲染

```tsx
/**
 * title: 默认采用垂直布局，使用水平布局设置layout为horizontal
 */
import React from 'react';
import { Form } from 'slick-form';
import schema from './schema/base/schema';
export default () => {
  return <Form {...schema} />;
};
```

## column 等份布局

```tsx
import React from 'react';
import { Form } from 'slick-form';
import schema from './schema/base/schema';
import { Select } from 'antd';
export default () => {
  const [column, setColumn] = React.useState(2);
  return (
    <div>
      <Select
        value={column}
        options={[1, 2, 3].map(i => {
          return { label: i + '列', value: i };
        })}
        onChange={setColumn}
      />
      <Form layout="horizontal" {...schema} column={column} />
    </div>
  );
};
```

## BlockQuote 平级划分区块

```tsx
import React from 'react';
import { Form } from 'slick-form';
import schema from './schema/base/schema1';
export default () => {
  return <Form {...schema} />;
};
```

## FieldSet 父子级划分区块

```tsx
/**
 * background: '#f6f7f9'
 * title: 通过FieldSet组件可以支持区块划分，在每个独立的区块中仍然可以使用灵活布局，多列布局。
 * desc: 吐出的数据格式按照层级会自动划分 规定必须有name属性
 */
import React from 'react';
import { Form, Button } from 'slick-form';
import schema from './schema/base/schema2';
export default () => {
  const [form] = Form.useForm();
  const [readOnly, setReadOnly] = React.useState(false);
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          console.log(form.getValues());
        }}
      >
        控制台查看数据
      </Button>
      &nbsp;&nbsp;
      <Button
        onClick={() => {
          setReadOnly(!readOnly);
        }}
      >
        {readOnly ? '编辑模式' : '只读模式'}
      </Button>
      <br />
      <br />
      <Form
        {...schema}
        form={form}
        readOnly={readOnly}
        initialValues={{
          'fieldset-1': {
            input: '这是默认值',
            inputNumber: 12,
            select: 1,
            checkGroup: [1],
            radioGroup: 1,
            selectMore: [2],
          },
          'fieldset-1-sub': {
            'input-sub': 'sub',
            'inputNumber-sub': 12,
            'date-sub': '2022-05-18',
          },
          'fieldset-2': {
            switch: true,
            rate: 2,
            slider: 36,
            treeSelect: '0-0',
            cascader: ['zhejiang', 'hangzhou'],
          },
          'fieldset-3': {
            datePicker: '2022-01-10',
            rangePickerStart: '2022-02-16',
            rangePickerEnd: '2022-03-01',
            timePicker: '12:03:00',
            timeRangeStart: '2022-01-17',
            timeRangeEnd: '2022-01-19',
          },
          'fieldset-4': {
            input1: '12',
            'fieldset-4-1': {
              input2: '1223',
              'fieldset-4-2': { input3: '2323' },
            },
          },
        }}
      />
    </div>
  );
};
```

## disabled、readOnly、disabledFields

```tsx
/**
 * title: 说明
 * desc: 我们将表单的disabled属性穿透到每一个字段中，同时支持使用disabledFields，指定部分字段禁用，指定了readOnly属性的表单则会渲染只读组件，即我们在每个小组件中控制了2中模式，详情和编辑。具体使用参看高级用法（自定义组件）
 */
import React from 'react';
import { Form } from 'slick-form';
import schema from './schema/base/schema';
import { Switch } from 'antd';

export default () => {
  const [disabled, setDisabled] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(false);
  const [clear, setClear] = React.useState(false);
  const onValuesChange = (value, values) => {
    console.log('onValuesChange ->', value, values);
  };
  return (
    <>
      <Switch
        checkedChildren="disabled"
        unCheckedChildren="disabled"
        onChange={setDisabled}
      />
      &nbsp; &nbsp;
      <Switch
        checkedChildren="readOnly"
        unCheckedChildren="readOnly"
        onChange={setReadOnly}
      />
      &nbsp; &nbsp;
      <Switch
        checkedChildren="clearValues"
        unCheckedChildren="clearValues"
        onChange={setClear}
      />
      <br />
      <br />
      <Form
        disabled={disabled}
        readOnly={readOnly}
        readOnlyClean
        key={clear}
        readOnlyEmptyValueNode={<span style={{ color: '#999' }}>暂无数据</span>}
        initialValues={
          clear
            ? {}
            : {
                input: '这是默认值',
                countInput: 'hello123',
                password: 'qazwsx',
                inputNumber: '50',
                textArea: '浙江省杭州市',
                select: 1,
                startEval: 9,
                startName: 'startTime',
                endName: 'endTime',
                endEval: 80,
                radioGroup: 1,
                checkGroup: [2],
                selectMore: [1, 2],
                switch: true,
                slider: 60,
                rate: 3,
                treeSelect: '0-0-1',
                cascader: ['anhui', 'hefei'],
                datePicker: '2021-05-18',
                startDate1: '2022-03-18',
                endDate1: '2022-04-18',
                startDate: '2022-05-18',
                endDate: '2022-06-18',
                timePicker: '15:08:23',
                startTime: '15:08:23',
                endTime: '23:08:23',
                upload: [
                  {
                    uid: '1',
                    name: 'icon.svg',
                    url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                  },
                ],
              }
        }
        onValuesChange={onValuesChange}
        {...schema}
      />
    </>
  );
};
```

## span/offset 灵活布局

```tsx
import React from 'react';
import { Form } from 'slick-form';
import schema from './schema/base/schema3';
export default () => {
  return <Form {...schema} />;
};
```

## 复选框扩展

```tsx
import React from 'react';
import { Form } from 'slick-form';
export default () => {
  return (
    <Form
      initialValues={{
        default: [1, 2],
        custom: [1, 2, 3, 4],
      }}
      fields={[
        {
          type: 'CheckGroup',
          name: 'default',
          label: '默认标题',
          props: {
            showCheckAll: true,
            options: [
              { label: '选项1', value: 1 },
              { label: '选项2', value: 2 },
              { label: '选项3', value: 3 },
              { label: '选项4', value: 4 },
            ],
          },
        },
        {
          type: 'CheckGroup',
          name: 'custom',
          label: '自定义标题',
          props: {
            showCheckAll: {
              text: '选择全部',
            },
            options: [
              { label: '选项1', value: 1 },
              { label: '选项2', value: 2 },
              { label: '选项3', value: 3 },
              { label: '选项4', value: 4 },
            ],
          },
        },
      ]}
    />
  );
};
```

## Select 、AsyncSelect 组件 开启 autoFilterRepeatValue 自动过滤重复 value 值选项

```tsx
import React from 'react';
import { Form } from 'slick-form';
import schema from './schema/base/schema3';
export default () => {
  const options = [
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 },
    { label: '选项4', value: 4 },
    { label: '选项5', value: 5 },
    { label: '选项6', value: 6 },
    { label: '选项7', value: 7 },
    { label: '选项8', value: 8 },
    { label: '选项9', value: 9 },
    { label: '选项10', value: 10 },
    { label: '选项11', value: 11 },
    { label: '选项12', value: 12 },
    { label: '选项13', value: 13 },
    { label: '选项14', value: 14 },
  ];
  return (
    <Form
      fields={[
        {
          type: 'Select',
          name: 'selectMore',
          label: '不开启自动过过滤、下拉滑动出现bug',
          required: true,
          props: {
            options,
            // autoFilterRepeatValue: true,
          },
        },
        {
          type: 'Select',
          name: 'selectMore1',
          label: '带fieldNames用法',
          required: true,
          props: {
            options: options.map(d => ({
              id: d.value,
              label: d.label,
            })),
            autoFilterRepeatValue: true,
            fieldNames: {
              value: 'id',
              label: 'label',
            },
          },
        },
        {
          type: 'AsyncSelect',
          name: 'selectMore2',
          label: '异步select用法',
          required: true,
          props: {
            options: async () => {
              return await Promise.resolve(options);
            },
            autoFilterRepeatValue: true,
          },
        },
      ]}
    />
  );
};
```

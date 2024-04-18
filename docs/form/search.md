---
order: 10.3
title: Search 查询组件
toc: menu
---

> - 通过传入的 schema 自动渲染、并包含查询、重制、等功能、展开规则，设置了 ismore 属性的 field 会展开显示，一般和 Table 搭配使用

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'slick-form';
import schema from './schema/search/schema1';
export default () => {
  return (
    <Search
      fields={schema}
      onReset={() => {
        console.log('onReset');
      }}
      onSearch={params => {
        console.log('params ->', params);
      }}
    />
  );
};
```

## 使用 labelWidth 设置文本宽度使之对齐

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'slick-form';
import schema from './schema/search/schema1.1';
export default () => {
  return (
    <Search
      fields={schema}
      onReset={() => {
        console.log('onReset');
      }}
      onSearch={params => {
        console.log('params ->', params);
      }}
    />
  );
};
```

## 按钮顺序调换

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'slick-form';
import schema from './schema/search/schema1';
export default () => {
  return (
    <Search
      fields={schema}
      toolReverse
      onReset={() => {
        console.log('onReset');
      }}
      onSearch={params => {
        console.log('params ->', params);
      }}
    />
  );
};
```

## 设置默认值

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'slick-form';
import schema from './schema/search/schema1';
export default () => {
  return (
    <Search
      fields={schema}
      initialValues={{
        level: 1,
        sex: 1,
        date: '2022-02-12',
      }}
      onSearch={params => {
        console.log('onSearch ->', params);
      }}
    />
  );
};
```

## 外部调用查询

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Search, Form } from 'slick-form';
import { Button } from 'antd';
import schema from './schema/search/schema1';
export default () => {
  const [form] = Form.useForm();
  const onSearch = async () => {
    console.log('form ->', form);
    form.search();
  };
  const onReset = async () => {
    form.reset();
  };
  return (
    <>
      <Button onClick={onSearch} style={{ marginBottom: 20, marginRight: 20 }}>
        外部查询
      </Button>
      <Button onClick={onReset} style={{ marginBottom: 20 }}>
        外部重制
      </Button>
      <Search
        fields={schema}
        form={form}
        onReset={() => {
          console.log('onReset');
        }}
        onSearch={params => {
          console.log('params ->', params);
        }}
      />
    </>
  );
};
```

## 控制加载

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'slick-form';
import schema from './schema/search/schema1';
export default () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <Search
      fields={schema}
      loading={loading}
      onSearch={params => {
        setLoading(true);
        console.log('onSearch ->', params);
        setTimeout(setLoading, 1000, false);
      }}
    />
  );
};
```

## 设置立即查询

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'slick-form';
import schema from './schema/search/schema2';
export default () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <Search
      fields={schema}
      loading={loading}
      onSearch={params => {
        setLoading(true);
        console.log('onSearch ->', params);
        setTimeout(setLoading, 1000, false);
      }}
    />
  );
};
```

## 更多查询条件

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'slick-form';
import schema from './schema/search/schema3';
export default () => {
  return (
    <Search
      fields={schema}
      toolReverse
      onSearch={params => {
        console.log('onSearch ->', params);
      }}
    />
  );
};
```

## 默认展开更多查询条件

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'slick-form';
import schema from './schema/search/schema3';
export default () => {
  return (
    <Search
      fields={schema}
      defaultExpand
      toolReverse
      onSearch={params => {
        console.log('onSearch ->', params);
      }}
    />
  );
};
```

## 使用垂直布局

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'slick-form';
import schema from './schema/search/schema3';
export default () => {
  return (
    <Search
      layout="vertical"
      gridStyle={{
        columnGap: 20,
        rowGap: 0,
      }}
      fields={schema}
      onReset={() => {
        console.log('onReset');
      }}
      onSearch={params => {
        console.log('params ->', params);
      }}
    />
  );
};
```

## 使用 2 列布局

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'slick-form';
import schema from './schema/search/schema3';
export default () => {
  return (
    <Search
      column={2}
      fields={schema}
      onReset={() => {
        console.log('onReset');
      }}
      onSearch={params => {
        console.log('params ->', params);
      }}
    />
  );
};
```

## 使用异步的 options

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'slick-form';
import schema from './schema/search/schema3.1';
import { Button } from 'antd';
export default () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <>
      <Search
        loading={loading}
        fields={schema}
        onSearch={params => {
          setLoading(true);
          console.log('onSearch ->', params);
          setTimeout(setLoading, 1000, false);
        }}
      />
    </>
  );
};
```

## 查询条件格式转换

```tsx
/**
 * background: '#f6f7f9'
 */
import * as React from 'react';
import { Search } from 'slick-form';
import schema from './schema/search/schema4';
export default () => {
  return (
    <Search
      fields={schema}
      onSearch={params => {
        console.log('onSearch ->', params);
      }}
    />
  );
};
```

## 扩展的 Api (其余属性参看 Form)

| **属性名**                | **类型**         | **描述**             | **默认** |
| ------------------------- | ---------------- | -------------------- | -------- |
| loading                   | boolean          | 加载中               | false    |
| toolReverse               | boolean          | 查询排序按钮位置互换 | false    |
| onSearch                  | function(params) | 查询的回调           | 无       |
| onReset                   | function()       | 重制的回调           | 无       |
| defaultExpand             | boolean          | 默认展开更多         | false    |
| clearInitialValuesOnReset | boolean          | 清空是否保留默认值   | false    |

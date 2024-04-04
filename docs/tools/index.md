---
order: 4
title: 工具函数
toc: menu
nav:
  order: 4
  title: ✨ 工具函数
---

## 数学运算类

### BigNumber.add 加法

```tsx
import React, { useState } from 'react';
import { tools } from 'slick-form';

export default () => {
  const [total, setTotal] = useState(null);

  const submit = async () => {
    setTotal(tools.BigNumber.add(0.1, 0.2));
  };
  return (
    <>
      <div>0.1 + 0.2 = {0.1 + 0.2}</div>
      <div> 0.1 + 0.2 = {total}</div>
    </>
  );
};
```

### BigNumber.minus 减法

```tsx
import React, { useState } from 'react';
import { tools } from 'slick-form';

export default () => {
  const [total, setTotal] = useState(null);

  const submit = async () => {
    setTotal(tools.BigNumber.minus(1.5, 1.2));
  };
  return (
    <>
      <div>1.5 - 1.2 = {1.5 - 1.2}</div>
      <div> 1.5 - 1.2 = {total}</div>
    </>
  );
};
```

### BigNumber.multiplie 乘法

```tsx
import React, { useState } from 'react';
import { tools } from 'slick-form';

export default () => {
  const [total, setTotal] = useState(null);

  const submit = async () => {
    setTotal(tools.BigNumber.multiplie(19.9, 100));
  };
  return (
    <>
      <div>19.9 * 100 = {19.9 * 100}</div>
      <div> 19.9 * 100 = {total}</div>
    </>
  );
};
```

### BigNumber.divided 除法

```tsx
import React, { useState } from 'react';
import { tools } from 'slick-form';

export default () => {
  const [total, setTotal] = useState(null);

  const submit = async () => {
    console.log(tools, 'tools');
    setTotal(tools.BigNumber.divided(0.3, 0.1));
  };

  return (
    <>
      <div>0.3 / 0.1 = {0.3 / 0.1}</div>
      <div> 0.3 / 0.1 = {total}</div>

      <button style={{ marginTop: 10 }} type="primary" onClick={submit}>
        BigNumber计算
      </button>
    </>
  );
};
```

## 数据处理和格式化类

### isEmpty 判断空

```code
tools.isEmpty('') // true
tools.isEmpty('    ') // true
tools.isEmpty([]) // true
tools.isEmpty({}) // true
tools.isEmpty(null) // true
tools.isEmpty(undefined) // true
```

### NumberFormat 金额千分位

```tsx
import React, { useState } from 'react';
import { Button, tools } from 'slick-form';
import { InputNumber, Space } from 'antd';

export default () => {
  const [value, setValue] = useState(1201201212.32);
  return (
    <Space direction="vertical">
      <InputNumber value={value} onChange={setValue} style={{ width: 200 }} />
      <div>小数点2位: {tools.NumberFormat(value)}</div>
      <div>
        小数点4位:
        {tools.NumberFormat(value, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })}
      </div>
    </Space>
  );
};
```

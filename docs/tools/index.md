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
import { Button, tools } from 'slick-form';

export default () => {
  const [total, setTotal] = useState(null);

  const submit = async () => {
    setTotal(tools.BigNumber.add(0.1, 0.2));
  };
  return (
    <>
      <div>0.1 + 0.2 = {0.1 + 0.2}</div>
      <div> 0.1 + 0.2 = {total}</div>
      <Button style={{ marginTop: 10 }} type="primary" onClick={submit}>
        BigNumber计算
      </Button>
    </>
  );
};
```

### BigNumber.minus 减法

```tsx
import React, { useState } from 'react';
import { Button, tools } from 'slick-form';

export default () => {
  const [total, setTotal] = useState(null);

  const submit = async () => {
    setTotal(tools.BigNumber.minus(1.5, 1.2));
  };
  return (
    <>
      <div>1.5 - 1.2 = {1.5 - 1.2}</div>
      <div> 1.5 - 1.2 = {total}</div>
      <Button style={{ marginTop: 10 }} type="primary" onClick={submit}>
        BigNumber计算
      </Button>
    </>
  );
};
```

### BigNumber.multiplie 乘法

```tsx
import React, { useState } from 'react';
import { Button, tools } from 'slick-form';

export default () => {
  const [total, setTotal] = useState(null);

  const submit = async () => {
    setTotal(tools.BigNumber.multiplie(19.9, 100));
  };
  return (
    <>
      <div>19.9 * 100 = {19.9 * 100}</div>
      <div> 19.9 * 100 = {total}</div>
      <Button style={{ marginTop: 10 }} type="primary" onClick={submit}>
        BigNumber计算
      </Button>
    </>
  );
};
```

### BigNumber.divided 除法

```tsx
import React, { useState } from 'react';
import { Button, tools } from 'slick-form';

export default () => {
  const [total, setTotal] = useState(null);

  const submit = async () => {
    setTotal(tools.BigNumber.divided(0.3, 0.1));
  };

  return (
    <>
      <div>0.3 / 0.1 = {0.3 / 0.1}</div>
      <div> 0.3 / 0.1 = {total}</div>
      <Button style={{ marginTop: 10 }} type="primary" onClick={submit}>
        BigNumber计算
      </Button>
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

### memoize 将函数变成缓存函数

```tsx
import React, { useState } from 'react';
import { Button, tools } from 'slick-form';
import { Input, Space } from 'antd';

function fib(n) {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
}

const memoizedFib = createMemoizedFib();

function superFib(n) {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return memoizedFib(n - 1) + memoizedFib(n - 2);
  }
}

function createMemoizedFib() {
  const memoizedFib = tools.memoize(n => superFib(n, memoizedFib));
  return memoizedFib;
}

export default () => {
  const [value, setValue] = useState(30);
  const [time, setTime] = useState(0);
  const [time2, setTime2] = useState(0);
  const [result, setResult] = useState(0);
  const memoizedFib = tools.memoize(fib);

  const submit = () => {
    console.time('First memoized execution');
    console.log(memoizedFib(value));
    console.timeEnd('First memoized execution');
  };
  const submit0 = () => {
    console.time('First memoized execution');
    console.log(fib(value));
    console.timeEnd('First memoized execution');
  };
  const submit2 = () => {
    console.time('First memoized execution');
    console.log(superFib(value));
    console.timeEnd('First memoized execution');
  };
  return (
    <Space direction="vertical">
      <p>计算斐波那契数列，看显示台的时间</p>
      <Input
        value={value}
        onChange={e => {
          setValue(Number(e.target.value));
        }}
        style={{ width: 400 }}
      />
      <Button onClick={submit0}>计算</Button>
      <Button onClick={submit}>计算优化后(需要点击两次)</Button>
      <Button onClick={submit2}>超级计算优化后</Button>
    </Space>
  );
};
```

## URL 和网络操作类

### getUrlSearchParams 获取 url 参数

```tsx
import React, { useState } from 'react';
import { Button, tools } from 'slick-form';
import { Input, Space } from 'antd';

export default () => {
  const [value, setValue] = useState(
    'https://xxx.xxx/#/abc?id=10001&name=hello&age=20'
  );
  return (
    <Space direction="vertical">
      <Input
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
        style={{ width: 400 }}
      />
      <div>解析: {JSON.stringify(tools.getUrlSearchParams(value))}</div>
    </Space>
  );
};
```

### downloadFile 下载文件

```tsx
import React, { useState } from 'react';
import { Button, tools } from 'slick-form';
import { Space, message } from 'antd';

export default () => {
  const [loading, setLoading] = useState(false);
  const successUrl =
    'https://saas-ai-daily.oss-cn-hangzhou.aliyuncs.com/2023-08-02/%E5%95%86%E4%B8%9A%E5%85%AC%E5%AF%93-1690969506260-by%E6%9C%B1%E6%80%9D%E9%9B%A8.png?Expires=3268892764&OSSAccessKeyId=LTAI5t5fwTBbu4WT1PJCaeCS&Signature=i%2FbJUSfI8VGBynLBPYoPsPIjOVM%3D';
  const failedUrl = `https://saas-ai-daily.oss-cn-hangzhou.aliyuncs.com/2023-08-02/%E5%95%86%E4%B8%9A%E5%85%AC%E5%AF%93-1690969506260-by%E6%9C%B1%E6%80%9D%E9%9B%A8.png`;

  const handleDownload = async url => {
    try {
      await tools.downloadFile(url, 'formlib.png');
    } catch (error) {
      console.log('error>>', error, 'msg>>', error.message);
      message.error(error?.message ?? '下载失败');
    }
  };

  return (
    <Space>
      <Button spin onClick={() => handleDownload(successUrl)} type="primary">
        下载成功
      </Button>
      <Button spin onClick={() => handleDownload(failedUrl)} type="primary">
        下载失败
      </Button>
    </Space>
  );
};
```

### downloadDynamicFile 下载动态文件

> 适合调用后端接口情况，并且后端返回的数据流形式\
> url (String): 文件下载的 API 接口地址。\
> fileName (String): 下载后文件的保存名称。\
> params (Object): 传递给 API 的查询参数，应为键值对对象。\
> customHeaders (Object): 可选；自定义的 HTTP 请求头对象。如果未提供，将使用默认的请求头。\
> 返回值\
> 此函数没有返回值。下载的文件将通过浏览器触发的下载操作直接保存到用户设备。

```

import React from 'react';
import { tools, Button } from 'slick-form';

export default () => {
  return (
    <>
      <Button
        spin
        onClick={() => {
          tools.downloadDynamicFile(
            '/api/CcDuTaskInstance/exportRecord',
            'template.xlsx',
            {
              id: 7,
            },
            {
              ['saas-token']: `eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eJx1kF1OhDAUhbdi-gymhXYYeDLRl0nUF3UBnXLBawolbYnzk9mFe3FJbsMWxBATebrnO_fnlDOppZekOhOsScUSgu4ONHgIiiZEWZDe2MnpTI0Nwizazj_MOjSSjGY8pSzNNleMV1lWCU6mnts4D_92NMEdLThS9aPWCdnjaRf3ybrDPvjatNg_yg5WbHRg_6Dh1fRRM_r7BergENjXx2eooZOol4mb0_GkrpXpgqGMHaaTcWKQzr0bWy9xpPJo-ufjAAsxtl2V9-j8Iq3RsNbonrwZpn9VY9--hNS7n8WXhLx5DDchU2VecpWKXBQp3-xpKkWzTRUtuSjKfV6ohsRVLkbXGGo5xrDOmchluMYKRgsumODhlYdhBtucCcEv317Fjws.JxGLvPkN7gfi7dKqY-Q2itrsih5n_WvdCZSixowfG6I`,
            },
          );
        }}
        type="primary"
      >
        下载
      </Button>
    </>
  );
};
```

### compressAndDownload 批量打包（zip）下载文件

```tsx
import React, { useState } from 'react';
import { Button, tools } from 'slick-form';

export default () => {
  return (
    <Button
      spin
      onClick={() => {
        tools.compressAndDownload([
          {
            url: 'https://wisdomhammer.oss-cn-hangzhou.aliyuncs.com/paifu/20230804/3729ad0c3aeb958e42cee451abf4adac.jpg?Expires=2393982671&OSSAccessKeyId=LTAI5t5fwTBbu4WT1PJCaeCS&Signature=MgVPYu09K2vfbydLQD1ABP6I7%2B8%3D',
            name: '1.png',
          },
          {
            url: 'https://wisdomhammer.oss-cn-hangzhou.aliyuncs.com/paifu/20230804/d0c39abfa5504d8c7475a91e44fa2f61.jpeg?Expires=2393982671&OSSAccessKeyId=LTAI5t5fwTBbu4WT1PJCaeCS&Signature=uzirSAavtF4XaV4njNUxbjjjyBw%3D',
            name: '2.png',
          },
        ]);
      }}
      type="primary"
    >
      批量下载
    </Button>
  );
};
```

## UI 与用户交互类

### copyToClipBoard 复制到剪切板

```tsx
import React, { useState } from 'react';
import { tools } from 'slick-form';
import { Space } from 'antd';

export default () => {
  const text = '这是要复制的文本呀呀呀这是要复制的文本呀呀呀';
  return (
    <Space>
      <span>{text}</span>
      <a
        onClick={async () => {
          await tools.copyToClipBoard(text);
        }}
      >
        复制
      </a>
    </Space>
  );
};
```

### getElementSnapshot 获取元素快照

```tsx
import React from 'react';
import { tools, Button } from 'slick-form';
import { Space, message } from 'antd';

export default () => {
  const { printImg, downloadImg, getDataURL } = tools.getElementSnapshot(
    '.__dumi-default-navbar'
  );
  const [base64, setBase64] = React.useState();
  return (
    <>
      <Space>
        <Button spin type="primary" onClick={printImg}>
          打印元素
        </Button>
        <Button
          spin
          type="primary"
          onClick={async () => {
            await downloadImg('元素预览图');
          }}
        >
          下载图片
        </Button>
        <Button
          spin
          type="primary"
          onClick={async () => {
            setBase64(await getDataURL());
          }}
        >
          获取图片DataURL
        </Button>
      </Space>
      <br />
      <br />
      {base64 && <img src={base64} style={{ width: 1000 }} />}
    </>
  );
};
```

## 其他特定场景类

### distance 计算两地之间的距离

```tsx
import React, { useState } from 'react';
import { Button, tools } from 'slick-form';
import { InputNumber, Space } from 'antd';

export default () => {
  const [lat1, setLat1] = useState(31.24497);
  const [lon1, setLon1] = useState(121.4958);
  const [lat2, setLat2] = useState(31.24541);
  const [lon2, setLon2] = useState(121.5064);
  return (
    <Space direction="vertical">
      <Space>
        <InputNumber
          placeholder="纬度1"
          value={lat1}
          onChange={setLat1}
          style={{ width: 200 }}
        />
        <InputNumber
          placeholder="经度1"
          value={lon1}
          onChange={setLon1}
          style={{ width: 200 }}
        />
      </Space>
      <Space>
        <InputNumber
          placeholder="纬度2"
          value={lat2}
          onChange={setLat2}
          style={{ width: 200 }}
        />
        <InputNumber
          placeholder="经度2"
          value={lon2}
          onChange={setLon2}
          style={{ width: 200 }}
        />
      </Space>

      <div> 默认模式 {tools.distance(lat1, lon1, lat2, lon2)}</div>
      <div> 中文模式 {tools.distance(lat1, lon1, lat2, lon2, 'CHINESE')}</div>
      <div> 英文模式 {tools.distance(lat1, lon1, lat2, lon2, 'ENGLISH')}</div>
    </Space>
  );
};
```

### htmlDecode html 解密

```tsx
import { tools } from 'slick-form';
import React from 'react';

export default () => {
  return (
    <>
      <div>
        待解密字符串：IM&#39;T,由于html自动解密所以看不出来，但是后端传入的是字符串，前端为了防止xss只会显示字符串，而不会使用html内容
      </div>
      <div>解密后字符串：{tools.htmlDecode('IM&#39;T')}</div>
    </>
  );
};
```

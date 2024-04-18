---
order: 10.2
title: CreateSpin 弹出加载
toc: menu
---

## 基本使用

```tsx
import React from 'react';
import { CreateSpin } from 'slick-form';
import { Button } from 'antd';

export default props => {
  const { open, close } = CreateSpin({
    getContainer: () => {
      return document.querySelector('#create-spin-wapper1');
    },
  });
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          open();
        }}
      >
        点击加载
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button
        type="primary"
        onClick={() => {
          close();
        }}
      >
        关闭加载
      </Button>
      <br />
      <br />
      <div
        id="create-spin-wapper1"
        style={{
          width: 300,
          height: 100,
          display: 'flex',
          position: 'relative',
          background: '#f2f2f2',
        }}
      />
    </>
  );
};
```

## 挂载到 body 遮盖弹框

```tsx
import React from 'react';
import { CreateSpin, Button } from 'slick-form';

export default () => {
  const { open, close } = CreateSpin({
    tip: '加载中',
  });
  return (
    <>
      <Button
        modalFormProps={{
          title: '遮盖弹框',
          fields: [
            {
              type: 'Render',
              props: {
                render() {
                  return (
                    <>
                      <Button
                        type="primary"
                        onClick={() => {
                          open();
                          setTimeout(() => {
                            close();
                          }, 2000);
                        }}
                      >
                        点击加载
                      </Button>
                    </>
                  );
                },
              },
            },
          ],
        }}
        type="primary"
      >
        打开 ModalForm
      </Button>
    </>
  );
};
```

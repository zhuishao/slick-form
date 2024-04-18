---
order: 13
title: TabDrawer 选项卡抽屉
toc: menu
---

- 通过传入数据对象去渲染数据

## 案例

```tsx
import * as React from 'react';
import { TabDrawer, Button } from 'slick-form';
import { Space, InputNumber, Input } from 'antd';

export default () => {
  const data = [];
  const tdRef = React.useRef();
  const [hideReload, setHideReload] = React.useState(false);
  const [moreCount, setMoreCount] = React.useState(2);
  const [defaultOpen, setDefaultOpen] = React.useState(false);
  const [urlParamName, setUrlParamName] = React.useState('open');

  return (
    <div>
      <Space>
        <Button onClick={() => tdRef.current.open()} type="primary">
          展开
        </Button>
        <Button onClick={() => tdRef.current.open('1')} type="primary">
          菜单1
        </Button>
        <Button onClick={() => tdRef.current.open('2')} type="primary">
          菜单2
        </Button>
        <Button onClick={() => tdRef.current.open('3')} type="primary">
          菜单3
        </Button>
        <Button onClick={() => setDefaultOpen(!defaultOpen)} type="primary">
          {!defaultOpen ? '默认展开' : '默认收起'}
        </Button>
        <Button
          onClick={() => {
            setHideReload(!hideReload);
          }}
          type="primary"
        >
          {hideReload ? '显示' : '隐藏'}刷新按钮
        </Button>
        <InputNumber
          addonBefore={'显示更多'}
          value={moreCount}
          onChange={v => {
            setMoreCount(v);
          }}
        />
        <Input
          addonBefore={'URl参数'}
          value={urlParamName}
          onChange={e => {
            setUrlParamName(e.target.value);
          }}
        />
      </Space>
      <TabDrawer
        ref={tdRef}
        moreCount={moreCount}
        defaultOpen={defaultOpen}
        hideReload={hideReload}
        urlParamName={urlParamName}
        operations={[
          {
            key: 1,
            text: '复制',
            onClick: () => {
              alert('o');
            },
          },
          { key: 2, text: '分享' },
          { key: 3, text: '刷新页面', onClick: () => location.reload() },
          { key: 4, text: '删除' },
        ]}
        tabs={[
          { key: '1', label: '菜单1', content: '自定义内容' },
          {
            key: '2',
            label: '菜单2',
            content: '自定义内容',
            title: <div>自定义标题</div>,
          },
          {
            key: '3',
            label: '菜单3',
            content: <div style={{ height: 2000 }}>1</div>,
          },
        ]}
      />
    </div>
  );
};
```

## API

| **属性名**   | **类型**    | **描述**     | **必填** | **默认** |
| ------------ | ----------- | ------------ | -------- | -------- |
| tabs         | TabInfo[]   | tab 渲染     | true     | 无       |
| drawerProps  | DrawerProps | 抽屉额外属性 | false    | 无       |
| urlParamName | string      | tab 渲染     | false    | open     |
| hideReload   | boolean     | tab 渲染     | false    | false    |
| moreCount    | number      | tab 渲染     | false    | 3        |
| operations   | Operation[] | tab 渲染     | false    | []       |
| onTabChange  | function    | tab 渲染     | false    | 无       |

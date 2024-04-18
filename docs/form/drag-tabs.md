---
order: 19
title: DragTabs 可拖拽Tab
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React, { useState } from 'react';
import { DragTabs } from 'slick-form';
export default () => {
  const [activeKey, setActiveKey] = useState('');

  const [tabs, setTabs] = useState([
    { label: 'Tab 1', key: '1' },
    { label: 'Tab 2', key: '2' },
    { label: 'Tab 3', key: '3' },
    { label: 'Tab 4', key: '4' },
  ]);
  return (
    <DragTabs
      className="ddss"
      activeKey={activeKey}
      items={tabs}
      onChange={key => {
        console.log('onChange', key);
        setActiveKey(key);
      }}
      onItemsChange={items => {
        console.log('items', items);
        setTabs(items);
      }}
      closeTabs={items => {
        console.log('closedTab', items);
      }}
    />
  );
};
```

## 多标签 Tabs 接入指南

### 在项目中添加 useRouteTabs

```
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams, history } from 'ice';
import { routeTabsConfig } from './config';

function useRouteTabs(cacheKey = '', welcomePage = '/welcome') {
  const cacheData = JSON.parse(
    localStorage.getItem(`multipleTabs${cacheKey}`) || '{}',
  );
  const [activeKey, setActiveKey] = useState(cacheData?.activeKey || '');
  const [tabs, setTabs] = useState<
    {
      label: string;
      key: any;
    }[]
  >(cacheData?.tabs || []);
  // 是否是第一次进入页面
  const [isFirst, setIsFirst] = useState(true);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!routeTabsConfig.find((item) => item.name === location.pathname))
      return;

    // 如果当前路由存在于历史记录中，则不添加新的tab
    if (
      tabs.find((item) => item.key === `${location.pathname}${location.search}`)
    ) {
      setActiveKey(`${location.pathname}${location.search}`);
      return;
    }
    // 如果当前路由不存在于历史记录中，则添加新的tab
    const tab = routeTabsConfig.find((item) => item.name === location.pathname);
    if (tab) {
      setIsFirst(false);
      setTabs((prevTabs) => {
        const searchKey = tab?.searchKey;
        const searchValue = searchKey ? searchParams.get(searchKey) : '';

        const label = `${tab.title}${searchValue ? `-${searchValue}` : ''}`;

        const key = `${location.pathname}${location.search}`;

        return [...prevTabs, { label, key }];
      });
      setActiveKey(`${location.pathname}${location.search}`);
    }
  }, [location]);

  useEffect(() => {
    // 缓存进localStorage
    localStorage.setItem(
      `multipleTabs${cacheKey}`,
      JSON.stringify({ tabs, activeKey }),
    );
    if (!tabs.length && !isFirst) {
      history?.replace(welcomePage);
    }
  }, [tabs, activeKey]);

  return {
    activeKey,
    tabs,
    setActiveKey,
    setTabs,
  };
}

export default useRouteTabs;

```

### 找到合适的地方添加 DragTabs

```

<PageContainer
              header={{
                breadcrumb: {
                  routes:
                    uiState.pageContainerProps.routes ||
                    getCurrentRoutes(userState.userInfo.menuList, pathname),
                  itemRender,
                },
                extra: tabs.length ? (
                  <div className="headerTabsWrapper">
                    <DragTabs
                      items={tabs}
                      activeKey={activeKey}
                      onChange={(key) => history?.replace(key as string)}
                      onItemsChange={setTabs}
                    />
                  </div>
                ) : null,
              }}
              // fixedHeader
              {...uiState.pageContainerProps}
            >
              <Outlet />
  </PageContainer>

```

### 添加 CSS 以适配项目

特别注意：CSS 的添加以项目为准

```
.headerTabsWrapper {
  position: fixed;
  right: 0;
  top: 50px;
  padding-top: 16px;
  background: rgba(255, 255, 255, 0.6);
  z-index: 3;
  left: 64px;
  transition: left 0.2s;
  padding-left: 16px;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  backdrop-filter: blur(8px);
  .ant-tabs-nav {
    margin-bottom: 0;
    .ant-tabs-tab {
      border-bottom-width: 0;
    }
  }
}
.ant-pro-layout-header-fixed-header-action {
  & + main {
    .headerTabsWrapper {
      left: 216px;
    }
  }
```

### 给项目添加欢迎页

所有 tabs 关闭时展示欢迎页

### routeTabsConfig 获取

用于显示 title，下列为所需结构，其中 searchKey 是给详情使用，例如 xxx?id=xxx,那么 searchKey 就是 id

```

// 路由匹配表，包含name和title
export const routeTabsConfig = [
  {
    name: '/information/basic',
    title: '企业基本信息',
  },
  {
    name: '/buyback/enterprise-list',
    title: '政府回购申请',
  },
  {
    name: '/reserveapply/application',
    title: '项目申请',
  },
  {
    name: '/reserveapply/application/detail',
    title: '申请详情',
    searchKey: 'id',
  },
  {
    name: '/transfer-emission-rights/transfer-application',
    title: '转让申请',
  },
  {
    name: '/transfer-emission-rights/transfer-subscription',
    title: '报名申购',
  },
  {
    name: '/transfer-emission-rights/transfer-session',
    title: '转让场次',
  },
  {
    name: '/pledgeloan/enterprise-list',
    title: '质押贷款申请',
  },
  {
    name: '/pledgeloan/enterprise-loanrecord',
    title: '抵质押贷款记录',
  },
  {
    name: '/lease-emission-rights/rental-application',
    title: '企业排污权租赁',
  },
  {
    name: '/lease-emission-rights/rental-application/detail',
    title: '申请详情',
    searchKey: 'id',
  },
  {
    name: '/pledgeloan/enterprise-list/apply',
    title: '编辑申请',
    searchKey: 'id',
  },
];
```

### KeepAlive 支持（可选）

新增，编辑时的标签页可以使用，保存新增编辑状态。

#### 包裹页面组件的高阶组件

该组件放在全局组件下，使用时在页面组件中引入并包裹页面组件

```
import React, { useEffect, useState } from 'react';
import KeepAlive from 'react-activation';

function withKeepAliveHoc(WrappedComponent) {
  return (props) => {
    const [name, setName] = useState(window.location.hash.slice(1));
    useEffect(() => {
      // 定义一个函数来处理hash变化
      const handleHashChange = () => {
        setName(window.location.hash.slice(1));
      };
      // 添加hash变化的监听器
      window.addEventListener('hashchange', handleHashChange);

      // 清理函数，移除监听器
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }, []);
    // 使用 <KeepAlive> 包裹组件并传递配置
    return (
      <KeepAlive name={name} id={name}>
        <WrappedComponent {...props} />
      </KeepAlive>
    );
  };
}

export default withKeepAliveHoc;

```

#### 用 AliveScope 包裹，管理所有 KeepAlive 组件状态

```
import { AliveScope } from 'react-activation'

function App() {
  return (
    <AliveScope>
      <Outlet />
    </AliveScope>
  )
}
```

#### 缓存组件销毁，用于关闭 tab 页时

```
import { useAliveController } from 'react-activation';

const { drop } = useAliveController();

```

可以与 DragTabs 结合，使用 closeTabs

```
 <DragTabs
    items={tabs}
    activeKey={activeKey}
    onChange={(key) => history?.replace(key as string)}
    onItemsChange={setTabs}
    closeTabs={(items) => {
        items.forEach(res => {
          drop(res)
        })
    }}

 />

```

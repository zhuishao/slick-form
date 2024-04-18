---
order: 10.4
title: TableProvider 查询表格
toc: menu
---

> - 本质就是一个 React Context, 将对应的 Search 和 Table 包裹起来，内置了数据查询、分页、条件过滤

## 实现配置化 CRUD

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { TableProvider } from 'slick-form';
import searchSchema from './schema/create-form/search';
import tableSchema from './schema/create-form/table1';

export default () => {
  return (
    <TableProvider cacheTableParams cacheTableParams="bb">
      <TableProvider.Search {...searchSchema} />
      <TableProvider.Table {...tableSchema} />
    </TableProvider>
  );
};
```

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { TableProvider, Search, Table } from 'slick-form';
import { searchSchema, tableSchema } from './schema/table-provider/schema1';
export default () => {
  const onQuery = (params, filters, sorter) => {
    console.log('onQuery ->', params, filters, sorter);
  };
  const onLoad = (list, extOptions) => {
    console.log('onLoad ->', list, extOptions);
  };
  const toolsClick = async tool => {
    if (tool.key === 'export') {
      await new Promise(res => setTimeout(res, 4000)); // loading 4s
    }
    console.log('toolsClick ->', tool);
  };
  const rowOperationsClick = (e, record) => {
    console.log('rowOperationsClick ->', e, record);
  };

  return (
    <TableProvider
      onQuery={onQuery}
      onLoad={onLoad}
      toolsClick={toolsClick}
      rowOperationsClick={rowOperationsClick}
      cacheTableParams
      cacheTableParamsId="aa"
      unMountClearCache={() => {
        return false;
      }}
      // initialSearchValues={{
      //   type: 0,
      // }}
      paginationConfig={{
        onChange: (pagination, filters, sorter) => {
          console.log('onChange ->', pagination, filters, sorter);
        },
      }}
    >
      <Search
        fields={searchSchema}
        clearInitialValuesOnReset
        onReset={() => {
          // 重制表格的过滤属性
          console.log('reset');
        }}
        column={3}
      />
      <Table
        tableId="d3de"
        {...tableSchema}
        infoContent={<div>客户签名总数：1244555；平均分数：58分</div>}
      />
    </TableProvider>
  );
};
```

## ellipsis 扩展、useThousandth 千分位、emptyNode 展示空数据

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { TableProvider, Table } from 'slick-form';
import { tableSchema } from './schema/table-provider/schema4';
export default () => {
  const rowOperationsClick = (e, record) => {
    console.log('rowOperationsClick ->', e, record);
  };
  return (
    <TableProvider rowOperationsClick={rowOperationsClick}>
      <Table {...tableSchema} />
    </TableProvider>
  );
};
```

## 配置 drag 属性，支持可拖动

```tsx
/**
 * background: '#f6f7f9'
 * title: 约定数据源选项包含 index 属性，做为唯一序号
 */
import React from 'react';
import { TableProvider, Table } from 'slick-form';
import { tableSchema } from './schema/table-provider/schema4';

export default () => {
  return (
    <TableProvider>
      <Table
        {...tableSchema}
        drag
        onDragDone={result => {
          console.log('onDragDone: ', result);
        }}
      />
    </TableProvider>
  );
};
```

## 使用 enums 枚举映射 dateFormat 日期

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { TableProvider } from 'slick-form';

const userStateMapping = {
  disabled: '已停用',
  enabled: '启用',
  initial: '初始化',
};
const userTypeList = [
  {
    value: 'admin',
    label: '管理员',
  },
  {
    value: 'ui-design',
    label: '设计师',
  },
  {
    value: 'pm',
    label: '产品经理',
  },
];
export default () => {
  return (
    <TableProvider>
      <TableProvider.Table
        title={'用户列表'}
        columns={[
          {
            title: '用户姓名',
            dataIndex: 'userName',
          },
          {
            title: '提交时间',
            dataIndex: 'date',
            dateFormat: 'YYYY-MM-DD',
            // render(date){
            //   return dayjs(date).format('YYYY-MM-DD')
            // }
          },
          {
            title: '用户性别',
            dataIndex: 'userSex',
            enums: ['男', '女'], // 基本数组类型
            // render(userSex) {
            //   return ['男', '女'][userSex];
            // },
          },
          {
            title: '用户状态',
            dataIndex: 'userState',
            enums: userStateMapping, // 对象映射
            // render(userState) {
            //   return userStateMapping[userState];
            // },
          },
          {
            title: '用户类型',
            dataIndex: 'userType',
            enumsConf: {
              isArrObj: true,
            },
            enums: userTypeList, // List数组对象
            // render(userSex) {
            //   return userTypeList.find((i) => i.value === userSex)?.label;
            // },
          },
        ]}
        request={() => {
          return {
            total: 1,
            list: [
              {
                userName: '测试',
                userSex: 0,
                userState: 'initial',
                userType: 'admin',
                date: new Date().getTime(),
              },
            ],
            isError: false,
          };
        }}
      />
    </TableProvider>
  );
};
```

## 开启 autoNo 分页序号

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { TableProvider } from 'slick-form';
import { tableSchema } from './schema/table-provider/schema5';

export default () => {
  return (
    <TableProvider cacheTableParams>
      <TableProvider.Table tableId="d4d6" autoNo {...tableSchema} />
    </TableProvider>
  );
};
```

## Table 设置 tableId 属性 支持 本地持久化表格过滤状态

```tsx
/**
 * background: '#f6f7f9'
 * desc: 表格字段有变更需要更新tableId，不然会被缓存数据干扰
 */
import React from 'react';
import { TableProvider, Table } from 'slick-form';
import { tableSchema } from './schema/table-provider/schema1';
export default () => {
  const rowOperationsClick = (e, record) => {
    console.log('rowOperationsClick ->', e, record);
  };
  return (
    <TableProvider rowOperationsClick={rowOperationsClick}>
      <Table tableId="user-table-001" {...tableSchema} />
    </TableProvider>
  );
};
```

## column 设置 resize 属性 开启拖拽调整宽度

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { TableProvider, Table } from 'slick-form';
import { tableSchema } from './schema/table-provider/schema5';
export default () => {
  const rowOperationsClick = (e, record) => {
    console.log('rowOperationsClick ->', e, record);
  };
  return (
    <TableProvider rowOperationsClick={rowOperationsClick}>
      <Table {...tableSchema} />
    </TableProvider>
  );
};
```

## filterIds 配置不展示字段

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { TableProvider, Search, Table } from 'slick-form';
import { tableSchema } from './schema/table-provider/schema4';
export default () => {
  const rowOperationsClick = (e, record) => {
    console.log('rowOperationsClick ->', e, record);
  };
  return (
    <TableProvider rowOperationsClick={rowOperationsClick}>
      <Table {...tableSchema} filterIds={['sex', 'city', 'sign']} />
    </TableProvider>
  );
};
```

## 配置关键字查询

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Input } from 'antd';
import { TableProvider, Search, Table } from 'slick-form';
import { tableSchema } from './schema/table-provider/schema1';
export default () => {
  const rowOperationsClick = (e, record) => {
    console.log('rowOperationsClick ->', e, record);
  };
  return (
    <TableProvider rowOperationsClick={rowOperationsClick}>
      <Table
        {...tableSchema}
        tools={[
          {
            type: 'Render',
            render({ onSearch }) {
              return (
                <Input.Search
                  placeholder="请输入关键字查询"
                  onSearch={keywords => {
                    onSearch({
                      keywords: keywords || undefined,
                    });
                  }}
                  enterButton
                  allowClear
                />
              );
            },
          },
          {
            type: 'Refresh',
          },
          {
            type: 'FilterColumns',
          },
        ]}
      />
    </TableProvider>
  );
};
```

## 分页配置

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { TableProvider, Search } from 'slick-form';
import { searchSchema, tableSchema } from './schema/table-provider/schema1';
export default () => {
  const onQuery = (params, filters, sorter) => {
    console.log('onQuery ->', params, filters, sorter);
  };
  const onLoad = list => {
    console.log('onLoad ->', list);
  };
  const toolsClick = tool => {
    console.log('toolsClick ->', tool);
  };
  const rowOperationsClick = (e, record) => {
    console.log('rowOperationsClick ->', e, record);
  };
  return (
    <TableProvider
      onQuery={onQuery}
      onLoad={onLoad}
      toolsClick={toolsClick}
      rowOperationsClick={rowOperationsClick}
      paginationConfig={{
        pageSize: 5,
        size: 'small',
        pageSizeOptions: [5, 10, 20],
        showTotal: (total: number) => `总计 ${total} 条数据`,
      }}
    >
      <Search fields={searchSchema} column={3} />
      <TableProvider.Table {...tableSchema} />
    </TableProvider>
  );
};
```

## 删除之后刷新列表并停留在当前页

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { TableProvider, Search, Form } from 'slick-form';
import { searchSchema, tableSchema } from './schema/table-provider/schema1';
export default () => {
  const onQuery = (params, filters, sorter) => {
    console.log('onQuery ->', params, filters, sorter);
  };
  const onLoad = list => {
    console.log('onLoad ->', list);
  };
  const toolsClick = (tool, { onSearch }) => {
    console.log('toolsClick ->', tool);
    // onSearch() 刷新页面
  };
  const rowOperationsClick = (e, record, index, { onRefresh }) => {
    console.log('rowOperationsClick ->', e, record);
    if (e.key === 'delete') {
      // 停留在当前
      onRefresh();
    }
  };
  return (
    <TableProvider
      onQuery={onQuery}
      onLoad={onLoad}
      toolsClick={toolsClick}
      rowOperationsClick={rowOperationsClick}
    >
      <Search column={3} fields={searchSchema} />
      <TableProvider.Table {...tableSchema} />
    </TableProvider>
  );
};
```

## 扩展已有的查询条件

```tsx
/**
 * background: '#f6f7f9'
 */
import React, { useRef } from 'react';
import { TableProvider, Search, Form } from 'slick-form';
import { searchSchema, tableSchema } from './schema/table-provider/schema1';
import { Radio } from 'antd';
export default () => {
  const [form] = Form.useForm();
  const onQuery = (params, filters, sorter) => {
    console.log('扩展的onQuery ->', params, filters, sorter);
  };
  const RenderTitle = (
    <Radio.Group
      defaultValue="a"
      onChange={e => {
        form.search({
          searchType: e.target.value,
        });
      }}
    >
      <Radio.Button value="a">查询类型1</Radio.Button>
      <Radio.Button value="b">查询类型2</Radio.Button>
    </Radio.Group>
  );
  return (
    <TableProvider
      onQuery={onQuery}
      initialSearchValues={{
        searchType: 'a',
      }}
    >
      <Search column={3} fields={searchSchema} form={form} />
      <TableProvider.Table
        {...tableSchema}
        title={
          <>
            {tableSchema.title}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {RenderTitle}
          </>
        }
      />
    </TableProvider>
  );
};
```

## 使用 keepRowSelectionHistory 支持多选分页

```tsx
/**
 * background: '#f6f7f9'
 * title: 说明
 * desc: 我们在antd的基础上仅内部维护了一份选中状态、支持分页
 */
import React from 'react';
import { Space } from 'antd';
import { TableProvider, Search } from 'slick-form';
import { searchSchema, tableSchema } from './schema/table-provider/schema1';
export default () => {
  return (
    <TableProvider>
      <Search fields={searchSchema} column={3} />
      <TableProvider.Table
        {...tableSchema}
        tools={[
          {
            label: '点击查看控制台',
            key: 'setting',
            onClick: (payload, { selectedRows }) => {
              console.log('selectedRows', selectedRows);
            },
          },
        ]}
        keepRowSelectionHistory // 分页等依然保留所选数据
        rowSelection={{
          // 设置默认值
          defaultSelectedRows: [
            { id: 1, score: 1, logins: 1 },
            { id: 2, score: 2, logins: 2 },
          ],
          onChange: (keys, rows) => {
            console.log('onChange ->', keys, rows);
          },
        }}
        infoContent={(selectedRowKeys, selectedRows, setSelectedRows) => {
          return (
            selectedRowKeys.length > 0 && (
              <Space>
                <a>已选择 {selectedRowKeys.length} 项</a>
                <span>{`分数总计: ${selectedRows.reduce(
                  (pre, item) => pre + item.score,
                  0
                )} 分`}</span>
                <span>{`登录次数总计: ${selectedRows.reduce(
                  (pre, item) => pre + item.logins,
                  0
                )} 次`}</span>
                <a
                  onClick={() => {
                    setSelectedRows([]);
                  }}
                >
                  取消选择
                </a>
              </Space>
            )
          );
        }}
      />
    </TableProvider>
  );
};
```

## 使用虚拟列表

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { TableProvider, Table } from 'slick-form';
import tableSchema from './schema/table-provider/schema6';

export default () => {
  return (
    <TableProvider>
      <Table
        {...tableSchema}
        virtual // 开启虚拟滚动
        infoContent={<div>总条数：1000</div>}
      />
    </TableProvider>
  );
};
```

## 配置 loadMoreData 下拉加载，loadMoreTopData 上拉加载

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { TableProvider, Table } from 'slick-form';
import tableSchema from './schema/table-provider/schema6';

export default () => {
  const delay = seconds => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  };
  const loadMoreData = async data => {
    if (data.length > 60) {
      return false;
    }
    await delay(2);
    return new Array(20).fill({
      id: Math.random().toFixed(4),
      classify: '职业',
      score: 63,
      city: '城市',
      sex: '性别',
      sign: '签名',
      logins: 60,
      username: '用户姓名',
    });
  };

  const loadMoreTopData = async data => {
    if (data.length > 60) {
      return false;
    }
    await delay(2);
    return new Array(5).fill({
      id: Math.random().toFixed(4),
      classify: '职业3',
      score: 63,
      city: '城市',
      sex: '性别',
      sign: '签名',
      logins: 60,
      username: '用户姓名',
    });
  };
  return (
    <TableProvider>
      <Table
        {...tableSchema}
        virtual // 开启虚拟滚动
        loadMoreData={loadMoreData}
        loadMoreTopData={loadMoreTopData}
        request={async params => {
          await new Promise(res => setTimeout(res, 1000));
          return {
            total: 20,
            isError: false,
            list: new Array(20).fill({
              id: Math.random().toFixed(4),
              classify: '职业',
              score: 63,
              city: '城市',
              sex: '性别',
              sign: '签名',
              logins: 60,
              username: '用户姓名',
            }),
          };
        }}
        scroll={{
          y: 400,
        }}
      />
    </TableProvider>
  );
};
```

## 使用 children 表头分组

```tsx
import React from 'react';
import { TableProvider } from 'slick-form';
import tableSchema from './schema/table-provider/schema7';

export default () => {
  return (
    <TableProvider>
      <TableProvider.Table {...tableSchema} />
    </TableProvider>
  );
};
```

## TableProvider API

| **属性名**          | **类型**                          | **描述**                                                                                              | **默认** |
| ------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------- | -------- |
| onQuery             | function(params, filters, sorter) | 开始查询                                                                                              | 无       |
| onLoad              | function(data, extOptions)        | 数据加载完毕                                                                                          | 无       |
| toolsClick          | function(tool)                    | 操作栏点击                                                                                            | 无       |
| rowOperationsClick  | function(e, record)               | 列点击                                                                                                | 无       |
| initialSearchValues | object                            | 表格默认查询条件                                                                                      | 无       |
| paginationConfig    | PaginationConfig                  | 分页的配置                                                                                            | 默认配置 |
| ref                 | MutableRefObject                  | 获取 Table 的引用                                                                                     | 无       |
| cacheTableParams    | boolean                           | 是否缓存 table 的查询和分页参数,注意如果在 Table 上设置了 tableId，还可以缓存 table 的 sort 和 filter | false    |
| cacheTableParamsId  | any                               | 与 cacheTableParams 搭配使用，可支持多表格缓存                                                        | ''       |

## PaginationConfig

| **属性名**      | **类型**                              | **描述**          |
| --------------- | ------------------------------------- | ----------------- |
| pageSize        | number                                | 初始页码大小      |
| pageSizeOptions | array                                 | 数据              |
| showSizeChanger | boolean                               | 是否开启页码设置  |
| showQuickJumper | boolean                               | 是否开启跳转      |
| showTotal       | function(total: number): ReactNode    | 显示总数          |
| onChange        | function(pagination, filters, sorter) | Table 的 onChange |

## Table 扩展属性

| **属性名**       | **类型**                       | **描述**                                                                               | **默认** |
| ---------------- | ------------------------------ | -------------------------------------------------------------------------------------- | -------- |
| request          | async Function< TableResponse> | 请求数据接口                                                                           | []       |
| tools            | object                         | 工具栏                                                                                 | []       |
| toolBarClassName | string                         | 改写工具栏样式                                                                         | ‘’       |
| infoContent      | ReactNode                      | 信息栏                                                                                 | ‘’       |
| infoBarClassName | string                         | 改写信息栏样式                                                                         | ‘’       |
| toolsAlign       | string                         | 工具栏位置 left,right                                                                  | right    |
| rowOperations    | array                          | 列操作                                                                                 | []       |
| pagination       | boolean                        | 是否开启分页                                                                           | true     |
| emptyNode        | ReatcNode                      | 列的空数据展示                                                                         | null     |
| tableId          | string                         | 本地持久化表格过滤状态，如果在 TableProvider 设置 cacheTableParams 可以持久化表格 sort | -        |

## TableResponse

| **属性名** | **类型** | **描述**     |
| ---------- | -------- | ------------ |
| isError    | boolean  | 是否报错     |
| list       | array    | 数据         |
| total      | number   | 总条数       |
| message    | string   | 报错提示     |
| extOptions | object   | 额外的配置项 |

## Columns 扩展属性

| **属性名**    | **类型**  | **描述**                    | **默认** |
| ------------- | --------- | --------------------------- | -------- |
| useThousandth | boolean   | 使用千分位展示,用于金额字段 | false    |
| copyable      | boolean   | 支持复制                    | false    |
| tips          | ReactNode | 提示信息                    | 无       |
| visible       | boolean   | 是否展示                    | true     |
| link          | boolean   | 是否展示链接样式不跳转      | false    |
| jumpLink      | boolean   | 是否展示链接跳转            | false    |
| resize        | boolean   | 是否支持调整宽度            | false    |

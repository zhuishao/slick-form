import { notification, Table } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { deleteEmptyString, isEmpty } from '../../util';
import { Ctx } from '../store';
import { TableProps, TableResponse } from '../types';
import { transformColumns, updateLocalFilter } from '../utils';
import {
  DraggableBodyRow,
  DraggableContainer,
  DragHandle,
} from './drag-columns';
import './index.less';
import InfoBar from './infoBar';
import getRowOperations from './row-operations';
import ToolBar from './toolbar';
import VirtualTable from './virtual-table';

export default ({
  title = '',
  rowKey = 'id', // String, table的唯一标识，默认'id'
  columns = [], // Array, 表头数组
  tools = [], // 顶部工具栏配置
  rowOperations, // 行操作选项
  filterIds = [], // 默认过滤字段
  reload = false,
  pagination = true,
  size,
  emptyNode = '-',
  rowSelection,
  tableId,
  drag = false,
  onDragDone = () => {},
  dragColumn = {},
  autoNo = false,
  keepRowSelectionHistory = false,
  style = {},
  virtual = false,
  loadMoreData,
  loadMoreTopData,
  ...restProp
}: TableProps) => {
  const ctx: any = useContext(Ctx);
  // 必须在Provider下面
  if (isEmpty(ctx)) {
    // eslint-disable-next-line no-throw-literal
    throw '请在TableProvider包裹下使用Table';
  }
  const [_columns, setColumns] = useState([]);
  const [_filterIds, setFilterIds] = useState(filterIds);
  const cacheId = tableId || ctx?.cacheTableParamsId || '';
  // 同步缓存的数据
  const syncCacehColumsConfig = localData => {
    let result = JSON.parse(localData);
    // 过期重新覆盖
    const isExpired = cacheIsExpired(result);
    if (isExpired) {
      result = JSON.parse(localStorage.getItem(`table_${cacheId}`));
    }
    // 排序
    setColumns(
      result.columnIds
        ?.map(columnId => {
          const column = columns.find((item: any) => {
            const key = item.dataIndex || item.key;
            return key === columnId;
          });
          const width = result.widthMap?.[columnId];
          if (width && column) {
            column.width = width;
          }
          return column;
        })
        .filter(Boolean)
    );
    // 过滤;
    setFilterIds(result.filterIds);
    // 设置页码;
    ctx.params.pageSize = result.pageSize || ctx.params.pageSize;
    ctx.setParams({
      ...ctx.params,
    });
  };
  useEffect(() => {
    // 过滤掉不展示的
    setColumns(columns.filter(i => i.visible !== false));
    const localData = localStorage.getItem(`table_${cacheId}`);
    if (cacheId && localData) {
      // 同步缓存
      syncCacehColumsConfig(localData);
    }
  }, [columns]);
  const cacheIsExpired = (cacheData = {}): boolean => {
    const localIds = localStorage.getItem(`table_${cacheId}_backup`);
    const ids: any[] = JSON.parse(localIds) || [];
    const dataIndexList = columns.map(i => i.dataIndex);
    for (let i = 0; i < dataIndexList.length; i++) {
      const dataIndex = dataIndexList[i];
      if (!isEmpty(dataIndex) && !ids.includes(dataIndex)) {
        localStorage.setItem(
          `table_${cacheId}`,
          JSON.stringify({ ...cacheData, columnIds: dataIndexList })
        );
        localStorage.setItem(
          `table_${cacheId}_backup`,
          JSON.stringify(dataIndexList)
        );
        return true;
      }
    }
    return false;
  };

  /** 记录下过滤器和排序的参数 */
  const filterRef = useRef(undefined);
  const sorterRef = useRef(undefined);

  const query = async (
    filters = filterRef.current,
    sorter = sorterRef.current
  ) => {
    filterRef.current = filters;
    sorterRef.current = sorter;
    if (ctx.cacheTableParams) {
      window[`CurrentTableSearchValues${ctx?.cacheTableParamsId || ''}`] =
        ctx.params;
      // 只有在有cacheId的时候才缓存sort
      if (sorter && cacheId) {
        if (Object.prototype.toString.call(sorter) === '[object Object]') {
          window[`CurrentTableSorterValues${cacheId}`] = Object.assign(
            window[`CurrentTableSorterValues${cacheId}`] || {},
            {
              [cacheId]: sorter,
            }
          );
        } else {
          window[`CurrentTableSorterValues${cacheId}`] = { [cacheId]: sorter };
        }
      }
    }

    if (
      ctx.cacheTableParams &&
      window[`CurrentTableSorterValues${cacheId}`] &&
      cacheId &&
      window[`CurrentTableSorterValues${cacheId}`]?.[cacheId]
    ) {
      sorter = window[`CurrentTableSorterValues${cacheId}`][cacheId];
    }
    ctx.onQuery(ctx.params, filters, sorter);
    ctx.setLoading(true);
    try {
      // 调用外部提供的查询数据方法
      const {
        isError,
        list,
        total,
        message,
        extOptions = {},
      }: TableResponse = await restProp.request(
        deleteEmptyString(ctx.params),
        filters,
        sorter
      );
      ctx.onLoad(list, extOptions); // 吐出返回结果, 额外的配置项
      // 如果 list 不是数组，按照报错处理（否则antd会直接页面白屏）
      if (isError || !Array.isArray(list)) {
        ctx.pagination.total = 0; // total重制为0
        ctx.setDataSource([]); // 清空数据源
        if (message) {
          notification.error({
            message: '提示',
            description: message,
          });
        }
      } else {
        ctx.pagination.total = total; // 设置总条数
        ctx.pagination.current = ctx.params.pageNum; // 设置当前页码
        // 查询成功之后设置
        ctx.pagination.pageSize = ctx.params.pageSize;
        ctx.pagination.pageNum = ctx.params.pageNum;
        ctx.setDataSource(list); // 设置数据源
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Request Error ->', error);
    } finally {
      ctx.setLoading(false); // 查询完毕
    }
  };
  useEffect(() => {
    query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.refresh, reload]);
  /** rowOperations */
  const rowOperationsColumns = getRowOperations({
    onRefresh: query,
    onSearch: ctx.onSearch,
    rowOperations,
    rowOperationsClick: ctx.rowOperationsClick,
  });
  const lastColumns = rowOperationsColumns
    ? [..._columns, rowOperationsColumns]
    : _columns;
  // 拖拽调整表格的宽度
  const onCellWidthChange = (column: any, width: number) => {
    const c = _columns.find(i => i.dataIndex === column.dataIndex);
    if (c) {
      c.width = width;
      setColumns([..._columns]);
      updateLocalFilter({ cacheId, columns });
    }
  };
  /**
   * 支持多选，内部维护一份数据状态
   */
  const [innerSelectedRow, setInnerSelectedRow] = useState(
    rowSelection?.defaultSelectedRows || []
  );
  const [innerSelectedRowKeys, setInnerSelectedRowKeys] = useState([]);
  /** 同步 innerSelectedRowKeys */
  useEffect(() => {
    const _innerSelectedRowKeys = innerSelectedRow.map(
      row => row[rowKey as string]
    );
    setInnerSelectedRowKeys(_innerSelectedRowKeys);
    rowSelection?.onChange?.(_innerSelectedRowKeys, innerSelectedRow, {
      type: 'all',
    });
  }, [innerSelectedRow]);
  /** 真正传递给Table的 */
  let innerRowSelection = rowSelection;
  if (
    keepRowSelectionHistory &&
    typeof rowSelection === 'object' &&
    rowSelection.type !== 'radio' // 单选不处理
  ) {
    innerRowSelection = {
      ...rowSelection,
      onChange: () => {}, // 已在上面通知
      selectedRowKeys: innerSelectedRowKeys,
      onSelectAll: (selected, currentSelectedRows) => {
        currentSelectedRows = currentSelectedRows.filter(
          item => item !== undefined
        );
        let _selectedRows = [...innerSelectedRow];
        if (selected) {
          // 合并之前选择的
          currentSelectedRows.forEach(item => {
            if (!_selectedRows.some((_item: any) => _item.id === item.id)) {
              _selectedRows.push(item);
            }
          });
        } else {
          _selectedRows = _selectedRows.filter((i: any) => {
            return currentSelectedRows.some(item => item.id === i.id);
          });
        }
        setInnerSelectedRow([..._selectedRows]);
      },
      onSelect: (record, selected) => {
        let currentSelectedRows = [...innerSelectedRow];
        if (selected) {
          // 添加这个ID
          currentSelectedRows.push(record);
        } else {
          // 删除这个
          currentSelectedRows = currentSelectedRows.filter(
            i => i[rowKey as string] !== record[rowKey as string]
          );
        }
        setInnerSelectedRow(currentSelectedRows); // 更新
      },
    };
  }
  let newColumns = lastColumns.filter(
    (item: any) => !_filterIds?.includes(item.dataIndex)
  );
  // 自增序号
  if (autoNo) {
    newColumns = [
      {
        title: '序号',
        columnType: 'columnNo',
      },
      ...newColumns,
    ];
  }
  newColumns = transformColumns({
    columns: newColumns,
    emptyNode,
    onCellWidthChange,
    pagination: ctx.pagination,
    sorterValues:
      ctx.cacheTableParams && cacheId
        ? window[`CurrentTableSorterValues${cacheId}`]?.[cacheId]
        : undefined,
  });

  // 开启 drag
  if (drag) {
    newColumns = [
      {
        title: '排序',
        dataIndex: '__sort__',
        width: 60,
        fixed: 'left',
        className: 'drag-visible',
        render: () => <DragHandle />,
        ...dragColumn,
      },
      ...newColumns,
    ];
  }
  // 提示的信息
  const InfoBarNode =
    typeof restProp.infoContent === 'function'
      ? restProp.infoContent(
          innerSelectedRowKeys,
          innerSelectedRow,
          setInnerSelectedRow
        )
      : restProp.infoContent;
  const ToolBarNode = (
    <React.Fragment>
      <ToolBar
        title={title}
        size={size}
        payload={ctx.params}
        setColumns={setColumns}
        selectedRows={innerSelectedRow}
        columns={_columns}
        tools={tools.filter(i => {
          try {
            return typeof i.visible === 'function'
              ? i.visible() !== false
              : i.visible !== false;
          } catch (error) {
            console.log(error);
            return false;
          }
        })} // 提前过滤
        toolsAlign={restProp.toolsAlign}
        onRefresh={query}
        onSearch={ctx.onSearch}
        filterIds={_filterIds}
        toolsClick={ctx.toolsClick}
        tableId={cacheId}
        onFilter={setFilterIds}
        toolBarClassName={restProp.toolBarClassName}
      />
      {InfoBarNode && (
        <InfoBar
          infoContent={InfoBarNode}
          infoBarClassName={restProp.infoBarClassName}
        />
      )}
    </React.Fragment>
  );
  /** 开启虚拟列表 */
  return virtual ? (
    <div className="shine-table-form" style={style}>
      <VirtualTable
        rowKey={rowKey}
        dataSource={ctx.dataSource}
        columns={newColumns}
        loading={ctx.loading}
        pagination={false}
        scroll={restProp.scroll || { y: 500 }}
        ToolBar={ToolBarNode}
        loadMoreData={loadMoreData}
        loadMoreTopData={loadMoreTopData}
      />
    </div>
  ) : (
    <div className="shine-table-form" style={style}>
      {ToolBarNode}
      <Table
        rowKey={rowKey}
        dataSource={ctx.dataSource}
        columns={newColumns}
        loading={ctx.loading}
        onChange={(_pagination, filters: any, sorter: any) => {
          if (typeof ctx.pagination.onChange === 'function') {
            ctx.pagination.onChange(_pagination, filters, sorter);
          }
          ctx.params.pageSize = _pagination.pageSize;
          ctx.params.pageNum = _pagination.current;
          /** 过滤和排序的参数 */
          query(filters, sorter);
          updateLocalFilter({
            cacheId,
            columns,
            pageSize: _pagination.pageSize,
          });
        }}
        pagination={
          pagination && {
            ...ctx.pagination,
            pageSize: ctx.params.pageSize,
            pageNum: ctx.params.pageNum,
            onChange: () => {}, // 取消这里的onChange，使用Table的onChange
          }
        }
        rowSelection={innerRowSelection}
        components={
          drag
            ? {
                body: {
                  wrapper: props => {
                    return (
                      <DraggableContainer
                        {...props}
                        dataSource={ctx.dataSource}
                        setDataSource={ctx.setDataSource}
                        onDragDone={onDragDone}
                      />
                    );
                  },
                  row: props => {
                    return (
                      <DraggableBodyRow
                        {...props}
                        dataSource={ctx.dataSource}
                      />
                    );
                  },
                },
              }
            : undefined
        }
        {...restProp}
      />
    </div>
  );
};

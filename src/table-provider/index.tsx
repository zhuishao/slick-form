/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import Search from './search';
import { Ctx } from './store';
import Table from './table';
import { PaginationConfig, TableProviderProps } from './types';

// 分页的默认配置
const defaultPaginationConfig: PaginationConfig = {
  pageNum: 1,
  pageSize: 10,
  pageSizeOptions: [10, 20, 50, 100],
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
};
/** 注入context */
const useGetContext = ({
  onQuery = (params: any) => {}, // 准备查询
  onLoad = (list: any, extOptions: object) => {}, // 加载完毕回调
  toolsClick = (tool: any) => {}, // 表头按钮点击回调
  rowOperationsClick = (menu: any, record, index) => {}, // 表格列点击事件回调
  initialSearchValues = {}, // 查询框默认值
  paginationConfig = {},
  cacheTableParams = false,
  cacheTableParamsId = '',
}) => {
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination]: any = useState({
    ...defaultPaginationConfig,
    ...paginationConfig, // 优先采用传入的配置
  });
  const [params, setParams] = useState({
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    ...initialSearchValues,
    // 缓存的查询条件优先级高
    ...(cacheTableParams
      ? window[`CurrentTableSearchValues${cacheTableParamsId || ''}`]
      : {}),
  });
  const onReset = clearInitialValuesOnReset => {
    setParams({
      ...(clearInitialValuesOnReset ? {} : initialSearchValues),
      pageSize: pagination.pageSize,
      pageNum: 1, // 页码重制为第一页
    });
    setRefresh(Math.random()); // table Refresh
  };
  const onSearch = (values: any) => {
    params.pageNum = 1; // 回到第一页
    setParams({
      ...params,
      ...values,
    }); // updateParams
    setRefresh(Math.random()); // table Refresh
  };
  return {
    refresh,
    loading,
    params,
    initialSearchValues,
    pagination,
    setPagination,
    dataSource,
    setRefresh,
    setLoading,
    setParams,
    onSearch,
    onReset,
    onQuery,
    onLoad,
    toolsClick,
    rowOperationsClick,
    setDataSource,
    cacheTableParams,
    cacheTableParamsId,
  };
};

const Container = (props: TableProviderProps, ref: any) => {
  const context = useGetContext(props);
  useImperativeHandle(ref, () => context);
  useEffect(() => {
    return () => {
      if (props.unMountClearCache?.()) {
        delete window[
          `CurrentTableSearchValues${props?.cacheTableParamsId || ''}`
        ];
        delete window[
          `CurrentTableSorterValues${props?.cacheTableParamsId || ''}`
        ];
      }
    };
  }, []);
  return (
    <ConfigProvider locale={zhCN}>
      <Ctx.Provider {...props} value={context} />
    </ConfigProvider>
  );
};

const TableProvider: any = forwardRef(Container);
TableProvider.Search = memo(Search); // 避免不必要的渲染
TableProvider.Table = Table;
export default TableProvider;

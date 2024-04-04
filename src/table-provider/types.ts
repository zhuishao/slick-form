import { TableProps as AntdTableProps, TooltipProps } from 'antd';
import { ColumnType, TableRowSelection } from 'antd/es/table/interface';
import React, { CSSProperties, ReactNode } from 'react';
import { CreateDrawerFormProps, CreateModalFormProps } from '../create-form';
import { FormLibProps } from '../form/type.form';
import { FormLibInstance } from '../form/type.instance';

interface AnyObj {
  [key: string]: any;
}

export interface PaginationConfig {
  pageNum: number;
  pageSize: number;
  pageSizeOptions?: any;
  total?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number) => string | React.ReactNode;
  onChange?: (pagination: any, filters: any, sorter: any) => void;
}
export interface TableProviderProps {
  ref?: any; // 获取实例
  /** 准备查询3个参数分别为、查询条件、过滤条件、排序条件 */
  onQuery?: (params?, filter?, sorter?) => void;
  /** 加载完毕回调 */
  onLoad?: (list: any, extOptions: object) => void;
  /** 表头按钮点击回调 */
  toolsClick?: (tool: any, api?: { onSearch: (params?) => {} }) => void;
  /** 表格列点击事件回调 */
  rowOperationsClick?: (
    menu: any,
    record: any,
    index: number,
    api?: {
      onSearch: (params?) => {};
      onRefresh: (params?) => {};
      selectedRows: [];
    }
  ) => void;
  /** 查询框默认值 */
  initialSearchValues?: object;
  /** 分页配置 */
  paginationConfig?: PaginationConfig;
  /** 是否缓存table的查询和分页参数 */
  cacheTableParams?: boolean;
  /** 缓存id */
  cacheTableParamsId?: any;
  /** 组件卸载的钩子 */
  unMountClearCache?: () => boolean;
}
export interface SearchProps extends Omit<FormLibProps, 'onReset'> {
  form?: FormLibInstance;
  hidden?: boolean; // 是否需要展示
  onSearch?: Function;
  loading?: boolean;
  toolReverse?: boolean;
  defaultExpand?: boolean;
  onReset?: (clearInitialValuesOnReset?) => void;
  clearInitialValuesOnReset?: boolean;
}
export interface TableResponse {
  isError: boolean;
  list: any[];
  total: number;
  /** 错误提示信息 */
  message?: string;
  /** 额外的配置，会在onLoad第二个参数中获取 */
  extOptions?: object;
}
export interface ToolsProps {
  label?: string | React.ReactNode;
  key?: string;
  type?: string;
  btnType?: string;
  disabled?: boolean;
  auth?: any;
  ghost?: boolean;
  spin?: boolean;
  visible?: boolean | ((record?: any) => boolean);
  confirm?: object;
  onClick?: (
    params?,
    api?: {
      onSearch: (params?) => {};
      onRefresh: (params?) => {};
      selectedRows: [];
    }
  ) => void;
  menu?: any;
  icon?: ReactNode;
  tooltip?: TooltipProps | ReactNode;
  modalFormProps?:
    | CreateModalFormProps
    | (({
        onSearch,
        onRefresh,
        selectedRows,
      }) => CreateModalFormProps | Promise<CreateModalFormProps>);
  drawerFormProps?:
    | CreateDrawerFormProps
    | (({
        onSearch,
        onRefresh,
        selectedRows,
      }) => CreateDrawerFormProps | Promise<CreateDrawerFormProps>);
}
export interface RowOperationsTypes extends ColumnType<any> {
  showMore?: number;
  menus: (record) => ToolsProps[];
  /** 是否展示 */
  visible?: boolean;
  dataIndex?: string;
}
export interface TableColumnType<T = any> extends ColumnType<T> {
  /** 千分位展示金额 */
  useThousandth?:
    | {
        minimumFractionDigits: number;
        maximumFractionDigits: number;
      }
    | boolean;
  /** 支持复制 */
  copyable?: boolean;
  /** 提示 */
  tip?: React.ReactNode;
  /** 是否展示 */
  visible?: boolean;
  /** 链接标识 */
  link?: boolean;
  /** 链接标识 带跳转 */
  jumpLink?: boolean;
  /** 是否可拖拽改宽度 */
  resize?: boolean;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 枚举：支持对象 ｜ 数组  */
  enums?: any[] | AnyObj;
  /** 枚举 配置 */
  enumsConf?: {
    /** 是否是数组对象 */
    isArrObj?: boolean;
    /** 标识字段 */
    key: string;
    /** 展示字段 */
    label: string;
  };
  /** 字段类型 */
  columnType?: 'columnNo';
  /** 日期格式化 */
  dateFormat?: string;
  /** tooltipProps */
  tooltipProps?: TooltipProps;
}

export interface TableRowSelectionProps extends TableRowSelection<any> {
  defaultSelectedRows?: [];
}
export interface TableProps<T = any>
  extends Omit<
    AntdTableProps<T>,
    'pagination' | 'title' | 'columns' | 'rowSelection'
  > {
  title?: ReactNode;
  columns: TableColumnType<T>[];
  /** 处理请求逻辑3个参数分别为、查询条件、过滤条件、排序条件 */
  request: (params?, filter?, sorter?) => Promise<TableResponse>;
  tools?: ToolsProps[];
  rowOperations?: RowOperationsTypes;
  filterIds?: string[];
  reload?: boolean;
  toolsAlign?: 'left' | 'right';
  pagination?: true | false;
  emptyNode?: React.ReactNode;
  toolBarClassName?: string;
  infoContent?:
    | React.ReactNode
    | ((selectedRowKeys, selectedRows, onCleanSelected) => ReactNode);
  infoBarClassName?: string;
  tableId?: string;
  /** 是否开启拖拽 */
  drag?: boolean;
  /** 列信息 */
  dragColumn?: TableColumnType<T>;
  /** 拖拽结束的钩子 */
  onDragDone?: (data) => any;
  /** 开启自增序号 */
  autoNo?: boolean;
  /** 开启分页多选 */
  keepRowSelectionHistory?: boolean;
  rowSelection?: TableRowSelectionProps;
  /** 主容器样式 */
  style?: CSSProperties;
  /** 开启虚拟列表 */
  virtual?: boolean;
  /** 加载数据 */
  loadMoreData?: Function;
  /** 加载顶部数据 */
  loadMoreTopData?: Function;
}

export interface UpdateLocalFilterParams {
  cacheId: string;
  columns: any[];
  filterIds?: any[];
  pageSize?: number;
}

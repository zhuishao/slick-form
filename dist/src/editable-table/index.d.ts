import React from 'react';
import './index.less';
interface EditTableProps {
    rowKey: string;
    /** 列信息 */
    columns: any;
    /** 数据源 */
    value?: any;
    /** 数据即将改变 */
    onBeforeChange?: (value: any, values: any) => Promise<any>;
    /** 数据即将删除 */
    onBeforeDelete?: (value: any) => Promise<any>;
    /** 数据改变 */
    onChange?: (value: any) => void;
    /** 是否只读 */
    readOnly?: boolean;
    /** 是否支持排序 */
    sortable?: boolean;
    /** 底部按钮配置 */
    creatorButtonProps: any;
    /** 限制最大条数 */
    maxLength?: number;
    /** 添加按钮的位置 */
    position?: 'top' | 'bottom';
    /** 添加的默认值 */
    defaultAddValue?: any;
    actionRef?: any;
    name?: string;
    optionCellProps?: any;
}
declare const _default: ({ columns, value, onBeforeChange, onBeforeDelete, onChange, readOnly, sortable, creatorButtonProps, maxLength, position, actionRef, defaultAddValue, name, optionCellProps, ...rest }: EditTableProps) => React.JSX.Element;
export default _default;

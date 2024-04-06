import { DrawerProps } from 'antd';
import { Gutter } from 'antd/lib/grid/row';
import React, { ReactNode } from 'react';
import './index.less';
interface AnyObj {
    [key: string]: any;
}
interface Option {
    value: any;
    label: string;
}
export declare type DescType = 'text' | 'date' | 'enum' | 'amount' | 'media' | 'file';
interface DescOptions {
    /** 枚举映射 */
    enums?: Option[] | AnyObj;
    /** dayjs格式化 */
    dateFormat?: string;
    /** 金额-千分位 */
    useGrouping?: boolean;
    /** 金额-小数点 */
    toFixed?: number;
}
/** 字段渲染结构 */
interface DescModel<T> {
    /** 渲染类型 */
    type?: DescType;
    /** label */
    label?: ReactNode;
    /** 渲染内容 */
    render?: (value: any, data: T, index: number) => JSX.Element;
    /** key */
    key: string;
    /** 占据份额 */
    span?: number;
    copy?: boolean;
    options: DescOptions;
}
export interface DescListProps<T = AnyObj> {
    /** 数据 */
    data: T;
    /** 更新数据源 */
    update?: () => Promise<T>;
    /** 渲染模型 */
    renderModel: DescModel<T>[];
    /** 显隐控制  PS: 只支持 type: Drawer */
    visible?: boolean;
    /** 每行展示数据数量 */
    column?: number;
    /** 关闭 */
    onClose?: () => void;
    /** 展示类型 */
    type?: 'Card' | 'Drawer';
    /** Drawer属性 */
    drawerProps?: DrawerProps;
    /** 间距 */
    gutter?: Gutter | [Gutter, Gutter];
    /** 空白占位符 */
    placeholder?: ReactNode;
    /** label宽度 24栅格 */
    labelSpan?: number;
    /** 内容宽度 24栅格 */
    containerSpan?: number;
    /** 排序方式 */
    layout?: 'horizontal' | 'vertical1';
}
declare const DescList: <T>({ onClose, visible, data, type, gutter, column, drawerProps, labelSpan, containerSpan, renderModel, placeholder, update, }: DescListProps<T>) => React.JSX.Element;
export default DescList;

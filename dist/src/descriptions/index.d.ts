import React from 'react';
import './index.less';
export interface itemType {
    label: string;
    value: React.ReactNode;
    span?: number;
    tooltip?: string;
    visible?: boolean;
}
export interface DescriptionsProps {
    /**
     * 父组件传过来的className
     */
    className?: string;
    /**
     * 父组件传过来的style
     */
    style?: React.CSSProperties;
    children?: React.ReactNode;
    emptyValue?: string;
    /**
     * 描述列表的标题，显示在最顶部
     */
    title?: React.ReactNode;
    /**
     * 描述列表的操作区域，显示在右上方
     */
    extra?: React.ReactNode;
    /**
     * 分成几列
     */
    column?: number;
    /**
     * 2列之间的间距，默认为24
     */
    gutter?: number;
    /**
     * 描述布局
     */
    layout?: 'horizontal' | 'vertical';
    /**
     * 居左对齐还是冒号对齐，labelAlign需结合labelWidth使用
     */
    labelAlign?: 'left' | 'right';
    /**
     * label的宽度
     */
    labelWidth?: number;
    /**
     * 自定义标签样式
     */
    labelStyle?: React.CSSProperties;
    /**
     * 自定义内容样式
     */
    contentStyle?: React.CSSProperties;
    dataSource?: itemType[];
}
declare function Descriptions({ title, extra, column, gutter, layout, labelAlign, labelWidth, children, emptyValue, className, style, labelStyle, contentStyle, dataSource, }: DescriptionsProps): React.JSX.Element;
declare namespace Descriptions {
    var Item: React.FC<import("./item").DescriptionsItemProps>;
}
export default Descriptions;

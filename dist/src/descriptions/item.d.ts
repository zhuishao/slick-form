import type * as React from 'react';
export interface DescriptionsItemProps {
    /**
     * 自定义className
     */
    className?: string;
    /**
     * 自定义样式
     */
    style?: React.CSSProperties;
    /**
     * 内容的描述
     */
    label?: React.ReactNode;
    /**
     * 自定义标签样式
     */
    labelStyle?: React.CSSProperties;
    /**
     * 自定义内容样式
     */
    contentStyle?: React.CSSProperties;
    /**
     * 自定义内容样式
     */
    children: React.ReactNode;
    /**
     * 包含列的数量
     */
    span?: number;
    /**
     * 自定义占几列gutter布局，共24列, 此时span无效
     */
    diySpan?: number;
}
declare const DescriptionsItem: React.FC<DescriptionsItemProps>;
export default DescriptionsItem;

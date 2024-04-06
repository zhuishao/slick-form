import React, { ReactNode } from 'react';
import './index.less';
export interface AnchorCardProps {
    /** 数据源 */
    tabs: {
        /** 文案 */
        tab: ReactNode;
        /** 唯一标识 */
        key: string;
        /** 内容 */
        content?: ReactNode;
    }[];
    /** 设置挂载Dom容器 */
    getContainer?: () => HTMLElement;
    /** 默认选中 */
    defaultActivityKey?: string;
    /** 设置固定高度 */
    fixHeight?: number;
    /** 容器类名 */
    contentClass?: string;
    /** 固定高度 */
    fixedTop?: number;
    children?: ReactNode;
}
declare const _default: ({ tabs, getContainer, defaultActivityKey, fixHeight, fixedTop, contentClass, children, }: AnchorCardProps) => React.JSX.Element;
export default _default;

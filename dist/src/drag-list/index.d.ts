import React, { ReactNode } from 'react';
import './index.less';
interface DragListProps {
    /**
     * 列表数据源
     * @default []
     */
    list: {
        /** 唯一标识 */
        key: string | number;
        /** 显示文案 */
        label: ReactNode;
    }[];
    /** 列顺序改变事件 */
    onChange?: Function;
    /** 点击事件事件 */
    onClick?: Function;
    /** 默认选中 */
    defaultActiveKey?: string | number;
    /**
     * 是否展示图标
     * @default true
     */
    showIcon?: boolean;
}
declare const _default: ({ list, onChange, onClick, defaultActiveKey, showIcon, }: DragListProps) => React.JSX.Element;
export default _default;

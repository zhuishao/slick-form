import { DrawerProps } from 'antd';
import React, { ReactNode } from 'react';
import './index.less';
export interface TDRef {
    /** 当前选中 */
    currTabKey: string;
    /** 打开: 需要直接选中哪个tab */
    open: (tabKey?: string) => void;
    /** 关闭 */
    close: () => void;
}
export interface TabInfo {
    key: string;
    /** 图标 */
    icon?: ReactNode;
    /** 禁用 */
    disabled?: boolean | (() => boolean);
    /** 隐藏 */
    hide?: boolean | (() => boolean);
    /** menu显示的名称 */
    label?: ReactNode;
    /** 抽屉顶部 非必填 取label */
    title?: ReactNode;
    /** ！未完成 请勿使用 */
    children?: Exclude<TabInfo, 'children'>[];
    /** 渲染内容 */
    content?: ReactNode;
}
export interface IProps {
    /** tab */
    tabs: TabInfo[];
    /** 抽屉额外属性 */
    drawerProps?: Omit<DrawerProps, 'visible' | 'onClose'>;
    /** urlParamName */
    urlParamName?: string;
    /** 隐藏重新加载 */
    hideReload?: boolean;
    /** 触发更多的数量 */
    moreCount?: number;
    /** 操作按钮 */
    operations?: Operation[];
    /** 抽屉切换回调 */
    onTabChange?: (key: string) => void;
    /** 显隐回调 */
    onVisibleChange?: (visible: boolean) => void;
    /** 默认开启 */
    defaultOpen?: boolean;
    /** 模式 */
    mode: 'state' | 'params';
}
export interface KeyHandleMap {
    [key: string]: () => void;
}
export interface Operation {
    key: string | number;
    onClick?: () => void;
    text: ReactNode;
}
declare const _default: React.ForwardRefExoticComponent<IProps & React.RefAttributes<TDRef>>;
/**
 * TabDrawer 标签抽屉：Tab懒加载 + 路由联动
 */
export default _default;

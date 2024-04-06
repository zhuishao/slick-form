/**
 * 组件懒加载
 */
import React, { ReactNode } from 'react';
interface IProps {
    children?: ReactNode;
    visible?: boolean;
    initSetKey?: (handle: () => void) => void;
}
declare const _default: ({ children, visible, initSetKey }: IProps) => React.JSX.Element;
export default _default;

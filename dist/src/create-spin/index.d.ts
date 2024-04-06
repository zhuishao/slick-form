import { SpinProps } from 'antd';
import { CSSProperties } from 'react';
import './index.less';
export interface CreateSpinProps {
    getContainer?: () => HTMLElement | null;
    containId?: string;
    spinProps?: SpinProps;
    style?: CSSProperties;
    mode?: string;
}
declare const _default: ({ getContainer, containId, style, mode, ...spinProps }: CreateSpinProps) => {
    open: () => void;
    close: () => void;
};
/** 返回具体的函数 */
export default _default;

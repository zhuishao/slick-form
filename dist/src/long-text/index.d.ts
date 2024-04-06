import React from 'react';
import './index.less';
export interface LongTextProps {
    /**
     * 最多显示的行数，默认为2
     */
    rows?: number;
    /**
     * 完整的文本
     */
    text: React.ReactNode;
    /**
     * 展开的文案
     */
    expandText?: string | React.ReactNode;
    /**
     * 收起的文案
     */
    packupText?: string | React.ReactNode;
    /**
     * 自定义样式
     */
    className?: string;
}
declare const _default: ({ rows, text, expandText, packupText, className, }: LongTextProps) => React.JSX.Element;
export default _default;

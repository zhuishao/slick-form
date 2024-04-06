import React, { CSSProperties, ReactNode } from 'react';
import './index.less';
interface GridProps {
    children?: ReactNode;
    /**
     * 间隙设置
     * @default      { rowGap: 20, columnGap: 20 }
     */
    gridStyle?: CSSProperties;
    /**
     * 等分布局最多四等份
     * @default      4
     */
    column?: number;
}
declare const _default: ({ children, gridStyle, column, }: GridProps) => React.JSX.Element;
export default _default;

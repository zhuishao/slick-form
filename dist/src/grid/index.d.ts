import React, { CSSProperties } from 'react';
import './index.less';
interface GridProps {
    children?: React.ReactNode;
    /**
     * @description 间隙设置
     * @default      { rowGap: 20, columnGap: 20 }
     */
    gridStyle?: CSSProperties;
    /**
     * @description 等分布局最多四等份
     * @default      4
     */
    column?: number;
}
declare const Grid: React.FC<GridProps>;
export default Grid;

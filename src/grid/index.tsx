import React, { CSSProperties } from 'react';
import './index.less';

interface GridProps {
  children?: React.ReactNode; // 注意 ReactNode 更正为 React.ReactNode
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

const Grid: React.FC<GridProps> = ({
  children = null,
  gridStyle = {
    rowGap: 20,
    columnGap: 20,
  },
  column = 4,
}) => {
  return (
    <div className={`shine-grid-${column}`} style={gridStyle}>
      {children}
    </div>
  );
};

export default Grid;

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

export default ({
  children = null,
  gridStyle = {
    rowGap: 20,
    columnGap: 20,
  },
  column = 4,
}: GridProps) => {
  return (
    <div className={`shine-grid-${column}`} style={gridStyle}>
      {children}
    </div>
  );
};

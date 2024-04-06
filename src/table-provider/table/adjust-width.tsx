import React from 'react';
import { Resizable } from 'react-resizable';
export default ({ onCellWidthChange, children, width = 120 }: any) => {
  return (
    <Resizable
      width={width}
      height={54}
      onClick={e => {
        e.stopPropagation();
      }}
      onResize={(e, { size }) => {
        onCellWidthChange(size.width);
      }}
    >
      <div className="table-column-drag">
        <div className="table-column-drag-cell">{children}</div>
      </div>
    </Resizable>
  );
};

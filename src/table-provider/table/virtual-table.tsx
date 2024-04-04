/* eslint-disable react/no-unused-prop-types */
import { Divider, Spin, Table } from 'antd';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import { useEffect, useRef, useState } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';

export default ({
  rowKey,
  dataSource,
  columns,
  loading,
  pagination,
  scroll,
  ToolBar,
  loadMoreData,
  loadMoreTopData,
}) => {
  const [spin, setSpin] = useState(false);
  const [topSpin, setTopSpin] = useState(false);
  const [loadOver, setLoadOver] = useState(false);
  const [loadTopOver, setLoadTopOver] = useState(false);
  const [loadData, setLoadData] = useState([]);
  const [loadTopData, setLoadTopData] = useState([]);
  const gridRef = useRef<any>();
  useEffect(() => {
    setLoadData([]);
    setLoadOver(false);
    gridRef.current._outerRef.scrollTop = 0;
  }, [dataSource]);
  const [tableWidth, setTableWidth] = useState(0);
  const widthColumnCount = columns!.filter(({ width }) => !width).length;
  const mergedColumns = columns!.map(column => {
    if (column.width) {
      return column;
    }
    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });

  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => {
        if (gridRef.current) {
          return gridRef.current?.state?.scrollLeft;
        }
        return null;
      },
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });
  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };
  useEffect(() => resetVirtualGrid, [tableWidth]);
  const renderVirtualList = (
    rawData: object[],
    { scrollbarSize, ref, onScroll }: any
  ) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;
    return (
      <div style={{ position: 'relative' }}>
        {topSpin ? (
          <div
            className="virtual-grid-spin"
            style={{
              position: 'absolute',
              top: 4,
              left: 0,
              right: 0,
              bottom: 'unset',
            }}
          >
            <Spin tip="加载中" />
          </div>
        ) : null}
        <Grid
          ref={gridRef}
          className="virtual-grid"
          columnCount={mergedColumns.length}
          columnWidth={(index: number) => {
            const { width } = mergedColumns[index];
            return totalHeight > scroll!.y! &&
              index === mergedColumns.length - 1
              ? (width as number) - scrollbarSize - 1
              : (width as number);
          }}
          height={scroll!.y as number}
          rowCount={rawData.length}
          rowHeight={() => 54}
          width={tableWidth}
          onScroll={async ({ scrollLeft, scrollTop }) => {
            onScroll({ scrollLeft });
            if (
              totalHeight - scrollTop === scroll.y &&
              loadOver === false &&
              typeof loadMoreData === 'function'
            ) {
              setSpin(true);
              const data = await loadMoreData(rawData);
              if (data === false) {
                setSpin(false);
                setLoadOver(true);
              }
              if (Array.isArray(data)) {
                setLoadData([...loadData, ...data]);
              }
              setSpin(false);
            }
            if (typeof loadMoreTopData === 'function' && scrollTop === 0) {
              setTopSpin(true);
              const data = await loadMoreTopData(rawData);

              if (data === false) {
                setTopSpin(false);
                setLoadTopOver(true);
              }
              if (Array.isArray(data)) {
                setLoadTopData([...data, ...loadTopData]);
              }
              setTopSpin(false);
            }
          }}
        >
          {({
            columnIndex,
            rowIndex,
            style,
          }: {
            columnIndex: number;
            rowIndex: number;
            style: React.CSSProperties;
          }) => {
            const record = rawData[rowIndex];
            const column = mergedColumns[columnIndex];
            const value = record[column.dataIndex];
            return (
              <div
                className={classNames('virtual-table-cell', {
                  'virtual-table-cell-last':
                    columnIndex === mergedColumns.length - 1,
                })}
                style={style}
              >
                {typeof column.render === 'function'
                  ? column.render(value, record, rowIndex)
                  : value}
              </div>
            );
          }}
        </Grid>
        {loadOver && (
          <div className="virtual-grid-over">
            <Divider plain>数据加载完毕</Divider>
          </div>
        )}
        {spin ? (
          <div className="virtual-grid-spin">
            <Spin tip="加载中" />
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <>
      {ToolBar}
      <ResizeObserver
        onResize={({ width }) => {
          if (width !== tableWidth) {
            setTableWidth(width);
          }
        }}
      >
        <div>
          <Table
            rowKey={rowKey}
            dataSource={[...loadTopData, ...dataSource, ...loadData]}
            columns={mergedColumns}
            loading={loading}
            pagination={pagination}
            scroll={scroll}
            components={{
              body: renderVirtualList,
            }}
          />
        </div>
      </ResizeObserver>
    </>
  );
};

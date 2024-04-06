import { Button, Checkbox, Dropdown, Menu } from 'antd';
import React, { useMemo } from 'react';
import { DragList } from '../../index';
import { updateLocalFilter } from '../utils';

export default ({
  filterIds = [],
  columns = [],
  onOk = Function,
  setColumns,
  tableId,
}: any) => {
  const columnList = useMemo(
    () =>
      columns.map((column: any) => {
        return {
          key: column.dataIndex,
          value: column,
          label: (
            <div style={{ padding: 4 }} onClick={e => e.stopPropagation()}>
              <Checkbox
                checked={!filterIds.includes(column.dataIndex)}
                onChange={e => {
                  e.preventDefault();
                  const index = filterIds.findIndex(
                    (item: any) => item === column.dataIndex
                  );
                  if (index > -1) {
                    filterIds.splice(index, 1);
                  } else {
                    filterIds.push(column.dataIndex);
                  }
                  onOk([...filterIds]);
                  if (tableId) {
                    updateLocalFilter({
                      cacheId: tableId,
                      columns,
                      filterIds,
                    });
                  }
                }}
              >
                {column.title}
              </Checkbox>
            </div>
          ),
        };
      }),
    [columns, filterIds]
  );
  return (
    <Dropdown
      arrow
      overlay={
        <Menu
          style={{
            height: 220,
            overflow: 'auto',
          }}
        >
          <DragList
            onChange={list => {
              const _columns = list.map(i => i.value);
              setColumns(_columns);
              if (tableId) {
                updateLocalFilter({
                  cacheId: tableId,
                  columns: _columns,
                  filterIds,
                });
              }
            }}
            list={columnList}
          />
        </Menu>
      }
      placement="bottom"
      trigger={['click']}
      overlayClassName="table-filter-columns"
    >
      <Button
        type="default"
        icon={<i className="iconfont spicon-shezhi" />}
        onClick={e => e.preventDefault()}
      />
    </Dropdown>
  );
};

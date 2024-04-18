import React from 'react';
import { TableProvider } from 'slick-form';
import searchSchema from './search.schema';
import tableSchema from './table.schema';

export default (props: any) => {
  const toolsClick = e => {
    props.open(e.key, {}, e.key === 'f3');
  };
  const rowOperationsClick = async (e, record) => {
    await new Promise(res => setTimeout(res, 600)); // 模拟接口请求
    props.open(e.key, record, e.key === 'f3');
  };
  return (
    <TableProvider
      toolsClick={toolsClick}
      rowOperationsClick={rowOperationsClick}
    >
      <TableProvider.Search {...searchSchema} form={props.searchForm} />
      <TableProvider.Table {...tableSchema} />
    </TableProvider>
  );
};

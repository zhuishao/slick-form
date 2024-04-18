import React from 'react';
import { DrawerForm } from 'slick-form';
import fields from './schema';

const delay = ms => new Promise(res => setTimeout(res, ms, true));
export default props => {
  const onSubmit = async values => {
    console.log('onSubmit ->', values);
    const res = await delay(1000);
    if (res) {
      props.success('保存成功');
      props.close();
      // 新增回到第一页、编辑停留在当前
      props.data.id === undefined
        ? props.searchForm.search()
        : props.searchForm.refresh();
    } else {
      console.log('error');
    }
  };
  return (
    <DrawerForm
      title={props.data.id === undefined ? '新增用户2' : '编辑用户2'}
      initialValues={props.data}
      open
      onSubmit={onSubmit}
      onClose={props.close}
      fields={fields}
    />
  );
};

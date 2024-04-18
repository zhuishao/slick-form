import React from 'react';
import { ModalForm } from 'slick-form';
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
  console.log(props);
  return (
    <ModalForm
      title={props.data.id === undefined ? '新增用户1' : '编辑用户1'}
      onClose={props.close}
      open
      initialValues={props.data}
      onSubmit={onSubmit}
      fields={fields}
    />
  );
};

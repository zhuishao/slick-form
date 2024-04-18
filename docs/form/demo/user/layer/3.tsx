import React from 'react';
import { CardForm } from 'slick-form';
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
    <CardForm
      title={props.data.id === undefined ? '新增用户3' : '编辑用户3'}
      onClose={props.close}
      initialValues={props.data}
      fields={fields}
      actions={[
        {
          label: '返回',
          type: 'default',
          onClick: props.close,
        },
        {
          label: '保存',
          type: 'primary',
          spin: true, // 开启加载
          validator: true, // 开启表单检验
          onClick: onSubmit,
        },
      ]}
    />
  );
};

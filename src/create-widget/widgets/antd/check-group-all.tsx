import { Checkbox, Space } from 'antd';
import React, { useMemo } from 'react';

export default ({ showCheckAll, ...props }) => {
  const onChange = (list: any) => {
    // 通知外面
    props.onChange(list);
  };
  const onCheckAllChange = e => {
    if (e.target.checked) {
      props.onChange(props.options.map(i => i.value)); // 全部选择
    } else {
      props.onChange([]); // 全部清空
    }
  };
  // 判断是否全选
  const isCheckAll = useMemo(() => {
    return (
      !!props.value?.length && props.value?.length === props.options.length
    );
  }, [props.value, props.options]);
  // 判断是否已选中，且未全选
  const isIndeterminate = useMemo(() => {
    return !!props.value?.length && props.value?.length < props.options.length;
  }, [props.value, props.options]);
  return (
    <Space direction="vertical">
      <div className="slick-form-check-group-all">
        <Checkbox
          indeterminate={isIndeterminate}
          onChange={onCheckAllChange}
          checked={isCheckAll}
        >
          {typeof showCheckAll === 'object'
            ? showCheckAll.text || '全选'
            : '全选'}
        </Checkbox>
      </div>
      <Checkbox.Group {...props} onChange={onChange} />
    </Space>
  );
};

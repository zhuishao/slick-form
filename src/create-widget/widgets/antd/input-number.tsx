import { getGlobalConfigByName } from '@/util';
import { InputNumber } from 'antd';
import React from 'react';

const __InputNumber__ = ({ readOnlyEmptyValueNode, ...props }) => {
  const { min, max, maxLength, ...restProps } = props;
  // 渲染只读视图
  if (props.readOnly) {
    return (
      <span className="ant-inputNumber-readonly">
        {props.value || readOnlyEmptyValueNode}
      </span>
    );
  }

  const { autoValidInputNumber } = getGlobalConfigByName('Antd', {});

  if (autoValidInputNumber) {
    return <InputNumber {...restProps} maxLength={15} />;
  }

  return <InputNumber {...props} />;
};
__InputNumber__.displayName = 'InputNumber';
export default __InputNumber__;

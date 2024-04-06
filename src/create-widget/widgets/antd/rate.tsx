import { Rate } from 'antd';
import React from 'react';

const __Rate__ = ({ readOnlyEmptyValueNode, ...props }) => {
  return <Rate {...props} disabled={props.disabled || props.readOnly} />;
};
__Rate__.displayName = 'Rate';
export default __Rate__;

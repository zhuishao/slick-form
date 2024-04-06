import { Input } from 'antd';
import React from 'react';

const Password = ({ readOnlyEmptyValueNode, ...props }) => {
  // 渲染只读视图
  if (props.readOnly) {
    return <span className="ant-password-readonly">******</span>;
  }
  return <Input.Password {...props} />;
};
Password.displayName = 'Password';
export default Password;

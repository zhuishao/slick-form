import { Input } from 'antd';
import React from 'react';
/**
 * 计数器输入框
 */
const CountInput = ({
  showCount = true, // 默认开启
  allowCLear = true, // 默认支持清除
  maxLength = 64, // 默认64
  ...rest
}) => {
  // 渲染只读视图
  if (rest.readOnly) {
    return <span className="readonly-count-input">{rest.value}</span>;
  }
  const count = typeof rest.value === 'string' ? String(rest.value).length : 0;
  return (
    <Input
      suffix={
        showCount && (
          <span style={{ opacity: 0.6, fontSize: 12 }}>
            {count} / {maxLength}
          </span>
        )
      }
      maxLength={maxLength}
      {...rest}
    />
  );
};
CountInput.displayName = 'CountInput';
export default CountInput;

import { getGlobalConfigByName } from '@/util';
import { Input } from 'antd';
import React from 'react';

const _Input_ = ({ readOnlyEmptyValueNode = '-', ...props }) => {
  const { showCount, maxLength, ...restProps } = props;
  // 渲染只读视图
  if (props.readOnly) {
    return (
      <span className="ant-input-readonly">
        {props.value || readOnlyEmptyValueNode}
      </span>
    );
  }
  const {
    autoTrimInputSpaceOnBlur,
    autoShowFormInputCount,
    defaultInputMaxLength = 64,
  } = getGlobalConfigByName('Antd', {});

  if (autoShowFormInputCount) {
    const nowLength = (props.value ?? '').length;
    const nowMaxLength = maxLength || defaultInputMaxLength;
    return (
      <Input
        suffix={
          !props?.isSearchForm && (
            <span style={{ opacity: 0.6, fontSize: 12 }}>
              <span style={nowLength > nowMaxLength ? { color: 'red' } : {}}>
                {nowLength}
              </span>
              / {nowMaxLength}
            </span>
          )
        }
        onBlur={e => {
          if (autoTrimInputSpaceOnBlur) {
            props.onChange(e.target.value?.trim?.());
          }
        }}
        {...restProps}
      />
    );
  }
  return (
    <Input
      onBlur={e => {
        if (autoTrimInputSpaceOnBlur) {
          props.onChange(e.target.value?.trim?.());
        }
      }}
      {...props}
    />
  );
};
_Input_.displayName = 'Input';
export default _Input_;

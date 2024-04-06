import { Space } from 'antd';
import React, { useMemo } from 'react';
import Input from '../../widgets/antd/input';
import InputNumber from '../../widgets/antd/input-number';
import './index.less';

export default ({
  value,
  onChange,
  startProps,
  endProps,
  mode = 'InputNumber',
  notequal = false,
  equalErrorText = '',
  invertedErrorText = '',
  // 其中一个是空的错误提示
  oneEmptyErrorText = '',
  // 是否允许相等
  ...props
}) => {
  // const onInnerBlur = (start, end) => {
  //   if (start && end && end < start) {
  //     onChange([+end, +start]);
  //   }
  // };
  const Component = useMemo(() => {
    return mode === 'InputNumber' ? InputNumber : Input;
  }, []);
  return (
    <Space
      className={
        props.readOnly ? 'widget-range-input-readOnly' : 'widget-range-input'
      }
    >
      <Component
        precision={mode === 'InputNumber' && 2}
        placeholder="请输入"
        {...props}
        {...startProps}
        value={value?.[0]}
        onChange={e => {
          const v = typeof e === 'object' ? e?.target?.value : e;
          onChange([v, value?.[1]]);
        }}
        // onBlur={(e) => {
        //   if (mode === 'InputNumber') {
        //     onInnerBlur(e.target?.value, value?.[1]);
        //   }
        // }}
      />
      <span>-</span>
      <Component
        precision={mode === 'InputNumber' && 2}
        placeholder="请输入"
        {...props}
        {...endProps}
        value={value?.[1]}
        onChange={e => {
          const v = typeof e === 'object' ? e?.target?.value : e;
          onChange([value?.[0], v]);
        }}
        // onBlur={(e) => {
        //   if (mode === 'InputNumber') {
        //     onInnerBlur(value?.[0], e.target?.value);
        //   }
        // }}
      />
    </Space>
  );
};

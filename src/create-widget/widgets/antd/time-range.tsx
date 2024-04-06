import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

const TimeRange = ({ readOnlyEmptyValueNode, ...props }) => {
  if (props.readOnly) {
    // 渲染只读视图
    const labels = props.value?.map((item: any) => {
      return dayjs.isDayjs(item) ? dayjs(item).format('HH:mm:ss') : item;
    });
    return (
      <span className="ant-time-range-picker-readonly">
        {labels?.join(props.splitLabel || ' ~ ') || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <TimePicker.RangePicker {...props} />;
};
TimeRange.displayName = 'TimeRange';
export default TimeRange;

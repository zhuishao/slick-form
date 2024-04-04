import { TimePicker } from 'antd';
import dayjs from 'dayjs';

const __TimePicker__ = ({ readOnlyEmptyValueNode, ...props }) => {
  if (props.readOnly) {
    // 渲染只读视图
    const value = dayjs.isDayjs(props.value)
      ? dayjs(props.value).format('HH:mm:ss')
      : props.value;
    return (
      <span className="ant-time-picker-readonly">
        {value || readOnlyEmptyValueNode}
      </span>
    );
  }
  return <TimePicker {...props} />;
};
__TimePicker__.displayName = 'TimePicker';
export default __TimePicker__;

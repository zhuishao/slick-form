import { disabledDate, disabledTime } from '@/util';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import './range-picker.less';
/**
 分开的交互
*/
const SplitRangerPicker = ({
  value = [],
  onChange = () => {},
  form,
  name,
  endTimeQuickSel = [],
  ...props
}: any) => {
  const [innerValue, setInnerValue] = useState(value);
  const [endProps, setEndProps] = useState(props);
  const onInnerChange = (start, end, type) => {
    setInnerValue([start, end]); // 内部的状态
    onChange([start, end]);
    if (type === 'start') {
      const nowProps: any = {};
      if (start && props.openDisabledDate) {
        nowProps.disabledDate = current => {
          return disabledDate(current, start);
        };
        if (props.openDisabledTime) {
          nowProps.disabledTime = current => {
            return disabledTime(current, start);
          };
        }
      }
      setEndProps(nowProps);
    }
  };

  const endTimeQuickSelObj = endTimeQuickSel?.reduce((pre, cur) => {
    pre[cur.text] = cur;
    return pre;
  }, {});

  // 快速选择结束时间
  const checkEndTime = e => {
    const start = innerValue[0];
    const nowStartTime = start || new Date();
    const { time, unit } = endTimeQuickSelObj[e.target.innerText];
    const nowEnd = dayjs(nowStartTime).add(time, unit);
    onInnerChange(start, nowEnd, 'end');
  };

  // 结束时间底部展示
  const renderExtraFooter = () => {
    return (
      <span>
        快速选择结束时间：
        <Space onClick={checkEndTime}>
          {endTimeQuickSel.map(item => (
            <span key={item.text} className="slick-form-time-tag">
              {item.text}
            </span>
          ))}
        </Space>
      </span>
    );
  };

  return (
    <div className="slick-form-split-range-picker">
      <Space>
        <DatePicker
          value={innerValue[0]}
          {...props}
          onChange={v => {
            onInnerChange(v, innerValue[1], 'start');
          }}
        />
        <DatePicker
          value={innerValue[1]}
          {...props}
          {...endProps}
          onChange={v => {
            onInnerChange(innerValue[0], v, 'end');
          }}
          renderExtraFooter={endTimeQuickSel ? renderExtraFooter : null}
        />
      </Space>
    </div>
  );
};
/**
 * 官方内置的交互
 */
const RangePicker = ({ mode, readOnlyEmptyValueNode, ...props }) => {
  if (props.readOnly) {
    // 渲染只读视图
    const labels = props.value?.map((item: any) => {
      return dayjs.isDayjs(item)
        ? dayjs(item).format(props.format || 'YYYY-MM-DD')
        : item;
    });
    return (
      <span className="ant-range-picker-readonly">
        {labels?.join(props.splitLabel || ' ~ ') || readOnlyEmptyValueNode}
      </span>
    );
  }
  if (mode === 'split') {
    // 拆分成独立的两个日期选择，默认的交互不友好
    return <SplitRangerPicker {...props} />;
  }
  return <DatePicker.RangePicker {...props} />;
};
RangePicker.displayName = 'RangePicker';
export default RangePicker;

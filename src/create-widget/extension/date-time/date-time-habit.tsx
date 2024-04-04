import { DatePicker, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

export default ({ value, onChange, ...props }) => {
  const [date, setDate] = useState<dayjs.Dayjs>(value.date);
  const [time, setTime] = useState(value.time);
  const first = useRef(true);

  useEffect(() => {
    if (!first.current) {
      onChange({ date, time });
    } else {
      first.current = false;
    }
  }, [date, time]);

  return (
    <Space>
      <DatePicker
        value={value?.date}
        onChange={v => {
          setDate(v as any);
        }}
        placeholder="请选择日期"
      />

      <Select
        value={value?.time}
        onChange={v => {
          setTime(v || null);
        }}
        style={{ width: 150 }}
        allowClear
        options={props.options}
        placeholder="请选择时间点"
      />
    </Space>
  );
};

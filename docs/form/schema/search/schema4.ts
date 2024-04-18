import dayjs from 'dayjs';
import { FormFieldProps } from 'slick-form';
const fields: FormFieldProps[] = [
  {
    type: 'Input',
    name: 'name',
    label: '用户名称',
  },
  {
    type: 'Select',
    name: 'sex',
    label: '选择性别',
    props: {
      options: [
        {
          label: '男',
          value: 0,
        },
        {
          label: '女',
          value: 1,
        },
      ],
    },
  },
  {
    type: 'InputNumber',
    name: 'age',
    label: '用户年纪',
    effect: ['sex'],
    isShow: ({ sex }) => sex === 0,
  },
  {
    type: 'DatePicker',
    label: '日期选择',
    name: 'date',
    beforeReceive: ({ date }) => {
      return date && dayjs(date);
    },
    transform: ({ date }) => {
      return {
        date: date ? dayjs(date).format('YYYY-MM-DD') : undefined,
      };
    },
  },
  {
    type: 'RangePicker',
    name: 'rangerDate',
    label: '时间范围',
    beforeReceive({ startTime, endTime }) {
      return startTime && endTime && [dayjs(startTime), dayjs(endTime)];
    },
    transform: ({ rangerDate }) => {
      return rangerDate
        ? {
            startTime: dayjs(rangerDate[0]).format('YYYY-MM-DD'),
            endTime: dayjs(rangerDate[1]).format('YYYY-MM-DD'),
          }
        : {
            startTime: undefined,
            endTime: undefined,
          };
    },
  },
  // 简写
  {
    type: 'DatePicker',
    label: '日期选择',
    name: 'date1',
  },
  {
    type: 'RangePicker',
    name: 'rangerDate1',
    label: '时间范围',
    nameAlise: ['startTime1', 'endTime1'],
  },
];
export default fields;

import dayjs from 'dayjs';
import { FormFieldProps } from 'slick-form';

const fields: FormFieldProps[] = [
  {
    type: 'CountInput',
    name: 'username',
    label: '名称',
    required: true,
  },
  {
    type: 'AsyncSelect',
    name: 'sex',
    label: '性别',
    required: true,
    props: {
      options: async () => {
        return [
          { label: '男', value: 1 },
          { label: '女', value: 2 },
        ];
      },
    },
  },
  {
    type: 'InputNumber',
    name: 'age',
    label: '年龄',
    effect: ['sex'],
    isShow({ sex }) {
      return sex === 1;
    },
    required: true,
  },
  {
    type: 'CountInput',
    name: 'city',
    label: '城市',
    required: true,
  },
  {
    type: 'RangePicker',
    name: 'date',
    label: '就读时间',
    required: true,
    transform: ({ date }) => {
      return (
        date && {
          startTime: dayjs(date[0]).format('YYYY-MM-DD HH:mm:ss'),
          endTime: dayjs(date[1]).format('YYYY-MM-DD HH:mm:ss'),
        }
      );
    },
  },
];
export default fields;

import { FormFieldProps } from 'slick-form';

const fields: FormFieldProps[] = [
  {
    type: 'CountInput',
    name: 'username',
    label: '名称',
    required: true,
  },
  {
    type: 'DateTimeHabit',
    name: 'dateTimeHabit',
    label: '选择日期（时间分段）',
    // required: true,
    props: {
      options: [
        { label: '09:00', value: '09:00' },
        { label: '10:00', value: '10:00' },
        { label: '11:00', value: '11:00' },
      ],
    },
  },
  {
    type: 'Select',
    name: 'sex',
    label: '性别',
    required: true,
    props: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
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
    nameAlise: ['startTime', 'endTime'],
  },
];
export default fields;

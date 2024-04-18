import { FormFieldProps } from 'slick-form';

export default [
  {
    type: 'Input',
    label: '客户姓名',
    name: 'name',
    required: true,
  },
  {
    type: 'RadioGroup',
    label: '客户性别',
    name: 'sex',
    required: true,
    props: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
  },
  {
    type: 'InputNumber',
    label: '客户年纪',
    name: 'age',
    required: true,
    effect: ['sex'],
    isShow: ({ sex }) => {
      return sex === 1;
    },
    props: {
      min: 18,
      max: 99,
    },
  },
  {
    type: 'AsyncSelect',
    label: '客户姓名',
    name: 'liked',
    required: true,
    props: {
      options: async () => {
        await new Promise(res => setTimeout(res, 1000));
        return [
          {
            label: '游泳',
            value: 1,
          },
          {
            label: '学习',
            value: 2,
          },
        ];
      },
    },
  },
  {
    type: 'HolidaysSetting',
    label: '设置客户节假日',
    name: 'holidays',
    required: true,
  },
] as FormFieldProps[];

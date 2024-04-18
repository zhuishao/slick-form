import { FormFieldProps } from 'slick-form';
const fields: FormFieldProps[] = [
  {
    type: 'RadioGroup',
    name: 'sex',
    label: '性别',
    props: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
  },
  {
    type: 'InputNumber',
    name: 'age',
    label: '年龄',
    effect: ['sex'], // 配置副作用
    isShow: ({ sex }) => {
      return sex === 1;
    },
  },
  {
    type: 'AsyncRadioGroup',
    name: 'level',
    label: '级别 (类型按照年龄划分)',
    effect: ['age', 'sex'], // 配置副作用
    props: {
      options: async ({ getFieldValue }) => {
        return getFieldValue('age') > 20
          ? [
              {
                label: '专科毕业',
                value: 0,
              },
              {
                label: '本科毕业',
                value: 1,
              },
              {
                label: '985、211毕业',
                value: 2,
              },
            ]
          : [
              {
                label: '普通高中',
                value: 3,
              },
              {
                label: '重点高中',
                value: 4,
              },
            ];
      },
    },
    isShow: ({ sex }) => {
      return sex === 1;
    },
  },
];
export default {
  fields,
};

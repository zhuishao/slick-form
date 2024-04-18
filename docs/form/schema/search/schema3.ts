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
    label: '员工性别',
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
    type: 'DatePicker',
    name: 'date',
    label: '入职日期',
  },
  {
    type: 'Input',
    name: 'email',
    label: '电子邮箱',
    ismore: 1, // 更多展示
  },
  {
    type: 'Input',
    name: 'phone',
    label: '手机号码',
    ismore: 1, // 更多展示
  },
];
export default fields;

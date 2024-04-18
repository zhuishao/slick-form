import { FormFieldProps } from 'slick-form';

const fields: FormFieldProps[] = [
  {
    type: 'Select',
    name: 'type',
    label: '资产类别',
    autosearch: 1, // 修改直接查询
    tooltip: '修改立即查询',
    props: {
      options: [
        {
          label: '我的资产',
          value: 0,
        },
        {
          label: '全部资产',
          value: 1,
        },
      ],
    },
  },
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
];
export default fields;

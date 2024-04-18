import { FormFieldProps } from 'slick-form';

const fields: FormFieldProps[] = [
  {
    type: 'Input',
    name: 'name',
    label: '用户姓名',
    required: true,
  },
  {
    type: 'Input',
    name: 'nickname',
    label: '用户昵称',
    tooltip: '判断是否必填',
    extra: '填写名称则昵称非必填',
    effect: ['name'],
    required: ({ getFieldValue }) => !getFieldValue('name'),
  },
];
export default {
  fields,
};

import { FormFieldProps } from 'slick-form';

const fields: FormFieldProps[] = [
  {
    type: 'AsyncSelect',
    name: 'role',
    label: '用户角色',
    props: {
      options: async form => {
        console.log(form);
        await sleep(500);
        return [
          {
            label: '管理员',
            value: 0,
          },
          {
            label: '开发',
            value: 1,
          },
          {
            label: '测试',
            value: 2,
          },
        ];
      },
    },
  },
  {
    type: 'AsyncSelect',
    name: 'sex',
    label: '员工性别',
    effect: ['role'],
    props: {
      options: async form => {
        console.log('render -->', form);
        await sleep(500);
        return [
          {
            label: '男',
            value: 0,
          },
          {
            label: '女',
            value: 1,
          },
        ];
      },
    },
  },
  {
    type: 'Input',
    name: 'email',
    label: '电子邮箱',
  },
  {
    type: 'Input',
    name: 'phone',
    label: '手机号码',
    ismore: 1, // 更多展示
  },
];
const sleep = ms => new Promise(res => setTimeout(res, ms));

export default fields;

import { FormFieldProps, tools } from 'slick-form';

const fields: FormFieldProps[] = [
  {
    type: 'Select',
    label: '联系人类型',
    name: 'userType',
    required: true,
    props: {
      options: [
        {
          label: '联系人类型1',
          value: 1,
        },
        {
          label: '联系人类型2',
          value: 2,
        },
      ],
    },
  },
  {
    type: 'InputNumber',
    label: '收入总和(元)',
    name: 'totalAmount',
    disabled: true,
    extra: '子表单收入合计',
    effect: [['contactList', 'index', 'amount']],
    onEffect(name, { getFieldValue, setFieldsValue }) {
      const contactList = getFieldValue('contactList');
      setFieldsValue({
        totalAmount: tools.BigNumber.add(
          ...contactList.filter(i => !!i?.amount).map(i => i?.amount)
        ),
      });
    },
  },
  {
    type: 'FormList',
    name: 'contactList',
    label: '联系人表单',
    required: true,
    span: 3,
    props: {
      label: '联系人',
      maxCount: 3, // 最多3条
      // operation: false, // 不可操作
      // readOnly: true // 只读
      // disabled: true // 禁用
      leastOne: true, // 至少一条
      operationText: '添加一条',
      grid: {
        gridStyle: {
          rowGap: 0,
          columnGap: 20,
        },
        column: 3,
      },
      fields: [
        {
          type: 'Input',
          name: 'name',
          label: '姓名',
          required: true,
          props: {
            onChange() {
              const { form } = this;
              form.mergeFieldByName(
                ['contactList', this.name[0], 'amount'].join('_'),
                {
                  label: '动态修改',
                }
              );
            },
          },
        },
        {
          type: 'InputNumber',
          name: 'amount',
          label: '收入(元)',
          required: true,
          effect: [['contactList', 'index', 'name']],
          disabled({ getFieldValue }) {
            const name = getFieldValue('contactList')[this.name[0]]?.name;
            return name === '' || name === undefined;
          },
        },
        {
          type: 'AsyncCheckGroup',
          name: 'liked',
          label: '爱好',
          required: true,
          tooltip: '和联系人类型关联',
          effect: ['userType'],
          props: {
            options: async ({ getFieldValue }) => {
              return [
                {
                  label: '听音乐',
                  value: 1,
                },
                {
                  label: '学习',
                  value: 2,
                },
                {
                  label: '跑步健身',
                  value: 3,
                },
                {
                  label: '篮球运动',
                  value: 4,
                  disabled: getFieldValue('userType') === 1,
                },
              ];
            },
          },
        },
        {
          type: 'Select',
          name: 'sex',
          label: '性别',
          required: true,
          props: {
            options: [
              {
                label: '男',
                value: 1,
              },
              {
                label: '女',
                value: 2,
              },
            ],
          },
        },
        {
          type: 'Input',
          name: 'age',
          label: '年龄',
          required: true,
          effect: [['contactList', 'index', 'sex']],
          isShow({ contactList }) {
            return contactList[this.name[0]]?.sex === 1;
          },
        },
      ],
    },
  },
];
export default {
  column: 3,
  initialValues: {
    userType: 1,
    contactList: [
      {
        name: '小华',
        liked: [2],
        sex: 1,
        age: 18,
      },
    ],
  },
  fields,
};

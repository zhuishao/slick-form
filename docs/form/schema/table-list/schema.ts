export default {
  // 默认添加的值
  defaultAddValue: {
    name: 'hello',
    sex: 0,
  },
  maxCount: 5, // 最多5条
  fields: [
    {
      type: 'Input',
      name: 'name',
      label: '姓名',
      required: true,
      // render(){
      //   return 123
      // }
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
      type: 'Input',
      name: 'age',
      label: '年纪',
      isVisible: ({ sex }) => sex === 0,
    },
    {
      type: 'Input',
      name: 'phone',
      label: '手机号',
    },
    {
      type: 'Input',
      name: 'address',
      label: '地址',
    },
  ],
};

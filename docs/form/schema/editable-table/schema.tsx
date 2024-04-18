export default {
  // 默认添加的值
  defaultAddValue: {
    name: 'hello',
    phone: '123456789',
  },
  // 限制总条数最多5条
  maxLength: 5,
  // 格式不符合拦截
  onBeforeChange: async (dataSource, value) => {
    /** 等待1s模拟接口请求 */
    await new Promise(res => setTimeout(res, 1000));
    if (dataSource.some(i => i.name === value.name)) {
      return Promise.reject('姓名不能重复');
    }
  },
  // 删除不符合拦截
  onBeforeDelete: async value => {
    /** 等待1s模拟接口请求 */
    await new Promise(res => setTimeout(res, 1000));
    if (value.name === '张三') {
      return Promise.reject('张三不能删除');
    }
  },
  // 仅保存、删除、排序会触发
  onChange: value => {
    console.log('onChange->', value);
  },
  // 底层按钮的配置
  creatorButtonProps: {
    text: '添加一行数据',
    style: {},
    exceedHidden: true,
  },
  // 定义列信息 column + fieldProps
  columns: [
    {
      title: '客户名称',
      dataIndex: 'name',
      width: 220,
      fieldProps: {
        required: true,
        type: 'CountInput',
        props: {
          maxLength: 100,
        },
      },
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      width: 220,
      fieldProps: {
        type: 'CountInput',
        props: {
          maxLength: 11,
        },
      },
    },
    {
      title: '客户性别',
      dataIndex: 'sex',
      width: 220,
      render(sex, { sexLabel }, index, options) {
        if (options) {
          return options.find(i => i.value === sex)?.label;
        }
        return sexLabel;
      },
      fieldProps: {
        type: 'AsyncSelect',
        props: {
          options: async () => {
            return [
              {
                label: '男',
                value: 0,
              },
              {
                label: '女',
                value: 1,
              },
              {
                label: '未知',
                value: 2,
              },
            ];
          },
        },
      },
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 220,
      render(age, { sex }) {
        return sex === 1 ? '-' : age; // 性别男才展示
      },
      fieldProps: {
        type: 'InputNumber',
        effect: ['sex'],
        isShow({ sex }) {
          return sex == 0; // 性别男才展示
        },
      },
    },
  ],
};

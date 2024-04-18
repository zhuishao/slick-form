import { FormFieldProps, TableProps } from 'slick-form';

const data: any = [];
for (let i = 1; i < 1001; i++) {
  data.push({
    id: i,
    username: '用户姓名' + i,
    sex: '性别' + i,
    city: '城市' + i,
    sign: '签名' + i,
    classify: '职业' + i,
    score: '分数' + i,
    logins: '登录次数' + i,
  });
}
const searchSchema: FormFieldProps[] = [
  {
    type: 'Select',
    name: 'type',
    label: '资产类型',
    autosearch: 1, // 修改直接查询
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
    label: '用户性别',
    ismore: 1,
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
    ismore: 1,
  },
  {
    type: 'Input',
    name: 'email',
    label: '电子邮箱',
    ismore: 1,
  },
  {
    type: 'Input',
    name: 'phone',
    label: '手机号码',
    ismore: 1,
  },
];
const tableSchema: TableProps = {
  title: '静态数据展示',
  scroll: {
    x: 1200,
  },
  request: async params => {
    return {
      total: data.length,
      isError: false,
      list: data.slice(
        (params.pageNum - 1) * params.pageSize,
        params.pageNum * params.pageSize
      ),
    };
  },
  columns: [
    // 列基本信息
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      fixed: 'left',
      ellipsis: true,
    },
    {
      title: '客户姓名',
      ellipsis: true,
      dataIndex: 'username',
      width: 150,
    },
    {
      title: '性别',
      ellipsis: true,
      dataIndex: 'sex',
      width: 150,
      filters: [
        {
          text: '男',
          value: 1,
        },
        {
          text: '女',
          value: 2,
        },
      ],
    },
    {
      title: '城市',
      ellipsis: true,
      dataIndex: 'city',
      width: 150,
    },
    {
      title: '签名',
      ellipsis: true,
      dataIndex: 'sign',
      width: 120,
    },
    {
      title: '职业',
      ellipsis: true,
      dataIndex: 'classify',
      width: 120,
    },
    {
      title: '分数',
      ellipsis: true,
      dataIndex: 'score',
      width: 100,
      sorter: true,
    },
    {
      title: '登录次数',
      ellipsis: true,
      dataIndex: 'logins',
      width: 100,
      sorter: true,
    },
  ],
  rowOperations: {
    title: '操作',
    ellipsis: true,
    width: 200,
    showMore: 2,
    fixed: 'right',
    menus: record => [
      {
        label: '编辑1',
        key: 'f1',
        disabled: record.id === 10000,
      },
      {
        label: '编辑2',
        key: 'f2',
      },
      {
        label: '编辑3',
        key: 'f3',
      },
      {
        label: '删除',
        key: 'delete',
        confirm: {
          title: '提示',
          content: `确认删除ID为${record.id}的记录吗？`,
        },
      },
    ],
  },
};
export { searchSchema, tableSchema };

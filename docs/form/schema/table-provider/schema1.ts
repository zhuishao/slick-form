import dayjs from 'dayjs';
import { FormFieldProps, TableProps } from 'slick-form';
import axios from '../../../axios';

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
    transform: ({ date }) => {
      return date
        ? {
            date: dayjs(date).format('YYYY-MM-DD'),
          }
        : {
            date: undefined,
          };
    },
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
  title: '用户列表',
  scroll: {
    x: 1200,
  },
  request: async (params, _, sorter) => {
    const {
      data: { data, code },
    }: any = await axios.post('/form-lib/schema/list', {
      ...params,
      pageRow: params.pageSize,
    });
    return {
      total: 1000,
      isError: code !== 200,
      list: data,
    };
  },
  tools: [
    {
      label: '添加1',
      key: 'f1',
    },
    {
      label: '添加2',
      key: 'f2',
    },
    {
      label: '添加3',
      key: 'f3',
    },
    {
      label: '导出数据',
      key: 'export',
      ghost: true,
      spin: true,
    },
    {
      type: 'Dropdown',
      label: '更多操作',
      menu: [
        {
          key: 'action_1',
          label: '更多操作1',
        },
        {
          type: 'Divider',
          key: 'split',
        },
        {
          key: 'action_2',
          label: '更多操作2',
        },
        {
          key: 'action_3',
          label: '更多操作3',
        },
      ],
    },
    {
      type: 'Refresh',
    },
    {
      type: 'FilterColumns',
    },
  ],
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
    fixed: 'right',
    menus(record) {
      return [
        {
          label: '编辑1',
          key: 'f1',
          disabled: record.id === 1,
        },
        {
          label: '编辑2',
          key: 'f2',
          visible: record.id === 2,
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
      ];
    },
  },
};
export { searchSchema, tableSchema };

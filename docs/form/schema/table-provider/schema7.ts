import { TableProps } from 'slick-form';
import axios from '../../../axios';

const tableSchema: TableProps = {
  title: '用户列表',
  request: async params => {
    const {
      data: { data, code },
    }: any = await axios.post('/form-lib/schema/list', {
      ...params,
      pageRow: 1000,
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
      fixed: 'left',
      ellipsis: true,
    },
    {
      title: '客户姓名',
      ellipsis: true,
      dataIndex: 'username',
    },
    {
      title: '客户信息',
      children: [
        {
          title: '性别',
          dataIndex: 'sex',
          align: 'center',
        },
        {
          title: '城市',
          dataIndex: 'city',
        },
        {
          title: '职业',
          ellipsis: true,
          dataIndex: 'classify',
        },
      ],
    },
    {
      title: '签名',
      ellipsis: true,
      dataIndex: 'sign',
    },

    {
      title: '分数',
      ellipsis: true,
      dataIndex: 'score',
    },
    {
      title: '登录次数',
      ellipsis: true,
      dataIndex: 'logins',
    },
  ],
};
export default tableSchema;

import { TableProps } from 'slick-form';
import axios from '../../../axios';

const tableSchema: TableProps = {
  rowKey: 'id',
  title: '用户列表',
  scroll: {
    x: 1200,
  },
  request: async params => {
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
      key: 'add1',
    },
    {
      label: '添加2',
      key: 'add2',
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
    width: 180,
    showMore: 2,
    fixed: 'right',
    menus(record) {
      return [
        {
          label: '编辑1',
          key: 'edit1',
        },
        {
          label: '编辑2',
          key: 'edit2',
        },
      ];
    },
  },
};

export default tableSchema;

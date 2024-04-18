import { TableProps } from 'slick-form';
import axios from '../../../axios';

const tableSchema: TableProps = {
  emptyNode: '-',
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
      list: data.map(item => {
        return {
          ...item,
          city: '这个签名是一段很长的详细地址信息这个签名是一段很长的详细地址信息这个签名是一段很长的详细地址信息',
          sign: '这个签名是一段很长的描述信息这个签名是一段很长的描述信息这个签名是一段很长的描述信息这个签名是一段很长的描述信息',
          logins: 12345678,
          score: undefined,
        };
      }),
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
      type: 'Export',
      onClick: params => {
        console.log('params->', params);
      },
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
      link: true,
    },
    {
      title: '客户姓名',
      dataIndex: 'username',
      tip: '这里是客户姓名描述',
      copyable: true,
      link: true,
      ellipsis: true,
      width: 150,
      onCell: () => {
        return {
          onClick() {
            console.log('点击复制不会执行');
          },
        };
      },
    },
    {
      title: '性别',
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
      dataIndex: 'city',
      width: 150,
      ellipsis: true,
    },
    {
      title: '签名',
      dataIndex: 'sign',
      width: 120,
      ellipsis: true,
      render(sign) {
        return sign;
      },
    },
    {
      title: '职业',
      dataIndex: 'classify',
      width: 120,
    },
    {
      title: '分数',
      dataIndex: 'score',
      width: 100,
    },
    {
      title: '登录次数',
      dataIndex: 'logins',
      width: 100,
      useThousandth: true,
      copyable: true,
    },
  ],
  rowOperations: {
    title: '操作',
    ellipsis: true,
    width: 220,
    showMore: 2,
    fixed: 'right',
    menus(record) {
      return [
        {
          label: '复制链接',
          key: 'copy',
          copyable: {
            text: '复制了拷贝内容',
          },
        },
        {
          label: '编辑1',
          key: 'f1',
          disabled: record.id === 1,
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
      ];
    },
  },
};
export { tableSchema };

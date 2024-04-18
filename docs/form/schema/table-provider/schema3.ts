import { TableProps } from 'slick-form';
import axios from '../../../axios';

const tableSchema = ({ readOnly }): TableProps => {
  return {
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
        key: 'f1',
        visible: !readOnly,
      },
      {
        label: '添加2',
        key: 'f2',
        visible: !readOnly,
      },
      {
        label: '添加3',
        key: 'f3',
        visible: !readOnly,
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
        visible: !readOnly,
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
        align: 'center',
        ellipsis: true,
      },
      {
        title: '客户姓名',
        ellipsis: true,
        align: 'center',
        dataIndex: 'username',
        width: 150,
      },
      {
        title: '性别',
        ellipsis: true,
        align: 'center',
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
        align: 'center',
        width: 150,
      },
      {
        title: '签名',
        ellipsis: true,
        align: 'center',
        dataIndex: 'sign',
        width: 120,
      },
      {
        title: '职业',
        ellipsis: true,
        dataIndex: 'classify',
        align: 'center',
        width: 120,
      },
      {
        title: '分数',
        ellipsis: true,
        align: 'center',
        dataIndex: 'score',
        width: 100,
        sorter: true,
      },
      {
        title: '登录次数',
        align: 'center',
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
      menus(record) {
        return readOnly
          ? [
              {
                label: '查看',
                key: 'v1',
                spin: true, // 开启loading
              },
            ]
          : [
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
};
export { tableSchema };

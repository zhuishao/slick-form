import { Tag } from 'antd';
import React from 'react';
import { FormFieldProps, tools } from 'slick-form';

const fields: FormFieldProps[] = [
  {
    type: 'DebounceSelect',
    name: 'level',
    label: '员工级别',
    extra: '建议默认值 定义为 [{ value: 1, label: "1级别" }]',
    props: {
      debounceTimeout: 1000, // 防抖时间
      fetchOptions: async (search: string, form) => {
        // 远程接口调用
        console.log(search, form);
        if (tools.isEmpty(search)) {
          return [];
        }
        await sleep(1000);
        return [tools.uuid(4), tools.uuid(4), tools.uuid(4)].map(item => {
          return {
            label: `级别${item}`,
            value: item,
          };
        });
      },
    },
  },
  {
    type: 'AsyncSelect',
    name: 'classify',
    label: '员工职位',
    props: {
      mode: 'multiple',
      showSearch: true,
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      maxTagCount: 'responsive',
      options: async form => {
        console.log('classify ->', form); // 可以拿到表单实例
        await sleep(500);
        return [
          {
            name: '前端',
            id: 0,
          },
          {
            name: '后端',
            id: 1,
          },
          {
            name: '产品经理',
            id: 2,
          },
          {
            name: '项目经理',
            id: 3,
          },
        ];
      },
    },
  },
  {
    type: 'AsyncSelect',
    name: 'roles',
    label: '员工角色',
    props: {
      emptyDescription: '暂无数据请联系管理员添加',
      options: async form => {
        await sleep(500);
        return [];
      },
    },
  },
  {
    type: 'AsyncCheckGroup',
    name: 'liked',
    label: '员工爱好',
    props: {
      options: async form => {
        console.log('liked ->', form); // 可以拿到表单实例
        await sleep(500);
        return [
          {
            label: '游戏',
            value: 0,
          },
          {
            label: '篮球',
            value: 1,
          },
          {
            label: '游泳',
            value: 2,
          },
          {
            label: '卡牌',
            value: 3,
          },
        ];
      },
    },
  },
  {
    type: 'AsyncRadioGroup',
    name: 'sex',
    label: '员工性别',
    props: {
      options: async form => {
        console.log('sex ->', form); // 可以拿到表单实例
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
          {
            label: '未知',
            value: 2,
          },
        ];
      },
    },
  },
  {
    type: 'AsyncTreeSelect',
    name: 'department',
    label: '员工所在部门',
    props: {
      options: async () => {
        await sleep(500);
        const options = [
          {
            title: '部门1',
            value: '0-0',
            children: [
              {
                title: '部门1-1',
                value: '0-0-1',
              },
              {
                title: '部门1-2',
                value: '0-0-2',
              },
            ],
          },
          {
            title: '部门2',
            value: '0-1',
          },
        ];
        return options;
      },
    },
  },
  {
    type: 'AsyncCascader',
    name: 'position',
    label: '员工所在地',
    props: {
      initOptions: async () => {
        await sleep(500);
        const options = [
          {
            value: 'zhejiang',
            label: '浙江省',
            isLeaf: false,
            children: [
              {
                value: 'hangzhou',
                label: '杭州市',
                isLeaf: true,
              },
            ],
          },
          {
            value: 'jiangsu',
            label: '安徽省',
            isLeaf: false,
            children: [
              {
                value: 'hefei',
                label: '合肥市',
                isLeaf: true,
              },
            ],
          },
        ];
        return options;
      },
    },
  },
  {
    type: 'AsyncRender',
    label: '已选择性别',
    key: 'render',
    effect: ['sex'],
    props: {
      spin: true, // 开启loading
      async render({ getFieldOption, getFieldsValue, initialValues }) {
        const { sex } = getFieldsValue(true) || initialValues;
        const options = await getFieldOption('sex');
        return (
          <Tag color="processing">
            {options.find(i => i.value === sex)?.label}
          </Tag>
        );
      },
    },
  },
  {
    type: 'AsyncRadioGroup',
    name: 'level-empty',
    label: '员工阶级',
    props: {
      options: async () => {
        await sleep(2000);
      },
    },
  },
];
const sleep = ms => new Promise(res => setTimeout(res, ms));
export default {
  column: 2,
  initialValues: {
    // level: [{ value: 1, label: '1级别' }],
    classify: [1, 2, 3, 0],
    liked: [1, 2],
    sex: 1,
    position: ['zhejiang', 'hangzhou'],
    department: '0-0-1',
  },
  fields,
};

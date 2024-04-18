import { FormFieldProps } from 'slick-form';

const fields: FormFieldProps<{}>[] = [
  {
    type: 'Input',
    name: 'input',
    label: '输入框2',
    required: true,
    props: {
      showCount: true,
      maxLength: 20,
    },
  },
  {
    type: 'AsyncCascader',
    name: 'asyncCascader',
    label: '异步级联选择器',
    required: true,
    props: {
      // 第一个参数是props.value，第二个参数是form实例
      options: async (initValues, form) => {
        return [
          {
            value: 'zhejiang',
            label: '浙江省',
            children: [
              {
                value: 'hangzhou',
                label: '杭州市',
              },
            ],
          },
          {
            value: 'anhui',
            label: '安徽省',
            children: [
              {
                value: 'hefei',
                label: '合肥市',
              },
            ],
          },
        ];
      },
      // initOptions: async (initValues, form) => {
      //   return [
      //     {
      //       value: 'zhejiang',
      //       label: '浙江省',
      //       children: [
      //         {
      //           value: 'hangzhou',
      //           label: '杭州市',
      //         },
      //       ],
      //     },
      //     {
      //       value: 'anhui',
      //       label: '安徽省',
      //       children: [
      //         {
      //           value: 'hefei',
      //           label: '合肥市',
      //         },
      //       ],
      //     },
      //   ];
      // },
    },
  },
  {
    type: 'Password',
    name: 'password',
    label: '密码输入框',
    tooltip: '密码至少6位字符',
    props: {
      visibilityToggle: false,
    },
  },
  {
    type: 'InputNumber',
    name: 'inputNumber',
    label: '数字输入框',
    props: {
      min: 1,
      max: 999,
    },
  },
  {
    type: 'Select',
    name: 'select',
    label: '下拉选',
    props: {
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ],
    },
    extra: '这是一段描述信息',
  },
  {
    type: 'RadioGroup',
    name: 'radioGroup',
    label: '单选按钮组',
    effect: ['select'],
    // effectResetField: true, // 重制默认值
    effectClearField: true, // 清空
    props: {
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ],
    },
  },
  {
    type: 'CheckGroup',
    name: 'checkGroup',
    label: '复选框',
    props: {
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ],
    },
  },
  {
    type: 'Switch',
    name: 'switch',
    label: '开关切换',
    valuePropName: 'checked',
    props: {
      checkedChildren: '开启',
      unCheckedChildren: '关闭',
    },
  },
  {
    type: 'Rate',
    name: 'rate',
    label: '评分组件',
  },
  {
    type: 'Slider',
    name: 'slider',
    label: '滑块组件',
  },
  {
    type: 'Select',
    name: 'selectMore',
    label: '下拉多选',
    props: {
      mode: 'multiple',
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
        { label: '选项2', value: 3 },
      ],
    },
  },
  {
    type: 'TreeSelect',
    name: 'treeSelect',
    label: '树形选择器',
    props: {
      treeData: [
        {
          title: 'Node1',
          value: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-1',
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
        },
      ],
    },
  },
  {
    type: 'Cascader',
    name: 'cascader',
    label: '级联选择器',
    props: {
      options: [
        {
          value: 'zhejiang',
          label: '浙江省',
          children: [
            {
              value: 'hangzhou',
              label: '杭州市',
            },
          ],
        },
        {
          value: 'anhui',
          label: '安徽省',
          children: [
            {
              value: 'hefei',
              label: '合肥市',
            },
          ],
        },
      ],
    },
  },
  {
    type: 'DatePicker',
    name: 'datePicker',
    label: '选择日期',
  },
  {
    type: 'RangeInput',
    name: 'eval',
    nameAlise: ['startEval', 'endEval'],
    label: '数字区间',
    required: true,
    props: {
      invertedErrorText: '左侧不能大于右侧值',
      oneEmptyErrorText: '区间两侧必须填写',
      equalErrorText: 'sdddddd',
      precision: 0,
      notequal: true,
    },
  },
  {
    type: 'RangeInput',
    name: 'nameAlise',
    nameAlise: ['startName', 'endName'],
    label: '文本区间',
    props: {
      mode: 'Input',
    },
  },
  {
    type: 'RangePicker',
    name: 'rangePicker',
    nameAlise: ['startDate', 'endDate'],
    label: '时间区间选取(默认)',
  },
  {
    type: 'RangePicker',
    name: 'rangePickerSplitTest',
    nameAlise: ['startDate1', 'endDate1'],
    label: '时间区间选取(扩展)',
    props: {
      mode: 'split',
      canEqual: false,
      endTimeQuickSel: [
        { text: '半个小时', time: '0.5', unit: 'h' },
        { text: '一个小时', time: '1', unit: 'h' },
        { text: '两个小时', time: '2', unit: 'h' },
      ],
      showTime: true,
      format: 'YYYY-MM-DD HH:mm',
      showNow: false,
      openDisabledDate: true,
      openDisabledTime: true,
    },
  },
  {
    type: 'TimePicker',
    name: 'timePicker',
    label: '时间选择',
  },
  {
    type: 'TimeRange',
    name: 'timeRange',
    nameAlise: ['startTime', 'endTime'],
    label: '时间区间',
    props: {
      splitLabel: ' 至 ',
    },
  },
  {
    type: 'TextArea',
    name: 'textArea',
    label: '多文本',
    props: {
      showCount: true,
      maxLength: 200,
    },
  },
  {
    type: 'UploadImage',
    name: 'upload',
    label: '上传图片',
    props: {
      name: 'file',
      text: '点击上传',
      maxCount: 1,
      limitSize: 2,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
    },
  },
];
export default {
  onValuesChange: (value, values) => {
    console.log('onValuesChange ->', value, values);
  },
  column: 2,
  fields,
};

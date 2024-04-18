import { FormFieldProps } from 'slick-form';

const fields: FormFieldProps<{}>[] = [
  {
    type: 'CountInput',
    name: 'countInput',
    label: '计数器输入框',
    tooltip: '自带计数器功能',
  },
  {
    type: 'AmountInput',
    name: 'amountInput',
    label: '金额类输入框',
    tooltip: '默认开启千分位、最多15位数字、最小值为0、小数点默认2位',
  },
  {
    type: 'BankCardInput',
    name: 'bankCardInput',
    label: '银行卡输入框',
    tooltip: '每4位 自动添加空格',
  },
  {
    type: 'RangeInput',
    name: 'rangeInputNumber',
    label: '数字区间输入框',
    nameAlise: ['startRange', 'endRange'],
    props: {
      startProps: {
        min: 0,
      },
      endProps: {
        max: 100,
      },
    },
  },
  {
    type: 'RangeInput',
    name: 'rangeInput',
    label: '区间输入框',
    props: {
      mode: 'Input',
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

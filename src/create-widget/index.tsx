/** ui组件 */
/** 业务组件 */
import React from 'react';

import OssFileUpload from './business/oss-file-upload';
import AsyncCascader from './extension/async/cascader';
import AsyncCheckGroup from './extension/async/check-group';
import AsyncRadioGroup from './extension/async/radio-group';
import AsyncRender from './extension/async/render';
import AsyncSelect from './extension/async/select';
import AsyncTreeSelect from './extension/async/tree-select';
import BlockQuote from './extension/block-quote';
import DateTimeHabit from './extension/date-time/date-time-habit';
import DebounceSelect from './extension/debounce/select';
import FieldSet from './extension/fields-set';
import FormList from './extension/form-list';
import AmountInput from './extension/input/amount';
import BankCardInput from './extension/input/bank-card';
import CountInput from './extension/input/count';
import RangeInput from './extension/input/range';
/** 扩展组件 */

import EditableTable from '../editable-table/index';
import Render from './extension/render';
import UploadImage from './extension/upload-image';
import AutoComplete from './widgets/antd/auto-complete';
import Cascader from './widgets/antd/cascader';
import CheckGroup from './widgets/antd/check-group';
import DatePicker from './widgets/antd/date-picker';
import Input from './widgets/antd/input';
import InputNumber from './widgets/antd/input-number';
import Password from './widgets/antd/password';
import RadioGroup from './widgets/antd/radio-group';
import RangePicker from './widgets/antd/range-picker';
import Rate from './widgets/antd/rate';
import Select from './widgets/antd/select';
import Slider from './widgets/antd/slider';
import Switch from './widgets/antd/switch';
import TextArea from './widgets/antd/text-area';
import TimePicker from './widgets/antd/time-picker';
import TimeRange from './widgets/antd/time-range';
import TreeSelect from './widgets/antd/tree-select';
import Upload from './widgets/antd/upload';

// 内置组件映射关系
export const BuiltInWidgetMapping: any = {
  // antd
  AutoComplete,
  Input,
  InputNumber,
  Rate,
  Slider,
  TextArea,
  Password,
  Select,
  RadioGroup,
  CheckGroup,
  DatePicker,
  TimePicker,
  TimeRange,
  RangePicker,
  TreeSelect,
  Cascader,
  Upload,
  Switch,
  // 扩展组件
  AsyncSelect,
  AsyncTreeSelect,
  DebounceSelect,
  AsyncCascader,
  AsyncCheckGroup,
  AsyncRadioGroup,
  Render,
  AsyncRender,
  FormList,
  BlockQuote,
  FieldSet,
  UploadImage,
  CountInput,
  BankCardInput,
  AmountInput,
  EditableTable,
  RangeInput,
  OssFileUpload,
  DateTimeHabit,
};

export const Error = ({ widget }: any) => {
  return <span style={{ color: 'red' }}>Error: widget类型({widget})未知</span>;
};
export default (field: any, formInstance: any = {}, widgets = {}) => {
  let Component: any = null;
  if (typeof field.type === 'function') {
    Component = field.type;
  } else {
    // 优先命中注入的widgets
    Component = widgets[field.type] || BuiltInWidgetMapping[field.type];
  }
  // 没有找到渲染提示组件
  if (Component === undefined) {
    return <Error widget={field.type} />;
  }
  // 扩展属性
  const ExpProps: any = {};
  if (['FormList', 'EditableTable'].includes(field.type)) {
    ExpProps.actionRef = field.actionRef;
    ExpProps.event = field.event;
    ExpProps.widgets = widgets;
  }
  return (
    <Component
      name={field.name}
      form={formInstance}
      disabled={field.disabled}
      readOnly={field.readOnly}
      readOnlyEmptyValueNode={field.readOnlyEmptyValueNode}
      {...ExpProps}
      {...field.props}
    />
  );
};

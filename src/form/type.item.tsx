import {
  AutoCompleteProps,
  CascaderProps,
  CheckboxProps,
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  RadioProps,
  RateProps,
  SelectProps,
  SliderSingleProps,
  SwitchProps,
  TimePickerProps,
  TimeRangePickerProps,
  TreeSelectProps,
  UploadProps,
} from 'antd';
import {
  GroupProps,
  PasswordProps,
  SearchProps,
  TextAreaProps,
} from 'antd/es/input';
import { ReactNode } from 'react';
import { FormLibInstance } from './type.instance';

export interface AsyncSelectProps extends Omit<SelectProps<any>, 'options'> {
  options?: any[] | ((form: FormLibInstance) => any);
}

/** FormItemProps */
export interface FormFieldProps<T = FieldProps>
  extends Omit<FormItemProps, 'required'> {
  key?: string | number;
  type?:
    | 'AutoComplete'
    | 'Input'
    | 'InputNumber'
    | 'Rate'
    | 'Slider'
    | 'TextArea'
    | 'Password'
    | 'Select'
    | 'RadioGroup'
    | 'CheckGroup'
    | 'DatePicker'
    | 'TimePicker'
    | 'TimeRange'
    | 'RangePicker'
    | 'TreeSelect'
    | 'Cascader'
    | 'Upload'
    | 'Switch'
    | 'AsyncSelect'
    | 'AsyncTreeSelect'
    | 'DebounceSelect'
    | 'AsyncCascader'
    | 'AsyncCheckGroup'
    | 'AsyncRadioGroup'
    | 'Render'
    | 'AsyncRender'
    | 'FormList'
    | 'BlockQuote'
    | 'FieldSet'
    | 'UploadImage'
    | 'CountInput'
    | 'BankCardInput'
    | 'AmountInput'
    | 'EditableTable'
    | 'RichEditor'
    | 'PcaSelect'
    | 'AddressLinkMap'
    | 'OssFileUpload'
    | String
    | Function;
  column?: number;
  /** 配置是否展示 */
  isShow?: (values: any) => boolean;
  /**
   * 占据的格子数
   * @default          1
   */
  span?: number;

  /** 跨列 */
  offset?: number;
  /**
   * 查询表单 是否点击更多展开
   * @default          0
   */
  ismore?: 0 | 1;
  /** 会在initialValues拦截处理下 */
  beforeReceive?: (initialValues: any) => any;
  /** 会在submit提交拦截处理下 */
  transform?: (values: any) => object;
  /**
   * 查询表单 改变是否触发查询
   * @default          0
   */
  autosearch?: 0 | 1;
  /** 自定义渲染逻辑 */
  itemRender?: (dom: React.ReactNode, options: any) => React.ReactNode;
  /** 设置副作用，当设置的字段发生变化时，会自动触发渲染 */
  effect?: Array<string | string[]>;
  /** 副作用变化时 自动重置字段 */
  effectResetField?: boolean | string[];
  /** 副作用变化时 自动清空字段 */
  effectClearField?: boolean;
  /** 副作用执行的钩子 */
  onEffect?: (name: string, form: FormLibInstance) => void;
  /** 样式 */
  style?: React.CSSProperties;
  /** 是否必填 */
  required?: ((form: FormLibInstance) => boolean) | boolean;
  useDefaultRules?: boolean;
  /** 是否只读 */
  readOnly?: ((form: FormLibInstance) => boolean) | boolean;
  /** 是否禁用 */
  disabled?: ((form: FormLibInstance) => boolean) | boolean;
  /** 标签宽度 */
  labelWidth?: number;
  /** 别名常用于 日期范围等设置，内部自动转换 */
  nameAlise?: string[];
  /** 表单项属性设置 */
  props?: FieldProps | T;
}

export type FieldProps =
  | InputProps
  | PasswordProps
  | SearchProps
  | GroupProps
  | TextAreaProps
  | InputNumberProps
  | AutoCompleteProps
  | UploadProps
  | SwitchProps
  | CascaderProps<any>
  | RateProps
  | SliderSingleProps
  | AsyncSelectProps
  | RadioProps
  | RadioGroupProps
  | CheckboxProps
  | DatePickerProps
  | TimePickerProps
  | TimeRangePickerProps
  | TreeSelectProps<any>
  | ExtensionProps;

/** 添加扩展属性 */
export interface ExtensionProps {
  style?: React.CSSProperties;
  // Render、AsyncRender
  render?: (
    FormLibInstance: FormLibInstance
  ) => Promise<React.ReactNode> | React.ReactNode;
  spin?: boolean;
  // UploadImage
  limitSize?: number;
  text?: string;
  // AsyncCascader
  initOptions?: (defaultValue: any, FormLibInstance: FormLibInstance) => void;
  loadData?: Function;
  // DebounceSelect
  fetchOptions?: (keyword: string, FormLibInstance: FormLibInstance) => void;
  debounceTimeout?: number;
  mode?: 'multiple' | 'tags' | 'split' | 'function' | 'json' | 'diff' | 'less';
  // FormList
  label?: string | React.ReactNode;
  maxCount?: number;
  leastOne?: boolean;
  grid?: any;
  fields?: FormFieldProps[];
  // BlockQuote
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
  // TextArea
  showCount?: boolean;
  // FieldSet
  column?: number;
  children?: FormFieldProps[];
  extra?: ReactNode[];
  // 只读模式下日期范围的分割符默认 ~
  splitLabel?: string;
  // EditableTable
  rowKey?: string;
  columns?: any;
  creatorButtonProps?: any;
  onBeforeChange?: any;
  onBeforeDelete?: any;
  // AsyncSelect 空提示信息
  emptyDescription?: ReactNode;
  // RangeInput
  startProps?: InputNumberProps;
  endProps?: InputNumberProps;
  showCheckAll?:
    | boolean
    | {
        text: ReactNode;
      };
  /**
   * 是否开启异步下拉选缓存
   * @default   true
   */
  openOptionsCache?: boolean;
  /**
   * formList 子表单新增的按钮文案自定义
   */
  operationText?: string;
  /** monaco 编辑器语言类型
   * @default javascript
   */
  language?: string;
  /** monaco 编辑器主题颜色
   * @default vs-dark
   */
  theme?: string;
  /** monaco 防抖时间
   * @default 300
   */
  debounceTime?: number;
  /** 是否开启select options value 去重
   * @default false
   */
  autoFilterRepeatValue?: boolean;
  onFinish?: any;
  /** PcaSelect属性 */
  useNewApi?: boolean;
  filterFunction?: (item: any) => boolean;
  request?: any;
  baseURL?: string;
  // OssFileUpload
  onFileChange?: (params: {
    type: 'file-upload-success' | 'get-file' | 'file-upload-error';
    data?: any;
  }) => void;
  /** 富文本编辑器图片上传是否走智锤的接口
   * @default false
  /**
   * OSS Upload urlPrefix
   * @default ''
   */
  urlPrefix?: string;
  /**
   * OSS Upload minAspectRatio 最小宽高比
   */
  ossInfoNormal?: boolean;
}
const Hello: React.FC<FormFieldProps> = () => null;

export default Hello;

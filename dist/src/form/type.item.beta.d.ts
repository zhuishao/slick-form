import { OssFileUploadProps } from '@/create-widget/business/oss-file-upload/type';
import { AutoCompleteProps, CascaderProps, CheckboxProps, DatePickerProps, FormItemProps, InputNumberProps, InputProps, RadioGroupProps, RadioProps, RateProps, SelectProps, SliderSingleProps, SwitchProps, TimePickerProps, TimeRangePickerProps, TreeSelectProps, UploadProps } from 'antd';
import { GroupProps, PasswordProps, SearchProps, TextAreaProps } from 'antd/es/input';
import { ReactNode } from 'react';
import { FormLibInstance } from './type.instance';
export interface AsyncSelectProps extends Omit<SelectProps<any>, 'options'> {
    options?: any[] | ((form: FormLibInstance) => any);
    autoFilterRepeatValue?: boolean;
}
export declare type FormFiledItemType = 'AutoComplete' | 'Input' | 'InputNumber' | 'Rate' | 'Slider' | 'TextArea' | 'Password' | 'Select' | 'RadioGroup' | 'CheckGroup' | 'DatePicker' | 'TimePicker' | 'TimeRange' | 'RangePicker' | 'TreeSelect' | 'Cascader' | 'Upload' | 'Switch' | 'AsyncSelect' | 'AsyncTreeSelect' | 'DebounceSelect' | 'AsyncCascader' | 'AsyncCheckGroup' | 'AsyncRadioGroup' | 'Render' | 'AsyncRender' | 'FormList' | 'BlockQuote' | 'FieldSet' | 'UploadImage' | 'CountInput' | 'BankCardInput' | 'AmountInput' | 'EditableTable' | 'RichEditor' | 'PcaSelect' | 'AddressLinkMap' | 'OssFileUpload' | Function;
export declare type FieldPropsByType<T extends FormFiledItemType> = T extends 'AutoComplete' ? {
    type: T;
    props?: AutoCompleteProps;
} : T extends 'Input' ? {
    type: T;
    props?: InputProps;
} : T extends 'InputNumber' ? {
    type: T;
    props?: InputNumberProps;
} : T extends 'Rate' ? {
    type: T;
    props?: RateProps;
} : T extends 'Slider' ? {
    type: T;
    props?: SliderSingleProps;
} : T extends 'TextArea' ? {
    type: T;
    props?: TextAreaProps;
} : T extends 'Password' ? {
    type: T;
    props?: PasswordProps;
} : T extends 'Select' ? {
    type: T;
    props?: SelectProps<any> & {
        autoFilterRepeatValue?: boolean;
    };
} : T extends 'RadioGroup' ? {
    type: T;
    props?: RadioGroupProps;
} : T extends 'CheckGroup' ? {
    type: T;
    props?: CheckboxProps;
} : T extends 'DatePicker' ? {
    type: T;
    props?: DatePickerProps;
} : T extends 'TimePicker' ? {
    type: T;
    props?: TimePickerProps;
} : T extends 'TimeRange' ? {
    type: T;
    props?: TimeRangePickerProps;
} : T extends 'RangePicker' ? {
    type: T;
    props?: DatePickerProps;
} : T extends 'TreeSelect' ? {
    type: T;
    props?: TreeSelectProps<any>;
} : T extends 'Cascader' ? {
    type: T;
    props?: CascaderProps<any>;
} : T extends 'Upload' ? {
    type: T;
    props?: UploadProps;
} : T extends 'Switch' ? {
    type: T;
    props?: SwitchProps;
} : T extends 'AsyncSelect' ? {
    type: T;
    props?: FieldProps;
} : T extends 'AsyncTreeSelect' ? {
    type: T;
    props?: FieldProps;
} : T extends 'DebounceSelect' ? {
    type: T;
    props?: FieldProps;
} : T extends 'AsyncCascader' ? {
    type: T;
    props?: FieldProps;
} : T extends 'AsyncCheckGroup' ? {
    type: T;
    props?: FieldProps;
} : T extends 'AsyncRadioGroup' ? {
    type: T;
    props?: FieldProps;
} : T extends 'Render' ? {
    type: T;
    props?: FieldProps;
} : T extends 'AsyncRender' ? {
    type: T;
    props?: FieldProps;
} : T extends 'FormList' ? {
    type: T;
    props?: FieldProps;
} : T extends 'BlockQuote' ? {
    type: T;
    props?: FieldProps;
} : T extends 'FieldSet' ? {
    type: T;
    props?: FieldProps;
} : T extends 'UploadImage' ? {
    type: T;
    props?: FieldProps;
} : T extends 'CountInput' ? {
    type: T;
    props?: FieldProps;
} : T extends 'BankCardInput' ? {
    type: T;
    props?: FieldProps;
} : T extends 'AmountInput' ? {
    type: T;
    props?: FieldProps;
} : T extends 'EditableTable' ? {
    type: T;
    props?: FieldProps;
} : T extends 'RichEditor' ? {
    type: T;
    props?: FieldProps;
} : T extends 'PcaSelect' ? {
    type: T;
    props?: FieldProps;
} : T extends 'AddressLinkMap' ? {
    type: T;
    props?: FieldProps;
} : T extends 'OssFileUpload' ? {
    type: T;
    props?: OssFileUploadProps;
} : T extends String ? {
    type: T;
    props?: FieldProps;
} : T extends Function ? {
    type: T;
    props?: FieldProps;
} : FieldProps;
interface CommonProps extends Omit<FormItemProps, 'required'> {
    key?: string | number;
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
}
export declare type FormFieldProps<P = {}> = CommonProps & {
    props?: P;
} & (FieldPropsByType<'AutoComplete'> | FieldPropsByType<'Input'> | FieldPropsByType<'InputNumber'> | FieldPropsByType<'Rate'> | FieldPropsByType<'Slider'> | FieldPropsByType<'TextArea'> | FieldPropsByType<'Password'> | FieldPropsByType<'Select'> | FieldPropsByType<'RadioGroup'> | FieldPropsByType<'CheckGroup'> | FieldPropsByType<'DatePicker'> | FieldPropsByType<'TimePicker'> | FieldPropsByType<'TimeRange'> | FieldPropsByType<'RangePicker'> | FieldPropsByType<'TreeSelect'> | FieldPropsByType<'Cascader'> | FieldPropsByType<'Upload'> | FieldPropsByType<'Switch'> | FieldPropsByType<'AsyncSelect'> | FieldPropsByType<'AsyncTreeSelect'> | FieldPropsByType<'DebounceSelect'> | FieldPropsByType<'AsyncCascader'> | FieldPropsByType<'AsyncCheckGroup'> | FieldPropsByType<'AsyncRadioGroup'> | FieldPropsByType<'Render'> | FieldPropsByType<'AsyncRender'> | FieldPropsByType<'FormList'> | FieldPropsByType<'BlockQuote'> | FieldPropsByType<'FieldSet'> | FieldPropsByType<'UploadImage'> | FieldPropsByType<'CountInput'> | FieldPropsByType<'BankCardInput'> | FieldPropsByType<'AmountInput'> | FieldPropsByType<'EditableTable'> | FieldPropsByType<'RichEditor'> | FieldPropsByType<'PcaSelect'> | FieldPropsByType<'AddressLinkMap'> | FieldPropsByType<'OssFileUpload'>);
export declare type FieldProps = InputProps | PasswordProps | SearchProps | GroupProps | TextAreaProps | InputNumberProps | AutoCompleteProps | UploadProps | SwitchProps | CascaderProps<any> | RateProps | SliderSingleProps | AsyncSelectProps | RadioProps | RadioGroupProps | CheckboxProps | DatePickerProps | TimePickerProps | TimeRangePickerProps | TreeSelectProps<any> | ExtensionProps | OssFileUploadProps;
/** 添加扩展属性 */
export interface ExtensionProps {
    style?: React.CSSProperties;
    render?: (FormLibInstance: FormLibInstance) => Promise<React.ReactNode> | React.ReactNode;
    spin?: boolean;
    limitSize?: number;
    text?: string;
    initOptions?: (defaultValue: any, FormLibInstance: FormLibInstance) => void;
    loadData?: Function;
    fetchOptions?: (keyword: string, FormLibInstance: FormLibInstance) => void;
    debounceTimeout?: number;
    mode?: 'multiple' | 'tags' | 'split' | 'function' | 'json' | 'diff' | 'less';
    label?: string | React.ReactNode;
    maxCount?: number;
    leastOne?: boolean;
    grid?: any;
    fields?: FormFieldProps[];
    title?: string | React.ReactNode;
    subTitle?: string | React.ReactNode;
    subLabel?: string | React.ReactNode;
    showCount?: boolean;
    column?: number;
    children?: FormFieldProps[];
    extra?: ReactNode[];
    splitLabel?: string;
    rowKey?: string;
    columns?: any;
    creatorButtonProps?: any;
    onBeforeChange?: any;
    onBeforeDelete?: any;
    emptyDescription?: ReactNode;
    startProps?: InputNumberProps;
    endProps?: InputNumberProps;
    showCheckAll?: boolean | {
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
    useNewApi?: boolean | 2;
    filterFunction?: (item: any) => boolean;
}
declare const Hello: React.FC<FormFieldProps>;
export default Hello;

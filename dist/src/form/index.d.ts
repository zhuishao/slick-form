import { AutoCompleteProps, CheckboxProps, DatePickerProps, InputNumberProps, InputProps, RadioGroupProps, RateProps, SelectProps, SliderSingleProps, SwitchProps, TimePickerProps, TimeRangePickerProps, TreeSelectProps, UploadProps } from 'antd';
import { TextAreaProps } from 'antd/es/input/TextArea';
import React from 'react';
import { FormLibProps } from './type.form';
import { AsyncSelectProps, ExtensionProps, FormFieldProps } from './type.item';
/** 组件入口 */
declare const FormLib: {
    (formProps: FormLibProps): React.JSX.Element;
    /** 基础ui */
    AutoComplete(props: AutoCompleteProps | FormFieldProps): React.JSX.Element;
    InputNumber(props: InputNumberProps | FormFieldProps): React.JSX.Element;
    Input(props: InputProps | FormFieldProps): React.JSX.Element;
    Select(props: SelectProps<any> | FormFieldProps): React.JSX.Element;
    Password(props: InputProps | FormFieldProps): React.JSX.Element;
    TextArea(props: TextAreaProps | FormFieldProps): React.JSX.Element;
    Rate(props: RateProps | FormFieldProps): React.JSX.Element;
    Slider(props: SliderSingleProps | FormFieldProps): React.JSX.Element;
    RadioGroup(props: RadioGroupProps | FormFieldProps): React.JSX.Element;
    CheckGroup(props: CheckboxProps | FormFieldProps): React.JSX.Element;
    DatePicker(props: DatePickerProps | FormFieldProps): React.JSX.Element;
    RangePicker(props: DatePickerProps | FormFieldProps): React.JSX.Element;
    TimePicker(props: TimePickerProps | FormFieldProps): React.JSX.Element;
    TimeRange(props: TimeRangePickerProps | FormFieldProps): React.JSX.Element;
    Cascader(props: FormFieldProps): React.JSX.Element;
    TreeSelect(props: TreeSelectProps<any> | FormFieldProps): React.JSX.Element;
    Upload(props: UploadProps | FormFieldProps): any;
    Switch(props: SwitchProps | FormFieldProps): React.JSX.Element;
    /** 扩展 */
    AsyncSelect(props: AsyncSelectProps | FormFieldProps): React.JSX.Element;
    AsyncTreeSelect(props: TreeSelectProps<any> | FormFieldProps): React.JSX.Element;
    DebounceSelect(props: SelectProps<any> | FormFieldProps | ExtensionProps): React.JSX.Element;
    AsyncCascader(props: FormFieldProps | ExtensionProps): React.JSX.Element;
    AsyncCheckGroup(props: CheckboxProps | FormFieldProps): React.JSX.Element;
    AsyncRadioGroup(props: RadioGroupProps | FormFieldProps): React.JSX.Element;
    BlockQuote(props: ExtensionProps | FormFieldProps): React.JSX.Element;
    FieldSet(props: ExtensionProps | FormFieldProps): React.JSX.Element;
    UploadImage(props: UploadProps | FormFieldProps | ExtensionProps): React.JSX.Element;
    useForm(): import("./type.instance").FormLibInstance[];
};
export default FormLib;

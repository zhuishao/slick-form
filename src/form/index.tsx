/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AsyncOptionsCache, getGlobalConfigByName, uuid } from '@/util';
import {
  AutoCompleteProps,
  CheckboxProps,
  DatePickerProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  RateProps,
  SelectProps,
  SliderSingleProps,
  SwitchProps,

  // CascaderProps,
  TimePickerProps,
  TimeRangePickerProps,
  TreeSelectProps,
  UploadProps,
} from 'antd';
import { TextAreaProps } from 'antd/es/input/TextArea';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BuiltInWidgetMapping } from '../create-widget';
import Form from './form';
import { defaultFormConfig } from './tool';
import { FormLibProps, FormRefInstance } from './type.form';
import { AsyncSelectProps, ExtensionProps, FormFieldProps } from './type.item';
import { jsxToSchema } from './util';

/** 组件入口 */
const FormLib = (formProps: FormLibProps) => {
  const globalConfig = getGlobalConfigByName('Form', formProps);
  const {
    form = FormLib.useForm()[0],
    onMount,
    formConfig,
    ...props
  } = Object.assign({}, formProps, globalConfig, {
    formConfig: {
      ...defaultFormConfig, // 默认配置
      ...formProps.formConfig, // 传入的props
      ...globalConfig.formConfig, // 全局配置
    },
  });
  const [reload, setReload] = useState(Math.random());
  const [initialValues, setInitialValues] = useState(props.initialValues);
  const forceUpdate = values => {
    setInitialValues(values);
    // 重新构建下
    setReload(Math.random());
  };
  const fields: any = props.fields || [];
  // 如果有孩子解析孩子
  if (props.children) {
    jsxToSchema(props.children, fields);
  }
  // 判断是否是初次加载
  const firstRender: any = useRef(true);
  const name: string = useMemo(() => {
    return `form_${uuid(10)}`;
  }, []);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      onMount?.(form); // 第一次渲染完毕将Form实例吐出
    }
    return () => {
      // 卸载清除缓存
      Object.keys(AsyncOptionsCache).forEach(key => {
        if (key.startsWith(name)) {
          delete AsyncOptionsCache[key];
        }
      });
    };
  }, []);
  return (
    <Form
      {...props}
      key={reload}
      form={form}
      name={name}
      initialValues={initialValues}
      fields={fields}
      forceUpdate={forceUpdate}
      formConfig={formConfig}
    />
  );
};

/** 基础ui */
FormLib.AutoComplete = (props: AutoCompleteProps | FormFieldProps) => {
  return <div />;
};
FormLib.InputNumber = (props: InputNumberProps | FormFieldProps) => {
  return <div />;
};
FormLib.Input = (props: InputProps | FormFieldProps) => {
  return <div />;
};
FormLib.Select = (props: SelectProps<any> | FormFieldProps) => {
  return <div />;
};
FormLib.Password = (props: InputProps | FormFieldProps) => {
  return <div />;
};
FormLib.TextArea = (props: TextAreaProps | FormFieldProps) => {
  return <div />;
};
FormLib.Rate = (props: RateProps | FormFieldProps) => {
  return <div />;
};
FormLib.Slider = (props: SliderSingleProps | FormFieldProps) => {
  return <div />;
};
FormLib.RadioGroup = (props: RadioGroupProps | FormFieldProps) => {
  return <div />;
};
FormLib.CheckGroup = (props: CheckboxProps | FormFieldProps) => {
  return <div />;
};
FormLib.DatePicker = (props: DatePickerProps | FormFieldProps) => {
  return <div />;
};
FormLib.RangePicker = (props: DatePickerProps | FormFieldProps) => {
  return <div />;
};
FormLib.TimePicker = (props: TimePickerProps | FormFieldProps) => {
  return <div />;
};
FormLib.TimeRange = (props: TimeRangePickerProps | FormFieldProps) => {
  return <div />;
};
FormLib.Cascader = (props: FormFieldProps) => {
  return <div />;
};
FormLib.TreeSelect = (props: TreeSelectProps<any> | FormFieldProps) => {
  return <div />;
};
FormLib.Upload = (props: UploadProps | FormFieldProps): any => {
  return <div />;
};
FormLib.Switch = (props: SwitchProps | FormFieldProps) => {
  return <div />;
};
/** 扩展 */
FormLib.AsyncSelect = (props: AsyncSelectProps | FormFieldProps) => {
  return <div />;
};
FormLib.AsyncTreeSelect = (props: TreeSelectProps<any> | FormFieldProps) => {
  return <div />;
};
FormLib.DebounceSelect = (
  props: SelectProps<any> | FormFieldProps | ExtensionProps
) => {
  return <div />;
};
FormLib.AsyncCascader = (props: FormFieldProps | ExtensionProps) => {
  return <div />;
};
FormLib.AsyncCheckGroup = (props: CheckboxProps | FormFieldProps) => {
  return <div />;
};
FormLib.AsyncRadioGroup = (props: RadioGroupProps | FormFieldProps) => {
  return <div />;
};
FormLib.BlockQuote = (props: ExtensionProps | FormFieldProps) => {
  return <div />;
};
FormLib.FieldSet = (props: ExtensionProps | FormFieldProps) => {
  return <div />;
};
FormLib.UploadImage = (
  props: UploadProps | FormFieldProps | ExtensionProps
) => {
  return <div />;
};
FormLib.useForm = () => {
  const ref: FormRefInstance = React.useRef({
    getValues: () => {},
    setValues: data => {},
    clearValues: () => {},
    mergeFieldByName: (name, newField: FormFieldProps) => {},
    getFieldByName: name => {},
    touchFieldsRender: (names: string[]) => {},
    getFieldOption: async (fieldName: string) => {},
    setFieldOption: async (fieldName: string, options: any) => {},
    submit: () => {},
    setFieldsValue: (value: any) => {},
    getFieldValue: (name: string) => {},
    validateFields: async (nameList?: []) => {},
    getFieldsValue: (
      nameList?: string[] | true,
      filterFunc?: (meta: any) => boolean
    ) => {},
    setInitialValues: (params?) => {},
    search: (params?) => {},
    reset: () => {},
    refresh: () => {},
    resetFields: (fields?: string[]) => {},
    setFormLoading: () => {},
    setFooterDisabled: () => {},
    setFooterActions: () => {},
    setFieldValue: () => {},
  });
  return [ref.current];
};
/** 挂载 */
Object.assign(FormLib, BuiltInWidgetMapping);
export default FormLib;

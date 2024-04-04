/* eslint-disable no-await-in-loop */
import { AsyncOptionsCache, getGlobalConfigByName } from '@/util';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { FormLibInstance } from './type.instance';
import { isPopupContainer, scrollToElement } from './util';

const { defaultInputMaxLength = 64 } = getGlobalConfigByName('Antd', {});

/** 默认配置 */
export const defaultFormConfig = {
  defaultInputMaxLength: defaultInputMaxLength || 64,
  autoSetPopupContainer: true,
  autoTransfromDatePicker: true,
  autoSelectSearch: true,
};

/** 前置格式转化下、默认处理一些逻辑 */
export const transformSchema = (
  fields: any[],
  name: string,
  column = 1,
  formConfig = defaultFormConfig
) => {
  fields?.forEach((field: any) => {
    // 兼容下
    if (field.props === undefined) {
      field.props = {};
    }
    if (field.type === 'FieldSet' && Array.isArray(field.props.children)) {
      // 递归下
      return transformSchema(field.props.children, name, column, formConfig);
    }
    if (field.type === 'FormList' && Array.isArray(field.props.fields)) {
      // 递归下
      transformSchema(field.props.fields, name, undefined, formConfig);
    }
    // Input默认长度限制
    if (['Input', 'CountInput'].includes(field.type)) {
      field.props.maxLength =
        field.props.maxLength || formConfig.defaultInputMaxLength;
    }

    // 默认开启allowClear和设置placeholder
    if (
      [
        'Input',
        'InputNumber',
        'CountInput',
        'DebounceInput',
        'BankCardInput',
        'AmountInput',
        'TextArea',
        'Password',
      ].includes(field.type)
    ) {
      if (
        !['InputNumber', 'BankCardInput', 'AmountInput'].includes(field.type)
      ) {
        // 不支持allowClear属性
        field.props.allowClear =
          field.props.allowClear === undefined ? true : field.props.allowClear; // 默认允许清除
      }
      field.props.placeholder =
        field.props.placeholder || `请输入${field.label || ''}`; // 默认提示
    }
    // 处理popup类挂载容器
    if (isPopupContainer(field.type)) {
      let popupName = field.name;
      if (Array.isArray(popupName)) {
        // 处理FormList属性名是数组的问题
        popupName = popupName.join('_');
      }
      field.props.allowClear =
        field.props.allowClear === undefined ? true : field.props.allowClear; // 默认允许清除
      // 区间查询不需要设置
      if (!['RangePicker', 'TimeRange'].includes(field.type)) {
        field.props.placeholder =
          field.props.placeholder || `请选择${field.label || ''}`; // 默认提示
      }
      // 生成挂载容器标识
      field.popupid = `${name}_${popupName}`;
      // 挂载到指定的popupid
      if (
        typeof field.props.getPopupContainer !== 'function' &&
        formConfig.autoSetPopupContainer
      ) {
        field.props.getPopupContainer = () => {
          return document.querySelector(
            `[popupid=${field.popupid}] .ant-form-item-control`
          );
        };
      }
    }
    // 配置了showSearch的查询框默认开启模糊匹配
    if (
      ['Select', 'AsyncSelect'].includes(field.type) &&
      typeof field.props.filterOption === 'undefined' &&
      formConfig.autoSelectSearch
    ) {
      field.props.showSearch = field.props.showSearch || true; // 自动开启
      field.props.filterOption = (key, option: any) => {
        const labelAlise = field.props.fieldNames?.label || 'label'; // 获取别名
        return option[labelAlise]?.indexOf(key) >= 0;
      };
    }
    // 简化 BlockQuote 写法、不用写span和key
    if (field.type === 'BlockQuote') {
      field.span = field.span || column;
      field.key = field.props.title;
    }
    // 基于gridColumnStart设置列数
    const style = field.style || {};

    if (field.span && field.offset) {
      // 使用 grid-column 来同时指定偏移和跨越的列数
      style.gridColumn = `${field.offset + 1} / span ${field.span}`;
    } else if (field.span) {
      // 仅指定跨越的列数
      style.gridColumnStart = `span ${field.span}`;
    } else if (field.offset) {
      // 仅指定偏移的列数
      style.gridColumnStart = `${field.offset + 1}`;
    }

    // 将计算好的样式赋值给field.style
    field.style = {
      ...style, // 合并原有的样式
      ...field.style, // 如果field上已经有style，则合并进来，避免覆盖
    };
    // 日期格式转换默认帮处理下
    if (
      ['DatePicker', 'TimePicker'].includes(field.type) &&
      formConfig.autoTransfromDatePicker
    ) {
      const format =
        field.props.format ||
        (field.type === 'DatePicker' ? 'YYYY-MM-DD' : 'hh:mm:ss');
      if (!field.beforeReceive) {
        // string | number -> moment
        field.beforeReceive = values => {
          return (
            values[field.name] &&
            (typeof values[field.name] === 'number'
              ? dayjs(values[field.name])
              : dayjs(values[field.name], format))
          );
        };
      }
      if (!field.transform) {
        // moment -> string
        field.transform = values => {
          const dateMoment = values[field.name];
          return {
            [field.name]: dateMoment?.format(format),
          };
        };
      }
    }
    // RangeInput 默认处理
    if (field.type === 'RangeInput') {
      // 没有配置 nameAlise 不做处理
      if (!Array.isArray(field.nameAlise)) {
        return;
      }
      const start = field.nameAlise?.[0];
      const end = field.nameAlise?.[1];
      if (!field.beforeReceive) {
        field.beforeReceive = values => {
          return (values[start] || values[end]) && [values[start], values[end]];
        };
      }
      if (!field.transform) {
        field.transform = values => {
          const nowValue = values[field.name];
          return {
            [start]: nowValue?.[0],
            [end]: nowValue?.[1],
          };
        };
      }
    }
    // 日期区间格式转换默认帮处理下
    if (
      ['RangePicker', 'TimeRange'].includes(field.type) &&
      formConfig.autoTransfromDatePicker
    ) {
      // 没有配置 nameAlise 不做处理
      if (!Array.isArray(field.nameAlise)) {
        return;
      }
      const format =
        field.props.format ||
        (field.type === 'RangePicker' ? 'YYYY-MM-DD' : 'hh:mm:ss');
      const startName = field.nameAlise?.[0];
      const endName = field.nameAlise?.[1];
      if (!field.beforeReceive) {
        field.beforeReceive = values => {
          let start;
          let end;
          if (values[startName]) {
            start =
              typeof values[startName] === 'number'
                ? dayjs(values[startName])
                : dayjs(values[startName], format);
          }
          if (values[endName]) {
            end =
              typeof values[endName] === 'number'
                ? dayjs(values[endName])
                : dayjs(values[endName], format);
          }
          // return [start, end];
          return start || end ? [start, end] : undefined;
        };
      }
      if (!field.transform) {
        // moment- > string
        field.transform = values => {
          const dateMoment = values[field.name];
          return dateMoment
            ? {
                [startName]: dateMoment?.[0]
                  ? dateMoment[0].format(format)
                  : undefined,
                [endName]: dateMoment?.[1]
                  ? dateMoment[1].format(format)
                  : undefined,
              }
            : {
                [startName]: undefined,
                [endName]: undefined,
              };
        };
      }
    }
    // 省市区格式转换默认帮处理下
    if (field.type === 'PcaSelect') {
      // 没有配置 nameAlise 不做处理
      if (!Array.isArray(field.nameAlise)) {
        return;
      }
      if (!field.beforeReceive) {
        field.beforeReceive = values => {
          return values[field.nameAlise[0]]
            ? [
                String(values[field.nameAlise[0]]),
                String(values[field.nameAlise[1]] || ''),
                String(values[field.nameAlise[2]] || ''),
              ].filter(i => i)
            : undefined;
        };
      }
      if (!field.transform) {
        field.transform = values => {
          const city = values[field.name];
          return (
            city && {
              [field.nameAlise[0]]: city[0],
              [field.nameAlise[1]]: city[1],
              [field.nameAlise[2]]: city[2],
            }
          );
        };
      }
    }
    // 处理DateTimeHabit的transform
    if (field.type === 'DateTimeHabit') {
      if (!field.beforeReceive) {
        field.beforeReceive = values => {
          if (!values[field.name]) return { date: undefined, time: undefined };
          return {
            date: dayjs(values[field.name]),
            time: values[field.name]?.split?.(' ')[1],
          };
        };
      }
      if (!field.transform) {
        field.transform = values => {
          if (!values[field.name]?.date) {
            return { [field.name]: undefined };
          }
          return {
            [field.name]: `${values[field.name].date.format('YYYY-MM-DD')} ${
              values[field.name].time
            }`,
          };
        };
      }
    }
  });
};
/** 是否是符合 FieldSet */
export const isFieldSet = field => {
  return (
    field.type === 'FieldSet' &&
    (Array.isArray(field.props?.children) ||
      typeof field.props?.children === 'function')
  );
};
/** 处理 transform */
export const getCombination = (
  values: any,
  formFields,
  options: {
    name: string;
    form: FormLibInstance;
    initialValues: object;
  },
  combination = {}
) => {
  formFields?.forEach((field: any) => {
    // 这里过滤下不展示、或者没有定义name的字段
    if (
      field.isShow?.({
        ...options.initialValues, // 保留默认值
        ...options.form.getFieldsValue(), // 当前表单值
        ...combination, // FieldSet兼容
      }) === false ||
      field.name === undefined
    ) {
      return;
    }
    if (isFieldSet(field) && field.name) {
      // 递归处理下
      const childrenFields =
        typeof field.props?.children === 'function'
          ? field.props?.children(options.form)
          : field.props?.children;
      // 格式处理下
      if (typeof field.props?.children === 'function') {
        transformSchema(childrenFields, options.name, field.props.column);
      }
      combination[field.name] = {}; // 创建容器
      return getCombination(
        values,
        childrenFields,
        options,
        combination[field.name]
      );
    }
    Object.assign(
      combination,
      typeof field.transform === 'function'
        ? field.transform({ ...values, ...combination })
        : {
            [field.name]: values[field.name],
          }
    );
    delete values[field.name]; // remove
  });
  return { ...values, ...combination };
};
/** 处理 beforeReceive */
export const parseBeforeReceive = (
  values: any,
  formFields,
  options: {
    name: string;
    form: FormLibInstance;
    initialValues: object;
  },
  parseValue = {}
) => {
  formFields?.forEach((field: any) => {
    if (isFieldSet(field) && field.name) {
      // 递归处理下
      const childrenFields =
        typeof field.props?.children === 'function'
          ? field.props?.children(
              {
                ...options.form,
                initialValues: options.initialValues,
              },
              true
            )
          : field.props?.children;
      // 格式处理下
      if (typeof field.props?.children === 'function') {
        transformSchema(childrenFields, options.name, field.props.column);
      }
      return parseBeforeReceive(
        values[field.name] || {},
        childrenFields,
        options,
        parseValue
      );
    }
    // 过滤不展示的字段
    if (typeof field.isShow === 'function' && field.isShow(values) === false) {
      return;
    }
    parseValue[field.name] =
      typeof field.beforeReceive === 'function'
        ? field.beforeReceive(values)
        : values[field.name];
  });
  return {
    ...values,
    ...parseValue,
  };
};
/** 扩展form实例方法 */
export const expansionInstanceMethod = ({
  form,
  antdForm,
  name,
  initialValues,
  cloneFields,
  event,
  scrollToFirstError,
  getScrollContainer,
  actionRef,
  setSpin,
  forceUpdate,
  onChange,
}) => {
  /** 实例扩展方法 */
  Object.assign(form, {
    ...antdForm,
    initialValues,
    name,
    /** 新增getValues、处理字段转换字段等问题 */
    getValues: () => {
      const values = antdForm.getFieldsValue();
      return getCombination({ ...values }, cloneFields, {
        name,
        form,
        initialValues,
      });
    },
    /** 新增setValues、处理beforeReceive等逻辑 */
    setValues: (data: any) => {
      const values = parseBeforeReceive(data, cloneFields, {
        name,
        form,
        initialValues,
      });
      antdForm.setFieldsValue(values);
    },
    /** 新增submit、负责处理规则校验、字段转换等问题 */
    submit: async () => {
      try {
        const values = await antdForm.validateFields(); // 校验
        const arr = Object.keys(actionRef.current);
        for (let i = 0; i < arr.length; i++) {
          const key = arr[i];
          if (typeof actionRef.current[key].validateFields === 'function') {
            await actionRef.current[key].validateFields(); // TableList 子表单校验
          }
        }
        return getCombination({ ...values }, cloneFields, {
          name,
          form,
          initialValues,
        });
      } catch (errorInfo) {
        // 开启自动定位到第一个校验异常的位置
        if (scrollToFirstError) {
          // dom .ant-form-item-has-error 渲染有延迟
          setTimeout(() => {
            const el = getScrollContainer?.() || document;

            scrollToElement(el, el?.querySelector('.ant-form-item-has-error'));
          }, 50);
        }
        // eslint-disable-next-line no-console
        console.error('validator fail ->', errorInfo);
        throw errorInfo;
      }
    },
    /** 触发指定字段重新渲染 */
    touchFieldsRender: (names: string[]) => {
      event.publishFields(names); // 批量发布通知
    },
    // 合并 Field
    mergeFieldByName: (fieldName, newField, customizer) => {
      event.publishMergeField(fieldName, newField, customizer); // 更新合并Field指令
    },
    // 获取 Field
    getFieldByName: (fieldName: string) => {
      const field = cloneFields.find(i => i.name === fieldName);
      return cloneDeep(field); // 返回拷贝体，剔除引用关系
    },
    /** 获取指定field的异步加载options */
    getFieldOption: async (fieldName: string) => {
      if (!(await AsyncOptionsCache[`${name}_${fieldName}`])) {
        await new Promise(res => setTimeout(res, 100, true)); // 没有找到先等待0.1秒让组件effect执行请求发出去
      }
      return (await AsyncOptionsCache[`${name}_${fieldName}`]) || [];
    },
    /** 手动暂存异步加载的options */
    setFieldOption: async (fieldName: string, options: any) => {
      AsyncOptionsCache[`${name}_${fieldName}`] = options;
    },
    /** 清空表单值，不会还原到默认值 */
    clearValues: async (names?) => {
      if (names) {
        names.forEach((fieldName: string) => {
          form.setFieldsValue({
            [fieldName]: undefined,
          });
        });
      } else {
        form.setFieldsValue(
          Object.keys(form.getFieldsValue()).reduce((name1, name2) => {
            return { ...name1, ...{ [name2]: undefined } };
          }, {})
        );
      }
    },
    /** 获取 FormList 引用 */
    formListInstance: actionRef.current,
    /** 控制加载中 */
    setFormLoading: setSpin,
    /** 接受新的默认值，form重新渲染 */
    setInitialValues: values => {
      forceUpdate(values);
    },
    /** 设置值的时候，会触发 OnValuesChange */
    setFieldsValueTouchOnValuesChange: (value: any) => {
      form.setFieldsValue(value);
      // 触发 OnValuesChange
      onChange(value, form.getFieldsValue(true));
    },
  });
};

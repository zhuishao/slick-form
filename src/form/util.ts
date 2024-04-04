/* eslint-disable no-param-reassign */
import { getGlobalConfigByName, isEmpty } from '@/util';
import dayjs from 'dayjs';
import { BuiltInWidgetMapping } from '../create-widget';

// 表单项是否弹出层
export const isPopupContainer = (type: string) => {
  return [
    'AsyncSelect',
    'AsyncCascader',
    'DebounceSelect',
    'Select',
    'AutoComplete',
    'Cascader',
    'TreeSelect',
    'AsyncTreeSelect',
    'DatePicker',
    'RangePicker',
    'TimeRange',
    'TimePicker',
  ].includes(type);
};
/** Item扩展的属性 */
export const isExpansionItemProps = {
  props: '',
  isShow: '',
  transform: '',
  __parentKey__: '',
  autosearch: '',
  effect: '',
  onEffect: '',
  effectResetField: '',
  effectClearField: '',
  type: '',
  beforeReceive: '',
  span: '',
  itemRender: '',
  required: '',
  readOnly: '',
  disabled: '',
  labelWidth: '',
  nameAlise: '',
  useDefaultRules: '',
};
/** 是Item的属性 */
export const isItemProps = {
  colon: '',
  dependencies: '',
  extra: '',
  getValueFromEvent: '',
  getValueProps: '',
  hasFeedback: '',
  help: '',
  hidden: '',
  htmlFor: '',
  initialValue: '',
  label: '',
  labelAlign: '',
  labelCol: '',
  messageVariables: '',
  name: '',
  normalize: '',
  noStyle: '',
  preserve: '',
  required: '',
  rules: '',
  shouldUpdate: '',
  tooltip: '',
  trigger: '',
  validateFirst: '',
  validateStatus: '',
  validateTrigger: '',
  valuePropName: '',
  wrapperCol: '',
  ...isExpansionItemProps,
};

// 渲染之前做些事情
export const beforeFieldRender = (field: any, form: any) => {
  const {
    autoValidInputNumber,
    autoValidInputLen,
    defaultInputMaxLength = 64,
    autoValidTextAreaLen,
    autoValidRequiredInputSpace,
  } = getGlobalConfigByName('Antd', {});
  // 扩展 required、disabled、readOnly 支持function
  if (typeof field.required === 'function') {
    field.required = field.required(form);
  }
  if (typeof field.disabled === 'function') {
    field.disabled = field.disabled(form);
  }
  if (typeof field.readOnly === 'function') {
    field.readOnly = field.readOnly(form);
  }

  // 校验input最大长度
  const validInput =
    field.type === 'Input' &&
    autoValidInputLen &&
    !field?.isSearchForm &&
    (field.required !== true ||
      (field.required && autoValidRequiredInputSpace !== true));
  // 校验textArea最大长度
  const validTextArea =
    field.type === 'TextArea' && autoValidTextAreaLen && field.props?.maxLength;
  if (validInput || validTextArea) {
    const maxLength =
      field.type === 'Input'
        ? field.props?.maxLength || defaultInputMaxLength
        : field.props?.maxLength;
    // delete field.props?.maxLength;
    field.rules = Array.isArray(field.rules) ? field.rules : [];
    const defaultRules = [
      {
        validator: (_, value) => {
          if ((value ?? '').length > maxLength) {
            return Promise.reject(new Error(`最多可输入${maxLength}字`));
          } else {
            return Promise.resolve();
          }
        },
      },
    ];
    if (!field?.rules?.length) {
      field.rules = defaultRules;
    } else if (field?.useDefaultRules ?? true) {
      field.rules = [...defaultRules, ...field.rules];
    }
  }
  // 自动处理DateTimeHabit
  if (field.type === 'DateTimeHabit') {
    const defaultRules = [
      {
        validator: (rule, value) => {
          if (!value.date && !value.time) {
            return Promise.resolve();
          }
          if (!value.date || !value.time) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject('日期和时间点必须同时选择');
          }
          return Promise.resolve();
        },
      },
    ];
    if (!field?.rules?.length) {
      field.rules = defaultRules;
    }
  }
  // 校验 InputNumber 可输入范围
  if (
    field.type === 'InputNumber' &&
    autoValidInputNumber &&
    !field?.isSearchForm
  ) {
    const { min, max, maxLength } = field.props;
    field.rules = Array.isArray(field.rules) ? field.rules : [];
    const defaultRules = [
      {
        validator: (_, value) => {
          if ([undefined, null].includes(value)) {
            return Promise.resolve();
          }
          // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill
          if (value.toString().length > maxLength) {
            return Promise.reject(new Error(`最多可输入${maxLength}位`));
          } else if (!isEmpty(min) && value < min) {
            return Promise.reject(new Error(`输入值不得小于${min}`));
          } else if (!isEmpty(max) && value > max) {
            return Promise.reject(new Error(`输入值不得大于${max}`));
          } else {
            return Promise.resolve();
          }
        },
      },
    ];
    if (!field?.rules?.length) {
      field.rules = defaultRules;
    }
  }

  // 必填逻辑处理
  if (field.required === true) {
    field.rules = Array.isArray(field.rules) ? field.rules : [];
    if (
      autoValidRequiredInputSpace &&
      field.type === 'Input' &&
      !field?.isSearchForm
    ) {
      const maxLength = field.props?.maxLength || defaultInputMaxLength;
      if (field?.isSearchForm) {
        return;
      }
      const defaultRules = [
        {
          required: true,
          message: `${field.label}不能为空`,
        },
        {
          validator: (_, value) => {
            if (autoValidInputLen && (value ?? '').length > maxLength) {
              return Promise.reject(new Error(`最多可输入${maxLength}字`));
            } else if (new RegExp(/\s+/).test(value ?? '')) {
              return Promise.reject(new Error('请不要输入空格'));
            } else {
              return Promise.resolve();
            }
          },
        },
      ];
      if (!field?.rules?.length) {
        field.rules = defaultRules;
      } else if (field?.useDefaultRules ?? true) {
        field.rules = [...defaultRules, ...field.rules];
      }
    } else if (field.type === 'RangePicker' && field.props?.mode === 'split') {
      const canEqual = field.props?.canEqual ?? true;
      field.rules.push({ required: true, message: '' });
      field.rules.push({
        validator: (_, value: any) => {
          const [start, end] = value || [];
          if (!start || !end) {
            return Promise.reject(
              new Error(`${field.label || ''}起始和结束都不能为空`)
            );
          } else if (
            canEqual &&
            start &&
            end &&
            dayjs(end).isBefore(dayjs(start))
          ) {
            return Promise.reject(new Error('结束时间不能早于开始时间'));
          } else if (
            !canEqual &&
            start & end &&
            !dayjs(end).isAfter(dayjs(start))
          ) {
            return Promise.reject(new Error('结束时间需晚于开始时间'));
          }
          return Promise.resolve();
        },
      });
    } else if (field.type === 'RangeInput') {
      field.rules.push({ required: true, message: '' });
      field.rules.push({
        validator: (_, value: any) => {
          const [start, end] = value || [];
          if (!start || (!end && start !== 0 && end !== 0)) {
            if (field?.props?.oneEmptyErrorText) {
              return Promise.reject(new Error(field?.props?.oneEmptyErrorText));
            }
            return Promise.reject(
              new Error(`${field.label || ''}起始和结束都不能为空`)
            );
          } else if (
            !field?.props?.mode &&
            !isEmpty(start) &&
            !isEmpty(end) &&
            +end < +start
          ) {
            return Promise.reject(
              new Error(field?.props?.invertedErrorText || '结束不能早于开始')
            );
          } else if (
            !field?.props?.mode &&
            !isEmpty(start) &&
            !isEmpty(end) &&
            field?.props?.notequal &&
            +end === +start
          ) {
            return Promise.reject(
              new Error(field?.props?.equalErrorText || '结束不能等于开始')
            );
          }
          return Promise.resolve();
        },
      });
    } else {
      field.rules.push({
        required: true,
        message: `${field.label || ''}不能为空`,
      });
    }
  }

  // 标识下搜索的field
  if (field?.isSearchForm) {
    field.props.isSearchForm = true;
  }

  if (
    !field?.required &&
    field.type === 'RangePicker' &&
    field.props?.mode === 'split'
  ) {
    const canEqual = field.props?.canEqual ?? true;
    field.rules = [
      {
        required: false,
        validator: (_, value: any = []) => {
          const [start, end] = value;
          if ((start && !end) || (!start && end)) {
            return Promise.reject(new Error('请选择完整的时间范围'));
          } else if (
            canEqual &&
            start &&
            end &&
            dayjs(end).isBefore(dayjs(start))
          ) {
            return Promise.reject(new Error('结束时间不能早于开始时间'));
          } else if (
            !canEqual &&
            start &&
            end &&
            !dayjs(end).isAfter(dayjs(start))
          ) {
            return Promise.reject(new Error('结束时间需晚于开始时间'));
          } else {
            return Promise.resolve();
          }
        },
      },
    ];
  }
  if (!field?.required && field.type === 'RangeInput') {
    field.rules = [
      {
        required: false,
        validator: (_, value: any = []) => {
          const [start, end] = value;
          if ((start && !end) || (!start && end)) {
            if (field?.props?.oneEmptyErrorText) {
              return Promise.reject(new Error(field?.props?.oneEmptyErrorText));
            }
            return Promise.reject(new Error('请选择完整的区间范围'));
          } else if (
            !field?.props?.mode &&
            !isEmpty(start) &&
            !isEmpty(end) &&
            +end < +start
          ) {
            return Promise.reject(
              new Error(field?.props?.invertedErrorText || '结束不能早于开始')
            );
          } else if (
            !field?.props?.mode &&
            !isEmpty(start) &&
            !isEmpty(end) &&
            field?.props?.notequal &&
            +end === +start
          ) {
            return Promise.reject(
              new Error(field?.props?.equalErrorText || '结束不能等于开始')
            );
          }
          return Promise.resolve();
        },
      },
    ];
  }

  const pureFields: any = {};
  Object.keys(field).forEach(key => {
    // 过滤下扩展属性
    if (!(key in isExpansionItemProps)) {
      pureFields[key] = field[key];
    }
  });
  return pureFields;
};
/** 类型区分 */
export const splitItemAndFieldProps = (props: any) => {
  const itemProps: any = {};
  const fieldProps: any = {};
  Object.keys(props).forEach(key => {
    if (key in isItemProps) {
      itemProps[key] = props[key];
    } else {
      fieldProps[key] = props[key];
    }
  });
  return {
    itemProps,
    fieldProps,
  };
};
/** jsxToSchema: 解析Jsx逻辑,将jsx代码块解析成schema */
export const jsxToSchema = (children: any, fields: any) => {
  if (!Array.isArray(children)) {
    children = [children];
  }
  // filter
  children
    .filter(i => i !== undefined)
    .forEach((child: any) => {
      if (Array.isArray(child)) {
        jsxToSchema(child, fields);
        return;
      }
      // 解析FieldSet
      if (child.type?.displayName === 'FieldSet') {
        const _children: any = []; // 组装子节点
        jsxToSchema(child.props?.children, _children);
        const { itemProps, fieldProps } = splitItemAndFieldProps(child.props);
        const field: any = {
          type: 'FieldSet',
          ...itemProps,
          props: {
            ...fieldProps,
            children: _children,
          },
        };
        fields.push(field);
      } else {
        // 文本节点
        if (typeof child === 'string') {
          return fields.push({
            type: 'Render',
            props: {
              render() {
                return child;
              },
            },
          });
        }
        let type = child.type?.displayName;
        // 判断是否是内置组件
        if (!(type in BuiltInWidgetMapping)) {
          type = 'Render'; // 不是则转为自定义渲染模式
        }
        const { itemProps, fieldProps } = splitItemAndFieldProps(child?.props);
        const field: any = {
          type,
          ...itemProps,
          props: {
            ...fieldProps,
          },
        };
        if (field.type === 'Render') {
          // 渲染子节点
          field.props.render = props => {
            return {
              ...child,
              props: {
                ...child.props, // 自己的属性
                ...props, // 传递的扩展属性
              },
            };
          };
        }
        delete field.children;
        fields.push(field);
      }
    });
};
/** 容器滑动到指定的子元素 */
export const scrollToElement = (container, childNode, gap = 50) => {
  if (childNode) {
    if (typeof Element.prototype.scrollIntoView === 'function') {
      childNode.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else {
      // eslint-disable-next-line no-param-reassign
      container.scrollTo({
        top: childNode.offsetTop - container.offsetTop - gap,
        behavior: 'smooth',
      });
    }
  }
};

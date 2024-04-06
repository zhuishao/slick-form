/* eslint-disable no-param-reassign */
import { ConfigProvider, Empty, Form, Spin } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import FieldSet from '../create-widget/extension/fields-set';
import { Grid } from '../index';
import { cloneDeep, EventEmit, queryFieldByName } from '../util';
import FormLib from './index';
import './index.less';
import Item from './item';
import {
  defaultFormConfig,
  expansionInstanceMethod,
  parseBeforeReceive,
  transformSchema,
} from './tool';
import { FormLibProps } from './type.form';

// column布局映射关系
const labelColMap = [4, 6, 8, 10];
const wrapperColMap = [20, 18, 16, 14];
export default ({
  fields = [],
  widgets = {}, // 注入自定义组件
  readOnly = false, // 视图展示
  disabled = false, // 全部表单不可用
  disabledFields = [], // 设置不可用的表单
  form = FormLib.useForm()[0],
  column = 1,
  gridStyle = {
    columnGap: 20,
    rowGap: 0,
  },
  className = '',
  /** form-props */
  initialValues = {},
  onValuesChange = () => {},
  locale = zhCN,
  getScrollContainer, // 设置滚动容器
  scrollToFirstError = true, // 默认开启滚动到第一个错误的位置
  readOnlyEmptyValueNode,
  formConfig = {},
  readOnlyClean = false,
  forceUpdate,
  name,
  ...rest
}: FormLibProps) => {
  /**
   * 处理默认布局
   * layout: 使用传入,没有传入按照SearchForm使用inline、Form使用vertical
   * labelCol 使用传入,没有传入按照layout是vertical就固定24,否则按照column映射取
   * wrapperCol 使用传入,没有传入按照layout是vertical就固定24,否则按照column映射取
   */
  // 默认只读模式 保持行 10px 间隙
  if (readOnly) {
    gridStyle = {
      ...gridStyle,
      rowGap: gridStyle.rowGap || 10,
    };
  }
  const layout = rest.layout || 'vertical'; // 默认使用垂直布局
  const labelCol =
    rest.labelCol ?? layout === 'vertical'
      ? { span: 24 }
      : { span: labelColMap[column - 1] };
  const wrapperCol =
    rest.wrapperCol ?? layout === 'vertical'
      ? { span: 24 }
      : { span: wrapperColMap[column - 1] };
  const [antdForm]: any = Form.useForm();
  // 一个表单对应一个发布订阅
  const event = useMemo(() => {
    return new EventEmit();
  }, []);
  const [spin, setSpin] = useState(false);
  // 克隆 fields
  const cloneFields = useMemo(() => {
    const newFields =
      typeof fields === 'function'
        ? cloneDeep(fields(form))
        : cloneDeep(fields);
    transformSchema(
      newFields,
      name,
      column,
      Object.assign({}, defaultFormConfig, formConfig)
    ); // 内部转换下
    return newFields;
  }, [fields]); // cloneDeep 避免被污染
  // 处理下接受之前的转换
  const _initialValues = parseBeforeReceive({ ...initialValues }, cloneFields, {
    name,
    form,
    initialValues,
  });
  // 获取 formList api
  const actionRef = useRef({});
  // 值改变 setFieldsValue不会触发该方法
  const onChange = (value: any, values: any) => {
    const key = Object.keys(value)[0];
    const field: any = queryFieldByName(cloneFields, key); // 查找指定的field
    const fieldValue = value[key];
    if (field.type === 'FormList' && Array.isArray(fieldValue)) {
      // 兼容 FormList
      const index = fieldValue.findIndex(i => typeof i === 'object');
      if (index > -1) {
        const innerName = Object.keys(fieldValue[index])[0];
        // 组装 FormList 指定项的改表字段 name
        event.publish({
          name: [key, index, innerName].join(','),
        });
      }
    } else {
      // 发布通知
      event.publish({
        name: key,
      });
    }
    onValuesChange(value, values); // 通知外面
  };
  // 实例扩展方法
  expansionInstanceMethod({
    form,
    antdForm,
    name,
    initialValues: _initialValues,
    cloneFields,
    event,
    scrollToFirstError,
    getScrollContainer,
    actionRef,
    setSpin,
    forceUpdate,
    onChange,
  });
  /** render FieldSet children */
  const RenderFieldSet = ({ field }) => {
    // 支持函数默认参数为form
    const childrenFields =
      typeof field.props?.children === 'function'
        ? field.props?.children(form)
        : field.props?.children;
    // 格式处理下
    if (typeof field.props?.children === 'function') {
      transformSchema(
        childrenFields,
        name,
        field.props.column,
        Object.assign({}, defaultFormConfig, formConfig)
      );
    }
    return childrenFields ? (
      <Grid
        gridStyle={field.props.gridStyle || gridStyle}
        column={field.props.column}
      >
        <RenderFields itemFields={childrenFields || []} />
      </Grid>
    ) : (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    );
  };
  /** render field */
  const RenderFields = useCallback(
    ({ itemFields = [] }): any => {
      return (
        <React.Fragment>
          {itemFields.map((field: any, index: number) => {
            if (field.type === 'FieldSet') {
              // 基于gridColumnStart设置列数
              let style = field.style || {};
              if (field.span) {
                style = {
                  ...style,
                  gridColumnStart: `span ${field.span}`,
                };
              }
              if (!field.name) {
                // eslint-disable-next-line no-console
                console.warn('FieldSet 缺少 name 属性');
              }
              const FormItem = (
                <FieldSet
                  key={field.name}
                  fieldName={field.name}
                  className={field.props?.className}
                  label={field.label}
                  style={style}
                  extra={field.props?.extra}
                  subTitle={field.props?.subTitle}
                  form={form}
                  initialValues={_initialValues}
                  effect={field.effect}
                  isShow={field.isShow}
                  event={event}
                >
                  <RenderFieldSet field={field} />
                </FieldSet>
              );
              // 返回节点
              let vNode = FormItem;
              // 异步渲染
              if (typeof field.itemRender === 'function') {
                vNode = field.itemRender(FormItem, {
                  field,
                  form,
                  disabled,
                  readOnly,
                });
              }
              return vNode;
            }
            return (
              <Item
                event={event}
                disabled={
                  disabled ||
                  field?.props?.disabled ||
                  disabledFields.includes(field.name)
                }
                readOnly={readOnly}
                onChange={onChange}
                readOnlyClean={readOnlyClean}
                form={form}
                widgets={widgets}
                initialValues={_initialValues}
                field={field}
                key={field.name || field.key || index}
                readOnlyEmptyValueNode={readOnlyEmptyValueNode}
                actionRef={
                  ['FormList', 'TableList', 'EditableTable'].includes(
                    field.type
                  )
                    ? actionRef
                    : undefined
                }
              />
            );
          })}
        </React.Fragment>
      );
    },
    [disabled, readOnly]
  );
  // 组装类名
  const _className = [`slick-form-${layout}`];
  if (className) {
    _className.push(className);
  }
  if (readOnly) {
    _className.push('slick-form-readonly');
  }
  return (
    <ConfigProvider locale={locale}>
      <Form
        layout={layout}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        className={_className.join(' ')}
        form={antdForm}
        name={name}
        initialValues={_initialValues}
        onValuesChange={onChange}
        {...rest}
      >
        <Spin spinning={spin} wrapperClassName="slick-form-spin">
          <Grid gridStyle={gridStyle} column={column}>
            <RenderFields itemFields={cloneFields} />
          </Grid>
        </Spin>
      </Form>
    </ConfigProvider>
  );
};

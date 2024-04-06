/* eslint-disable @iceworks/best-practices/recommend-polyfill */
/* eslint-disable no-nested-ternary */
import { Form } from 'antd';
import mergeWith from 'lodash/mergeWith';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CreateWidget from '../create-widget';
import AsyncRender from '../create-widget/extension/async/render';
import {
  AsyncOptionsCache,
  cloneDeep,
  isEmpty,
  NOTICESELF,
  uuid,
} from '../util';
import { beforeFieldRender } from './util';

export default ({
  field = {},
  form,
  initialValues,
  onChange = () => {},
  disabled,
  readOnly,
  event,
  className = field?.className || '',
  fieldKey,
  widgets = {},
  formListName = '', // 子表单名字
  actionRef,
  readOnlyEmptyValueNode = '-',
  readOnlyClean = false,
}: any) => {
  const [innerField, setInnerField] = useState(field);
  // 暂时忽略 FormList 的 fields 改变
  useEffect(() => {
    if (!formListName) {
      setInnerField(field);
    }
  }, [field]);
  const _field = useMemo(() => {
    return cloneDeep(innerField);
  }, [innerField]); // cloneDeep 避免被污染
  // 外部更新
  const mergeField = useCallback((newField, customizer) => {
    setInnerField({
      ...mergeWith(innerField, newField, customizer),
    });
    setReload(Math.random()); // 组件重新卸载，构建。
  }, []);
  const [reload, setReload] = useState(Math.random()); // 组件刷新
  // 执行副作用逻辑
  const touchEffect = useCallback((item: any, triggerField?: string) => {
    const name = Array.isArray(item.name)
      ? [formListName, ...item.name].filter(name => name !== '').join('_') // 兼容下子表单
      : item.name;
    delete AsyncOptionsCache[`${form.name}_${name}`]; // 清除异步缓存器中的数据
    // 放到宏任务队列、避免多级联动出现问题
    setTimeout(() => {
      setReload(Math.random()); // 组件重新卸载，构建
    });
    if (_field.effectResetField ?? true) {
      // 触发重置字段
      if (
        typeof _field?.effectResetField === 'boolean' ||
        (Array.isArray(_field.effectResetField) &&
          _field.effectResetField.includes(item.name))
      ) {
        form.resetFields([item.name]);
      }
    }
    // 触发清空字段
    if (_field.effectClearField === true) {
      form.setFieldsValue({
        [item.name]: undefined,
      });
    }
    _field.onEffect?.(triggerField, form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let unsubscribe = () => {};
    // 所有子组件都会订阅
    unsubscribe = event.subscribe(
      Array.isArray(_field.name)
        ? [formListName, ..._field.name].filter(name => name !== '').join('_') // 兼容下子表单
        : _field.name,
      ({ name }: any, newField, customizer = () => {}) => {
        // 更新field
        if (!isEmpty(newField)) {
          return mergeField(newField, customizer);
        }
        // 触发自己渲染
        if (name === NOTICESELF) {
          touchEffect(field);
        } else if (
          _field?.effect?.some(item => {
            // effect 配置了二维数组
            if (Array.isArray(item)) {
              if (Array.isArray(_field.name)) {
                // 子表单依赖子表单
                item[1] = _field.name[0]; // 更新index
              } else {
                // 主表单依赖子表单
                item[1] = name.split(',')[1]; // 更新index
              }
            }
            return item.toString() === name.toString();
          })
        ) {
          // 执行副作用
          touchEffect(field, name);
        }
      }
    );
    return () => {
      unsubscribe(); //  取消订阅
    };
  }, []);
  // 处理默认设置
  const cloneField = cloneDeep(_field); // 拷贝一份原始_field,扩展的时候不会修改原始属性
  const pureFields = beforeFieldRender(cloneField, form); // 开始扩展处理
  /** 兼容 antd 升级 导致 Search 组件样式问题 */
  const itemID: string = useMemo(() => {
    return `item_${uuid(10)}`;
  }, []);
  useEffect(() => {
    const element = document.querySelector(`[itemId=${itemID}]`);
    if (element) {
      if (pureFields.ismore) {
        element.parentElement.setAttribute('ismore', '1');
      }
      element.classList.value = element.classList.value
        .split(',')
        .concat('ant-form-item')
        .join(' ');
    }
  }, []);
  const FormItem = (
    <Form.Item
      {...pureFields}
      key={reload}
      itemID={itemID}
      // 只读模式不需要rules
      rules={readOnly ? undefined : pureFields.rules}
      tooltip={readOnly && readOnlyClean ? undefined : pureFields.tooltip}
      extra={readOnly && readOnlyClean ? undefined : pureFields.extra}
      // 设置 ismore 的元素设置 className
      className={
        pureFields.ismore === 1
          ? className
            ? `ant-form-item-ismore ${className}`
            : 'ant-form-item-ismore'
          : className
      }
      fieldKey={fieldKey}
      label={
        cloneField.labelWidth ? (
          <span style={{ width: cloneField.labelWidth }}>
            {pureFields.label}
          </span>
        ) : (
          pureFields.label
        )
      }
    >
      {CreateWidget(
        {
          disabled,
          readOnly,
          event, // 发布订阅传递下FormList会用到
          readOnlyEmptyValueNode,
          actionRef,
          ...cloneField,
        },
        {
          ...form,
          setValues: (value: any) => {
            // 同步表单验证
            form.setFieldsValue(value);
            // 解决自定义组件修改不能触发onValuesChange, 内部调用一下
            onChange(value, form.getFieldsValue(true));
          },
          // 保留对form的引用关系、兼容下子表单的引用
          quoteFormInstance: form.quoteFormInstance || form,
        },
        widgets
      )}
    </Form.Item>
  );
  // 返回节点
  let vNode = FormItem;
  // 异步渲染
  if (typeof _field.itemRender === 'function') {
    const node = _field.itemRender(FormItem, {
      field,
      form,
      disabled,
      readOnly,
    });
    // 处理下Promise
    if (Object.prototype.toString.call(node) === '[object Promise]') {
      vNode = (
        <AsyncRender
          form={form}
          spin={false}
          key={reload} // effect生效
          render={() => {
            return node;
          }}
        />
      );
    } else {
      vNode = node;
    }
  }
  // 执行isShow逻辑
  if (typeof field.isShow === 'function') {
    return field.isShow({
      ...initialValues,
      ...form.getFieldsValue(),
    })
      ? vNode
      : null;
  }
  return vNode;
};

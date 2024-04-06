import staticThemeMethodHooks from '@/static-theme-method';
import { Drawer } from 'antd';
import React, { useMemo, useState } from 'react';
import { Form } from '../index';
import { getGlobalConfigByName, isObject, uuid } from '../util';
import Footer from './footer';
import { DrawerFormProps } from './types';

export default (props: DrawerFormProps) => {
  const globalConfig = getGlobalConfigByName('DrawerForm', props);
  const {
    drawerProps = {},
    form = Form.useForm()[0],
    title,
    actionAlign = 'end',
    className,
    width = 500,
    open = false,
    onClose = () => {},
    onSubmit = () => {},
    cancelConfirm,
    okConfirm,
    footer = true,
    cancelText = '取消',
    confirmText = '保存',
    actions,
    render,
    closeConfirm,
    footerRender,
    ...rest
  } = Object.assign({}, props, globalConfig, {
    drawerProps: {
      ...props.drawerProps, // 传入
      ...globalConfig.drawerProps, // 全局配置
    },
  });
  const { modal } = staticThemeMethodHooks();

  const id = useMemo(() => {
    return uuid(10);
  }, []);
  // 关闭二次确认
  const onHandleClose = e => {
    if (isObject(closeConfirm)) {
      modal?.confirm({
        ...closeConfirm,
        onOk: onClose,
      });
    } else {
      onClose(e);
    }
  };
  const [value, onChange] = useState(rest.initialValues);
  const _actions = actions || [
    {
      label: cancelText,
      onClick: onHandleClose,
      cancelConfirm,
    },
    {
      label: confirmText,
      type: 'primary',
      validator: true,
      spin: true,
      onClick: onSubmit,
      okConfirm,
    },
  ];
  /** validatorForm */
  const validatorForm = async () => {
    try {
      return await form.submit();
    } catch (errorInfo) {
      console.error('validatorForm fail ->', errorInfo);
      throw errorInfo;
    }
  };
  /** actionClick */
  const actionClick = async action => {
    if (typeof action.onClick === 'function') {
      let data = {};
      // 自定义渲染
      if (typeof render === 'function') {
        data = value;
      } else {
        data = form.getValues();
        if (action.validator) {
          data = await validatorForm();
        }
      }
      await action.onClick(data);
    }
  };
  const _className = [`drawer-${id}`, `drawer-form-${actionAlign}`];
  if (className) {
    _className.push(className);
  }
  /** 控制底部按钮渲染 */
  let footerNode: any = false;
  if (typeof footerRender === 'function') {
    footerNode = footerRender(form);
  } else if (footer) {
    footerNode = (
      <Footer
        actions={_actions}
        actionClick={actionClick}
        validatorForm={validatorForm}
        form={form}
        cancelConfirm={cancelConfirm}
        okConfirm={okConfirm}
      />
    );
  }
  return (
    <Drawer
      {...{
        getContainer: false, // 适配文件上传全局loading
        ...drawerProps,
      }}
      className={_className.join(' ')}
      width={width}
      title={title}
      open={open}
      onClose={onHandleClose}
      footer={footerNode}
    >
      {typeof render === 'function' ? (
        render({ value, onChange })
      ) : (
        <Form
          form={form}
          {...rest}
          getScrollContainer={() =>
            document.querySelector(`.drawer-${id} .ant-drawer-body`)
          }
        />
      )}
    </Drawer>
  );
};

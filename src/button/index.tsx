/* eslint-disable no-prototype-builtins */
/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import staticThemeMethodHooks from '@/static-theme-method';
import { Button, Popconfirm, Tooltip } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import CreateForm from '../create-form';
import { isEmpty, isObject } from '../util';
import { ProBtnProps, ProButtonComponent } from './type';

/** 处理 loading 的 onClick */
const WrapperSpinOnClick =
  (setLoading, onClick, timer = 0) =>
  async e => {
    setLoading(true);
    try {
      await onClick?.(e);
    } catch (error) {
      console.error('error', error);
    } finally {
      // 延迟下
      setTimeout(() => {
        setLoading(false);
      }, timer);
    }
  };

// 私有变量只能 set、get
export const authName = Symbol('');
/**
 * 高级Button
 * @param props
 * @returns
 */
const ProButton: ProButtonComponent = forwardRef<
  HTMLButtonElement,
  ProBtnProps
>(
  (
    {
      spin,
      confirm,
      auth,
      btnType,
      onBeforeClick,
      drawerFormProps,
      modalFormProps,
      tooltip,
      visible = true,
      validator,
      ...props
    },
    ref
  ) => {
    const useStaticHooks = staticThemeMethodHooks();
    const [open, setOpen] = useState(false);
    const [disable, setDisable] = useState(false);

    const isPopConfirm = isObject(confirm) && confirm.type === 'pop';

    let submitForm;
    const [loading, setLoading] = useState(false);
    let onClick: any =
      (async () => {
        if (typeof onBeforeClick === 'function') {
          await onBeforeClick(); // 等待改事件执行再出现二次确认
        }
        props.onClick?.();
      }) || function () {};
    let label = props.children;

    if (isObject(drawerFormProps)) {
      submitForm = CreateForm.Drawer(drawerFormProps as any);
      // 修复快速点击button 弹两个窗口的问题
      onClick = WrapperSpinOnClick(
        setDisable,
        async () => submitForm.open(),
        1000
      );
    } else if (isObject(modalFormProps)) {
      submitForm = CreateForm.Modal(modalFormProps as any);
      // 修复快速点击button 弹两个窗口的问题
      onClick = WrapperSpinOnClick(
        setDisable,
        async () => submitForm.open(),
        1000
      );
    }
    useImperativeHandle(
      ref,
      () =>
        ({
          click: !isPopConfirm ? onClick : () => {},
        } as any)
    );
    if (isObject(confirm)) {
      onClick = WrapperSpinOnClick(
        spin ? setLoading : () => {},
        async () => {
          if (typeof onBeforeClick === 'function') {
            await onBeforeClick(); // 等待改事件执行再出现二次确认
          }
          const confirmClick = submitForm
            ? submitForm.open
            : props.onClick || function () {};

          (confirm.type ?? 'alert') === 'alert'
            ? useStaticHooks.modal?.confirm({
                okText: '确定',
                cancelText: '取消',
                title: '提示',
                ...confirm,
                type: undefined, // 移除警告
                async onOk() {
                  await confirmClick();
                },
              })
            : await confirmClick();
        },
        spin ? 500 : 0
      );
      // onClick = async () => {
      //   if (typeof onBeforeClick === 'function') {
      //     await onBeforeClick(); // 等待改事件执行再出现二次确认
      //   }
      //   const confirmClick = submitForm
      //     ? submitForm.open
      //     : props.onClick || function () {};

      //   (confirm.type ?? 'alert') === 'alert'
      //     ? useStaticHooks.modal?.confirm({
      //         okText: '确定',
      //         cancelText: '取消',
      //         title: '提示',
      //         ...confirm,
      //         type: undefined, // 移除警告
      //         async onOk() {
      //           await confirmClick();
      //         },
      //       })
      //     : await confirmClick();
      // };
      // 设置按钮 loading
    } else if (
      spin ||
      typeof modalFormProps === 'function' ||
      typeof drawerFormProps === 'function'
    ) {
      if (typeof modalFormProps === 'function') {
        onClick = WrapperSpinOnClick(
          spin ? setLoading : setDisable,
          async () => {
            const config = await modalFormProps();
            CreateForm.Modal(config).open();
          },
          spin ? 500 : 1000
        );
      } else if (typeof drawerFormProps === 'function') {
        onClick = WrapperSpinOnClick(
          spin ? setLoading : setDisable,
          async () => {
            const config = await drawerFormProps();
            CreateForm.Drawer(config).open();
          },
          spin ? 500 : 1000
        );
      } else if (spin) {
        if (typeof modalFormProps === 'object') {
          onClick = WrapperSpinOnClick(
            spin ? setLoading : () => {},
            async () => {
              CreateForm.Modal(modalFormProps).open();
            },
            spin ? 500 : 0
          );
        } else if (typeof drawerFormProps === 'object') {
          onClick = WrapperSpinOnClick(
            spin ? setLoading : () => {},
            async () => {
              CreateForm.Drawer(drawerFormProps).open();
            },
            spin ? 500 : 0
          );
        } else {
          onClick = WrapperSpinOnClick(setLoading, props.onClick, 500);
        }
      }
    }
    if (auth) {
      // 处理权限这块的逻辑
      const auths = ProButton.getAuth();
      if (isEmpty(auth)) {
        return null;
      } else {
        const authKey = Object.keys(auths).find((key: any) => {
          return key === auth;
        });
        if (authKey) {
          label = label || auths[authKey]; // 获取文本
        } else {
          return null;
        }
      }
    }

    let vNode = (
      <Button
        loading={loading}
        {...props}
        onClick={isPopConfirm || disable ? undefined : onClick}
      >
        {label}
      </Button>
    );

    const handleOpenChange = async (newOpen: boolean) => {
      if (typeof onBeforeClick === 'function') {
        await onBeforeClick(); // 等待改事件执行再出现二次确认
      }
      setOpen(newOpen);
    };

    if (isPopConfirm) {
      vNode = (
        <Popconfirm
          onConfirm={onClick}
          okText="确定"
          cancelText="取消"
          {...confirm}
          onOpenChange={handleOpenChange}
          open={open}
        >
          {vNode}
        </Popconfirm>
      );
    }
    if (tooltip) {
      const tooltipProps =
        typeof tooltip === 'object' && !React.isValidElement(tooltip)
          ? tooltip
          : {
              title: tooltip,
            };
      vNode = <Tooltip {...tooltipProps}>{vNode}</Tooltip>;
    }
    return visible && vNode;
  }
);

// 挂载权限
ProButton.setAuth = (auths: any) => {
  ProButton[authName as any] = auths;
};
ProButton.getAuth = () => {
  return ProButton[authName as any] || {};
};
// 判断权限
ProButton.hasAuth = (authKey: string) => {
  const auths = ProButton.getAuth();
  return auths[authKey] !== undefined;
};

export default ProButton;

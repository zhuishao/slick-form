import staticThemeMethodHooks from '@/static-theme-method';
import { Modal } from 'antd';
import { useMemo, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import { Form } from '../index';
import { isObject, uuid } from '../util';
import Footer from './footer';
import { ModalFormProps } from './types';

export default ({
  modalProps,
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
  drag = false,
  footerRender,
  ...rest
}: ModalFormProps) => {
  const id = useMemo(() => {
    return uuid(10);
  }, []);

  const { modal } = staticThemeMethodHooks();
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
    },
    {
      label: confirmText,
      type: 'primary',
      validator: true,
      spin: true,
      onClick: onSubmit,
    },
  ];
  /** validatorForm */
  const validatorForm = async () => {
    try {
      const datas = await form.submit(); // 提交数据验证
      return datas;
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
  const _className = [`modal-${id}`, `modal-form-${actionAlign}`];
  if (className) {
    _className.push(className);
  }
  /** 拖拽逻辑开始 */
  const draggleRef = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  const renderTitle = drag ? (
    <div
      style={{
        width: '100%',
        cursor: 'move',
      }}
      onMouseOver={() => {
        if (disabled) {
          setDisabled(false);
        }
      }}
      onMouseOut={() => {
        setDisabled(true);
      }}
    >
      {title}
    </div>
  ) : (
    title
  );
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
    <Modal
      {...{
        getContainer: false, // 适配文件上传全局loading
        ...modalProps,
      }}
      className={_className.join(' ')}
      width={width}
      open={open}
      title={renderTitle}
      onCancel={onHandleClose}
      modalRender={
        drag
          ? modals => (
              <Draggable
                disabled={disabled}
                bounds={bounds}
                onStart={(event, uiData) => onStart(event, uiData)}
              >
                <div ref={draggleRef}>{modals}</div>
              </Draggable>
            )
          : undefined
      }
      footer={footerNode}
    >
      {typeof render === 'function' ? (
        render({
          value,
          onChange,
        })
      ) : (
        <Form
          form={form}
          {...rest}
          getScrollContainer={() =>
            document.querySelector(`.modal-${id} .ant-modal-body`)
          }
        />
      )}
    </Modal>
  );
};

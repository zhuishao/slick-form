import { CardProps, DrawerProps, ModalProps, PopconfirmProps } from 'antd';
import { ReactNode } from 'react';
import { ConfirmProps } from '../button/type';
import { FormLibProps } from '../form/type.form';
import { ActionProps } from './type.action';

interface FormSubmitProps extends FormLibProps {
  /** 表单宽度 */
  width?: number | string;
  footer?: boolean;
  /** 定义操作按钮 */
  actions?: ActionProps[];
  /**
   * 操作按钮的布局方式
   * @default center
   */
  actionAlign?: 'start' | 'center' | 'end';
  /** 取消事件 */
  onClose?: (e: any) => void;
  /** 提交事件 */
  onSubmit?: (values: any) => void;
  /**
   * 取消的文案
   * @default 取消
   */
  cancelText?: string;
  /**
   * 确定的文案
   * @default 确定
   */
  confirmText?: string;
  /**
   * 自定义渲染
   */
  render?: ({ value, onChange }) => ReactNode;
  /** 关闭二次确认配置 */
  closeConfirm?: PopconfirmProps;
  /** 自定义渲染底部操作 */
  footerRender?: (form) => ReactNode;
  cancelConfirm?: ConfirmProps;
  okConfirm?: ConfirmProps;
}

export interface CardFormProps extends FormSubmitProps {
  /** Card属性设置 */
  cardProps?: CardProps;
}

export interface DrawerFormProps extends FormSubmitProps {
  /** Drawer属性设置 */
  drawerProps?: DrawerProps;
  /**
   * 是否可见
   * @default false
   */
  open?: boolean;
}

export interface ModalFormProps extends FormSubmitProps {
  /** Modal属性设置 */
  modalProps?: ModalProps;
  /**
   * 是否可见
   * @default false
   */
  open?: boolean;
  /** 是否可拖拽 */
  drag?: boolean;
}

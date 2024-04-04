import { ButtonProps, PopconfirmProps, TooltipProps } from 'antd';
import { ReactNode } from 'react';
import { CreateDrawerFormProps, CreateModalFormProps } from '../create-form';

// type Auth = Record<string, boolean>;

export type ConfirmProps = PopconfirmProps & {
  type?: 'pop' | 'alert';
  content?: React.ReactNode;
};

export interface BtnProps extends ButtonProps {
  [key: string]: any;
}

export interface ProBtnProps extends Omit<ButtonProps, 'onClick'> {
  /**
   * 点击是否有loading
   * @default false
   */
  spin?: boolean;
  /**
   * 二次确认的配置
   */
  confirm?: ConfirmProps;
  /**
   * 配置权限
   */
  auth?: string;
  /**
   * 前置点击事件
   */
  onBeforeClick?: () => void;
  /**
   * 点击事件
   */
  onClick?: (e?) => void;
  /**
   * 是否可见
   * @default true
   */
  visible?: boolean;
  /**
   * CreateModalFormProps
   */
  modalFormProps?: CreateModalFormProps | (() => Promise<CreateModalFormProps>);
  /**
   * CreateDrawerFormProps
   */
  drawerFormProps?:
    | CreateDrawerFormProps
    | (() => Promise<CreateDrawerFormProps>);
  [key: string]: any;
  /** hover提示文案 */
  tooltip?: TooltipProps | ReactNode;
}
export interface ProButtonComponent
  extends React.ForwardRefExoticComponent<
    ProBtnProps & React.RefAttributes<HTMLButtonElement>
  > {
  setAuth?: (auths: any) => void;
  getAuth?: () => any;
  hasAuth?: (authKey: string) => boolean;
}

const Hello: React.FC<ProBtnProps> = () => null;

export default Hello;

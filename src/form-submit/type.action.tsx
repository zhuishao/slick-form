import { TooltipProps } from 'antd';
import { ReactNode } from 'react';

export interface ActionProps {
  /**
   * 文案
   */
  label: string;
  /**
   * 按钮类型
   */
  type?: 'primary' | 'link' | 'text' | 'default' | 'dashed';
  /**
   * 清空表单
   * @default false
   */
  reset?: boolean;
  /**
   * 开启加载
   * @default false
   */
  spin?: boolean;
  /**
   * 权限标识，参看 Button
   */
  auth?: string; // 权限控制
  /**
   * 开启校验
   * @default false
   */
  validator?: boolean; // 开启表单校验
  /**
   * 开启校验
   * @default false
   */
  onClick?: Function; // 回调
  /**
   * 是否可见
   * @default true
   */
  visible?: Function | Boolean; // 是否展示
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean; // 是否禁用
  /**
   * 配置二次确认
   */
  confirm?: {
    // 二次确认按钮
    title: string;
    content: ReactNode;
  };
  /** hover提示信息 */
  tooltip?: TooltipProps | ReactNode;
}

const Hello: React.FC<ActionProps> = () => null;

export default Hello;

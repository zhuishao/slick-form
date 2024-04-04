import { NotificationInstance } from 'antd/lib/notification/interface';
import { ReactNode } from 'react';
import { FormLibInstance } from '..';

export type Notify = (
  description: ReactNode,
  type: keyof NotificationInstance
) => void;

export interface LayerProps {
  /** 打开指定的layer */
  open: (key: string | number, data?: Object, newTab?: boolean) => void;
  /** 关闭所有的layer */
  close: () => void;
  /** 成功提示 */
  success: (description: ReactNode) => void;
  /** 刷新主页面 */
  refresh: () => void;
  /** 通知 */
  notify: Notify;
  /** Form实例 */
  searchForm: FormLibInstance;
  /** 传递的属性 */
  data?: any;
  [key: string]: any;
}

const Hello: React.FC<LayerProps> = () => null;

export default Hello;

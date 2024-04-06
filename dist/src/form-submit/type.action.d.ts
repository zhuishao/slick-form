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
    auth?: string;
    /**
     * 开启校验
     * @default false
     */
    validator?: boolean;
    /**
     * 开启校验
     * @default false
     */
    onClick?: Function;
    /**
     * 是否可见
     * @default true
     */
    visible?: Function | Boolean;
    /**
     * 是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * 配置二次确认
     */
    confirm?: {
        title: string;
        content: ReactNode;
    };
    /** hover提示信息 */
    tooltip?: TooltipProps | ReactNode;
}
declare const Hello: React.FC<ActionProps>;
export default Hello;

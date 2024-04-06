import { StepProps } from 'antd';
import React, { ReactNode } from 'react';
import { FormFieldProps } from '..';
import { FormLibProps } from '../form/type.form';
import { ActionProps } from './type.action';
/** 分步提交表单 */
export interface StepFormProps extends FormLibProps {
    /** 当前步骤 */
    current?: number;
    /** 手动切换步骤 */
    onStepsClick?: (current: any) => void;
    /** 步骤属性 */
    stepProps?: StepProps;
    /** 配置每一步的表单项和操作按钮 */
    steps: {
        title: ReactNode;
        description?: ReactNode;
        column?: number;
        fields: FormFieldProps[];
        actions: ActionProps[];
    }[];
}
declare const _default: ({ current, onStepsClick, form, stepProps, steps, ...rest }: StepFormProps) => React.JSX.Element;
export default _default;

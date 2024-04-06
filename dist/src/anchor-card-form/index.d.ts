/**
 * 电梯表单组件
 */
import React from 'react';
import { AnchorCardProps } from '../anchor-card';
import { CardFormProps } from '../form-submit/types';
import './index.less';
interface AnchorCardFormProps extends Omit<AnchorCardProps, 'tabs'> {
    /** form 属性 */
    formProps: CardFormProps;
    /** 外层容器名 */
    className?: string;
    /** 容器高度 */
    height?: number | string;
}
declare const _default: ({ height, className, formProps, ...rest }: AnchorCardFormProps) => React.JSX.Element;
export default _default;

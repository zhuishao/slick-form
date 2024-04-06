import { FormProps } from 'antd';
import { MutableRefObject, ReactNode } from 'react';
import { FormLibInstance } from './type.instance';
import { FormFieldProps } from './type.item';
/** Form 统一配置 */
export interface FormConfigProps {
    /** 默认计数输入框最大长度 */
    defaultInputMaxLength?: number;
    /** 是否自动为选择器挂载Popup容器 */
    autoSetPopupContainer?: boolean;
    /** 是否支持自动转换日期选择器dayjs和string */
    autoTransfromDatePicker?: boolean;
    /** 是否默认开启选择器模糊搜索功能 */
    autoSelectSearch?: boolean;
}
/** FormProps */
export interface FormLibProps extends Omit<FormProps, 'fields' | 'form'> {
    /**
     * 表单的数据模型
     * @default          []
     */
    fields?: FormFieldProps[] | ((form: FormLibInstance) => FormFieldProps[]);
    /**
     * 注入自定义组件
     */
    widgets?: any;
    /**
     * 是否只读
     * @default           false
     */
    readOnly?: boolean;
    /**
     * 是否禁用
     * @default           false
     */
    disabled?: boolean;
    /**
     * 禁用指定的字段
     * @default           []
     */
    disabledFields?: any;
    /**
     * 等分布局属性
     * @default          1
     */
    column?: number;
    /**
     * 布局样式设置
     * @default          {columnGap: 20, rowGap: 0}
     */
    gridStyle?: any;
    /**
     * 最外层类名
     */
    className?: string;
    /**
     * 表单加载完的钩子
     */
    onMount?: (form: FormLibInstance) => void;
    /** 国际化 */
    locale?: any;
    /** 滚动的区域 */
    getScrollContainer?: () => HTMLElement;
    /** 只读表单的空提示 */
    readOnlyEmptyValueNode?: ReactNode;
    /** 表单通用配置 */
    formConfig?: FormConfigProps;
    /**
     * 简洁只读模式、开启之后只读表单的 FormItem tooltip、extra 属性会忽略
     * @default false
     */
    readOnlyClean?: boolean;
    useForm?: FormRefInstance[];
    form?: FormLibInstance;
    search?: boolean;
    key?: string | number;
    children?: any;
    forceUpdate?: any;
}
export interface FormRefInstance extends Omit<MutableRefObject<{}>, 'current'> {
    current: FormLibInstance;
}
declare const Hello: React.FC<FormLibProps>;
export default Hello;

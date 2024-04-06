import { FormLibInstance } from './type.instance';
/** 默认配置 */
export declare const defaultFormConfig: {
    defaultInputMaxLength: any;
    autoSetPopupContainer: boolean;
    autoTransfromDatePicker: boolean;
    autoSelectSearch: boolean;
};
/** 前置格式转化下、默认处理一些逻辑 */
export declare const transformSchema: (fields: any[], name: string, column?: number, formConfig?: {
    defaultInputMaxLength: any;
    autoSetPopupContainer: boolean;
    autoTransfromDatePicker: boolean;
    autoSelectSearch: boolean;
}) => void;
/** 是否是符合 FieldSet */
export declare const isFieldSet: (field: any) => boolean;
/** 处理 transform */
export declare const getCombination: (values: any, formFields: any, options: {
    name: string;
    form: FormLibInstance;
    initialValues: object;
}, combination?: {}) => any;
/** 处理 beforeReceive */
export declare const parseBeforeReceive: (values: any, formFields: any, options: {
    name: string;
    form: FormLibInstance;
    initialValues: object;
}, parseValue?: {}) => any;
/** 扩展form实例方法 */
export declare const expansionInstanceMethod: ({ form, antdForm, name, initialValues, cloneFields, event, scrollToFirstError, getScrollContainer, actionRef, setSpin, forceUpdate, onChange, }: {
    form: any;
    antdForm: any;
    name: any;
    initialValues: any;
    cloneFields: any;
    event: any;
    scrollToFirstError: any;
    getScrollContainer: any;
    actionRef: any;
    setSpin: any;
    forceUpdate: any;
    onChange: any;
}) => void;

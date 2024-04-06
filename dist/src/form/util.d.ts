export declare const isPopupContainer: (type: string) => boolean;
/** Item扩展的属性 */
export declare const isExpansionItemProps: {
    props: string;
    isShow: string;
    transform: string;
    __parentKey__: string;
    autosearch: string;
    effect: string;
    onEffect: string;
    effectResetField: string;
    effectClearField: string;
    type: string;
    beforeReceive: string;
    span: string;
    itemRender: string;
    required: string;
    readOnly: string;
    disabled: string;
    labelWidth: string;
    nameAlise: string;
    useDefaultRules: string;
};
/** 是Item的属性 */
export declare const isItemProps: {
    props: string;
    isShow: string;
    transform: string;
    __parentKey__: string;
    autosearch: string;
    effect: string;
    onEffect: string;
    effectResetField: string;
    effectClearField: string;
    type: string;
    beforeReceive: string;
    span: string;
    itemRender: string;
    required: string;
    readOnly: string;
    disabled: string;
    labelWidth: string;
    nameAlise: string;
    useDefaultRules: string;
    colon: string;
    dependencies: string;
    extra: string;
    getValueFromEvent: string;
    getValueProps: string;
    hasFeedback: string;
    help: string;
    hidden: string;
    htmlFor: string;
    initialValue: string;
    label: string;
    labelAlign: string;
    labelCol: string;
    messageVariables: string;
    name: string;
    normalize: string;
    noStyle: string;
    preserve: string;
    rules: string;
    shouldUpdate: string;
    tooltip: string;
    trigger: string;
    validateFirst: string;
    validateStatus: string;
    validateTrigger: string;
    valuePropName: string;
    wrapperCol: string;
};
export declare const beforeFieldRender: (field: any, form: any) => any;
/** 类型区分 */
export declare const splitItemAndFieldProps: (props: any) => {
    itemProps: any;
    fieldProps: any;
};
/** jsxToSchema: 解析Jsx逻辑,将jsx代码块解析成schema */
export declare const jsxToSchema: (children: any, fields: any) => void;
/** 容器滑动到指定的子元素 */
export declare const scrollToElement: (container: any, childNode: any, gap?: number) => void;

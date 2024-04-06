import React from 'react';
/**
 * 金额输入框、开启千分位、默认最多15位数字、最小值为0、小数点默认2位
 */
declare const AmountInput: {
    ({ readOnlyEmptyValueNode, precision, maxLength, min, addonAfter, formatter, parser, readOnly, ...props }: {
        [x: string]: any;
        readOnlyEmptyValueNode: any;
        precision?: number;
        maxLength?: number;
        min?: number;
        addonAfter?: string;
        formatter?: (value: any) => any;
        parser?: (value: any) => any;
        readOnly: any;
    }): React.JSX.Element;
    displayName: string;
};
export default AmountInput;

import React from 'react';
/**
 * 计数器输入框
 */
declare const CountInput: {
    ({ showCount, maxLength, ...rest }: {
        [x: string]: any;
        showCount?: boolean;
        maxLength?: number;
    }): React.JSX.Element;
    displayName: string;
};
export default CountInput;

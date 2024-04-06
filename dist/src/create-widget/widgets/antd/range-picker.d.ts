import React from 'react';
import './range-picker.less';
/**
 * 官方内置的交互
 */
declare const RangePicker: {
    ({ mode, readOnlyEmptyValueNode, ...props }: {
        [x: string]: any;
        mode: any;
        readOnlyEmptyValueNode: any;
    }): React.JSX.Element;
    displayName: string;
};
export default RangePicker;

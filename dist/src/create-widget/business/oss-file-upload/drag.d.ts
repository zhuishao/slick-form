import React from 'react';
/** 自定义渲染 */
export declare const CustomRender: ({ originNode, accept, file, listType, disabled, onRemove, services, showPreview, readOnly, }: {
    originNode: any;
    accept: any;
    file: any;
    listType: any;
    disabled: any;
    onRemove: any;
    services: any;
    showPreview: any;
    readOnly: any;
}) => any;
declare const _default: ({ originNode, file, currFileList, onMoveRow, onRemove, listType, disabled, accept, services, showPreview, readOnly, }: {
    originNode: any;
    file: any;
    currFileList: any;
    onMoveRow: any;
    onRemove: any;
    listType: any;
    disabled: any;
    accept: any;
    services: any;
    showPreview: any;
    readOnly?: boolean;
}) => React.JSX.Element;
export default _default;

import React from 'react';
import { KeyHandleMap, Operation } from '../index';
import '../index.less';
interface IProps {
    keyHandles: KeyHandleMap;
    activeKey: string;
    hideReload: boolean;
    operations: Operation[];
    moreCount: number;
}
declare const _default: ({ keyHandles, activeKey, hideReload, operations, moreCount, }: IProps) => React.JSX.Element;
export default _default;

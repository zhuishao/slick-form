import { TableColumnType, UpdateLocalFilterParams } from './types';
export declare const transformColumns: ({ columns, emptyNode, onCellWidthChange, pagination, sorterValues, }: {
    columns: TableColumnType[];
    emptyNode: any;
    onCellWidthChange: Function;
    pagination: any;
    sorterValues?: any;
}) => any;
export declare const NumberFormat: (number: any, options?: {
    minimumFractionDigits: number;
    maximumFractionDigits: number;
}, emptyNode?: string) => string;
/** 本地缓存 */
export declare const updateLocalFilter: ({ cacheId, columns, filterIds, pageSize, }: UpdateLocalFilterParams) => void;

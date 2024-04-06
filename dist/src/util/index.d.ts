/** 判断空 */
export declare const isEmpty: (param: any) => boolean;
/**
 * 简易uuid
 */
export declare const uuid: (size: number) => string;
/**
 * 简易发布订阅
 */
export declare const NOTICESELF: unique symbol;
export declare class EventEmit {
    listeners: any;
    publishMergeField: (fieldName: string, newField: any, customizer: any) => void;
    publishFields: (fieldNames?: string[]) => void;
    publish: (field: any) => void;
    subscribe: (fieldName: string, fn: any) => () => void;
}
/**
 * 设置异步加载Select的options缓存
 */
export declare const AsyncOptionsCache: any;
export declare const queryFieldByName: (fields: any, fieldName: any) => {};
export declare const getUrlParams: (names?: string[]) => {
    [key: string]: string;
};
export declare const getType: (obj: any) => string;
export declare const isObject: (obj: any) => boolean;
export declare const isPromise: (obj: any) => boolean;
/** ReactElement 对象不参与深拷贝 */
export declare const cloneDeep: (source: any) => any;
export declare const getGlobalConfigByName: (key: any, props: any) => any;
export declare const range: (start: any, end: any) => any[];
export declare const disabledDate: (current: any, nowTime?: Date) => boolean;
export declare const disabledTime: (current: any, nowTime?: Date) => {
    disabledHours: () => any[];
    disabledMinutes: () => any[];
};
export declare const optionsValueUnique: (options: any[], key: any) => any[];
export declare const deleteEmptyString: (object: any) => {};

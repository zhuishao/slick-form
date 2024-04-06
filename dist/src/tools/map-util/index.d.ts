/**
 * 使用vincenty算法
 *
 * 若不传第五个参数为默认模式
 *
 * mode为DEFAULT是默认模式，返回值数字，单位是m，整数。
 *
 * mode为CHINESE是中文模式，返回值为字符串，大于1km使用千米，保留两位小数，小于1km使用米，整数。
 *
 * mode为ENGLISH是英文模式，返回值为字符串，大于1km使用km，保留两位小数，小于1km使用m，整数。
 *   */
export declare function distance(lat1: number, lon1: number, lat2: number, lon2: number, mode?: string): any;
export declare function safeStringify(obj: any, replacer?: any, space?: any, cycleReplacer?: any): string;
export declare function memoize(fn: any): (...args: any[]) => any;

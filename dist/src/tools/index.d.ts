import BigNumber from 'bignumber.js';
import { compressAndDownload, downloadFile } from './download-util';
import { distance, memoize, safeStringify } from './map-util/index';
declare const _default: {
    /** 浮点数运算 */
    BigNumber: {
        /** 加 */
        add: (...args: BigNumber.Value[]) => number;
        /** 减 */
        minus: (...args: BigNumber.Value[]) => number;
        /** 乘 */
        multiplie: (...args: BigNumber.Value[]) => number;
        /** 除 */
        divided: (...args: BigNumber.Value[]) => number;
    };
    /** 判断空 */
    isEmpty: (param: any) => boolean;
    /** 千分位，小数点2位 */
    NumberFormat: (number: any, options?: {
        minimumFractionDigits: number;
        maximumFractionDigits: number;
    }) => string;
    /** 解析url参数 */
    getUrlSearchParams: (search?: string) => Record<string, string>;
    /** 文件下载 */
    downloadFile: typeof downloadFile;
    /** html解密 */
    htmlDecode: (input: any) => string;
    /** 拷贝到剪切板 */
    copyToClipBoard: (text: any, showNotice?: boolean) => Promise<void>;
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
    distance: typeof distance;
    /** 能够处理循环引用的JSON.Stringify */
    safeStringify: typeof safeStringify;
    /** 缓存函数 */
    memoize: typeof memoize;
    /** 获取元素快照 */
    getElementSnapshot: (element: any) => {
        printImg: (event?: unknown, content?: () => import("react").ReactInstance) => void;
        downloadImg: (filename: string) => Promise<unknown>;
        getDataURL: (config?: {}) => Promise<unknown>;
    };
    compressAndDownload: typeof compressAndDownload;
    uuid: (size: any) => string;
    encode: (str: string) => string;
    decode: (str: string) => string;
    sleep: (ms?: number) => Promise<unknown>;
    getJSType: (params: unknown) => string;
};
export default _default;

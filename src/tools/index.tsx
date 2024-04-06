import { message } from 'antd';
import BigNumber from 'bignumber.js';
import html2canvas from 'html2canvas';
import { useReactToPrint as doPrintElement } from 'react-to-print';
import { compressAndDownload, downloadFile } from './download-util';
import { distance, memoize, safeStringify } from './map-util/index';

const calculate = (
  args: BigNumber.Value[],
  type: 'plus' | 'minus' | 'multipliedBy' | 'dividedBy'
) => {
  return Number(
    args
      .reduce((a, b) => {
        return new BigNumber(a)[type](new BigNumber(b));
      })
      .toString()
  );
};

export default {
  /** 浮点数运算 */
  BigNumber: {
    /** 加 */
    add: (...args: BigNumber.Value[]) => calculate(args, 'plus'),
    /** 减 */
    minus: (...args: BigNumber.Value[]) => calculate(args, 'minus'),
    /** 乘 */
    multiplie: (...args: BigNumber.Value[]) => calculate(args, 'multipliedBy'),
    /** 除 */
    divided: (...args: BigNumber.Value[]) => calculate(args, 'dividedBy'),
  },
  /** 判断空 */
  isEmpty: (param: any) => {
    if (param === null || param === undefined) {
      return true;
    }
    if (Array.isArray(param)) {
      return param.length === 0;
    }
    if (typeof param === 'string') {
      return param.trim() === '';
    }
    if (typeof param === 'object') {
      return Object.keys(param).length === 0;
    }
    return false;
  },
  /** 千分位，小数点2位 */
  NumberFormat: (
    number: any,
    options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ) => {
    if (isNaN(Number.parseFloat(number))) {
      return '-';
    }
    return Number(number).toLocaleString('zh-CH', options);
  },
  /** 解析url参数 */
  getUrlSearchParams: (search = '') => {
    search = search?.split('?')[1];
    const params: Record<string, string> = {};
    const searchParams: any = new URLSearchParams(search);
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  },
  /** 文件下载 */
  downloadFile,
  /** html解密 */
  htmlDecode: input => {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  },
  /** 拷贝到剪切板 */
  copyToClipBoard: async (text, showNotice = true) => {
    /** navigator clipboard 需要https等安全上下文 */
    if (navigator.clipboard && window.isSecureContext) {
      setTimeout(async () => {
        await navigator.clipboard.writeText(text);
        showNotice && message.success('已复制到剪切板');
      });
    } else {
      // 创建textarea
      const textArea = document.createElement('textarea');
      textArea.value = text;
      // 使textarea不在viewport，同时设置不可见
      textArea.style.position = 'absolute';
      textArea.style.opacity = '0';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const res = await new Promise((resolve, reject) => {
        document.execCommand('copy') ? resolve(true) : reject();
        textArea.remove();
      });
      if (res) {
        showNotice && message.success('已复制到剪切板');
      }
    }
  },

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
  distance,
  /** 能够处理循环引用的JSON.Stringify */
  safeStringify,
  /** 缓存函数 */
  memoize,
  /** 获取元素快照 */
  getElementSnapshot: element => {
    return {
      printImg: doPrintElement({
        bodyClass: 'print-class',
        content: () => document.querySelector(element),
      }),
      // 直接下载
      downloadImg: (filename: string) =>
        new Promise(res => {
          html2canvas(document.querySelector(element), { useCORS: true }).then(
            canvas => {
              document.documentElement.classList.remove('html2canvas');
              const a = document.createElement('a');
              a.download = filename;
              a.href = canvas.toDataURL();
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              res(true);
            }
          );
        }),
      getDataURL: async (config = {}) =>
        new Promise(res => {
          html2canvas(document.querySelector(element), {
            useCORS: true,
            ...config,
          }).then(canvas => {
            res(canvas.toDataURL());
          });
        }),
    };
  },

  compressAndDownload,
  uuid: size => Math.random().toString().substr(2, size),
  encode: (str: string): string => {
    try {
      return btoa(encodeURIComponent(str));
    } catch (error) {
      console.log(error);
      return '';
    }
  },
  decode: (str: string): string => {
    try {
      return decodeURIComponent(atob(str));
    } catch (error) {
      console.log(error);
      return '';
    }
  },
  sleep: (ms = 1500) => new Promise(res => setTimeout(res, ms)),
  // 判断类型通用方法
  getJSType: (params: unknown): string => {
    if (typeof params !== 'object') {
      return typeof params;
    }
    return Object.prototype.toString
      .call(params)
      .replace(/^\[object (\S+)\]$/, '$1')
      .toLocaleLowerCase();
  },
};

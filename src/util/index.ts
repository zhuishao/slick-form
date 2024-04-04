/* eslint-disable no-nested-ternary */
import dayjs from 'dayjs';
import { cloneDeepWith } from 'lodash';
import React from 'react';

/** 判断空 */
export const isEmpty = (param: any) => {
  if ([undefined, null, ''].includes(param)) {
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
};
/**
 * 简易uuid
 */
export const uuid = (size: number) => {
  return Math.random().toString().substr(2, size);
};
/**
 * 简易发布订阅
 */
export const NOTICESELF = Symbol(''); // 唯一标识，通知自己重新渲染
export class EventEmit {
  listeners: any = [];
  // 指定某一个field更新
  publishMergeField = (fieldName: string, newField, customizer) => {
    this.listeners
      .filter((listener: any) => fieldName === listener.fieldName)
      .forEach((listener: any) => listener.fn({}, newField, customizer));
  };

  // 通知批量指定的字段重新渲染
  publishFields = (fieldNames: string[] = []) => {
    this.listeners
      .filter((listener: any) => fieldNames.includes(listener.fieldName))
      .forEach((listener: any) => listener.fn({ name: NOTICESELF }));
  };

  // 通知所有
  publish = (field: any) => {
    if (!field) return;
    this.listeners.forEach((listener: any) => listener.fn(field));
  };

  // 订阅下
  subscribe = (fieldName: string, fn: any) => {
    this.listeners.push({
      fieldName,
      fn,
    });
    // 返回取消订阅
    return () => {
      this.listeners = this.listeners.filter(
        (listener: any) => listener.fn !== fn
      );
    };
  };
}
/**
 * 设置异步加载Select的options缓存
 */
export const AsyncOptionsCache: any = {};

/**
 * 递归查找指定name的field
 */

let _field_ = {};
export const queryFieldByName = (fields, fieldName) => {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (field.name === fieldName) {
      _field_ = field;
      break;
    } else if (
      field.type === 'FieldSet' &&
      Array.isArray(field.props.children)
    ) {
      // 递归子节点
      queryFieldByName(field.props.children, fieldName);
    }
  }
  return _field_;
};

export const getUrlParams = (names?: string[]): { [key: string]: string } => {
  const uri = new URL(location.href.replace('#', ''));
  const res: { [key: string]: any } = {};
  if (!names) {
    uri.searchParams.forEach((value, key) => {
      res[key] = value;
    });
  } else {
    names.forEach(i => {
      res[i] = uri.searchParams.get(i);
    });
  }
  return res;
};

export const getType = (obj: any): string => {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  return type.toLocaleLowerCase();
};

export const isObject = obj => getType(obj) === 'object';

export const isPromise = obj => getType(obj) === 'promise';

/** ReactElement 对象不参与深拷贝 */
export const cloneDeep = source => {
  return cloneDeepWith(source, target => {
    if (React.isValidElement(target)) {
      return target;
    }
  });
};

export const getGlobalConfigByName = (key, props) => {
  const config = window['slick-form-config']?.[key];
  const defaultProps = config
    ? typeof config === 'function'
      ? config(props)
      : config
    : {};
  return cloneDeep(defaultProps);
};

// 时间组件range
export const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// 禁止选择某天之后的时间，默认当天
export const disabledDate = (current, nowTime = new Date()) => {
  if (current) {
    const nowDay = `${dayjs(nowTime).format('YYYY-MM-DD')} 00:00:00`;
    const currentday = `${dayjs(current).format('YYYY-MM-DD')} 00:00:00`;
    return dayjs(currentday).valueOf() < dayjs(nowDay).valueOf();
  }
};

// 禁止选择某个时间之前的时间，默认当前时间
export const disabledTime = (current, nowTime = new Date()) => {
  const nowDay = `${dayjs(nowTime).format('YYYY-MM-DD')} 00:00:00`;
  const currentDay = `${dayjs(current).format('YYYY-MM-DD')} 00:00:00`;
  if (current && nowDay.valueOf() === currentDay.valueOf()) {
    const hour = +dayjs(nowTime).hour();
    const minute = +dayjs(nowTime).minute();
    let finalHour = hour;
    let finalMinute = minute;
    if (current.hour() > hour) {
      finalMinute = 0;
    } else if (current.minute() >= 59) {
      finalHour = hour + 1;
      finalMinute = 0;
    } else {
      finalMinute = minute + 1;
    }
    return {
      disabledHours: () => range(0, finalHour),
      disabledMinutes: () => range(0, finalMinute),
    };
  }
  return {
    disabledHours: () => [],
    disabledMinutes: () => [],
  };
};

export const optionsValueUnique = (options = [], key) => {
  const container = {};
  return options.filter(o => {
    // eslint-disable-next-line no-return-assign, no-prototype-builtins
    return container.hasOwnProperty(o[key])
      ? false
      : (container[o[key]] = true);
  });
};

// 把对象里面属性值为空字符串转为undefined

export const deleteEmptyString = object => {
  const result = {};
  if (!object) return {};
  Object.keys(object).forEach(key => {
    if (object[key] !== '') {
      result[key] = object[key];
    }
  });
  return result;
};

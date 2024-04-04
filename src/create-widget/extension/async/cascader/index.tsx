/* eslint-disable no-console */
import { AsyncOptionsCache } from '@/util';
import { useEffect, useState } from 'react';
import Cascader from '../../../widgets/antd/cascader';

const AsyncCascader = (props: any) => {
  const { initOptions = () => {} } = props;
  const [cascaderOptions, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const init = async () => {
    try {
      setLoading(true);
      if (typeof props.options === 'function') {
        if (AsyncOptionsCache[props.id]) {
          return setOptions(await AsyncOptionsCache[props.id]);
        }
        const defaultValue = props.value; // 获取默认值
        AsyncOptionsCache[props.id] = props.options(defaultValue, props.form); // 这初始缓存的Value是一定是Promise，具体原因参看文档Form高级用法(设置异步的Options)
        setOptions(await AsyncOptionsCache[props.id]);
      } else if (typeof initOptions === 'function') {
        if (AsyncOptionsCache[props.id]) {
          return setOptions(await AsyncOptionsCache[props.id]);
        }
        const defaultValue = props.value; // 获取默认值
        AsyncOptionsCache[props.id] = initOptions(defaultValue, props.form); // 这初始缓存的Value是一定是Promise，具体原因参看文档Form高级用法(设置异步的Options)
        setOptions(await AsyncOptionsCache[props.id]);
      } else {
        console.warn(`${props.name} 设置的options不是一个function`);
      }
    } catch (error) {
      setOptions([]);
      console.error('error->', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // 先查询一次
    init();
    return () => {
      // clear
      setOptions([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadData = async (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    if (typeof props.loadData === 'function') {
      const children = await props.loadData(targetOption, props.form);
      targetOption.loading = false;
      targetOption.children = children;
      // 更新缓存数据
      AsyncOptionsCache[props.id] = cascaderOptions;
      setOptions([...cascaderOptions]);
    }
  };
  const _props: any = {};
  Object.keys(props).forEach(key => {
    if (!['initOptions'].includes(key)) {
      _props[key] = props[key];
    }
  });
  return loading ? (
    <i className="iconfont spicon-loading" />
  ) : (
    <Cascader {..._props} options={cascaderOptions} loadData={loadData} />
  );
};

AsyncCascader.displayName = 'AsyncCascader';
export default AsyncCascader;

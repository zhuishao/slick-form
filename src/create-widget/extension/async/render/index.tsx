/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';

export default (props: any): any => {
  const [loading, setLoading] = useState(false);
  if (typeof props.render !== 'function') {
    return null;
  }
  const asyncJsx = useMemo(() => {
    return props.render(props.form); // 这是一个Promise
  }, []);
  const [vnode, setVnode] = useState('');
  const init = async () => {
    setLoading(true);
    setVnode(await asyncJsx);
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  const Spin = useMemo(() => {
    return props.spin ? <i className="iconfont spicon-loading" /> : <div />;
  }, []);
  return loading ? Spin : vnode || null;
};

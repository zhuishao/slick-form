import { Spin, SpinProps } from 'antd';
import { useState } from 'react';

export default (
  props: SpinProps = {
    spinning: false,
  }
) => {
  // 内部维护状态
  const [spin, setSpin] = useState(props.spinning || false);
  const SpinContainer = ({ children }) => {
    return (
      <Spin {...props} spinning={spin}>
        {children}
      </Spin>
    );
  };
  return {
    closeSpin: setSpin.bind(null, false),
    openSpin: setSpin.bind(null, true),
    SpinContainer,
  };
};

import { Slider } from 'antd';

const __Slider__ = ({ readOnlyEmptyValueNode, ...props }) => {
  // 渲染只读视图
  return <Slider {...props} disabled={props.disabled || props.readOnly} />;
};
__Slider__.displayName = 'Slider';
export default __Slider__;

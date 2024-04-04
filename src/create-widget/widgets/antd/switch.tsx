import { Switch } from 'antd';

const __Switch__ = ({ readOnlyEmptyValueNode, ...props }) => {
  return <Switch {...props} disabled={props.disabled || props.readOnly} />;
};
__Switch__.displayName = 'Switch';
export default __Switch__;

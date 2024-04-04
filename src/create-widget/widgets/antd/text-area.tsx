import { getGlobalConfigByName, isEmpty } from '@/util';
import { Input } from 'antd';

const TextArea = ({ readOnlyEmptyValueNode, ...props }) => {
  const { autoShowFormTextAreaCount } = getGlobalConfigByName('Antd', {});
  const { showCount, maxLength, ...restProps } = props;

  // 渲染只读视图
  if (props.readOnly) {
    return (
      <span className="ant-text-area-readonly">
        {props.value || readOnlyEmptyValueNode}
      </span>
    );
  }

  if (autoShowFormTextAreaCount) {
    const nowLen = (props.value ?? '').length;
    const showLen = (
      <span
        style={
          !isEmpty(maxLength) && nowLen > maxLength ? { color: 'red' } : {}
        }
      >
        {(!!nowLen || !isEmpty(maxLength)) && nowLen}
      </span>
    );
    return (
      <div style={{ position: 'relative' }}>
        <Input.TextArea {...restProps} />
        {!props?.isSearchForm && (
          <div style={{ position: 'absolute', right: 0 }}>
            <span style={{ opacity: 0.6, fontSize: 12 }}>
              {showLen}
              {!isEmpty(maxLength) && <>/{maxLength}</>}
            </span>
          </div>
        )}
      </div>
    );
  }

  return <Input.TextArea {...props} />;
};
TextArea.displayName = 'TextArea';
export default TextArea;

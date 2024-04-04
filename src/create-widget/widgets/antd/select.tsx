import { optionsValueUnique } from '@/util';
import { Select } from 'antd';

const __Select__ = ({
  fieldNames = { value: 'value', label: 'label' },
  readOnlyEmptyValueNode,
  autoFilterRepeatValue = false,
  ...props
}: any) => {
  if (props.readOnly) {
    // 渲染只读视图
    const values = Array.isArray(props.value) ? props.value : [props.value];
    // 解析options得到labels
    const labels: any =
      props?.options
        ?.filter((i: any) => {
          return values.includes(i[fieldNames.value]);
        })
        .map((i: any) => i[fieldNames.label]) || [];
    return (
      <span className="ant-select-readonly">
        {labels.join('、') || readOnlyEmptyValueNode}
      </span>
    );
  }

  return (
    <Select
      {...props}
      options={
        autoFilterRepeatValue
          ? optionsValueUnique(props?.options, fieldNames.value)
          : props?.options
      }
      fieldNames={fieldNames}
    />
  );
};
__Select__.displayName = 'Select';
export default __Select__;

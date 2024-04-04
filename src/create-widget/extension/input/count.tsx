import Input from '../../widgets/antd/input';
/**
 * 计数器输入框
 */
const CountInput = ({
  showCount = true, // 默认开启
  maxLength = 64, // 默认64
  ...rest
}) => {
  const count = (rest.value && String(rest.value).length) || 0;
  return (
    <Input
      suffix={
        showCount && (
          <span style={{ opacity: 0.6, fontSize: 12 }}>
            {count} / {maxLength}
          </span>
        )
      }
      maxLength={maxLength}
      {...rest}
    />
  );
};
CountInput.displayName = 'CountInput';
export default CountInput;

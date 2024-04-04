export default (props: any) => {
  if (typeof props.render !== 'function') {
    return null;
  }
  const { getFieldValue, initialValue, setFieldsValue } = props.form;
  const renderProps = {}; // 属性合并
  Object.assign(renderProps, props.form, {
    // 默认给自定义的组件，传递 value、onChange
    value: initialValue?.[props.name] || getFieldValue(props.name),
    onChange: value => {
      setFieldsValue({
        [props.name]: value || undefined,
      });
    },
  });
  const Jsx = props.render(renderProps);
  return Jsx || null;
};

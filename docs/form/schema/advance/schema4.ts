export default form => {
  return [
    {
      type: 'Select',
      name: 'classify',
      label: '员工职位',
      required: true,
      props: {
        onChange(value) {
          form.mergeFieldByName('classify', {
            hasFeedback: true,
            help: value ? '' : '员工职位不能为空',
            validateStatus: value ? 'success' : 'error',
          });
        },
        options: [
          {
            label: '前端',
            value: 1,
          },
          {
            label: '后端',
            value: 2,
          },
        ],
      },
    },
  ];
};

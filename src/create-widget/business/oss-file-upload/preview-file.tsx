import { EyeOutlined } from '@ant-design/icons/es/icons';

export default ({ name, url, services }: any) => {
  return url ? (
    <span
      style={{ cursor: 'pointer', marginLeft: 10 }}
      title="点击预览"
      onClick={async e => {
        e.stopPropagation();
        const { returnData, returnCode, code, data } =
          await services.filePreview(name, url);
        if (code === 200 || returnCode === '100') {
          window.open(data || returnData);
        }
      }}
    >
      <EyeOutlined style={{ color: 'var(--ant-color-primary)' }} />
    </span>
  ) : null;
};

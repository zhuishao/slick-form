import { UploadProps } from 'antd';

export interface OssFileUploadProps extends UploadProps {
  /** 按钮文字 */
  text?: string;
  /** 按钮类型 */
  btnType?: 'link' | 'text' | 'dashed' | 'ghost' | 'default' | 'primary';
  /** 文件大小 */
  limitSize?: number;
  /** 设置值 */
  value?: any;
  /** 值改变 */
  onChange?: any;
  /** 自定义请求 */
  request?: any;
  /** 请求的基地址 */
  baseURL?: string;
  /** 设置loading */
  onLoading?: any;
  /** oss配置 */
  ossConfig?: any;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否发拍模式 */
  useFinanceUrl?: boolean;
  /** 发拍模式类型 1 图片 2 视频 3 文件 */
  uploadType?: 1 | 2 | 3;
  /** 是否开启拖拽调整位置 */
  openDrag?: boolean;
  /** 是否开启预览 */
  showPreview?: boolean;
  name?: any;
  form?: any;
  onFinish?: any;
  onFileChange?: (params: {
    type: 'file-upload-success' | 'get-file' | 'file-upload-error';
    data?: any;
  }) => void;
  closeItemRender?: boolean;
  disabled?: boolean;
  maxCount?: number;
  accept?: string;
  /** 最小宽高比 */
  minAspectRatio?: number;
  /** 最大宽高比 */
  maxAspectRatio?: number;
  /** url地址前缀 */
  urlPrefix?: string;
}

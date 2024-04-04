/* eslint-disable no-nested-ternary */
import { DeleteOutlined } from '@ant-design/icons/es/icons';
import { Image } from 'antd';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PreviewFile from './preview-file';
import { downloadOssFile } from './tools';

/** 自定义渲染 */
export const CustomRender = ({
  originNode,
  accept,
  file,
  listType,
  disabled,
  onRemove,
  services,
  showPreview,
  readOnly,
}) => {
  return file.status === 'uploading' ? (
    originNode
  ) : listType === 'picture-card' ? (
    <div className="picture-card-image">
      {accept?.includes('.mp4') ? (
        <video
          controls
          height={100}
          width={100}
          src={file.url}
          crossOrigin="anonymous"
        />
      ) : (
        <Image width={100} src={file.url} />
      )}
      {!disabled && !readOnly && (
        <a
          className="oss-file-item-render-action"
          style={{
            position: 'absolute',
            top: 2,
            right: 4,
          }}
          onClick={() => {
            onRemove(file);
          }}
        >
          <DeleteOutlined />
        </a>
      )}
    </div>
  ) : (
    <div className="oss-file-item-render">
      <div
        style={{ width: 'calc(100% - 60px)' }}
        title={file.name}
        onClick={() => {
          downloadOssFile(file.url, file.name);
        }}
      >
        {originNode}
      </div>
      <div>
        {showPreview && (
          <a className="oss-file-item-render-action" style={{ right: 30 }}>
            <PreviewFile name={file.name} url={file.url} services={services} />
          </a>
        )}
        {!disabled && !readOnly && (
          <a
            className="oss-file-item-render-action"
            onClick={() => {
              onRemove(file);
            }}
          >
            <DeleteOutlined />
          </a>
        )}
      </div>
    </div>
  );
};

export default ({
  originNode,
  file,
  currFileList,
  onMoveRow,
  onRemove,
  listType,
  disabled,
  accept,
  services,
  showPreview,
  readOnly = false,
}) => {
  const ref = useRef(null);
  const index = currFileList.indexOf(file);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: 'DragableUploadList',
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: any) => {
      onMoveRow(item?.index, index);
    },
  });
  const [, drag] = useDrag({
    type: disabled ? '' : 'DragableUploadList',
    item: {
      index,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <div
      ref={ref}
      className={
        disabled
          ? 'upload-draggable-list-item-readOnly'
          : `upload-draggable-list-item ${isOver ? dropClassName : ''}`
      }
      style={{
        cursor: 'move',
      }}
    >
      <CustomRender
        {...{
          originNode,
          accept,
          file,
          listType,
          disabled,
          onRemove,
          services,
          showPreview,
          readOnly,
        }}
      />
    </div>
  );
};

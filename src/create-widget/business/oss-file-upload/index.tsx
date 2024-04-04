/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import OSS from 'ali-oss';
import { Button, message, Upload } from 'antd';
import update from 'immutability-helper';
import { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Drag, { CustomRender } from './drag';
import './index.less';
import defaultRequest from './request';
import useServices from './services';
import { OssFileUploadProps } from './type';

export default ({
  ossConfig = {
    bucket: 'wisdomhammer',
    region: 'oss-cn-hangzhou',
  },
  onLoading = (loading: Boolean) => {},
  baseURL = 'https://pmsaas.taobao.net',
  text = '上传文件',
  listType = 'text',
  btnType = listType === 'picture-card' ? 'link' : 'dashed',
  accept = listType === 'picture-card'
    ? '.png,.jpg,.jpeg'
    : '.doc,.docx,.pdf,.xlsx,.xls,.txt,.png,.jpg,.jpeg',
  maxCount = 1, // 最多可以上传1份
  limitSize = 1 * 1024, // 默认最大1G
  value = [],
  onChange = () => {},
  uploadType = 1,
  useFinanceUrl = false,
  form = {},
  request = defaultRequest({ baseURL }),
  urlPrefix = '',
  readOnly = false,
  disabled = false,
  openDrag = false,
  showPreview = true,
  onFinish = () => {},
  closeItemRender = false,
  onFileChange,
  ...props
}: OssFileUploadProps) => {
  const [loading, setLoading] = useState(false);
  // 同步外部loading
  useEffect(() => {
    onLoading(loading);
  }, [loading]);
  const services = useServices(request, urlPrefix);
  // 上传前: 检查格式和大小
  const beforeUpload: any = file => {
    try {
      // 判断下后缀名(一般使用二进制，或者file.type的映射关系判断)这里暂时先这样写，后面扩展
      const ext: string = file.name.substring(file.name.lastIndexOf('.'));
      // 转小写再判断
      if (
        !accept
          .split(',')
          .map((item: string) => item.toLowerCase())
          .includes(ext.toLowerCase())
      ) {
        message.error(`${file.name} 文件格式不在${accept}中`);
        return Upload.LIST_IGNORE;
      }
      const { size } = file;
      const isLtSize = size / 1024 / 1024 <= limitSize;
      if (!isLtSize) {
        message.error(`文件大小不允许超过${limitSize}M`);
        return Upload.LIST_IGNORE;
      }
      return isLtSize;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  // 删除文件
  const onRemove = (file: any) => {
    const _fileList = Array.isArray(value)
      ? value
      : JSON.parse(JSON.stringify(value.fileList));
    let tempFileList = JSON.parse(JSON.stringify(_fileList));
    tempFileList = tempFileList.filter(({ uid }: any) => uid !== file.uid);
    onChange(tempFileList);
  };
  // 文件开始上传
  const customRequest = async (options: any) => {
    const { file } = options;
    onFileChange?.({ type: 'get-file', data: file });
    if (file.size > 5 * 1024 * 1024) {
      await doMultiPartUpload(options);
    } else {
      await doSimpleUpload(options);
    }
    onFileChange?.({ type: 'file-upload-success', data: '' });
  };
  const generatePath = async (fileName: string) => {
    const { code, data } = await services.getOssPath({
      fileName: encodeURIComponent(fileName),
    });
    if (code === 200) {
      return data;
    }
  };
  const generateInfo = async (fileName: string, ossPath: string) => {
    let res = { code: 200, msg: '', data: {} };
    if (useFinanceUrl) {
      res = await services.getOssInfoAndFinanceUrl({
        fileName,
        ossPath,
        uploadType,
        // 是否委托机构、0：是委托机构 1：不是委托机构
        isEntrustOrg: form.getFieldValue?.('isEntrustOrg'),
      });
    } else {
      // await new Promise((r) => setTimeout(r, 1000 * 100));
      res = await services.getOssInfo({
        fileName,
        ossPath,
      });
    }
    if (res.code !== 200) {
      return Promise.reject(res.msg);
    }
    return res.data;
  };
  // 小文件上传
  const doSimpleUpload = async (options: any) => {
    const { file, onProgress, onSuccess } = options;
    const { data, code } = await services.getOssAuthInfo();
    if (code === 200) {
      const ossClient = new OSS({
        accessKeyId: data.accessKey,
        accessKeySecret: data.accessSecret,
        stsToken: data.securityToken,
        ...ossConfig,
      });
      try {
        setLoading(true);
        try {
          const fileOssPath = await generatePath(file.name);
          onProgress({ percent: 50 }, file);
          await ossClient.put(fileOssPath, file);
          onProgress({ percent: 100 }, file);
          const returnData = await generateInfo(file.name, fileOssPath);
          onFinish?.(returnData);
          onSuccess({ returnData }, file);
        } catch (error) {
          onFileChange?.({ type: 'file-upload-error', data: error });
          console.log(error);
        } finally {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  const _onFileChange = (option: any) => {
    let tempFileList = [...option.fileList];
    // 编辑时已有一个文件情况
    if (
      tempFileList.find(
        item =>
          item.status === 'done' && !item.url && item?.response?.returnData?.url
      )
    ) {
      tempFileList = tempFileList.map(item => ({
        ...item,
        url: item?.url || item?.response?.returnData?.url,
      }));
    }
    onChange(tempFileList);
    const multipleComplete = option.fileList.filter(
      (d: any) => d.status === 'done'
    );
    if (multipleComplete.length === option.fileList.length) {
      const mapFileList = multipleComplete.map((d: any) => ({
        ...d?.response?.returnData,
        name: d?.response?.returnData.fileName,
        ...d, // 兼容回显数据
      }));

      onChange(mapFileList);
    }
  };
  // 大文件采用分段上传(文件超过50M)
  const doMultiPartUpload = async (options: any) => {
    const { file, onProgress, onSuccess } = options;
    const { data, code } = await services.getOssAuthInfo();
    if (code === 200) {
      const ossClient = new OSS({
        accessKeyId: data.accessKey,
        accessKeySecret: data.accessSecret,
        stsToken: data.securityToken,
        ...ossConfig,
      });
      try {
        setLoading(true);
        try {
          const fileOssPath = await generatePath(file.name);
          await ossClient.multipartUpload(fileOssPath, file, {
            progress: (p: number, checkpoint) => {
              onProgress(
                { percent: parseInt(String(p * 100), 10) },
                checkpoint?.file
              );
            },
          });
          const returnData = await generateInfo(file.name, fileOssPath);
          onFinish?.(returnData);

          onSuccess({ returnData }, file);
        } catch (error) {
          onFileChange?.({ type: 'file-upload-error', data: error });
          console.log(error);
        } finally {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = value[dragIndex];
      onChange(
        update(value, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [value]
  );
  const uploadButton =
    listType === 'picture-card' ? (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>{text}</div>
      </div>
    ) : (
      <div>
        <Button loading={loading} icon={<UploadOutlined />}>
          {text}
        </Button>
      </div>
    );
  if (readOnly && value.length === 0) {
    return '-';
  }
  return (
    <div className="slick-form-oss-upload">
      <DndProvider backend={HTML5Backend}>
        <Upload
          {...props}
          maxCount={maxCount}
          accept={accept}
          showUploadList={{
            showDownloadIcon: false,
            showRemoveIcon: false,
          }}
          listType={listType}
          fileList={value}
          beforeUpload={beforeUpload}
          customRequest={customRequest}
          onChange={_onFileChange}
          itemRender={(originNode: any, file: any, currFileList: any) => {
            if (closeItemRender) return null;
            return openDrag ? (
              <Drag
                originNode={originNode}
                file={file}
                currFileList={currFileList}
                onMoveRow={moveRow}
                onRemove={onRemove}
                listType={listType}
                disabled={disabled || readOnly}
                accept={accept}
                services={services}
                showPreview={showPreview}
                readOnly={readOnly}
              />
            ) : (
              <CustomRender
                {...{
                  readOnly,
                  originNode,
                  accept,
                  file,
                  listType,
                  disabled,
                  onRemove,
                  services,
                  showPreview,
                }}
              />
            );
          }}
        >
          {readOnly || value.length >= maxCount ? null : uploadButton}
        </Upload>
      </DndProvider>
    </div>
  );
};

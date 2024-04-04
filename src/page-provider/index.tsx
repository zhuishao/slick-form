import { notification } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Form from '../form';
import useCreatePage from '../hooks/use-create-page';
import { PageProviderProps } from './type';
import { Notify } from './type.layer';

const notify: Notify = (description: any, type: any = 'success') => {
  notification?.[type]({
    message: '提示',
    description,
  });
};

/** 接收一个 Page 和一个 Layers , 返回注入props的新组件 */
export default ({
  Page = () => {},
  Layers = {},
  properties = {},
}: PageProviderProps) => {
  const [refresh, setRefresh] = useState(Math.random());
  const [searchForm] = Form.useForm();
  /** refresh */
  const forceUpdate = () => {
    setRefresh(Math.random());
  };
  const { createPage, open, close } = useCreatePage(); // 获取实例
  /** 操作成功的提示 */
  const success = useCallback(description => {
    notification.success({
      message: '提示',
      description,
    });
  }, []);
  /** 提示 */

  /** 解析并缓存 Layers */
  const _Layers = useMemo(() => {
    const allLayer = {};
    Object.keys(Layers).forEach((key: any) => {
      const Layer = Layers[key];
      allLayer[key] = (props: any) => (
        <Layer
          {...properties}
          {...props}
          notify={notify}
          close={close}
          open={open}
          success={success}
          refresh={forceUpdate}
          searchForm={searchForm}
        />
      );
    });
    return allLayer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  /** 判断是否有不合法的 properties */
  useEffect(() => {
    Object.keys(properties).some(key => {
      if (
        [
          'key',
          'close',
          'open',
          'success',
          'data',
          'notify',
          'refresh',
          'searchForm',
        ].includes(key)
      ) {
        // eslint-disable-next-line no-console
        console.warn('properties 包含了无效的属性：', key);
        return true;
      }
      return false;
    });
  }, [properties]);
  /* 返回 */
  return createPage(
    <Page
      {...properties}
      key={refresh}
      notify={notify}
      open={open}
      close={close}
      success={success}
      refresh={forceUpdate}
      searchForm={searchForm}
    />,
    _Layers
  );
};

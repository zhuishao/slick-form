import { NOTICESELF } from '@/util';
import { Empty, Space } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';

const FieldSet = ({
  style = {},
  children = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
  label = '标题',
  extra = null,
  subTitle = '',
  event,
  effect,
  fieldName,
  isShow,
  form,
  initialValues,
  className = '',
}) => {
  const [reload, setReload] = useState(Math.random());
  useEffect(() => {
    let unsubscribe = () => {};
    // 订阅
    unsubscribe = event.subscribe(fieldName, ({ name }: any) => {
      if (name === NOTICESELF || effect?.includes(name)) {
        setReload(Math.random());
      }
    });
    return () => {
      unsubscribe(); //  取消订阅
    };
  }, []);
  const vNode = (
    <div
      style={style}
      className={`slick-form-fieldset ${className || ''}`}
      key={reload}
    >
      <div className="slick-form-fieldset-title" id={fieldName}>
        <div className="slick-form-fieldset-label">
          {label}
          {subTitle && (
            <span className="slick-form-fieldset-label-subTitle">
              {subTitle}
            </span>
          )}
        </div>
        <div className="slick-form-fieldset-extra">
          <Space>{extra?.map(dom => dom)}</Space>
        </div>
      </div>
      <div className="slick-form-fieldset-content">{children}</div>
    </div>
  );
  // 执行isShow逻辑
  if (typeof isShow === 'function') {
    return isShow({
      ...initialValues,
      ...form.getFieldsValue(),
    })
      ? vNode
      : null;
  }
  return vNode;
};
FieldSet.displayName = 'FieldSet';
export default FieldSet;

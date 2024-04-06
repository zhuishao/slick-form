/**
 * 电梯表单组件
 */

import React from 'react';
import { AnchorCardProps } from '../anchor-card';
import { CardFormProps } from '../form-submit/types';
import { AnchorCard, CardForm, Form } from '../index';
import './index.less';

interface AnchorCardFormProps extends Omit<AnchorCardProps, 'tabs'> {
  /** form 属性 */
  formProps: CardFormProps;
  /** 外层容器名 */
  className?: string;
  /** 容器高度 */
  height?: number | string;
}

export default ({
  height = 500,
  className = 'anchor-card-form-box',
  formProps = {},
  ...rest
}: AnchorCardFormProps) => {
  const [form] = Form.useForm();
  const fileds = Array.isArray(formProps.fields)
    ? formProps.fields
    : formProps.fields(form);
  const defaultCardProps = {
    className,
    style: {
      borderWidth: 0,
      background: 'none',
    },
    bodyStyle: {
      height,
      overflow: 'auto',
      padding: 0,
    },
  };
  return (
    <div className="anchor-card-form">
      <AnchorCard
        tabs={fileds
          .filter(item => item.isShow?.(formProps.initialValues) !== false)
          .map((item: any) => {
            return {
              tab: item.label,
              key: item.name,
            };
          })}
        getContainer={() =>
          document.querySelector(`.${className} .ant-card-body`)
        }
        {...rest}
      >
        <CardForm {...formProps} cardProps={defaultCardProps} />
      </AnchorCard>
    </div>
  );
};

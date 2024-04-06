import { Card } from 'antd';
import React, { useMemo } from 'react';
import { Form } from '../index';
import { uuid } from '../util';
import Footer from './footer';
import './index.less';
import { CardFormProps } from './types';

export default ({
  cardProps = {},
  form = Form.useForm()[0],
  width = '100%',
  title,
  onClose = () => {},
  onSubmit = () => {},
  footer = true,
  actionAlign = 'end',
  cancelText = '取消',
  confirmText = '保存',
  actions,
  ...rest
}: CardFormProps) => {
  const _actions = actions || [
    {
      label: cancelText,
      onClick: onClose,
    },
    {
      label: confirmText,
      type: 'primary',
      validator: true,
      spin: true,
      onClick: onSubmit,
    },
  ];
  const id = useMemo(() => {
    return uuid(10);
  }, []);
  /** validatorForm */
  const validatorForm = async () => {
    try {
      const datas = await form.submit(); // 提交数据验证
      return datas;
    } catch (errorInfo) {
      console.error('validatorForm fail ->', errorInfo);
      throw errorInfo;
    }
  };
  /** actionClick */
  const actionClick = async action => {
    if (typeof action.onClick === 'function') {
      let data: any = form.getValues();
      if (action.validator) {
        data = await validatorForm();
      }
      await action.onClick(data);
    }
  };
  return (
    <div className={`card-${id} card-form-${actionAlign}`} style={{ width }}>
      <Card
        {...cardProps}
        title={title}
        actions={
          footer
            ? [
                <Footer
                  actions={_actions}
                  actionClick={actionClick}
                  validatorForm={validatorForm}
                  form={form}
                />,
              ]
            : null
        }
      >
        <Form
          form={form}
          {...rest}
          getScrollContainer={() =>
            document.querySelector(`.card-${id} .ant-card-body`)
          }
        />
      </Card>
    </div>
  );
};

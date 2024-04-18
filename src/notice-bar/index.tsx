import { CloseOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import React from 'react';
import Marquee from 'react-fast-marquee';
import './index.less';
import AlertProps from './type';

const NoticeBar = ({
  message,
  marqueeProps,
  marquee = false,
  ...props
}: AlertProps) => (
  <Alert
    banner
    className="slick-form-notice-bar"
    closable
    style={{
      background: '#ff4838',
      color: '#fff',
    }}
    type="error"
    showIcon
    message={
      marquee ? (
        <Marquee pauseOnHover gradient={false} {...marqueeProps}>
          {message}
        </Marquee>
      ) : (
        message
      )
    }
    closeIcon={
      <CloseOutlined
        style={{
          color: '#fff',
        }}
      />
    }
    {...props}
  />
);

export default NoticeBar;

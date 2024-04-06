import { uuid } from '@/util';
import { Spin, SpinProps } from 'antd';
import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

const $: any = document.querySelector.bind(document);

export interface CreateSpinProps {
  getContainer?: () => HTMLElement | null;
  containId?: string;
  spinProps?: SpinProps;
  style?: CSSProperties;
  mode?: string;
}

const SpinComponent = ({ style, mode, spinProps }) => {
  return mode === 'loading' ? (
    <Spin spinning {...spinProps} />
  ) : (
    <div className="create-spin-vscode" style={style} />
  );
};

const CreateSpin = ({ getContainer, containId, spinProps, style, mode }) => {
  if ($(`#${containId}`)) {
    return;
  }
  const tag = document.createElement('div');
  tag.setAttribute('id', containId);
  tag.style.width = '100%';
  tag.style.height = '100%';
  tag.style.position = 'absolute';
  tag.style.top = '0';
  tag.className = 'create-spin';
  getContainer()?.appendChild(tag);
  ReactDOM.render(
    <SpinComponent style={style} mode={mode} spinProps={spinProps} />,
    tag
  );
  return null;
};

/** 返回具体的函数 */
export default ({
  getContainer = () => document.querySelector('body'),
  containId = `create-spin-root-${uuid(5)}`,
  style = {},
  mode = 'loading',
  ...spinProps
}: CreateSpinProps) => {
  return {
    open: () => {
      CreateSpin({
        getContainer,
        containId,
        spinProps,
        style,
        mode,
      });
    },
    close: () => {
      $(`#${containId}`)?.remove();
    },
  };
};

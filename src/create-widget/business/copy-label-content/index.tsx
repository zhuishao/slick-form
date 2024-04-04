import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import './index.less';

function CopyLabelContent({
  label,
  content,
  copyable = true,
  type = 'default',
  style = {},
  contentStyle = {},
  iconStyle = {},
  copyTxt = '',
  onCopy = () => {},
  ellipsis = false,
}: {
  label?: string;
  content: string;
  copyable?: boolean;
  type?: 'default' | 'primary';
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  copyTxt?: string;
  onCopy?: () => void;
  ellipsis?: boolean;
}) {
  // 是否复制完成状态
  const [copied, setCopied] = useState(false);
  // 复制成功文本的显示状态
  const [showCopied, setShowCopied] = useState(false);

  // 如果copied为true，则需要再6s后将copied置为false,使用useEffect
  useEffect(() => {
    let timerId;

    if (copied) {
      timerId = setTimeout(() => {
        setCopied(false);
      }, 6000);
    }

    // 返回的函数是一个清理函数，在组件卸载或者重新渲染之前都会运行
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [copied]);

  useEffect(() => {
    let timerId;
    if (showCopied) {
      timerId = setTimeout(() => {
        setShowCopied(false);
      }, 4000);
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [showCopied]);

  const sumIconStyle = useMemo(() => {
    return {
      ...contentStyle,
      ...iconStyle,
    };
  }, [contentStyle, iconStyle]);

  return (
    <div className={`slick-form-copy-container ${type}`} style={style}>
      <div className="copy-label">{label}</div>
      <div
        style={contentStyle}
        className={cls('copy-content', {
          ellipsis,
        })}
      >
        {ellipsis && (content?.length || 0) > 14 ? (
          <Tooltip title={content}> {content}</Tooltip>
        ) : (
          content
        )}
      </div>
      {copyable && !copied && (
        <div
          style={sumIconStyle}
          className="copy-icon"
          onClick={() => {
            if (!copied) {
              onCopy();
              setCopied(true);
              setShowCopied(true);
            }
          }}
        >
          {copyTxt ? (
            <CopyOutlined />
          ) : (
            <Tooltip
              placement="top"
              title="复制"
              // getPopupContainer={(triggerNode) => triggerNode.parentNode}
            >
              <CopyOutlined />
            </Tooltip>
          )}

          {copyTxt}
        </div>
      )}
      {copyable && copied && (
        <div style={sumIconStyle} className="copy-icon cd">
          {copyTxt ? (
            <CheckOutlined />
          ) : (
            <Tooltip
              placement="top"
              title="复制成功"
              open={showCopied}
              // getPopupContainer={(triggerNode) => triggerNode.parentNode}
            >
              <CheckOutlined />
            </Tooltip>
          )}

          {copyTxt}
        </div>
      )}
    </div>
  );
}

export default CopyLabelContent;

import { Typography } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './index.less';

const { Paragraph } = Typography;

export interface LongTextProps {
  /**
   * 最多显示的行数，默认为2
   */
  rows?: number;
  /**
   * 完整的文本
   */
  text: React.ReactNode;
  /**
   * 展开的文案
   */
  expandText?: string | React.ReactNode;
  /**
   * 收起的文案
   */
  packupText?: string | React.ReactNode;
  /**
   * 自定义样式
   */
  className?: string;
}

export default ({
  rows = 2,
  text,
  expandText = '展开',
  packupText = '收起',
  className,
}: LongTextProps) => {
  const [showAll, setShowAll] = useState(false);
  const [key, setKey] = useState(Math.random());

  const toggleAll = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    setKey(Math.random());
  }, [showAll]);

  return (
    <div className={classNames('slick-form-long-text', className)}>
      <Paragraph
        key={key}
        ellipsis={
          showAll
            ? false
            : {
                rows,
                expandable: true,
                symbol: <span onClick={toggleAll}>{expandText}</span>,
              }
        }
        style={{ margin: 0 }}
      >
        {text}
        {showAll && (
          <span className="slick-form-pack-up" onClick={toggleAll}>
            {packupText}
          </span>
        )}
      </Paragraph>
    </div>
  );
};

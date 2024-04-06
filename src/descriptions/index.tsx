import { isEmpty } from '@/util';
import { toArray } from '@/util/rc';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';
import './index.less';
import DescriptionsItem from './item';

export interface itemType {
  label: string;
  value: React.ReactNode;
  span?: number;
  tooltip?: string;
  visible?: boolean;
}

export interface DescriptionsProps {
  /**
   * 父组件传过来的className
   */
  className?: string;
  /**
   * 父组件传过来的style
   */
  style?: React.CSSProperties;
  children?: React.ReactNode;
  emptyValue?: string;
  /**
   * 描述列表的标题，显示在最顶部
   */
  title?: React.ReactNode;
  /**
   * 描述列表的操作区域，显示在右上方
   */
  extra?: React.ReactNode;
  /**
   * 分成几列
   */
  column?: number;
  /**
   * 2列之间的间距，默认为24
   */
  gutter?: number;
  /**
   * 描述布局
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * 居左对齐还是冒号对齐，labelAlign需结合labelWidth使用
   */
  labelAlign?: 'left' | 'right';
  /**
   * label的宽度
   */
  labelWidth?: number;
  /**
   * 自定义标签样式
   */
  labelStyle?: React.CSSProperties;
  /**
   * 自定义内容样式
   */
  contentStyle?: React.CSSProperties;
  dataSource?: itemType[];
}

const prefixCls = 'slick-form-descriptions';
function Descriptions({
  title,
  extra,
  column = 3,
  gutter = 24,
  layout = 'horizontal',
  labelAlign = 'left',
  labelWidth,
  children,
  emptyValue = '-',
  className,
  style,
  labelStyle = {},
  contentStyle = {},
  dataSource = [],
}: DescriptionsProps) {
  if (!children) {
    children = dataSource
      ?.filter(
        item =>
          typeof item.visible !== 'boolean' ||
          (typeof item.visible === 'boolean' && item.visible)
      )
      ?.map(item => (
        <DescriptionsItem
          label={
            item?.tooltip ? (
              <span>
                {item.label}
                <Tooltip title={item.tooltip}>
                  <QuestionCircleOutlined style={{ marginLeft: 2 }} />
                </Tooltip>
              </span>
            ) : (
              item.label
            )
          }
          key={item.label}
          span={item.span || 1}
        >
          {item.value}
        </DescriptionsItem>
      ));
  }
  const childNodes = toArray(children).filter(n => n);

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {(title || extra) && (
        <div className={`${prefixCls}-header`}>
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
          {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
        </div>
      )}
      <div className={`${prefixCls}-view`}>
        <Row gutter={gutter} wrap>
          {childNodes.map(node => {
            const {
              span = 1,
              diySpan,
              label,
              children: nodeChildren,
              className: nodeClassName,
              style: nodeStyle = {},
              labelStyle: nodeLabelStyle,
              contentStyle: nodeContentStyle,
            } = node.props || {};
            const mergedSpan = span || 1;
            return (
              <Col
                className={classNames(
                  {
                    'description-item': true,
                    'description-item-horizontal': layout === 'horizontal',
                    'description-item-vertical': layout === 'vertical',
                  },
                  nodeClassName
                )}
                style={{ display: 'flex', ...nodeStyle }}
                span={diySpan || (24 / column) * mergedSpan}
              >
                <div
                  className={classNames({
                    'item-label': true,
                    'item-label-right': labelAlign === 'right',
                  })}
                  style={
                    labelWidth
                      ? { ...labelStyle, ...nodeLabelStyle, width: labelWidth }
                      : { ...labelStyle, ...nodeLabelStyle }
                  }
                >
                  {label}
                </div>
                <div
                  className="item-value"
                  style={
                    labelWidth
                      ? {
                          ...contentStyle,
                          ...nodeContentStyle,
                          width: `100% - ${labelWidth}`,
                        }
                      : { ...contentStyle, ...nodeContentStyle }
                  }
                >
                  {isEmpty(nodeChildren) ? emptyValue : nodeChildren}
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

Descriptions.Item = DescriptionsItem;

export default Descriptions;

import { Col, Row } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import './index.less';
import { getElementTop } from './util';

export interface AnchorCardProps {
  /** 数据源 */
  tabs: {
    /** 文案 */
    tab: ReactNode;
    /** 唯一标识 */
    key: string;
    /** 内容 */
    content?: ReactNode;
  }[];
  /** 设置挂载Dom容器 */
  getContainer?: () => HTMLElement;
  /** 默认选中 */
  defaultActivityKey?: string;
  /** 设置固定高度 */
  fixHeight?: number;
  /** 容器类名 */
  contentClass?: string;
  /** 固定高度 */
  fixedTop?: number;
  children?: ReactNode;
}

export default ({
  tabs,
  getContainer,
  defaultActivityKey,
  fixHeight = 24,
  fixedTop = 0,
  contentClass,
  children = null,
}: AnchorCardProps) => {
  let ticking = false;
  const [activeKey, setActiveKey] = useState(defaultActivityKey);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  const handleScroll = event => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const elementScrollTop =
          event.srcElement.scrollTop ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (!elementScrollTop) {
          return;
        }
        const linkTabs = getLinkTabs();
        linkTabs.forEach(item => {
          if (Number(elementScrollTop) + Number(fixHeight) >= item.offsetTop) {
            setActiveKey(item.key);
          }
        });
        ticking = false;
      });
    }
  };

  const getLinkTabs = () => {
    const links = [];
    tabs.forEach(item => {
      const el = document.getElementById(item.key);
      if (el) {
        links.push({
          key: item.key,
          offsetTop: getElementTop(el),
        });
      }
    });
    return links;
  };

  const anchorClick = key => {
    const el = document.querySelector(`#${key}`);
    if (el) {
      setActiveKey(key);
      const dom = getContainer?.() || document.documentElement;
      dom.scrollTo({
        top: getElementTop(el) - fixHeight,
        behavior: 'smooth',
      });
    }
  };

  // 左侧锚点模块的高度
  const anchorHeight = 32 + tabs.length * 40;

  return (
    <Row className="m-content" wrap={false}>
      <Col
        flex="160px"
        className="m-left"
        style={{ top: fixedTop, height: `${anchorHeight}px` }}
      >
        {tabs.map(item => (
          <div
            className={
              item.key === activeKey ? 'm-left-nav active' : 'm-left-nav'
            }
            key={item.key}
            title={typeof item.tab === 'string' && item.tab}
            onClick={anchorClick.bind(null, item.key)}
          >
            {item.tab}
          </div>
        ))}
      </Col>
      <Col className="m-right" id="content">
        {children ||
          tabs.map(item => (
            <div className={contentClass} id={item.key}>
              {item.content}
            </div>
          ))}
      </Col>
    </Row>
  );
};

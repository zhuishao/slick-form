import { Button, Col, Drawer, DrawerProps, Row, Space } from 'antd';
import { Gutter } from 'antd/lib/grid/row';
import dayjs from 'dayjs';
import { FC, Fragment, ReactNode, useEffect, useState } from 'react';
import './index.less';

interface AnyObj {
  [key: string]: any;
}

interface Option {
  value: any;
  label: string;
}

export type DescType = 'text' | 'date' | 'enum' | 'amount' | 'media' | 'file';

interface DescOptions {
  /** 枚举映射 */
  enums?: Option[] | AnyObj;
  /** dayjs格式化 */
  dateFormat?: string;
  /** 金额-千分位 */
  useGrouping?: boolean;
  /** 金额-小数点 */
  toFixed?: number;
}

/** 字段渲染结构 */
interface DescModel<T> {
  /** 渲染类型 */
  type?: DescType;
  /** label */
  label?: ReactNode;
  /** 渲染内容 */
  render?: (value: any, data: T, index: number) => JSX.Element;
  /** key */
  key: string;
  /** 占据份额 */
  span?: number;
  copy?: boolean;
  options: DescOptions;
}

export interface DescListProps<T = AnyObj> {
  /** 数据 */
  data: T;
  /** 更新数据源 */
  update?: () => Promise<T>;
  /** 渲染模型 */
  renderModel: DescModel<T>[];
  /** 显隐控制  PS: 只支持 type: Drawer */
  visible?: boolean;
  /** 每行展示数据数量 */
  column?: number;
  /** 关闭 */
  onClose?: () => void;
  /** 展示类型 */
  type?: 'Card' | 'Drawer';
  /** Drawer属性 */
  drawerProps?: DrawerProps;
  /** 间距 */
  gutter?: Gutter | [Gutter, Gutter];
  /** 空白占位符 */
  placeholder?: ReactNode;
  /** label宽度 24栅格 */
  labelSpan?: number;
  /** 内容宽度 24栅格 */
  containerSpan?: number;
  /** 排序方式 */
  layout?: 'horizontal' | 'vertical1';
}

const DescList = <T,>({
  onClose,
  visible,
  data,
  type = 'Card',
  gutter = [16, 24],
  column = 3,
  drawerProps,
  labelSpan = 8,
  containerSpan = 16,
  renderModel,
  placeholder = '-',
  update,
}: DescListProps<T>) => {
  const [_data, setData] = useState<T>(data);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setData(data);
  }, [data]);

  const MyFragment = ({ children }) => <Fragment>{children}</Fragment>;

  const Warp = (() => {
    switch (type) {
      case 'Drawer':
        return Drawer;
      default:
        return MyFragment;
    }
  })();

  const MediaItem = ({ mediaData }): JSX.Element => <div>;</div>;

  const Container: FC<{
    item: DescModel<T>;
    index: number;
  }> = ({ item, index }) => {
    const {
      options: {
        toFixed = 2,
        useGrouping = true,
        dateFormat = 'YYYY-MM-DD HH:mm:ss',
        enums,
      } = {},
      render,
      type: _Type,

      key,
    } = item;
    const value = _data[key];

    if (typeof render === 'function') {
      return render(value, _data, index);
    }

    if (![undefined, null].includes(value)) {
      let valRender: ReactNode = value;
      switch (_Type) {
        case 'amount':
          valRender = value.toLocaleString('zh-CN', {
            useGrouping,
            minimumFractionDigits: toFixed,
            maximumFractionDigits: toFixed,
          });
          break;
        case 'date':
          valRender = dayjs(value).format(dateFormat);
          break;
        case 'enum':
          if (Array.isArray(enums)) {
            valRender = enums.find(i => i.value === value)?.label;
          } else if (
            Object.prototype.toString.call(enums) === '[object Object]'
          ) {
            valRender = enums[value];
          }
          break;
        case 'media':
          valRender = (Array.isArray(value) ? value : [value]).map(i => (
            <MediaItem mediaData={i} />
          ));
          break;
        case 'file':
          break;
        case 'text':
        default:
          break;
      }
      return <div className={'desc-list-value'}>{valRender ?? value}</div>;
    }
    return (
      <div className={'desc-list-value'} style={{ textAlign: 'center' }}>
        {placeholder}
      </div>
    );
  };

  const Label = ({ label, index }) => {
    // TODO delete
    if (typeof label === 'string' || 1) {
      return <div style={{ fontWeight: 'bold' }}>标签-{index + 1}: </div>;
    }
    return label || null;
  };

  const onRefresh = async () => {
    setLoading(true);
    const res = await update();
    setData(res);
    setLoading(false);
  };

  return (
    <Warp
      width={500}
      title="详情"
      extra={
        <Space>
          <Button type="primary">刷新</Button>
          <Button>编辑</Button>
        </Space>
      }
      {...drawerProps}
      visible={visible}
      onClose={onClose}
    >
      {type === 'Card' && (
        <div className={'operation-area'}>
          <h3>详情</h3>
          <Space>
            <Button type="primary" onClick={onRefresh}>
              刷新
            </Button>
            <Button>编辑</Button>
          </Space>
        </div>
      )}
      <Row gutter={gutter} className={'desc-list-container'} align="middle">
        {renderModel.map((i, idx) => (
          <Col span={(24 / column) * (i.span || 1)} key={i.key}>
            <Row align="middle">
              <Col span={labelSpan}>
                <Label label={i.label} index={idx} />
              </Col>
              <Col span={containerSpan} style={{ padding: 10 }}>
                <Container item={i} index={idx} />
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Warp>
  );
};

export default DescList;

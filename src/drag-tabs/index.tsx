import { Dropdown, Tabs } from 'antd';
import type { MenuProps, TabsProps } from 'antd';
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './index.less';
import TabOrderContext from './TabOrderContext';
const type = 'DraggableTabNode';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  index: React.Key;
  moveNode: (dragIndex: React.Key, hoverIndex: React.Key) => void;
}

interface DragTabProps extends TabsProps {
  enableRightClick?: boolean;
  // 回传右键的tab，和菜单中点击的事件
  onChange?: (activeKey: React.Key) => void;
  onItemsChange?: (items: any[]) => void;
  closeTabs?: (keys: React.Key[]) => void;
}

const DraggableTabNode = ({
  index,
  children,
  moveNode,
}: DraggableTabPaneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hoverClass, setHoverClass] = useState('');
  const { orderItems } = useContext(TabOrderContext);

  // 新增状态用来控制标签移动方向
  const [shift, setShift] = useState('');

  // 使用 useDrop 钩子设置 drop 和 hover 逻辑
  const [{ isOver }, drop] = useDrop({
    accept: type,
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragKey = item.index;
      const hoverKey = index;

      // 查找实际索引
      const dragIndex = orderItems.findIndex(it => it.key === dragKey);
      const hoverIndex = orderItems.findIndex(it => it.key === hoverKey);
      if (dragIndex === hoverIndex) {
        return;
      }

      // 只有当拖拽项穿过目标项的中点时，才更新 shift 状态
      if (dragIndex < hoverIndex) {
        setShift('moveForward'); // 向下移动
      } else {
        setShift('moveBackward'); // 向上移动
      }
    },
    drop: (item: { index: React.Key }) => {
      moveNode(item.index, index);
      setShift(''); // 在放置后清除移动方向
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  useLayoutEffect(() => {
    if (!isOver) {
      setHoverClass('');
      return;
    }
    const hoverClasses = [];
    // 当元素被悬停时
    if (isOver) {
      hoverClasses.push('slick-form-dropping');
    }
    // 根据移动方向添加类名
    if (shift === 'moveForward') {
      hoverClasses.push('slick-form-tabShiftRight');
    } else if (shift === 'moveBackward') {
      hoverClasses.push('slick-form-tabShiftLeft');
    }
    setHoverClass(hoverClasses.join(' '));
  }, [isOver, isDragging, shift]);

  return (
    <div ref={ref} className={hoverClass} style={{ marginRight: 8 }}>
      {children}
    </div>
  );
};

const DraggableTabs: React.FC<DragTabProps> = props => {
  const {
    items = [],
    enableRightClick = true,
    onChange,
    closeTabs,
    onItemsChange,
    ...otherProps
  } = props;

  const [order, setOrder] = useState<React.Key[]>(items.map(item => item.key));
  const [currentActiveKey, setCurrentActiveKey] = useState(items?.[0]?.key);

  // 判断是否是受控状态
  const inControl = 'activeKey' in otherProps;

  const realActiveKey = inControl ? otherProps?.activeKey : currentActiveKey;

  // 当items发生变化时，更新order数组
  useEffect(() => {
    // 创建一个新的order数组，包含当前items中所有的key
    const newOrder = items
      .map(item => item.key)
      .filter(
        key =>
          // 只包含当前order中存在，或者新增的key
          order.includes(key) || !order.includes(key)
      );

    // 设置新的order
    setOrder(newOrder);
  }, [items]); // 只在items变化时触发

  const onTabClick = key => {
    onChange?.(key);
    if (!inControl) {
      setCurrentActiveKey(key);
    }
  };

  const moveTabNode = (dragKey: React.Key, hoverKey: React.Key) => {
    setOrder(prevOrder => {
      const newOrder = [...prevOrder];
      const dragIndex = newOrder.indexOf(dragKey);
      const hoverIndex = newOrder.indexOf(hoverKey);

      // 情况一：两者都在当前顺序中
      if (dragIndex !== -1 && hoverIndex !== -1) {
        newOrder.splice(dragIndex, 1);
        newOrder.splice(hoverIndex, 0, dragKey);
      } else if (dragIndex === -1 && hoverIndex !== -1) {
        // 情况二：拖动的不在，悬停的在
        newOrder.splice(hoverIndex, 0, dragKey);
      } else if (dragIndex !== -1 && hoverIndex === -1) {
        // 情况三：拖动的在，悬停的不在
        // 根据需求选择操作，比如移除元素或者移到末尾
        newOrder.splice(dragIndex, 1); // 或 newOrder.push(dragKey);
      } else {
        // 情况四：两者都不在当前顺序中
        // 特殊处理，例如忽略操作或触发回调
        console.log('特殊情况，需要根据应用需求来定义处理方式');
        // 可能的操作：忽略、记录日志、回调函数等
      }

      return newOrder;
    });
  };

  const renderTabBar: TabsProps['renderTabBar'] = (
    tabBarProps,
    DefaultTabBar
  ) => {
    return (
      <DefaultTabBar {...tabBarProps}>
        {node => {
          const currentIndex = order.indexOf(node.key);
          const menu: MenuProps['items'] = [
            {
              label: '关闭左侧',
              key: 'closeLeft',
              disabled: currentIndex === 0,
            },
            {
              label: '关闭右侧',
              key: 'closeRight',
              disabled: currentIndex === orderItems.length - 1,
            },
            {
              label: '关闭其他',
              key: 'closeOthers',
              disabled: orderItems.length === 1,
            },
            {
              label: '关闭全部',
              key: 'closeAll',
            },
          ];

          const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
            // 获取当前右键点击的标签的key
            const rightClickKey = orderItems[currentIndex];

            // 辅助函数：处理关闭标签的逻辑，接受关闭标签的key数组
            const handleClosingTabs = keysToClose => {
              closeTabs?.(keysToClose);
            };

            // 辅助函数：如果需要，更新活动标签
            const updateActiveTabIfNeeded = nextActiveKey => {
              onChange?.(nextActiveKey);
              if (!inControl) {
                setCurrentActiveKey(nextActiveKey);
              }
            };

            // 处理关闭左侧或右侧标签的动作
            if (key === 'closeLeft' || key === 'closeRight') {
              const tabsToClose = orderItems
                .filter((item, index) => {
                  return key === 'closeLeft'
                    ? index < currentIndex
                    : index > currentIndex;
                })
                .map(item => item.key);

              handleClosingTabs(tabsToClose);

              if (key === 'closeRight') {
                // 当关闭右侧标签时，需要保留当前标签及其左侧的所有标签
                const remainingItems = orderItems.slice(0, currentIndex + 1);
                onItemsChange?.(remainingItems);
              } else {
                // 当关闭左侧标签时，保留当前标签及其右侧的所有标签
                const remainingItems = orderItems.slice(currentIndex);
                onItemsChange?.(remainingItems);
              }

              // 检查当前激活的标签是否被关闭
              if (tabsToClose.includes(realActiveKey)) {
                updateActiveTabIfNeeded(rightClickKey.key);
              }
            }

            // 处理关闭其他标签的动作
            if (key === 'closeOthers') {
              const tabsToClose = orderItems
                .filter(item => item.key !== rightClickKey.key)
                .map(item => item.key);
              handleClosingTabs(tabsToClose);
              onItemsChange?.([rightClickKey]);
              updateActiveTabIfNeeded(rightClickKey.key);
            }

            // 处理关闭所有标签的动作
            if (key === 'closeAll') {
              const tabsToClose = orderItems.map(item => item.key);
              handleClosingTabs(tabsToClose);
              onItemsChange?.([]);
              updateActiveTabIfNeeded('');
            }
          };

          return (
            <DraggableTabNode
              key={node.key}
              index={node.key!}
              moveNode={moveTabNode}
            >
              <Dropdown
                menu={{ items: menu, onClick: handleMenuClick }}
                trigger={['contextMenu']}
              >
                {node}
              </Dropdown>
            </DraggableTabNode>
          );
        }}
      </DefaultTabBar>
    );
  };

  const orderItems = [...items].sort((a, b) => {
    const orderA = order.indexOf(a.key!);
    const orderB = order.indexOf(b.key!);

    if (orderA !== -1 && orderB !== -1) {
      return orderA - orderB;
    }
    if (orderA !== -1) {
      return -1;
    }
    if (orderB !== -1) {
      return 1;
    }

    const ia = items.indexOf(a);
    const ib = items.indexOf(b);

    return ia - ib;
  });

  const remove = (targetKey: TargetKey) => {
    const targetIndex = orderItems.findIndex(pane => pane.key === targetKey);
    const newPanes = orderItems.filter(pane => pane.key !== targetKey);
    if (newPanes.length && targetKey === realActiveKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      onChange?.(key);
      if (!inControl) {
        setCurrentActiveKey(key);
      }
    }
    closeTabs?.([targetKey as string]);
    onItemsChange?.(newPanes);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey);
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <TabOrderContext.Provider value={{ orderItems, setOrder }}>
        <Tabs
          hideAdd
          activeKey={realActiveKey}
          type="editable-card"
          renderTabBar={renderTabBar}
          onTabClick={onTabClick}
          onEdit={onEdit}
          {...otherProps}
          items={orderItems}
        />
      </TabOrderContext.Provider>
    </DndProvider>
  );
};

export default DraggableTabs;

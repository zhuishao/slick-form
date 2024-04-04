import React from 'react';

interface TabOrderContextType {
  orderItems: any[];
  setOrder: (orderItems: React.Key[]) => void;
}

// 创建一个context，初始值符合接口类型
const TabOrderContext = React.createContext<TabOrderContextType>({
  orderItems: [], // 默认值为空数组
  setOrder: () => {}, // 默认空函数
});

export default TabOrderContext;

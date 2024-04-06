import React from 'react';
interface TabOrderContextType {
    orderItems: any[];
    setOrder: (orderItems: React.Key[]) => void;
}
declare const TabOrderContext: React.Context<TabOrderContextType>;
export default TabOrderContext;

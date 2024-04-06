import type { TabsProps } from 'antd';
import React from 'react';
import './index.less';
interface DragTabProps extends TabsProps {
    enableRightClick?: boolean;
    onChange?: (activeKey: React.Key) => void;
    onItemsChange?: (items: any[]) => void;
    closeTabs?: (keys: React.Key[]) => void;
}
declare const DraggableTabs: React.FC<DragTabProps>;
export default DraggableTabs;

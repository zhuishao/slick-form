import { ReactNode } from 'react';
import { TableProvider } from '..';
import { LayerProps } from './type.layer';
export interface PageProviderProps {
    /** 主页面 */
    Page: typeof TableProvider | ReactNode;
    /** 弹出层 */
    Layers?: {
        [key: string]: React.FC<LayerProps>;
    };
    /** 注入的属性，穿透到 Page和Layers中 */
    properties?: any;
}

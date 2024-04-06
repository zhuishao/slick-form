import { DrawerFormProps, ModalFormProps } from '../index';
export interface CreateModalFormProps extends ModalFormProps {
    getPopupContainer?: () => HTMLElement | null;
    containId?: string;
}
export interface CreateDrawerFormProps extends DrawerFormProps {
    getPopupContainer?: () => HTMLElement | null;
    containId?: string;
}
declare const _default: {
    Modal(options: CreateModalFormProps): {
        open: (config?: CreateModalFormProps) => void;
        close: () => void;
    };
    Drawer(options: CreateDrawerFormProps): {
        open: (config?: CreateDrawerFormProps) => Promise<void>;
        close: () => void;
    };
};
export default _default;

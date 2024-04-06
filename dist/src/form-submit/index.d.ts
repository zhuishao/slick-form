import React from 'react';
import { CardFormProps } from './types';
declare type FormSubmitProps<T> = T & {
    type: 'Panel' | 'Modal' | 'Drawer';
    maskClosable?: boolean;
};
export default function FormSubmit<T = CardFormProps>({ type, ...props }: FormSubmitProps<T>): React.JSX.Element;
export {};

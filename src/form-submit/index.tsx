import CardForm from './card';
import DrawerForm from './drawer';
import ModalForm from './modal';
import { CardFormProps } from './types';

const WarperMapping = {
  Panel: CardForm,
  Modal: ModalForm,
  Drawer: DrawerForm,
};

type FormSubmitProps<T> = T & {
  type: 'Panel' | 'Modal' | 'Drawer';
  maskClosable?: boolean;
};

export default function FormSubmit<T = CardFormProps>({
  type = 'Panel',
  ...props
}: FormSubmitProps<T>) {
  const Popup = WarperMapping[type];
  const { maskClosable, ...rest } = props;
  if (type === 'Modal') {
    return <Popup {...rest} modalProps={{ maskClosable: !!maskClosable }} />;
  } else if (type === 'Drawer') {
    return <Popup {...rest} drawerProps={{ maskClosable: !!maskClosable }} />;
  } else {
    return <Popup {...rest} />;
  }
}

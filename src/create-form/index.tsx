import { getGlobalConfigByName, uuid } from '@/util';
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  DrawerForm,
  DrawerFormProps,
  ModalForm,
  ModalFormProps,
} from '../index';

const { token } = getGlobalConfigByName('themeConfig', {});

const $: any = document.querySelector.bind(document);
const layerClass = `layer-${uuid(6)}`;

export interface CreateModalFormProps extends ModalFormProps {
  getPopupContainer?: () => HTMLElement | null;
  containId?: string;
}
export interface CreateDrawerFormProps extends DrawerFormProps {
  getPopupContainer?: () => HTMLElement | null;
  containId?: string;
}

const close = containId => {
  window.removeEventListener('popstate', callback);
  setTimeout(() => {
    $(`#${containId}`)?.remove();
  }, 500);
};

const callback = () =>
  document.querySelectorAll(`.${layerClass}`).forEach(dom => {
    dom?.remove();
  });

const ModalFormWrapper = ({ containId, tag, ...props }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.addEventListener('popstate', callback);
    setVisible(true);
  }, []);
  return (
    <ModalForm
      {...props}
      open={visible}
      onClose={() => {
        props.onClose?.();
        setVisible(false);
        close(containId);
      }}
      modalProps={{
        ...(props.modalProps || {}),
        getContainer: () => tag,
      }}
    />
  );
};

const DrawerFormWrapper = ({ containId, tag, ...props }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.addEventListener('popstate', callback);
    setVisible(true);
  }, []);
  return (
    <DrawerForm
      {...props}
      open={visible}
      onClose={() => {
        props.onClose?.();
        setVisible(false);
        close(containId);
      }}
      drawerProps={{
        ...(props.drawerProps || {}),
        getContainer: () => tag,
      }}
    />
  );
};

const CreateModalForm = props => {
  const tag = document.createElement('div');
  tag.setAttribute('id', props.containId);
  tag.setAttribute('class', layerClass);
  const target = props.getPopupContainer?.() || $('body');
  target.appendChild(tag);

  ReactDOM.render(
    <ConfigProvider theme={{ token }}>
      <ModalFormWrapper {...props} tag={tag} />
    </ConfigProvider>,
    tag
  );
  return null;
};

const CreateDrawerForm = props => {
  const tag = document.createElement('div');
  tag.setAttribute('id', props.containId);
  tag.setAttribute('class', layerClass);
  const target = props.getPopupContainer?.() || $('body');
  target.appendChild(tag);
  ReactDOM.render(
    <ConfigProvider theme={{ token }}>
      <DrawerFormWrapper {...props} tag={tag} />
    </ConfigProvider>,
    tag
  );
  return null;
};

export default {
  Modal(options: CreateModalFormProps) {
    const containId = options.containId || `modalId_${uuid(6)}`;
    return {
      open: (config?: CreateModalFormProps) => {
        const props: any = {
          ...options,
          ...config,
        };
        CreateModalForm({
          ...props,
          containId,
          onSubmit: async data => {
            await props.onSubmit?.(data);
            close(containId); // 关闭
          },
        });
      },
      close: () => {
        close(containId); // 关闭
      },
    };
  },
  Drawer(options: CreateDrawerFormProps) {
    const containId = options.containId || `drawerId_${uuid(6)}`;
    return {
      open: async (config?: CreateDrawerFormProps) => {
        const props: any = {
          ...options,
          ...config,
        };
        CreateDrawerForm({
          ...props,
          containId,
          onSubmit: async data => {
            await props.onSubmit?.(data);
            close(containId); // 关闭
          },
        });
      },
      close: () => {
        close(containId); // 关闭
      },
    };
  },
};

import {
    App,
    Modal,
    message as antdMessage,
    notification as antdNotification,
  } from 'antd';

  let message: any;
  let notification: any;
  let modal: any;
  
  export default () => {
    const staticFunction = App.useApp();
  
    message = staticFunction?.message?.destroy
      ? staticFunction.message
      : antdMessage;
  
    modal = staticFunction.modal.confirm ? staticFunction.modal : Modal;
  
    notification = staticFunction.notification.open
      ? staticFunction.notification
      : antdNotification;
  
    return { message, notification, modal };
  };
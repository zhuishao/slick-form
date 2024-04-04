import { notification } from 'antd';
import axios from 'axios';

export default options => {
  // 创建实例
  const instance = axios.create(options);
  // 请求拦截
  instance.interceptors.request.use(
    config => {
      //   config.headers = {
      //     ...config.headers,
      //   };
      return config;
    },
    error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );
  // 响应拦截
  instance.interceptors.response.use(
    ({ config, ...response }) => {
      if (response.status === 200) {
        if (response.data.code !== 200) {
          notification.error({
            message: '提示',
            description: response.data.msg,
          });
        }
        return response.data;
      }
    },
    error => {
      return Promise.reject(error);
    }
  );
  return instance;
};

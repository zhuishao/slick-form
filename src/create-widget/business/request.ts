import { message } from 'antd';
import axios from 'axios';

export const getLocalStore = (name: string) => {
  try {
    const content = localStorage.getItem(name);
    if (content !== null) {
      return JSON.parse(content);
    }
  } catch (error) {
    console.log(error);
  }
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
  // if (!config.headers['saas-token']) {
  //   Object.assign(config.headers, {
  //     'saas-token': getLocalStore(
  //       `jwtToken-${
  //         (document.querySelector('meta[name=appId]') as any)?.content
  //       }`,
  //     ),
  //     'X-XSRF-TOKEN': getLocalStore('csrfToken'),
  //   });
  // }
  return config;
});

axiosInstance.interceptors.response.use(
  res => {
    const { data }: any = res;
    if (!data.flag || data.code !== 200) {
      if ([40010, 40008, 40011].includes(+data.code)) {
        const appId = (document.querySelector('meta[name=appId]') as any)
          ?.content;
        message.warning(`登陆过期，请前往相应平台重新登录(${appId})`);
      } else {
        message.error(data.msg || '请求失败');
      }
      return Promise.reject(res.data);
    }
    return res.data;
  },
  error => {
    message.error('请求失败');
    return Promise.reject(error);
  }
);

export default axiosInstance;

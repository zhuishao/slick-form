import axios from 'axios';
import { getLocalStore } from './../src/create-widget/business/request';

export default axios.create({
  // baseURL: 'https://pmsaas.taobao.com',
  headers: {
    'saas-token': getLocalStore('saas-token'),
  },
  baseURL: location.origin,
});

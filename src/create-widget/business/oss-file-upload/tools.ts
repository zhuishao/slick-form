export const downloadOssFile = (url, fileName = '', token = getAppToken()) => {
  // 跨域文件路径、下载到本地的文件名
  const x = new XMLHttpRequest();
  x.open('GET', `${url}&saas-token=${token}`, true);
  x.responseType = 'blob';
  x.onload = function () {
    const _url = window.URL.createObjectURL(x.response);
    const a = document.createElement('a');
    a.href = _url;
    a.download = fileName;
    a.click();
  };
  x.send();
};

export const getAppToken = () => {
  const appId = getMetaContentByName('appId');
  if (appId) {
    return getLocalStore(`jwtToken-${appId}`);
  } else {
    return getLocalStore('jwtToken');
  }
};

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

/**
 * 获取 meta
 */
export const getMetaContentByName = name => {
  const el: any = document.querySelector(`meta[name=${name}`);
  return el?.content;
};

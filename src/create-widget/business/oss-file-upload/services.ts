export default (request: any, urlPrefix) => {
  return {
    // 文件在线预览
    filePreview: (name: string, url: string) => {
      return request.post(`${urlPrefix}/yqProject/getFilePreviewUrl`, {
        name,
        url,
      });
    },
    getOssPath: async (params: any): Promise<any> => {
      return request.get(`${urlPrefix}/service/fileUpload/getOssPath`, {
        params,
      });
    },
    getOssInfo: async (data: any): Promise<any> => {
      return request.post(`${urlPrefix}/service/fileUpload/getOssInfo`, data);
    },
    getOssInfoAndFinanceUrl: async (data: any): Promise<any> => {
      return request.post(
        `${urlPrefix}/service/fileUpload/getOssInfoAndAuctionCdnUrl`,
        data
      );
    },
    getOssAuthInfo: async (): Promise<any> => {
      return request.get(
        `${urlPrefix}/service/fileUpload/getOssClientInfo`,
        {}
      );
    },
  };
};

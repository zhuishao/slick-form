export declare function downloadFile(url: string, fileName: string): Promise<unknown>;
/**
 * 打包批量下载
 * @param data
 * @param zipName
 * @returns
 */
export declare function compressAndDownload(data: {
    url: string;
    name: string;
}[], zipName: string): Promise<void>;

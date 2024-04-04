import axios from 'axios'
import FileSaver from 'file-saver'
import JSZip from 'jszip'

export function downloadFile(url: string, fileName: string) {
  return new Promise((resolve, reject) => {
    const x = new XMLHttpRequest()
    x.open('GET', url, true)
    x.responseType = 'blob'
    x.onload = () => {
      if (x.status !== 200) {
        reject(new Error(`Failed to fetch file: ${x.statusText}`))
        return
      }
      const loadurl = window.URL.createObjectURL(x.response)
      const a = document.createElement('a')
      a.href = loadurl
      a.download = fileName
      a.click()
      window.URL.revokeObjectURL(loadurl)
      resolve(true)
    }
    x.onerror = () => {
      reject(new Error('Error downloading file'))
    }

    x.onabort = () => {
      reject(new Error('File download aborted'))
    }

    x.send()
  })
}

const getFile = (url: string) => {
  return new Promise((resolve, reject) => {
    axios(url, {
      method: 'GET',
      responseType: 'blob',
    })
      .then((res: any) => {
        resolve(res.data)
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}

/**
 * 打包批量下载
 * @param data
 * @param zipName
 * @returns
 */

export function compressAndDownload(
  data: { url: string; name: string }[],
  zipName: string,
) {
  const zip = new JSZip()
  const promises: any[] = [] // 用于存储多个promise
  data.forEach((item) => {
    const promise = getFile(`${item.url}`).then((res: any) => {
      zip.file(item.name, res, { binary: true })
    })
    promises.push(promise)
  })

  return Promise.all(promises).then(() => {
    zip
      .generateAsync({
        type: 'blob',
        compression: 'STORE', // STORE：默认不压缩 DEFLATE：需要压缩
        compressionOptions: {
          level: 9, // 压缩等级1~9    1压缩速度最快，9最优压缩方式
        },
      })
      .then((res: any) => {
        FileSaver.saveAs(res, zipName || '图片压缩包.zip') // 利用file-saver保存文件
      })
  })
}

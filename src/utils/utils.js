export const getOffsetTop = (element) => {
    let offsetTop = 0;
    while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    return offsetTop;
}

export const getScrollTop = () => {
    let scrollTop = 0;
    if (window) {
        scrollTop = window.scrollY;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

export const getClientHeight = () => {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}

export const getScrollHeight = () => {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const isURL = (str) => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(str);
};

/**
 *
 * @param url 欲下载资源的URL
 * @param {function} loading_callback - 下载进度回调函数，参数为下载进度百分比（精确到两位小数）
 * @param {function} finished_callback - 下载完成回调函数，参数为下载任务ID
 * @param {number} id - 下载任务ID
 * @returns {Promise<Blob>} - 包含下载内容的 Blob 对象的 Promise
 */
export function downloadWithProgress(url, loading_callback, finished_callback, id) {
    return new Promise((resolve, reject) => {
        fetch(url).then(response => {
            const totalBytes = response.headers.get('Content-Length');
            let downloadedBytes = 0;

            const reader = response.body.getReader();
            const chunks = [];

            function read() {
                reader.read().then(({done, value}) => {
                    if (done) {
                        const blob = new Blob(chunks);
                        finished_callback && finished_callback(id);
                        resolve(blob);
                        return;
                    }

                    chunks.push(value);
                    downloadedBytes += value.length;

                    const progress = (downloadedBytes / totalBytes) * 100;
                    loading_callback && loading_callback(progress.toFixed(2), id);
                    // console.log(`下载进度：${progress.toFixed(2)}%`);

                    // 继续读取下一块数据
                    read();
                }).catch(error => {
                    reject(error);
                });
            }

            read();
        }).catch(error => {
            reject(error);
        });
    });
}

export function isIOS() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}

export function isAndroid() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /android/.test(userAgent);
}

export function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

export function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: 'image/jpeg'});
}

export function getFormattedDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}-${hours}h${minutes}m${seconds}s`;
}